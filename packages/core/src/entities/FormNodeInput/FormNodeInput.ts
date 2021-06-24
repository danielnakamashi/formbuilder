import {
  FormNodeWithElement,
  FormNodeWithElementConfig,
  FormNodeWithElementJson,
} from '../FormNodeWithElement'
import { NodeType } from '../../enums/NodeType'
import { typeMapper } from '../../utils/typeMapper'

interface FormNodeInputConfig extends FormNodeWithElementConfig {
  name: string
  value?: string
  inputType?: string
  isDisabled?: boolean
  isRequired?: boolean
}

interface FormNodeInputJson extends FormNodeWithElementJson {
  name: string
  value: string
  inputType?: string
  isDisabled?: boolean
  isRequired?: boolean
}

class FormNodeInput extends FormNodeWithElement {
  public override className = 'FormNodeInput'
  protected override _type: NodeType = NodeType.FormNodeInput
  protected _name: string
  protected _value: string
  protected _inputType: string
  protected _isDisabled: boolean
  protected _isRequired: boolean

  constructor(id: string, config: FormNodeInputConfig) {
    super(id, config)
    this._element = config.element ?? 'input'
    this._name = config.name
    this._value = config.value ?? ''
    this._inputType = config.inputType ?? 'text'
    this._isDisabled = config.isDisabled ?? false
    this._isRequired = config.isRequired ?? false
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

  get isDisabled(): boolean {
    return this._isDisabled
  }

  get isRequired(): boolean {
    return this._isRequired
  }

  override toJson(): FormNodeInputJson {
    return {
      ...super.toJson(),
      name: this.name,
      value: this.value,
      inputType: this.inputType,
      isDisabled: this.isDisabled,
      isRequired: this.isRequired,
    }
  }

  static override fromJson(json: FormNodeInputJson): FormNodeInput {
    const { id, ...rest } = json

    return new FormNodeInput(id, rest)
  }

  static override toString(): string {
    return 'FormNodeInput'
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeInput] = FormNodeInput

export { FormNodeInputConfig, FormNodeInputJson, FormNodeInput }
