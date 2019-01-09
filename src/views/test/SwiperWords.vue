<template>
    <swiper style='height:35px;font-size:13px;' class='carouselWords' :options="option" ref="swiperOption" v-if='list.length>0'>
        <!-- slides -->
        <swiper-slide style='height:35px;' v-for='(item,index) in list' :key='index'>
           <ion-icon name="heart"></ion-icon> <span style='font-size:13px;'>{{item.info}}</span>
        </swiper-slide>
    </swiper>
</template>

<script>
    /*组件方式引用*/
    import 'swiper/dist/css/swiper.css' ////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        name: 'carrousel',
        components: {
            swiper,
            swiperSlide
        },
        props: ['infolist'],
        data() {
            return {
                option: {
                    // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
                    // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                    notNextTick: true,
                    // swiper configs 所有的配置同swiper官方api配置
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                        // stopOnLastSlide: true
                    },
                    // autoplay: false,
                    direction: 'vertical',
                    // effect: "coverflow",
                    speed: 1000,
                    loop: true,
                    grabCursor: true,
                    setWrapperSize: true,
                    slidesPerView: 1,
                    spaceBetween: 10,
                    centeredSlides: false,
                    // centeredSlides: true,
                    // autoHeight: true,
                    // paginationType:"bullets",
                    paginationClickable: true,
                    // scrollbar:'.swiper-scrollbar',
                    mousewheelControl: true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true,
                    // if you need use plugins in the swiper, you can config in here like this
                    // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
                    // debugger: true,
                    // swiper callbacks
                    // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
                    // onTransitionStart(swiper){
                    //   console.log(swiper)
                    // },
                    // more Swiper configs and callbacks...
                    // ...
                },
                list: []
            }
        },
        watch: {
            infolist() { //用于刷新swiper
                this.list = [];
                this.$nextTick(() => {
                    this.list = this.infolist;
                })
            }
        },
        mounted() {
            if (this.infolist && this.infolist.length) {
                this.list = this.infolist;
            }
        }
    }
</script>

<style scoped lang='scss'>
    .carouselWords {
        margin:0 0 20px 0;
    }
    .swiper-wrapper {
        height: 100%;
        .swiper-slide {
            line-height: 35px;
            text-align: left;
            padding: 0 15px;
            margin: 0;
            font-size: 13px;
        }
    }
</style>