# Flow

流程图

## 使用说明

```html
<template>
  <vue-flowchart-editor>
    <flow />
  </vue-flowchart-editor>
</template>
<script>
  import VueFlowchartEditor, { Flow } from 'vue-flowchart-editor'
  export default {
    components: { VueFlowchartEditor, Flow },
  }
</script>
```

## Props

| 属性      | 说明                                                                    | 类型                  | 默认值 |
| :-------- | :---------------------------------------------------------------------- | :-------------------- | :----- |
| data      | 初始数据                                                                | `object`              | -      |
| graph     | 图配置项，参考 [G6 Graph API](https://g6.antv.vision/zh/docs/api/Graph) | `object`              | -      |
| align     | 对齐配置                                                                | [`object`](#Align)    | -      |
| grid      | 网格线配置                                                              | [`object`](#Grid)     | -      |
| shortcut  | 快捷键配置，[内置命令](./command.md#内置命令)                           | [`object`](#Shortcut) | -      |
| noEndEdge | 是否支持悬空边                                                          | `boolean`             | `true` |

### Align

| 属性 | 说明       | 类型                                            | 默认值 |
| :--- | :--------- | :---------------------------------------------- | :----- |
| line | 对齐线样式 | `object`                                        | -      |
| item | 图项对齐   | `true` `false` `horizontal` `vertical` `center` | -      |
| grid | 网格对齐   | `true` `false` `cc` `tl`                        | -      |

### Grid

| 属性 | 说明       | 类型     | 默认值 |
| :--- | :--------- | :------- | :----- |
| cell | 网孔尺寸   | `number` | -      |
| line | 网格线样式 | `object` | -      |

### Shortcut

示例：

开启放大快捷键, 开启视口缩小快捷键

```html
<template>
  <vue-flowchart-editor>
    <flow :shortcut="{ zoomIn: true, zoomOut: false }" />
  </vue-flowchart-editor>
</template>
<script>
  import VueFlowchartEditor, { Flow } from 'vue-flowchart-editor'
  export default {
    components: { VueFlowchartEditor, Flow },
  }
</script>
```

## Events

请移步至 [PageEvents](./pageEvents.md) 查看详情
