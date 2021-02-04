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
          <div class="tooltip">
            <template v-for="item in tooltipData">
              <p :key="item.name">{{ item.name }}: {{ item.value }}</p>
            </template>
          </div>
        </div>
        <!-- Right Panel -->
        <div class="vfe-chart-panel">
          <div class="vfe-chart-panel-detail">
            <div class="status">
              <p>检测状态 : </p>
              <p class="setStatus">状态设置 : </p>
              <p class="setStatus">状态转移 : </p>
              <p class="setCondition">State 在[1-47]区间 且 无需电池电压低 检测确认</p>
            </div>
            <div class="status">
              <p>确认状态 : </p>
              <p class="setStatus">状态设置 : </p>
              <p class="setStatus">状态转移 : </p>
            </div>
            <div class="status">
              <p>故障状态 : </p>
              <p class="setStatus">状态设置 : </p>
              <p class="setCondition">设置 故障处理 </p>
              <p class="setStatus">状态转移 : </p>
            </div>
            <div class="status">
              <p>故障处理 : </p>
              <p class="setStatus">如果 KbDIA_VCUHiLowLock_flg == 1</p>
              <p class="setCondition">如果 车速 > 1km/h</p>
              <p class="result">LEVEL=6</p>
              <p class="setCondition">否则</p>
              <p class="result">下高压/禁止高压上电</p>
              <p class="result">LEVEL=1</p>
              <p class="setCondition" style="word-break:break-all">否则 如果 kbDIA_VCUHiLowLock_flg == 0</p>
              <p class="result">上报不处理</p>
              <p class="result">LEVEL=6</p>
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
// import EditorMinimap from './components/EditorMinimap'
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
    // EditorMinimap,
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
    // 在右边显示文字
    handleJson(item) {
      let str = ''
      if (item.nodes.length) {
        item.nodes.map((i) => {
          str += i.label + ' : '
        })
      }
      str = str.replace(/[:]/g, ':\n ')
      console.log(item)
      return str
    },
    handleClick(e) {
      console.log(e)
      // 分成节点和边
      if (this.readOnly && !e.item) {
        this.tooltipDom.style.display = 'none'
      } else {
        if (e._type == 'node:click') {
        } else if (e._type == 'edge:click') {
          // 点击的是边
          // alert(e.item.model.label)
        }
      }
    },

    handleNodeClick(e) {
      // 点击节点
      console.log('点击了节点')
      // alert(e.item.model.label)
      console.log(e)
    },

    handleNodeDoubleClick(e) {
      // 双击节点
      console.log(e.item.model.data)
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
    handleAfterChange(e) {
      if (!this.readOnly) {
        const { action, item } = e
        console.log(action)
        if (item && item.getModel) {
          const model = item.getModel()
          console.log(model)
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
    }

    .vfe-chart-sidebar {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      // justify-content: center;
      width: 300px;
      padding-top: 10px;
      // height: 40vh;
      background-color: #fafafa;
      border-right: 1px solid #1183fb;
      border-bottom: 1px solid #1183fb;
      box-shadow: 0 0 10px #00a1d6;
      .vfe-chart-sidebar-top {
        height: 50vh;
        width: 100%;
      }
      .vfe-chart-sidebar-bottom {
        margin-top: -2vh;
        width: 100%;
        padding-top: 8vh;
        border-top: 1px solid #1183fb;
        height: 50vh;
      }
    }

    .vfe-chart-panel {
      position: relative;
      width: 300px;
      height: 100vh;
      font-size: 11px;
      background-color: #fafafa;
      border-left: 1px solid #1183fb;
      box-shadow: 0 0 10px #00a1d6;

      .vfe-chart-panel-detail {
        box-sizing: border-box;
        position: fixed;
        top: 45px;
        width: 300px;
        padding: 10px;
        height: 100vh;
        // height: ~'calc(100% - 250px)';
        overflow-y: auto;
      }

      .vfe-chart-panel-minimap {
        position: fixed;
        bottom: 0;
        width: 300px;
        height: 200px;
        border-top: 1px solid #1183fb;
      }
      .status {
        margin-bottom: 20px;

        .setStatus {
          text-indent: 2em;
        }
        .setCondition {
          text-indent: 4em;
        }
        .result{
          text-indent:6em;
          font-weight:bold
        }
        p {
          margin: 5px 0;
        }
      }
    }
  }
}
</style>
