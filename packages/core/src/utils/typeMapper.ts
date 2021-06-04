import { NodeType } from 'enums/NodeType'

const typeMapper: Record<NodeType, unknown> = {
  [NodeType.FormNode]: undefined,
  [NodeType.FormNodeSection]: undefined,
}

export { typeMapper }
