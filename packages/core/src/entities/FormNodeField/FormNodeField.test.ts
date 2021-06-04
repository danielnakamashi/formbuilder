import { NodeType } from 'enums/NodeType'
import { FormNodeField } from './FormNodeField'

describe('FormNodeField', () => {
  describe('should convert to json', () => {
    test('with string value', () => {
      const formNodeField = new FormNodeField('id', {
        name: 'name',
        value: 'value',
      })

      expect(formNodeField.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNodeField,
        name: 'name',
        value: 'value',
      })
    })

    test('with number value', () => {
      const formNodeField = new FormNodeField('id', {
        name: 'name',
        value: 1,
      })

      expect(formNodeField.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNodeField,
        name: 'name',
        value: 1,
      })
    })
  })

  describe('should convert from json', () => {
    test('with string value', () => {
      const formNodeField = FormNodeField.fromJson({
        id: 'id',
        type: NodeType.FormNodeField,
        name: 'name',
        value: 'value',
      })

      expect(formNodeField.id).toEqual('id')
      expect(formNodeField.type).toEqual(NodeType.FormNodeField)
      expect(formNodeField.name).toEqual('name')
      expect(formNodeField.value).toEqual('value')
    })

    test('with number value', () => {
      const formNodeField = FormNodeField.fromJson({
        id: 'id',
        type: NodeType.FormNodeField,
        name: 'name',
        value: 1,
      })

      expect(formNodeField.id).toEqual('id')
      expect(formNodeField.type).toEqual(NodeType.FormNodeField)
      expect(formNodeField.name).toEqual('name')
      expect(formNodeField.value).toEqual(1)
    })
  })
})
