export default (type) => {
  return {
    name: `${type}Menu`,

    data() {
      return {
        type: type.toLowerCase(),
      }
    },

    render() {
      const { type } = this

      return (
        <div class="menu" data-status={`${type}-selected`}>
          {this.$scopedSlots.default
            ? this.$scopedSlots.default()
            : this.$slots.default}
        </div>
      )
    },
  }
}
