import { TriggerEvent } from 'core/enums/automation/TriggerEvent'
import { FormNodeInputText } from 'core/entities/FormNodeInputText'
import { FormNodeInputCheckbox } from 'core/entities/FormNodeInputCheckbox'

const eventMapper: Record<TriggerEvent, Record<string, string>> = {
  [TriggerEvent.Change]: {
    [FormNodeInputText.toString()]: 'change',
    [FormNodeInputCheckbox.toString()]: 'change',
  },
  [TriggerEvent.Click]: {},
}

export { eventMapper }
