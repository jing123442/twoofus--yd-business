<template>
  <div class='mainPage'>
    <!-- 顶部轮播的消息 -->
    <CarouselWords :infolist='noticeListInfo'></CarouselWords>
    <i class='iconfont myicon-gonggao smlIcon'> </i>
    <!-- 客户信息 -->
    <!-- <div class=' info'>
      <h3 class='text-left'>客户信息</h3>
        <ul>
          <li v-for='(item,index) in customInfo' :key='index' class='model-con'><i class='el-icon-time' style='color:#ffb22b'></i>{{index+':'+item}}</li>
        </ul>
    </div> -->
    <userInfo :customInfo='customInfo'></userInfo>
    <!-- 三个数据展示模块 -->
    <DataBlock :values='dataBlock'></DataBlock>
    <!-- 表格 -->
    <div class='model-con'>
      <h3 class='text-left'>开通产品</h3>
      <elTable :randerData='productList' :headTitle='tableTitle'></elTable>
      <el-pagination
        class='elPagination'
        @current-change='handleCurrentChange'
        :current-page='currentPage'
        :page-size='10'
        :total='totalPage'
        layout='sizes, prev, pager, next, jumper'
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import overViewApi from '@/api/dataCenter'
export default {
  components: {
    CarouselWords: () => import('./overViewsTool/SwiperWords.vue'),
    DataBlock: () => import('./overViewsTool/DataBlock.vue'),
    elTable: () => import('@/components/table/elTable.vue'),
    userInfo: () => import('./overViewsTool/UserInfo.vue')
  },
  data () {
    return {
      dataBlock: [
        // 3数据模块数据
        {
          item: '调用总次数',
          val: '0',
          tip: '汇总数据',
          class: 'greenStyle',
          icon: 'el-icon-tickets'
        },
        {
          item: '调用总金额',
          val: '￥0',
          tip: '汇总数据',
          class: 'greenStyle',
          icon: 'el-icon-tickets'
        },
        {
          item: '账户余额',
          val: '￥0',
          tip: '请联系翼盾销售负责人进行充值',
          class: 'greenStyle',
          icon: 'el-icon-tickets'
        }
      ],
      noticeListInfo: [], // 轮播信息
      currentPage: 1,
      totalPage: 10,
      tableTitle: [
        { prop: 'channelName', label: '产品名称' },
        { prop: 'typeCode', label: '产品类型名称' },
        { prop: 'feeTypeName', label: '计费模式' },
        { prop: 'tagType', label: '启用状态' },
        { prop: 'startDate', label: '起始日期' },
        { prop: 'endDate', label: '截止日期' }
      ],
      productList: [],
      customInfo: []
    }
  },
  methods: {
    getNotice () {
      overViewApi['NOTICELIST']({}).then(res => {
        const result = res.data.datas
        if (typeof result === 'object') {
          this.noticeListInfo = result.map(item => {
            return item.noticeContent
          })
        }
      })
    },
    getSummary () {
      overViewApi['SUMMATRYINFO']({})
        .then(res => {
          const result = res.data.datas
          this.customInfo = [
            {key: '公司名称 ', value: result.businessDO.businessName, icon: 'myicon-homepage_fill', iconColor: '#1976d2'},
            {key: '联系人 ', value: result.businessDO.contactMan, icon: 'myicon-shumashouji', iconColor: '#26dad2'},
            {key: '联系手机 ', value: result.businessDO.contactManMobile, icon: 'myicon-businesscard_fill', iconColor: '#7460ee'},
            {key: '联系邮箱 ', value: result.businessDO.contactManMail, icon: 'myicon-mail_fill', iconColor: '#ffb22b'}
          ]
          this.dataBlock[0].val = result.recordCnt
          this.dataBlock[1].val = '￥' + result.recordAmount
          this.dataBlock[2].val = '￥' + result.totalBalance
        })
        .catch(error => {
          console.log(error)
        })
    },
    getActiveProduct (pageSize, pageNum) {
      // 包年 15 包月14
      overViewApi['ACTIVATEPRODUCT']({
        pageSize: pageSize,
        pageNum: pageNum
      })
        .then(res => {
          const result = res.data.datas
          this.totalPage = result.lastPage * 10
          result.list.forEach(item => {
            item.tagType = item.isEnableString
            if (item.feeTypeId === '14' || item.feeTypeId === '15') {
              item.startDate = moment(new Date(item.startDate) * 1).format(
                'YYYY-MM-DD'
              )
              item.endDate = moment(new Date(item.endDate) * 1).format(
                'YYYY-MM-DD'
              )
            } else {
              item.startDate = '-'
              item.endDate = '-'
            }
            if (item.status === '0') {
              item.tagColor = 'blue'
            } else if (item.status === '1') {
              item.tagColor = 'green'
            }
          })
          this.productList = result.list
          console.log(this.productList)
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleCurrentChange (val) {
      this.getActiveProduct('10', val)
    }
  },
  created () {
    this.getNotice()
    this.getSummary()
    this.getActiveProduct('10', '1')
  }
}
</script>

<style scoped lang='scss'>
.smlIcon{
  position:absolute;
  top:6px;
  left:30px;
  font-size:15px;
  line-height:30px;
  height:40px;
  z-index:100;
}
.el-button {
  width: 185px;
  height: 34px;
  line-height: 34px;
  padding: 0;
  font-size: 14px;
  margin: 20px 0;
}
.tableStyle {
  padding: 20px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
