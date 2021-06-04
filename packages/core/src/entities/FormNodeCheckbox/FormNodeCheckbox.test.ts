import { NodeType } from 'enums/NodeType'
import { FormNodeCheckbox } from './FormNodeCheckbox'

describe('FormNodeCheckbox', () => {
  it('should convert to json', () => {
    const formNodeCheckbox = new FormNodeCheckbox('id', { name: 'checkbox', value: true })

    expect(formNodeCheckbox.toJson()).toEqual({
      id: 'id',
      type: NodeType.FormNodeCheckbox,
      name: 'checkbox',
      value: true,
    })
  })

  it('should convert from json', () => {
    const formNodeCheckbox = FormNodeCheckbox.fromJson({
      id: 'id',
      type: NodeType.FormNodeCheckbox,
      name: 'checkbox',
      value: true,
    })

    expect(formNodeCheckbox.id).toEqual('id')
    expect(formNodeCheckbox.type).toEqual(NodeType.FormNodeCheckbox)
    expect(formNodeCheckbox.name).toEqual('checkbox')
    expect(formNodeCheckbox.value).toEqual(true)
  })
})
