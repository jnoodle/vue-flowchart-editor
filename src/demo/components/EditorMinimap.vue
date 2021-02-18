<template>
  <minimap :height="160" :width="160" />
</template>

<script>
// import { Minimap } from '../../index'
import { Minimap } from 'vue-flowchart-editor'
export default {
  name: 'EditorMinimap',
  components: { Minimap },
}
</script>
