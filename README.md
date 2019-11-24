#### 开头
为了备战面试，从其他的面试题或者想到的问题总结如下。

### 什么是二分查找，思路是什么？实现方式有哪些？

   * 二分查找：就是在一个已排序的数组中通过值去查找索引。 
   * 思路：  
      1.将已排序的数组折半，分成两个数组。  
      2.判断要查找的数和中间位置数值的大小，来判断要查找的数实在哪一半  
      3.之后继续折半查找，直至找到这个数。

   * 时间复杂度：O(log2n) => O(logn)
   * 代码实现：

      1.while方式

			/**
				* 
				* @param {*} arr 已排好的数组
				* @param {*} key 想要查找的值
				*/
				function binary_search(arr, key) {
						var low = 0,
								high = arr.length - 1;
						while (low <= high) {
								var mid = parseInt((high + low) / 2);
								if (key == arr[mid]) {
										return mid;
								} else if (key > arr[mid]) {
										low = mid + 1;
								} else if (key < arr[mid]) {
										high = mid - 1;
								} else {
										return -1;
								}
						}
				}
      2.递归方式

			/**
			* 
			* @param {*} arr 已排好的数组
			* @param {*} low 第一个值的索引
			* @param {*} high 最后一个值的索引
			* @param {*} key 想要查找的值
			*/
			function binary_search(arr,low,high,key){
				if (low > high) {
						return -1;
				}
				var mid = parseInt((high + low) / 2);
				if (arr[mid] == key) {
						return mid;
				} else if (arr[mid] > key) {
						high = mid - 1;
						return binary_search(arr, low, high, key);
				} else if (arr[mid] < key) {
						low = mid + 1;
						return binary_search(arr, low, high, key);
				}
			}

### this的指向有哪些？   
1. 函数里的this：作为普通函数，this指向window。
2. 对象的this：当函数作为对象的方法被调用时，this就会指向该对象.  
3. call，apply的this：指向调用该方法的对象
4. 箭头函数的this：在箭头函数里面，没有this ，箭头函数里面的 this 是继承外面的环境  
5. 构造函数的this： 指向new之后的对象。

	请看下面的例子给出答案

		var boss1 = {
			name: 'boss1',
			returnThis () {
				return this
			}
		}
		var boss2 = {
			name: 'boss2',
			returnThis () {
				return boss1.returnThis()
			}
		}
		var boss3 = {
			name: 'boss3',
			returnThis () {
				var returnThis = boss1.returnThis
				return returnThis()
			}
		}
		boss1.returnThis() // boss1
		boss2.returnThis() // boss1
		boss3.returnThis() // window
		
		// ----------
		function returnThis () {
			return this
		}
		var boss1 = { name: 'boss1' }
		returnThis() // window
		returnThis.call(boss1) // boss1
		returnThis.apply(boss1) // boss1

		// -------
		function returnThis () {
			return this
		}
		var boss1 = { name: 'boss1'}
		var boss1returnThis = returnThis.bind(boss1)
		boss1returnThis() // boss1
		var boss2 = { name: 'boss2' }
		boss1returnThis.call(boss2) // boss1  通过一个新函数来提供永久的绑定

		// --------
		function showThis () {
			console.log(this)
		}
		showThis() // window
		new showThis() // showThis {}
		var boss1 = { name: 'boss1' }
		showThis.call(boss1) // boss1
		new showThis.call(boss1) // TypeError
		var boss1showThis = showThis.bind(boss1)
		boss1showThis() // boss1
		new boss1showThis() // showThis

		//---------
		function callback (cb) {
			cb()
		}
		callback(() => { console.log(this) }) // window
		var boss1 = {
			name: 'boss1',
			callback: callback,
			callback2 () {
				callback(() => { console.log(this) })
			}
		}
		boss1.callback(() => { console.log(this) }) // window
		boss1.callback2(() => { console.log(this) }) // boss1

		// ------
		var returnThis = () => this
		returnThis() // window
		new returnThis() // TypeError
		var boss1 = {
			name: 'boss1',
			returnThis () {
				var func = () => this
				return func()
			}
		}
		returnThis.call(boss1) // window
		var boss1returnThis = returnThis.bind(boss1)
		boss1returnThis() // window
		boss1.returnThis() // boss1
		var boss2 = {
			name: 'boss2',
			returnThis: boss1.returnThis
		}
		boss2.returnThis() // boss2

