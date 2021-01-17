import React from 'react'
import ReactEcharts from 'echarts-for-react'

interface ChartProps {
  data: number[][]
}

const Chart: React.FC<ChartProps> = ({ data }) => {
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
                    // name: row[0]+'-'+row[1],
                    x: row[1],
                    y: row[0],
                    value: row[2],
                    symbol: 'rect',
                    symbolSize: 1024 / 512,
                    itemStyle: {
                      color:
                        row[2] === 1 ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)',
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
