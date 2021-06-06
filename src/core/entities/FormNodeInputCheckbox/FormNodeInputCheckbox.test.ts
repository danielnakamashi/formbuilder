import { NodeType } from 'core/enums/NodeType'
import { FormNodeInputCheckbox } from './FormNodeInputCheckbox'

describe('FormNodeInputCheckbox', () => {
  it('should convert to json', () => {
    const formNodeInputCheckbox = new FormNodeInputCheckbox('id', { name: 'checkbox', value: true })

    expect(formNodeInputCheckbox.toJson()).toEqual({
      id: 'id',
      type: NodeType.FormNodeInputCheckbox,
      element: 'input',
      name: 'checkbox',
      value: true,
    })
  })

  it('should convert from json', () => {
    const formNodeInputCheckbox = FormNodeInputCheckbox.fromJson({
      id: 'id',
      type: NodeType.FormNodeInputCheckbox,
      element: 'input',
      name: 'checkbox',
      value: true,
    })

    expect(formNodeInputCheckbox).toBeInstanceOf(FormNodeInputCheckbox)
    expect(formNodeInputCheckbox.id).toEqual('id')
    expect(formNodeInputCheckbox.type).toEqual(NodeType.FormNodeInputCheckbox)
    expect(formNodeInputCheckbox.name).toEqual('checkbox')
    expect(formNodeInputCheckbox.value).toEqual(true)
  })
})
