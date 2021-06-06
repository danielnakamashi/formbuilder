import { NodeType } from 'core/enums/NodeType'
import { FormNode } from './FormNode'

describe('FormNode', () => {
  it('should convert to Json', () => {
    const formNode = new FormNode('id')

    expect(formNode.toJson()).toEqual({
      id: 'id',
      type: NodeType.FormNode,
    })
  })

  it('should convert from Json', () => {
    const formNode = FormNode.fromJson({
      id: 'id',
      type: NodeType.FormNode,
    })

    expect(formNode).toBeInstanceOf(FormNode)
    expect(formNode.id).toEqual('id')
    expect(formNode.type).toEqual(NodeType.FormNode)
  })
})
