import { FormNode, FormNodeJson } from 'entities/FormNode'
import { FormNodeField } from 'entities/FormNodeField'
import { ActionType } from 'enums/automation/ActionType'
import { Condition } from 'enums/automation/Condition'
import { typeMapper } from 'utils/typeMapper'
import { Trigger, Action } from './types'

interface AutomationJson<TriggerValue> {
  trigger: {
    field: { id: string }
    condition: Condition
    valueOrField: TriggerValue | { id: string }
  }
  action: {
    type: ActionType.ChangeProperty
    node: { id: string }
    properties: Record<string, any | { id: string }>
  }
}
class Automation<TriggerValue> {
  protected _trigger: Trigger<TriggerValue>
  protected _action: Action

  constructor(trigger: Trigger<TriggerValue>, action: Action) {
    this._trigger = trigger
    this._action = action
  }

  get trigger(): Trigger<TriggerValue> {
    return this._trigger
  }

  get action(): Action {
    return this._action
  }

  protected triggerToJson() {
    return {
      field: { id: this.trigger.field.id },
      condition: this.trigger.condition,
      valueOrField:
        this.trigger.valueOrField instanceof FormNodeField
          ? { id: this.trigger.valueOrField.id }
          : this.trigger.valueOrField,
    }
  }

  protected actionToJson() {
    const actionJson: Record<string, unknown> = {
      type: this.action.type,
      node: { id: this.action.node.id },
    }

    if (this.action.type === ActionType.ChangeProperty) {
      actionJson.properties = Object.entries(this.action.properties).reduce(
        (prev, [key, value]) => {
          return {
            ...prev,
            [key]: value instanceof FormNodeField ? { id: value.id } : value,
          }
        },
        {}
      )
    }

    return actionJson
  }

  protected static getValueOrField<T>(
    nodes: ReadonlyArray<FormNodeJson>,
    valueOrField: T | { id: string }
  ) {
    if (typeof valueOrField === 'object' && valueOrField !== null && 'id' in valueOrField) {
      const id = valueOrField.id
      const triggerValue = nodes.find((node) => node.id === id)

      if (!triggerValue) {
        throw new Error('node not found')
      }

      return (typeMapper[triggerValue.type] as typeof FormNode).fromJson(triggerValue)
    } else {
      return valueOrField as T
    }
  }

  protected static findNodeById(nodes: ReadonlyArray<FormNodeJson>, id: string) {
    const node = nodes.find((node) => node.id === id)

    if (!node) {
      throw new Error('node not found')
    }

    return (typeMapper[node.type] as typeof FormNode).fromJson(node)
  }

  toJson() {
    return {
      trigger: this.triggerToJson(),
      action: this.actionToJson(),
    }
  }

  static fromJson<TriggerValue>(
    nodes: ReadonlyArray<FormNodeJson>,
    json: AutomationJson<TriggerValue>
  ) {
    const trigger = createTrigger<TriggerValue>({
      field: Automation.findNodeById(nodes, json.trigger.field.id) as FormNodeField<TriggerValue>,
      condition: json.trigger.condition,
      valueOrField: Automation.getValueOrField<TriggerValue>(nodes, json.trigger.valueOrField),
    } as Trigger<TriggerValue>)

    const action: Action = {
      type: json.action.type,
      node: Automation.findNodeById(nodes, json.action.node.id),
      properties: Object.entries(json.action.properties).reduce((prev, [key, value]) => {
        return {
          ...prev,
          [key]: Automation.getValueOrField(nodes, value),
        }
      }, {}),
    }

    return {
      trigger,
      action,
    }
  }
}

const createTrigger = <T>(trigger: Trigger<T>): Trigger<T> => trigger

export { Automation, createTrigger }
