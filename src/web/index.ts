import { HTMLFormBuilder } from 'service/HTMLFormBuilder'
import { FormBuilder } from 'app/FormBuilder'
import {
  Automation,
  FormNodeInputText,
  FormNodeText,
  FormNodeWithChildren,
  TriggerAction,
  TriggerCondition,
  TriggerEvent,
} from 'core'

const formBuilder = new FormBuilder(new HTMLFormBuilder())
const inputText = new FormNodeInputText('id2', { name: 'name' })
const textNode = new FormNodeWithChildren('id3', {
  children: [new FormNodeText('id4', { text: 'text to disapear' })],
})
const rootForm = new FormNodeWithChildren('id', {
  children: [inputText, textNode],
})
const automations = [
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

const element = formBuilder.buildForm({ node: rootForm, automations })

document.getElementById('app')?.appendChild(element as HTMLElement)
