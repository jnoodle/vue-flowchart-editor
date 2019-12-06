# Editor Events

## 监听事件

```html
<template>
  <vue-flowchart-editor
    :onBeforeCommandExecute="handleBeforeCommand"
    :onAfterCommandExecute="handleAfterCommand"
  >
    <flow />
  </vue-flowchart-editor>
</template>

<script>
  import VueFlowchartEditor, { Flow } from 'vue-flowchart-editor'
  export default {
    methods: {
      handleBeforeCommand({ command }) {
        console.log('before command execute', command)
      },
      handleAfterCommand({ command }) {
        console.log('after command execute', command)
      },
    },
    components: { VueFlowchartEditor, Flow },
  }
</script>
```

## 事件列表

| 事件名称               | 事件说明   |
| :--------------------- | :--------- |
| onBeforeCommandExecute | 命令执行前 |
| onAfterCommandExecute  | 命令执行后 |

## 命令对象

| 命令属性 | 属性说明                                           | 类型      |
| :------- | :------------------------------------------------- | :-------- |
| name     | 命令名称                                           | `string`  |
| queue    | 是否进入命令队列，进入命令队列则可以执行撤销、重做 | `boolean` |
