<template>
  <command :name="command">
    <icon :type="iconType" :title="text" />
  </command>
</template>

<script>
import { Command } from '../../index'
import Icon from './Icon'

export default {
  name: 'EditorToolbarButton',

  props: ['command', 'icon', 'text'],

  computed: {
    iconType() {
      return `icon${this.icon || this.command}`
    },
  },

  components: {
    Command,
    Icon,
  },
}
</script>
