<template>
  <ul class="customInfo model-con">
    <li class="title">
      <h3>客户信息</h3>
    </li>
    <li class="info">
      <ul>
        <li v-for="(item,index) in customInfo" :key="index" class='model-con' style='margin-left:0'>
          <i class='icon iconfont ' :class="[item.icon]" :style="{color:item.iconColor}" style='fontSize:24px'></i>
          <p class='value'>{{item.value}}</p>
          <div class='key'>{{item.key}}
            <div :style='{background:item.iconColor}' style='height:6px;width:30%;borderRadius:3px;' class='bottom-line'></div>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['customInfo']
}
</script>

<style scoped lang='scss'>
  .customInfo {
    background: #ebf2fb;
    box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
    h3 {
      padding-left: 20px;
      color: #303133;
      height: 100%;
      margin: 10px 0 35px 0;
      line-height: 16px;
      color: #303133;
    }
    padding: 0;
    &>li {
      list-style: none;
      margin: 0;
      padding: 0;
      min-height: 70px;
      box-sizing: border-box;
      h3 {
        height: 100%;
        margin: 0;
        line-height: 70px;
        text-align: left;
      }
    }
    ul {
      display: flex;
      padding: 0;
      height: unset;
      li {
        position: relative;
        height: unset;
        list-style: none;
        padding: 20px 20px 5px 20px;
        width: 25%;
        text-align: left;
      }
    }
    .value {
      color: #455a64;
      font-weight: 300;
      font-size: 16px;
      padding-bottom: 50px;
      margin-top: 10px;
    }
    .key {
      font-weight: 300;
      margin-bottom: 17px;
      color: #99abb4;
      position: absolute;
      bottom: 10px;
      padding-bottom: 4px;
      border-radius: 4px;
      font-size: 14px;
      width: 83%;
      margin-right: 20px;
    }
    .model-con {
      margin: 10px;
    }
    .bottom-line {
      margin-top: 5px;
    }
  }
</style>
