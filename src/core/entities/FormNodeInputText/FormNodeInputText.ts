import { FormNodeInputJson, FormNodeInput } from 'core/entities/FormNodeInput'
import { NodeType } from 'core/enums/NodeType'
import { typeMapper } from 'core/utils/typeMapper'

class FormNodeInputText extends FormNodeInput {
  protected override _type: NodeType = NodeType.FormNodeInputText

  static override fromJson(json: FormNodeInputJson): FormNodeInputText {
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
