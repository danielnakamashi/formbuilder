import { FormNode, FormNodeJson } from 'core/entities/FormNode'
import { FormNodeInput } from 'core/entities/FormNodeInput'
import { ActionType } from 'core/enums/automation/ActionType'
import { Condition } from 'core/enums/automation/Condition'
import { typeMapper } from 'core/utils/typeMapper'
import { Trigger, Action, TriggerJson, ActionJson } from './types'

interface AutomationJson {
  trigger: {
    field: { id: string }
    condition: Condition
    valueOrField: string | { id: string }
  }
  action: {
    type: ActionType.ChangeProperty
    node: { id: string }
    properties: Record<string, string | { id: string }>
  }
}
class Automation {
  protected _trigger: Trigger
  protected _action: Action

  constructor(trigger: Trigger, action: Action) {
    this._trigger = trigger
    this._action = action
  }

  get trigger(): Trigger {
    return this._trigger
  }

  get action(): Action {
    return this._action
  }

  protected triggerToJson(): TriggerJson {
    return {
      field: { id: this.trigger.field.id },
      condition: this.trigger.condition,
      valueOrField:
        this.trigger.valueOrField instanceof FormNodeInput
          ? { id: this.trigger.valueOrField.id }
          : this.trigger.valueOrField,
    }
  }

  protected actionToJson(): ActionJson {
    return {
      type: this.action.type,
      node: { id: this.action.node.id },
      properties: Object.entries(this.action.properties).reduce((prev, [key, value]) => {
        return {
          ...prev,
          [key]: value instanceof FormNodeInput ? { id: value.id } : value,
        }
      }, {}),
    }
  }

  protected static getValueOrField(
    nodes: ReadonlyArray<FormNodeJson>,
    valueOrField: string | { id: string }
  ): FormNodeInput | string {
    if (typeof valueOrField === 'object' && valueOrField !== null && 'id' in valueOrField) {
      const id = valueOrField.id
      const triggerValue = nodes.find((node) => node.id === id)

      if (!triggerValue) {
        throw new Error('node not found')
      }

      return (typeMapper[triggerValue.type] as typeof FormNode).fromJson(
        triggerValue
      ) as FormNodeInput
    } else {
      return valueOrField
    }
  }

  protected static findNodeById(nodes: ReadonlyArray<FormNodeJson>, id: string): FormNode {
    const node = nodes.find((node) => node.id === id)

    if (!node) {
      throw new Error('node not found')
    }

    return (typeMapper[node.type] as typeof FormNode).fromJson(node)
  }

  toJson(): AutomationJson {
    return {
      trigger: this.triggerToJson(),
      action: this.actionToJson(),
    }
  }

  static fromJson(nodes: ReadonlyArray<FormNodeJson>, json: AutomationJson): Automation {
    const trigger = {
      field: Automation.findNodeById(nodes, json.trigger.field.id) as FormNodeInput,
      condition: json.trigger.condition,
      valueOrField: Automation.getValueOrField(nodes, json.trigger.valueOrField),
    }

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

    return new Automation(trigger, action)
  }
}

export { Automation }
