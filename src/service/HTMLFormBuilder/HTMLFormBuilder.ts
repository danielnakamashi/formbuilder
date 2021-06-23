import { BuildFormService } from 'app/use-cases/buildForm/service'
import { TriggerCondition } from 'core/enums/automation/TriggerCondition'
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
import { eventMapper } from './eventMapper'
import { conditionMapper } from './condittionMapper'
import { TriggerAction, TriggerEvent } from 'core'

class HTMLFormBuilder implements BuildFormService {
  #nodesMap: Map<FormNode, HTMLElement | Text>

  constructor() {
    this.#nodesMap = new Map()
  }

  #buildFromFormNodeInputCheckbox(node: FormNodeInputCheckbox): HTMLInputElement {
    const element = this.#buildFromFormNodeInput(node)
    this.#addAttributesToElement(element, {
      ...(node.checked ? { checked: 'checked' } : {}),
    })

    return element
  }

  #buildFromFormNodeInputText(node: FormNodeInputText): HTMLInputElement {
    return this.#buildFromFormNodeInput(node)
  }

  #buildFromFormNodeInput(node: FormNodeInput): HTMLInputElement {
    const element = this.#buildFromFormNodeWithElement(node)
    this.#addAttributesToElement(element, {
      name: node.name,
      value: node.value,
      type: node.inputType,
    })

    return element as HTMLInputElement
  }

  #buildFromFormNodeLabel(node: FormNodeLabel): HTMLLabelElement {
    const element = this.#buildFromFormNodeWithChildren(node) as HTMLLabelElement
    this.#addAttributesToElement(element, {
      for: node.for,
    })

    return element
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
    const element = document.createElement(node.element)
    this.#addAttributesToElement(element, {
      id: node.id,
    })

    if (!node.isVisible) {
      this.#hideNode(element)
    }

    return element
  }

  #buildFromFormNodeText(node: FormNodeText): Text {
    return new Text(node.text)
  }

  #addDataToElement(element: HTMLElement, data: Record<string, string>): void {
    Object.entries(data).forEach(([key, value]) => (element.dataset[key] = value))
  }

  #addAttributesToElement(element: HTMLElement, attrs: Record<string, string>): void {
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
        triggerValueOrField: string | boolean | HTMLInputElement
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

  #hideNode(node: HTMLElement): void {
    node.style.display = 'none'
  }

  #showNode(node: HTMLElement): void {
    node.style.display = ''
  }

  #makeRequired(node: HTMLInputElement | HTMLSelectElement): void {
    node.required = true
  }

  #makeOptional(node: HTMLInputElement | HTMLSelectElement): void {
    node.required = false
  }

  #triggerAction(
    action: Action,
    actionNode: HTMLElement,
    options: { inverted: boolean } = { inverted: false }
  ): void {
    switch (action.type) {
      case TriggerAction.Hide:
        if (options.inverted) {
          this.#showNode(actionNode)
        } else {
          this.#hideNode(actionNode)
        }
        break
      case TriggerAction.Show:
        if (options.inverted) {
          this.#hideNode(actionNode)
        } else {
          this.#showNode(actionNode)
        }
        break
      case TriggerAction.MakeRequired:
        if (options.inverted) {
          this.#makeOptional(actionNode as HTMLInputElement | HTMLSelectElement)
        } else {
          this.#makeRequired(actionNode as HTMLInputElement | HTMLSelectElement)
        }
        break
      case TriggerAction.MakeOptional:
        if (options.inverted) {
          this.#makeRequired(actionNode as HTMLInputElement | HTMLSelectElement)
        } else {
          this.#makeOptional(actionNode as HTMLInputElement | HTMLSelectElement)
        }
        break
    }
  }

  #handleTextChangeEvent(automation: Automation, triggerField: HTMLInputElement): void {
    const fields = this.#extractValuesAndFields(automation)

    if (fields === undefined) {
      return
    }

    const { triggerValueOrField, actionNode } = fields
    const {
      trigger: { condition },
    } = automation
    const value = triggerField.value
    let triggerValue: string
    if (triggerValueOrField instanceof HTMLInputElement) {
      triggerValue = (triggerValueOrField as HTMLInputElement).value
    } else if (typeof triggerValueOrField === 'string') {
      triggerValue = triggerValueOrField
    } else {
      return
    }

    if (conditionMapper[condition](value, triggerValue)) {
      this.#triggerAction(automation.action, actionNode)
    } else {
      this.#triggerAction(automation.action, actionNode, { inverted: true })
    }
  }

  #handleCheckboxChangeEvent(automation: Automation, triggerField: HTMLInputElement): void {
    const fields = this.#extractValuesAndFields(automation)

    if (fields === undefined) {
      return
    }

    const { triggerValueOrField, actionNode } = fields
    const {
      trigger: { condition },
    } = automation
    const isChecked = triggerField.checked
    if (typeof triggerValueOrField !== 'boolean') {
      return
    }

    if (conditionMapper[condition](isChecked, triggerValueOrField)) {
      this.#triggerAction(automation.action, actionNode)
    } else {
      this.#triggerAction(automation.action, actionNode, { inverted: true })
    }
  }

  #handleChangeEvent(automation: Automation, evt: Event): void {
    const target = evt.target as HTMLInputElement

    switch (target.type) {
      case 'text': {
        this.#handleTextChangeEvent(automation, target)
        break
      }
      case 'checkbox': {
        this.#handleCheckboxChangeEvent(automation, target)
        break
      }
    }
  }

  #addAutomations(automations: ReadonlyArray<Automation>): void {
    for (const automation of automations) {
      const fields = this.#extractValuesAndFields(automation)

      if (fields === undefined) {
        continue
      }

      const {
        trigger: { event, field },
      } = automation
      const { triggerField } = fields

      triggerField.addEventListener(eventMapper[event][field.className], (evt) => {
        this.#handleChangeEvent(automation, evt)
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
