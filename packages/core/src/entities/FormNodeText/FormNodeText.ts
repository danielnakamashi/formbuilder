import { FormNodeJson, FormNode } from '../FormNode'
import { NodeType } from '../../enums/NodeType'
import { typeMapper } from '../../utils/typeMapper'

interface FormNodeTextConfig {
  text: string
}

interface FormNodeTextJson extends FormNodeJson {
  text: string
}

class FormNodeText extends FormNode {
  public override className = 'FormNodeText'
  protected override _type: NodeType = NodeType.FormNodeText
  _text: string

  constructor(id: string, config: FormNodeTextConfig) {
    super(id)
    this._text = config.text
  }

  get text(): string {
    return this._text
  }

  override toJson(): FormNodeTextJson {
    return {
      ...super.toJson(),
      text: this.text,
    }
  }

  static override fromJson(json: FormNodeTextJson): FormNodeText {
    return new FormNodeText(json.id, {
      text: json.text,
    })
  }

  static override toString(): string {
    return 'FormNodeText'
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeText] = FormNodeText

export { FormNodeTextConfig, FormNodeTextJson, FormNodeText }
