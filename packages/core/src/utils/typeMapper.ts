import { NodeType } from 'enums/NodeType'

const typeMapper: Record<NodeType, unknown> = {
  [NodeType.FormNode]: undefined,
  [NodeType.FormNodeWithChildren]: undefined,
  [NodeType.FormNodeSection]: undefined,
  [NodeType.FormNodeText]: undefined,
  [NodeType.FormNodeLabel]: undefined,
  [NodeType.FormNodeField]: undefined,
  [NodeType.FormNodeCheckbox]: undefined,
  [NodeType.FormNodeFieldText]: undefined,
}

export { typeMapper }
