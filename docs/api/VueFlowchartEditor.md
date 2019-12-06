# VueFlowchartEditor

流程图编辑器

## 使用说明

```html
<template>
  <vue-flowchart-editor ref="vueFlowchartEditor">
    <flow />
  </vue-flow-editor>
</template>

<script>
import VueFlowchartEditor, { Flow } from 'vue-flowchart-editor'
export default {
  methods: {},
  components: { VueFlowchartEditor, Flow }
}
</script>
```

## API

利用`$refs`属性，可以拿到`<vue-flowchart-editor/>`上的`propsAPI`属性。通过他们可以执行不同的命令。

### propsAPI

| 属性           | 说明             | 类型                    |
| :------------- | :--------------- | :---------------------- |
| executeCommand | 执行命令         | `function(command)`     |
| read           | 读取数据         | `function(data)`        |
| save           | 保存数据         | `function() => object`  |
| add            | 添加图项         | `function(type, model)` |
| find           | 查找图项         | `function(id)`          |
| update         | 更新图项         | `function(item, model)` |
| remove         | 删除图项         | `function(item)`        |
| getSelected    | 获取当前选中图项 | `function`              |

示例

```html
<script>
  export default {
    methods: {
      saveDataFromChart() {
        console.log(this.$refs.vueFlowchartEditor.propsAPI.save())
      },
    },
  }
</script>
```

### editor

## Events

请移步至 [EditorEvents](./editorEvents.md) 查看详情
