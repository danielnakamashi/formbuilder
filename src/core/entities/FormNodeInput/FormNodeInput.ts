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
}

interface FormNodeInputJson extends FormNodeWithElementJson {
  name: string
  value: string
}

class FormNodeInput extends FormNodeWithElement {
  protected override _type: NodeType = NodeType.FormNodeInput
  protected _name: string
  protected _value: string

  constructor(id: string, config: FormNodeInputConfig) {
    super(id)
    this._element = config.element ?? 'input'
    this._name = config.name
    this._value = config.value
  }

  get name(): string {
    return this._name
  }

  get value(): string {
    return this._value
  }

  override toJson(): FormNodeInputJson {
    return {
      ...super.toJson(),
      name: this.name,
      value: this.value,
    }
  }

  static override fromJson(json: FormNodeInputJson): FormNodeInput {
    return new FormNodeInput(json.id, {
      name: json.name,
      value: json.value,
    })
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeInput] = FormNodeInput

export { FormNodeInputConfig, FormNodeInputJson, FormNodeInput }