### new实现了哪些步骤？(=>二)  
1. 创建一个新对象，  
2. 将构造函数的作用域赋给新对象（this指向新对象)。   
3. 执行构造函数的代码（为新对象添加属性或方法)。

### call和apply的定义和区别？(=>二)

	apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。

	call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即A对象调用B对象的方法

	从定义中可以看出，call和apply都是调用一个对象的一个方法，用另一个对象替换当前对象。

	而不同之处在于传递的参数，

	apply最多只能有两个参数——新this对象和一个数组arg，如果arg不是数组则会报错TypeError；
	call则可以传递多个参数，第一个参数和apply一样，是用来替换的对象，后边是参数列表。

### call和aplly的简单原生实现

* call的实现

		Function.prototype.myCall = function(){
			let [thisArg,...args] = [...arguments];
			if(!thisArg){
				thisArg = typeof window === 'undefined'? global : window;
			}
			thisArg.fn = this;
			let res = thisArg.fn(...args);
			delete thisArg.fn;
			return res;
		}

		let obj = {
			name:'peter',
			num:2
		}
		function foo(a,b){
			return `${a + b}, ${this.name}, ${this.num}`
		}
		console.log(foo.call(obj,3,4,5)); // 7 peter, 2
		console.log(foo.myCall(obj,3,4,5)); // 7 peter, 2

* apply的实现

		Function.prototype.myApply = function(context,rest){
			let res;
			if(!context){
				context = typeof window === 'undefined'? global : window;
			}
			context.fn = this;
			if(rest){
				res = context.fn(...rest)
			}else{
				res = context.fn()
			}
			delete context.fn;
			return res;
		}

		console.log(foo.apply(obj,[3,4])); // 7, peter, 2
		console.log(foo.myApply(obj,[3,4])) // 7, peter, 2

### bind的简单实现

	Function.prototype.myBind = function(){
		let [thisArg,...args] = [...arguments];
		let res;
		if(!thisArg){
			thisArg = typeof window === 'undefined'? global : window;
		}
		thisArg.fn = this;
		return function(){
			let all = [...args,...arguments]
			res = thisArg.fn(...all)
			delete thisArg.fn;
			return res
		}
	}
	console.log(foo.myBind(obj,3)(3,4,5))//6, peter, 2
	console.log(foo.bind(obj,3)(3,4,5)) // 6, peter, 2

### 让元素隐藏有哪些方法？

* 完全隐藏：元素从渲染树中消失，不占据空间。

	* display: none;
	* \<div hidden>\</div> 
* 视觉上的隐藏：屏幕中不可见，占据空间。

	* visibility: hidden;
	* 设置 posoition 为 relative absolute 或 fixed，通过设置 top、left 等值
	* 设置 margin 负值，将其移出可视区域范围（可视区域占位）。
	* transform: scale(0)/translateX(-99999px)/rotateY(90deg);
	* 宽高为0，字体大小为0
	* 宽高为0，超出隐藏:
	* opacity: 0;
	* 层级覆盖，z-index 属性负值
	* clip-path: polygon(0 0, 0 0, 0 0, 0 0); clip-path 裁剪
* 语义上的隐藏：读屏软件不可读，但正常占据空。
	* aria-hidden 属性

### 让元素垂直水平居中有哪些方法？

* 元素的宽高已知
	* text-align + line-height

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

	* position + calc

			.box{
				width:200px;
				height:200px;
				position:absolute;
				left:calc(50% - 100px);
				top:calc(50% - 100px);
			}
			.children-box {
				width: 100px;
				height: 100px;
			}

	* position + margin负值

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

	* 绝对定位 + left/right/bottom/top + margin

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

	* grid 

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

