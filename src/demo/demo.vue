<template>
  <div class="vue-flowchart-editor-container">
    <flowchart-editor :read-only="readOnly" :key="reRender" />
  </div>
</template>

<script>
import FlowchartEditor from './flowchartEditor'

export default {
  name: 'VueFlowchartEditorDemo',
  components: {
    FlowchartEditor,
  },
  data() {
    return {
      readOnly: true,
      reRender: +new Date(),
    }
  },

  mounted() {
    this.$on('toggle-read-only', () => {
      this.readOnly = !this.readOnly
      this.$nextTick(() => {
        console.log(this.readOnly)
        this.reRender = +new Date() // 重新渲染组件
      })
    })
  },

  methods: {},
}
</script>

<style global>
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

ul {
  margin: 0;
}
</style>

<style>
.vue-flowchart-editor-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}
</style>
