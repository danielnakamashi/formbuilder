import { NodeType } from 'core/enums/NodeType'
import { FormNodeInputCheckbox } from './FormNodeInputCheckbox'

describe('FormNodeInputCheckbox', () => {
  it('should convert to json', () => {
    const formNodeInputCheckbox = new FormNodeInputCheckbox('id', {
      name: 'checkbox',
      value: 'value',
      checked: true,
    })

    expect(formNodeInputCheckbox.toJson()).toEqual({
      id: 'id',
      type: NodeType.FormNodeInputCheckbox,
      element: 'input',
      name: 'checkbox',
      value: 'value',
      checked: true,
      inputType: 'checkbox',
    })
  })

  describe('should convert from json', () => {
    test('without checked property', () => {
      const formNodeInputCheckbox = FormNodeInputCheckbox.fromJson({
        id: 'id',
        type: NodeType.FormNodeInputCheckbox,
        element: 'input',
        name: 'checkbox',
        value: 'value',
      })

      expect(formNodeInputCheckbox).toBeInstanceOf(FormNodeInputCheckbox)
      expect(formNodeInputCheckbox.id).toEqual('id')
      expect(formNodeInputCheckbox.type).toEqual(NodeType.FormNodeInputCheckbox)
      expect(formNodeInputCheckbox.name).toEqual('checkbox')
      expect(formNodeInputCheckbox.value).toEqual('value')
      expect(formNodeInputCheckbox.inputType).toEqual('checkbox')
    })

    test('with checked property', () => {
      const formNodeInputCheckbox = FormNodeInputCheckbox.fromJson({
        id: 'id',
        type: NodeType.FormNodeInputCheckbox,
        element: 'input',
        name: 'checkbox',
        value: 'value',
        checked: true,
      })

      expect(formNodeInputCheckbox).toBeInstanceOf(FormNodeInputCheckbox)
      expect(formNodeInputCheckbox.id).toEqual('id')
      expect(formNodeInputCheckbox.type).toEqual(NodeType.FormNodeInputCheckbox)
      expect(formNodeInputCheckbox.name).toEqual('checkbox')
      expect(formNodeInputCheckbox.value).toEqual('value')
      expect(formNodeInputCheckbox.checked).toBe(true)
      expect(formNodeInputCheckbox.inputType).toEqual('checkbox')
    })
  })
})
