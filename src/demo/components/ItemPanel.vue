<template>
  <item-panel class="item-panel">
    <template v-for="(item, index) in nodeItems">
      <item :key="index" :type="item.type || 'node'" :size="item.size || '80*48'" :shape="item.shape || 'flow-rect'" :model="{
          // must have model property
          color: item.model.color || '#1890FF',
          label: item.model.label || '节点',
          ...item.model,
        }">
        <template v-if="item.src">
          <div class="item item-img">
            <img :src="item.src" :alt="item.model.label" />
          </div>
        </template>
        <template v-else>
          <div :class="'item item-' + (item.shape || 'flow-rect')">
            <span>{{ item.model.label || '节点' }}</span>
          </div>
        </template>
      </item>
    </template>
  </item-panel>
</template>

<script>
import { Item, ItemPanel } from '../../index'

export default {
  name: 'EditorItemPanel',
  components: { ItemPanel, Item },
  props: {
    // all nodes for drag to generate flowchart
    nodeItems: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="less">
.item-panel {
  box-sizing: border-box;
  position: fixed;
  height: 50vh;
  top: 45px;
  bottom: 50%;
  left: 0;
  width: 300px;
  padding: 10px;
  text-align: center;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    user-select: none;

    &.item-flow-rect {
      width: 60px;
      height: 50px;
      margin: 0 10px;
      border: 1px solid rgb(24, 144, 255);
      background-color: rgba(24, 144, 255, 0.2);
    }

    &.item-flow-circle {
      width: 50px;
      height: 50px;
      margin: 0 40px;
      border-radius: 60px;
      border: 1px solid rgb(250, 140, 22);
      background-color: rgba(250, 140, 22, 0.2);
    }

    &.item-flow-rhombus {
      width: 50px;
      height: 50px;
      // margin-right: 10px;
      margin-right:30px;
      border: 1px solid rgb(19, 194, 194);
      background-color: rgba(19, 194, 194, 0.2);
      transform: rotate(45deg);
      span {
        transform: rotate(-45deg);
      }
    }

    &.item-img {
      max-width: 100px;
    }
  }
}
</style>
