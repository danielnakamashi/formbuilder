import { NodeType } from 'core/enums'
import { FormNodeWithElement } from './FormNodeWithElement'

describe('FormNodeWithElement', () => {
  describe('should convert to json', () => {
    test('without config', () => {
      const formNodeWithElement = new FormNodeWithElement('id')

      expect(formNodeWithElement.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNodeWithElement,
        element: 'div',
      })
    })

    test('with config', () => {
      const formNodeWithElement = new FormNodeWithElement('id', { element: 'span' })

      expect(formNodeWithElement.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNodeWithElement,
        element: 'span',
      })
    })
  })

  describe('should convert from json', () => {
    test('without config', () => {
      const formNodeWithElement = FormNodeWithElement.fromJson({
        id: 'id',
        type: NodeType.FormNodeWithElement,
      })

      expect(formNodeWithElement).toBeInstanceOf(FormNodeWithElement)
      expect(formNodeWithElement.id).toEqual('id')
      expect(formNodeWithElement.type).toEqual(NodeType.FormNodeWithElement)
      expect(formNodeWithElement.element).toEqual('div')
    })

    test('with config', () => {
      const formNodeWithElement = FormNodeWithElement.fromJson({
        id: 'id',
        type: NodeType.FormNodeWithElement,
        element: 'span',
      })

      expect(formNodeWithElement).toBeInstanceOf(FormNodeWithElement)
      expect(formNodeWithElement.id).toEqual('id')
      expect(formNodeWithElement.type).toEqual(NodeType.FormNodeWithElement)
      expect(formNodeWithElement.element).toEqual('span')
    })
  })
})
