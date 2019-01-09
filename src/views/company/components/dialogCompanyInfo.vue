<template>
  <el-dialog
    title="管理"
    :visible="show"
    @close="handleClose"
    width="80%">
      <el-tabs type="border-card" v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="企业详情" name="company">
          <el-form ref="form" label-position="right" label-width="100px" >
            <el-form-item class="bgitem" label="公司名称：" prop="companyTitle">
              <span>{{ form.businessName }}</span>
            </el-form-item>
            <el-form-item class="bgitem" label="公司电话：" prop="companyPhone">
              <span>{{ form.businessTelephone }}</span>
            </el-form-item>
            <el-form-item class="bgitem" label="手机号码：" prop="companyTel">
              <span>{{ form.businessMobile }}</span>
            </el-form-item>
            <el-form-item class="bgitem" label="公司地址：" prop="companyAddress">
              <span>{{ form.businessAddr }}</span>
            </el-form-item>
            <el-form-item class="bgitem" label="联系人：" prop="contactUser">
              <span>{{ form.contactMan }}</span>
            </el-form-item>
            <el-form-item class="bgitem" label="联系电话：" prop="contactPhone">
              <span>{{ form.contactManMobile }}</span>
            </el-form-item>
            <el-form-item class="bgitem" label="业务邮箱：" prop="ontactEmail">
              <span>{{ form.contactManMail }}</span>
            </el-form-item>
            <el-form-item class="bgitem" label="QQ：" prop="contactQQ">
              <span>{{ form.contactManQq }}</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="产品管理" name="product">
          <el-table
            header-row-class-name="headname"
            v-loading="loading"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              width=""
              label="产品名称"
              prop="channelName">
            </el-table-column>
            <el-table-column
              width=""
              label="产品类型"
              prop="channelTypeName">
            </el-table-column>
            <el-table-column
              width=""
              label="计费模式"
              prop="feeTypeName">
            </el-table-column>
            <el-table-column
              width=""
              label="价格"
              prop="feeTypeId">
              <template slot-scope="props">
                {{ props.row.feeTypeId | FilterTypeId(props.row) }}
              </template>
            </el-table-column>
            <el-table-column
              width=""
              label="剩余数量"
              prop="cntReaminTotal">
            </el-table-column>
            <el-table-column
              width=""
              label="起始日期"
              prop="startDate">
              <template slot-scope="props">
                {{ props.row.startDate | FilterTime }}
              </template>
            </el-table-column>
            <el-table-column
              width=""
              label="截止日期"
              prop="endDate">
              <template slot-scope="props">
                {{ props.row.endDate | FilterTime }}
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              label="操作">
              <template slot-scope="props">
                <el-switch
                inactive-value="0"
                active-value="1"
                v-model="props.row.status"
                @change="setIsOpen(props.row)"></el-switch>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next, jumper"
            :total="tableTotal">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="添加产品" name="addproduct">
          <el-form :model="formInline" ref="formInline" :rules="rules" size="mini" :inline="true" label-position="right" label-width="100px" >
            <el-row>
              <el-col :span="24">
                <el-form-item label="选择产品：" prop="parentId">
                  <el-select placeholder="请选择" v-model="formInline.parentId" @change="handleChangeOne">
                    <el-option
                      v-for="(item, index) in firstOption"
                      :key="index" :value="item.id" :label="item.typeName">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="channelTypeId">
                  <el-select placeholder="请选择" v-model="formInline.channelTypeId" @change="handleChangeSecond">
                    <el-option
                      v-for="(item, index) in secondOption"
                      :key="index" :value="item.id" :label="item.typeName">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  prop="channelId">
                  <el-select placeholder="请选择" v-model="formInline.channelId">
                    <el-option
                      v-for="(item, index) in productOption"
                      :key="index" :value="item.channelId" :label="item.channelName">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="计费模式：" prop="feeTypeId">
                  <el-select placeholder="请选择" v-model="formInline.feeTypeId" @change="handleChangeFeeType">
                    <el-option
                      v-for="(item, index) in feeTypeOption" :key="index" :label="item.feeTypeName" :value="item.feeTypeId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="价格：" prop="price" v-if="this.formInline.feeTypeId !== '包年'">
                  <el-input v-model="formInline.price" placeholder="价格"></el-input>
                </el-form-item>
                <el-form-item label="剩余数量：" prop="limit" v-if="feeTypeIs">
                  <el-input v-model="formInline.limit" placeholder="剩余数量"></el-input>
                </el-form-item>
                <el-form-item label="日期：" prop="date"  v-if="feeTypeIs">
                  <el-date-picker
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    v-model="formInline.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align:left;">
                <el-form-item label=" ">
                  <el-button type="warning" icon="el-icon-plus" round @click.native='onAdd'>增加产品</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div>
          <el-table
              header-row-class-name="headname"
              v-loading="loading"
              :data="tableDataTemp"
              style="width: 100%">
              <el-table-column
                width=""
                label="产品名称"
                prop="channelName">
                <template slot-scope="props">
                  {{props.row.channelName}}
                </template>
              </el-table-column>
              <el-table-column
                width=""
                label="产品类型"
                prop="channelTypeName">
                <template slot-scope="props">
                  {{props.row.channelTypeName}}
                </template>
              </el-table-column>
              <el-table-column
                width=""
                label="计费模式"
                prop="feeTypeName">
                <template slot-scope="props">
                  {{props.row.feeTypeId | FilterType}}
                </template>
              </el-table-column>
              <el-table-column
                width=""
                label="价格"
                prop="price">
              </el-table-column>
              <el-table-column
                width=""
                label="剩余数量"
                prop="limit">
              </el-table-column>
              <el-table-column
                width=""
                label="起始日期"
                prop="startDate">
                <template slot-scope="props">
                  {{ props.row.startDate | FilterTime }}
                </template>
              </el-table-column>
              <el-table-column
                width=""
                label="截止日期"
                prop="endDate">
                <template slot-scope="props">
                  {{ props.row.endDate | FilterTime }}
                </template>
              </el-table-column>
              <el-table-column
                width=""
                label="操作"
                prop="endDate">
                <template slot-scope="props">
                  <el-button type="text" @click.native="delData(props.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row>
              <el-col :span="24" style="padding:20px 0; text-align: center">
                <el-button type="primary" round icon="el-icon-circle-plus-outline" @click.native="confirmAdd">确认添加产品</el-button>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
  </el-dialog>
