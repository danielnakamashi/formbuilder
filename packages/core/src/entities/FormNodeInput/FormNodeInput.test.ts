import { NodeType } from '../../enums/NodeType'
import { FormNodeInput } from './FormNodeInput'

describe('FormNodeInput', () => {
  it('should convert to json', () => {
    const formNodeInput = new FormNodeInput('id', {
      name: 'name',
      value: 'value',
    })

    expect(formNodeInput.toJson()).toEqual({
      id: 'id',
      type: NodeType.FormNodeInput,
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
    const formNodeInput = FormNodeInput.fromJson({
      id: 'id',
      type: NodeType.FormNodeInput,
      name: 'name',
      value: 'value',
      isDisabled: true,
      isRequired: true,
      isVisible: false,
    })

    expect(formNodeInput).toBeInstanceOf(FormNodeInput)
    expect(formNodeInput.id).toEqual('id')
    expect(formNodeInput.type).toEqual(NodeType.FormNodeInput)
    expect(formNodeInput.name).toEqual('name')
    expect(formNodeInput.value).toEqual('value')
    expect(formNodeInput.inputType).toEqual('text')
    expect(formNodeInput.isDisabled).toBe(true)
    expect(formNodeInput.isRequired).toBe(true)
    expect(formNodeInput.isVisible).toBe(false)
  })
})
