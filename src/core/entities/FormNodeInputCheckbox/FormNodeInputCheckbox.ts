import { FormNodeInputJson, FormNodeInput } from 'core/entities/FormNodeInput'
import { NodeType } from 'core/enums/NodeType'
import { typeMapper } from 'core/utils/typeMapper'

// @ts-expect-error: ts(2417)
class FormNodeInputCheckbox extends FormNodeInput<boolean> {
  protected override _type: NodeType = NodeType.FormNodeInputCheckbox

  static override fromJson(json: FormNodeInputJson<boolean>): FormNodeInputCheckbox {
    return new FormNodeInputCheckbox(json.id, {
      name: json.name,
      value: json.value,
    })
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeInputCheckbox] = FormNodeInputCheckbox

export { FormNodeInputCheckbox }
