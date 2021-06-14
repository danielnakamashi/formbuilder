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
  public override className = 'FormNodeInputCheckbox'
  protected override _type: NodeType = NodeType.FormNodeInputCheckbox
  protected _checked: boolean

  constructor(id: string, config: FormNodeInputCheckboxConfig) {
    super(id, config)
    this._checked = config.checked ?? false
    this._inputType = 'checkbox'
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
    const { id, ...rest } = json

    return new FormNodeInputCheckbox(id, rest)
  }

  static override toString(): string {
    return 'FormNodeInputCheckbox'
  }
}

/**
 * To avoid circular dependency, I'm adding values to typeMapper here
 */
typeMapper[NodeType.FormNodeInputCheckbox] = FormNodeInputCheckbox

export { FormNodeInputCheckbox }
