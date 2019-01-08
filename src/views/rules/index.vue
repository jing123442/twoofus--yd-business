<template>
<div>
  <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      width="80"
      label="规则序号"
      prop="ruleId">
    </el-table-column>
    <el-table-column
      width="250"
      label="公式代号"
      prop="formularId">
    </el-table-column>
    <el-table-column
      label="公式名称"
      prop="formularName">
    </el-table-column>
    <el-table-column
      label="拉黑时效(天)"
      width="120"
      prop="failureTime">
      <template slot-scope="props">
        <span v-if="props.row.failureTime === -1">永久</span>
        <span v-else>{{props.row.failureTime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      width="120"
      label="操作">
      <template slot-scope="props">
        <el-switch
        inactive-value="0"
        active-value="1"
        v-model="props.row.status"
        @change="setIsOpen(props.row.status, props.row.id)"></el-switch>
      </template>
    </el-table-column>
  </el-table>
  <el-row>
    <el-col :span="24" style="margin: 20px 0">
      <el-pagination
        v-if="totalNum > 0"
        :page-size="PAGESIZE"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :total="totalNum">
      </el-pagination>
    </el-col>
  </el-row>
</div>
</template>
<script>
import rulesApi from '@/api/rules'
import { Message } from 'element-ui'
import { removeToken, getToken } from '@/utils/token'
const tokenKey = getToken()
export default {
  data () {
    return {
      loading: false,
      PAGESIZE: 10,
      tableData: [],
      totalNum: 0,
      pageNum: 1
    }
  },
  methods: {
    setIsOpen (status, id) {
      rulesApi['RULESSTATUS']({
        id,
        status,
        tokenKey
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
        } else {
          Message.warning({
            message: result.message
          })
          if (result.code === 1200) {
            // token 失效处理
            removeToken(tokenKey)
            this.$router.push({ path: '/login' })
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleCurrentChange (currentPage) {
      this.pageNum = currentPage
      this.getRuleList()
    },
    getRuleList () {
      this.loading = true
      rulesApi['RULESLIST']({
        tokenKey,
        pageSize: this.PAGESIZE,
        pageNum: this.pageNum
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.loading = false
          this.totalNum = result.datas.rsCount
          this.tableData = result.datas.datalist
        } else {
          Message.warning({
            message: result.message
          })
          if (result.code === 1200) {
            // token 失效处理
            removeToken(tokenKey)
            this.$router.push({ path: '/login' })
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getRuleList()
  }
}
</script>
<style lang="scss" scoped>
  .table-expand {
    font-size: 0;
    label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
</style>
