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

  props: ['save'],

  data() {
    const { propsAPI } = this.root
    const { save } = this
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
          const data = propsAPI.save()
          console.log(data)
          save(data)
          alert(JSON.stringify(data))
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
