# 开头

该部分就是记录面试的问题以及回答

#### 1025面试

1. url输入到页面展示的过程，dom渲染过程
    前者忽略，说后者
    1. 解析html，构建dom树，自上而下，自左向右的顺序解析html元素，并将他们转为dom节点，形成依赖关系的树状层次树
    2. 构建render树，在解析html中，会解析css，生成cssom树，两者相结合，形成render树，并计算几何信息，盒模型的尺寸位置
    3. 布局layout，浏览器进行布局计算，确定每个节点的准确位置和大小
    4. 绘制painting，根据布局计算的结果，将页面绘制在屏幕上
    5. 合成，绘制完成后，浏览器会将绘制结果合成为一张或多张页面表面（Layer），可以减少页面的重绘和重排次数，并提高渲染性能。
2. 两栏布局，左侧固定200px;右侧自适应，五种方式

    ```html
    <div class='con'>
      <div class="left"></div>
      <div class="right"></div>
    </div>
    ```

    1. flex

        ```css
        .con{
          display: flex;
        }
        .left{
          width: 200px;
        }
        .right{
          flex: 1;
        }
        ```

    2. grid

        ```css
        .con{
          display: grid;
          grid-template-columns: 200px 1fr;
        }
        ```

    3. position

        ```css
        .con{
          position: relative;
        }
        .left{
          position: absolute;
          left: 0;
          top: 0;
          width: 200px;
        }
        .right{
          margin-left: 200px;
        }
        ```

    4. margin

        ```css
        .con{
          oveflow: hidden;
        }
        .left{
          float: left;
          width: 200px;
        }
        .right{
          margin-left: 200px;
        }

        ```

    5. float

        ```css
        .con{
          oveflow: hidden;
        }
        .left{
          float: left;
          width: 200px;
        }
        .right{
          margin-left: 200px;
        }
        ```

3. 怎么判断已滚动到底部

  ```javascript
  function isScrollAtBottom() {
    // 获取当前滚动位置
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // 获取页面可视区域的高度
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // 获取页面内容总高度
    var documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // 判断是否滚动到底部
    if (scrollPosition + windowHeight >= documentHeight) {
      return true;
    } else {
      return false;
    }
  }

  ```

4. 怎么判断对象是空对象

    1. for in
    2. Object.keys(obj).length === 0
    3. JSON.stringify(obj) === '{}'
    4. Object.getOwnPropertyNames(obj).length === 0
    5. Reflect.ownKeys(obj).length === 0
    6. Object.values(obj).length === 0
    7. Object.entries(obj).length === 0

5. 移动端如何画1px的线，太粗了

    1. 使用 CSS 的 border-width 和 transform 属性

          ```css
          .line {
            position: relative;
            border-top: 1px solid #000;
            transform: scaleY(0.5);
          }
          ```

    2. 使用 CSS 的 ::before 或 ::after 伪元素以及 transform 属性

          ```css
          .line {
            position: relative;
          }
          .line::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 1px;
            background-color: #000;
            transform: scaleY(0.5);
          }
          ```

    3. svg

          ```html
          <svg class="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
            <line x1="0" y1="0.5" x2="1" y2="0.5" stroke="#000" stroke-width="1" />
          </svg>
          ```

    4. canvas

          ```javascript
          var canvas = document.getElementById('lineCanvas');
          var context = canvas.getContext('2d');
          var devicePixelRatio = window.devicePixelRatio || 1;
          var backingStoreRatio = context.webkitBackingStorePixelRatio || 1;
          var ratio = devicePixelRatio / backingStoreRatio;
          var lineWidth = 1 * ratio;

          canvas.width = canvas.offsetWidth * ratio;
          canvas.height = 1 * ratio;

          context.lineWidth = lineWidth;
          context.strokeStyle = '#000';
          context.beginPath();
          context.moveTo(0, 0.5);
          context.lineTo(canvas.width, 0.5);
          context.stroke();
          ```

6. 上机题
  略

#### 1101面试

1. 对es6的Map理解
  比普通对象多了键名的多样性，键名可以是任何数据类型，括对象、函数、NaN 等，保持插入顺序，提供了一些方法，使Map的使用更加方便
