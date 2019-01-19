<template>
  <ul class="dataBlock">
    <li>
      <div class="dataBody greenStyle">
        <div>
          <p class="img"><i class='el-icon-message'></i></p>
          <p class="item">
            <span class="title">{{values[0].item}}</span>
            <span class="number">{{values[0].val}}</span>
          </p>
        </div>
        <p class="mytip">
          <i class="el-icon-warning"></i>
          {{values[0].tip}}
        </p>
      </div>
    </li>
    <li >
      <div class="dataBody orangeStyle">
        <div>
          <p class="img"><i class='el-icon-document'></i></p>
          <p class="item">
            <span class="title">{{values[1].item}}</span>
            <span class="number">{{values[1].val}}</span>
          </p>
        </div>
        <p class="mytip">
          <i class="el-icon-warning"></i>
          {{values[1].tip}}
        </p>
      </div>
    </li>
    <li>
      <div class="dataBody blueStyle">
        <div>
          <p class="img"><i class='el-icon-printer'></i></p>
          <p class="item">
            <span class="title">{{values[2].item}}</span>
            <span class="number">{{values[2].val}}</span>
          </p>
        </div>
        <p class="mytip">
          <i class="el-icon-warning"></i>
          {{values[2].tip}}
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
    border-radius:4px;
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
        i{
          line-height:60px;
          font-size:55px;
        }
      }
      .item {
        span {
          display: block;
          width: 100%;
          text-align: right;
        }
        .title {
          font-size: 18px;
          font-weight:500;
        }
        .number {
          font-size: 25px;
          font-weight: 600;
          line-height: 35px;
          font-family: "Poppins", sans-serif;
        }
      }
    }
    .mytip {
      font-size: 13px;
      line-height: 16px;
      text-align: left;
      color: rgba(255, 255, 255, 0.65);
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
