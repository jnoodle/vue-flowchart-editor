# Minimap

缩略图

## 使用说明

不指定宽高的情况下则自动适应容器尺寸

```html
<template>
  <vue-flowchart-editor>
    <flow />
    <minimap :width="200" :height="200" />
  </vue-flowchart-editor>
</template>
<script>
  import VueFlowchartEditor, { Flow, Minimap } from 'vue-flowchart-editor'
  export default {
    components: {
      VueFlowchartEditor,
      Flow,
      Minimap,
    },
  }
</script>
```

## API

| 属性                | 说明                                                                     | 类型     | 默认值 |
| :------------------ | :----------------------------------------------------------------------- | :------- | :----- |
| container           | 容器 id                                                                  | `string` | -      |
| width               | 宽度                                                                     | `number` | -      |
| height              | 高度                                                                     | `number` | -      |
| viewportWindowStyle | 视窗样式，参考 [G 绘图属性](https://g2.antv.vision/zh/docs/api/graphics) | `object` | -      |
| viewportBackStyle   | 背景样式，参考 [G 绘图属性](https://g2.antv.vision/zh/docs/api/graphics) | `object` | -      |
