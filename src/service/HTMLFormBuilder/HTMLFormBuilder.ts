import { BuildFormService } from 'app/use-cases/buildForm/service'
import { Condition } from 'core'
import {
  Action,
  Automation,
  FormNode,
  FormNodeInput,
  FormNodeInputCheckbox,
  FormNodeInputText,
  FormNodeLabel,
  FormNodeSection,
  FormNodeText,
  FormNodeWithChildren,
  FormNodeWithElement,
} from 'core/entities'

class HTMLFormBuilder implements BuildFormService {
  #nodesMap: Map<FormNode, HTMLElement | Text>

  constructor() {
    this.#nodesMap = new Map()
  }

  #buildFromFormNodeInputCheckbox(node: FormNodeInputCheckbox): HTMLInputElement {
    const element = this.#buildFromFormNodeInput(node)
    this.#addAttributeToElement(element, {
      ...(node.checked ? { checked: 'checked' } : {}),
    })

    return element
  }

  #buildFromFormNodeInputText(node: FormNodeInputText): HTMLInputElement {
    return this.#buildFromFormNodeInput(node)
  }

  #buildFromFormNodeInput(node: FormNodeInput): HTMLInputElement {
    const element = this.#buildFromFormNodeWithElement(node)
    this.#addAttributeToElement(element, {
      name: node.name,
      value: node.value,
      type: node.inputType,
    })

    return element as HTMLInputElement
  }

  #buildFromFormNodeLabel(node: FormNodeLabel): HTMLLabelElement {
    return this.#buildFromFormNodeWithChildren(node) as HTMLLabelElement
  }

  #buildFromFormNodeSection(node: FormNodeSection): HTMLElement {
    const element = this.#buildFromFormNodeWithChildren(node)
    this.#addDataToElement(element, { title: node.title })

    return element
  }

  #buildFromFormNodeWithChildren(node: FormNodeWithChildren): HTMLElement {
    const element = this.#buildFromFormNodeWithElement(node)
    node.children
      .map((child) => this.#transform(child))
      .filter((child): child is HTMLElement | Text => child !== null)
      .forEach((child) => element.appendChild(child))

    return element
  }

  #buildFromFormNodeWithElement(node: FormNodeWithElement): HTMLElement {
    return document.createElement(node.element)
  }

  #buildFromFormNodeText(node: FormNodeText): Text {
    return new Text(node.text)
  }

  #addDataToElement(element: HTMLElement, data: Record<string, string>): void {
    Object.entries(data).forEach(([key, value]) => (element.dataset[key] = value))
  }

  #addAttributeToElement(element: HTMLElement, attrs: Record<string, string>): void {
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value))
  }

  #transform(node: FormNode): HTMLElement | Text | null {
    let element: HTMLElement | Text | null = null

    if (node instanceof FormNodeInputCheckbox) {
      element = this.#buildFromFormNodeInputCheckbox(node)
    } else if (node instanceof FormNodeInputText) {
      element = this.#buildFromFormNodeInputText(node)
    } else if (node instanceof FormNodeInput) {
      element = this.#buildFromFormNodeInput(node)
    } else if (node instanceof FormNodeLabel) {
      element = this.#buildFromFormNodeLabel(node)
    } else if (node instanceof FormNodeSection) {
      element = this.#buildFromFormNodeSection(node)
    } else if (node instanceof FormNodeWithChildren) {
      element = this.#buildFromFormNodeWithChildren(node)
    } else if (node instanceof FormNodeWithElement) {
      element = this.#buildFromFormNodeWithElement(node)
    } else if (node instanceof FormNodeText) {
      element = this.#buildFromFormNodeText(node)
    }

    if (element !== null) {
      this.#nodesMap.set(node, element)
    }

    return element
  }

  #extractValuesAndFields(automation: Automation):
    | undefined
    | {
        triggerField: HTMLInputElement
        triggerValueOrField: string | HTMLInputElement
        actionNode: HTMLElement
      } {
    const { trigger, action } = automation
    const triggerField = this.#nodesMap.get(trigger.field)

    if (triggerField === undefined || triggerField instanceof Text) {
      return
    }

    const triggerValueOrField =
      trigger.valueOrField instanceof FormNodeInput
        ? this.#nodesMap.get(trigger.valueOrField)
        : trigger.valueOrField

    if (triggerValueOrField === undefined || triggerValueOrField instanceof Text) {
      return
    }

    const actionNode = this.#nodesMap.get(action.node)

    if (actionNode === undefined || actionNode instanceof Text) {
      return
    }

    return {
      triggerField: triggerField as HTMLInputElement,
      triggerValueOrField:
        triggerValueOrField instanceof HTMLElement
          ? (triggerValueOrField as HTMLInputElement)
          : (triggerValueOrField as string),
      actionNode,
    }
  }

  #triggerAction(action: Action, actionNode: HTMLElement): void {
    Object.entries(action.properties).forEach(([key, value]) => {
      let valueExtracted: string
      if (value instanceof FormNodeInput) {
        const valueField = this.#nodesMap.get(value)
        if (valueField === undefined) {
          return
        }

        valueExtracted = (valueField as HTMLInputElement).value
      } else {
        valueExtracted = value
      }

      actionNode.setAttribute(key, valueExtracted)
    })
  }

  #addAutomations(automations: ReadonlyArray<Automation>): void {
    for (const automation of automations) {
      const fields = this.#extractValuesAndFields(automation)

      if (fields === undefined) {
        continue
      }

      const { triggerField, triggerValueOrField, actionNode } = fields

      triggerField.addEventListener('change', (evt) => {
        const value = (evt.target as HTMLInputElement).value
        let triggerValue: string
        if (triggerValueOrField instanceof HTMLInputElement) {
          triggerValue = (triggerValueOrField as HTMLInputElement).value
        } else {
          triggerValue = triggerValueOrField
        }

        switch (automation.trigger.condition) {
          case Condition.Equals:
            if (value === triggerValue) {
              this.#triggerAction(automation.action, actionNode)
            }
            break
        }
      })
    }
  }

  buildForm(
    root: FormNode,
    automations: ReadonlyArray<Automation> = []
  ): HTMLElement | Text | null {
    this.#nodesMap.clear()

    const element = this.#transform(root)

    if (element === null) {
      return null
    }

    this.#addAutomations(automations)

    return element
  }
}

export { HTMLFormBuilder }
