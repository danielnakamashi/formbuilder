import { FormNodeJson, FormNode } from 'core/entities/FormNode'
import { NodeType } from 'core/enums'

interface FormNodeWithElementConfig {
  element?: string
}

interface FormNodeWithElementJson extends FormNodeJson {
  element?: string
}

class FormNodeWithElement extends FormNode {
  protected override _type: NodeType = NodeType.FormNodeWithElement
  protected _element: string

  constructor(id: string, config: FormNodeWithElementConfig = {}) {
    super(id)
    this._element = config.element ?? 'div'
  }

  get element(): string {
    return this._element
  }

  override toJson(): FormNodeWithElementJson {
    return {
      ...super.toJson(),
      element: this.element,
    }
  }

  static override fromJson(json: FormNodeWithElementJson): FormNodeWithElement {
    return new FormNodeWithElement(json.id, {
      element: json.element,
    })
  }
}

export { FormNodeWithElementConfig, FormNodeWithElementJson, FormNodeWithElement }
