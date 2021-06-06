import { FormNodeJson, FormNode } from 'core/entities/FormNode'
import { NodeType } from 'core/enums/NodeType'
import { typeMapper } from 'core/utils/typeMapper'

interface FormNodeTextConfig {
  text: string
}

interface FormNodeTextJson extends FormNodeJson {
  text: string
}

class FormNodeText extends FormNode {
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
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeText] = FormNodeText

export { FormNodeTextConfig, FormNodeTextJson, FormNodeText }