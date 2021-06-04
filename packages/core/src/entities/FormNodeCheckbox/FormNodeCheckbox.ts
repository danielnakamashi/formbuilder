import { FormNodeFieldJson, FormNodeField } from 'entities/FormNodeField'
import { NodeType } from 'enums/NodeType'
import { typeMapper } from 'utils/typeMapper'

// @ts-expect-error: ts(2417)
class FormNodeCheckbox extends FormNodeField<boolean> {
  override _type: NodeType = NodeType.FormNodeCheckbox

  static override fromJson(json: FormNodeFieldJson<boolean>): FormNodeCheckbox {
    return new FormNodeCheckbox(json.id, {
      name: json.name,
      value: json.value 
    })
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeCheckbox] = FormNodeCheckbox

export { FormNodeCheckbox }
