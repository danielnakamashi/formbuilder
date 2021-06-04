import { NodeType } from 'enums/NodeType'
import { FormNodeText } from './FormNodeText'

describe('FormNodeText', () => {
  it('should convert to json', () => {
    const formNodeText = new FormNodeText('id', { text: 'text' })

    expect(formNodeText.toJson()).toEqual({
      id: 'id',
      type: NodeType.FormNodeText,
      text: 'text',
    })
  })

  it('should convert from json', () => {
    const formNodeText = FormNodeText.fromJson({
      id: 'id',
      type: NodeType.FormNodeText,
      text: 'text',
    })

    expect(formNodeText.id).toEqual('id')
    expect(formNodeText.type).toEqual(NodeType.FormNodeText)
    expect(formNodeText.text).toEqual('text')
  })
})
