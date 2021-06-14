import { FormNode } from 'core/entities/FormNode'
import { FormNodeInput } from 'core/entities/FormNodeInput'
import { TriggerEvent } from 'core/enums/automation/TriggerEvent'
import { TriggerAction } from 'core/enums/automation/TriggerAction'
import { TriggerCondition } from 'core/enums/automation/TriggerCondition'

type Trigger = {
  field: FormNodeInput
  event: TriggerEvent
  condition: TriggerCondition
  valueOrField: string | FormNodeInput
}
interface Action<FormNodeType extends typeof FormNode = typeof FormNode> {
  type: TriggerAction
  node: InstanceType<FormNodeType>
}

interface IAutomation<FormNodeType extends typeof FormNode> {
  trigger: Trigger
  action: Action<FormNodeType>
}

interface TriggerJson {
  field: { id: string }
  event: TriggerEvent
  condition: TriggerCondition
  valueOrField: string | { id: string }
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
