<template>
    <view class="content">
        <!-- <image class="logo" src="/static/logo.png"></image> -->
        <view class="text-area" @click="jumpTo">
            <text class="title">跳转《响应式》页面</text>
        </view>
        <view class="text-area" @click="jumpToPackagePage">
            <text class="title">跳转《分包》页面</text>
        </view>
        <view class="text-area" @click="request">
            <text class="title">请求</text>
        </view>
    </view>
</template>

<script setup>
import api from "../../api/index"
import { nextTick, ref, reactive, onMounted, onUpdated } from 'vue'
//#region  周期函数
onMounted(() => {
    //#ifdef APP-PLUS || H5
    //   three();
    // #endif
})
onUpdated(() => {

})
//#endregion
const jumpTo = () => {
    uni.navigateTo({
        url: '/subPackagePage/packagePage/reactivePage?id=1&name=uniapp'
    })
}
const jumpToPackagePage = () => {
    uni.navigateTo({
        url: '/subPackagePage/packagePage/packageTest?id=1&name=uniapp'
    })
}
async function request () {
    //   for (let index = 0; index < 5; index++) {
    //     let res =  api.test()
    //     console.log("request ~ res:", res);
    //   }
    let res = await api.test()
    console.log("request1 ~ res:", res);
    let res1 = await api.test1()
    console.log("request2 ~ res:", res1);
    let res2 = await api.test2()
    console.log("request3 ~ res:", res2);
}

</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100vh;
    width: 100vw;
}

#three {
    width: 40%;
    height: 20%;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
}

.text-area {
    width: 100%;
    display: flex;
    justify-content: flex-start;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
</style>
