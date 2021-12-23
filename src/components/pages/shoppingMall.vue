<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" alt="location" width="80%" class="location-icon">
                </van-col>
                <van-col span="16">
                    <input type="text" class='search-input'>
                </van-col>
                <van-col span="5" align='center'>
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <div class='swiper-area'>
            <van-swipe autoplay='1000'>
                <van-swipe-item v-for='(banner,index) in bannerPicArray' :key='index' >
                    <img v-lazy="banner.imageUrl" alt="图片" width='100%'/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index" >
                <img :src="cate.IMAGE" width="90%" />
                <span>{{cate.MALL_CATEGORY_NAME}}</span>
            </div>
        </div>
        <!--adbanner area-->
        <div>
            <img v-lazy="adBanner" width="100%" />
        </div>
        <!--Recommend goods area-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods " :key="index">
                        <div class="recommend-item" @click='goGoodsPage(item.ID)'>
                            <img :src="item.IMAGE1" width="80%">
                            <div>{{item.NAME}}</div>
                            <div>￥{{item.ORI_PRICE | moneyFilter}}(￥{{item.PRESENT_PRICE | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
        <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
        <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component> -->
        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item , index) in hotGoods" :key="index">
                                <goods-info :goodsId="item.ID" :goodsImage="item.IMAGE1" :goodsName="item.NAME" :goodsPrice="item.PRESENT_PRICE">

                                </goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    import { toMoney } from '@/filter/moneyFilter.js'
    import goodsInfo from '../component/goodsInfoComponent'
    import url from '@/serviceApi.config.js'
    export default {
        data() {
            return {
                message: "shopmall",
                locationIcon: require('../../assets/images/location.png'),
                bannerPicArray: [
                    { imageUrl: 'https://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg' },
                    { imageUrl: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175111_9509.jpg' },
                    { imageUrl: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175142_6947.jpg' }
                ],
                swiperOption: {
                    slidesPerView: 3
                },
                category: [],
                adBanner: 'https://images.baixingliangfan.cn/advertesPicture/20180404/20180404085441_850.gif',
                recommendGoods: [],
                hotGoods: []  //热卖商品
            };
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money)
            }
        },
        components: { swiper, swiperSlide, goodsInfo },
        created() {
            this.getCategory();
            this.getRecommendGoodList('2c9f6c94621970a801626a35cb4d0175');
            this.getHotGoodList('2c9f6c946016f86f01601709335d0000');

        },
        methods: {
            goList(index){
                console.log('golist');
                this.$router.push({path:'/categorylist',query:{active:index}});
            },
            goGoodsPage(id) {
                console.log('go goods detail');
                this.$router.push({name:'Goods',query:{goodsId:id}})
            },
            getCategory() {
                axios({
                    url: url.getCategoryList,
                    method: 'get',
                })
                    .then(response => {
                        // console.log(response)
                        if (response.data.code == 200 && response.data.message) {
                            this.category = response.data.message;
                            console.log(response.data.message);
                        } else {
                            Toast('服务器错误，数据取得失败')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            getRecommendGoodList(categorysubid) {
                axios({
                    url: url.getGoodsListByCategorySubID,
                    method: 'post',
                    data: {
                        categorySubId: categorysubid,
                        page: 1
                    }
                })
                    .then(response => {
                        console.log(response)
                        if (response.data.code == 200 && response.data.message.length) {
                            this.recommendGoods = response.data.message;
                        } else {
                            console.log('无数据');
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            getHotGoodList(categorysubid) {
                axios({
                    url: url.getGoodsListByCategorySubID,
                    method: 'post',
                    data: {
                        categorySubId: categorysubid,
                        page: 1
                    }
                })
                    .then(response => {
                        console.log(response)
                        if (response.data.code == 200 && response.data.message.length) {
                            this.hotGoods = [...response.data.message,...this.recommendGoods];
                        } else {
                            console.log('无数据');
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
        },
    };
</script>

<style scoped>
    .search-bar {
        height: 2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }

    .search-input {
        width: 100%;
        height: 1.3rem;
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
        border-bottom: 1px solid #fff !important;
        background-color: #e5017d;
        color: #fff;
    }

    .location-icon {
        padding-top: .2rem;
        padding-left: .3rem;
    }

    .swiper-area {
        clear: both;
        max-height: 15rem;
        overflow: hidden;
    }

    .type-bar {
        background-color: #fff;
        margin: 0 .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .type-bar div {
        padding: .3rem;
        font-size: 12px;
        text-align: center;
        flex: 1;
    }

    .recommend-area {
        background-color: #fff;
        margin-top: .3rem;
    }

    .recommend-title {
        border-bottom: 1px solid #eee;
        font-size: 14px;
        padding: .2rem;
        color: #e5017d;
    }

    .recommend-body {
        border-bottom: 1px solid #eee;
    }

    .recommend-item {
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
    }

    .hot-area {
        text-align: center;
        font-size: 14px;
        height: 1.8rem;
        line-height: 1.8rem;
    }

    .hot-goods {
        height: 130rem;
        overflow: hidden;
        background-color: #fff;
    }
</style>