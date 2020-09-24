import Editor from '../Base/Editor'
import { upperFirst } from '../../utils'

export default (type) => {
  return {
    name: `Register${type}`,

    inject: ['root'],

    props: {
      name: String,
      config: Object,
      extend: String,
      behaviour: Function,
      dependences: Array,
    },

    data() {
      return {
        type: type.toLowerCase(),
      }
    },

    created() {
      this.bindEvent()
    },

    methods: {
      bindEvent() {
        const { type } = this
        const { handleBeforeAddPage } = this.root

        handleBeforeAddPage(({ className }) => {
          let host = Editor[className]
          let keys = ['name', 'config', 'extend']

          if (type === 'command') {
            host = Editor
          }

          if (type === 'behaviour') {
            keys = ['name', 'behaviour', 'dependences']
          }

          const args = keys.map((key) => this[key])

          host[`register${upperFirst(type)}`](...args)
        })
      },
    },

    render() {
      return null
    },
  }
}
