import { FormNode } from '@form-build/core'

interface TransformObjectsService {
  transformObjects(node: FormNode): unknown
}

export { TransformObjectsService }
