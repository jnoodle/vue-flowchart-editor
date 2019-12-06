<template>
  <register-command
    name="generateData"
    :config="customCommandConfig"
    extend="copy"
  />
</template>

<script>
import { RegisterCommand } from '../../index'

export default {
  name: 'CustomCommand',

  components: {
    RegisterCommand,
  },

  inject: ['root'],

  data() {
    const { propsAPI } = this.root
    return {
      customCommandConfig: {
        queue: false, // 是否进入列队，默认为 true
        enable(/* editor */) {
          // 命令是否可用
          return true
        },
        execute(/* editor */) {
          // 正向命令逻辑
          console.log('执行正向命令')
          alert(JSON.stringify(propsAPI.save()))
        },
        back(/* editor */) {
          // 反向命令逻辑
          console.log('执行反向命令')
        },
      },
    }
  },
}
</script>
