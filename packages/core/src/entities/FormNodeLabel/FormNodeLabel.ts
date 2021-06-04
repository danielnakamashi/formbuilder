import { FormNode } from 'entities/FormNode'
import { FormNodeText, FormNodeTextJson } from 'entities/FormNodeText'
import {
  FormNodeWithChildrenConfig,
  FormNodeWithChildrenJson,
  FormNodeWithChildren,
} from 'entities/FormNodeWithChildren'
import { NodeType } from 'enums/NodeType'
import { typeMapper } from 'utils/typeMapper'

interface FormNodeLabelConfig extends FormNodeWithChildrenConfig {
  children: Array<FormNodeText>
}

interface FormNodeLabelJson extends FormNodeWithChildrenJson {
  children: Array<FormNodeTextJson>
}

class FormNodeLabel extends FormNodeWithChildren {
  override _type: NodeType = NodeType.FormNodeLabel

  constructor(id: string, config: FormNodeLabelConfig) {
    super(id, config)
  }

  static override fromJson(json: FormNodeLabelJson): FormNodeLabel {
    return new FormNodeLabel(json.id, {
      children: json.children.map((child) => (typeMapper[child.type] as typeof FormNode).fromJson(child) as FormNodeText)
    })
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeLabel] = FormNodeLabel

export { FormNodeLabelConfig, FormNodeLabelJson, FormNodeLabel }
