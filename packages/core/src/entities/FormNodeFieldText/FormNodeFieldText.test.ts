import { NodeType } from 'enums/NodeType'
import { FormNodeFieldText } from './FormNodeFieldText'

describe('FormNodeFieldText', () => {
  it('should convert to json', () => {
    const formNodeFieldText = new FormNodeFieldText('id', {
      name: 'name',
      value: 'value',
    })

    expect(formNodeFieldText.toJson()).toEqual({
      id: 'id',
      type: NodeType.FormNodeFieldText,
      name: 'name',
      value: 'value',
    })
  })

  it('should convert from json', () => {
    const formNodeFieldText = FormNodeFieldText.fromJson({
      id: 'id',
      type: NodeType.FormNodeFieldText,
      name: 'name',
      value: 'value',
    })

    expect(formNodeFieldText.id).toEqual('id')
    expect(formNodeFieldText.type).toEqual(NodeType.FormNodeFieldText)
    expect(formNodeFieldText.name).toEqual('name')
    expect(formNodeFieldText.value).toEqual('value')
  })
})
