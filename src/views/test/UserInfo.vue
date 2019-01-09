<template>
    <ul class='customInfo'>
        <li class='title'>
            <h1>客户信息</h1>
        </li>
        <li class='info'>
            <ul>
                <li v-for="(item,index) in customInfo" :key='index'>{{item}}</li>
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
        background: #fff;
        width: 100%;
        height: unset;
        padding: 0 15px;
        margin: 0;
        box-sizing: border-box;
        overflow: hidden;
        &>li {
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
                background: #f2f8f9;
                padding: 0;
                height: unset;
                li {
                    height: unset;
                    list-style: none;
                    padding: 10px;
                    width: 25%;
                    line-height: 21px;
                    text-align: left;
                    font-size: 14px;
                }
            }
        }
    }
</style>