import { Automation } from 'core'
import { FormNode } from 'core/entities/FormNode'

interface BuildFormService {
  buildForm(node: FormNode, automations?: ReadonlyArray<Automation>): unknown
}

export { BuildFormService }
