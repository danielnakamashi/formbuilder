import { typeMapper } from './typeMapper'
import { NodeType } from 'core/enums/NodeType'
import { FormNode } from 'core/entities/FormNode'

describe('typeMapper', () => {
  it('should return FormNode class', () => {
    const cls = typeMapper[NodeType.FormNode]

    expect(cls).toEqual(FormNode)
  })
})
