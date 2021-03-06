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
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip: {
        show: false,
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: 'Save as image',
          },
        },
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
                    symbolSize: 1024 / (size + 6),
                    itemStyle: {
                      color:
                        row[2] === 1
                          ? 'rgba(0,0,0,1)'
                          : row[2] === 2
                          ? 'rgba(231,76,60,1)'
                          : 'rgba(0,64,255,1)',
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
        style={{ height: '1024px', width: '1024px', padding: 0, margin: 0 }}
        opts={{ renderer: data.length < 20000 ? 'svg' : 'canvas' }}
        lazyUpdate={true}
      />
    </div>
  )
}

export default Chart
