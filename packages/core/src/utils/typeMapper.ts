import { NodeType } from 'enums/NodeType'

const typeMapper: Record<NodeType, unknown> = {
  [NodeType.FormNode]: undefined,
  [NodeType.FormNodeInputCheckbox]: undefined,
  [NodeType.FormNodeInput]: undefined,
  [NodeType.FormNodeInputText]: undefined,
  [NodeType.FormNodeLabel]: undefined,
  [NodeType.FormNodeSection]: undefined,
  [NodeType.FormNodeText]: undefined,
  [NodeType.FormNodeWithChildren]: undefined,
  [NodeType.FormNodeWithElement]: undefined,
}

export { typeMapper }
