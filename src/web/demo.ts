import { HTMLFormBuilder } from 'service/HTMLFormBuilder'
import { FormBuilder } from 'app/FormBuilder'
import {
  Automation,
  FormNodeInputCheckbox,
  FormNodeInputText,
  FormNodeLabel,
  FormNodeText,
  FormNodeWithChildren,
  TriggerAction,
  TriggerCondition,
  TriggerEvent,
} from 'core'

const formBuilder = new FormBuilder(new HTMLFormBuilder())
const eggCheckbox = new FormNodeInputCheckbox('ovo', { name: 'ovo', value: 'ovo' })
const eggType = new FormNodeWithChildren('', {
  isVisible: false,
  element: 'fieldset',
  children: [
    new FormNodeWithChildren('', {
      element: 'legend',
      children: [new FormNodeText('', { text: 'Tipo de ovo' })],
    }),
    new FormNodeWithChildren('', {
      children: [
        new FormNodeInputCheckbox('galinha', { name: 'galinha' }),
        new FormNodeLabel('', {
          for: 'galinha',
          children: [new FormNodeText('', { text: 'Galinha' })],
        }),
      ],
    }),
    new FormNodeWithChildren('', {
      children: [
        new FormNodeInputCheckbox('pata', { name: 'pata' }),
        new FormNodeLabel('', {
          for: 'pata',
          children: [new FormNodeText('', { text: 'Pata' })],
        }),
      ],
    }),
  ],
})
const rootForm = new FormNodeWithChildren('id', {
  element: 'form',
  children: [
    new FormNodeWithChildren('', {
      element: 'fieldset',
      children: [
        new FormNodeLabel('', {
          for: 'name',
          children: [new FormNodeText('', { text: 'Nome' })],
        }),
        new FormNodeInputText('name', { name: 'name' }),
      ],
    }),
    new FormNodeWithChildren('', {
      element: 'fieldset',
      children: [
        new FormNodeWithChildren('', {
          element: 'legend',
          children: [new FormNodeText('', { text: 'Opção' })],
        }),
        new FormNodeWithChildren('', {
          children: [
            new FormNodeInputCheckbox('arroz', { name: 'arroz' }),
            new FormNodeLabel('', {
              for: 'arroz',
              children: [new FormNodeText('', { text: 'Arroz' })],
            }),
          ],
        }),
        new FormNodeWithChildren('', {
          children: [
            new FormNodeInputCheckbox('feijao', { name: 'feijao' }),
            new FormNodeLabel('', {
              for: 'feijao',
              children: [new FormNodeText('', { text: 'Feijão' })],
            }),
          ],
        }),
        new FormNodeWithChildren('', {
          children: [
            eggCheckbox,
            new FormNodeLabel('', {
              for: 'ovo',
              children: [new FormNodeText('', { text: 'Ovo' })],
            }),
          ],
        }),
      ],
    }),
    eggType,
  ],
})
const automations = [
  new Automation(
    {
      field: eggCheckbox,
      event: TriggerEvent.Change,
      condition: TriggerCondition.Equals,
      valueOrField: true,
    },
    {
      type: TriggerAction.Show,
      node: eggType,
    }
  ),
]

const element = formBuilder.buildForm({ node: rootForm, automations })

document.getElementById('app')?.appendChild(element as HTMLElement)