</template>
<script>
import moment from 'moment'
import companyApi from '@/api/company'
import productApi from '@/api/product'
import { Message } from 'element-ui'
export default {
  props: ['show', 'appId'],
  data () {
    return {
      dialogVisible: false,
      form: {},
      activeName: 'company',
      pagesize: 5,
      currentPage: 1,
      tableData: [],
      tableTotal: 0,
      loading: false,
      formInline: {
        parentId: '',
        channelTypeId: '',
        channelId: '',
        // date: [moment().subtract('month', 1).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        date: '',
        feeTypeId: '',
        price: '',
        limit: ''
      },
      rules: {
        parentId: [
          { required: true, message: '请选择产品', trigger: 'change' },
        ],
        channelTypeId: [
          { required: true, message: '请选择产品', trigger: 'change' }
        ],
        channelId: [
          { required: true, message: '请选择产品', trigger: 'change' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        feeTypeId: [
          { required: true, message: '请选择计费模式', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请填写价格', trigger: 'blur' }
        ],
        limit: [
          { required: true, message: '请填写数量', trigger: 'blur' }
        ]
      },
      feeTypeOption: [], // 计费选项
      firstOption: [], // 第一个Select选项
      secondOption: [], // 第二个Select选项
      productOption: [], // 第三个Select选项
      tableDataTemp: [], // 临时数据Table,
      feeTypeIs: false,
      totalId: 0
    }
  },
  methods: {
    /**
     * 公司信息
     */
    getInfo () {
      companyApi['COMPANYINFO']({
        appId: this.appId
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.form = result.datas
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 产品列表
     */
    getList () {
      productApi['PRODUCTLIST']({
        appId: this.appId,
        pageNum: this.currentPage,
        pageSize: this.pagesize
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.loading = false
          this.tableData = result.datas.list
          this.tableTotal = result.datas.total
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 启用关闭
     */
    setIsOpen (row) {
      console.log(moment(row.startDate).format('YYYY-MM-DD'))
      console.log(row.feeTypeId === '14')
      productApi['PRODUCTALLOW'](Object.assign({
        id: row.id,
        status: row.status,
        appId: this.appId,
        feeTypeId: row.feeTypeId,
        channelId: row.channelId
      }, (row.feeTypeId === '14' || row.feeTypeId === '15') ? {
        startDate: moment(row.startDate).format('YYYY-MM-DD'),
        endDate: moment(row.endDate).format('YYYY-MM-DD')
        } : {})).then(response => {
        const result = response.data
        if (result.code === 200) {
          // this.getList()
        } else {
          console.log(row.status === '0')
          Message.warning({
            message: result.message
          })
          row.status === '0' ? row.status = '1' : row.status = '0'
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 计费选项
     */
    getFee () {
      productApi['PRODUCTFEE']({
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.feeTypeOption = result.datas
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 第一个产品列表
     */
    getLevel (level) {
      productApi['PRODUCTLEVEL']({
        parentId: 0
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.firstOption = result.datas
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 第一个选项change调用接口
     */
    handleChangeOne (parentId, type) {
      productApi['PRODUCTLEVEL']({
        parentId
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.secondOption = result.datas
          this.formInline.channelTypeId = ''
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 第二个产品选项调用产品列表
     */
    handleChangeSecond (channelTypeId) {
      console.log(this.productOption)
      productApi['PRODUCTTYPE']({
        channelTypeId
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.productOption = result.datas
          this.formInline.channelId = ''
          this.formInline.limit = ''
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleChangeThird (val, type) {
    },
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    handleClose (done) {
      this.$emit('update:show', false)
    },
    /*
    * 计费模式变化
    */
    handleChangeFeeType(feeType) {
      if (feeType === '14' || feeType === '15') {
        this.feeTypeIs = true
      } else {
        this.feeTypeIs = false
        this.formInline.date = ''
      }
    },
    /**
     * Tab 选项
     */
    handleClick (tab, event) {
      if (tab.name === 'product') {
        this.getList()
      }
      if (tab.name === 'addproduct') {
        this.getLevel('optionsLevelfirst')
        this.getFee()
      }
    },
    /**
     * 确认添加产品
     */
    confirmAdd () {
      productApi['PRODUCTADD']({
        appId: this.appId,
        product: JSON.stringify(this.tableDataTemp)
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          // 添加之后的操作 还原初始数据 例如 清除临时数据等
          this.totalId = 0
          this.tableDataTemp = []
          this.$refs['formInline'].resetFields()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 删除数据
     */
    delData (index) {
      console.log(index, this.tableDataTemp)
      this.tableDataTemp.splice(this.tableDataTemp.findIndex(item => item.id === index), 1)
    },
    /**
     * 增加产品
     */
    onAdd () {
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          let tempObj = {
            id: this.totalId++,
            channelId: this.formInline.channelId,
            channelName: this.filterChannel(this.formInline.channelId),
            channelTypeId: this.formInline.channelTypeId,
            channelTypeName: this.filterChannelType(this.formInline.channelTypeId),
            price: this.formInline.price,
            feeTypeId: this.formInline.feeTypeId,
            limit: this.formInline.limit,
            startDate: this.formInline ? this.formInline.date[0] : '',
            endDate: this.formInline ? this.formInline.date[1] : ''
          }
          this.tableDataTemp.push(tempObj)
        } else {
          return false;
        }
      })
    },
    /**
     *
     */
    filterChannel (val) {
      let channelName = ''
      this.productOption.forEach(item => {
        if (item.channelId === val) {
          channelName = item.channelName
        }
      })
      return channelName
    },
    filterChannelType (val) {
      let channelName = ''
      this.secondOption.forEach(item => {
        if (item.id === val) {
          channelName = item.typeName
        }
      })
      return channelName
    }
  },
  filters: {
    FilterType (val) {
      let tempType = ''
      switch (val) {
        case '11':
          tempType = '查询'
          break;
        case '12':
          tempType = '查的'
          break;
        case '13':
          tempType = '免费'
          break;
        case '16':
          tempType = '命中'
          break;
        case '14':
          tempType = '包月'
          break;
        case '15':
          tempType = '包年'
          break;
        default:
          break;
      }
      return tempType
    },
    FilterTypeId (val, row) {
      let tempPrice = ''
      switch (val) {
        case '11':
          tempPrice = row.singleQueryPrice
          break;
        case '12':
          tempPrice = row.singleQueryokPrice
          break;
        case '16':
          tempPrice = row.singleHitPrice
          break;
        case '14':
          tempPrice = row.monthPrice
          break;
        case '15':
          tempPrice = row.yearPrice
          break;
        default:
          break;
      }
      return tempPrice
    }
  },
  created () {
    this.$nextTick(() => {
      this.getInfo()
      this.dialogVisible = this.show
    })
  }
}
</script>
