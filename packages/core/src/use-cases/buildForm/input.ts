import { Automation } from '../../entities/Automation'
import { FormNode } from '../../entities/FormNode'

interface BuildFormInput {
  node: FormNode
  automations: ReadonlyArray<Automation>
}

export { BuildFormInput }
