import { FormNodeText, FormNodeTextJson } from '../FormNodeText'
import { NodeType } from '../../enums/NodeType'
import { FormNodeLabel } from './FormNodeLabel'

describe('FormNodeLabel', () => {
  it('should convert to json', () => {
    const formNodeLabel = new FormNodeLabel('id', {
      children: [new FormNodeText('id2', { text: 'text' })],
    })

    expect(formNodeLabel.toJson()).toEqual({
      id: 'id',
      type: NodeType.FormNodeLabel,
      children: [
        {
          id: 'id2',
          type: NodeType.FormNodeText,
          text: 'text',
        },
      ],
      element: 'label',
      for: '',
      isVisible: true,
    })
  })

  it('should convert from json', () => {
    const formNodeLabel = FormNodeLabel.fromJson({
      id: 'id',
      type: NodeType.FormNodeLabel,
      children: [
        {
          id: 'id2',
          type: NodeType.FormNodeText,
          text: 'text',
        } as FormNodeTextJson,
      ],
      isVisible: false,
    })

    expect(formNodeLabel).toBeInstanceOf(FormNodeLabel)
    expect(formNodeLabel.id).toEqual('id')
    expect(formNodeLabel.type).toEqual(NodeType.FormNodeLabel)
    expect(formNodeLabel.children).toHaveLength(1)
    expect(formNodeLabel.isVisible).toBe(false)

    const child = formNodeLabel.children[0] as FormNodeText

    expect(child.id).toEqual('id2')
    expect(child.type).toEqual(NodeType.FormNodeText)
    expect(child.text).toEqual('text')
  })
})
