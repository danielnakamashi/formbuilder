import { FormNode } from '../FormNode'
import { FormNodeInput } from '../FormNodeInput'
import { TriggerEvent } from '../../enums/automation/TriggerEvent'
import { TriggerAction } from '../../enums/automation/TriggerAction'
import { TriggerCondition } from '../../enums/automation/TriggerCondition'

type Trigger = {
  field: FormNodeInput
  event: TriggerEvent
  condition: TriggerCondition
  valueOrField: string | boolean | FormNodeInput
}
interface Action<FormNodeType extends FormNode = FormNode> {
  type: TriggerAction
  node: FormNodeType
}

interface IAutomation<FormNodeType extends FormNode> {
  trigger: Trigger
  action: Action<FormNodeType>
}

interface TriggerJson {
  field: { id: string }
  event: TriggerEvent
  condition: TriggerCondition
  valueOrField: string | boolean | { id: string }
}

interface ActionJson {
  type: TriggerAction
  node: { id: string }
}

interface AutomationJson {
  trigger: TriggerJson
  action: ActionJson
}

export { Trigger, Action, IAutomation, TriggerJson, ActionJson, AutomationJson }
