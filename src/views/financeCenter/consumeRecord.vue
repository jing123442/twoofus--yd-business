<template>
  <div class="model-con">
    <el-form ref="consumeList" :model="consumeList" label-width="120px" class="flex inline-form">
      <el-form-item label="产品名称：">
        <el-select v-model="consumeList.channelId" placeholder="请选择充值类型">
          <el-option  v-for="item in productList" :key="item.value" :label="item.channelName" :value="item.channelId" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间：">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="consumeList.startDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">到</el-col>
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="consumeList.endDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="consumeList.custName"></el-input>
      </el-form-item>
    </el-form>
    <div class="text-right">
      <el-button type="primary" round size="small" @click="getConsumeList"><i class='el-icon-search' ></i>搜索</el-button>
      <el-button type="success" round size="small" @click='exportConsumeList'><i class='el-icon-download'></i>导出</el-button>
    </div>
    <elTable :headTitle="tableTitle" :randerData="tableRanderData"></elTable>
    <el-pagination
        class="elPagination"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        :total="totalPage"
        layout="sizes, prev, pager, next, jumper"
      ></el-pagination>
  </div>
</template>

<script>
import moment from 'moment'
import overViewApi from '@/api/dataCenter'
import {exportExcel} from '@/utils/common'
import financeApi from '@/api/financeCenter'
import elTable from '@/components/table/elTable'
import { paramFilter } from '@/filters/index'
export default {
  data () {
    return {
      consumeList: {
        custName: '',
        channelId: '',
        startDate: moment().subtract('days', 6).format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
      },
      tableTitle: [
        { prop: 'channelName', label: '产品名称' },
        { prop: 'serviceTypeName', label: '产品类型' },
        { prop: 'custname', label: '姓名' },
        { prop: 'custphone', label: '手机号' },
        { prop: 'custIdcard', label: '身份证' },
        { prop: 'feeTypeName', label: '计费模式' },
        { prop: 'saleAmt', label: '本次扣费' },
        { prop: 'requestTime', label: '时间' }
      ],
      tableRanderData: [],
      currentPage: 1,
      totalPage: 5,
      productList: []
    }
  },
  methods: {
    getProduct () {
      overViewApi['PRODUCTLIST']({}).then(res => {
        this.productList = res.data.datas
        this.productList.unshift({channelId: null, channelName: '全部产品'})
      }).catch(error => {
        console.log(error)
      })
    },
    getParam () {
      let tempStartDate = moment(new Date(this.consumeList.startDate) * 1).format('YYYY-MM-DD ')
      let tempEndDate = moment(new Date(this.consumeList.endDate) * 1).format('YYYY-MM-DD')
      return {
        pageNum: this.currentPage,
        pageSize: 10,
        custName: this.consumeList.custName,
        channelId: this.consumeList.channelId,
        startDate: tempStartDate,
        endDate: tempEndDate
      }
    },
    getConsumeList () {
      financeApi['CONSUMELIST'](paramFilter(this.getParam())).then(res => {
        this.totalPage = res.data.datas.lastPage * 10
        this.tableRanderData = res.data.datas.list
        this.tableRanderData.map(item => {
          item.requestTime = moment(new Date(item.requestTime) * 1).format('YYYY-MM-DD hh:mm:ss')
          if (item.feeTypeId === '13' || item.feeTypeId === '14' || item.feeTypeId === '15') {
            item.saleAmt = '-'
          }
        }
        )
      }).catch(error => {
        console.log(error)
      })
    },
    exportConsumeList () {
      if (this.tableRanderData.length === 0) {
        this.$message({
          message: '没有要导出的数据',
          type: 'warning'
        })
        return false
      }
      financeApi['EXPORTRECHARGELIST'](this.getParam()).then(res => {
        let result = res.data
        exportExcel(result)
      }).catch(error => {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      console.log(val)
      this.currentPage = val
      this.getConsumeList()
    }
  },
  created () {
    this.getProduct()
  },
  components: {
    elTable
  }
}
</script>

<style scoped>
</style>
