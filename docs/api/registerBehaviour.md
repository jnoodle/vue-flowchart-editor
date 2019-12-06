# RegisterBehaviour

注册行为

## 使用说明

> G6 [自定义图项](https://g6.antv.vision/zh/docs/manual/advanced/custom-node#%E6%89%A9%E5%B1%95-shape) 教程

```html
<template>
  <vue-flowchart-editor>
    <flow />
    <register-behaviour name="" :behaviour="() => {}" :dependences="[]" />
  </vue-flowchart-editor>
</template>
<script>
import VueFlowchartEditor, { Flow, RegisterBehaviour } from 'vue-flowchart-editor';
export default {
  components: { VueFlowchartEditor, Flow, RegisterBehaviour }
}
<script>
```

## API

| 属性        | 说明     | 类型             | 默认值 |
| :---------- | :------- | :--------------- | :----- |
| name        | 行为名称 | `string`         | -      |
| behaviour   | 行为配置 | `function(page)` | -      |
| dependences | 继承行为 | `string[]`       | -      |
