import Create from './Menu'
import Editor from '../Base/Editor'
import { CONTEXT_MENU_CONTAINER } from '../../common/constants'

export const NodeMenu = Create('Node')
export const EdgeMenu = Create('Edge')
export const GroupMenu = Create('Group')
export const MultiMenu = Create('Multi')
export const CanvasMenu = Create('Canvas')

export default {
  name: 'ContextMenu',

  inject: ['root'], // provide by Editor

  data() {
    return {
      contextMenu: null,
      containerId: '',
    }
  },

  mounted() {
    const editor = this.root.editor

    this.getContainerId()

    this.$nextTick(() => {
      this.contextMenu = new Editor.Contextmenu({
        container: this.containerId,
      })

      editor.add(this.contextMenu)
    })
  },

  beforeDestroy() {
    this.contextMenu && this.contextMenu.destroy()
    this.contextMenu = null
  },

  methods: {
    getContainerId() {
      const { editor } = this.root
      this.containerId = `${CONTEXT_MENU_CONTAINER}_${editor.id}`
    },
  },

  render() {
    return (
      <div id={this.containerId}>
        {this.$scopedSlots.default
          ? this.$scopedSlots.default()
          : this.$slots.default}
      </div>
    )
  },
}
