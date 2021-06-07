import { NodeType } from 'core/enums/NodeType'
import { FormNodeInputText } from './FormNodeInputText'

describe('FormNodeInputText', () => {
  it('should convert to json', () => {
    const formNodeInputText = new FormNodeInputText('id', {
      name: 'name',
      value: 'value',
    })

    expect(formNodeInputText.toJson()).toEqual({
      id: 'id',
      type: NodeType.FormNodeInputText,
      element: 'input',
      name: 'name',
      value: 'value',
      inputType: 'text',
      isDisabled: false,
      isRequired: false,
      isVisible: true,
    })
  })

  it('should convert from json', () => {
    const formNodeInputText = FormNodeInputText.fromJson({
      id: 'id',
      type: NodeType.FormNodeInputText,
      element: 'input',
      name: 'name',
      value: 'value',
      isDisabled: true,
      isRequired: true,
      isVisible: false,
    })

    expect(formNodeInputText).toBeInstanceOf(FormNodeInputText)
    expect(formNodeInputText.id).toEqual('id')
    expect(formNodeInputText.type).toEqual(NodeType.FormNodeInputText)
    expect(formNodeInputText.name).toEqual('name')
    expect(formNodeInputText.value).toEqual('value')
    expect(formNodeInputText.inputType).toEqual('text')
    expect(formNodeInputText.isDisabled).toBe(true)
    expect(formNodeInputText.isRequired).toBe(true)
    expect(formNodeInputText.isVisible).toBe(false)
  })
})
