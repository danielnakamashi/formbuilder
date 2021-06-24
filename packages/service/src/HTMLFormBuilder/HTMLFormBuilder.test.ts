import { queryByText, fireEvent } from '@testing-library/dom'
import {
  TriggerAction,
  Automation,
  TriggerCondition,
  FormNodeInput,
  FormNodeInputCheckbox,
  FormNodeInputText,
  FormNodeLabel,
  FormNodeText,
  FormNodeWithChildren,
  FormNodeWithElement,
  TriggerEvent,
} from '@formbuilda/core'
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

  describe('should add events to DOM objects', () => {
    const root = document.body
    const inputText = new FormNodeInputText('id2', { name: 'name' })
    const textNode = new FormNodeWithChildren('id3', {
      children: [new FormNodeText('id4', { text: 'text to disapear' })],
    })
    const element = new HTMLFormBuilder().buildForm(
      new FormNodeWithChildren('id', {
        children: [inputText, textNode],
      }),
      [
        new Automation(
          {
            field: inputText,
            event: TriggerEvent.Change,
            condition: TriggerCondition.Equals,
            valueOrField: 'text',
          },
          {
            type: TriggerAction.Hide,
            node: textNode,
          }
        ),
      ]
    )

    root.appendChild(element as HTMLElement)

    const input = root.querySelector('input')
    const elementToDisapear = queryByText(root, 'text to disapear')

    expect(elementToDisapear).toBeVisible()

    fireEvent.change(input as HTMLInputElement, { target: { value: 'text' } })

    expect(elementToDisapear).not.toBeVisible()
  })
})
