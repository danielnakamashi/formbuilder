import { NodeType } from '../../enums/NodeType'
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
      isDisabled: false,
      isRequired: false,
      isVisible: true,
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
        isDisabled: true,
        isRequired: true,
        isVisible: false,
      })

      expect(formNodeInputCheckbox).toBeInstanceOf(FormNodeInputCheckbox)
      expect(formNodeInputCheckbox.id).toEqual('id')
      expect(formNodeInputCheckbox.type).toEqual(NodeType.FormNodeInputCheckbox)
      expect(formNodeInputCheckbox.name).toEqual('checkbox')
      expect(formNodeInputCheckbox.value).toEqual('value')
      expect(formNodeInputCheckbox.inputType).toEqual('checkbox')
      expect(formNodeInputCheckbox.isDisabled).toBe(true)
      expect(formNodeInputCheckbox.isRequired).toBe(true)
      expect(formNodeInputCheckbox.isVisible).toBe(false)
    })

    test('with checked property', () => {
      const formNodeInputCheckbox = FormNodeInputCheckbox.fromJson({
        id: 'id',
        type: NodeType.FormNodeInputCheckbox,
        element: 'input',
        name: 'checkbox',
        value: 'value',
        checked: true,
        isDisabled: true,
        isRequired: true,
        isVisible: false,
      })

      expect(formNodeInputCheckbox).toBeInstanceOf(FormNodeInputCheckbox)
      expect(formNodeInputCheckbox.id).toEqual('id')
      expect(formNodeInputCheckbox.type).toEqual(NodeType.FormNodeInputCheckbox)
      expect(formNodeInputCheckbox.name).toEqual('checkbox')
      expect(formNodeInputCheckbox.value).toEqual('value')
      expect(formNodeInputCheckbox.checked).toBe(true)
      expect(formNodeInputCheckbox.inputType).toEqual('checkbox')
      expect(formNodeInputCheckbox.isDisabled).toBe(true)
      expect(formNodeInputCheckbox.isRequired).toBe(true)
      expect(formNodeInputCheckbox.isVisible).toBe(false)
    })
  })
})
