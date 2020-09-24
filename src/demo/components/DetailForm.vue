<template>
  <div>
    <form readonly>
      <div v-if="type === 'node'">
        <!--  customize properties -->
        <p class="form-item">
          <label>id</label>
          <input v-model="formModel.id" />
        </p>
        <p class="form-item">
          <label>名称</label>
          <input v-model="formModel.label" />
        </p>
        <p class="form-item" v-for="item in formModel.data" :key="item.name">
          <label>{{ item.name }}</label>
          <input v-model="item.value" />
        </p>
        <hr />
        <p class="form-item">
          <label>颜色</label>
          <input v-model="formModel.color" />
        </p>
        <p class="form-item">
          <label>形状</label>
          <select v-model="formModel.shape">
            <option value="">-- 请选择节点的形状 --</option>
            <option value="flow-rect">rect</option>
            <option value="flow-circle">circle</option>
            <option value="flow-rhombus">rhombus</option>
            <option value="flow-capsule">capsule</option>
          </select>
        </p>
        <p class="form-item">
          <label>尺寸</label>
          <input v-model="formModel.size" />
        </p>
        <p class="form-item">
          <button @click.prevent="handleSubmit" v-if="!readOnly">
            更新属性
          </button>
        </p>
      </div>
      <div v-else-if="type === 'edge'">
        <p>
          <select v-model="formModel.shape">
            <option value="">-- 请选择边的形状 --</option>
            <option value="flow-smooth">Smooth</option>
            <option value="flow-polyline">Polyline</option>
            <option value="flow-polyline-round">Polyline Round</option>
            <option value="custom-polyline">Custom Polyline</option>
          </select>
        </p>
        <p class="form-item">
          <label>id</label>
          <input v-model="formModel.id" />
        </p>
        <p class="form-item">
          <label>名称</label>
          <input v-model="formModel.label" />
        </p>
        <p class="form-item" v-for="item in formModel.data" :key="item.name">
          <label>{{ item.name }}</label>
          <input v-model="item.value" />
        </p>
        <p class="form-item">
          <button @click.prevent="handleSubmit">更新属性</button>
        </p>
      </div>
      <div v-else-if="type === 'group'">
        <input v-model="formModel.label" @blur.prevent="handleSubmit" />
      </div>
    </form>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'EditorDetailForm',

  inject: ['root'],

  props: ['type', 'readOnly'],

  data() {
    return {
      formModel: {},
      maxNodeWidth: 200, // fit long label
      defaultNodeWidth: 80,
      defaultNodeHeight: 48,
      fontSize: 12,
    }
  },

  created() {
    const formModel = this.root.propsAPI.getSelected()[0].getModel()
    this.formModel = Object.assign(
      {},
      { shape: 'flow-smooth' },
      cloneDeep(formModel) // 防止误编辑
    )
  },

  methods: {
    handleSubmit() {
      const { getSelected, executeCommand, update } = this.root.propsAPI
      const { formModel } = this
      setTimeout(() => {
        const item = getSelected()[0]
        if (!item) return

        // 自动调整尺寸
        const adjustSize = (model) => {
          if (model.type !== 'node' || model.shape !== 'flow-rect') {
            return model
          }
          const canvas = document.createElement('canvas')
          const canvasContext = canvas.getContext('2d')
          canvasContext.font = this.fontSize + 'px System'
          const maxWidth = this.maxNodeWidth
          let label = model.label.replace('\n', '')
          let sourceWidth = this.defaultNodeWidth
          let sourceHeight = this.defaultNodeHeight
          const spacing = 10
          const widthWithSpacing =
            canvasContext.measureText(label).width + spacing
          model.size = `${sourceWidth}*${sourceHeight}` // 先恢复默认尺寸

          if (widthWithSpacing <= sourceWidth || sourceWidth >= maxWidth) {
            return model
          }

          // 自动撑宽
          if (widthWithSpacing <= maxWidth) {
            return {
              ...model,
              size: `${widthWithSpacing}*${sourceHeight}`,
            }
          }

          // 自动折行
          let multilineText = ''
          let multilineCount = 1
          let multilineTextWidth = 0

          for (const char of label) {
            const { width } = canvasContext.measureText(char)

            if (multilineTextWidth + width + spacing >= maxWidth) {
              multilineText += '\n'
              multilineTextWidth = 0
              multilineCount++
            }

            multilineText += char
            multilineTextWidth += width
          }

          return {
            ...model,
            label: multilineText,
            size: `${maxWidth}*${Math.max(
              sourceHeight,
              this.fontSize * multilineCount * 1.2 + spacing
            )}`,
          }
        }

        const newFormModel = adjustSize(formModel)

        console.log(newFormModel)

        executeCommand(() => {
          update(item, newFormModel)
        })
      }, 0)
    },
  },
}
</script>

<style lang="less">
hr {
  height: 0;
  border: 0;
  border-top: 1px dashed #ccc;
}
.form-item {
  display: flex;
  font-size: 12px;

  label {
    width: 70px;
    margin-right: 10px;
    text-align: right;
  }
  input {
    width: 160px;
  }
  button {
    width: 160px;
    height: 30px;
    margin: 0 auto;
  }
}
</style>
