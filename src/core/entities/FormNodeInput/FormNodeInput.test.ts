import { NodeType } from 'core/enums/NodeType'
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
    })
  })

  it('should convert from json', () => {
    const formNodeInput = FormNodeInput.fromJson({
      id: 'id',
      type: NodeType.FormNodeInput,
      name: 'name',
      value: 'value',
    })

    expect(formNodeInput).toBeInstanceOf(FormNodeInput)
    expect(formNodeInput.id).toEqual('id')
    expect(formNodeInput.type).toEqual(NodeType.FormNodeInput)
    expect(formNodeInput.name).toEqual('name')
    expect(formNodeInput.value).toEqual('value')
  })
})
