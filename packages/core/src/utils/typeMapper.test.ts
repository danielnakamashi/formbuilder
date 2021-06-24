import { typeMapper } from './typeMapper'
import { NodeType } from '../enums/NodeType'
import { FormNode } from '../entities/FormNode'

describe('typeMapper', () => {
  it('should return FormNode class', () => {
    const cls = typeMapper[NodeType.FormNode]

    expect(cls).toEqual(FormNode)
  })
})
