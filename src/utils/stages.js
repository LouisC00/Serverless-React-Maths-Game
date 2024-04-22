export const stages = [
  {
    scoreMin: 0,
    operations: [
      {
        ranges: [
          [1, 10],
          [1, 10],
        ],
        operation: "+",
        defaultTime: 100,
      },
    ],
  },
  {
    scoreMin: 5,
    operations: [
      {
        ranges: [
          [10, 50],
          [1, 10],
        ],
        operation: "+",
        defaultTime: 100,
      },
    ],
  },
  {
    scoreMin: 10,
    operations: [
      {
        ranges: [
          [10, 50],
          [10, 50],
        ],
        operation: "+",
        defaultTime: 60,
      },
    ],
  },
  {
    scoreMin: 40,
    operations: [
      {
        ranges: [
          [100, 1000],
          [100, 1000],
        ],
        operation: "+",
        defaultTime: 60,
      },
    ],
  },
  {
    scoreMin: 70,
    operations: [
      {
        ranges: [
          [100, 1000],
          [100, 1000],
        ],
        operation: "+",
        defaultTime: 50,
      },
      {
        ranges: [
          [10, 100],
          [2, 10],
        ],
        operation: "×",
        defaultTime: 60,
      },
    ],
  },
  {
    scoreMin: 100,
    operations: [
      {
        ranges: [
          [100, 1000],
          [100, 1000],
        ],
        operation: "+",
        defaultTime: 40,
      },
      {
        ranges: [
          [10, 100],
          [10, 100],
        ],
        operation: "×",
        defaultTime: 40,
      },
    ],
  },
  {
    scoreMin: 150,
    operations: [
      {
        ranges: [
          [1000, 10000],
          [1000, 10000],
        ],
        operation: "+",
        defaultTime: 40,
      },
      {
        ranges: [
          [10, 100],
          [10, 100],
        ],
        operation: "×",
        defaultTime: 40,
      },
    ],
  },
  {
    scoreMin: 180,
    operations: [
      {
        ranges: [
          [1000, 10000],
          [1000, 10000],
        ],
        operation: "+",
        defaultTime: 40,
      },
      {
        ranges: [
          [1000, 10000],
          [100, 1000],
        ],
        operation: "−",
        defaultTime: 40,
      },
      {
        ranges: [
          [10, 100],
          [10, 100],
        ],
        operation: "×",
        defaultTime: 40,
      },
    ],
  },
  {
    scoreMin: 240,
    operations: [
      {
        ranges: [
          [1000, 10000],
          [1000, 10000],
        ],
        operation: "+",
        defaultTime: 40,
      },
      {
        ranges: [
          [1000, 10000],
          [100, 1000],
        ],
        operation: "−",
        defaultTime: 40,
      },
      {
        ranges: [
          [10, 100],
          [10, 100],
        ],
        operation: "×",
        defaultTime: 40,
      },
    ],
  },
  {
    scoreMin: 260,
    operations: [
      {
        ranges: [
          [1000, 10000],
          [1000, 10000],
        ],
        operation: "+",
        defaultTime: 40,
      },
      {
        ranges: [
          [1000, 10000],
          [100, 1000],
        ],
        operation: "−",
        defaultTime: 40,
      },
      {
        ranges: [
          [10, 100],
          [10, 100],
        ],
        operation: "×",
        defaultTime: 40,
      },
    ],
  },
  {
    scoreMin: 280,
    operations: [
      {
        ranges: [
          [1000, 10000],
          [1000, 10000],
        ],
        operation: "+",
        defaultTime: 40,
      },
      {
        ranges: [
          [1000, 10000],
          [100, 1000],
        ],
        operation: "−",
        defaultTime: 40,
      },
      {
        ranges: [
          [10, 100],
          [10, 100],
        ],
        operation: "×",
        defaultTime: 40,
      },
      {
        ranges: [
          [10000, 100000],
          [2, 10],
        ],
        operation: "÷",
        defaultTime: 40,
      },
    ],
  },
  {
    scoreMin: 360,
    operations: [
      {
        ranges: [
          [1000, 10000],
          [1000, 10000],
        ],
        operation: "+",
        defaultTime: 30,
      },
      {
        ranges: [
          [1000, 10000],
          [1000, 10000],
        ],
        operation: "−",
        defaultTime: 30,
      },
      {
        ranges: [
          [10, 1000],
          [10, 100],
        ],
        operation: "×",
        defaultTime: 30,
      },
      {
        ranges: [
          [10000, 100000],
          [10, 100],
        ],
        operation: "÷",
        defaultTime: 30,
      },
    ],
  },
  {
    scoreMin: 400,
    operations: [
      {
        ranges: [
          [1000, 10000],
          [1000, 10000],
        ],
        operation: "+",
        defaultTime: 22,
      },
      {
        ranges: [
          [1000, 10000],
          [100, 1000],
        ],
        operation: "−",
        defaultTime: 22,
      },
      {
        ranges: [
          [100, 1000],
          [100, 1000],
        ],
        operation: "×",
        defaultTime: 22,
      },
      {
        ranges: [
          [10000, 100000],
          [100, 1000],
        ],
        operation: "÷",
        defaultTime: 22,
      },
    ],
  },
  {
    scoreMin: 450,
    operations: [
      {
        ranges: [
          [1000, 10000],
          [1000, 10000],
        ],
        operation: "+",
        defaultTime: 15,
      },
      {
        ranges: [
          [1000, 10000],
          [100, 1000],
        ],
        operation: "−",
        defaultTime: 15,
      },
      {
        ranges: [
          [100, 1000],
          [100, 1000],
        ],
        operation: "×",
        defaultTime: 15,
      },
      {
        ranges: [
          [10000, 100000],
          [100, 1000],
        ],
        operation: "÷",
        defaultTime: 15,
      },
    ],
  },
  {
    scoreMin: 500,
    operations: [
      {
        ranges: [
          [1000, 10000],
          [1000, 10000],
        ],
        operation: "+",
        defaultTime: 9,
      },
      {
        ranges: [
          [1000, 10000],
          [100, 1000],
        ],
        operation: "−",
        defaultTime: 9,
      },
      {
        ranges: [
          [100, 1000],
          [100, 1000],
        ],
        operation: "×",
        defaultTime: 9,
      },
      {
        ranges: [
          [10000, 100000],
          [100, 1000],
        ],
        operation: "÷",
        defaultTime: 9,
      },
    ],
  },
  {
    scoreMin: 530,
    operations: [
      {
        ranges: [
          [10000, 100000],
          [10000, 100000],
        ],
        operation: "+",
        defaultTime: 4.5,
      },
      {
        ranges: [
          [10000, 100000],
          [1000, 10000],
        ],
        operation: "−",
        defaultTime: 4.5,
      },
      {
        ranges: [
          [1000, 10000],
          [1000, 10000],
        ],
        operation: "×",
        defaultTime: 4.5,
      },
      {
        ranges: [
          [100000, 1000000],
          [10, 1000],
        ],
        operation: "÷",
        defaultTime: 4.5,
      },
    ],
  },
  {
    scoreMin: 560,
    operations: [
      {
        ranges: [
          [10000, 100000],
          [10000, 100000],
        ],
        operation: "+",
        defaultTime: 3,
      },
      {
        ranges: [
          [10000, 100000],
          [1000, 10000],
        ],
        operation: "−",
        defaultTime: 3,
      },
      {
        ranges: [
          [1000, 10000],
          [1000, 10000],
        ],
        operation: "×",
        defaultTime: 3,
      },
      {
        ranges: [
          [100000, 1000000],
          [10, 1000],
        ],
        operation: "÷",
        defaultTime: 3,
      },
    ],
  },
];
