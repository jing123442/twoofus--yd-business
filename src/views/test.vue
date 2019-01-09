<template>
    <el-container class="mainPage">
        <el-header class="mainPageHead" height="63px">
            <p class="imgBox">
                <img src="/static/logo.png" alt>
            </p>
            <p class="login">
                <span class="customer">你好，原理!</span>
                <span class="logout" @click='logout'>退出</span>
            </p>
        </el-header>
        <el-container>
            <el-aside width="255px">
                <!-- 左侧导航菜单 -->
                <leftSideNav :menuItems='leftSideMenuItems' @clickItem='clickItem'></leftSideNav>
                <el-button type="primary">产品服务</el-button>
            </el-aside>
            <el-main>
                <!-- 顶部轮播的消息 -->
                <CarouselWords :infolist='infolist'></CarouselWords>
                <!-- 客户信息 -->
                <CustomInfo :customInfo='customInfo'></CustomInfo>
                <!-- 三个数据展示模块 -->
                <DataBlock :values='dataBlock'></DataBlock>
                <!-- 表格 -->
                <!-- 下面是底部声明 -->
                <footer>
                    Copyright © 2018 <a href="" style='color:#17aef2;'>青岛翼租融资租赁有限责任公司</a>. All rights reserved.
                </footer>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        components: {
            leftSideNav: () =>
                import ("./test/LeftSideNavigator.vue"),
            CarouselWords: () =>
                import ("./test/SwiperWords.vue"),
            CustomInfo: () =>
                import ("./test/UserInfo.vue"),
            DataBlock: () =>
                import ('./test/DataBlock.vue')
        },
        data() {
            return {
                dataBlock: [{ //3数据模块数据
                    item: '调用总次数',
                    val: '41',
                    tip: ' 汇总数据'
                }, {
                    item: '调用总金额',
                    val: '￥14.2',
                    tip: ' 汇总数据'
                }, {
                    item: '账户余额',
                    val: '￥454.25',
                    tip: '请联系翼盾销售负责人进行充值'
                }],
                leftSideMenuItems: [ //左侧导航菜单数据例子
                    {
                        subTitle: "数据中心",
                        subMenuItems: [{
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
                        subMenuItems: [{
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
                        subMenuItems: [{
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
                infolist: [ //轮播信息
                    {
                        info: '徐贵祥一步步成长为国防大学军事文化学院文艺创演系主任。他不断从自己的军旅生涯中寻找灵感'
                    }, {
                        info: '翼盾信用评分模型'
                    }, {
                        info: '1978年，不满20岁的徐贵祥从安徽应征入伍，穿上了那身年轻人都羡慕的绿军装。'
                    },
                ],
                customInfo: {
                    componey: '公司名称：青岛翼租融资有限公司(袁丽测试）',
                    name: '联系人：袁丽2',
                    tel: '联系手机：15444444444',
                    email: '联系邮箱：123@11.com2'
                }
            };
        },
        methods: {
            clickItem(item) { //点击左侧导航菜单的选项信息
                console.log('click this item>>>', item)
            },
            logout() {}
        }
    };
</script>

<style scoped lang='scss'>
    .el-header {
        color: #333;
        text-align: center;
        line-height: 60px;
        background: linear-gradient(120deg, #30b8ff, #008cd4);
    }
    .el-button {
        width: 185px;
        height: 34px;
        line-height: 34px;
        padding: 0;
        font-size: 14px;
        margin: 20px 0;
    }
    .el-aside {
        background-color: #fff;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    .el-main {
        background-color: #f2f8f9;
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
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>