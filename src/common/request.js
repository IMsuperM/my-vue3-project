// request.js
let loadingCount = 0; // 全局loading 计数
// 默认配置，和luch-request基本一致
const DEFAULT_CONFIG = {
    baseURL: "http://10.118.13.184:3030",
    header: {},
    method: "POST",
    dataType: "json",
    // #ifndef MP-ALIPAY
    responseType: "text",
    // #endif
    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    custom: {}, // 全局自定义参数默认值
    // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
    timeout: 60000,
    // #endif
    // #ifdef APP-PLUS
    sslVerify: true,
    // #endif
    // #ifdef H5
    // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
    withCredentials: false,
    // #endif
    // #ifdef APP-PLUS
    firstIpv4: false, // DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
    // #endif
    // 局部优先级高于全局，返回当前请求的task,options。请勿在此处修改options。非必填
    // getTask: (task, options) => {
    // 相当于设置了请求超时时间500ms
    //   setTimeout(() => {
    //     task.abort()
    //   }, 500)
    // },
    // 全局自定义验证器。参数为statusCode 且必存在，不用判断空情况。
    // validateStatus: (statusCode) => {
    //   // statusCode 必存在。此处示例为全局默认配置
    //   return statusCode >= 200 && statusCode < 300;
    // },
};

class Request {
    constructor(options = {}) {
        // 合并用户自定义配置
        this.config = Object.assign(DEFAULT_CONFIG, options);
    }
    // 请求拦截 主要是合并url，合并接口特定配置，可以根据自己情况进行扩展
    requestInterceptor (url, data, config, method) {
        const { baseURL } = this.config;
        // 拼接Url
        url = baseURL + url;
        const configs = {
            ...this.config,
            url,
            data,
            ...config,
            method,
        };
        console.log("Request ~ requestInterceptor ~ configs:", configs);
        // 返回组装的配置
        return configs;
    }
    // 响应拦截，这里只是做了示例，可以根据自己情况进行扩展
    async responseInterceptor (res) {
        const { data: _data } = res;
        const { code, message, data } = _data;
        if (code !== "200") {
            this.handleError(message);
            return Promise.reject(message);
        }
        return Promise.resolve({ code, message, data });
    }
    // 请求方法，做了Promise封装，返回Promise
    /**
     * @param {String} url 接口
     * @param {Object} data 参数
     * @param {Object} config 某个接口自定义配置
     * @param {String} method 请求方法，只实现post和get，这么做了原因是 只有这两个没有兼容问题
     * @returns
     */
    request (url, data, config, method) {
        // 显示loading
        this.showLoading();
        // 请求拦截，返回处理过的结果配置
        const _config = this.requestInterceptor(url, data, config, method);
        // Promise 封装
        return new Promise((resolve, reject) => {
            uni.request({
                ..._config,
                success: (res) => {
                    // 响应拦截
                    this.responseInterceptor(res).then(resolve).catch(reject);
                },
                fail: (err) => {
                    // 提示错误
                    this.handleError(err.message);
                    console.log("fail", err);
                },
                complete: () => {
                    // 关闭Loading
                    this.hideLoading();
                },
            });
        });
    }
    // 只实现post和get，这么做了原因是 只有这两个没有兼容问题
    // 需要其他方式，可以以同样的方式自行扩展

    /**
     * get请求
     * @param {String} url 接口
     * @param {Object} data 请求参数 可选
     * @param {Object} config 接口自定义配置 可选
     * @returns
     */
    get (url, data = {}, config = {}) {
        return this.request(url, data, config, "GET");
    }
    /**
     * post请求
     * @param {String} url 接口
     * @param {Object} data 请求参数 可选
     * @param {Object} config 接口自定义配置 可选
     * @returns
     */
    post (url, data = {}, config = {}) {
        return this.request(url, data, config, "POST");
    }
    // 错误提示
    handleError (title) {
        uni.showToast({
            title,
            icon: "none",
        });
    }

    showLoading () {
        uni.showLoading({ mask: true, title: 'loading...' })
        loadingCount++;
    }

    hideLoading () {
        loadingCount !== 0 && loadingCount--;
        if (loadingCount === 0) {
            // console.log("Request ~ hideLoading ~ loadingCount: 关闭了", loadingCount);
            uni.hideLoading()//关闭loading效果
        }
    }
}

export default Request;