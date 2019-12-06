export default {
  name: 'Item',

  inject: ['root'],

  props: {
    type: { type: String, default: 'node' },
    size: String,
    shape: String,
    src: String,
    model: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      page: null,
    }
  },

  created() {
    this.bindEvent()
  },

  methods: {
    bindEvent() {
      this.root.handleAfterAddPage(({ page }) => {
        this.page = page
      })
    },

    handleMouseDown() {
      const { type, size, shape, model } = this

      if (this.page) {
        this.page.beginAdd(type, {
          type,
          size,
          shape,
          ...model,
        })
      }
    },
  },

  render() {
    const { src, shape } = this
    return (
      <div style={{ cursor: 'pointer' }} onMousedown={this.handleMouseDown}>
        {src ? (
          <img src={src} alt={shape} draggable={false} />
        ) : this.$scopedSlots.default ? (
          this.$scopedSlots.default()
        ) : (
          this.$slots.default
        )}
      </div>
    )
  },
}
