import { NodeType } from '../../enums/NodeType'
import { typeMapper } from '../../utils/typeMapper'
import { FormNode } from '../FormNode'
import {
  FormNodeWithChildren,
  FormNodeWithChildrenConfig,
  FormNodeWithChildrenJson,
} from '../FormNodeWithChildren'

interface FormNodeFieldsetConfig extends FormNodeWithChildrenConfig {
  legend: string
}

interface FormNodeFieldsetJson extends FormNodeWithChildrenJson {
  legend: string
}

class FormNodeFieldset extends FormNodeWithChildren {
  public override className = 'FormNodeFieldset'
  protected override _type: NodeType = NodeType.FormNodeFieldset
  protected _legend: string

  constructor(id: string, config: FormNodeFieldsetConfig) {
    super(id, config)
    this._element = 'fieldset'
    this._legend = config.legend
  }

  get legend(): string {
    return this._legend
  }

  override toJson(): FormNodeFieldsetJson {
    return {
      ...super.toJson(),
      legend: this.legend,
    }
  }

  static override fromJson(json: FormNodeFieldsetJson): FormNodeFieldset {
    const { id, children, ...rest } = json

    return new FormNodeFieldset(id, {
      ...rest,
      children: children.map((child) =>
        (typeMapper[child.type] as typeof FormNode).fromJson(child)
      ),
    })
  }

  static override toString(): string {
    return 'FormNodeFieldset'
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeFieldset] = FormNodeFieldset

export { FormNodeFieldsetConfig, FormNodeFieldsetJson, FormNodeFieldset }
