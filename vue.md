# vue相关

- [vue相关](#vue相关)
  - [Virtual Dom 的优势在哪里](#virtual-dom-的优势在哪里)
  - [vue 的生命周期](#vue-的生命周期)
  - [vue 的 data 为什么是个函数](#vue-的-data-为什么是个函数)
  - [vue2.x 中如何监测数组变化](#vue2x-中如何监测数组变化)
  - [Vue2.x 响应式数据原理](#vue2x-响应式数据原理)
  - [vue 的 computed 和 watch 的区别](#vue-的-computed-和-watch-的区别)
  - [vue 的路由模式](#vue-的路由模式)
  - [vue的router和route的区别](#vue的router和route的区别)
  - [vue 的路由钩子(守卫)](#vue-的路由钩子守卫)
  - [vue 的组件传值](#vue-的组件传值)
  - [vue中key 的作用](#vue中key-的作用)
    - [vue2](#vue2)
    - [vue3](#vue3)
  - [vuex 是什么？怎么使用？哪种功能场景使用它？](#vuex-是什么怎么使用哪种功能场景使用它)
  - [做过哪些 Vue 的性能优化](#做过哪些-vue-的性能优化)
  - [react vs vue](#react-vs-vue)
  - [有没有看过vue2源码？](#有没有看过vue2源码)
  - [vue3的特性](#vue3的特性)
  - [vue3相对于vue2的区别](#vue3相对于vue2的区别)
  - [vue绑定原理](#vue绑定原理)
  - [vue2和vue3的diff算法区别](#vue2和vue3的diff算法区别)
  - [vue3 setup](#vue3-setup)
  - [vue3的watch和watchEffect的区别](#vue3的watch和watcheffect的区别)
  - [v-model原理](#v-model原理)
    - [vue2](#vue2-1)
    - [vue3](#vue3-1)
  - [v-model自定义组件的实现](#v-model自定义组件的实现)
  - [keep-alive原理](#keep-alive原理)
    - [vue是如何收集依赖的](#vue是如何收集依赖的)
  - [vue的template到render的过程](#vue的template到render的过程)
  - [vue实例挂载的过程](#vue实例挂载的过程)

### Virtual Dom 的优势在哪里

DOM 引擎、JS 引擎 相互独立，但又工作在同一线程（主线程）
JS 代码调用 DOM API 必须 挂起 JS 引擎、转换传入参数数据、激活 DOM 引擎，DOM 重绘后再转换可能有的返回值，最后激活 JS 引擎并继续执行若有频繁的 DOM API 调用，且浏览器厂商不做“批量处理”优化，
引擎间切换的单位代价将迅速积累若其中有强制重绘的 DOM API 调用，重新计算布局、重新绘制图像会引起更大的性能消耗。
其次是 VDOM 和真实 DOM 的区别和优化：

- 虚拟 DOM 不会立马进行排版与重绘操作
- 虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后在真实 DOM 中进行排版与重绘，减少过多 DOM 节点排版与重绘损耗
- 虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版，因为最终与真实 DOM 比较差异，可以只渲染局部

### vue 的生命周期

- beforeCreate： data对象为undefined，dom未渲染，$el为undefined
- created：data对象已存在，dom未渲染，$el为undefined
- beforeMount：data对象已存在，dom未渲染，$el已存在
- mounted：data对象已存在，dom已渲染，$el已存在
- beforeUpdate：在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
- updated：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
- beforeDestroy：在实例销毁之前调用。实例仍然完全可用
- destroyed： 在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。

keep-alive的情况下

- actived
- deactived
  第一次走：created=>mounted=>actived
  走了缓存后：actived

### vue 的 data 为什么是个函数

一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果 data 是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间 data 不冲突，data 必须是一个函数。

### vue2.x 中如何监测数组变化

使用了函数劫持的方式，重写了数组的方法，Vue 将 data 中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组 api 时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。

### Vue2.x 响应式数据原理

vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体实现步骤：

- 当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 都加上 setter和getter 这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化
- compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
  Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:

  1. 在自身实例化时往属性订阅器(dep)里面添加自己
  2. 自身必须有一个update()方法
  3. 待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。

- MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果

代码实现：

  ```javascript
  <input id="input"/>

  const data = {};
  const input = document.getElementById('input');
  Object.defineProperty(data, 'text', {
    set(value) {
    input.value = value;
    this.value = value;
    }
  });
  input.onchange = function(e) {
    data.text = e.target.value;
  }
  ```

### vue 的 computed 和 watch 的区别

- ① 从属性名上，computed 是计算属性，也就是依赖其它的属性计算所得出最后的值。watch 是去监听一个值的变化，然后执行相对应的函数。
- ② 从实现上，computed 的值在 getter 执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取 computed 的值时才会重新调用对应的 getter 来计算。watch 在每次监听的值变化时，都会执行回调。其实从这一点来看，都是在依赖的值变化之后，去执行回调。很多功能本来就很多属性都可以用，只不过有更适合的。如果一个值依赖多个属性（多对一），用 computed 肯定是更加方便的。如果一个值变化后会引起一系列操作，或者一个值变化会引起一系列值的变化（一对多），用 watch 更加方便一些。
- ③watch 的回调里面会传入监听属性的新旧值，通过这两个值可以做一些特定的操作。computed 通常就是简单的计算。
- ④watch 和 computed 并没有哪个更底层，watch 内部调用的是 vm.$watch，它们的共同之处就是每个定义的属性都单独建立了一个 Watcher 对象。

    ```javascript
    function defineReactive(data, key, val, fn) {
        let subs = [] // 新增
        Object.defineProperty(data, key, {
          configurable: true,
          enumerable: true,
          get: function() {
           // 新增
         if (data.$target) {
          subs.push(data.$target)
         }
         return val
        },
        set: function(newVal) {
         if (newVal === val) return
         fn && fn(newVal)
         // 新增
         if (subs.length) {
          // 用 setTimeout 因为此时 this.data 还没更新
          setTimeout(() => {
           subs.forEach(sub => sub())
          }, 0)
         }
         val = newVal
        },
       })
      }
      function computed(ctx, obj) {
       let keys = Object.keys(obj)
       let dataKeys = Object.keys(ctx.data)
       dataKeys.forEach(dataKey => {
        defineReactive(ctx.data, dataKey, ctx.data[dataKey])
       })
       let firstComputedObj = keys.reduce((prev, next) => {
        ctx.data.$target = function() {
         ctx.setData({ [next]: obj[next].call(ctx) })
        }
        prev[next] = obj[next].call(ctx)
        ctx.data.$target = null
        return prev
       }, {})
       ctx.setData(firstComputedObj)
      }
      function watch(ctx, obj) {
       Object.keys(obj).forEach(key => {
        defineReactive(ctx.data, key, ctx.data[key], function(value) {
         obj[key].call(ctx, value)
        })
       })
      }
    ```

### vue 的路由模式

- hash
  - 带#
  - window.localtion.hash获取
  - window.addEventListener('hashchange', this.onHashChange.bind(this))
  - 单页面标配，只改变前端路由，服务器端无用
- history
  - 不带#
  - H5的新api
  - window.history.pushState(stateObject, title, URL)/window.history.replaceState(stateObject, title, URL)
  - 需要服务端配置，否则会404

### vue的router和route的区别

1. router是vue-router的一个路由实例，允许你在 Vue 应用中定义和管理不同页面之间的路由，并提供路由导航、参数传递、动态路由匹配等功能
2. route是指代路由对象的一个概念，在路由切换时提供当前路由的信息
3. 通过 vue-router 配置路由规则和路由导航，同时通过 route 访问当前路由的详细信息，以实现页面间的router路由跳转和参数传递

### vue 的路由钩子(守卫)

- 全局守卫
  1. router.beforeEach 全局前置守卫 进入路由之前
  2. router.beforeResolve 全局解析守卫(2.5.0+) 在 beforeRouteEnter 调用之后调用
  3. router.afterEach 全局后置钩子 进入路由之后
- 路由独享守卫
  1. beforeEnter 与全局前置守卫的方式一样，只不过只运用与一个路由
- 路由组建内守卫
  1. beforeRouteEnter 进入路由前, 在路由独享守卫后调用 不能 获取组件实例 this，组件实例还没被创建
  2. beforeRouteUpdate (2.2) 路由复用同一个组件时, 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 this
  3. beforeRouteLeave 离开当前路由时, 导航离开该组件的对应路由时调用，可以访问组件实例 this

### vue 的组件传值

1. 父传子：props
2. 子传父：\$emit,\$on
3. 兄弟之间:$bus
4. vuex
5. provide/inject
6. \$parent/\$children/ref
7. \$attrs/\$listeners

### vue中key 的作用

vue 的 dom 渲染是虚拟 dom，数据发生变化时，diff 算法会只比较更改的部分，如果数据项的顺序被改变，Vue 将不是移动 DOM 元素来匹配数据项的改变，而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。vue3相比vue2对于diff算法更智能

#### vue2

vue2中key只作用于v-for里的key，主要用于优化列表渲染时的虚拟 DOM 重用，以提高性能

#### vue3

由于使用了新的响应式原理，它除了在v-for使用外，可以在组件中使用

### vuex 是什么？怎么使用？哪种功能场景使用它？

1. vuex 就是一个仓库，仓库里放了很多对象。其中 state 就是数据源存放地，对应于一般 vue 对象里面的 data
   state 里面存放的数据是响应式的，vue 组件从 store 读取数据，若是 store 中的数据发生改变，依赖这相数据的组件也会发生更新

   - state
     Vuex 使用单一状态树,即每个应用将仅仅包含一个 store 实例，但单一状态树和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据。
   - mutations
     mutations 定义的方法动态修改 Vuex 的 store 中的状态或数据。
   - getters
     类似 vue 的计算属性，主要用来过滤一些数据。
   - action
     actions 可以理解为通过将 mutations 里面处里数据的方法变成可异步的处理数据的方法，简单的说就是异步操作数据。view 层通过 store.dispath 来分发 action。

2. 使用方式和场景

   - 使用 Vuex 解决非父子组件之间通信问题
     vuex 是通过将 state 作为数据中心、各个组件共享 state 实现跨组件通信的，此时的数据完全独立于组件，因此将组件间共享的数据置于 State 中能有效解决多层级组件嵌套的跨组件通信问题。

   - vuex 作为数据存储中心
     vuex 的 State 在单页应用的开发中本身具有一个“数据库”的作用，可以将组件中用到的数据存储在 State 中，并在 Action 中封装数据读写的逻辑。这时候存在一个问题，一般什么样的数据会放在 State 中呢？ 目前主要有两种数据会使用 vuex 进行管理：
     1、组件之间全局共享的数据
     2、通过后端异步请求的数据
     比如做加入购物车、登录状态等都可以使用 Vuex 来管理数据状态。

### 做过哪些 Vue 的性能优化

- 编码阶段
  - 尽量减少 data 中的数据，data 中的数据都会增加 getter 和 setter，会收集对应的 watcher
  - v-if 和 v-for 不能连用，如果需要使用 v-for 给每项元素绑定事件时使用事件代理
  - SPA 页面采用 keep-alive 缓存组件在更多的情况下，使用 v-if 替代 v-show
  - key 保证唯一
  - 使用路由懒加载、异步组件
  - 防抖、节流
  - 第三方模块按需导入
  - 长列表滚动到可视区域动态加载图片
  - 懒加载

  1. 合理使用computed属性
  2. 合理使用v-if和v-show
  3. 使用按需加载，第三方模块按需导入
  4. 合理使用异步组件
  5. 列表性能优化，虚拟滚动
  6. 使用路由懒加载
  7. 合理使用keep-alive，缓存请求数据
- 打包优化
  - 压缩代码
  - Tree Shaking/Scope Hoisting
  - 使用 cdn 加载第三方模块
  - 多线程打包 happypack
  - splitChunks 抽离公共文件
  - sourceMap 优化

  1. 代码缓存，添加contenthash
  2. 代码压缩
  3. 资源优化，图片
  4. 代码拆分 splitChunks
  5. 模块分析，分析文件的大小
  6. 并行构建，happypack

### react vs vue

- 共同点
  1. 数据驱动视图
  2. 组件化
  3. 虚拟dom树

- 不同点
  1. 核心思想不同
  - vue：灵活易用的渐进式框架，进行数据拦截/代理，它对侦测数据的变化更敏感、更精确。
  - react：推崇函数式编程（纯组件），数据不可变以及单向数据流。（虽然可以双向，使用setState）
  2. 组件写法差异
  - Vue 推荐的做法是 template 的单文件组件格式(简单易懂，从传统前端转过来易于理解),即 html,css,JS 写在同一个文件(vue也支持JSX写法)
  - React推荐的做法是JSX + inline style, 也就是把 HTML 和 CSS 全都写进 JavaScript 中,即 all in js;
  3. diff算法不同
  - Vue：updateChildren是vue diff的核心, 过程可以概括为：
    - 旧children和新children各有两个头尾的变量StartIdx和EndIdx，它们的2个变量相互比较，一共有4种比较方式。
    - 如果4种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，变量会往中间靠，一旦StartIdx>EndIdx表明旧children和新children至少有一个已经遍历完了，就会结束比较。
  - react首先对新集合进行遍历，for( name in nextChildren)。
    - 通过唯一key来判断老集合中是否存在相同的节点。如果没有的话创建
    - 如果有的话，if (preChild === nextChild )
      - 会将节点在新集合中的位置和在老集合中lastIndex进行比较
      - 如果if (child._mountIndex < lastIndex) 进行移动操作，否则不进行移动操作。
    - 如果遍历的过程中，发现在新集合中没有，但在老集合中有的节点，会进行删除操作。
  4. 响应式原理不同
  - Vue：
      1. Vue依赖收集，自动优化，数据可变。
      2. Vue递归监听data的所有属性,直接修改。
      3. 当数据改变时，自动找到引用组件重新渲染。
  - React基于状态机，手动优化，数据不可变，需要setState驱动新的state替换老的state。当数据改变时，以组件为根目录，默认全部重新渲染, 所以 React 中会需要 shouldComponentUpdate 这个生命周期函数方法来进行控制

### 有没有看过vue2源码？

- nextTick
  - 能力检测(是否支持promise，MutationObserver，setImmediate,setTimeout)
  - 将传入cb压入callbacks数组中，同时接受第一个回调函数时执行能力检测，遍历数组，调用相应的回调函数。
- watch
  - 初始化
  - initState=>initWatch=>createWatcher=>new Watcher
  - 依赖收集和手动触发，get()=>update()
    (因为this.get()，需要获取到监听的值，这样就相当于触发了监听值的getter，从而触发了 监听值的 dep.depend()又因为这时候的 Dep.target 指向的是 watch-watcher，这样就相当于 监听值 收集到 watch-watcher 进了它的 Dep里)
- computed
  - 初始化
  - initState=>initComputed
  - 获取用户的get=>definedComputed
  - 返回使用 Object.defineProperty 在 实例上computed 属性，所以可以直接访问，createComputedGetter 包装返回 get 函数
  - 如果 computed 依赖的数据变化，dirty 会变成true，从而重新计算，然后更新缓存值 watcher.value
  - Watcher

### vue3的特性

之前已汇总到note里，可参考[传送门](!<https://github.com/sqh17/notes/blob/master/ways/vue3/%E7%89%B9%E6%80%A7%26%E5%8C%BA%E5%88%AB%26%E6%9E%B6%E6%9E%84%26%E9%92%A9%E5%AD%90.md>
下面是面试回答:
vue3相对于vue2有了更大的变化，vue3的新特性主要包含以下部分：

1. 采用新的响应式原理，用ES6的proxy代替ES5的Object.defineProperty，主要解决了对象，数组的更新检测，优化了性能
2. 采用composition api，方便逻辑复用
3. 采用新的虚拟dom算法，使用patchFlag标记，不用一个一个去比较，而是通过patch flag去进行相应的更新。
4. template 模板可以有多个根元素 Fragment
5. tree-shaking，分包，按需加载
6. 采用Typescript进行源码编写，更好类型推导，更严谨。

### vue3相对于vue2的区别

之前已汇总到note里，可参考[传送门](!https://github.com/sqh17/notes/blob/master/ways/vue3/%E7%89%B9%E6%80%A7%26%E5%8C%BA%E5%88%AB%26%E6%9E%B6%E6%9E%84%26%E9%92%A9%E5%AD%90.md)
下面是面试回答:
vue3相对于vue2的区别主要分为以下部分：

1. 向下兼容，vue3可以兼容vue2的写法
2. vue3对比vue2具有明显的性能提升，打包容量更小，渲染速度更快
3. 使用Proxy代替defineProperty实现响应式数据

    1. vue2的大部分问题不能监听到对象属性的添加和删除，需要Vue.set()来添加和删除，不能通过下标替换元素或更新length，所以会重写部分数组的方法。
    2. vue3通过Proxy拦截对data任意属性的任意操作, 包括属性值的读写, 属性的添加, 属性的删除等
4. 性能提升
    1. 静态标记，vue2从根节点开始对虚拟dom进行全量对比，vue3新增了静态标记 与上次虚拟dom对比的时候，只对比带有 patchFlags 的节点。跳过一些静态节点对比
    2. 静态提升，vue2里每当触发更新的时候，不管元素是否参与更新，每次都会重新创建；vue3为了避免每次渲染的时候都要重新创建这些对象，会把不参与更新的元素保存起来，只创建一次，每次复用
    3. 事件缓存，vue2里绑定事件都要重新生成新的function去更新，vue3会自动生成一个内联函数，同时生成一个静态节点。onclick时会读取缓存，如果缓存没有的话，就把传入的事件存到缓存里

### vue绑定原理

在初始化时，Vue 通过代理（Proxy）或 Object.defineProperty 方法对对象数据的 getter 和 setter 进行劫持。当数据发生改变时，这些 getter 和 setter 方法会被触发。接下来就是依赖收集的过程，当属性被访问时，在 getter 方法中会创建一个 Watcher 对象，并将该 Watcher 对象添加到对应属性的依赖收集器（Dep）中。当属性发生改变时，会触发 setter 方法，通知对应的 Dep 进行通知操作，进而触发依赖收集器中保存的 Watcher 对象进行更新操作，从而实现数据的响应式更新。

### vue2和vue3的diff算法区别

1. vue2的diff算法依靠的是双指针的方式，从根节点开始一层一层将新节点和旧节点进行比较，然后再进行dom增删改
2. vue3的diff算法是新增了一个静态标记，将每个节点都有对应的静态标记，当进行createblock方法的时候，会忽略所有的静态节点，直接通过patchFlag去找对应的节点然后进行don增删改

### vue3 setup

setup是个语法糖，用于替代 Vue 2 中的 beforeCreate 和 created 钩子函数，并提供更直接的响应式数据、计算属性、方法等

### vue3的watch和watchEffect的区别

1. watch是显式监听某个值或响应对象，当这些发生变化后会触发对应的回调函数
2. watchEffect 会自动追踪函数内部的响应式依赖，无需显式指定要观察的数据，回调函数不接收参数

### v-model原理

#### vue2

v-model实际上就是一个语法糖，它会根据标签的不同，自动转换成不同的属性，比如input标签，会转换成value和input事件，select标签会转换成value和change事件，textarea标签会转换成value和input事件。
他将这些表单元素的值和data里的对象进行绑定，当表单元素的值发生变化的时候，会触发对应的事件，从而改变data里的值，当data里的值发生变化的时候，会触发对应的事件，从而改变表单元素的值，这样实现了双向绑定。

#### vue3

vue3中兼容vue2的做法，可以支持表单类型的自定义组件，通过modelValue和update:modelValue来实现双向绑定，也可以支持自定义事件，通过emit触发自定义事件，从而实现双向绑定。

### v-model自定义组件的实现

通过props和emit触发父组件的事件，实现双向绑定，比如通过input事件触发父组件的update:modelValue事件，然后通过modelValue属性传递给子组件，子组件通过emit触发input事件，从而实现双向绑定。

### keep-alive原理

通过keep-alive标签，将组件包裹起来，放进内存中，切换的时候是不会被销毁的，下次切换的时候直接读缓存中的组件实例，但dom并不会保存，根据组件最近使用状态，采用lru缓存策略，销毁很久没使用的组件实例，从而达到缓存的目的。

下次进来的时候是进activated钩子函数，跳过beforeCreate和created

#### vue是如何收集依赖的

vue有个依赖收集机制，vue通过proxy/defineproperty对data进行劫持，当读取data的属性的时候，会触发get方法，将当前的watcher添加到dep中，当修改data的属性的时候，会触发set方法，通知dep中的watcher进行更新。这样，页面上相关的组件会得到更新，保持与数据的同步。

### vue的template到render的过程

1. 解析template，生成ast语法树，遍历模板的每个节点，并其转为对应的ast节点
2. 优化静态节点，标记静态节点，标记出那些在渲染过程中保持不变的静态节点。静态节点在渲染时会被标记，并且每次渲染时会被复用，从而提升渲染性能
3. 生成render函数，将ast语法树转成render函数
4. 生成虚拟dom，将render函数执行，生成虚拟dom，比较，更新
5. 生成真实dom，将虚拟dom转成真实dom

### vue实例挂载的过程

1. 创建vue实例，通过 new Vue() 创建一个 Vue 实例。在创建实例时，需要传入一个配置对象，其中包含组件的选项，如数据、模板、方法等
2. 初始化生命周期钩子，在创建 Vue 实例后，会初始化一些生命周期钩子函数，这些钩子函数将在后续的挂载过程中依次被调用
3. 数据响应式处理，Vue 实例会对配置对象中的 data 数据进行响应式处理，将数据转换为 getter 和 setter，以便在数据变化时更新相关视图
4. 编译模板，Vue 实例会编译配置对象中的模板，将其转换为渲染函数。这个过程中，Vue 会解析模板中的指令、插值表达式等，并生成对应的虚拟 DOM
5. 挂载 Vue 实例，一旦完成模板的编译，Vue 将会调用 mount() 方法来挂载 Vue 实例。在挂载过程中，Vue 实例将创建真实的 DOM 元素，并将其替换或插入 DOM 中指定的挂载点
6. 渲染视图，一旦 Vue 实例被挂载到 DOM 中，它将开始渲染视图。Vue 实例的渲染过程通过执行之前编译的渲染函数来完成，该函数生成的虚拟 DOM 将被渲染到实际的 DOM 中
7. 完成挂载，当 Vue 实例完成渲染视图后，它会调用 mounted() 钩子函数，表示实例已经被完全挂载到 DOM 中，并可以执行一些需要在挂载完成后执行的操作
