import {
  FormNodeInput,
  FormNodeInputCheckbox,
  FormNodeInputText,
  FormNodeLabel,
  FormNodeText,
  FormNodeWithChildren,
  FormNodeWithElement,
} from 'core'
import { HTMLFormBuilder } from './HTMLFormBuilder'

describe('HTMLFormBuilder', () => {
  describe('should transform to DOM objects', () => {
    test('with FormNodeWithElement', () => {
      const element = new HTMLFormBuilder().buildForm(
        new FormNodeWithElement('id', { element: 'input' })
      ) as HTMLElement | Text

      expect(element).toBeInstanceOf(HTMLElement)
      expect(element.nodeName).toEqual('INPUT')
    })

    test('with FormNodeText', () => {
      const element = new HTMLFormBuilder().buildForm(new FormNodeText('id', { text: 'text' })) as
        | HTMLElement
        | Text

      expect(element).toBeInstanceOf(Text)
      expect(element.textContent).toEqual('text')
    })

    test('with FormNodeWithChildren', () => {
      const element = new HTMLFormBuilder().buildForm(
        new FormNodeWithChildren('id', {
          element: 'form',
          children: [new FormNodeWithElement('id2', { element: 'input' })],
        })
      ) as HTMLElement | Text

      expect(element).toBeInstanceOf(HTMLFormElement)
      expect(element.firstChild).toBeInstanceOf(HTMLInputElement)
    })

    test('with FormNodeLabel', () => {
      const element = new HTMLFormBuilder().buildForm(
        new FormNodeLabel('id', {
          children: [new FormNodeText('id2', { text: 'label' })],
        })
      ) as HTMLElement | Text

      expect(element).toBeInstanceOf(HTMLLabelElement)
      expect(element.firstChild).toBeInstanceOf(Text)
      expect(element.firstChild).toHaveTextContent('label')
    })

    test('with FormNodeInput', () => {
      const element = new HTMLFormBuilder().buildForm(
        new FormNodeInput('id', { name: 'name', value: 'value' })
      )

      expect(element).toBeInstanceOf(HTMLInputElement)
      expect(element).toHaveAttribute('name', 'name')
      expect(element).toHaveValue('value')
    })

    test('with FormNodeInputText', () => {
      const element = new HTMLFormBuilder().buildForm(
        new FormNodeInputText('id', { name: 'name', value: 'value' })
      )

      expect(element).toBeInstanceOf(HTMLInputElement)
      expect(element).toHaveAttribute('name', 'name')
      expect(element).toHaveValue('value')
    })

    test('with FormNodeInputCheckbox', () => {
      const element = new HTMLFormBuilder().buildForm(
        new FormNodeInputCheckbox('id', { name: 'checkbox', value: 'option 1', checked: true })
      )

      expect(element).toBeInstanceOf(HTMLInputElement)
      expect(element).toHaveAttribute('name', 'checkbox')
      expect(element).toHaveAttribute('value', 'option 1')
      expect(element).toBeChecked()
    })
  })
})
