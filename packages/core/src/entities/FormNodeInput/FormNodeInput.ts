import {
  FormNodeWithElement,
  FormNodeWithElementConfig,
  FormNodeWithElementJson,
} from 'entities/FormNodeWithElement'
import { NodeType } from 'enums/NodeType'
import { typeMapper } from 'utils/typeMapper'

interface FormNodeInputConfig<Value> extends FormNodeWithElementConfig {
  name: string
  value: Value
}

interface FormNodeInputJson<Value> extends FormNodeWithElementJson {
  name: string
  value: Value
}

class FormNodeInput<Value> extends FormNodeWithElement {
  override _type: NodeType = NodeType.FormNodeInput
  protected _name: string
  protected _value: Value

  constructor(id: string, config: FormNodeInputConfig<Value>) {
    super(id)
    this._element = config.element ?? 'input'
    this._name = config.name
    this._value = config.value
  }

  get name(): string {
    return this._name
  }

  get value(): Value {
    return this._value
  }

  override toJson(): FormNodeInputJson<Value> {
    return {
      ...super.toJson(),
      name: this.name,
      value: this.value,
    }
  }

  static override fromJson<T>(json: FormNodeInputJson<T>): FormNodeInput<T> {
    return new FormNodeInput<T>(json.id, {
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
