import { FormNode, FormNodeJson } from 'entities/FormNode'
import {
  FormNodeWithElementJson,
  FormNodeWithElement,
  FormNodeWithElementConfig,
} from 'entities/FormNodeWithElement/FormNodeWithElement'
import { NodeType } from 'enums/NodeType'
import { typeMapper } from 'utils/typeMapper'

interface FormNodeWithChildrenConfig extends FormNodeWithElementConfig {
  children?: Array<FormNode>
}

interface FormNodeWithChildrenJson extends FormNodeWithElementJson {
  children: Array<FormNodeJson>
}

class FormNodeWithChildren extends FormNodeWithElement {
  override _type: NodeType = NodeType.FormNodeWithChildren
  protected _children: Array<FormNode>

  constructor(id: string, config: FormNodeWithChildrenConfig = {}) {
    super(id, config)
    this._children = config.children ?? []
  }

  get children(): Array<FormNode> {
    return this._children
  }

  override toJson(): FormNodeWithChildrenJson {
    return {
      ...super.toJson(),
      children: this.children.map((child) => child.toJson()),
    }
  }

  static override fromJson(json: FormNodeWithChildrenJson): FormNodeWithChildren {
    const { id, ...jsonRest } = json

    return new FormNodeWithChildren(id, {
      ...jsonRest,
      children: json.children.map((child) =>
        (typeMapper[child.type] as typeof FormNode).fromJson(child)
      ),
    })
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeWithChildren] = FormNodeWithChildren

export { FormNodeWithChildrenConfig, FormNodeWithChildrenJson, FormNodeWithChildren }
