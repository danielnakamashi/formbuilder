import { BuildFormInput } from './input'
import { BuildFormOutput } from './output'

interface BuildForm {
  buildForm(input: BuildFormInput): BuildFormOutput
}

export { BuildForm }
