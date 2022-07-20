interface ChartInfo {
  // dom: string
  chartType: string
  chartData: Array<any>
  custom: object
}

interface ChartData {
  name: string
  value: number
}

class ChartDrawer {
  // dom: string
  chartType: string
  chartData: Array<any>
  custom: any
  colorList: Array<string>
  xAxisTextColor: string
  textColor: string
  chartOptions: any
  nodata: boolean
  myChart: any
  constructor(params: ChartInfo) {
    this.chartType = params.chartType || 'bar'
    this.chartData = params.chartData || []
    this.custom = params.custom || {}
    // this.dom = params.dom || ''
    this.colorList = ['#968EC9', '#66608F', '#C8C3F3', '#B788BF', '#E2D5E6', '#B1DAE9', '#515352']
    this.xAxisTextColor = '#888'
    this.textColor = '#333'
    this.chartOptions = {}
    this.nodata = false
  }
  initChart() {
  //   let option = this.getEchartsOption()
  //   this.myChart = echarts.init(this.dom)
  //   this.myChart.setOption(option)
    this.changeColor()
    this.getEchartsOption()
  }

  changeColor() {
    let body = document.body
    let theme = document.body.getAttribute('data-theme') || 'default'
    switch(theme) {
      case 'blue':
        this.colorList = ['#3aa1ff', '#5cbd91', '#ffbf63', '#5683f5', '#515352']
      case 'dark':
        this.xAxisTextColor = '#bbb'
        this.textColor = '#eee'
    }
  }

  getEchartsOption() {
    let data = this.chartData,
      type = this.chartType || 'bar',
      custom = this.custom || {}
    this.nodata = false
    // const data = this.chartData,
    //   type = this.chartType,
    //   custom = this.custom || {}
    if (!data || !data.length) {
      this.nodata = true
      return
    } else {
      this.nodata = false
    }
    let color = custom.color || this.colorList
    /* 提示框 */
    let options: any = {
      color,
      tooltip: {
        trigger: ['pie', 'words'].includes(type) ? 'item' : 'axis',
        axisPointer: {
          type: 'shadow',
        },
        backgroundColor: 'rgba(0,0,0,.5)',
        borderWidth: 0,
        textStyle: {
          color: '#fff',
        },
        confine: true,
      },
    }
    //是否自定义提示框
    if (custom.tooltipFormatter) {
      options.tooltip.formatter = custom.tooltipFormatter
    }
    //是否显示图例
    if (custom.showLegend) {
      options.legend = this.getLegend()
    }
    // 坐标系图
    if (['bar', 'line'].includes(type)) {
      // 网格区域
      options.grid = {
        show: custom.gridShow || false,
        left: custom.gridLeft || 10,
        right: custom.gridRight || 10,
        top: custom.gridTop || 10,
        bottom: custom.gridBottom || 16,
        containLabel: true,
      }
      // 坐标轴
      let { xAxis, valueAxis } = this.getAxis()
      if (custom.vertical) {
        //纵向图
        options.xAxis = valueAxis
        //纵坐标
        options.yAxis = xAxis
      } else {
        //横向图
        options.xAxis = xAxis
        //纵坐标
        options.yAxis = valueAxis
      }
    }
    switch (type) {
      case 'bar':
        options.series = this.getBarSeries()
        break
      case 'line':
        options.series = this.getLineSeries()
        break
      case 'pie':
        options.series = this.getPieSeries()
        break
      case 'words':
        options.series = this.getWordCloud()
        break
    }
    this.chartOptions = options
    return options
  }

  changeData(newData : any) {
    if(this.chartOptions.series) {
      this.chartOptions.series[0].data = newData
    } else {
      this.initChart()
    }
  }

