<template>
  <ul class="customInfo model-con">
    <li class="title">
      <h3>客户信息</h3>
    </li>
    <li class="info">
      <ul>
        <li class='model-con' style='margin-left:0'>
         <i class='icon iconfont myicon-homepage_fill' style='color:#1976d2;fontSize:24px'></i>
         <p class='value' >{{customInfo[0].value}}</p>
         <div class='key'>{{customInfo[0].key}} <div style='background:#1976d2;height:6px;width:30%;borderRadius:3px;'  class='bottom-line'></div></div>
        </li>
        <li  class='model-con'>
         <i class='icon iconfont myicon-shumashouji' style='color:#26dad2;fontSize:24px'></i>
         <p class='value' >{{customInfo[1].value}}</p>
         <div class='key'>{{customInfo[1].key}}
           <div style='background:#26dad2;height:6px;width:50%;borderRadius:3px' class='bottom-line'></div>
         </div>
        </li>
        <li class='model-con '>
         <i class='icon iconfont myicon-businesscard_fill' style='color:#7460ee;fontSize:24px'></i>
         <p class='value' >{{customInfo[2].value}}</p>
         <div class='key'>{{customInfo[2].key}}
           <div style='background:#7460ee;height:6px;width:50%;borderRadius:3px'  class='bottom-line'></div>
         </div>
        </li>
        <li  class='model-con' style='margin-right:0'>
         <i class='icon iconfont myicon-mail_fill' style='color:#ffb22b;fontSize:24px'></i>
         <p class='value' >{{customInfo[3].value}}</p>
         <div class='key'>{{customInfo[3].key}}
           <div style='background:#ffb22b;height:6px;width:50%;borderRadius:3px'  class='bottom-line'></div>
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
  h3{
    padding-left:20px;
    color:#303133;
    height: 100%;
    margin: 10px 0 35px 0;
    line-height:16px;
    color: #303133;
  }
  // width: 100%;
  // height: unset;
  padding: 0 ;
  // margin: 0;
  // box-sizing: border-box;
  // overflow: hidden;
  & > li {
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
        position:relative;
        height: unset;
        list-style: none;
        padding: 20px 20px 5px 20px;
        width: 25%;
        text-align: left;
      }
    }
  .value{
    color: #455a64;
    font-weight:300;
    font-size:16px;
    padding-bottom:50px;
    margin-top:10px;
  }
  .key{
    font-weight: 300;
    margin-bottom: 17px;
    color: #99abb4;
    position:absolute;
    bottom:10px;
    padding-bottom:4px;
    border-radius:4px;
    font-size:14px;
    width:83%;
    margin-right:20px;
  }
  .model-con{
    margin:10px;
    }
    .bottom-line{
      margin-top:5px;
    }
}
</style>
