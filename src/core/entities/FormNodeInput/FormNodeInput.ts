import {
  FormNodeWithElement,
  FormNodeWithElementConfig,
  FormNodeWithElementJson,
} from 'core/entities/FormNodeWithElement'
import { NodeType } from 'core/enums/NodeType'
import { typeMapper } from 'core/utils/typeMapper'

interface FormNodeInputConfig extends FormNodeWithElementConfig {
  name: string
  value: string
  inputType?: string
}

interface FormNodeInputJson extends FormNodeWithElementJson {
  name: string
  value: string
  inputType?: string
}

class FormNodeInput extends FormNodeWithElement {
  protected override _type: NodeType = NodeType.FormNodeInput
  protected _name: string
  protected _value: string
  protected _inputType: string

  constructor(id: string, config: FormNodeInputConfig) {
    super(id)
    this._element = config.element ?? 'input'
    this._name = config.name
    this._value = config.value
    this._inputType = config.inputType ?? 'text'
  }

  get name(): string {
    return this._name
  }

  get value(): string {
    return this._value
  }

  get inputType(): string {
    return this._inputType
  }

  override toJson(): FormNodeInputJson {
    return {
      ...super.toJson(),
      name: this.name,
      value: this.value,
      inputType: this.inputType,
    }
  }

  static override fromJson(json: FormNodeInputJson): FormNodeInput {
    return new FormNodeInput(json.id, {
      name: json.name,
      value: json.value,
      inputType: json.inputType,
    })
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeInput] = FormNodeInput

export { FormNodeInputConfig, FormNodeInputJson, FormNodeInput }
