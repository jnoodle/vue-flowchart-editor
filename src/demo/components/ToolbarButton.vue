<template>
  <command :name="command">
    <icon :type="iconType" :title="text" />
    <span v-if="label">{{ label }}</span>
  </command>
</template>

<script>
import { Command } from '../../index'
import Icon from './Icon'

export default {
  name: 'EditorToolbarButton',

  props: ['command', 'icon', 'text', 'label'],

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
