<template>
  <ul class="dataBlock">
    <li v-for="(item,index) in values" :key="index">
      <div class="dataBody">
        <div>
          <p class="img">img</p>
          <p class="item">
            <span class="title">{{item.item}}</span>
            <span class="number">{{item.val}}</span>
          </p>
        </div>
        <p class="tip">
          <i class="el-icon-warning"></i>
          {{item.tip}}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['values']
}
</script>

<style scoped lang='scss'>
.dataBlock {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin: 25px 0;
  padding: 0;
  li {
    width: 33.3%;
    list-style: none;
    height: 161px;
    padding: 0 8px;
  }
  li:first-child {
    padding: 0 16px 0 0;
  }
  li:last-child {
    padding: 0 0 0 16px;
  }
  .dataBody {
    background: #fff;
    height: 100%;
    padding: 30px 29px;
    div {
      width: 100%;
      height: unset;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      margin: 0;
      p {
        height: unset;
        line-height: 19px;
        margin: 0;
      }
      .img {
        width: 40px;
        height: 60px;
      }
      .item {
        span {
          display: block;
          width: 100%;
          text-align: right;
        }
        .title {
          font-size: 16px;
        }
        .number {
          font-size: 25px;
          font-weight: 600;
          line-height: 35px;
          font-family: "Poppins", sans-serif;
        }
      }
    }
    .tip {
      font-size: 13px;
      line-height: 16px;
      text-align: left;
      color: #c2c2c2;
      margin: 10px 0 0;
      line-height: 30px;
      .el-icon-warning {
        font-size: 12px;
        display: inline-block;
        transform: scale(0.9);
        margin-right: 5px;
      }
    }
  }
}
</style>
