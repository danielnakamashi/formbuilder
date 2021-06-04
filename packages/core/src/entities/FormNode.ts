import { NodeType } from 'enums/NodeType'
import { typeMapper } from 'utils/typeMapper'

interface FormNodeConfig {
  children?: Array<FormNode>
}

interface FormNodeJson {
  id: string
  type: NodeType
  children: Array<FormNodeJson>
}

class FormNode {
  protected _id: string
  protected _type: NodeType = NodeType.FormNode
  protected _children?: Array<FormNode>

  constructor(id: string, config?: FormNodeConfig) {
    this._id = id
    this._children = config?.children
  }

  get id(): string {
    return this._id
  }

  get type(): NodeType {
    return this._type
  }

  get children(): Array<FormNode> {
    return this._children ?? []
  }

  toJson(): FormNodeJson {
    return {
      id: this.id,
      type: this.type,
      children: this.children.map((child) => child.toJson()),
    }
  }

  static fromJson(json: FormNodeJson): FormNode {
    return new FormNode(json.id, {
      children: json.children.map((child) =>
        (typeMapper[child.type] as typeof FormNode).fromJson(child)
      ),
    })
  }
}

/**
 * To avoind circular dependency I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNode] = FormNode

export { FormNodeConfig, FormNode }
