<template>
  <view class="content">
    <!-- <image class="logo" src="/static/logo.png"></image> -->
    <view class="text-area">
      <text class="title">{{ title1 }}</text>
      <text class="title">{{ title }}</text>
    </view>
    <view>
      <button @click="jumpTo">跳转</button>
      <button @click="jumpToPackagePage">跳转分包页面</button>
      <button @click="request">请求</button>
    </view>
  </view>
</template>

<script setup>
import api from "../../api/index"
import { ref, reactive, onMounted } from 'vue'
let { title1 } = reactive({ title1: 'hello world' })
title1 += '12345'
const title = ref('hello')
onMounted(() => {
  console.log(title.value) // 0
  console.log(title1) // 0

})
const jumpTo = () => {
  uni.navigateTo({
    url: '/pages/test/index?id=1&name=uniapp'
  })
}
const jumpToPackagePage = () => { 
    uni.navigateTo({
    url: '/subPackagePage/packagePage/packageTest?id=1&name=uniapp'
  })
}
function request () {
  //   for (let index = 0; index < 5; index++) {
  //     let res =  api.test()
  //     console.log("request ~ res:", res);
  //   }
  let res = api.test()
  console.log("request ~ res:", res);
  let res1 = api.test1()
  console.log("request ~ res:", res1);
  let res2 = api.test2()
  console.log("request ~ res:", res2);
}
// export default {
//     setup () {
//         const count = ref(0)

//         // 返回值会暴露给模板和其他的选项式 API 钩子
//         return {
//             count
//         }
//     },

//     mounted () {
//         console.log(this.count) // 0
//     },
//     data () {
//         return {
//             title: 'Hello',
//         }
//     },
//     onLoad () { },
//     methods: {
//         jumpTo () {
//             uni.navigateTo({
//                 url: '/pages/test/index?id=1&name=uniapp'
//             })
//         },
//     },
// }
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
