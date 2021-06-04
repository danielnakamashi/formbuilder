import { FormNodeJson, FormNode } from 'entities/FormNode'
import { NodeType } from 'enums/NodeType'
import { typeMapper } from 'utils/typeMapper'

interface FormNodeFieldConfig<Value> {
  name: string
  value: Value
}

interface FormNodeFieldJson<Value> extends FormNodeJson {
  name: string
  value: Value
}

class FormNodeField<Value> extends FormNode {
  override _type: NodeType = NodeType.FormNodeField
  protected _name: string
  protected _value: Value

  constructor(id: string, config: FormNodeFieldConfig<Value>) {
    super(id)
    this._name = config.name
    this._value = config.value
  }

  get name(): string {
    return this._name
  }

  get value(): Value {
    return this._value
  }

  override toJson(): FormNodeFieldJson<Value> {
    return {
      ...super.toJson(),
      name: this.name,
      value: this.value
    }
  }

  static override fromJson<T>(json: FormNodeFieldJson<T>): FormNodeField<T> {
    return new FormNodeField<T>(json.id, {
      name: json.name,
      value: json.value
    })
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeField] = FormNodeField

export { FormNodeFieldConfig, FormNodeFieldJson, FormNodeField }