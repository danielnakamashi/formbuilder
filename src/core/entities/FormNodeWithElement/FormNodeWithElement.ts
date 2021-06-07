import { FormNodeJson, FormNode } from 'core/entities/FormNode'
import { NodeType } from 'core/enums'

interface FormNodeWithElementConfig {
  element?: string
  isVisible?: boolean
}

interface FormNodeWithElementJson extends FormNodeJson {
  element?: string
  isVisible?: boolean
}

class FormNodeWithElement extends FormNode {
  protected override _type: NodeType = NodeType.FormNodeWithElement
  protected _element: string
  protected _isvisible: boolean

  constructor(id: string, config: FormNodeWithElementConfig = {}) {
    super(id)
    this._element = config.element ?? 'div'
    this._isvisible = config.isVisible ?? true
  }

  get element(): string {
    return this._element
  }

  get isVisible(): boolean {
    return this._isvisible
  }

  override toJson(): FormNodeWithElementJson {
    return {
      ...super.toJson(),
      element: this.element,
      isVisible: this.isVisible,
    }
  }

  static override fromJson(json: FormNodeWithElementJson): FormNodeWithElement {
    const { id, ...rest } = json

    return new FormNodeWithElement(id, rest)
  }
}

export { FormNodeWithElementConfig, FormNodeWithElementJson, FormNodeWithElement }