* 元素的宽高未知
	* display:flex

			.box{
				display:flex;
				justify-content:center;
				align-items:center;
			}

	* position + transform

			.box{
				position:absolute;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%)
			}

	* display:table

			.box{
				display:table;
				text-align:center;
				display:table-cell;
				vertical-align: middle;
			}

	* grid + flex

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

	* gird + margin布局

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
### html5和css3新增了哪些？
* html5 
	* 语义化标签
	* 表单元素
		* 新增表单元素
			* \<datalist>\</datalist> 元素规定输入域的选项列表,使用 \<input> 元素的 list 属性与 <datalist> 元素的 id 绑定
			* \<keygen>\</keygen> 提供一种验证用户的可靠方法,标签规定用于表单的密钥对生成器字段。
			* \<output> 用于不同类型的输出,比如计算或脚本输出
		* input type值
			* color | date | datetime | email | number | tel | url | search
		* input 属性
			* placehoder 属性，简短的提示在用户输入值前会显示在输入域上。即我们常见的输入框默认提示，在用户输入后消失。
			* required  属性，是一个 boolean 属性。要求填写的输入域不能为空
			* pattern 属性，描述了一个正则表达式用于验证\<input> 元素的值。
			* min 和 max 属性，设置元素最小值与最大值。
			* step 属性，为输入域规定合法的数字间隔。
			* height 和 width 属性，用于 image 类型的 \<input> 标签的图像高度和宽度。
			* autofocus 属性，是一个 boolean 属性。规定在页面加载时，域自动地获得焦点。
			* multiple 属性 ，是一个 boolean 属性。规定\<input> 元素中可选择多个值。
	* 新增标签
		* 音频和视频
			* \<audio>\</audio> 

					<audio controls>
						<source src="horse.ogg" type="audio/ogg">
						<source src="horse.wav" type="audio/ogg">
						<source src="horse.mp3" type="audio/mpeg">您的浏览器不支持 audio 元素。
					</audio>

				1. control 属性供添加播放、暂停和音量控件。  
				2. 在\<audio> 与 \</audio> 之间你需要插入浏览器不支持的\<audio>元素的提示文本。  
				3. \<audio> 元素允许使用多个 \<source> 元素. \<source> 元素可以链接不同的音频文件，浏览器将使用第一个支持的音频文件。  
				4. 目前, \<audio>元素支持三种音频格式文件: MP3, Wav, 和 Ogg

			* \<video>\</video>

						<video width="320" height="240" controls>
							<source src="movie.mp4" type="video/mp4">
							<source src="movie.ogg" type="video/ogg">
						您的浏览器不支持Video标签。
						</video>
				
				1. control 提供了 播放、暂停和音量控件来控制视频。也可以使用dom操作来控制视频的播放暂停，如 play() 和 pause() 方法.
				2. 同时 video 元素也提供了 width 和 height 属性控制视频的尺寸.如果设置的高度和宽度，所需的视频空间会在页面加载时保留。如果没有设置这些属性，浏览器不知道大小的视频，浏览器就不能再加载时保留特定的空间，页面就会根据原始视频的大小而改变。
				3. 与标签之间插入的内容是提供给不支持 video 元素的浏览器显示的。
				4. video 元素支持多个source 元素. 元素可以链接不同的视频文件。浏览器将使用第一个可识别的格式（ MP4, WebM, 和 Ogg）
		* canvas 画布

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



		* svg 矢量图  
			SVG是指可伸缩的矢量图形。是XML 格式定义图形
			可以进行类似于dom操作，通过ps合成svg，代码里面就是xml。

		* drag 和 drop 拖拽  
			1. 即抓取对象以后拖到另一个位置。在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。即将元素添加 draggable，就变成可拖动元素。  
			2. 拖放的过程分为源对象和目标对象。源对象是指你即将拖动元素，而目标对象则是指拖动之后要放置的目标位置。
			3. 对源对象操作的方法：I. ondragstart（用户开始拖动元素时触发）II.<font color='purple'> ondrag（ 元素正在拖动时触发）</font>III. ondragend （用户完成元素拖动后触发）
			4. 放置目标对象的方法：I. ondragenter （当被鼠标拖动的对象进入其容器范围内时触发此事件）II. ondragover (当某被拖动的对象在另一对象容器范围内拖动时触发此事件) III. ondragleave (当被鼠标拖动的对象离开其容器范围内时触发此事件) IIII <font color="purple">ondrop (在一个拖动过程中，释放鼠标键时触发此事件)</font>
			5. 通过 ev.dataTransfer.getData("Text") 方法获得被拖的数据。该方法将返回在 ev.dataTransfer.setData("Text",xxx)方法中设置为相同类型的任何数据。
			6. 例子参考  'https://www.runoob.com/html/html5-draganddrop.html'

		* Geolocation 地理定位  
		用于定位用户的位置

		* Web Worker   
			1. 定义  
				运行在后台的 JavaScript，不会影响页面的性能，Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。  
			2. Web Worker 有以下几个使用注意点  
				1. 必须同源。
				2. 不能操作dom对象。
				3. Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成
				4. Worker 线程不能执行alert()方法和confirm()方法，但可以使用XMLHttpRequest 对象发出 AJAX 请求。
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
				addEventListener("message",function (e) {
				     obj.num = e.data*2;
				     postMessage(JSON.stringify(obj));
				})
				```
		* Web Storage 存储
			* sessionStorage // 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据
			* localStorage // 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除

		* WebSocket  
		  一种在单个 TCP 连接上进行全双工通讯的协议。  
			在 WebSocket API 中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送

* css3
	* 选择器
		1. querySelector()/querySelectorAll()
		2. ele:nth-child()/ele:first-child/ele:last-child/ele:nth-child(odd/even)/ele::before/ele::after/ele:not(选择器)选择没有该选择器的元素/\[attribute^=value]
		3. box-sizing/border-radius/box-shadow/text-shadow/background-image:linear-gradient (方向 , 颜色 位置 , 颜色 位置)/background-image:radial-gradient(半径 at 位置 ,颜色 位置,颜色 位置)/background-clip/background-origin: padding-box/border-box/content-box/transition/transform:translate,rotato,scale,skew/calc()/animation:name动画名称  动画总时间 动画延迟 动画速度/@font-face/@media/display:flex

### html5标签语义化（=>九）
* 什么是标签语义化  
	用正确的标签做正确的事，把适当的标签用在合适的地方。是页面结构更加的清晰。
* 标签语义化的作用  
	1. 使用html语义化，能使页面结构更清晰，便于解析。
	2. 有利于SEO。搜索引擎爬虫依赖于html标签来确定上下文和关键字权重。
  3. 使用html语义化，在没有css样式的时候页面也能正确清晰的呈现
  4. 有利于各种设备的解析，如盲人阅读器，屏幕阅读器
  5. 有利于团队合作开发与维护。
* html5标签有哪些？  
	* \<title>\</title>  页面的标题，具有唯一性，标题的取名尽量包含网页几个关键字。
	* \<header>\</header>  网站的标志，主导航，搜索框等　
	* \<nav>\</nav> 网站的导航。　
	* \<mian>\</mian> 网页的主要内容，一个网页只能有一个
	* \<aside>\</aside>　　附注栏，比如侧栏，引述，产品列表，链接等。
	* \<footer>\</footer> 页脚

### svg和canvas的区别（=>九）
* SVG 是一种使用 XML 描述 2D 图形的语言。
* Canvas 通过 JavaScript 来绘制 2D 图形。
* SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
* 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
* Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

### sessionStorage，sessopnStorage，cookie的区别(=>九)
1. cookie，sessionStorage，localStorage是存放在客户端，session对象数据是存放在服务器上,session存储数据更安全一些，一般存放用户信息，浏览器只适合存储一般的数据
  2. cookie数据始终在同源的http请求中携带，在浏览器和服务器来回传递,sessionStorage，localStorage仅在本地保存
  3. 大小限制区别，cookie数据不超过4kb，localStorage在谷歌浏览中2.6MB
  4. 数据有效期不同，cookie在设置的（服务器设置）有效期内有效，不管窗口和浏览器关闭
      sessionStorage仅在当前浏览器窗口关闭前有效，关闭即销毁（临时存储）
      localStorage始终有效

### token、cookie、session三者的理解
1. token就是令牌，比如你授权(登录)一个程序时,他就是个依据,判断你是否已经授权该软件（最好的身份认证，安全性好，且是唯一的）用户身份的验证方式
2. cookie是写在客户端一个txt文件，里面包括登录信息之类的，这样你下次在登录某个网站，就会自动调用cookie自动登录用户名服务器生成，发送到浏览器、浏览器保存，下次请求再次发送给服务器（存放着登录信息）
3. session是一类用来客户端和服务器之间保存状态的解决方案，会话完成被销毁（代表的就是服务器和客户端的一次会话过程）

### display:flex的项目的各个属性
1. order 项目的排列顺序。数值越小，排列越靠前，默认为0（按代码书写的顺序来。）
2. flex-grow 项目的放大比例，默认为0（即如果存在剩余空间，也不放大。）   
   如果item都为1，则均等平摊整个空间。  
	 如果有一个item和其他的item不相等，则按照比例放大。
3. flex-shrink 项目的缩小比例，默认为1（即如果空间不足，该项目将缩小。）  
  如果item都相等，则均等平摊空间，若空间不足，则都等比例缩小。  
  如果有一个item为0；当空间不足时，其不缩小。  
	ps：负值无效。
4. flex-basis 在分配多余空间之前，项目占据的水平上的空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
5. flex 是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。  
优先级：auto (1 1 auto) 或者 none （0 0 auto);
6. align-self 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

### 防抖和节流
* 防抖  
就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

		function debounce(func, wait) {
			let timeout;
			return function () {
				let context = this;
				let args = arguments;
				if (timeout) clearTimeout(timeout);
				timeout = setTimeout(() => {
						func.apply(context, args)
				}, wait);
			}
		}

	适用场景：  

	1. 搜索框输入查询
	2. 按钮提交事件
	3. 浏览器窗口缩放，resize事件(如窗口停止改变大小之后重新计算布局)等

* 节流  
节流函数的作用是规定一个单位时间，在这个单位时间内最多只能触发一次函数执行，如果这个单位时间内多次触发函数，只能有一次生效。

		//	时间戳方式
		function throttle(func, wait) {
			let previous = 0;
			return function() {
				let now = Date.now();
				let context = this;
				let args = arguments;
				if (now - previous > wait) {
						func.apply(context, args);
						previous = now;
				}
			}
		}

		// 定时器方式
		function throttle(func,wait){
			let timer;
			return function(){
				let context = this;
				let args = arguments;
				if(!timer){
					timer = setTimeout(()=>{
						func.apply(context,args);
						timer = null;
					},wait)
				}
			}
		}

	适用场景
	1. 按钮点击事件
	2. 拖拽事件
	3. onscroll
	4. 计算鼠标移动的距离(mousemove)
### 浅拷贝和深拷贝
* 浅拷贝是指创建一个对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，那么拷贝的就是基本类型的值，如果属性是引用类型，那么拷贝的就是内存地址，所以如果其中一个对象修改了某些属性，那么另一个对象就会受到影响。
* 深拷贝是指从内存中完整地拷贝一个对象出来，并在堆内存中为其分配一个新的内存区域来存放，并且修改该对象的属性不会影响到原来的对象。
### 如何实现浅拷贝和深拷贝
* 浅拷贝的实现（引用类型）：
	* Object.assign(newObj,oldObj) 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象

			let oldObj = {
				name:'peter',
				age:26
			}
			let oldArr = [1,2,3,4,5]
			let newObj = Object.assign({},oldObj)
			let newArr = Object.assign([],oldArr)

	* 通过扩展运算符

			let {...newObj} = oldObj
			let [...newArr] = oldArr

	* 通过数组的slice方法(适用与数组)

			let newArr = oldArr.slice()

	* 通过数组的concat方法(适用与数组)

			let newArr = oldArr.concat()

* 深拷贝的实现
	* 通过JSON.stringify()和JSON.parse()

			let oldObj = {
				name:'peter',
				age:26
			}
			let oldArr = [1,2,3,4,5]
			let newObj = JSON.parse(JSON.stringify(oldObj))	
			let newArr = JSON.parse(JSON.stringify(oldArr))			

		使用之前考虑的坑：
		* 如果json里面有时间对象，则序列化结果：时间对象=>字符串的形式
		* 如果json里有RegExp、Error对象，则序列化的结果将只得到空对象 RegExp、Error => {}
		* 如果json里有 function,undefined,symbol，则序列化的结果会把 function,undefined,symbol 丢失
		* 如果json里有NaN、Infinity和-Infinity，则序列化的结果会变成null
		* 如果json里有对象是由构造函数生成的，则序列化的结果会丢弃对象的 constructor
		* 如果对象中存在循环引用的情况也无法实现深拷贝（类似于递归嵌套）

	* 原生实现递归拷贝
		* 方法一

				function deepClone(obj){
					if(obj instanceof RegExp) return new RegExp(obj);
					if(obj instanceof Date) return new Date(obj);
					let objClone = Array.isArray(obj)?[]:{};
					if(obj && typeof obj==="object"){
							for(key in obj){
									if(obj.hasOwnProperty(key)){
									//判断ojb子元素是否为对象，如果是，递归复制
											if(obj[key]&&typeof obj[key] ==="object"){
													objClone[key] = deepClone(obj[key]);
											}else{
													//如果不是，简单复制
													objClone[key] = obj[key];
											}
									}
							}
					}
					return objClone;
				}

		* 方法二

				function deepClone(obj,hash = new WeakMap()){
					if(obj instanceof RegExp) return new RegExp(obj);
					if(obj instanceof Date) return new Date(obj);
					if(obj == null || typeof obj !== 'object'){
						return obj;// 如果不是复杂数据类型直接返回obj
					}
					if(hash.has(obj)){
						return hash.get(obj);
					}
					let t = new obj.constructor();
					hash.set(obj,t);
					for(let key in obj){
						if(obj.hasOwnPropetry(key)){
							t[key] = deepClone(obj[key],hash)
						}
					}
					return t;
				}

### 实现一个promise

### 从浏览器地址栏输入url到显示页面的步骤

1. 查询NDS(域名解析),获取域名对应的IP地址  查询浏览器缓存
2. 浏览器与服务器建立tcp链接（三次握手）
3. 浏览器向服务器发送http请求(请求和传输数据）
4. 服务器接受到这个请求后，根据路经参数，经过后端的一些处理生成html代码返回给浏览器
5. 浏览器拿到完整的html页面代码，解析HTML文档，构件DOM树，下载资源，构造CSSOM树，执行js脚本，这些操作没有严格的先后顺序
6. 浏览器根据拿到的资源对页面进行渲染，把一个完整的页面呈现出来

### 字段理解
* 序列号seq：占4个字节，用来标记数据段的顺序，TCP把连接中发送的所有数据字节都编上一个序号，第一个字节的编号由本地随机产生；给字节编上序号后，就给每一个报文段指派一个序号；序列号seq就是这个报文段中的第一个字节的数据编号。

* 确认号ack：占4个字节，期待收到对方下一个报文段的第一个数据字节的序号；序列号表示报文段携带数据的第一个字节的编号；而确认号指的是期望接收到下一个字节的编号；因此当前报文段最后一个字节的编号+1即为确认号。

* 确认ACK：占1位，仅当ACK=1时，确认号字段才有效。ACK=0时，确认号无效

* 同步SYN：连接建立时用于同步序号。当SYN=1，ACK=0时表示：这是一个连接请求报文段。若同意连接，则在响应报文段中使得SYN=1，ACK=1。因此，SYN=1表示这是一个连接请求，或连接接受报文。SYN这个标志位只有在TCP建产连接时才会被置1，握手完成后SYN标志位被置0。

* 终止FIN：用来释放一个连接。FIN=1表示：此报文段的发送方的数据已经发送完毕，并要求释放运输连接

* PS：ACK、SYN和FIN这些大写的单词表示标志位，其值要么是1，要么是0；ack、seq小写的单词表示序号。
### 三次握手
(转载与http://blog.itpub.net/31442725/viewspace-2645992/)  

![三次握手](/images/connect.png)
1. 第一次握手：Client将标志位SYN置为1，随机产生一个值seq=J，并将该数据包发送给Server，Client进入SYN_SENT状态，等待Server确认。

2. 第二次握手： Server 收到数据包后由标志位 SYN=1 知道 Client 请求建立连接， Server 将标志位 SYN 和 ACK 都置为 1 ， ack=J+1 ，随机产生一个值 seq=K ，并将该数据包发送给 Client 以确认连接请求， Server 进入 SYN_RCVD 状态。

3. 第三次握手： Client 收到确认后，检查 ack 是否为 J+1 ， ACK 是否为 1 ，如果正确则将标志位 ACK 置为 1 ， ack=K+1 ，并将该数据包发送给 Server ， Server 检查 ack 是否为 K+1 ， ACK 是否为 1 ，如果正确则连接建立成功， Client 和 Server 进入 ESTABLISHED 状态，完成三次握手，随后 Client 与 Server 之间可以开始传输数据了。

#### 简单来说，就是

* 建立连接时，客户端发送SYN包（SYN=i）到服务器，并进入到SYN-SEND状态，等待服务器确认。

* 服务器收到 SYN 包，必须确认客户的 SYN （ ack=i+1 ） , 同时自己也发送一个 SYN 包（ SYN=k ） , 即 SYN+ACK 包，此时服务器进入 SYN-RECV 状态。

* 客户端收到服务器的 SYN+ACK 包，向服务器发送确认报 ACK （ ack=k+1 ） , 此包发送完毕，客户端和服务器进入 ESTABLISHED 状态，完成三次握手，客户端与服务器开始传送数据。

### 四次挥手
(转载与http://blog.itpub.net/31442725/viewspace-2645992/)  
![四次挥手](/images/close.png)
1. 第一次挥手：Client发送一个FIN，用来关闭Client到Server的数据传送，Client进入FIN_WAIT_1状态。

2. 第二次挥手： Server 收到 FIN 后，发送一个 ACK 给 Client ，确认序号为收到序号 +1 （与 SYN 相同，一个 FIN 占用一个序号）， Server 进入 CLOSE_WAIT 状态。

3. 第三次挥手： Server 发送一个 FIN ，用来关闭 Server 到 Client 的数据传送， Server 进入 LAST_ACK 状态。

4. 第四次挥手： Client 收到 FIN 后， Client 进入 TIME_WAIT 状态，接着发送一个 ACK 给 Server ，确认序号为收到序号 +1 ， Server 进入 CLOSED 状态，完成四次挥手。

### 浏览器渲染原理及流程

### 浏览器缓存

* 强制缓存：  缓存在未过有效期时，不需要请求资源
	* expires &nbsp;&nbsp;&nbsp; http1.0  
	  1. 该字段表示缓存到期时间，即有效时间+当时服务器的时间，然后将这个时间设置在header中返回给服务器。因此，该时间是一个绝对时间.  
	  2. 缺点：由于是绝对时间，用户可能会将客户端本地的时间进行修改，而导致浏览器判断缓存失效，重新请求该资源，同时，还导致客户端与服务端的时间不一致，致使缓存失效。
	* cache-control&nbsp;&nbsp;&nbsp; http1.1  
		1. 该字段表示资源缓存的最大有效时间，在该时间内，客户端不需要向服务器发送请求，因此是个相对时间。
		2. Cache-Control的字段可以带的值：
			* max-age：即最大有效时间（max-age=222200）
			* no-cache：表示没有缓存，即告诉浏览器该资源并没有设置缓存
			* s-maxage：同max-age，但是仅用于共享缓存，如CDN缓存
			* public：多用户共享缓存，默认设置
			* private：不能够多用户共享，HTTP认证之后，字段会自动转换成private
* 对比缓存：先从缓存中获取对应的数据标识，然后向服务器发送请求，确认数据是否更新，如果更新，则返回新数据和新缓存；反之，则返回304状态码，告知客户端缓存未更新，可继续使用。  
	* Last-Modified  --- If-Modified-Since
		1. Last-Modified是 服务器告知客户端，资源最后一次被修改的时间
		2. If-Modified-Since：再次请求时，请求头中带有该字段，服务器会将If-Modified-Since的值与Last-Modified字段进行对比，如果相等，则表示未修改，响应304；反之，则表示修改了，响应200状态码，返回数据。
		3. 缺点：* 如果资源更新的速度是秒以下单位，那么该缓存是不能被使用的，因为它的时间单位最低是秒。* 如果文件是通过服务器动态生成的，那么该方法的更新时间永远是生成的时间，尽管文件可能没有变化，所以起不到缓存的作用。
	* Etag  --- If-None-Match
		1. Etag存储的是文件的特殊标识(一般都是hash生成的)，服务器存储着文件的Etag字段，可以在与每次客户端传送If-no-match的字段进行比较，如果相等，则表示未修改，响应304；反之，则表示已修改，响应200状态码，返回数据。

### 浏览器行为会引起缓存的变化
1. 刷新网页 => 如果缓存没有失效，浏览器会直接使用缓存；反之，则向服务器请求数据
2. 手动刷新（F5） => 浏览器会认为缓存失效，在请求服务器时加上Cache-Control: max-age=0字段，然后询问服务器数据是否更新。
3. 强制刷新（Ctrl + F5） => 浏览器会直接忽略缓存，在请求服务器时加上Cache-Control: no-cache字段，然后重新向服务器拉取文件。

### 移动端如何做适配？ 

### 实现一个函数判断数据类型

	function getType(obj) {
		if (obj === null) return String(obj);
		return typeof obj === 'object' 
		? Object.prototype.toString.call(obj).replace('[object ', '').replace(']', '').toLowerCase()
		: typeof obj;
	}

### 图片的懒加载和预加载
