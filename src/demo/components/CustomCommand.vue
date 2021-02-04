<template>
  <div>
    <register-command
      name="generateData"
      :config="generateDataCommandConfig"
      extend="copy"
    />
    <register-command
      name="downloadImage"
      :config="downloadImageCommandConfig"
      extend="copy"
    />
  </div>
</template>

<script>
import { RegisterCommand } from '../../index'

export default {
  name: 'CustomCommand',
  components: {
    RegisterCommand,
  },
  inject: ['root'],
  props: ['save', 'download'],
  data() {
    const { propsAPI } = this.root
    const { save, download } = this
    return {
      generateDataCommandConfig: {
        queue: false, // 是否进入列队，默认为 true
        enable(/* editor */) {
          // 命令是否可用
          return true
        },
        execute(/* editor */) {
          // 正向命令逻辑
          alert('执行正向命令')
          const data = propsAPI.save()
          save(data)
        },
        back(/* editor */) {
          // 反向命令逻辑
          console.log('执行反向命令')
        },
      },
      downloadImageCommandConfig: {
        queue: false,
        enable() {
          return true
        },
        execute() {
          download()
        },
        back() {},
      },
    }
  },
}
</script>
