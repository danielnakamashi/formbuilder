import { FormNode, FormNodeJson } from 'entities/FormNode'
import { NodeType } from 'enums/NodeType'
import { typeMapper } from 'utils/typeMapper'

interface FormNodeWithChildrenConfig {
  children?: Array<FormNode>
}

interface FormNodeWithChildrenJson extends FormNodeJson {
  children: Array<FormNodeJson>
}

class FormNodeWithChildren extends FormNode {
  protected _children: Array<FormNode>
  override _type: NodeType = NodeType.FormNodeWithChildren

  constructor(id: string, config: FormNodeWithChildrenConfig = {}) {
    super(id)
    this._children = config.children ?? []
  }

  get children(): Array<FormNode> {
    return this._children
  }

  override toJson(): FormNodeWithChildrenJson {
    return {
      ...super.toJson(),
      children: this.children.map((child) => child.toJson())
    }
  }

  static override fromJson(json: FormNodeWithChildrenJson): FormNodeWithChildren {
    return new FormNodeWithChildren(json.id, {
      children: json.children.map((child) => (typeMapper[child.type] as typeof FormNode).fromJson(child))
    })
  }
}

/**
 * To avoid circular dependency I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeWithChildren] = FormNodeWithChildren

export { FormNodeWithChildrenConfig, FormNodeWithChildrenJson, FormNodeWithChildren }