<template>
  <context-menu class="contextMenu">
    <node-menu>
      <menu-li command="copy" text="拷贝" />
      <menu-li command="delete" text="删除" />
    </node-menu>
    <edge-menu>
      <menu-li command="delete" text="删除" />
    </edge-menu>
    <group-menu>
      <menu-li command="copy" text="拷贝" />
      <menu-li command="delete" text="删除" />
      <menu-li command="unGroup" icon="ungroup" text="取消编组" />
    </group-menu>
    <multi-menu>
      <menu-li command="copy" text="拷贝" />
      <menu-li command="paste" text="粘贴" />
      <menu-li command="addGroup" icon="group" text="编组" />
      <menu-li command="delete" text="删除" />
    </multi-menu>
    <canvas-menu>
      <menu-li command="undo" text="撤销" />
      <menu-li command="redo" text="重做" />
      <menu-li command="pasteHere" icon="paste" text="粘贴到这里" />
    </canvas-menu>
  </context-menu>
</template>

<script>
import {
  NodeMenu,
  EdgeMenu,
  GroupMenu,
  MultiMenu,
  CanvasMenu,
  ContextMenu,
} from '../../index'
import MenuLi from './ContextMenuItem'

export default {
  name: 'EditorContextMenu',
  components: {
    NodeMenu,
    EdgeMenu,
    GroupMenu,
    MultiMenu,
    CanvasMenu,
    ContextMenu,
    MenuLi,
  },
}
</script>

<style lang="less">
.contextMenu {
  display: none;
  overflow: hidden;
  font-size: 12px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.contextMenu .command.disable .item {
  color: rgba(0, 0, 0, 0.25);
  cursor: auto;
}

.contextMenu .command.disable .item:hover {
  background: #fff;
}

.contextMenu .item {
  display: flex;
  align-items: center;
  padding: 5px 12px;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
}

.contextMenu .item:hover {
  background: #e6f7ff;
}

.contextMenu .item i {
  margin-right: 8px;
  margin-top: 3px;
}
</style>
