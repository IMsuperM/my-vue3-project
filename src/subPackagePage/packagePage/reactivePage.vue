<template>
    <view class="content">
        <!-- <image class="logo" src="/static/logo.png"></image> -->
        <view class="text-area">
            <text class="title">num:{{ num }}</text>
        </view>
        <view class="text-area">
            <text class="title">state.count:{{ state.count }}</text>
        </view>
        <view class="text-area">
            <text class="title">numVal:{{ numVal }}</text>
        </view>
        <view class="text-area">
            <text class="title">num1:{{ num1 }}</text>
        </view>
        <view id="three">

        </view>
        <view>
            <button @click="rective">双向绑定</button>
        </view>
    </view>
</template>

<script setup>
import api from "../../api/index"
import { nextTick, ref, reactive, onMounted, onUpdated } from 'vue'
import * as THREE from 'three';

// 使用three.JS 
function three (params) {
    // three
    console.log("three===>");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const docm = document.getElementById("three")
    console.log("three ~ docm:", docm.clientHeight);
    renderer.setSize(docm.clientWidth, docm.clientHeight);
    docm.appendChild(renderer.domElement);
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    const x = 0, y = 0;

    const heartShape = new THREE.Shape();

    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
    const geometry = new THREE.ShapeGeometry(heartShape);

    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 50;
    function animate () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

//#region 响应式

// 响应式效果，双向绑定
const num1 = ref(0)
const state = reactive({ count: 0 })  // 针对于 定义object对象 的限制


// 这样直接解构出来的 不具有实时的响应式效果
let { num } = reactive({ num: 0 })
num++
const number1 = reactive({ numVal: 0 })
let { numVal } = number1 // numVal 也和 number1.numVal 失去了响应性连接
numVal++

function promiseFun () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            num++; // 页面值未曾变化
            num1.value++
            state.count++
            numVal++// 页面值未曾变化 
            console.log("setTimeout ~ state.count:", state.count);
            console.log("setTimeout ~ num1:", num);
            resolve()
        }, 2000);
    });
}

const asyncFun = async () => {
    for (let index = 0; index < 10; index++) {
        await promiseFun();
    }
}
asyncFun();



const rective = () => {
    num++; // 页面值未曾变化
    num1.value++
    state.count++
    numVal++// 页面值未曾变化 
}
//#endregion



//#region  周期函数
onMounted(() => {
    //#ifdef APP-PLUS || H5
    //   three();
    // #endif
})
onUpdated(() => {

})
//#endregion


</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
</style>
