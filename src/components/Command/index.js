export default {
  name: 'Command',

  props: {
    name: String,
    required: true,
  },

  render() {
    const { name } = this

    // https://github.com/vuejs/vue/issues/9458#issuecomment-461845497

    return (
      <div data-command={name} class="command">
        {this.$scopedSlots.default
          ? this.$scopedSlots.default()
          : this.$slots.default}
      </div>
    )
  },
}
