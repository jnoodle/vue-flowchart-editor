import GGEditorCore from 'gg-editor-core' // do not open source, waiting for 3.x
import { uniqueId } from '../../utils'

export default class Editor extends GGEditorCore {
  constructor(options) {
    super(options)

    this.id = uniqueId()
  }
}
