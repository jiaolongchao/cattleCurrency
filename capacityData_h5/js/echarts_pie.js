var myChart = echarts.init(document.getElementById('charts_marketSentiment'));
var img = []
img[0] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlhJREFUeNqUlEtoU1EQhr+ksY3Sh632IbEFtfUBVkEXPqgUCxVEEHQjCELBVcCFK5eigrgQC+IioDtdFdEqiBSEihSsoCAaC/XZ0lgxpimmtTQkqceZe3OTm2g0/jCce8+Z853XzHiMMRTrwl16pAmK9Vb7qavxw7c5WPrJhPQNiIXOHmWqeJ7HDRNIl0LWNnB8dwdsaIKqZXnn7wsw9hmevofFFJcFeOaPMAGd8FVw8/AO2NrKX5XKwIOX8CZCSH5PCzRlDSjs/B2z8+I9YyJx818aemWMzL2mDDVfdrHgwe0gx8tpKg7j0zARg5l5WF0D6xphcwDaVtk+BzohNscpOVVYdnfdI+SuQD0jJ/fnQWG52pG3NqRYCt23CTrb7P+vCbgxrCfE59Vd7Wov3FEpkEr7dVz9VC110GqfaI/Cetc35Z31aKVAbqD6OeposZpD3kofjSuq8gN6R+XI7VdfbTXt3uWVv69ajtx+WUaD90fSuryCCy5Hbr+FpP0WXkmRcMy1ij5/OXL7RWatZlQf4NZrV5ZpHP1rdzqufirZDONfrM9BhYVefIL5RXtQA1LjqBTQiTMncLNzr0rQTlc8HjiXGh4jE03Qs00C0eOBZomd5pXglyRPL0EyDU21EqiSs3sFtHGNDdJKMvjc2l1f9xbiOHmlOXb7mTHpTHl5GU0Y0//Qys2gw8jBssAroUfGTMZKQ3Sx0XfGXLpfCFLzFBdHSdpjmmJyrG695Fp/fmxyBj5GrVrWny2QHwrqmdBLPZrUBI6IBVx9T8SGxGadDgHm9EuAAQDQJ3ecojyL6AAAAABJRU5ErkJggg=='
img[1] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjZJREFUeNqUVE9IFGEU/+2wlRqlLK6UhYEoKFgHTUHYTUgNpJOHEIL15MEFD5661CXoFhUiKHjcQSsIig4VggfdQ9QhxVXB/mz+wf+4loRrrOzrvW8cZ8ZlcPrB+5j53pvfvO977/d8RIQc6OGbvEbZWpEfKERBENhJAtnMT957yTaISHzp+Gc+B5keDimSYM1dVHcApfXAqbOW/88asDAGzD0H/u4+ZsJ7DjYhUxYLRWi4mSg5Sicis0cUf0j8zQDbaZPDJKpTRJsJ+i987hPCfpPMf5hgFA294ONZKW9OA0vjwPoX4PciUHgFuFALlDUBJdeMmOs97Fvo4etJ8JGHfMwcQnF1HG1DFlFyFJiJGSTHIaQ1nUD5LeM99Q1418VHzPo1lVXVHWdGbkQC2Re/xAkCleaJGjVV/ov1VrAczY3ITihxJi41ynpbgz8/iLwiyyF35AX2uHOXZa3QcOZ87l+9wB5ncAQ0pFNyec4L9gJ7XHpb5aqxRBJcXssh5fcCe9zWrKwfpQA6kh8sh/TRSdmJX+IE2QywPCFPrzUl2vk3wN6W4ZSGlD5yIzT7zGzcr+rbPm7aFUPoevg+p/0ILc9Y+pp3BfziSfK+GzhIVzHZvF3o/TT+gOhg35sud34QvWoXbUadQrcIn9DbTqL1SXcS+dnsC6KRVgeRmC9nOOrhDiWxovImlN2AGowmNqaA1U8yy54eDsjvzuEYC7nV7Cpbu4jFticaktKnjnYi8aPHfwIMALSipugE4cwrAAAAAElFTkSuQmCC'
img[2] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlZJREFUeNqUlF9IFFEUxr8ZJXMV2wRR1kzCwkAjMnyIFqKFQIygP1C4FOnjsvsggr74EkQvRZG4JUSQEgjSQ0EFPthDrCC49SBLhlpJ5ooRioSVLaunc+44zkzL1PjBuczMOfc3995zztWICDmKhUM8RthOocS/C/7dQPoLsJ6d5W9DbH2ID879PU1zwGLhoILsOxBGqBk4eAgo9Fn+pW/A2zFg5AXwc/UWA7scNIEpi7ZcofarRMlR+q/WfhE9ihPPuc+2w2SYoKMK9GmatqUnAwLsNWH5mwuM4GIreHvWkj9OARNJYOodsJgGKiqB2jrgcCNQU2vEnL8svhgfT4q3/EBjchDVNQl0XrdAyVFg+BnwdSE3OeUBoOks0Bg03uc/Aze7gY2NfF2t6mSTc0VuIJF8F7/EifZUmzs6pqv0S9ZMydbcQHagxJmqOyLjaR0FO8tQXGI55Iy8yB5XVi7jfh2+YmeQHLYX2eOKFKNUx/cVOTzLIVnzInucMBivc4ukHH+R9HuRPW52RsYxScBjjCcsh9SRpP9fEr/EidaznIw38vRUV02bGAFWlg2nFKTUkRvQrDOzcI25PVy06bxr46kMng9lufhCqhA1Dajca9SPrwjIZLipfwCBKi7U41xIZ4D6BgO0wDdJ/z1ZXSuaLyzZG72XHt4lyvz21pfpOaLuqPRmxNnoFvA23egimp50h8jPXr0k6mhzgMS0nMsxFr6kWixQdUIdsr/U8s28ByYn5C67s3lBfnBejtEWt5xJj51jsxfea7ZhtuWtL/HBrcc/AgwAUtWlDYjJXrMAAAAASUVORK5CYII='
var data = [10,20,70]
var dataInfo = [
    {
        value:data[0],
        name:'利空',
        itemStyle : {
            normal : {
                color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [{
                        offset: 0, color: '#5f95fb' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#7ca9fe' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            }
        }
    },
    {
        value:data[1],
        name:'中性',
        itemStyle : {
            normal : {
                color: {
                    type: 'radial',
                    x: 0.1,
                    y: 0.5,
                    r: 2,
                    colorStops: [{
                        offset: 0, color: '#e48900' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#ffd19e' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            }
        }
    },
    {
        value:data[2],
        name:'利好',
        itemStyle : {
            normal : {
                color: {
                    type: 'radial',
                    x: 1,
                    y: 0.5,
                    r: 3,
                    colorStops: [{
                        offset: 0, color: '#ff4332' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#ff9a8e' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            }
        }
    }
];

var dataInfoIcon = dataInfo.map(function(v, i) {
    return {
        value: v.value,
        name: v.name,
        label: {
            normal: {
                backgroundColor: {
                    image: img[i]
                }
            }
        }
    }

})
option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        show:false
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直达','营销广告','搜索引擎']
    },
    calculable:true,
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['35%', '50%'],
            center:['45%','35%'],
            itemStyle:{
                normal:{
                    borderColor: '#fff',
                    borderWidth: 5,
                    label: {
                        show: true,
                        position: 'outer'
                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    labelLine: { //折线长度
                        show: true,
                        length: 5,
                        length2: 15,
                        lineStyle: {
                            width: 0,
                            type: 'solid',
                        }
                    }
                }
            },
            label: {
                normal: {
                    formatter: ' ',
                    padding: [0, 0],
                    width: 15,
                    height: 15,
                    rich: {}
                }
            },
            data:dataInfoIcon
        },
        {
            name:'访问来源',
            type:'pie',
            radius: ['35%', '50%'],
            center:['45%','35%'],
            itemStyle:{
                normal:{
                    borderColor: '#fff',
                    borderWidth: 5,
                    label: {
                        show: true,
                        position: 'outer'
                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    labelLine: { //折线长度
                        show: true,
                        length: 5,
                        length2: 15,
                        lineStyle: {
                            width: 1,
                            type: 'solid',
                        }
                    }
                }
            },
            label: {
                normal: {
                    formatter: '{b|{b}} {per|{d}%}',
                    padding: [0, 16],
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        abg: {
                            backgroundColor: '#333',
                            width: '100%',
                            align: 'right',
                            height: 22,
                            borderRadius: [4, 4, 0, 0]
                        },
                        hr: {
                            borderColor: 'yellow',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 14,
                            lineHeight: 33,
                            color: '#999'
                        },
                        per: {
                            color: '#3c3c3c',
                            fontSize: 14,
                        }
                    }
                }
            },
            data :dataInfo
        }
    ]
};
myChart.setOption(option);