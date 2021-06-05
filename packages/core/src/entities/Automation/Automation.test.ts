import { Automation, createTrigger } from './Automation'
import { FormNodeText, FormNodeTextJson } from 'entities/FormNodeText'
import { Condition } from 'enums/automation/Condition'
import { ActionType } from 'enums/automation/ActionType'
import { FormNodeFieldText } from 'entities/FormNodeFieldText'
import { NodeType } from 'enums/NodeType'
import { FormNodeFieldJson } from 'entities/FormNodeField'

describe('Automation', () => {
  describe('should convert to json', () => {
    test('with plain values', () => {
      const automation = new Automation(
        createTrigger({
          field: new FormNodeFieldText('id', { name: 'name', value: 'value' }),
          condition: Condition.Equals,
          valueOrField: 'value',
        }),
        {
          type: ActionType.ChangeProperty,
          node: new FormNodeText('id2', { text: 'text' }),
          properties: {
            text: 'text2',
          },
        }
      )

      expect(automation.toJson()).toEqual({
        trigger: {
          field: { id: 'id' },
          condition: Condition.Equals,
          valueOrField: 'value',
        },
        action: {
          type: ActionType.ChangeProperty,
          node: { id: 'id2' },
          properties: {
            text: 'text2',
          },
        },
      })
    })

    test('with field values', () => {
      const formFieldText = new FormNodeFieldText('id2', { name: 'name2', value: 'value2' })
      const automation = new Automation(
        createTrigger({
          field: new FormNodeFieldText('id', { name: 'name', value: 'value' }),
          condition: Condition.Equals,
          valueOrField: formFieldText,
        }),
        {
          type: ActionType.ChangeProperty,
          node: new FormNodeText('id3', { text: 'text' }),
          properties: {
            text: formFieldText,
          },
        }
      )

      expect(automation.toJson()).toEqual({
        trigger: {
          field: { id: 'id' },
          condition: Condition.Equals,
          valueOrField: { id: 'id2' },
        },
        action: {
          type: ActionType.ChangeProperty,
          node: { id: 'id3' },
          properties: {
            text: { id: 'id2' },
          },
        },
      })
    })
  })

  describe('should convert from json', () => {
    test('with plain values', () => {
      const automation = Automation.fromJson(
        [
          {
            id: 'id',
            type: NodeType.FormNodeFieldText,
            name: 'name',
            value: 'value',
          } as FormNodeFieldJson<string>,
          {
            id: 'id2',
            type: NodeType.FormNodeText,
            text: 'text',
          } as FormNodeTextJson,
        ],
        {
          trigger: {
            field: { id: 'id' },
            condition: Condition.Equals,
            valueOrField: 'value',
          },
          action: {
            type: ActionType.ChangeProperty,
            node: { id: 'id2' },
            properties: {
              text: 'text2',
            },
          },
        }
      )

      expect(automation.trigger.field.id).toEqual('id')
      expect(automation.trigger.field.type).toEqual(NodeType.FormNodeFieldText)
      expect(automation.trigger.field.name).toEqual('name')
      expect(automation.trigger.field.value).toEqual('value')
      expect(automation.trigger.condition).toEqual(Condition.Equals)
      expect(automation.trigger.valueOrField).toEqual('value')
      expect(automation.action.type).toEqual(ActionType.ChangeProperty)

      const actionNode = automation.action.node as FormNodeText

      expect(actionNode.id).toEqual('id2')
      expect(actionNode.type).toEqual(NodeType.FormNodeText)
      expect(actionNode.text).toEqual('text')
      expect(automation.action.properties).toEqual({ text: 'text2' })
    })

    test('with field values', () => {
      const automation = Automation.fromJson(
        [
          {
            id: 'id',
            type: NodeType.FormNodeFieldText,
            name: 'name',
            value: 'value',
          } as FormNodeFieldJson<string>,
          {
            id: 'id2',
            type: NodeType.FormNodeFieldText,
            name: 'name2',
            value: 'value2',
          } as FormNodeFieldJson<string>,
          {
            id: 'id3',
            type: NodeType.FormNodeText,
            text: 'text',
          } as FormNodeTextJson,
        ],
        {
          trigger: {
            field: { id: 'id' },
            condition: Condition.Equals,
            valueOrField: { id: 'id2' },
          },
          action: {
            type: ActionType.ChangeProperty,
            node: { id: 'id3' },
            properties: {
              text: { id: 'id2' },
            },
          },
        }
      )

      expect(automation.trigger.field.id).toEqual('id')
      expect(automation.trigger.field.type).toEqual(NodeType.FormNodeFieldText)
      expect(automation.trigger.field.name).toEqual('name')
      expect(automation.trigger.field.value).toEqual('value')
      expect(automation.trigger.condition).toEqual(Condition.Equals)

      const triggerValue = automation.trigger.valueOrField as FormNodeFieldText

      expect(triggerValue.id).toEqual('id2')
      expect(triggerValue.type).toEqual(NodeType.FormNodeFieldText)
      expect(triggerValue.name).toEqual('name2')
      expect(triggerValue.value).toEqual('value2')
      expect(automation.action.type).toEqual(ActionType.ChangeProperty)

      const actionNode = automation.action.node as FormNodeText

      expect(actionNode.id).toEqual('id3')
      expect(actionNode.type).toEqual(NodeType.FormNodeText)
      expect(actionNode.text).toEqual('text')
      expect(automation.action.properties.text.id).toEqual('id2')
      expect(automation.action.properties.text.type).toEqual(NodeType.FormNodeFieldText)
      expect(automation.action.properties.text.name).toEqual('name2')
      expect(automation.action.properties.text.value).toEqual('value2')
    })
  })
})
