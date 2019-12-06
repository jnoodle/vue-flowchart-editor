import Create from './Panel'
import { STATUS_CANVAS_SELECTED } from '../../common/constants'
import { uniqueId } from '../../utils'

export const NodePanel = Create('Node')
export const EdgePanel = Create('Edge')
export const GroupPanel = Create('Group')
export const MultiPanel = Create('Multi')
export const CanvasPanel = Create('Canvas')

export default {
  name: 'DetailPanel',

  inject: ['root'],

  data() {
    return {
      status: '',
      uniqueId: '',
    }
  },

  created() {
    this.bindEvent()
  },

  methods: {
    bindEvent() {
      this.root.handleAfterAddPage(({ page }) => {
        this.status = STATUS_CANVAS_SELECTED

        page.on('statuschange', ({ status }) => {
          this.status = status
          this.uniqueId = uniqueId()
        })
      })
    },
  },

  render() {
    const { status, uniqueId } = this

    if (!status) {
      return null
    }

    return (
      <div key={uniqueId}>
        {this.$scopedSlots.default({ status, uniqueId })}
      </div>
    )
  },
}
