<template>
  <div class="useDetailsPage">
    <div class="model-con">产品名称：
      <el-select v-model="productChoosed" placeholder="全部产品" @change='searchTrend'>
        <el-option
          v-for="item in productList"
          :key="item.value"
          :label="item.channelName"
          :value="item.channelId"
        ></el-option>
      </el-select>
    </div>
    <DataBlock :values="dataBlock"></DataBlock>
    <div style="padding:0;" class="model-con">
      <el-form :model="formInline" style="padding:30px 30px 0;" >
        <el-form-item label="选择日期：">
          <el-col :span="11">
            <el-date-picker
            type="date"
            placeholder="开始日期"
            v-model="formInline.startDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="结束日期"
            v-model="formInline.endDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-button-group>
        <el-button type="primary"  @click="indexClick(1)" class="buttonstyle">调用总次数</el-button>
          <el-button type="primary" @click="indexClick(2)">调用总金额</el-button>
          </el-button-group>
          <el-button type="primary" @click="searchTrend" style="float:right">搜索</el-button>
      </el-form-item>
      </el-form>
      <p style='textAlign:center;color:#1976d2'>{{option.series[0].name}}</p>
      <chart :options="option" auto-resize/>
    </div>
  </div>
</template>

<script>
import { paramFilter } from '@/filters/index'
import overViewApi from '@/api/dataCenter'
import moment from 'moment'
export default {
  components: {
    DataBlock: () => import('@/views/dataCenter/overViewsTool/DataBlock.vue')
  },
  data () {
    return {
      dataBlock: [
        // 3数据模块数
        {
          item: '调用总次数',
          val: '0',
          tip: '今日汇总数据'
        },
        {
          item: '调用总金额',
          val: '￥0',
          tip: '今日汇总数据'
        },
        {
          item: '账户余额',
          val: '￥0',
          tip: '请联系翼盾销售负责人进行充值'
        }
      ],
      option: {
        legend: {
          data: []
        },
        color: ['#26dad2'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          name: ''
        },
        yAxis: {
          type: 'value',
          name: ''
        },
        series: [
          {
            name: '',
            data: [],
            type: 'line',
            smooth: true
          }
        ]
      },
      // option: {
      //   title: {
      //     text: '某楼盘销售情况',
      //     subtext: '纯属虚构'
      //   },
      //   grid: {
      //     x: 65,
      //     y: 45,
      //     x2: 35,
      //     y2: 45,
      //     borderWidth: 1
      //   },
      //   tooltip: {
      //     trigger: 'axis'
      //   },
      //   legend: {
      //     data: ['意向', '预购', '成交']

      //   },
      //   toolbox: {
      //     show: true,
      //     feature: {
      //       mark: {show: true},
      //       dataView: {show: true, readOnly: false},
      //       magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
      //       restore: {show: true},
      //       saveAsImage: {show: true}
      //     }
      //   },
      //   color: ['#26dad2', '#1976d2', '#5c4ac7', '#ef5350', '#ffb22b', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
      //   calculable: true,
      //   xAxis: [
      //     {
      //       type: 'category',
      //       // boundaryGap: false,
      //       data: []
      //     }
      //   ],
      //   yAxis: {
      //       type: 'value'
      //     },
      //   series: [
      //     {
      //       // name: '成交',
      //       type: 'line',
      //       smooth: true,
      //       // itemStyle: {normal: {areaStyle: {type: 'default'}}},
      //       data: []
      //     }
      //   ]
      // },
      formInline: {
        // date: [moment().subtract('days', 6).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
        startDate: moment().subtract('days', 6).format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
      },
      trend: '1',
      productChoosed: '',
      productList: []
    }
  },
  computed: {
    buttonindex (val) {
      return this.trend === val
    }
  },
  methods: {
    getProdect () {
      overViewApi['PRODUCTLIST']({}).then(res => {
        this.productList = res.data.datas
        this.productList.unshift({channelId: null, channelName: '全部产品'})
      }).catch(error => {
        console.log(error)
      })
    },
    getDataRecord () {
      overViewApi['DATARECORD']({}).then(res => {
        const result = res.data.datas
        this.dataBlock[0].val = result.recordCnt
        this.dataBlock[1].val = '￥' + result.recordAmount
        this.dataBlock[2].val = '￥' + result.totalBalance
      }).catch(error => {
        console.log(error)
      })
    },
    indexClick (val) {
      this.trend = val
      val === 1 ? (this.option.series[0].name = '调用总次数') : (this.option.series[0].name = '调用总金额')
    },
    searchTrend () {
      this.getList()
    },
    getList () {
      let tempStartDate = moment(new Date(this.formInline.startDate) * 1).format('YYYY-MM-DD')
      let tempEndDate = moment(new Date(this.formInline.endDate) * 1).format('YYYY-MM-DD')
      const param = {
        channelId: this.productChoosed,
        index: this.trend,
        startDate: tempStartDate,
        endDate: tempEndDate
      }
      overViewApi['TRENDCHART'](paramFilter(param))
        .then(response => {
          const result = response.data
          if (result.code === 200) {
            if (tempStartDate === tempEndDate) {
              this.option.xAxis.name = '时'
            } else {
              this.option.xAxis.name = '日'
            }
            if (this.trend === '1') {
              this.option.yAxis.name = '次'
            } else {
              this.option.yAxis.name = '元'
            }
            this.option.xAxis.data = result.datas.labels
            this.option.series[0].data = result.datas.data
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getProdect()
    this.getDataRecord()
  }
}
</script>

<style lang='scss'>
.useDetailsPage {
  .el-alert__content {
    display: block;
    width: 100%;
  }
  .buttonstyle {
    margin-left: 20px;
  }
}
.echarts {
  width: 100% !important;
}
</style>
