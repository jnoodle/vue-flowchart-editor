// 默认显示的数据与图形
export default {
  // 节点
  nodes: [
    // 检测状态
    {
      type: 'node',
      size: '70*48',
      shape: 'flow-circle',
      color: '#1890FF',
      // color: '#FA8C16',
      label: '检测状态',
      x: 150,
      y: 200,
      id: '1',
      index: 1,
      data: [
        {
          name: 'prop1',
          value: 'prop1',
        },
        {
          name: 'prop2',
          value: 'prop2',
        },
      ],
    },
    // 故障状态
    {
      type: 'node',
      size: '70*48',
      shape: 'flow-rect',
      color: '#1890FF',
      // color: '#FA8C16',
      label: '故障状态',
      x: 520,
      y: 300,
      id: '2',
      index: 0,
      data: [
        {
          name: 'prop1',
          value: 'prop1',
        },
        {
          name: 'prop2',
          value: 'prop2',
        },
      ],
    },
    // 确认状态
    {
      type: 'node',
      size: '70*48',
      shape: 'flow-rect',
      color: '#1890FF',
      // color: '#FA8C16',
      label: '确认状态',
      x: 400,
      y: 200,
      id: '3',
      index: 0,
      data: [
        {
          name: 'prop1',
          value: 'prop1',
        },
        {
          name: 'prop2',
          value: 'prop2',
        },
      ],
    },
  ],
  // 边
  edges: [
    {
      source: '1',
      target: '3',
      id: '4',
      label: '检测确认条件1',
      data: [
        {
          signal: 'State',
          op: 'between',
          value: '[1-47]',
          id:1,
        },
        {
          signal: '无需电池电压低',
          op: '==',
          value: 'True',
          id: 2,
        },
        {
          signal: '无BMS通讯丢失故障',
          op: '==',
          value: 'True',
          id: 3,
        },
        {
          signal: '接收到BMS首帧报文',
          op: '==',
          value: 'True',
          id: 4,
        },
        {
          signal: '状态延迟时间',
          op: '==',
          value: 'T7',
          id: 5,
        },
      ],
    },
    {
      source: '3',
      target: '2',
      id: '5',
      index: 1,
      label: '确认故障条件1',
      data: [
        {
          signal: '电池SOC',
          op: '<',
          value: 'SOC2',

          id: 6,
        },
      ],
    },
    {
      source: '2',
      target: '3',
      id: '7',
      index: 2,
      label: '故障恢复条件1',
      data: [
        {
          signal: '电池SOC',
          op: '>',
          value: 'SOC2',

          id: 7,
        },
      ],
    },
  ],
}

// 目前这些都是写好的数据？如何动态添加数据？
// 调用后端接口
