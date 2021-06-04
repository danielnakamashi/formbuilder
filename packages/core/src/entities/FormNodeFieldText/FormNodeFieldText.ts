import { FormNodeFieldJson, FormNodeField } from 'entities/FormNodeField'
import { NodeType } from 'enums/NodeType'
import { typeMapper } from 'utils/typeMapper'

// @ts-expect-error: ts(2417
class FormNodeFieldText extends FormNodeField<string> {
  override _type: NodeType = NodeType.FormNodeFieldText

  static override fromJson(json: FormNodeFieldJson<string>): FormNodeFieldText {
    return new FormNodeFieldText(json.id, {
      name: json.name,
      value: json.value 
    })
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeFieldText] = FormNodeFieldText

export { FormNodeFieldText }