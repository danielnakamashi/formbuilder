import {
  BuildForm,
  BuildFormInput,
  BuildFormOutput,
  BuildFormService,
} from 'app/use-cases/buildForm'

class FormBuilder implements BuildForm {
  #service: BuildFormService

  constructor(service: BuildFormService) {
    this.#service = service
  }

  buildForm({ node, automations }: BuildFormInput): BuildFormOutput {
    return this.#service.buildForm(node, automations)
  }
}

export { FormBuilder }
