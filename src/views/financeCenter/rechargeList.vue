<template>
  <div class="model-con">
    <el-form ref="rechargeList" :model="rechargeList" label-width="120px" class="flex inline-form">
      <el-form-item label="充值类型：">
        <el-select v-model="rechargeList.rechargeType" placeholder="请选择充值类型">
          <el-option label="线上充值" value="01"></el-option>
          <el-option label="线下充值" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间：">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="rechargeList.startDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="rechargeList.endDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
       <el-form-item label="订单状态：">
        <el-select v-model="rechargeList.rechargeStatus" placeholder="请选择订单状态">
          <el-option label="全部" value=''></el-option>
          <el-option label="待支付" value="01"></el-option>
          <el-option label="成功支付" value="02"></el-option>
          <el-option label="支付取消" value="03"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号：">
        <el-input v-model="rechargeList.orderId"></el-input>
      </el-form-item>
    </el-form>
    <div class="text-right">
      <el-button type="primary" round size="small" @click="getRechargeList"><i class='el-icon-search' ></i>搜索</el-button>
      <el-button type="success" round size="small" @click="exportRechargeList"><i class='el-icon-download'></i>导出</el-button>
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
import { exportExcel } from '@/utils/common'
import financeApi from '@/api/financeCenter'
import elTable from '@/components/table/elTable'
import { paramFilter } from '@/filters/index'
export default {
  data () {
    return {
      rechargeList: {
        rechargeType: '02',
        startDate: moment().subtract('days', 6).format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        rechargeStatus: '',
        orderId: ''
      },
      tableTitle: [
        { prop: 'startTime', label: '交易时间' },
        { prop: 'completeTime', label: '完成时间' },
        { prop: 'orderId', label: '订单号' },
        { prop: 'statusString', label: '充值类型' },
        { prop: 'tagType', label: '订单状态' },
        { prop: 'rechargeMoney', label: '充值金额' }
      ],
      tableRanderData: [],
      currentPage: 1,
      totalPage: 5,
      rechargeStatus: ''
    }
  },
  methods: {
    getParam () {
      let tempStartDate = moment(new Date(this.rechargeList.startDate) * 1).format('YYYY-MM-DD')
      let tempEndDate = moment(new Date(this.rechargeList.endDate) * 1).format('YYYY-MM-DD')
      if (this.rechargeList.rechargeStatus !== '') {
        this.rechargeStatus =
          this.rechargeList.rechargeType + this.rechargeList.rechargeStatus
      }
      let temp = {
        pageNum: this.currentPage,
        pageSize: 10,
        rechargeType: this.rechargeList.rechargeType,
        rechargeStatus: this.rechargeStatus,
        orderId: this.rechargeList.orderId,
        startDate: tempStartDate,
        endDate: tempEndDate
      }
      return paramFilter(temp)
    },
    getRechargeList () {
      financeApi['RECHARGELIST'](this.getParam())
        .then(res => {
          this.totalPage = res.data.datas.lastPage * 10
          this.tableRanderData = res.data.datas.list
          this.tableRanderData.map(item => {
            let tempType = (item.rechargeStatus + '').substring(2, 4)
            item.tagType = item.statusString
            if (tempType === '01') {
              item.tagColor = 'blue'
            } else if (tempType === '02') {
              item.tagColor = 'green'
            } else if (tempType === '03') {
              item.tagColor = 'red'
            }
            if (typeof item.startTime === 'number') {
              item.startTime = moment(new Date(item.startTime) * 1).format('YYYY-MM-DD')
            } else {
              item.startTime = '-'
            }
            if (typeof item.completeTime === 'number') {
              item.completeTime = moment(new Date(item.completeTime) * 1).format('YYYY-MM-DD')
            } else {
              item.completeTime = '-'
            }
            item.rechargeMoney = '￥' + item.rechargeMoney
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    exportRechargeList () {
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
      this.getRechargeList('10', val)
    }
  },
  components: {
    elTable
  }
}
</script>

<style scoped>
</style>
