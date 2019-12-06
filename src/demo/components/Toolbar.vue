<template>
  <toolbar class="toolbar">
    <template v-if="!readOnly">
      <toolbar-button command="undo" text="撤销" />
      <toolbar-button command="redo" text="重做" />
      <toolbar-button command="copy" text="复制" />
      <toolbar-button command="paste" text="粘贴" />
      <div class="split"></div>
    </template>
    <toolbar-button command="zoomIn" icon="zoom-in" text="放大" />
    <toolbar-button command="zoomOut" icon="zoom-out" text="缩小" />
    <toolbar-button command="autoZoom" icon="fit" text="自适应" />
    <toolbar-button command="resetZoom" icon="actual-size" text="实际尺寸" />
    <template v-if="!readOnly">
      <div class="split"></div>
      <toolbar-button command="toBack" icon="to-back" text="向下一层" />
      <toolbar-button command="toFront" icon="to-front" text="向上一层" />
      <toolbar-button command="addGroup" icon="group" text="编组" />
      <toolbar-button command="unGroup" icon="ungroup" text="取消编组" />
      <toolbar-button command="selectAll" icon="select-all" text="全选" />
      <toolbar-button command="multiSelect" icon="select" text="框选" />
      <div class="split"></div>
      <toolbar-button command="delete" text="删除" label="保存数据" />
      <toolbar-button command="clear" icon="clear" text="清空画布" />
    </template>
    <!-- right toolbar button -->
    <div class="pull-right">
      <toolbar-button
        command="generateData"
        icon="save"
        text="生成数据"
        label="保存数据"
      />
      <button @click.prevent="handleToggleReadOnly">
        {{ readOnly ? '编辑模式' : '只读模式' }}
      </button>
    </div>
  </toolbar>
</template>

<script>
import { Toolbar } from '../../index'
import ToolbarButton from './ToolbarButton'

export default {
  name: 'FlowToolbar',

  components: {
    Toolbar,
    ToolbarButton,
  },

  props: ['chartData', 'toggleReadOnly', 'readOnly'],

  methods: {
    generateData() {
      console.log(JSON.stringify(this.chartData))
    },
    handleToggleReadOnly() {
      // ugly
      this.$parent.$parent.$parent.$emit('toggle-read-only')
    },
  },
}
</script>

<style lang="less">
.toolbar {
  display: flex;
  align-items: center;
  height: 27px;

  .split {
    width: 10px;
    height: 100%;
    border-right: 1px solid #eee;
    margin-right: 10px;
  }

  .pull-right {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .command {
    display: flex;
    color: #333;

    i {
      display: block;
      width: 27px;
      height: 27px;
      margin: 0 6px;
      padding-top: 10px;
      text-align: center;
      border: 1px solid #fff;
      cursor: pointer;
    }

    span {
      display: block;
      font-size: 12px;
      padding-top: 10px;
      margin-left: -6px;
      padding-right: 6px;
      line-height: 20px;
      cursor: pointer;
    }

    &:hover {
      color: #1890ff;
    }
  }

  .disable {
    color: rgba(0, 0, 0, 0.25);
    i {
      cursor: not-allowed;
    }

    span {
      cursor: not-allowed;
    }

    &:hover {
      color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
