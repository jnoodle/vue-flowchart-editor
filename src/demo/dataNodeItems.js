// 左边的图形
export default [
  {
    model: {
      label: '节点',
    },
  },
  // 三种状态
  // {
  //   model: {
  //     label: '检测状态',
  //     data: [
  //       {
  //         name: '检测状态',
  //         value: 'check',
  //       },
  //       {
  //         name: '故障状态',
  //         value: 'problem',
  //       },
  //       {
  //         name: '确认状态',
  //         value: 'confirm',
  //       },
  //     ],
  //   },
  // },
  // 默认矩形显示
  // {
  //   model: {
  //     label: '故障状态',
  //   },
  // },
  // {
  //   model: {
  //     label: '确认状态',
  //   },
  // },
  {
    shape: 'flow-circle',
    model: {
      label: '节点',
      color: '#FA8C16',
    },
  },
  // 设置与转移
  // {
  //   shape: 'flow-circle',
  //   model: {
  //     label: '状态设置',
  //     color: '#FA8C16',
  //     data: [
  //       {
  //         name: '状态设置',
  //         value: 'set',
  //       },
  //     ],
  //   },
  // },
  // {
  //   shape: 'flow-circle',

  //   model: {
  //     label: '状态转移',
  //     color: '#FA8C16',
  //     // color: '#13C2C2',
  //     data: [
  //       {
  //         name: '状态转移',
  //         value: 'condition',
  //       },
  //     ],
  //   },
  // },
  // 三种状态转移结尾 设置
  {
    shape: 'flow-rhombus',
    model: {
      color: '#13C2C2',
      label: '节点',
    },
  },
  // {
  //   shape: 'flow-rhombus',
  //   model: {
  //     color: '#13C2C2',
  //     label: '检测确认',
  //   },
  // },
  // {
  //   shape: 'flow-rhombus',
  //   model: {
  //     color: '#13C2C2',
  //     label: '确认故障',
  //   },
  // },
  // {
  //   shape: 'flow-rhombus',
  //   model: {
  //     color: '#13C2C2',
  //     label: '故障恢复',
  //   },
  // },
  // {
  //   shape: 'flow-circle',
  //   size: '50*50',
  //   model: {
  //     color: '#FA8C16',
  //   },
  // },
  // {
  //   shape: 'flow-rhombus',
  //   model: {
  //     color: '#13C2C2',
  //   },
  // },
  // {
  //   shape: 'ellipse',
  //   model: {
  //     label: 'ellipse',
  //     color: '#13C2C2',
  //   },
  // },
  // {
  //   shape: 'diamond',
  //   model: {
  //     label: 'diamond',
  //     color: '#13C2C2',
  //   },
  // },
  // {
  //   shape: 'triangle',
  //   model: {
  //     label: 'triangle',
  //     color: '#13C2C2',
  //   },
  // },
  // {
  //   shape: 'star',
  //   model: {
  //     label: 'star',
  //     color: '#13C2C2',
  //   },
  // },
  // {
  //   shape: 'image',
  //   model: {
  //     label: 'image',
  //     color: '#13C2C2',
  //   },
  // },
  // {
  //   shape: 'modelRect',
  //   model: {
  //     label: 'modelRect',
  //     color: '#13C2C2',
  //   },
  // },
]
