import {
  FormNodeWithChildrenConfig,
  FormNodeWithChildrenJson,
  FormNodeWithChildren,
} from '../FormNodeWithChildren'
import { FormNode } from '../FormNode'
import { NodeType } from '../../enums/NodeType'
import { typeMapper } from '../../utils/typeMapper'

interface FormNodeSectionConfig extends FormNodeWithChildrenConfig {
  title?: string
}

interface FormNodeSectionJson extends FormNodeWithChildrenJson {
  title: string
}

class FormNodeSection extends FormNodeWithChildren {
  public override className = 'FormNodeSection'
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

  static override toString(): string {
    return 'FormNodeSection'
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeSection] = FormNodeSection

export { FormNodeSectionConfig, FormNodeSectionJson, FormNodeSection }
