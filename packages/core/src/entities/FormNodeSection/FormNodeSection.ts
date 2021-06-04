import { FormNodeWithChildrenConfig, FormNodeWithChildrenJson, FormNodeWithChildren } from 'entities/FormNodeWithChildren'
import { FormNode } from 'entities/FormNode'
import { NodeType } from 'enums/NodeType'
import { typeMapper } from 'utils/typeMapper'

interface FormNodeSectionConfig extends FormNodeWithChildrenConfig {
  title?: string
}

interface FormNodeSectionJson extends FormNodeWithChildrenJson {
  title: string
}

class FormNodeSection extends FormNodeWithChildren {
  protected _title?: string
  override _type: NodeType = NodeType.FormNodeSection

  constructor(id: string, config: FormNodeSectionConfig = {}) {
    super(id, config)
    this._title = config.title
  }

  get title(): string {
    return this._title ?? ''
  }

  override toJson(): FormNodeSectionJson {
    return {
      ...super.toJson(),
      title: this.title
    }
  }

  static override fromJson(json: FormNodeSectionJson) {
    return new FormNodeSection(json.id, {
      title: json.title,
      children: json.children.map((child) =>
        (typeMapper[child.type] as typeof FormNode).fromJson(child)
      ),
    })
  }
}

/**
 * To avoid circular dependency I'm adding values to typeMapper here
 */
 typeMapper[NodeType.FormNodeSection] = FormNodeSection

export { FormNodeSectionConfig, FormNodeSectionJson, FormNodeSection }
