<template>
  <vue-flowchart-editor class="vue-flowchart-editor" ref="flowChart">
    <div class="vfe-chart">
      <!-- Top Menu -->
      <div class="vfe-chart-header">
        <editor-toolbar :chart-data="flowChartData" :read-only="readOnly" />
      </div>
      <div class="vfe-chart-container">
        <!-- Left Items -->
        <div class="vfe-chart-sidebar">
          <editor-item-panel
            :node-items="flowChartNodeItems"
            v-if="!readOnly"
          />
        </div>
        <!-- Main Chart -->
        <div class="vfe-chart-main">
          <flow
            :data="flowChartData"
            :onNodeClick="handleNodeClick"
            :onNodeDoubleClick="handleNodeDoubleClick"
            :onNodeMouseLeave="handleNodeMouseLeave"
            :onAfterChange="handleAfterChange"
            :graph="{ mode: 'readOnly' }"
          />
          <div class="tooltip">
            tooltip
          </div>
        </div>
        <!-- Right Panel -->
        <div class="vfe-chart-panel">
          <div class="vfe-chart-panel-detail">
            <editor-detail-panel :read-only="readOnly" />
          </div>
          <div class="vfe-chart-panel-minimap">
            <editor-minimap />
          </div>
        </div>
      </div>
    </div>
    <!-- Mouse Right Button Context Menu -->
    <editor-context-menu v-if="!readOnly" />
    <register-edge
      name="custom-polyline"
      extend="flow-polyline"
      :config="customEdgeConfig"
    />
    <custom-command />
  </vue-flowchart-editor>
</template>

<script>
import VueFlowchartEditor, { Flow, RegisterEdge } from '../index'
import EditorToolbar from './components/Toolbar'
import EditorItemPanel from './components/ItemPanel'
import EditorDetailPanel from './components/DetailPanel'
import EditorMinimap from './components/EditorMinimap'
import EditorContextMenu from './components/ContextMenu'
import CustomCommand from './components/CustomCommand'
import data from './data'
import dataNodeItems from './dataNodeItems'
import throttle from 'lodash/throttle'

export default {
  name: 'FlowchartEditor',

  components: {
    VueFlowchartEditor,
    Flow,
    EditorToolbar,
    EditorItemPanel,
    EditorDetailPanel,
    EditorMinimap,
    EditorContextMenu,
    CustomCommand,
    RegisterEdge,
  },

  props: ['readOnly', 'toggleReadOnly'],

  data() {
    return {
      flowChartData: data,
      flowChartNodeItems: dataNodeItems,
      customEdgeConfig: {
        getActivedStyle(item) {
          return {
            lineWidth: 3,
          }
        },
        getSelectedStyle(item) {
          return {
            lineWidth: 3,
          }
        },
      },
      tooltipDom: null,
      tooltipShow: true,
    }
  },

  mounted() {
    this.tooltipDom = document.getElementsByClassName('tooltip')[0]
  },

  methods: {
    handleNodeClick(e) {
      console.log(e)
    },

    handleNodeDoubleClick(e) {
      if (this.readOnly) {
        this.tooltipDom.style.left = e.domX + 'px'
        this.tooltipDom.style.top = e.domY + 'px'
        this.tooltipDom.style.display = 'block'
      }
    },

    handleNodeMouseLeave: throttle(
      function(e) {
        if (this.readOnly) {
          console.log(e)
          this.tooltipDom.style.display = 'none'
        }
      },
      1000,
      {
        leading: false,
        trailing: true,
      }
    ),

    handleAfterChange(e) {
      if (!this.readOnly) {
        const { action, item } = e
        const model = item.getModel()
        console.log(action)
        console.log(model)
        // 可以根据 action 和 model 来决定是否删掉左侧用过的节点
      }
    },
  },
}
</script>

<style lang="less">
.vue-flowchart-editor {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
}

.vfe-chart {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .vfe-chart-header {
    border: 1px solid #e6e9ed;
    padding: 8px;
  }

  .vfe-chart-container {
    flex: 1;
    display: flex;

    .vfe-chart-main {
      position: relative;
      flex: 1;
      max-height: ~'calc(100% - 5px)'; // fix scroll show

      .tooltip {
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        z-index: 999;
        opacity: 0.8;
      }
    }

    .vfe-chart-sidebar {
      position: relative;
      display: flex;
      justify-content: center;
      width: 150px;
      padding-top: 10px;
      background-color: #fafafa;
      border-right: 1px solid #e6e9ed;
    }

    .vfe-chart-panel {
      position: relative;
      width: 300px;
      background-color: #fafafa;
      border-left: 1px solid #e6e9ed;

      .vfe-chart-panel-detail {
        box-sizing: border-box;
        position: fixed;
        top: 45px;
        width: 300px;
        padding: 10px;
        height: ~'calc(100% - 250px)';
        overflow-y: auto;
      }

      .vfe-chart-panel-minimap {
        position: fixed;
        bottom: 0;
        width: 300px;
        height: 200px;
        border-top: 1px solid #e6e9ed;
      }
    }
  }
}
</style>
