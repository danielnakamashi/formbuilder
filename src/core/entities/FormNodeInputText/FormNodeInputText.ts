import { FormNodeInputJson, FormNodeInput } from 'core/entities/FormNodeInput'
import { NodeType } from 'core/enums/NodeType'
import { typeMapper } from 'core/utils/typeMapper'

class FormNodeInputText extends FormNodeInput {
  public override className = 'FormNodeInputText'
  protected override _type: NodeType = NodeType.FormNodeInputText

  static override fromJson(json: FormNodeInputJson): FormNodeInputText {
    const { id, ...rest } = json

    return new FormNodeInputText(id, rest)
  }

  static override toString(): string {
    return 'FormNodeInputText'
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeInputText] = FormNodeInputText

export { FormNodeInputText }
