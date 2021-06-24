import { Automation } from './Automation'
import { FormNodeText, FormNodeTextJson } from '../FormNodeText'
import { TriggerCondition } from '../../enums/automation/TriggerCondition'
import { TriggerAction } from '../../enums/automation/TriggerAction'
import { FormNodeInputText } from '../FormNodeInputText'
import { NodeType } from '../../enums/NodeType'
import { FormNodeInputJson } from '../FormNodeInput'
import { TriggerEvent } from '../../enums/automation/TriggerEvent'
import { AutomationJson } from './types'

describe('Automation', () => {
  describe('should convert to json', () => {
    test('with plain values', () => {
      const automation = new Automation(
        {
          field: new FormNodeInputText('id', { name: 'name', value: 'value' }),
          event: TriggerEvent.Change,
          condition: TriggerCondition.Equals,
          valueOrField: 'value',
        },
        {
          type: TriggerAction.Hide,
          node: new FormNodeText('id2', { text: 'text' }),
        }
      )

      expect(automation.toJson()).toEqual({
        trigger: {
          field: { id: 'id' },
          event: TriggerEvent.Change,
          condition: TriggerCondition.Equals,
          valueOrField: 'value',
        },
        action: {
          type: TriggerAction.Hide,
          node: { id: 'id2' },
        },
      } as AutomationJson)
    })

    test('with field values', () => {
      const formInputText = new FormNodeInputText('id2', { name: 'name2', value: 'value2' })
      const automation = new Automation(
        {
          field: new FormNodeInputText('id', { name: 'name', value: 'value' }),
          event: TriggerEvent.Change,
          condition: TriggerCondition.Equals,
          valueOrField: formInputText,
        },
        {
          type: TriggerAction.Show,
          node: new FormNodeText('id3', { text: 'text' }),
        }
      )

      expect(automation.toJson()).toEqual({
        trigger: {
          field: { id: 'id' },
          event: TriggerEvent.Change,
          condition: TriggerCondition.Equals,
          valueOrField: { id: 'id2' },
        },
        action: {
          type: TriggerAction.Show,
          node: { id: 'id3' },
        },
      } as AutomationJson)
    })
  })

  describe('should convert from json', () => {
    test('with plain values', () => {
      const automation = Automation.fromJson(
        [
          {
            id: 'id',
            type: NodeType.FormNodeInputText,
            name: 'name',
            value: 'value',
          } as FormNodeInputJson,
          {
            id: 'id2',
            type: NodeType.FormNodeText,
            text: 'text',
          } as FormNodeTextJson,
        ],
        {
          trigger: {
            field: { id: 'id' },
            event: TriggerEvent.Change,
            condition: TriggerCondition.Equals,
            valueOrField: 'value',
          },
          action: {
            type: TriggerAction.Hide,
            node: { id: 'id2' },
          },
        } as AutomationJson
      )

      expect(automation).toBeInstanceOf(Automation)
      expect(automation.trigger.field.id).toEqual('id')
      expect(automation.trigger.field.type).toEqual(NodeType.FormNodeInputText)
      expect(automation.trigger.field.name).toEqual('name')
      expect(automation.trigger.field.value).toEqual('value')
      expect(automation.trigger.event).toEqual(TriggerEvent.Change)
      expect(automation.trigger.condition).toEqual(TriggerCondition.Equals)
      expect(automation.trigger.valueOrField).toEqual('value')
      expect(automation.action.type).toEqual(TriggerAction.Hide)
    })

    test('with field values', () => {
      const automation = Automation.fromJson(
        [
          {
            id: 'id',
            type: NodeType.FormNodeInputText,
            name: 'name',
            value: 'value',
          } as FormNodeInputJson,
          {
            id: 'id2',
            type: NodeType.FormNodeInputText,
            name: 'name2',
            value: 'value2',
          } as FormNodeInputJson,
          {
            id: 'id3',
            type: NodeType.FormNodeText,
            text: 'text',
          } as FormNodeTextJson,
        ],
        {
          trigger: {
            field: { id: 'id' },
            event: TriggerEvent.Change,
            condition: TriggerCondition.Equals,
            valueOrField: { id: 'id2' },
          },
          action: {
            type: TriggerAction.Show,
            node: { id: 'id3' },
          },
        } as AutomationJson
      )

      expect(automation).toBeInstanceOf(Automation)
      expect(automation.trigger.field.id).toEqual('id')
      expect(automation.trigger.field.type).toEqual(NodeType.FormNodeInputText)
      expect(automation.trigger.field.name).toEqual('name')
      expect(automation.trigger.field.value).toEqual('value')
      expect(automation.trigger.event).toEqual(TriggerEvent.Change)
      expect(automation.trigger.condition).toEqual(TriggerCondition.Equals)

      const triggerValue = automation.trigger.valueOrField as FormNodeInputText

      expect(triggerValue.id).toEqual('id2')
      expect(triggerValue.type).toEqual(NodeType.FormNodeInputText)
      expect(triggerValue.name).toEqual('name2')
      expect(triggerValue.value).toEqual('value2')
      expect(automation.action.type).toEqual(TriggerAction.Show)

      const actionNode = automation.action.node as FormNodeText

      expect(actionNode.id).toEqual('id3')
      expect(actionNode.type).toEqual(NodeType.FormNodeText)
      expect(actionNode.text).toEqual('text')
    })
  })
})
