<template>
  <div class="vue-flowchart-editor-container">
    <flowchart-editor
      :read-only="readOnly"
      :key="reRender"
      :chart-data="flowChartData"
      :chart-data-node-items="flowChartNodeItems"
      @save-data="save"
    />
  </div>
</template>

<script>
import FlowchartEditor from './flowchartEditor'
import chartData from './data'
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
      flowChartData: chartData,
      flowChartNodeItems: dataNodeItems,
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

  methods: {
    save(data) {
      // 在这里写数据保存逻辑
      console.log('save data')
      console.log(data)
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
