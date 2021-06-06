import {
  FormNodeWithChildrenConfig,
  FormNodeWithChildrenJson,
  FormNodeWithChildren,
} from 'core/entities/FormNodeWithChildren'
import { FormNode } from 'core/entities/FormNode'
import { NodeType } from 'core/enums/NodeType'
import { typeMapper } from 'core/utils/typeMapper'

interface FormNodeSectionConfig extends FormNodeWithChildrenConfig {
  title?: string
}

interface FormNodeSectionJson extends FormNodeWithChildrenJson {
  title: string
}

class FormNodeSection extends FormNodeWithChildren {
  protected override _type: NodeType = NodeType.FormNodeSection
  protected _title?: string

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
      title: this.title,
    }
  }

  static override fromJson(json: FormNodeSectionJson): FormNodeSection {
    return new FormNodeSection(json.id, {
      title: json.title,
      children: json.children.map((child) =>
        (typeMapper[child.type] as typeof FormNode).fromJson(child)
      ),
    })
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeSection] = FormNodeSection

export { FormNodeSectionConfig, FormNodeSectionJson, FormNodeSection }
