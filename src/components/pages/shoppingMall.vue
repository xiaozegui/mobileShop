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
                <van-swipe-item v-for='(banner,index) in bannerPicArray' :key='index'>
                    <img v-lazy="banner.imageUrl" alt="图片" width='100%'>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: "shopmall",
                locationIcon: require('../../assets/images/location.png'),
                bannerPicArray: [
                    { imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg' },
                    { imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg' },
                    { imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg' }
                ]
            };
        },
    };
</script>

<style scoped>
    .search-bar {
        box-sizing: border-box;
        height: 2.2rem;
        line-height: 2.2rem;
        background-color: #e5017d;
        overflow: hidden;
    }

    .location-icon {
        box-sizing: border-box;
        padding-left: .2rem;
        padding-top: .3rem;
    }

    .search-input {
        width: 100%;
        height: 1.2rem;
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
        border-bottom: 1px solid #fff !important;
        background-color: #e5017d;
        color: white;
    }

    .van-button--mini {
        height: 0.9rem;
    }

    .swiper-area {
        max-height: 20rem;
        clear: both;
        overflow: hidden;
    }
</style>