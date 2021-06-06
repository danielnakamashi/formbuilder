import { FormNode } from 'core/entities/FormNode'
import { FormNodeInput } from 'core/entities/FormNodeInput'
import { ActionType } from 'core/enums/automation/ActionType'
import { Condition } from 'core/enums/automation/Condition'

type Trigger = {
  field: FormNodeInput
  condition: Condition
  valueOrField: string | FormNodeInput
}

interface Action {
  type: ActionType.ChangeProperty
  node: FormNode
  properties: Record<string, string | FormNodeInput>
}

interface IAutomation {
  trigger: Trigger
  action: Action
}

interface TriggerJson {
  field: { id: string }
  condition: Condition
  valueOrField: string | { id: string }
}

interface ActionJson {
  type: ActionType.ChangeProperty
  node: { id: string }
  properties: Record<string, string>
}

interface AutomationJson {
  trigger: TriggerJson
  action: ActionJson
}

export { Trigger, Action, IAutomation, TriggerJson, ActionJson, AutomationJson }
