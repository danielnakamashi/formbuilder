import { NodeType } from '../../enums/NodeType'
import { FormNodeFieldset, FormNodeFieldsetJson } from './FormNodeFieldset'

describe('FormNodeFieldset', () => {
  it('should convert to json', () => {
    const formNodeFieldset = new FormNodeFieldset('id', {
      legend: 'legend',
      children: [new FormNodeFieldset('id2', { legend: 'legend2' })],
    })

    expect(formNodeFieldset.toJson()).toEqual({
      id: 'id',
      type: NodeType.FormNodeFieldset,
      element: 'fieldset',
      isVisible: true,
      legend: 'legend',
      children: [
        {
          id: 'id2',
          type: NodeType.FormNodeFieldset,
          element: 'fieldset',
          isVisible: true,
          legend: 'legend2',
          children: [],
        },
      ],
    })
  })

  it('should convert from json', () => {
    const formNode = FormNodeFieldset.fromJson({
      id: 'id',
      type: NodeType.FormNodeFieldset,
      legend: 'legend',
      children: [
        {
          id: 'id2',
          type: NodeType.FormNodeFieldset,
          legend: 'legend2',
          children: [],
        } as FormNodeFieldsetJson,
      ],
    })

    expect(formNode).toBeInstanceOf(FormNodeFieldset)
    expect(formNode.id).toEqual('id')
    expect(formNode.type).toEqual(NodeType.FormNodeFieldset)
    expect(formNode.element).toEqual('fieldset')
    expect(formNode.legend).toEqual('legend')
    expect(formNode.children).toHaveLength(1)

    const child = formNode.children[0] as FormNodeFieldset

    expect(child).toBeInstanceOf(FormNodeFieldset)
    expect(child.id).toEqual('id2')
    expect(child.type).toEqual(NodeType.FormNodeFieldset)
    expect(child.element).toEqual('fieldset')
    expect(child.legend).toEqual('legend2')
    expect(child.children).toHaveLength(0)
  })
})
