import { NodeType } from 'core/enums/NodeType'
import { typeMapper } from 'core/utils/typeMapper'

interface FormNodeJson {
  id: string
  type: NodeType
}

class FormNode {
  protected _id: string
  protected _type: NodeType = NodeType.FormNode

  constructor(id: string) {
    this._id = id
  }

  get id(): string {
    return this._id
  }

  get type(): NodeType {
    return this._type
  }

  toJson(): FormNodeJson {
    return {
      id: this.id,
      type: this.type,
    }
  }

  static fromJson(json: FormNodeJson): FormNode {
    return new FormNode(json.id)
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNode] = FormNode

export { FormNodeJson, FormNode }
