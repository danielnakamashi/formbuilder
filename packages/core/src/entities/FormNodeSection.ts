import { FormNodeConfig, FormNodeJson, FormNode } from 'entities/FormNode'
import { NodeType } from 'enums/NodeType'
import { typeMapper } from 'utils/typeMapper'

interface FormNodeSectionConfig extends FormNodeConfig {
  title?: string
}

interface FormNodeSectionJson extends FormNodeJson {
  title: string
}

class FormNodeSection extends FormNode {
  protected _title?: string
  override _type: NodeType = NodeType.FormNodeSection

  constructor(id: string, config?: FormNodeSectionConfig) {
    super(id, config)
    this._title = config?.title
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

  static override  fromJson(json: FormNodeSectionJson) {
    return new FormNodeSection(json.id, {
      title: json.title,
      children: json.children.map((child) =>
        (typeMapper[child.type] as typeof FormNode).fromJson(child)
      ),
    })
  }
}

/**
 * To avoind circular dependency I'm adding values to typeMapper here
 */
 typeMapper[NodeType.FormNodeSection] = FormNodeSection

export { FormNodeSectionConfig, FormNodeSectionJson, FormNodeSection }
