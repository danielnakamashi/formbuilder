import { NodeType } from 'enums/NodeType'
import { FormNodeWithChildren } from './FormNodeWithChildren'

describe('FormNodeWithChildren', () => {
  describe('should convert to json', () => {
    test('without config', () => {
      const formNodeWithChildren = new FormNodeWithChildren('id')

      expect(formNodeWithChildren.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNodeWithChildren,
        children: [],
        element: 'div',
      })
    })

    test('with config', () => {
      const formNodeWithChildren = new FormNodeWithChildren('id', {
        children: [new FormNodeWithChildren('id2')],
        element: 'span',
      })

      expect(formNodeWithChildren.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNodeWithChildren,
        children: [
          {
            id: 'id2',
            type: NodeType.FormNodeWithChildren,
            children: [],
            element: 'div',
          },
        ],
        element: 'span',
      })
    })
  })

  describe('should convert form json', () => {
    test('without config', () => {
      const formNodeWithChildren = FormNodeWithChildren.fromJson({
        id: 'id',
        type: NodeType.FormNodeWithChildren,
        children: [],
      })

      expect(formNodeWithChildren).toBeInstanceOf(FormNodeWithChildren)
      expect(formNodeWithChildren.id).toEqual('id')
      expect(formNodeWithChildren.type).toEqual(NodeType.FormNodeWithChildren)
      expect(formNodeWithChildren.children).toHaveLength(0)
    })

    test('with config', () => {
      const formNodeWithChildren = FormNodeWithChildren.fromJson({
        id: 'id',
        type: NodeType.FormNodeWithChildren,
        children: [
          {
            id: 'id2',
            type: NodeType.FormNode,
          },
        ],
        element: 'span',
      })

      expect(formNodeWithChildren).toBeInstanceOf(FormNodeWithChildren)
      expect(formNodeWithChildren.id).toEqual('id')
      expect(formNodeWithChildren.type).toEqual(NodeType.FormNodeWithChildren)
      expect(formNodeWithChildren.element).toEqual('span')
      expect(formNodeWithChildren.children).toHaveLength(1)

      const child = formNodeWithChildren.children[0]

      expect(child.id).toEqual('id2')
      expect(child.type).toEqual(NodeType.FormNode)
    })
  })
})
