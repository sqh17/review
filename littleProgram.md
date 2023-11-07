# 小程序部分

- [小程序部分](#小程序部分)
  - [小程序五种路由的使用和区别](#小程序五种路由的使用和区别)
  - [setData的作用](#setdata的作用)
  - [wx：key的作用](#wxkey的作用)
  - [小程序的生命周期](#小程序的生命周期)
  - [微信小程序如何实现页面之间的数据共享](#微信小程序如何实现页面之间的数据共享)
  - [bindtap和catchtap](#bindtap和catchtap)
  - [小程序的独立分包和普通分包的区别](#小程序的独立分包和普通分包的区别)
  - [button的open-type有哪些属性](#button的open-type有哪些属性)
  - [说出小程序当中ui组件](#说出小程序当中ui组件)
  - [对uni-app的理解](#对uni-app的理解)

### 小程序五种路由的使用和区别

1. navigateTo 从当前页面跳转到应用内的某个新页面。跳转后，当前页面会被隐藏，新页面会被展示在页面栈中，用户可以通过返回操作返回到上一个页面
2. redirectTo 方法用于关闭当前页面，然后跳转到应用内的某个新页面。新页面会替换当前页面，后退操作将无法返回到前一个页面
3. reLaunch 方法可以关闭所有页面，然后跳转到应用内的某个新页面。新页面将成为栈中的唯一页面
4. switchTab 方法用于跳转到应用内的某个 tabBar 页面。跳转时，需要指定目标 tabBar 页面的路径。该方法会关闭其他非 tabBar 页面，只保留 tabBar 页面
5. navigateBack 方法用于返回上一个页面。可以通过传递参数来指定返回页面的层数。默认返回上一个页面，也可以指定返回多个页面

### setData的作用

setData 是一个用于更新页面数据的方法。通过调用 setData 方法，可以将数据更新到小程序的页面视图中，实现数据的动态展示和渲染

### wx：key的作用

wx:key 是用于标识列表中各个项的属性，它的作用是帮助微信小程序框架识别列表中每个项的唯一性，以提高列表渲染的性能和效率

### 小程序的生命周期

生命周期包含两种，页面生命周期和全局生命周期

1. 全局生命周期：
      1. onLaunch：当小程序初始化完成时触发，只会触发一次。
      2. onShow：当小程序启动，或从后台进入前台显示时触发。
      3. onHide：当小程序从前台进入后台时触发。
      4. onError：当小程序发生脚本错误或 API 调用失败时触发
2. 页面生命周期
      1. onLoad：页面加载时触发，可以在这里通过 options 参数获取页面跳转时所带的参数。
      2. onShow：页面显示时触发，对应全局的 onShow。
      3. onReady：页面初次渲染完成时触发，对用户可见。
      4. onHide：页面隐藏时触发，对应全局的 onHide。
      5. onUnload：页面卸载时触发，如页面跳转或关闭。
      6. onPullDownRefresh：用户下拉刷新时触发，需要在 JSON 配置文件中开启enablePullDownRefresh。
      7. onReachBottom：页面滚动到底部时触发，可以用来实现分页加载更多。
      8. onShareAppMessage: 用户点击右上角分享按钮时触发。
      9. onPageScroll: 页面滚动时触发，可以获取滚动位置。
      10. onResize: 页面尺寸改变时触发，如横竖屏切换。
      11. onTabItemTap: 当前是 tab 页时，点击 tab 时触发

### 微信小程序如何实现页面之间的数据共享

1. URL 参数传递，wx.navigateTo() 或 wx.redirectTo() 方法可以传递参数，通过 options 参数获取页面跳转时所带的参数
2. Storage API
3. 全局变量或全局状态：在小程序的 App 实例中定义全局变量或状态，可以在不同页面之间共享数据。在需要共享的页面中，可以通过 getApp() 方法获取 App 实例，然后访问全局变量或状态
4. 事件发布与订阅模式，使用类似事件发布与订阅的机制，可以在不同页面之间进行数据传递和通信。可以使用小程序的事件系统，如 triggerEvent() 方法触发自定义事件，并在其他页面中通过监听该事件来获取传递的数据
5. 使用第三方数据管理库

### bindtap和catchtap

1. bindtap是普通事件函数
2. catchtap用于捕获事件（阻止事件冒泡）

### 小程序的独立分包和普通分包的区别

1. 独立分包是指将某一功能模块或页面放到一个独立的分包中，该分包可以独立于主包运行；而普通分包是指将某一功能模块或页面放到一个独立的分包中，该分包依赖于主包运行
2. 在独立分包中可以包含页面、组件、资源等，并且可以有自己独立的配置文件和 node_modules 目录；而普通分包中只能包含页面和资源，也不能有自己的配置文件和 node_modules 目录
3. 独立分包拥有独立的 2M 加载限制，即整个独立分包大小不能超过 2M（gzip 后）；而普通分包没有独立的加载限制，但所有分包大小不能超过 8M（gzip 后）
4. 独立分包具有独立的请求上限和并发控制，可以有自己的独立域名配置，适用于需要独立的 CDN 加速或单独进行首屏优化的场景；而普通分包没有独立的请求上限和并发控制，也不能有自己的独立域名配置
5. 独立分包需要在 app.json 配置文件中进行独立分包的声明，并通过 navigateTo、redirectTo、reLaunch、switchTab、navigateBack 等 API 跳转到独立分包中的页面；普通分包不需要在 app.json 中声明，只需要在页面的 json 配置文件中指定所属的分包即可

### button的open-type有哪些属性

1. navigate：跳转到指定页面，需要配合 url 属性使用

```html
<button open-type="navigate" url="/pages/pageA"></button>
```

2. redirect：在当前页面关闭后，跳转到指定页面，需要配合 url 属性使用。

```html
<button open-type="redirect" url="/pages/pageB"></button>
```

3. switchTab：跳转到指定的 TabBar 页面，需要配合 url 属性使用。

```html
<button open-type="switchTab" url="/pages/tabBarPage"></button>
```

4. reLaunch：关闭所有页面，打开到应用内的某个页面，需要配合 url 属性使用。

```html
<button open-type="reLaunch" url="/pages/home"></button>
```

5. navigateBack：关闭当前页面，返回上一页面或多级页面，可以配合 delta 属性指定返回的页面数。

```html
<button open-type="navigateBack" delta="1"></button>
```

6. getUserInfo：获取用户信息，需要在按钮上绑定 bindgetuserinfo 事件，并在事件回调函数中处理用户授权逻辑。

```html
<button open-type="getUserInfo" bindgetuserinfo="getUserInfoHandler"></button>
```

7. getPhoneNumber：获取用户手机号，需要在按钮上绑定 bindgetphonenumber 事件，并在事件回调函数中处理手机号获取逻辑。

```html
<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumberHandler"></button>
```

8. launchApp：打开第三方 APP，需要在按钮上绑定 bindlaunchapp 事件，并在事件回调函数中处理打开 APP 的逻辑

```html
<button open-type="launchApp" bindlaunchapp="launchAppHandler"></button>
```

### 说出小程序当中ui组件

view/form/text/image/button/input/switch/toast/tabBar/dialog

### 对uni-app的理解

一个基于 Vue.js 的跨平台开发框架，可以使用单一的代码编写多端应用，包括微信小程序、H5、App、支付宝小程序、百度小程序、字节跳动小程序

1. 跨平台
2. vue方式研发
3. 组件化开发
4. 丰富的生态系统
5. 平台能力兼容
6. 性能优化和原生渲染
