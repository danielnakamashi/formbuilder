import { FormNode } from './FormNode'
import { NodeType } from 'enums/NodeType'

describe('FormNode', () => {
  describe('should convert to Json', () => {
    test('with empty config', () => {
      const formNode = new FormNode('id')

      expect(formNode.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNode,
        children: [],
      })
    })

    test('with config', () => {
      const formNode = new FormNode('id', { children: [new FormNode('id2')] })

      expect(formNode.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNode,
        children: [
          {
            id: 'id2',
            type: NodeType.FormNode,
            children: [],
          },
        ],
      })
    })
  })

  describe('should convert from Json', () => {
    test('with empty children', () => {
      const formNode = FormNode.fromJson({
        id: 'id',
        type: NodeType.FormNode,
        children: [],
      })

      expect(formNode.id).toEqual('id')
      expect(formNode.type).toEqual(NodeType.FormNode)
      expect(formNode.children).toHaveLength(0)
    })

    test('with children', () => {
      const formNode = FormNode.fromJson({
        id: 'id',
        type: NodeType.FormNode,
        children: [
          {
            id: 'id2',
            type: NodeType.FormNode,
            children: [],
          },
        ],
      })

      expect(formNode.id).toEqual('id')
      expect(formNode.type).toEqual(NodeType.FormNode)
      expect(formNode.children).toHaveLength(1)

      const child = formNode.children[0]

      expect(child.id).toEqual('id2')
      expect(child.type).toEqual(NodeType.FormNode)
      expect(child.children).toHaveLength(0)
    })
  })
})
