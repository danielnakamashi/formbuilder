import { TransformObjectsService } from 'app/use-cases/transformObjects/service'
import {
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

class HTMLFormBuilder implements TransformObjectsService {
  #tranformFormodeWithElement(node: FormNodeWithElement): HTMLElement {
    return document.createElement(node.element)
  }

  #transformFormNodeText(node: FormNodeText): Text {
    return new Text(node.text)
  }

  #transformFormNodeWithChildren(node: FormNodeWithChildren): HTMLElement {
    const element = this.#tranformFormodeWithElement(node)
    node.children
      .map((child) => this.transformObjects(child))
      .forEach((child) => element.appendChild(child))

    return element
  }

  #transformFormNodeInput(node: FormNodeInput): HTMLInputElement {
    const element = this.#tranformFormodeWithElement(node)
    this.#addAttributeToElement(element, {
      name: node.name,
      value: node.value,
      type: node.inputType,
    })

    return element as HTMLInputElement
  }

  #transformFormNodeInputCheckbox(node: FormNodeInputCheckbox): HTMLInputElement {
    const element = this.#transformFormNodeInput(node)
    this.#addAttributeToElement(element, {
      ...(node.checked ? { checked: 'checked' } : {}),
    })

    return element
  }

  #transformFormNodeSection(node: FormNodeSection): HTMLElement {
    const element = this.#transformFormNodeWithChildren(node)
    this.#addDataToElement(element, { title: node.title })

    return element
  }

  #addDataToElement(element: HTMLElement, data: Record<string, string>): void {
    Object.entries(data).forEach(([key, value]) => (element.dataset[key] = value))
  }

  #addAttributeToElement(element: HTMLElement, attrs: Record<string, string>): void {
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value))
  }

  transformObjects(node: FormNode): HTMLElement | Text {
    if (node instanceof FormNodeInputCheckbox) {
      return this.#transformFormNodeInputCheckbox(node)
    } else if (node instanceof FormNodeInputText) {
      return this.#transformFormNodeInput(node)
    } else if (node instanceof FormNodeInput) {
      return this.#transformFormNodeInput(node)
    } else if (node instanceof FormNodeLabel) {
      return this.#transformFormNodeWithChildren(node)
    } else if (node instanceof FormNodeSection) {
      return this.#transformFormNodeSection(node)
    } else if (node instanceof FormNodeWithChildren) {
      return this.#transformFormNodeWithChildren(node)
    } else if (node instanceof FormNodeText) {
      return this.#transformFormNodeText(node)
    } else if (node instanceof FormNodeWithElement) {
      return this.#tranformFormodeWithElement(node)
    }

    return new Text()
  }
}

export { HTMLFormBuilder }
