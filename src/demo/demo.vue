<template>
  <div class="vue-flowchart-editor-container">
    <flowchart-editor
      :read-only="readOnly"
      :key="reRender"
      :chart-data="flowChartData"
      @chart-data-update="updateChartData"
      :chart-data-node-items="flowChartNodeItems"
    />
  </div>
</template>

<script>
import FlowchartEditor from './flowchartEditor'
import data from './data'
import dataNodeItems from './dataNodeItems'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'VueFlowchartEditorDemo',
  components: {
    FlowchartEditor,
  },
  data() {
    return {
      readOnly: !true,
      reRender: +new Date(),
      flowChartData: data,
      flowChartNodeItems: dataNodeItems,
    }
  },

  mounted() {
    this.$on('toggle-read-only', () => {
      this.readOnly = !this.readOnly
      this.$nextTick(() => {
        console.log(this.readOnly)
        console.log(this.flowChartData)
        this.reRender = +new Date() // 重新渲染组件
      })
    })
  },

  methods: {
    updateChartData(data) {
      this.flowChartData = cloneDeep(data)
    },
  },
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
