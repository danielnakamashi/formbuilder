import {
  TransformObjects,
  TransformObjectsInput,
  TransformObjectsOutput,
  TransformObjectsService,
} from 'use-cases/transformObjects'

class FormBuilder implements TransformObjects {
  #service: TransformObjectsService

  constructor(service: TransformObjectsService) {
    this.#service = service
  }

  transformObjects({ node }: TransformObjectsInput): TransformObjectsOutput {
    return this.#service.transformObjects(node)
  }
}

export { FormBuilder }