  //获取坐标轴
  getAxis() {
    let custom = this.custom || {}
    let xAxisData = this.chartData
      .filter((val: ChartData) => {
        return val.name
      })
      .map((val: ChartData) => {
        return val.name
      })
    // 坐标轴文字颜色
    let xAxisColor = custom.xAxisColor || this.xAxisTextColor
    let axisStyle = {
      minInterval: 1,
      nameGap: 6,
      min: 0,
      nameTextStyle: {
        color: xAxisColor,
      },
      axisLine: {
        show: this.getCustomShow(custom.showAxisLine),
        lineStyle: {
          color: custom.axisLineColor || '#ddd',
        },
      },
      axisTick: {
        show: this.getCustomShow(custom.showAxisLine),
      },
    }
    let axisLabel = {
      //坐标标签
      textStyle: {
        fontSize: 12,
        color: xAxisColor,
      },
      formatter: (params: any) => {
        let str = params
        // 截取字符串
        if (typeof params === 'string') {
          if (str.length > 14) {
            str = str.substring(0, 14) + '...'
          }
        }
        return str
      },
      // interval: 0
      // rotate: 30
    }
    let xAxis = Object.assign({}, axisStyle, {
      type: 'category',
      data: xAxisData,
      name: custom.xAxisName || '',
      axisLabel: {
        ...axisLabel,
        // 是否显示类目坐标轴
        show: this.getCustomShow(custom.showCategoryAxisLabel),
        // 坐标文本颜色
        textStyle: {
          color: custom.categoryTextColor || xAxisColor,
          fontSize: 12,
        },
      },
    })

    let valueAxis = Object.assign({}, axisStyle, {
      name: custom.yAxisName || '',
      type: 'value',
      splitLine: {
        show: custom.showValueSplitLine || false,
        lineStyle: {
          color: 'rgba(239,239,239,.2)',
        },
      },
      //数值坐标轴位置
      position: custom.valueAxisPosition || '',
      axisLabel: {
        ...axisLabel,
        // 是否显示数值坐标轴
        show: this.getCustomShow(custom.showValueAxisLabel),
      },
    })
    return { xAxis, valueAxis }
  }
  getCustomShow(customVal: boolean) {
    return typeof customVal !== 'undefined' ? customVal : true
  }
  // 获取图例
  getLegend() {
    let legend = {
      orient: 'vertical',
      right: '0',
      bottom: '0',
      show: true,
      icon: 'circle',
      formatter(v: string) {
        return v.length < 10 ? v : `${v.slice(0, 10)}...`
      },
    }
    return legend
  }
  // 柱状图
  getBarSeries() {
    let custom = this.custom
    let barItem : any = {
      name: custom.name || '',
      type: 'bar',
      barMinHeight: 1,
      barMaxWidth: custom.barMaxWidth || 20, //柱子最大宽度
      itemStyle: {
        borderRadius: custom.borderRadius || 0,
      },
    }
    if (custom.barColor) {
      barItem.itemStyle.color = custom.barColor
    }
    let barSeries = []
    barItem.data = this.chartData
    barSeries = [barItem]
    return barSeries
  }
  // 折线图
  getLineSeries() {
    let custom = this.custom
    let lineItem : any = {
      // line
      name: custom.name || '',
      type: 'line',
      symbolSize: 8,
      smooth: true,
      symbol: custom.lineSymbol || 'emptyCircle',
      showAllSymbol: true,
    }
    // if (this.custom && this.custom.areaStyle) {
    //   lineItem.areaStyle = {
    //     color: new echarts.graphic.LinearGradient(
    //       0,
    //       0,
    //       0,
    //       1,
    //       this.custom.areaStyle
    //     ),
    //   }
    // }

    let lineSeries = []
    lineItem.data = this.chartData
    lineSeries = [lineItem]
    return lineSeries
  }
  // 饼图
  getPieSeries() {
    let custom = this.custom,
      color: Array<string> = custom.color || this.colorList
    let pieSeries = []
    let singlePie = {
      //单独的饼图
      name: custom.name || '',
      type: 'pie',
      center: ['30%', '50%'], // 位置
      radius: [0, '70%'], // 半径
      selectedMode: true,
      hoverAnimation: true,
      data: this.chartData,
      avoidLabelOverlap: true,
      label: {
        normal: {
          textStyle: {
            color: this.textColor,
            fontSize: 14,
          },
          // formatter: '{b}'
          formatter(v: any) {
            let text = v.name || ''
            return text.length < 6 ? text : `${text.slice(0, 6)}...`
          },
        },
      },
      // itemStyle: {
      //   normal: {
      //     color:  (params: any) => {
      //       //饼图颜色
      //       let index : number = params.dataIndex
      //       let re: number = index / color?.length
      //       if (index >= re * color.length) {
      //         //循环颜色
      //         index -= re * color.length
      //       }
      //       return color[index]
      //     },
      //   },
      // },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay() {
        return Math.random() * 100
      },
    }
    //显示圆环
    if (custom.showRingPie || custom.showCenterPie) {
      singlePie.radius = ['35%', '55%']
    }
    pieSeries.push(singlePie)
    return pieSeries
  }
  //获取云图
  getWordCloud() {
    let data = this.chartData
    let custom = this.custom
    let wordCloudSeries = [
      {
        data,
        type: 'wordCloud',
        shape: 'pentagon',
        width: '100%',
        height: '95%',
        rotationStep: custom.rotationStep || 45,
        gridSize: data.length < 40 ? 30 : 15,
        sizeRange: [12, 30],
        rotationRange: [0, 0],
        textPadding: 6,
        drawOutOfBound: custom.drawOutOfBound || false,
        autoSize: {
          enable: true,
          minSize: 1,
        },
        layoutAnimation: true,
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color:
            custom.keywordColors ||
            function () {
              // Random color
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(',') +
                ')'
              )
            },
        },
        emphasis: {
          shadowBlur: 10,
          shadowColor: this.xAxisTextColor,
        },
      },
    ]
    return wordCloudSeries
  }
  //获取滚动条
  getDataZoom(len: number) {
    let custom = this.custom
    let color: Array<string> = custom.color || this.colorList
    let num = custom.dataZoomNum || 10
    let dataZoom: any = {
      type: 'slider',
      show: len > num, //是否展示
      height: custom.dataZoomHeight || 10,
      bottom: 6,
      startValue: 0,
      showDetail: false,
      endValue: num - 1 || 9,
      //backgroundColor : 'rgba(33,152,189,0)',
      fillerColor: custom.zoombarColor || color[0],
      borderColor: custom.zoomBorderColor || color[0],
      textStyle: {
        color: '#fff',
      },
      handleIcon:
        'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',
      handleSize: custom.dataZoomHeight * 1.5 || 10,
      handleStyle: {
        color: '#e7bbbb',
        shadowBlur: 1,
        // shadowColor : 'rgba(0, 0, 0, 0.6)',
        shadowColor: '#e7bbbb',
        shadowOffsetX: 1,
        shadowOffsetY: 1,
      },
    }
    if (custom.vertical) {
      //纵向图
      dataZoom.height = 150
      dataZoom.width = 6
      dataZoom.yAxisIndex = 0
      dataZoom.bottom = 20
    }
    return dataZoom
  }
}

export default ChartDrawer