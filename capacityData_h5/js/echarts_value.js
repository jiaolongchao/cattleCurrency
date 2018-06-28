var themeChangesContainer = document.getElementById('charts_themeChanges');
var myChart = echarts.init(themeChangesContainer);
option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        show:false
    },
    grid: {
        left: '0',
        right: '0',
        bottom: '10%',
        containLabel: true //grid 区域是否包含坐标轴的刻度标签
    },
    xAxis : [
        {
            type : 'category',
            show:true,
            data : ['云南国企', '三七', '中医药', '消费', '消费', '大健康'],
            axisTick: {
                alignWithLabel: true,
                show :false,
            },
            splitLine :{
                show:false //不显示grad区域的分隔线
            },
            axisLine : { //不显示坐标轴轴线
                show:false
            }

        }
    ],
    yAxis : [
        {
            type : 'value',
            splitNumber:5,
            offset:0, //偏移
            axisLabel:{
                formatter: function (value, index) {
                    return value + '%';
                },
                color : '#3C3C3C',
                fontSize:12
            },
            axisLine : { //不显示坐标轴轴线
                show:true,
                lineStyle:{
                    color:'#BBBBBB'
                }
            },
            axisTick:{
                show :true,
                inside:true, //刻度朝里
                length:4,
                lineStyle:{
                    color:'#BBBBBB',
                    width:1
                }
            },
            splitLine :{
                show:false //不显示grad区域的分隔线
            },

        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '30%',
            data:[0.5, 0.4, 0.4, 0.65, 0.8, 0.7]
        }
    ]
};
myChart.setOption(option);
