import { FormNode } from '../FormNode'
import { FormNodeText, FormNodeTextJson } from '../FormNodeText'
import {
  FormNodeWithChildrenConfig,
  FormNodeWithChildrenJson,
  FormNodeWithChildren,
} from '../FormNodeWithChildren'
import { NodeType } from '../../enums/NodeType'
import { typeMapper } from '../../utils/typeMapper'

interface FormNodeLabelConfig extends FormNodeWithChildrenConfig {
  children: Array<FormNodeText>
  for?: string
}

interface FormNodeLabelJson extends FormNodeWithChildrenJson {
  children: Array<FormNodeTextJson>
  for?: string
}

class FormNodeLabel extends FormNodeWithChildren {
  public override className = 'FormNodeLabel'
  protected override _type: NodeType = NodeType.FormNodeLabel
  protected override _children: Array<FormNodeText>
  protected _for?: string

  constructor(id: string, config: FormNodeLabelConfig) {
    super(id, config)
    this._children = config.children ?? []
    this._for = config.for
    this._element = config.element ?? 'label'
  }

  override get children(): Array<FormNodeText> {
    return this._children
  }

  get for(): string {
    return this._for ?? ''
  }

  override toJson(): FormNodeLabelJson {
    return {
      ...super.toJson(),
      children: this.children.map((child) => child.toJson()),
      for: this.for,
    }
  }

  static override fromJson(json: FormNodeLabelJson): FormNodeLabel {
    const { id, children, ...rest } = json

    return new FormNodeLabel(id, {
      ...rest,
      children: children.map(
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
