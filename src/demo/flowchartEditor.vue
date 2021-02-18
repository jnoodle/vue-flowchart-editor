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
          <div class="vfe-chart-sidebar-top">
            <editor-item-panel :node-items="flowChartNodeItems" v-if="!readOnly" />
          </div>
          <div class="vfe-chart-sidebar-bottom">
            <editor-detail-panel :read-only="readOnly" />
          </div>
        </div>
        <!-- Main Chart -->
        <div class="vfe-chart-main">
          <flow :data="flowChartData" :onClick="handleClick" :onNodeClick="handleNodeClick" :onNodeDoubleClick="handleNodeDoubleClick" :onNodeMouseLeave="handleNodeMouseLeave"
            :onAfterChange="handleAfterChange" :graph="graphConfig" />
          <div class="vfe-chart-main-minimap">
            <editor-minimap />
          </div>
          <div class="tooltip">
            <template v-for="item in tooltipData">
              <p :key="item.name">{{ item.name }}: {{ item.value }}</p>
            </template>
          </div>

        </div>
        <!-- Right Panel -->

        <!-- 这部分需要改成动态的 -->
        <div class="vfe-chart-panel">

          <div class="vfe-chart-panel-detail">
            <div class="status">
              <p>检测状态 : </p>
              <p class="setStatus">状态设置 : </p>
              <p class="setStatus">状态转移 : </p>
              <p class="setCondition">State 在[1-47]区间 且 无需电池电压低 且 无BMS通讯丢失故障 且 接收到BMS首帧报文 且 延迟 T7 检测确认</p>
            </div>
            <div class="status">
              <p>确认状态 : </p>
              <p class="setStatus">状态设置 : </p>
              <p class="setStatus">状态转移 : </p>
              <p class="setCondition">电池SOC小于SOC2 确认故障</p>
            </div>
            <div class="status">
              <p>故障状态 : </p>
              <p class="setStatus">状态设置 : </p>
              <p class="setCondition">设置 故障处理 </p>
              <p class="setCondition">设置 仪表提示 </p>
              <p class="setCondition">设置 最高报警等级 </p>
              <p class="setStatus">状态转移 : </p>
              <p class="setCondition">电池SOC大于SOC2 故障恢复</p>
              <p class="setStatus">故障处理 : </p>
              <p class="setCondition">EVBUS上报故障</p>
              <p class="setCondition">LEVEL = 6</p>
              <p class="setStatus">仪表提示 : </p>
              <p class="setStatus">最高报警等级 : </p>
              <p class="setCondition">LEVELGB = 0</p>
            </div>
            <!-- <editor-detail-panel :read-only="readOnly" /> -->
          </div>
          <!-- <div class="vfe-chart-panel-minimap">
            <editor-minimap />
          </div> -->
        </div>
      </div>
    </div>
    <!-- Mouse Right Button Context Menu -->
    <editor-context-menu v-if="!readOnly" />
    <register-edge name="custom-polyline" extend="flow-polyline" :config="customEdgeConfig" />
    <custom-command :save="saveChartData" :download="downloadImage" />
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
import { throttle } from 'lodash'

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
  props: [
    'readOnly',
    'toggleReadOnly',
    'chartData',
    'chartDataNodeItems',
    'saveData',
  ],
  data() {
    return {
      formData: {
        status: '',
        condition: '',
      },
      flowChartData: this.chartData,
      flowChartNodeItems: this.chartDataNodeItems,
      graphConfig: {
        mode: 'readOnly',
      },
      customEdgeConfig: {
        getActivedStyle(/*item*/) {
          return {
            lineWidth: 3,
          }
        },
        getSelectedStyle(/*item*/) {
          return {
            lineWidth: 3,
          }
        },
      },
      tooltipDom: null,
      tooltipShow: true,
      tooltipData: [],
    }
  },
  mounted() {
    this.tooltipDom = document.getElementsByClassName('tooltip')[0]
  },
  methods: {
    handleClick(e) {},
    handleNodeClick(e) {
      console.log(e)
    },
    handleNodeDoubleClick(e) {
      // 双击节点
      if (this.readOnly) {
        this.tooltipData = e.item.model.data
        this.$nextTick(() => {
          this.tooltipDom.style.left = e.domX + 'px'
          this.tooltipDom.style.top = e.domY + 'px'
          this.tooltipDom.style.display = 'block'
        })
      }
    },
    // 鼠标移出节点
    handleNodeMouseLeave: throttle(
      function () {
        if (this.readOnly) {
          this.tooltipDom.style.display = 'none'
        }
      },
      1000,
      {
        leading: false,
        trailing: true,
      }
    ),
    // 处理更改之后的函数

    // 怎么获取到item对应的函数的？
    handleAfterChange(e) {
      if (!this.readOnly) {
        const { action, item } = e
        console.log(action, item)
        if (item && item.getModel) {
          const model = item.getModel()
          if (!model.data) {
            // 需要先定义成空数组，不然默认为undefined
            model.data = []
            model.data.push({
              signal: '',
              op: '',
              value: '',
              id: Number(new Date()),
            })
          }
        }
        // 可以根据 action 和 model 来决定是否删掉左侧用过的节点
      }
    },
    saveChartData(data) {
      console.log(data)
      this.$emit('save-data', data)
    },
    _downloadImage(data, filename = 'flowchart.png') {
      const a = document.createElement('a')
      a.href = data
      a.download = filename
      document.body.appendChild(a)
      a.click()
    },
    downloadImage() {
      const page = this.$refs['flowChart'].propsAPI.editor.getCurrentPage()
      this._downloadImage(page.saveImage().toDataURL('image/png'))
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
    // border: 1px solid #e6e9ed;
    padding: 8px;
    background: #1183fb;
    color: #fff;
  }

  .vfe-chart-container {
    flex: 1;
    display: flex;
    overflow: hidden;
    background-color: #fff;
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
        height: auto;
        padding: 15px;
        border-radius: 10px;
        z-index: 999;
        opacity: 0.8;
        color: #ffffff;
        font-size: 12px;
        background-color: #000;
        p {
          margin: 0;
        }
      }
      .vfe-chart-main-minimap {
        position: fixed;
        // top: 43px;
        top: 43px;
        right: 362px;
        width: 160px;
        height: 160px;
        // border-top: 1px solid #1183fb;
        border: 1px solid black;
      }
    }

    .vfe-chart-sidebar {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      // justify-content: center;
      // width: 300px;
      width: 360px;
      padding-top: 10px;
      // height: 40vh;
      background-color: #fafafa;
      border-right: 1px solid #1183fb;
      border-bottom: 1px solid #1183fb;
      box-shadow: 0 0 10px #00a1d6;
      .vfe-chart-sidebar-top {
        display: flex;
        align-content: center;
        justify-content: center;
        height: 10vh;
        width: 100%;
      }
      .vfe-chart-sidebar-bottom {
        padding-top: 2vh;
        width: 100%;
        overflow: auto;
        border-top: 1px solid #1183fb;
        height: 80vh;
      }
    }

    .vfe-chart-panel {
      position: relative;
      // width: 300px;
      width: 360px;
      height: 100vh;
      font-size: 11px;
      background-color: #fafafa;
      border-left: 1px solid #1183fb;
      box-shadow: 0 0 10px #00a1d6;

      .vfe-chart-panel-detail {
        box-sizing: border-box;
        position: fixed;
        top: 45px;
        // width: 300px;
        width: 360px;
        padding: 10px;
        height: 100vh;
        // height: ~'calc(100% - 250px)';
        overflow-y: auto;
      }

      // .vfe-chart-panel-minimap {
      //   position: fixed;
      //   // top: 43px;
      //   bottom: 0;
      //   width: 200px;
      //   height: 200px;
      //   // border-top: 1px solid #1183fb;
      //   border: 1px solid black;
      // }
      .status {
        margin-bottom: 20px;

        .setStatus {
          text-indent: 2em;
          margin: 10px 0;
        }
        .setCondition {
          text-indent: 4em;
        }
        .result {
          text-indent: 6em;
          font-weight: bold;
        }
        p {
          margin: 5px 0;
        }
      }
    }
  }
}
</style>
