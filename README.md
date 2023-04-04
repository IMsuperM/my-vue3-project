# 创建uni-app Vue3/Vite 项目
```
# 创建以 javascript 开发的工程  
npx degit dcloudio/uni-preset-vue#vite my-vue3-project  

# 创建以 typescript 开发的工程  
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project  
```

# 配置类
## 小程序分包

```
### manifest.json 文件中  mp-weixin配置
mp-weixin:{
    "optimization": { "subPackages": true }
}

### page.json 文件中
"subPackages": [
        {
            "root": "subPackagePage/",  // 根路径名称
            "pages": [
                {
                    "path": "packagePage/index",
                    "style": {
                        "navigationBarTitleText": "test"
                    }
                },
                {
                    "path": "packagePage/packageTest",
                    "style": {
                        "navigationBarTitleText": "packageTest"
                    }
                }
            ]
        }
    ],
```

## 头部导航栏
```
### page.json 文件中 单个页面禁用默认头部导航
"pages": [
        //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
        {
            "path": "pages/index/index",
            "style": {
                "navigationBarTitleText": "index",
                // 小程序  使用自定义头部导航栏(单个页面配置)
                "navigationStyle": "custom",
                // App、H5
                "app-plus": {
                    "titleNView": false // 禁用原生导航栏
                }
            }
        },
    ],


### page.json 全局禁用默认头部导航
 "globalStyle": {
         //小程序  自定义头部导航栏
        "navigationStyle": "custom",
        //App、H5
        "app-plus": {
        	"titleNView": false //禁用原生导航栏
        },
    }
```