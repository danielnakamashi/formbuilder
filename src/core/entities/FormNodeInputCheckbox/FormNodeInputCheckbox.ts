import { FormNodeInputJson, FormNodeInput } from 'core/entities/FormNodeInput'
import { NodeType } from 'core/enums/NodeType'
import { typeMapper } from 'core/utils/typeMapper'
import { FormNodeInputConfig } from '../FormNodeInput/FormNodeInput'

interface FormNodeInputCheckboxConfig extends FormNodeInputConfig {
  checked?: boolean
}

interface FormNodeInputCheckboxJson extends FormNodeInputJson {
  checked?: boolean
}

class FormNodeInputCheckbox extends FormNodeInput {
  protected override _type: NodeType = NodeType.FormNodeInputCheckbox
  protected _checked: boolean

  constructor(id: string, config: FormNodeInputCheckboxConfig) {
    super(id, config)
    this._checked = config.checked ?? false
  }

  get checked(): boolean {
    return this._checked
  }

  override toJson(): FormNodeInputCheckboxJson {
    return {
      ...super.toJson(),
      checked: this.checked,
    }
  }

  static override fromJson(json: FormNodeInputCheckboxJson): FormNodeInputCheckbox {
    return new FormNodeInputCheckbox(json.id, {
      name: json.name,
      value: json.value,
      checked: json.checked,
    })
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeInputCheckbox] = FormNodeInputCheckbox

export { FormNodeInputCheckbox }
