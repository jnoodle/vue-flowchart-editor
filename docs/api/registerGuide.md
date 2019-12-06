# RegisterGuide

注册导引信息

## 使用说明

> G6 [自定义图项](https://g6.antv.vision/zh/docs/manual/advanced/custom-node#%E6%89%A9%E5%B1%95-shape) 教程

```html
<template>
  <vue-flowchart-editor>
    <flow />
    <register-guide name="" :config="{}" extend="" />
  </vue-flowchart-editor>
</template>
<script>
  import VueFlowchartEditor, { Flow, RegisterGuide } from 'vue-flowchart-editor'
  export default {
    components: { VueFlowchartEditor, Flow, RegisterGuide },
  }
</script>
```

## API

| 属性   | 说明         | 类型     | 默认值 |
| :----- | :----------- | :------- | :----- |
| name   | 导引信息名称 | `string` | -      |
| config | 导引信息配置 | `object` | -      |
| extend | 继承图形     | `string` | -      |
