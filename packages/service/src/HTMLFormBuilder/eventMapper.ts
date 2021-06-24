import { TriggerEvent, FormNodeInputText, FormNodeInputCheckbox } from '@formbuilda/core'

const eventMapper: Record<TriggerEvent, Record<string, string>> = {
  [TriggerEvent.Change]: {
    [FormNodeInputText.toString()]: 'change',
    [FormNodeInputCheckbox.toString()]: 'change',
  },
  [TriggerEvent.Click]: {},
}

export { eventMapper }
