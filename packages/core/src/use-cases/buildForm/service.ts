import { Automation } from '../../entities/Automation'
import { FormNode } from '../../entities/FormNode'

interface BuildFormService {
  buildForm(node: FormNode, automations?: ReadonlyArray<Automation>): unknown
}

export { BuildFormService }
