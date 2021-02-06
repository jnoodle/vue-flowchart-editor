<template>
  <div readonly>
    <!-- 只有1个值时，需要在el-form标签里添加@submit.native.prevent -->
    <el-form v-if="type === 'node'" label-width="60px" label-position="right" @submit.native.prevent="handleSubmit">
      <el-form-item label="修改状态" style="margin-left:10px;">
        <el-input v-model="formModel.label" />
      </el-form-item>
    </el-form>
    <!-- 有多个值时，不需要 -->
    <!-- 问题：当超过两个时，会溢出，而且不可见 -->
    <el-form v-if="type === 'edge'" label-width="60px" label-position="right">

      <el-form-item label="信号" style="margin-left:10px;">
        <template v-for="item in formModel.data">
          <el-input v-model="item.signal" @keyup.enter.native="handleSubmit" :key="item.signal"></el-input>
        </template>
      </el-form-item>
      <el-form-item label="关系" style="margin-left:10px;">
        <template v-for="item in formModel.data">
          <el-input v-model="item.op" @keyup.enter.native="handleSubmit" :key="item.op"></el-input>
        </template>
      </el-form-item>
      <el-form-item label="值" style="margin-left:10px;">
        <template v-for="item in formModel.data">
          <el-input v-model="item.value" @keyup.enter.native="handleSubmit" :key="item.value"></el-input>
        </template>
      </el-form-item>
    </el-form>
    <el-form v-if="type === 'group'" label-width="60px" label-position="right" @submit.native.prevent="handleSubmit">
      <el-form-item>
        <el-input v-model="formModel.label" @blur.prevent="handleSubmit" />
      </el-form-item>
    </el-form>
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
    // 提交触发的函数
    // 目前只支持修改label属性
    handleSubmit() {
      alert('触发了提交函数')
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
.el-form {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.el-input,
.el-textarea {
  width: 200px;
  margin: 0 auto;
  margin-top:10px;
}
.updateBtn {
  text-align: center;
}
</style>
