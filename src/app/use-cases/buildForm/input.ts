import { Automation } from 'core/entities/Automation'
import { FormNode } from 'core/entities/FormNode'

interface BuildFormInput {
  node: FormNode
  automations: ReadonlyArray<Automation>
}

export { BuildFormInput }
