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

interface Action<U> {
  type: ActionType.ChangeProperty
  node: FormNode
  propertyValueOrField: U | FormNodeField<U>
}

interface Automation<TriggerValue, ActionValue> {
  trigger: Trigger<TriggerValue>
  action: Action<ActionValue>
}

const createTrigger = <T>(trigger: Trigger<T>): Trigger<T> => trigger

export { Automation, createTrigger }
