# RegisterCommand

注册命令

## 使用说明

```html
<template>
  <vue-flowchart-editor>
    <flow />
    <register-command name="" "config="{}" extend="" />
  </vue-flowchart-editor>
</template>
<script>
  import VueFlowchartEditor, {
    Flow,
    RegisterCommand,
  } from 'vue-flowchart-editor'
  export default {
    components: { VueFlowchartEditor, Flow, RegisterCommand },
  }
</script>
```

## API

| 属性   | 说明                                        | 类型     | 默认值 |
| :----- | :------------------------------------------ | :------- | :----- |
| name   | 命令名称                                    | `string` | -      |
| config | 命令配置                                    | `object` | -      |
| extend | 继承命令，[内置命令](./command.md#内置命令) | `string` | -      |
