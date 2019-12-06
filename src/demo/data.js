export default {
  nodes: [
    {
      type: 'node',
      size: '72*72',
      shape: 'flow-circle',
      color: '#FA8C16',
      label: 'Start',
      x: 468,
      y: 61,
      id: '01729835',
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
    {
      type: 'node',
      size: '80*48',
      shape: 'flow-rect',
      color: '#1890FF',
      label: 'Normal',
      x: 468,
      y: 201.5,
      id: 'b69121d6',
      index: 1,
      data: [
        {
          name: 'prop3',
          value: 'prop3',
        },
        {
          name: 'prop4',
          value: 'prop4',
        },
      ],
    },
  ],
  edges: [
    {
      source: '01729835',
      sourceAnchor: 2,
      target: 'b69121d6',
      targetAnchor: 0,
      id: '070785c1',
      index: 4,
    },
  ],
}
