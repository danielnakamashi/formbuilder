import { FormNode } from 'core/entities/FormNode'

interface TransformObjectsService {
  transformObjects(node: FormNode): unknown
}

export { TransformObjectsService }
