import { TransformObjectsInput } from './input'
import { TransformObjectsOutput } from './output'

interface TransformObjects {
  transformObjects(input: TransformObjectsInput): TransformObjectsOutput
}

export { TransformObjects }
