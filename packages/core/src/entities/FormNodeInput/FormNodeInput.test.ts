import { NodeType } from 'enums/NodeType'
import { FormNodeInput } from './FormNodeInput'

describe('FormNodeInput', () => {
  describe('should convert to json', () => {
    test('with string value', () => {
      const formNodeInput = new FormNodeInput('id', {
        name: 'name',
        value: 'value',
      })

      expect(formNodeInput.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNodeInput,
        name: 'name',
        value: 'value',
      })
    })

    test('with number value', () => {
      const formNodeInput = new FormNodeInput('id', {
        name: 'name',
        value: 1,
      })

      expect(formNodeInput.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNodeInput,
        name: 'name',
        value: 1,
      })
    })
  })

  describe('should convert from json', () => {
    test('with string value', () => {
      const formNodeInput = FormNodeInput.fromJson({
        id: 'id',
        type: NodeType.FormNodeInput,
        name: 'name',
        value: 'value',
      })

      expect(formNodeInput).toBeInstanceOf(FormNodeInput)
      expect(formNodeInput.id).toEqual('id')
      expect(formNodeInput.type).toEqual(NodeType.FormNodeInput)
      expect(formNodeInput.name).toEqual('name')
      expect(formNodeInput.value).toEqual('value')
    })

    test('with number value', () => {
      const formNodeInput = FormNodeInput.fromJson({
        id: 'id',
        type: NodeType.FormNodeInput,
        name: 'name',
        value: 1,
      })

      expect(formNodeInput).toBeInstanceOf(FormNodeInput)
      expect(formNodeInput.id).toEqual('id')
      expect(formNodeInput.type).toEqual(NodeType.FormNodeInput)
      expect(formNodeInput.name).toEqual('name')
      expect(formNodeInput.value).toEqual(1)
    })
  })
})
