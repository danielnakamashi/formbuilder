import { FormNode } from 'core/entities/FormNode'
import { FormNodeText, FormNodeTextJson } from 'core/entities/FormNodeText'
import {
  FormNodeWithChildrenConfig,
  FormNodeWithChildrenJson,
  FormNodeWithChildren,
} from 'core/entities/FormNodeWithChildren'
import { NodeType } from 'core/enums/NodeType'
import { typeMapper } from 'core/utils/typeMapper'

interface FormNodeLabelConfig extends FormNodeWithChildrenConfig {
  children: Array<FormNodeText>
}

interface FormNodeLabelJson extends FormNodeWithChildrenJson {
  children: Array<FormNodeTextJson>
}

class FormNodeLabel extends FormNodeWithChildren {
  public override className = 'FormNodeLabel'
  protected override _type: NodeType = NodeType.FormNodeLabel

  constructor(id: string, config: FormNodeLabelConfig) {
    super(id, config)
    this._element = config.element ?? 'label'
  }

  static override fromJson(json: FormNodeLabelJson): FormNodeLabel {
    const { id, ...rest } = json

    return new FormNodeLabel(id, {
      ...rest,
      children: json.children.map(
        (child) => (typeMapper[child.type] as typeof FormNode).fromJson(child) as FormNodeText
      ),
    })
  }

  static override toString(): string {
    return 'FormNodeLabel'
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeLabel] = FormNodeLabel

export { FormNodeLabelConfig, FormNodeLabelJson, FormNodeLabel }
