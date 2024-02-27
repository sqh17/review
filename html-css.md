# html和css部分

- [html和css部分](#html和css部分)
  - [让元素隐藏有哪些方法？](#让元素隐藏有哪些方法)
  - [让元素垂直水平居中有哪些方法？](#让元素垂直水平居中有哪些方法)
  - [html5 和 css3 新增了哪些？](#html5-和-css3-新增了哪些)
  - [html5 标签语义化（=\>九）](#html5-标签语义化九)
  - [svg 和 canvas 的区别（=\>九）](#svg-和-canvas-的区别九)
  - [display:flex 各个属性](#displayflex-各个属性)
    - [容器属性](#容器属性)
    - [项目属性](#项目属性)
  - [display:grid 各个属性](#displaygrid-各个属性)
    - [容器属性](#容器属性-1)
    - [项目属性](#项目属性-1)
  - [BFC](#bfc)
  - [清除浮动](#清除浮动)
  - [伪类/伪元素](#伪类伪元素)
  - [position](#position)
  - [置换元素/非置换元素](#置换元素非置换元素)
  - [移动端如何做适配？](#移动端如何做适配)
  - [doctype](#doctype)
  - [meta 的作用，包含什么？](#meta-的作用包含什么)
  - [link和@import的区别](#link和import的区别)
  - [重排和重绘](#重排和重绘)

### 让元素隐藏有哪些方法？

- 完全隐藏：元素从渲染树中消失，不占据空间。

  - display: none;
  - \<div hidden>\</div>

- 视觉上的隐藏：屏幕中不可见，占据空间。

  - visibility: hidden;
  - 设置 posoition 为 relative absolute 或 fixed， 通过设置 top、left 等值
  - 设置 margin 负值，将其移出可视区域范围（可视区域占位）。
  - transform: scale(0)/translateX(-99999px)/rotateY(90deg);
  - 宽高为 0，字体大小为 0
  - 宽高为 0，超出隐藏:
  - opacity: 0;
  - 层级覆盖，z-index 属性负值
  - clip-path: polygon(0 0, 0 0, 0 0, 0 0); clip-path 裁剪

- 语义上的隐藏：读屏软件不可读，但正常占据空。
  - aria-hidden 属性

### 让元素垂直水平居中有哪些方法？

- 元素的宽高已知

  - text-align + line-height

        .box{
         width:200px;
         height:200px;
         display:inline-block;
         text-align:center;
         line-height:100px;
        }
        .children-box {
         width: 100px;
         height: 100px;
        }

  - position + calc

        .box{
         width:200px;
         height:200px;
         position:relative;
        }
        .children-box {
         width: 100px;
         height: 100px;
         position:absolute;
         left:calc(50% - 50px);
         top:calc(50% - 50px);
        }

  - position + margin 负值

        .box {
         width: 200px;
         height: 200px;
         border: 1px solid red;
         position: relative;
        }
        .children-box {
         position: absolute;
         width: 100px;
         height: 100px;
         background: yellow;
         left: 50%;
         top: 50%;
         margin-left: -50px;
         margin-top: -50px;
        }

  - 绝对定位 + left/right/bottom/top + margin

        .box {
         width: 200px;
         height: 200px;
         border: 1px solid red;
         position: relative;
        }
        .children-box {
         position: absolute;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0px;
         background: yellow;
         margin: auto;
         height: 100px;
         width: 100px;
        }

  - grid

        .box {
          width: 200px;
          height: 200px;
          border: 1px solid red;
          display: grid;
        }
        .children-box {
          width: 100px;
          height: 100px;
          background: yellow;
          margin: auto;
        }

- 元素的宽高未知

  - display:flex

        .box{
         display:flex;
         justify-content:center;
         align-items:center;
        }

  - position + transform

        .box{
         position:absolute;
         top:50%;
         left:50%;
         transform:translate(-50%,-50%)
        }

  - display:table

        .box{
         text-align:center;
         display:table-cell;
         vertical-align: middle;
         text-align:center;
        }
        .children-box{
         display:inline-block;
        }

  - grid

        .box {
         width: 200px;
         height: 200px;
         border: 1px solid red;
         display: grid;
        }
        .children-box {
         background: yellow;
         align-self: center;
         justify-self: center;
        }

  - gird + margin 布局

        .box {
         width: 200px;
         height: 200px;
         border: 1px solid red;
         display: grid;
        }
        .children-box {
         background: yellow;
         margin: auto;
        }

### html5 和 css3 新增了哪些？

- html5

  - 语义化标签
  - 表单元素
    - 新增表单元素
      - \<datalist>\</datalist> 元素规定输入域的选项列表,使用 \<input> 元素的 list 属性与 <datalist> 元素的 id 绑定
      - \<keygen>\</keygen> 提供一种验证用户的可靠方法,标签规定用于表单的密钥对生成器字段。
      - \<output> 用于不同类型的输出,比如计算或脚本输出
    - input type 值
      - color | date | datetime | email | number | tel | url | search
    - input 属性
      - placehoder 属性，简短的提示在用户输入值前会显示在输入域上。即我们常见的输入框默认提示，在用户输入后消失。
      - required 属性，是一个 boolean 属性。要求填写的输入域不能为空
      - pattern 属性，描述了一个正则表达式用于验证\<input> 元素的值。
      - min 和 max 属性，设置元素最小值与最大值。
      - step 属性，为输入域规定合法的数字间隔。
      - height 和 width 属性，用于 image 类型的 \<input> 标签的图像高度和宽度。
      - autofocus 属性，是一个 boolean 属性。规定在页面加载时，域自动地获得焦点。
      - multiple 属性 ，是一个 boolean 属性。规定\<input> 元素中可选择多个值。
  - 新增标签

    - 音频和视频

      - \<audio>\</audio>

            <audio controls>
             <source src="horse.ogg" type="audio/ogg">
             <source src="horse.wav" type="audio/ogg">
             <source src="horse.mp3" type="audio/mpeg">您的浏览器不支持 audio 元素。
            </audio>

        1. control 属性供添加播放、暂停和音量控件。
        2. 在\<audio> 与 \</audio> 之间你需要插入浏览器不支持的\<audio>元素的提示文本。
        3. \<audio> 元素允许使用多个 \<source> 元素. \<source> 元素可以链接不同的音频文件，浏览器将使用第一个支持的音频文件。
        4. 目前, \<audio>元素支持三种音频格式文件: MP3, Wav, 和 Ogg

      - \<video>\</video>

             <video width="320" height="240" controls>
              <source src="movie.mp4" type="video/mp4">
              <source src="movie.ogg" type="video/ogg">
             您的浏览器不支持Video标签。
             </video>

        1. control 提供了 播放、暂停和音量控件来控制视频。也可以使用 dom 操作来控制视频的播放暂停，如 play() 和 pause() 方法.
        2. 同时 video 元素也提供了 width 和 height 属性控制视频的尺寸.如果设置的高度和宽度，所需的视频空间会在页面加载时保留。如果没有设置这些属性，浏览器不知道大小的视频，浏览器就不能再加载时保留特定的空间，页面就会根据原始视频的大小而改变。
        3. 与标签之间插入的内容是提供给不支持 video 元素的浏览器显示的。
        4. video 元素支持多个 source 元素. 元素可以链接不同的视频文件。浏览器将使用第一个可识别的格式（ MP4, WebM, 和 Ogg）

    - canvas 画布

          <canvas id="myCanvas" width="200" height="100"></canvas>

          var c=document.getElementById("myCanvas");
          var ctx=c.getContext("2d");
          ctx.moveTo(0,0); // 定义线条开始坐标
          ctx.lineTo(200,100); // 划线
          ctx.stroke(); // 闭合
          ctx.font="30px Arial";
          ctx.fillText("Hello World",10,50); // 填充的文本
          ctx.strokeText("Hello World",10,50); // 绘制的文本
          var img=document.getElementById("scream");
          ctx.drawImage(img,10,10); // 放置图像
          // ctx..arc( x, y, r, start angle, end angle, ANIT-CLOCKWISE(TRUE/FALSE) );

    - svg 矢量图  
      SVG 是指可伸缩的矢量图形。是 XML 格式定义图形
      可以进行类似于 dom 操作，通过 ps 合成 svg，代码里面就是 xml。

    - drag 和 drop 拖拽

      1. 即抓取对象以后拖到另一个位置。在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。即将元素添加 draggable，就变成可拖动元素。
      2. 拖放的过程分为源对象和目标对象。源对象是指你即将拖动元素，而目标对象则是指拖动之后要放置的目标位置。
      3. 对源对象操作的方法：I. ondragstart（用户开始拖动元素时触发）II.<font color='purple'> ondrag（ 元素正在拖动时触发）</font>III. ondragend （用户完成元素拖动后触发）
      4. 放置目标对象的方法：I. ondragenter （当被鼠标拖动的对象进入其容器范围内时触发此事件）II. ondragover (当某被拖动的对象在另一对象容器范围内拖动时触发此事件) III. ondragleave (当被鼠标拖动的对象离开其容器范围内时触发此事件) IIII <font color="purple">ondrop (在一个拖动过程中，释放鼠标键时触发此事件)</font>
      5. 通过 ev.dataTransfer.getData("Text") 方法获得被拖的数据。该方法将返回在 ev.dataTransfer.setData("Text",xxx)方法中设置为相同类型的任何数据。
      6. 例子参考 '<https://www.runoob.com/html/html5-draganddrop.html>'

    - Geolocation 地理定位  
      用于定位用户的位置

    - Web Worker

      1. 定义  
          运行在后台的 JavaScript，不会影响页面的性能，Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。
      2. Web Worker 有以下几个使用注意点
          1. 必须同源。
          2. 不能操作 dom 对象。
          3. Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成
          4. Worker 线程不能执行 alert()方法和 confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。
          5. Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。
      3. 简单使用

          ```html
          <div id="num"></div>
          <input type="number" />
          <button>发送</button>
          <button>停止</button>
          ```

          ```javasript
          var w = new Worker("worker.js");  // 需要在server服务下运行，虽然是本地文件。
          //子线程向主线程传递消息
           w.addEventListener("message", function (e) { //监听子线程的message事件
            document.getElementById("num").innerText = JSON.parse(e.data).num;
           })
           //主线程向子线程传递消息
           var btn = document.getElementsByTagName("button")[0];
           btn.onclick = function () {
            var num = document.getElementsByTagName("input")[0].value;
            w.postMessage(num); //向子线程发送message事件

           }
           var stopBtn = document.getElementsByTagName("button")[1];
           stopBtn.οnclick = function () {
            w.terminate(); //停止webworker
           }
          ```

          ```javascript
          // work.js
          addEventListener("message", function (e) {
            obj.num = e.data * 2;
            postMessage(JSON.stringify(obj));
          });
          ```

    - Web Storage 存储

      - sessionStorage // 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据
      - localStorage // 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除

    - WebSocket  
      一种在单个 TCP 连接上进行全双工通讯的协议。  
      在 WebSocket API 中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送

- css3
  - 选择器
    1. querySelector()/querySelectorAll()
    2. ele:nth-child()/ele:first-child/ele:last-child/ele:nth-child(odd/even)/ele::before/ele::after/ele:not(选择器)选择没有该选择器的元素/\[attribute^=value]
    3. box-sizing/border-radius/box-shadow/text-shadow/background-image:linear-gradient (方向 , 颜色 位置 , 颜色 位置)/background-image:radial-gradient(半径 at 位置 ,颜色 位置,颜色 位置)/background-clip/background-origin: padding-box/border-box/content-box/transition/transform:translate,rotato,scale,skew/calc()/animation:name 动画名称 动画总时间 动画延迟 动画速度/@font-face/@media/display:flex

### html5 标签语义化（=>九）

- 什么是标签语义化  
  用正确的标签做正确的事，把适当的标签用在合适的地方。是页面结构更加的清晰。
- 标签语义化的作用
  1. 使用 html 语义化，能使页面结构更清晰，便于解析。
  2. 有利于 SEO。搜索引擎爬虫依赖于 html 标签来确定上下文和关键字权重。
  3. 使用 html 语义化，在没有 css 样式的时候页面也能正确清晰的呈现
  4. 有利于各种设备的解析，如盲人阅读器，屏幕阅读器
  5. 有利于团队合作开发与维护。
- html5 标签有哪些？
  - \<title>\</title> 页面的标题，具有唯一性，标题的取名尽量包含网页几个关键字。
  - \<header>\</header> 网站的标志，主导航，搜索框等
  - \<nav>\</nav> 网站的导航。
  - \<mian>\</mian> 网页的主要内容，一个网页只能有一个
  - \<aside>\</aside>　　附注栏，比如侧栏，引述，产品列表，链接等。
  - \<footer>\</footer> 页脚

### svg 和 canvas 的区别（=>九）

- SVG 是一种使用 XML 描述 2D 图形的语言。
- Canvas 通过 JavaScript 来绘制 2D 图形。
- SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
- 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
- Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

### display:flex 各个属性

#### 容器属性

1. justify-content: flex-start/flex-end/center/space-between/space-around
2. align-items:flex-start/flex-end/center/baseline/stretch
3. flex-direction: row/column/row-reverse/column-reverse
4. flex-wrap: no-wrap/wrap/wrap-reverse
5. flex-flow:row wrap; // flex-direction和flex-wrap的缩写

#### 项目属性

1. order 项目的排列顺序。数值越小，排列越靠前，默认为 0（按代码书写的顺序来。）
2. flex-grow 项目的放大比例，默认为 0（即如果存在剩余空间，也不放大。）  
   如果 item 都为 1，则均等平摊整个空间。  
    如果有一个 item 和其他的 item 不相等，则按照比例放大。
3. flex-shrink 项目的缩小比例，默认为 1（即如果空间不足，该项目将缩小。）  
   如果 item 都相等，则均等平摊空间，若空间不足，则都等比例缩小。  
   如果有一个 item 为 0；当空间不足时，其不缩小。  
   ps：负值无效。
4. flex-basis 在分配多余空间之前，项目占据的水平上的空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。
5. flex 是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。  
   优先级：auto (1 1 auto) 或者 none （0 0 auto);
6. align-self 允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

7. flex:1  => flex:1 1 0%;

### display:grid 各个属性

#### 容器属性

1. grid-template-rows: 网格布局中的行数，并可定义每行的高度，该值是以空格分隔的列表，其中每个值定义相应行的高度
2. grid-template-columns：网格布局中的列数，并可定义每列的宽度，该值是以空格分隔的列表，其中每个值定义相应列的宽度
3. grid-template-areas：定义网格布局中的区域，该值是以空格分隔的列表，其中每个值定义相应区域的名称，区域名称由开发者自定义
4. grid-template：grid-template-rows、grid-template-columns 和 grid-template-areas 的简写
5. grid-row-gap：定义网格布局中的行间距
6. grid-column-gap：定义网格布局中的列间距
7. grid-gap：grid-row-gap 和 grid-column-gap 的简写
8. justify-content：定义网格布局中所有项目的水平对齐方式
9. align-content：定义网格布局中所有项目的垂直对齐方式

#### 项目属性

1. grid-row-start：定义网格布局中项目的起始行
2. grid-row-end：定义网格布局中项目的结束行
3. grid-row：grid-row-start 和 grid-row-end 的简写
4. grid-column-start：定义网格布局中项目的起始列
5. grid-column-end：定义网格布局中项目的结束列
6. grid-column：grid-column-start 和 grid-column-end 的简写
7. grid-area：grid-row-start、grid-column-start、grid-row-end 和 grid-column-end 的简写

### BFC

一个独立的区域，外部影响不了内部。
浮动元素和绝对定位素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）

- BFC触发条件
  - 根元素
  - 浮动元素：float 不为none的属性值
  - 绝对定位元素：position (absolute、fixed)
  - display为： inline-block、table-cells、flex、grid
  - overflow 除了visible以外的值 (hidden、auto、scroll)

### 清除浮动

- 兄弟之间 添加额外标签
  - clear:both
  - 缺点：增加额外的不必要的标签
- 父元素
  - 通过触发BFC
    - overflow:hidden
    - 缺点：内容增多的时候容易造成不会自动换行导致内容被隐藏掉，无法显示要溢出的元素

  - 双伪元素
    - clearfix::after/::before
      content:''; display:block; height:0; clear:both; visibility: hidden
    - clearfix
      zoom:1;// 触发haslayout

### 伪类/伪元素

- 伪类
  伪类用于当已有元素处于的某个状态时，为其添加对应的样式
- 伪元素
  伪元素用于创建一些不在文档树中的元素，并为其添加样式
  - ::before
  - ::after
  - ::first-letter 该伪元素向文本的第一个字母添加特殊样式
  - ::first-line 该伪元素向文本的首行添加特殊样式

### position

- static 静态定位的元素不受 top、bottom、left 和 right 属性的影响,正常流
- relative 相对定位，受top、bottom、left 和 right 属性的影响，不会脱离文档流
- absolute 绝对定位，元素相对于最近的定位祖先（除 static 以外的任何元素）进行定位。如果绝对定位的元素没有祖先，它将使用文档主体（body），并随页面滚动一起移动
- fixed 相对于视口定位的，这意味着即使滚动页面，它也始终位于同一位置
- sticky 粘性定位，结合了 position:relative 和 position:fixed 两种定位功能于一体的特殊定位，适用于一些特殊场景
  - 元素先按照普通文档流定位，然后相对于该元素在流中的 flow root（BFC）和 containing block（最近的块级祖先元素）定位。而后，元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。
  - 这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同

### 置换元素/非置换元素

- 置换元素
  1. 一个内容 不受CSS视觉格式化模型控制，CSS渲染模型并不考虑对此内容的渲染，且元素本身一般拥有固有尺寸（宽度，高度，宽高比）的元素，被称之为置换元素。
  2. 置换元素就是浏览器根据元素的标签和属性，来决定元素的具体显示内容。
  3. 例如浏览器会根据img标签的src属性的值来读取图片信息并显示出来，而如果查看(X)HTML代码，则看不到图片的实际内容；又例如根据input标签的type属性来决定是显示输入框，还是单选按钮等。
  4. HTML中的img、input、textarea、select、object都是置换元素。这些元素往往没有实际的内容，即是一个空元素。

- 非置换元素
  HTML 的大多数元素是不可替换元素，即其内容直接表现给用户端（例如浏览器\<\span> hello world </\span>)

### 移动端如何做适配？

1. html 文件添加 meta

        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
         // width    设置viewport宽度，为一个正整数，或字符串‘device-width’
         // device-width  设备宽度
         // height   设置viewport高度，一般设置了宽度，会自动解析出高度，可以不用设置
         // initial-scale    默认缩放比例（初始缩放比例），为一个数字，可以带小数
         // minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数
         // maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数
         // user-scalable    是否允许手动缩放

2. head 添加 script

        // 初始化
        setHtmlFontSize(1920,1024,19.2);
        // 当屏幕宽度发生变化时，触发
        if(window.addEventListener){
         window.addEventListener('resize',function(){
          setHtmlFontSize(1920,1024,19.2);
         },false);
        }
        /**
        *
        * @param {*} maxWidth 最大宽度
        * @param {*} minWidth 最小宽度
        * @param {*} piex 适配比例
        */
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

### doctype

document type（文档类型）的简写，doctype 是一种标准通用标记语言的文档类型声明，目的是告诉浏览器要使用什么样的文档类型定义(DTD)来解析文档。XHTML1.0 提供了三种 DTD 声明可供选择，分别是：strict（严格模式）,frameset（框架模式）,tranisitional（混杂模式）  
doctype 在 html 中的作用是触发浏览器的标准模式，如果 html 中省略了 doctype，浏览器会进入到混杂模式的状态也称之为兼容模式。在这种模式下有些样式，布局会和标准模式（或称严格模式）存在差异。标准，DOM 标准只规定了标准模式下的行为，没有对兼容模式做出规定，因此不同浏览器在兼容模式下的处理也是不同的，应用兼容模式比较困难，所以需要慎用。
过渡的(Transitional，也叫混杂模式)：要求比较宽松，允许继续使用 HTML4.01 的标识  
完整声明为 \<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "<http://www.w3.org/TR/xhtml1/DTD/xhtml1-tranisitional.dtd"\>> '
严格的(Strict)：要求严格的 DTD，不能使用任何表现层的标识和属性  
完整声明为\<!DOCTYPE html PUBLIC "-W3C//DTD XHTML 1.0 Strict//EN" "<http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"\>>  
框架的(Frameset)：专门针对框架页面设计使用的 DTD，如果页面中包含有框架，可以采用 DTD  
完整声明为\<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "<http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd"\>>

### meta 的作用，包含什么？

帮助主页被各大搜索引擎，定义页面的使用语言，自动刷新并指向新的页面，响应式页面指定。

- charset 指定字符编码

  \<meta charset="utf-8"\>  
  GB2312 == 简体中文  
  BIG5 == 繁体中文  
  iso-2022-jp == 日文  
  ks_c_5601 == 韩文
  ISO-8859-1 == 英文
  UTF-8 == 世界通用的语言编码

- http-equiv 相当于 http 的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为 content，content 中的内容其实就是各个参数的变量值。

  语法格式是：\<meta http-equiv="参数" content="参数变量值"\> ；其中 http-equiv 属性主要有以下几种
  参数：  
  A、Expires(期限)  
  说明：可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。  
  用法：\<meta http-equiv="expires" content="Fri, 12 Jan 2001 18:18:18 GMT"\>  
  注意：必须使用 GMT 的时间格式。

  B、Pragma(cache 模式)  
  说明：禁止浏览器从本地计算机的缓存中访问页面内容。  
  用法：\<meta http-equiv="Pragma" content="no-cache"\>  
  注意：这样设定，访问者将无法脱机浏览。

  C、Refresh(刷新)  
  说明：自动刷新并指向新页面。  
  用法：\<meta http-equiv="Refresh" content="2；URL=<http://www.root.net"\>>  
  注意：其中的 2 是指停留 2 秒钟后自动刷新到 URL 网址。

  D、Set-Cookie(cookie 设定)  
  说明：如果网页过期，那么存盘的 cookie 将被删除。  
  用法：\<meta http-equiv="Set-Cookie" content="cookievalue=xxx; expires=Friday, 12-Jan-2001 18:18:18 GMT； path=/"\>  
  注意：必须使用 GMT 的时间格式。

  E、Window-target(显示窗口的设定)  
  说明：强制页面在当前窗口以独立页面显示。  
  用法：\<meta http-equiv="Window-target" content="\_top"\>
  注意：用来防止别人在框架里调用自己的页面。

  F、content-Type(显示字符集的设定)  
  说明：设定页面使用的字符集。  
  用法：\<meta http-equiv="content-Type" content="text/html; charset=gb2312"\>

  G、X-UA-Compatible  
  X-UA-Compatible 是自从 IE8 新加的一个设置，对于 IE8 以下的浏览器是不识别的。 通过在 meta 中设置 X-UA-Compatible 的值，可以指定网页的兼容性模式设置。  
  \<meta http-equiv="X-UA-Compatible" content="IE=7"\> 通俗点说代表告诉 IE 浏览器，无论是否用 DTD 声明文档标准，IE8/9 都会以 IE7 引擎来渲染页面。如果 IE=8 或者 9 也是如此，以 IE8 或者 IE9 渲染页面  
  常见的是 \<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"\> 这里的 chrome=1 不是说 IE 的技术增强了可以模拟 Chrome 浏览器，而是与谷歌开发的 Google Chrome Frame(谷歌内嵌浏览器框架 GCF)有关。这个插件可以让用户的 IE 浏览器外观不变，但用户在浏览网页时实际上使用的是 Chrome 的内核，并且支持 Windows XP 及以上系统的 IE6/7/8。而上文提到的那个 meta 标记，则是在是安装了 GCF 后，用来指定页面使用 chrome 内核来渲染。

- name 方便 seo，告知搜索引擎该网页的信息

  A、keywords 关键字  
  说明：keywords 用来告诉搜索引擎你网页的关键字是什么。  
  举例：\<meta name ="keywords" content="science,education,culture"\>
  B、description(网站内容描述)  
  说明：description 用来告诉搜索引擎你的网站主要内容。  
  举例：\<meta name="description" content="这是一个 xxxxx 网页"\>
  C、robots(机器人向导)  
  说明：robots 用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。  
  content 的参数有 all,none,index,noindex,follow,nofollow。默认是 all。  
  举例：\<meta name="robots" content="none"\>
  D、author(作者)  
  说明：标注网页的作者  
  举例：\<meta name="author" content="<sqh17@foxmail.com>"\>

### link和@import的区别

1. @import是css提供的语法糖，只有导入css，link标签是html提供的标签，可以导入css，也可以定义RSS，rel链接符等
2. 加载页面不同，link引入css可以同时加载，不阻塞，但@import引入的css只能在页面加载完毕后再加载
3. 兼容性问题，link不存在兼容性问题，@import是css2有的，老式浏览器不支持
4. js操作，link可以操作link标签，但是@import是基于文档，无法操作

### 重排和重绘

重排和重绘是浏览器对页面重新渲染的一个过程
重排就是重新计算网页布局的过程
重绘是根据新的布局信息重新绘制网页的过程
两者的区别就是重排会导致元素的大小，尺寸，位置，内容的变化，重绘是在元素位置大小内容不变的情况下对元素的绘制
重排和重绘都会引起页面性能消耗，所以能减少重排重绘就最好
