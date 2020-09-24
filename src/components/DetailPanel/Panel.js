export default (type) => {
  return {
    name: `${type}Panel`,

    props: ['status'],

    data() {
      return {
        type: type.toLowerCase(),
      }
    },

    render() {
      const { type, status } = this

      if (`${type}-selected` !== status) {
        return null
      }

      return (
        <div>
          {this.$scopedSlots.default
            ? this.$scopedSlots.default()
            : this.$slots.default}
        </div>
      )
    },
  }
}
