import { FormNodeInputJson, FormNodeInput } from 'entities/FormNodeInput'
import { NodeType } from 'enums/NodeType'
import { typeMapper } from 'utils/typeMapper'

// @ts-expect-error: ts(2417
class FormNodeInputText extends FormNodeInput<string> {
  override _type: NodeType = NodeType.FormNodeInputText

  static override fromJson(json: FormNodeInputJson<string>): FormNodeInputText {
    return new FormNodeInputText(json.id, {
      name: json.name,
      value: json.value,
    })
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeInputText] = FormNodeInputText

export { FormNodeInputText }
