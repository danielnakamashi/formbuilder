import { NodeType } from 'enums/NodeType'
import { FormNodeWithChildren } from './FormNodeWithChildren'

describe('FormNodeWithChildren', () => {
  describe('should convert to json', () => {
    test('without children', () => {
      const formNodeWithChildren = new FormNodeWithChildren('id')

      expect(formNodeWithChildren.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNodeWithChildren,
        children: [],
      })
    })

    test('with children', () => {
      const formNodeWithChildren = new FormNodeWithChildren('id', {
        children: [new FormNodeWithChildren('id2')],
      })

      expect(formNodeWithChildren.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNodeWithChildren,
        children: [
          {
            id: 'id2',
            type: NodeType.FormNodeWithChildren,
            children: [],
          },
        ],
      })
    })
  })

  describe('should convert form json', () => {
    test('without children', () => {
      const formNodeWithChildren = FormNodeWithChildren.fromJson({
        id: 'id',
        type: NodeType.FormNodeWithChildren,
        children: [],
      })

      expect(formNodeWithChildren.id).toEqual('id')
      expect(formNodeWithChildren.type).toEqual(NodeType.FormNodeWithChildren)
      expect(formNodeWithChildren.children).toHaveLength(0)
    })

    test('with children', () => {
      const formNodeWithChildren = FormNodeWithChildren.fromJson({
        id: 'id',
        type: NodeType.FormNodeWithChildren,
        children: [
          {
            id: 'id2',
            type: NodeType.FormNode,
          },
        ],
      })

      expect(formNodeWithChildren.id).toEqual('id')
      expect(formNodeWithChildren.type).toEqual(NodeType.FormNodeWithChildren)
      expect(formNodeWithChildren.children).toHaveLength(1)

      const child = formNodeWithChildren.children[0]

      expect(child.id).toEqual('id2')
      expect(child.type).toEqual(NodeType.FormNode)
    })
  })
})
