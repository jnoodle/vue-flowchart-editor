# RegisterNode

注册节点

## 使用说明

> G6 [自定义图项](https://g6.antv.vision/zh/docs/manual/advanced/custom-node#%E6%89%A9%E5%B1%95-shape) 教程

```html
<template>
  <vue-flowchart-editor>
    <flow />
    <register-node name="" :config="{}" extend="" />
  </vue-flowchart-editor>
</template>
<script>
  import VueFlowchartEditor, { Flow, RegisterNode } from 'vue-flowchart-editor'
  export default {
    components: { VueFlowchartEditor, Flow, RegisterNode },
  }
</script>
```

## API

| 属性   | 说明     | 类型     | 默认值 |
| :----- | :------- | :------- | :----- |
| name   | 节点名称 | `string` | -      |
| config | 节点配置 | `object` | -      |
| extend | 继承图形 | `string` | -      |

## 内置节点

| 节点英文名   | 节点中文名 | 示例预览                                                                         | 适用页面 |
| :----------- | :--------- | :------------------------------------------------------------------------------- | :------- |
| flow-circle  | 起止节点   | ![起止节点](https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg) | Flow     |
| flow-rect    | 常规节点   | ![起止节点](https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg) | Flow     |
| flow-rhombus | 分叉节点   | ![分叉节点](https://gw.alipayobjects.com/zos/rmsportal/SnWIktArriZRWdGCnGfK.svg) | Flow     |
| flow-capsule | 模型节点   | ![模型节点](https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg) | Flow     |
