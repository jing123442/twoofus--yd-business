<template>
  <el-main class="mainPage">
    <!-- 顶部轮播的消息 -->
    <CarouselWords :infolist="noticeListInfo"></CarouselWords>
    <!-- 客户信息 -->
    <ul class="customInfo">
      <li class="title">
        <h1>客户信息</h1>
      </li>
      <li class="info">
        <ul>
          <li v-for="(item,index) in customInfo" :key="index">{{index+':'+item}}</li>
        </ul>
      </li>
    </ul>
    <!-- <CustomInfo :customInfo='customInfo'></CustomInfo> -->
    <!-- 三个数据展示模块 -->
    <DataBlock :values="dataBlock"></DataBlock>
    <!-- 表格 -->
    <div class='model-con'>
      <h3 class='text-left'>开通产品</h3>
     <elTable :randerData="productList" :headTitle="tableTitle"></elTable> 
     <el-pagination class='elPagination'  @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" :total='totalPage' layout=" sizes, prev, pager, next, jumper" ></el-pagination>
    </div>
  </el-main>
</template>

<script>
import overViewApi from "@/api/dataCenter";
import FilterTime from '../../filters/index'
export default {
  components: {
    CarouselWords: () => import("../test/SwiperWords.vue"),
    // CustomInfo: () => import("../test/UserInfo.vue"),
    DataBlock: () => import("../test/DataBlock.vue"),
    elTable: () => import("../../components/table/eltable.vue")
  },
  data() {
    return {
      dataBlock: [
        // 3数据模块数据
        {
          item: "调用总次数",
          val: "0",
          tip: " 汇总数据"
        },
        {
          item: "调用总金额",
          val: "￥0",
          tip: " 汇总数据"
        },
        {
          item: "账户余额",
          val: "￥0",
          tip: "请联系翼盾销售负责人进行充值"
        }
      ],
      leftSideMenuItems: [
        //左侧导航菜单数据例子
        {
          subTitle: "数据中心",
          subMenuItems: [
            {
              item: "总览",
              url: ""
            },
            {
              item: "使用详情",
              url: ""
            }
          ]
        },
        {
          subTitle: "财务中心",
          subMenuItems: [
            {
              item: "总览",
              url: ""
            },
            {
              item: "使用详情",
              url: ""
            }
          ]
        },
        {
          subTitle: "信息管理",
          subMenuItems: [
            {
              item: "总览",
              url: ""
            },
            {
              item: "使用详情",
              url: ""
            }
          ]
        }
      ],

      noticeListInfo: [
        // 轮播信息
      ],
      currentPage: 1,
      totalPage:10,
      tableTitle: [
        { prop: "channelName", label: "产品名称" },
        { prop: "channelTypeName", label: "产品类型名称" },
        { prop: "feeTypeName", label: "计费模式" },
        { prop: "tagType", label: "启用状态"},
        { prop: "startDate", label: "起始日期" },
        { prop: "endDate", label: "截止日期" }
      ],
      productList: [],
      customInfo: {}
    };
  },
  methods: {
    getNotice() {
      overViewApi["NOTICELIST"]({}).then(res => {
        const result = res.data.datas;
        if (typeof result == "object") {
          this.noticeListInfo = result.map(item => {
            return item.noticeContent;
          });
        }
      });
    },
    getSummary() {
      overViewApi["SUMMATRYINFO"]({}).then(res => {
        const result = res.data.datas;
        this.customInfo = {
          公司名称: result.businessDO.businessName,
          联系人: result.businessDO.contactMan,
          联系手机: result.businessDO.contactManMobile,
          联系邮箱: result.businessDO.contactManMail
        };
        this.dataBlock[0].val = result.recordCnt;
        this.dataBlock[1].val = "￥" + result.recordAmount;
        this.dataBlock[2].val = "￥" + result.totalBalance;
      });
    },
    getActiveProduct(pageSize,pageNum){
      overViewApi['ACTIVATEPRODUCT']({
        pageSize: pageSize,
        pageNum: pageNum
      }).then(res => {
        const result = res.data.datas
        this.totalPage = result.lastPage*10
        this.productList = result.list
        console.log(this.productList,'处理后的数组');
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getActiveProduct('10',val)
    },
    clickItem(item) {
      //点击左侧导航菜单的选项信息
      console.log("click this item>>>", item);
    },
    logout() {}
  },
  created() {
    this.getNotice();
    this.getSummary();
    this.getActiveProduct('10','1');
  }
};
</script>

<style scoped lang='scss'>
.el-button {
  width: 185px;
  height: 34px;
  line-height: 34px;
  padding: 0;
  font-size: 14px;
  margin: 20px 0;
}
.el-main {
  padding: 27px;
  color: #333;
  text-align: center;
  line-height: 160px;
  position: relative;
  footer {
    font-size: 13px;
    color: #c2c2c2;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    line-height: 70px;
    a {
      font-size: 13px;
    }
  }
}
.mainPage {
  height: 100%;
  * {
    line-height: 16px;
  }
}
.mainPageHead {
  height: 63px;
  position: relative;
  .imgBox {
    position: absolute;
    margin: 0;
    box-sizing: border-box;
    left: 0;
    top: 0;
    height: 100%;
    width: 255px;
    background: #fff;
    img {
      width: 117px;
      height: 48px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .login {
    position: absolute;
    right: 27px;
    height: 100%;
    width: 150px;
    top: 0;
    margin: 0;
    line-height: 60px;
    span {
      height: 100%;
      line-height: 60px;
      color: #fff;
    }
    .customer {
      position: absolute;
      right: 50px;
      font-size: 13px;
      line-height: 63px;
    }
    .logout {
      position: absolute;
      font-size: 12px;
      right: 0;
      line-height: 63px;
      cursor: pointer;
    }
  }
}
.customInfo {
  background: #fff;
  width: 100%;
  height: unset;
  padding: 0 15px;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  & > li {
    list-style: none;
    margin: 0;
    padding: 0;
    min-height: 70px;
    box-sizing: border-box;
    h1 {
      height: 100%;
      margin: 0;
      line-height: 70px;
      text-align: left;
    }
  }
  .info {
    padding-bottom: 20px;
    ul {
      display: flex;
      background: #ebf2fb;
      padding: 0;
      height: unset;
      li {
        height: unset;
        list-style: none;
        padding: 10px;
        width: 25%;
        line-height: 21px;
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
.tableStyle{
  padding:20px;
 
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>