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
    <div style="padding:30px;" class="model-con">
      <el-form :model="formInline" >
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
        <el-button type="primary" plain @click="indexClick(1)" class="buttonstyle">调用总次数</el-button>
          <el-button type="primary" plain @click="indexClick(2)">调用总金额</el-button>
          <el-button type="primary" @click="searchTrend" style="float:right">搜索</el-button>
      </el-form-item>
      </el-form>
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true
          }
        ]
      },
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
      console.log(paramFilter(param))
      overViewApi['TRENDCHART'](paramFilter(param))
        .then(response => {
          const result = response.data
          if (result.code === 200) {
            this.option.xAxis.data = result.datas.labels
            this.option.series = [{data: result.datas.data}]
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
