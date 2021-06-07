import { NodeType } from 'core/enums/NodeType'
import { FormNodeSection, FormNodeSectionJson } from './FormNodeSection'

describe('FormNodeSection', () => {
  describe('should convert to json', () => {
    test('with empty config', () => {
      const formNodeSection = new FormNodeSection('id')

      expect(formNodeSection.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNodeSection,
        title: '',
        children: [],
        element: 'div',
        isVisible: true,
      })
    })

    test('with config', () => {
      const formNodeSection = new FormNodeSection('id', {
        title: 'title',
        children: [new FormNodeSection('id2', { title: 'title2', children: [], element: 'p' })],
        element: 'span',
        isVisible: false,
      })

      expect(formNodeSection.toJson()).toEqual({
        id: 'id',
        type: NodeType.FormNodeSection,
        title: 'title',
        children: [
          {
            id: 'id2',
            type: NodeType.FormNodeSection,
            title: 'title2',
            children: [],
            element: 'p',
            isVisible: true,
          },
        ],
        element: 'span',
        isVisible: false,
      })
    })
  })

  describe('should convert from json', () => {
    test('with empty config', () => {
      const formNode = FormNodeSection.fromJson({
        id: 'id',
        type: NodeType.FormNodeSection,
        title: '',
        children: [],
      }) as FormNodeSection

      expect(formNode).toBeInstanceOf(FormNodeSection)
      expect(formNode.id).toEqual('id')
      expect(formNode.type).toEqual(NodeType.FormNodeSection)
    })

    test('with title', () => {
      const formNode = FormNodeSection.fromJson({
        id: 'id',
        type: NodeType.FormNodeSection,
        title: 'title',
        children: [],
      }) as FormNodeSection

      expect(formNode).toBeInstanceOf(FormNodeSection)
      expect(formNode.id).toEqual('id')
      expect(formNode.type).toEqual(NodeType.FormNodeSection)
      expect(formNode.title).toEqual('title')
    })

    test('with children', () => {
      const formNode = FormNodeSection.fromJson({
        id: 'id',
        type: NodeType.FormNodeSection,
        title: 'title',
        children: [
          {
            id: 'id2',
            type: NodeType.FormNodeSection,
            title: 'title2',
            children: [],
          } as FormNodeSectionJson,
        ],
      }) as FormNodeSection

      expect(formNode).toBeInstanceOf(FormNodeSection)
      expect(formNode.id).toEqual('id')
      expect(formNode.type).toEqual(NodeType.FormNodeSection)
      expect(formNode.title).toEqual('title')
      expect(formNode.children).toHaveLength(1)

      const child = formNode.children[0] as FormNodeSection

      expect(child.id).toEqual('id2')
      expect(child.type).toEqual(NodeType.FormNodeSection)
      expect(child.title).toEqual('title2')
      expect(child.children).toHaveLength(0)
    })
  })
})
