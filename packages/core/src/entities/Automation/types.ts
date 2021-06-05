import { FormNode } from 'entities/FormNode'
import { FormNodeField } from 'entities/FormNodeField'
import { ActionType } from 'enums/automation/ActionType'
import { Condition } from 'enums/automation/Condition'

type Trigger<T> =
  | {
      field: FormNodeField<T>
      condition: Condition.Equals
      valueOrField: T | FormNodeField<T>
    }
  | {
      field: FormNodeField<number>
      condition:
        | Condition.GreaterOrEqualsThan
        | Condition.GreaterThan
        | Condition.LessOrEqualsThan
        | Condition.LessThan
      valueOrField: number | FormNodeField<number>
    }

interface Action {
  type: ActionType.ChangeProperty
  node: FormNode
  properties: Record<string, any | FormNodeField<any>>
}

interface IAutomation<TriggerValue> {
  trigger: Trigger<TriggerValue>
  action: Action
}

export { Trigger, Action, IAutomation }
