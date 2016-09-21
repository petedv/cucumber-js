import Hook from '../../models/hook'
import Status from '../../status'
import SummaryFormatter from './summary'

export default class ProgressFormatter extends SummaryFormatter {
  handleStepResult(stepResult) {
    const status = stepResult.status
    if (!(stepResult.step instanceof Hook && status === Status.PASSED)) {
      const character = this.colorFns[status](ProgressFormatter.CHARACTERS[status])
      this.log(character)
    }
    super.handleStepResult(stepResult)
  }

  handleFeaturesResult(featuresResult) {
    this.log('\n\n')
    super.handleFeaturesResult(featuresResult)
  }
}

ProgressFormatter.CHARACTERS = {
  [Status.AMBIGUOUS]: 'A',
  [Status.FAILED]: 'F',
  [Status.PASSED]: '.',
  [Status.PENDING]: 'P',
  [Status.SKIPPED]: '-',
  [Status.UNDEFINED]: 'U'
}
