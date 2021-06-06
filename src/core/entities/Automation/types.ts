import { FormNode } from 'core/entities/FormNode'
import { FormNodeInput } from 'core/entities/FormNodeInput'
import { ActionType } from 'core/enums/automation/ActionType'
import { Condition } from 'core/enums/automation/Condition'

type Trigger<T> =
  | {
      field: FormNodeInput<T>
      condition: Condition.Equals
      valueOrField: T | FormNodeInput<T>
    }
  | {
      field: FormNodeInput<number>
      condition:
        | Condition.GreaterOrEqualsThan
        | Condition.GreaterThan
        | Condition.LessOrEqualsThan
        | Condition.LessThan
      valueOrField: number | FormNodeInput<number>
    }

interface Action {
  type: ActionType.ChangeProperty
  node: FormNode
  properties: Record<string, any | FormNodeInput<any>>
}

interface IAutomation<TriggerValue> {
  trigger: Trigger<TriggerValue>
  action: Action
}

interface TriggerJson<T> {
  field: { id: string }
  condition: Condition
  valueOrField: T | { id: string }
}

interface ActionJson {
  type: ActionType.ChangeProperty
  node: { id: string }
  properties: Record<string, unknown>
}

interface AutomationJson<TriggerValue> {
  trigger: TriggerJson<TriggerValue>
  action: ActionJson
}

export { Trigger, Action, IAutomation, TriggerJson, ActionJson, AutomationJson }