2. for in和for of的区别
  for in是对普通对象的遍历，其中也可遍历数组(数组也是对象的一种),注意，for in能遍历对象原型链上的可枚举属性
  for of是可迭代对象的遍历，其中包括数组、字符串、Set、Map，for...of 只能迭代实现了迭代器协议（Iterable Protocol）的对象，它会按照对象的迭代顺序逐个遍历元素。对于普通对象而言，无法使用 for...of 遍历，需要将其转换为可迭代对象（如使用 Object.keys()、Object.values() 或 Object.entries()）
3. cache-control：no-store
  浏览器不要缓存该响应以及该响应对应的页面或资源  
4. 负载均衡（url到页面渲染）？
  负载均衡器可以将请求分发到多个服务器上，以平衡服务器上的负载，并不是快速响应，快速响应是cdn做的，cdn具有地理位置分布，内容缓存，智能路由，负载均衡
5. 屏幕适配
  主要结合meta的设置和js方法

    ```javascript
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    function setHtmlFontSize(maxWidth,minWidth,piex) {
      var screenWidth = document.documentElement.clientWidth,
        deviceWidth;
      if(screenWidth >= 1500){
      deviceWidth = maxWidth;
      }else if(screenWidth < minWidth){
      deviceWidth = minWidth;
      }else {
      deviceWidth = screenWidth;
      }
      document.getElementsByTagName("html")[0].style.cssText = 'font-size:' + deviceWidth / piex + 'px !important';
    }
    ```

6. css动画
CSS动画主要有两种形式：关键帧动画（Keyframe Animations）和过渡动画（Transitions）
过渡动画是关键帧动画的一种简化形式，使用起来更简单快捷。过渡动画适用于一些简单的状态转换，而关键帧动画则适用于更复杂、精细度更高的动画效果
7. webview
8. options复杂请求是什么
OPTIONS 方法通常用于 CORS（跨域资源共享）中的预检请求，也称为复杂请求，预检请求的目的是询问服务器是否允许实际请求（比如 POST、PUT、DELETE）的发送
跨域请求是指浏览器向不同于当前页面所在域的服务器发送请求。为了确保安全，浏览器会在发送复杂请求之前先发送一个 OPTIONS 请求，以检查服务器是否允许该跨域请求
触发条件
    1. 使用自定义请求头（比如 Content-Type: application/json）。
    2. 使用了非简单请求方法（比如 PUT、DELETE）。
    3. 发送跨域请求时携带了身份凭证（如 cookies）
1. 微前端了解吗，js隔离/css隔离怎么处理
2. express和koa的区别
3. 洋葱模型的原理
4. async和defer区别
两者都是异步加载，区别在于就是async不会阻塞html的解析和渲染，脚本的加载和html加载是并行进行的，他俩谁先加载完就先执行谁，执行js的话会暂停dom渲染，defer是在dom解析完后按照顺序执行脚本，即在domContentload事件之前完成

#### 1106面试

1. react的生命周期
2. react用的哪个版本，有什么不一样的地方
3. for in 和 for of
    1. 遍历对象类型：
        * for…in 循环用于遍历对象的可枚举属性。它会遍历对象的原型链上的所有可枚举属性（包括继承的属性），并返回属性名，
        * for…of 循环用于遍历可迭代对象，如字符串、数组、Set、Map、Generator 等。它会遍历对象的元素值，而不是属性名。
    2. 遍历顺序：for in没有顺序，for of有顺序
    3. 遍历结果：for in是键名，for of是值
4. vue-router的原理
基于 Vue.js 的核心思想——组件化开发。它通过监听 URL 变化，根据路由配置匹配对应的组件，并动态渲染到指定容器中，实现前端路由的跳转和导航。
主要流程如下：
    * 定义路由配置
    * 创建router实例
    * 注入router
    * 监听url的变化
    * 路由匹配
    * 渲染组件
    * 导航控制

5. vue的computed和watch的区别
6. webpack的loader有哪些
babel-loader将es6语法转为es5语法
css-loader加载css文件并解析import的css文件，最终返回css码
ts-loader将加载js一样加载ts
html-loader将html导出字符串，需要传入静态资源的引用路径
less-loader/sass-loader/stylus-loader/postcss-loader编译对应的css预处理器
vue-loader加载vue文件并编译
