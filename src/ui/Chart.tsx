import React from 'react'
import ReactEcharts from 'echarts-for-react'

interface ChartProps {
  data: number[][]
  size: number
}

const Chart: React.FC<ChartProps> = ({ data, size }) => {
  if (!data) {
    return <div>No map!</div>
  }
  const getOptions = () => {
    return {
      animation: false,

      tooltip: {
        show: false,
      },
      series: [
        {
          type: 'graph',
          layout: 'none',
          hoverAnimation: false,
          data:
            data !== undefined
              ? data.map((row) => {
                  return {
                    x: row[1],
                    y: row[0],
                    value: row[2],
                    symbol: 'rect',
                    symbolSize: 1024 / (size + 1),
                    itemStyle: {
                      color:
                        row[2] === 1 ? 'rgba(0,0,0,1)' : 'rgba(231,76,60,1)',
                    },
                  }
                })
              : {},
        },
      ],
    }
  }
  return (
    <div>
      <ReactEcharts
        option={getOptions()}
        style={{ height: '1024px', width: '1024px' }}
        opts={{ renderer: 'canvas' }}
        lazyUpdate={true}
      />
    </div>
  )
}

export default Chart
