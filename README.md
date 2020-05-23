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
			const fn = Symbol('fn')  // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
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
			const fn = Symbol('fn') 
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
				position:relative;
			}
			.children-box {
				width: 100px;
				height: 100px;
				position:absolute;
				left:calc(50% - 50px);
				top:calc(50% - 50px);
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

### sessionStorage，localStorage，cookie的区别(=>九)
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
				if (timeout) clearTimeout(timeout);
				timeout = setTimeout(() => {
					func.apply(this, arguments)
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
				if(!timer){
					timer = setTimeout(()=>{
						func.apply(this,arguments);
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


### 从浏览器地址栏输入url到显示页面的步骤

1. 查询DNS(域名解析),获取域名对应的IP地址,查询浏览器缓存
2. 浏览器与服务器建立tcp链接（三次握手）
3. 浏览器向服务器发送http请求(请求和传输数据）
4. 服务器接受到这个请求后，根据路经参数，经过后端的一些处理生成html代码返回给浏览器
5. 浏览器拿到完整的html页面代码，解析HTML文档，构建DOM树，下载资源，构造CSSOM树，执行js脚本，这些操作没有严格的先后顺序
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

### HTTP状态码以及含义
1. 1xx 信息状态码
	* 100 Continue 继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
2. 2xx 成功状态码
  * 200 OK 正常返回信息
	* 201 Created 请求成功并且服务器创建了新的资源
	* 202 Accepted 服务器已接受请求，但尚未处理
3. 3xx 重定向
	* 301 Moved Permanently 请求的网页已永久移动到新位置。
	* 302 Found 临时性重定向
	* 303 See Other 临时性重定向，且总是使用 GET 请求新的 URI
	* 304 Not Modified 自从上次请求后，请求的网页未修改过。
4. 4xx 客户端错误
	* 400 Bad Request 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
	* 401 Unauthorized 请求未授权
	* 403 Forbidden 禁止访问
	* 404 Not Found 找不到如何与 URI 相匹配的资源
5. 5xx 服务端错误
	* 500 Internal Server Error  服务器遇到了意料不到的情况，不能完成客户的请求。
	* 503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）

### 浏览器渲染原理及流程

	1. 浏览器获取html文档解析成dom树。
	2. 处理CSS标记，构成层叠样式表模型CSSOM(CSS Object Model)。
	3. 将DOM和CSSOM合并为渲染树(rendering tree)将会被创建，代表一系列将被渲染的对象。
	4. 渲染树的每个元素包含的内容都是计算过的，它被称之为布局layout。浏览器使用一种流式处理的方法，只需要一次绘制操作就可以布局所有的元素。
	5. 将渲染树的各个节点绘制到屏幕上，这一步被称为绘制painting。

	* ps:这些过程没有顺序之分，比如DOM或CSSOM被修改时，亦或是哪个过程会重复执行，这样才能计算出哪些像素需要在屏幕上进行重新渲染。而在实际情况中，JavaScript和CSS的某些操作往往会多次修改DOM或者CSSOM。
	* ps: DOMContentLoaded和Load的区别
		* DOMContentLoaded事件触发时，仅当DOM加载完成，不包括样式表，图片等，简称页面内容加载完成
		* load事件触发时，页面上所有的DOM，样式表，脚本，图片都已加载完成，简称页面资源加载完成

	* 参考文献：（https://www.jianshu.com/p/e6252dc9be32）

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

### 常见的请求头和响应头有哪些
* 请求头
	Accept \*/*(客户端能接收的资源类型)
	Accept-Encoding gzip, deflate(客户端能接收的压缩数据的类型)
	Accept-Language en-us(客户端接收的语言类型)
	Referer (告诉服务器我来自于哪里)
	Host localhost:8080(连接的目标主机和端口号)
	Connection: Keep-Alive(维护客户端和服务端的连接关系)
	Content-Type: application/json; charset=UTF-8 解析类型
	User-Agent: Mozilla/4.0(客户端版本号的名字)
	Cookie (客户端暂存服务端的信息)
	If-Modified-Since: Tue, 11 Jul 2000 18:23:51 GMT(缓存时间) 
* 响应头
	Server (服务端的Web服务端名）
	Content-Encoding: gzip(服务端能够发送压缩编码类型) 
  Content-Length: 80(服务端发送的压缩数据的长度) 
	Content-Language: zh-cn(服务端发送的语言类型) 
	Connection 维护客户端和服务端的连接关系
	Content-Type: application/json; charset=utf-8 解析类型
	access-control-allow-headers: 
	access-control-allow-methods: GET, OPTIONS, HEAD, PUT, POST
	access-control-allow-origin: * 
	access-control-max-age: 1800
	Access-Control-Max-Age: 86400
	expires 0
	cache-control no-store, no-cache, must-revalidate


### 移动端如何做适配？ 
1. html文件添加meta 
	
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
			// width    设置viewport宽度，为一个正整数，或字符串‘device-width’
			// device-width  设备宽度
			// height   设置viewport高度，一般设置了宽度，会自动解析出高度，可以不用设置
			// initial-scale    默认缩放比例（初始缩放比例），为一个数字，可以带小数
			// minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数
			// maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数
			// user-scalable    是否允许手动缩放
2. head添加script

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

### 实现一个函数判断数据类型

	function getType(obj) {
		if (obj === null) return String(obj);
		return typeof obj === 'object' 
		? Object.prototype.toString.call(obj).replace('[object ', '').replace(']', '').toLowerCase()
		: typeof obj;
	}

### 图片的懒加载和预加载
* 预下载

	1. 利用缓存的形式

			function loadImage(url, callback) {     
				var img = new Image(); //创建一个Image对象，实现图片的预下载         
				img.onload = function () { //图片下载完毕时将img.onload设为null，并异步调用callback函数。         
					img.onload = null;    
					callback(img);     
				};  
				img.src = url;     
			}
	2. css 方式

			function preloader() {  
				if (document.getElementById) {  
					document.getElementById("preload-01").style.background = "url(http://domain.tld/image-01.png) no-repeat -9999px -9999px";  
					document.getElementById("preload-02").style.background = "url(http://domain.tld/image-02.png) no-repeat -9999px -9999px";  
					document.getElementById("preload-03").style.background = "url(http://domain.tld/image-03.png) no-repeat -9999px -9999px";  
				}  
			}  
			function addLoadEvent(func) {  
				var oldonload = window.onload;  
				if (typeof window.onload != 'function') {  
					window.onload = func;  
				} else {  
					window.onload = function() {  
						if (oldonload) {  
							oldonload();  
						}  
						func();  
					}  
				}  
			}  
			addLoadEvent(preloader);
* 懒下载
将页面里所有img属性src属性用data-xx代替，当页面滚动直至此图片出现在可视区域时，用js取到该图片的data-xx的值赋给src。

### doctype 

document type（文档类型）的简写，doctype是一种标准通用标记语言的文档类型声明，目的是告诉浏览器要使用什么样的文档类型定义(DTD)来解析文档。XHTML1.0 提供了三种DTD声明可供选择，分别是：strict（严格模式）,frameset（框架模式）,tranisitional（混杂模式）  
doctype在html中的作用是触发浏览器的标准模式，如果html中省略了doctype，浏览器会进入到混杂模式的状态也称之为兼容模式。在这种模式下有些样式，布局会和标准模式（或称严格模式）存在差异。标准，DOM标准只规定了标准模式下的行为，没有对兼容模式做出规定，因此不同浏览器在兼容模式下的处理也是不同的，应用兼容模式比较困难，所以需要慎用。
过渡的(Transitional，也叫混杂模式)：要求比较宽松，允许继续使用HTML4.01的标识  
完整声明为   \<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-tranisitional.dtd"\> '
严格的(Strict)：要求严格的DTD，不能使用任何表现层的标识和属性  
完整声明为\<!DOCTYPE html PUBLIC "-W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"\>  
框架的(Frameset)：专门针对框架页面设计使用的DTD，如果页面中包含有框架，可以采用DTD  
完整声明为\<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd"\>


### meta的作用，包含什么？

帮助主页被各大搜索引擎，定义页面的使用语言，自动刷新并指向新的页面，响应式页面指定。
* charset 指定字符编码

	\<meta charset="utf-8"\>  
	GB2312 == 简体中文  
	BIG5 == 繁体中文  
	iso-2022-jp == 日文  
	ks_c_5601 == 韩文
	ISO-8859-1 == 英文
	UTF-8 == 世界通用的语言编码

* http-equiv 相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值。
	
	语法格式是：\<meta http-equiv="参数" content="参数变量值"\> ；其中http-equiv属性主要有以下几种	
		
	参数：  
	A、Expires(期限)  
	说明：可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。   
	用法：\<meta http-equiv="expires" content="Fri, 12 Jan 2001 18:18:18 GMT"\>   
	注意：必须使用GMT的时间格式。

	B、Pragma(cache模式)  
	说明：禁止浏览器从本地计算机的缓存中访问页面内容。  
	用法：\<meta http-equiv="Pragma" content="no-cache"\>  
	注意：这样设定，访问者将无法脱机浏览。

	C、Refresh(刷新)   
	说明：自动刷新并指向新页面。    
	用法：\<meta http-equiv="Refresh" content="2；URL=http://www.root.net"\>   
	注意：其中的2是指停留2秒钟后自动刷新到URL网址。  

	D、Set-Cookie(cookie设定)  
	说明：如果网页过期，那么存盘的cookie将被删除。  
	用法：\<meta http-equiv="Set-Cookie" content="cookievalue=xxx; expires=Friday, 12-Jan-2001 18:18:18 GMT； path=/"\>  
	注意：必须使用GMT的时间格式。
	
	E、Window-target(显示窗口的设定)  
	说明：强制页面在当前窗口以独立页面显示。  
	用法：\<meta http-equiv="Window-target" content="_top"\> 
	注意：用来防止别人在框架里调用自己的页面。
	
	F、content-Type(显示字符集的设定)  
	说明：设定页面使用的字符集。  
	用法：\<meta http-equiv="content-Type" content="text/html; charset=gb2312"\>

	G、X-UA-Compatible  
	X-UA-Compatible是自从IE8新加的一个设置，对于IE8以下的浏览器是不识别的。 通过在meta中设置X-UA-Compatible的值，可以指定网页的兼容性模式设置。  
	\<meta http-equiv="X-UA-Compatible" content="IE=7"\>  通俗点说代表告诉IE浏览器，无论是否用DTD声明文档标准，IE8/9都会以IE7引擎来渲染页面。如果IE=8或者9也是如此，以IE8或者IE9渲染页面  
	常见的是 \<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"\>   这里的chrome=1不是说IE的技术增强了可以模拟Chrome浏览器，而是与谷歌开发的Google Chrome Frame(谷歌内嵌浏览器框架GCF)有关。这个插件可以让用户的IE浏览器外观不变，但用户在浏览网页时实际上使用的是Chrome的内核，并且支持Windows XP及以上系统的IE6/7/8。而上文提到的那个meta标记，则是在是安装了GCF后，用来指定页面使用chrome内核来渲染。
* name 方便seo，告知搜索引擎该网页的信息  

	A、keywords 关键字  
	说明：keywords用来告诉搜索引擎你网页的关键字是什么。  
	举例：\<meta name ="keywords" content="science,education,culture"\>
	B、description(网站内容描述)  
	说明：description用来告诉搜索引擎你的网站主要内容。  
	举例：\<meta name="description" content="这是一个xxxxx网页"\>
	C、robots(机器人向导)  
	说明：robots用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。  
	content的参数有all,none,index,noindex,follow,nofollow。默认是all。  
	举例：\<meta name="robots" content="none"\>
	D、author(作者)  
	说明：标注网页的作者  
	举例：\<meta name="author" content="sqh17@foxmail.com"\>


### es5实现let

	function _let(count){
		(function(){
			for(var i = 0; i < count; i ++){
				console.log(i) // 0,1,2,3,4
			}
		})();
		console.log(i) // ReferenceError: i is not defined
	}
	_let(5)


### es5实现const

	var _const = function(data,value){
		var _window = typeof window === 'undefined'? global : window; // 判断当前的环境
		_window[data] = value; // 把要定义的data挂载到_window下，并赋值value
		Object.defineProperty(_window,data,{
			enumerable:false,
			configurable:false,
			get:function(){
				return value
			},
			set:function(val){
				if(val != value){
					throw new TypeError('Assignment to constant variable')
				}else{
					return value
				}
			}
		})
	}
	_const('a', 10)
	console.log(a)
	a = 20


### 数组实现偏平化

* ES6的flat()

		let arr = [1,2,3,[4,5,6,[7,8,9]]]
		let res = arr.flat(Infinity) 
		console.log(res) // [1,2,3,4,5,6,7,8,9]

* 序列化+正则

		let arr = [1,2,3,[4,5,6,[7,8,9]]]
		let res = `[${JSON.stringify(arr).replace(/(\[|\])/g,'')}]`
		console.log(res) // [1,2,3,4,5,6,7,8,9]

* 递归

		let arr = [1,2,3,[4,5,6,[7,8,9]]]
		function flat(arr){
			let res = [];
			for(const item of arr){
				item instanceof Array ? res = res.concat(flat(item)):res.push(item)
			}
			return res
		}
		console.log(flat(arr)) // [1,2,3,4,5,6,7,8,9]

* reduce式递归

		let arr = [1,2,3,[4,5,6,[7,8,9]]]
		function flat(arr){
			return arr.reduce((prev, cur)=>{
				return prev.concat(cur instanceof Array?flat(cur):cur)
			},[])
		}
		console.log(flat(arr)) // [1,2,3,4,5,6,7,8,9]

* 迭代+展开运算符

		let arr = [1,2,3,[4,5,6,[7,8,9]]]
		while (arr.some(Array.isArray)) {
			arr = [].concat(...arr);
		}
		console.log(arr) // [1,2,3,4,5,6,7,8,9]


### promise的简易实现

	//Promise/A+规定的三种状态
	let PENDING = 'pending';  
  	let FULLFILLED = 'fullfilled';
  	let REJECTED = 'rejected';

	class myPromise {
		// 构造方法接收一个回调
		constructor (executor){
			this._status = PENDING;  // Promise状态
			this.resolveQueue = []; // 成功队列, resolve时触发
			this.rejectQueue = []; // 失败队列, reject时触发
			this.value = null; // 储存then回调return的值

			// 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this.resolveQueue
			let resolveFn = (value)=>{
				//把resolve执行回调的操作封装成一个函数,放进setTimeout里,以兼容executor是同步代码的情况
				let run = ()=>{
					// 对应规范中的"状态只能由pending到fulfilled或rejected"
					if(this._status !== PENDING) return
					this._status = FULLFILLED; // 变更状态
					this.value = value; // 储存当前value
					// 这里之所以使用一个队列来储存回调,是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次"
					// 如果使用一个变量而非队列来储存回调,那么即使多次p1.then()也只会执行一次回调
					while(this.resolveQueue.length){
						let callback = this.resolveQueue.shift();
						callback(value)
					}
				}
				setTimeout(run)
			}
			// 实现同resolve
			let rejectedFn = (value)=>{
				let run = ()=>{
					if(this._status !== PENDING) return 
					this._status = REJECTED;
					this.value = value;
					while(this.rejectQueue.length){
						let callback = this.rejectQueue.shift();
						callback(value)
					}
				}
				setTimeout(run)
			}

			// new Promise()时立即执行executor,并传入resolve和reject
			executor(resolveFn,rejectedFn)
		}

		// then方法,接收一个成功的回调和一个失败的回调
		then(_resolve,_rejected){
			// 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
			typeof _resolve !== 'function' ? _resolve = val=>val:null;
			typeof _rejected !== 'function' ? _rejected = val=>{
				throw new Error(val)
			} : null ;

			// return一个新的promise
			return new myPromise((resolve,rejected)=>{
				// 把resolve_Fn重新包装一下,再push进resolve执行队列,这是为了能够获取回调的返回值进行分类讨论
				let resolve_Fn = function(value){
					try{
						// 执行第一个(当前的)Promise的成功回调,并获取返回值
						let x = _resolve(value);
						// 分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
						x instanceof myPromise ? x.then(resolve,rejected):resolve(x)
					}catch(err){
						rejected(err)
					}
				}
				
				// reject同理
				let rejected_Fn = function(value){
					try{
						let x = _rejected(value);
						x instanceof myPromise ? x.then(resolve,rejected):resolve(x)
					}catch(err){
						rejected(err)
					}
				}
				
				

				switch(this._status){
					// 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
					case PENDING :
						this.resolveQueue.push(resolve_Fn);
						this.rejectQueue.push(rejected_Fn);
						break
					// 当状态已经变为resolve/reject时,直接执行then回调
					case FULLFILLED : 
						resolve_Fn(this.value)
						break
					case REJECTED : 
						rejected_Fn(this.value)
						break;
				}
		
			})
		}

		//catch方法其实就是执行一下then的第二个回调
		catch(value){
			return this.then(undefined,value)
		}

		resolve(value){
			if(value instanceof myPromise) return value;
			return new myPromise((resolve,reject)=>{resolve(value)})
		}

		reject(value){
			return new myPromise((resolve,reject)=>{
				reject(value)
			})
		}

		all(arr){
			let index = 0
			let result = []
			return new myPromise((resolve,reject)=>{
				arr.forEach((p,i)=>{
					//Promise.resolve(p)用于处理传入值不为Promise的情况
					myPromise.resolve(p).then(
						val=>{
							index++;
							result[i] = val;
							//所有then执行后, resolve结果
							if(index == arr.length){
								resolve(arr)
							}
						},
						err=>{
							//有一个Promise被reject时，myPromise的状态变为reject
							reject(err)
						}
					)
				})
			})
		}

		race(arr){
			return new myPromise((resolve, reject) => {
				//同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
				for (let p of arr) {
					myPromise.resolve(p).then(  //Promise.resolve(p)用于处理传入值不为Promise的情况
						value => {
							resolve(value)        //注意这个resolve是上边new MyPromise的
						},
						err => {
							reject(err)
						}
					)
				}
			})
		}


		finally(callback){
			return this.then(
				value => myPromise.resolve(callback()).then(() => value),             //执行回调,并returnvalue传递给后面的then
				reason => myPromise.resolve(callback()).then(() => { throw reason })  //reject同理
			)
		}
	}

### 如何使 a==1 && a==2 && a==3的值为true

* 隐式转换 
	Symbol.toPrimitive 是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数。
	valueOf/toString/Symbol.toPrimitive方法都适用,只要一次返回1，2，3即可

		let a = {
			[Symbol.toPrimitive]:(function(hint){ 
				let i = 1;
				return function(){ // 闭包的特性，i不会被回收
					return i++
				}
			})()
		}

		let a = {
			i:1,
			toString:function(){
				return this.i++;
			}
		}
* 利用数据劫持(Proxy/Object.definedProperty）

		let i = 1;
		let a = new Proxy({},{
			i:1,
			get:function(){
				return ()=>this.i++;
			}
		})

* 数组的 toString 接口默认调用数组的 join 方法，重新 join 方法

		let a = [1,2,3];
		a.join = a.shift

### 异步下载js的方式
	* async和defer
		<script> 标签中增加 async(html5) 或者 defer(html4) 属性,脚本就会异步加载。  
		
		defer 和 async 的区别在于：  

		1. defer 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），在window.onload 之前执行；
		2. async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。
		3. 如果有多个 defer 脚本，会按照它们在页面出现的顺序加载
		4. 多个 async 脚本不能保证加载顺序

	* 动态添加js

		let script = document.createElement('script');
		script.src = 'a.js';
		document.body.append(script);

	* xhr异步下载js

		let xhr = new XMLHttpRequest();
		xhr.open('get','a.js',true);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				eval(xhr.responeText)
			}
		}

### Event Loop
js是个单线程，主要的任务是处理用户的交互，使用事件队列的形式，一次事件循环只处理一个事件响应，使得脚本执行相对连续，所以有了事件队列，用来储存待执行的事件，那么事件队列的事件从哪里被push进来的呢。那就是另外一个线程叫事件触发线程做的事情了，他的作用主要是在定时触发器线程、异步HTTP请求线程满足特定条件下的回调函数push到事件队列中，等待js引擎空闲的时候去执行，当然js引擎执行过程中有优先级之分，首先js引擎在一次事件循环中，会先执行js线程的主任务，然后会去查找是否有微任务microtask（promise），如果有那就优先执行微任务，如果没有，在去查找宏任务macrotask（setTimeout、setInterval）进行执行

![Event Loop](/images/eventLoop.png)
* macro-task(宏任务)：包括整体代码script，setTimeout，setInterval，I/O，UI rendering
* micro-task(微任务)：Promise，process.nextTick，MutationObserver

1. 先执行整体代码script
2. 整体代码的微任务
3. 事件队列里的宏任务


### 内存中的栈和堆

* 栈内存主要用于存储各种基本类型的变量，包括Boolean、Number、String、Undefined、Null，**以及对象变量的指针。
* 堆内存主要负责像对象Object这种变量类型的存储。

### 十大排序算法

* 冒泡排序(O(n*n))

		function sort(arr){
			for(var i = 0;i<arr.length - 1;i++){
				var isSort = true; // 用来是否排序的标示 
				for(Var j = 0;j<arr.length - 1 - i;j++){
					if(arr[j] < arr[j+1]){
						[arr[j],arr[j+1]] = [arr[j+1],arr[j]]
						isSort = false;
					}
				}
				if(isSort){ // 如果当前是排好的直接break
					break;
				}
			}
		}

* 选择排序(O(n*n))

		function sort(arr){
			for(var i = 0;i<arr.length;i++){
				var min = i;
				for(var j = i + 1;j<arr.length;j++){
					if(arr[min]>arr[j]){
						min = j
					}
				}
				[arr[i],arr[min]] = [arr[min],arr[i]]
			}
			return arr
		}

* 插入排序

		function sort(arr){
			var newArr = [arr[0]]
			for(var i = 1;i<arr.length;i++){
				for(var j = 0;j<=i;j++){
					if(newArr[j]>arr[i]){
						newArr.splice(j,0,arr[i]);
						break
					}else if(j==i){
						newArr.push(arr[i])
					}
				}
			}
			return newArr
		}

		function sort(arr){
			for(var i = 1;i<arr.length;i++){
				var value = arr[i];
				for(var j = i+1;j>=0;j--){
					if(arr[j]>value){
						arr[j] = arr[j-1]
					}else{
						break
					}
				}
				arr[j] = value;
			}
			return arr
		}

* 希尔排序

		function sort(arr){
			let len = arr.length,
					temp,
					gap = 1;
			while(gap < len/5){
				gap = gap * 5 + 1
			}
			for(gap;gap > 0;gap = Math.floor(gap / 5)){
				for(var i = gap;i<len;i++){
					temp = arr[i];
					for(var j = i - gap;j>=0 && arr[j] > temp;j -= gap){
						arr[j+gap] = arr[j]
					}
					arr[j+gap] = temp
				}
			}
			return arr
		}

* 归并排序

		function sort(arr){
			let len = arr.length;
			if(len<2){
				return arr;
			}
			let middle = Math.floor(len/2);
			let left = arr.slice(0,middle);
			let right = arr.slice(middle);
			return merge(left,right);
		}
		function merge(left,right){
			let res = [];
			while(left.length&&right.length){
				if(left[0] <= right[0]){
					res.push(left.shift())
				}else{
					res.push(right.shift())
				}
			}
			while(left.length){
				res.push(left.shift())
			}
			while(right.length){
				res.push(right.shift())
			}
			return res
		}

* 快速排序

		function sort(arr){
			let left = [];
			let right = [];
			let middle = arr.splice(Math.floor(arr.length/2),1)[0];
			for(var i = 0;i<arr.length;i++){
				if(arr[i] > middle){
					right.push(arr[i])
				}else{
					left.push(arr[i])
				}
			}
			return sort(left).concat([middle],sort(right))
		}
	
### 前端优化

* content方面
	1. 减少HTTP请求：合并文件、CSS精灵、inline Image
	2. 减少DNS查询：DNS缓存、将资源分布到恰当数量的主机名
	3. 优化图片，对于小图片可以使用base64，能用css实现的就少用图片
* Server方面
	1. 使用CDN
	2. 开启缓存
	3. 对组件使用Gzip压缩
* js或者css方面
	1. 将样式表放到页面顶部，脚本放到页面底部
	2. 将javascript和css从外部引入。
	3. 压缩javascript和css
  4. 删除不需要的脚本，资源按需引入，路由按需下载
  5. 避免使用css表达式，减少DOM访问

### 闭包
* 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域。  
* 闭包的特性：
	1. 函数内再嵌套函数
	2. 内部函数可以引用外层的参数和变量
	3. 参数和变量不会被垃圾回收机制回收
* 闭包的优点：
	1. 可以避免全局变量的污染
	2. 一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中
	3. 实现封装和缓存
* 闭包的缺点：
	1. 使用不当会导致内存泄漏
	2. 消耗内存，浪费性能

### 原型，原型对象，原型链
* 原型
	原型有两种形式：prototype和__proto__；对应的呈现方式不同。
　　* prototype：是函数的一个属性，这个属性的值是一个对象。所以一切的函数都有原型，这个原型就是prototype。
　　* \_\_proto\_\_：是对象的一个属性，同样的属性值也是一个对象。
* 原型对象
高程：无论什么时候，只要创建了一个函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。在默认情况下，所有的原型对象都会自动获得一个constructor（构造函数）属性，这个属性包含一个指向prototype属性所在函数的指针。
* 原型链
当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的__proto__（即它的构造函数的prototype）中寻找，如果该__proto__上没有这个属性，就去__proto__的属性上去找（\_\_proto\_\_ .\_\_proto\_\_),依次往下找，找到就使用，找不到就继续往下找，到最上层都没有找到就返回null。这样的就叫原型链。

### es5的继承

* 原型链继承
		采用原型链的形式实现继承

		function Animal(){
			this.type = 'animal';
		}
		Animal.prototype.feature = function(){
			alert(this.type);
		}
		function Cat(name,color){
			this.name = name;
			this.color = color;
		} 
		Cat.prototype = new Animal();

		var tom = new Cat('tom','blue');
		console.log(tom.name);  // 'tom'
		console.log(tom.color); // 'blue'
		console.log(tom.type);  // 'animal'
		tom.feature()    // 'animal'

	缺点：  
	1. 在原型链继承中，包含引用类型值的原型属性会被所有实例共享，如果某一个实例更改了属性或方法，会影响到原型属性，进而影响所有的实例
	2. 没有办法在不影响所有对象实例的情况下，给超类型（Animal）的构造函数传递参数

* 借用构造函数继承
		就是在子类型构造函数的内部使用 apply() 和 call() 方法调用超类型构造函数里的属性或方法。

		function Animal(name){
			this.name = name;
			this.size = ["large", "small"];
		}
		Animal.prototype.say = function(){
			alert(this.name);
		}
		function Cat(name,age){
			Animal.call(this,name);
			this.age = age;

		}
		var tom = new Cat('tom',18);
		var peter = new Cat('peter',22);
		console.log(tom); // {name: "tom", size: Array[2], age: 18};
		console.log(peter); // {name: "peter", size: Array[2], age: 22};

		tom.size.push('middle');
		console.log(tom.size);  // ["large", "small", "middle"]
		console.log(peter.size); // ["large", "small"]
		tom.say();  // Uncaught TypeError: tom.say is not a function

	缺点：
		1. 由于每个子类型声明自己属性或方法，而且别人不能使用，所以不能复用。
		2. 无法调用超类型的原型上的方法。

* 组合继承
		原型链继承实现对原型属性和方法的继承，借用构造函数继承实现对实例属性的继承

		function Animal(name){
			this.name = name;
			this.size = ["large", "small"];
		}
		Animal.prototype.say = function(){
			alert(this.name);
		}
		function Cat(name,age){
			Animal.call(this,name); // 调用Animal的属性
			this.age = age;
		}
		Cat.prototype = new Animal(name); // 调用Ainaml的原型上的方法。
		Cat.prototype.constructor = Cat;  // 保证Cat的原型上的构造器对象还是指向Cat。
		Cat.prototype.skill = function(){
				alert('running');
		}
		var tom = new Cat('tom',18);
		var peter = new Cat('peter',22);
		console.log(tom); // {name: "tom", size: Array[2], age: 18};
		console.log(peter); // {name: "peter", size: Array[2], age: 22};

		tom.size.push('middle');
		console.log(tom.size);  // ["large", "small", "middle"]
		console.log(peter.size); // ["large", "small"]

		tom.say(); // tom
		peter.say(); // peter

	缺点
		无论什么情况下都会调用两次超类型构造函数：1 在创建子类型原型的时候，2 在子类型构造函数内部。

* 原型式继承
		此模式就是新对象是利用原要继承的对象挂载到原型上的原理，去使用原型上的属性和方法，然后修改其属性和方法。同样如果不修改属性值，会被所有实例共享。

		function object(o){
			function F(){};
			F.prototype = o;
			return new F();
		} // 等价于 Oject.create()
		var peter = {
			name:'peter',
			age:18,
			say:function(){
					alert(this.name);
			}
		}
		var tom = object(peter); // var tom = Object.create(peter)
		console.log(tom);  // F {}
		tom.say();  // peter

		tom.name = 'tom';
		tom.age = 22;
		console.log(tom);  // F {name: "tom", age: 22}
		tom.say();  // tom

* 寄生式继承
		即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后返回这个对象。该继承方式最大的特点就是封装成一个函数，在内部扩展对象的属性或方法。

		function inherit(o){
			var clone = Object.create(o);  // 通过调用函数创建一个对象
			clone.type = 'people';    // 扩展对象属性或方法
			clone.say=function(){
					alert(this.name);
			}
			return clone;
		}
		var peter = {
				name:'peter'
		}
		var perterSon = inherit(peter);
		console.log(perterSon.type);    // people
		perterSon.say();  // peter

	扩展方法已经写死了，所以不能不复用，进而降低效率。使用情况：在主要考虑对象而不是自定义类型和构造函数的情况下，可以采用寄生式继承。

* 寄生组合式继承
		通过借用构造函数来继承属性，用原型链的混成形式来继承方法。不必为了指定子类型的原型而调用超类型的构造函数。

		function inheritPrototype(sub,supers){
			var clone = Object.create(supers.prototype);
			clone.constructor = sub;
			sub.prototype = clone;
		}

	这个函数实现了三个步骤：（先传两个参数，一个子类型构造函数sub，一个超类型构造函数super。）  
	1. 创建超类型原型的一个副本。
	2. 为创建的副本添加constructor属性，从而弥补重写原型而失去的默认的constructor属性。
	3. 将新创建的对象（副本）赋值给子类型的原型。

			function Animal(name){
				this.name = name;
				this.size = ["large", "small"];
			}
			Animal.prototype.say = function(){
				alert(this.name);
			}
			function Cat(name,age){
				Animal.call(this,name);
				this.age = age;
			}
			inheritPrototype(Cat,Animal);
			Cat.prototype.skill = function(){
				alert('running')
			}
			var tom = new Cat('tom',18);
			console.log(tom); // Cat {name: "tom", size: Array(2), age: 18}
			tom.say();   // tom
			tom.skill();  // running

### vue的双向数据绑定原理

	vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

	具体实现步骤：
		* 当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 都加上 setter和getter 这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化
		* compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
		Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:
			1. 在自身实例化时往属性订阅器(dep)里面添加自己
			2. 自身必须有一个update()方法
			3. 待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。
		* MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果

	代码实现：

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


### vue的生命周期

	* beforeCreate： data对象为undefined，dom未渲染，$el为undefined
	* created：data对象已存在，dom未渲染，$el为undefined
	* beforeMount：data对象已存在，dom未渲染，$el已存在
	* mounted：data对象已存在，dom已渲染，$el已存在
	* beforeUpdate：在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
	* updated：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
	* beforeDestroy：在实例销毁之前调用。实例仍然完全可用
	* destroyed： 在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。

### vue的computed和watch的区别
* ①从属性名上，computed是计算属性，也就是依赖其它的属性计算所得出最后的值。watch是去监听一个值的变化，然后执行相对应的函数。
* ②从实现上，computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时才会重新调用对应的getter来计算。watch在每次监听的值变化时，都会执行回调。其实从这一点来看，都是在依赖的值变化之后，去执行回调。很多功能本来就很多属性都可以用，只不过有更适合的。如果一个值依赖多个属性（多对一），用computed肯定是更加方便的。如果一个值变化后会引起一系列操作，或者一个值变化会引起一系列值的变化（一对多），用watch更加方便一些。
* ③watch的回调里面会传入监听属性的新旧值，通过这两个值可以做一些特定的操作。computed通常就是简单的计算。
* ④watch和computed并没有哪个更底层，watch内部调用的是vm.$watch，它们的共同之处就是每个定义的属性都单独建立了一个Watcher对象。

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

### vue的路由钩子(守卫)
* 全局守卫
	1. router.beforeEach 全局前置守卫 进入路由之前
	2. router.beforeResolve 全局解析守卫(2.5.0+) 在beforeRouteEnter调用之后调用
	3. router.afterEach 全局后置钩子 进入路由之后
* 路由独享守卫
	1. beforeEnter 与全局前置守卫的方式一样，只不过只运用与一个路由 
* 路由组建内守卫
	1. beforeRouteEnter 进入路由前, 在路由独享守卫后调用 不能 获取组件实例 this，组件实例还没被创建
	2. beforeRouteUpdate (2.2) 路由复用同一个组件时, 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 this
	3. beforeRouteLeave 离开当前路由时, 导航离开该组件的对应路由时调用，可以访问组件实例 this

### vue的组件传值
1. 父传子：props
2. 子传父：\$emit,\$on
3. 兄弟之间:$bus
4. vuex
5. provide/inject
6. \$parent/\$children/ref
7. \$attrs/\$listeners

### vue v-for的key的作用
vue的dom渲染是虚拟dom，数据发生变化时，diff算法会只比较更改的部分，如果数据项的顺序被改变，Vue将不是移动DOM元素来匹配数据项的改变，而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素

### vuex是什么？怎么使用？哪种功能场景使用它？
1. vuex 就是一个仓库，仓库里放了很多对象。其中 state 就是数据源存放地，对应于一般 vue 对象里面的 data
	state 里面存放的数据是响应式的，vue 组件从 store 读取数据，若是 store 中的数据发生改变，依赖这相数据的组件也会发生更新

	* state
	Vuex 使用单一状态树,即每个应用将仅仅包含一个store 实例，但单一状态树和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据。
	* mutations
	mutations定义的方法动态修改Vuex 的 store 中的状态或数据。
	* getters
	类似vue的计算属性，主要用来过滤一些数据。
	* action
	actions可以理解为通过将mutations里面处里数据的方法变成可异步的处理数据的方法，简单的说就是异步操作数据。view 层通过 store.dispath 来分发 action。
2. 使用方式和场景
	
	* 使用Vuex解决非父子组件之间通信问题
		vuex 是通过将 state 作为数据中心、各个组件共享 state 实现跨组件通信的，此时的数据完全独立于组件，因此将组件间共享的数据置于 State 中能有效解决多层级组件嵌套的跨组件通信问题。

	* vuex 作为数据存储中心
		vuex 的 State 在单页应用的开发中本身具有一个“数据库”的作用，可以将组件中用到的数据存储在 State 中，并在 Action 中封装数据读写的逻辑。这时候存在一个问题，一般什么样的数据会放在 State 中呢？ 目前主要有两种数据会使用 vuex 进行管理：
		1、组件之间全局共享的数据
		2、通过后端异步请求的数据
		比如做加入购物车、登录状态等都可以使用Vuex来管理数据状态。

### 安全
* xss
XSS(Cross-Site Scripting，跨站脚本攻击)是一种代码注入攻击。攻击者在目标网站上注入恶意代码，当被攻击者登陆网站时就会执行这些恶意代码，这些脚本可以读取 cookie，session tokens，或者其它敏感的网站信息，对用户进行钓鱼欺诈，甚至发起蠕虫攻击等
	* 存储型xss
	* 反射型xss
	* dom型xss
* CSRF
CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的
* 点击劫持
点击劫持是指在一个Web页面中隐藏了一个透明的iframe，用外层假页面诱导用户点击，实际上是在隐藏的frame上触发了点击事件进行一些用户不知情的操作。
* SQL 注入
它是利用现有应用程序，将(恶意) 的 SQL 命令注入到后台数据库引擎执行的能力，它可以通过在 Web 表单中输入 (恶意) SQL 语句得到一个存在安全漏洞的网站上的数据库，而不是按照设计者意图去执行 SQL 语句。

### 请用一句话描述 try catch 能捕获到哪些 JS 异常
能被 try catch 捕捉到的异常，必须是在报错的时候，线程执行已经进入 try catch 代码块，且处在 try catch 里面，这个时候才能被捕捉到。

### Linux的常用命令
* cd 切换目录
* pwd 显示当前目录完整路径
* ls (-a) 查看目录下的信息（包括隐藏文件）
* ll 列出目录下的文件和详细信息
* mkdir 目录名 创建目录
* touch 文件名.后缀名  添加文件
* rm (-rf) 删除文件（目录）
* cat (-n) 文件名 查勘文件的内容 （显示行号）
* vim 文件名 编辑文件的内容
	* i 切换到输入模式，以输入字符
	* : 切换到底线命令模式，以在最底一行输入命令；
	* a 切换到输入文字模式；
	* 按esc之后 
		* :q 退出程序；
		* :q! 放弃对文件内容的修改并退出；
		* :w 保存文件；
		* :w /root/xx 另存为；
		* :wq 保存文件并退出；

### js动画和css动画的优缺点
* js动画
	* 优点：
		1. js动画控制能力强，可以在动画播放过程中对动画进行控制，使其开始或停止。
		2. 动画效果比CSS3动画丰富，有些动画只有JS动画才能实现，比如曲线运动，冲击闪烁等。
		3. 没有兼容性问题
	* 缺点：
		1. js在浏览器的主线程中运行，而主线程也有其他的js脚本，样式布局，绘制任务的存在，会对其造成阻塞，导致丢帧
		2. js动画的复杂度高于css动画
* css动画
	* 优点：
		1. 浏览器可以对动画进行优化
		2. 对于帧速表现不好的低版本浏览器，CSS3可以做到自然降级，而JS则需要撰写额外代码
	* 缺点：
		1. 运行过程控制较弱,无法附加事件绑定回调函数
		2. 代码冗长。想用CSS3实现稍微复杂一点的动画，最后CSS代码都会变得特别笨重。
* 结论
	如果只是做简单的状态切换，不需要中间过程控制，可以选择css动画。如果要实现功能复杂的动画效果或者组件，推荐使用js动画