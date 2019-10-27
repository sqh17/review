#### 开头
为了备战面试，从其他的面试题或者想到的问题总结如下，最低一天一个题。

  一. 什么是二分查找，思路是什么？实现方式有哪些？

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

二. this的指向有哪些？   
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
		boss1returnThis.call(boss2) // boss1

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

三. new实现了哪些步骤？(=>二)  
1. 创建一个新对象，  
2. 将构造函数的作用域赋给新对象（this指向新对象)。   
3. 执行构造函数的代码（为新对象添加属性或方法)。

四. call和apply的定义和区别？(=>二)

	apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。

	call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即A对象调用B对象的方法

	从定义中可以看出，call和apply都是调用一个对象的一个方法，用另一个对象替换当前对象。

	而不同之处在于传递的参数，

	apply最多只能有两个参数——新this对象和一个数组arg，如果arg不是数组则会报错TypeError；
	call则可以传递多个参数，第一个参数和apply一样，是用来替换的对象，后边是参数列表。

五. call和aplly的简单原生实现

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

六. bind的简单实现

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

七. 让元素隐藏有哪些方法？

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

八 让元素垂直水平居中有哪些方法？

* 元素的宽高已知
	* text-align + line-height

			.box{
				width:100px;
				height:100px;
				display:inline-block;
				text-align:center;
				line-height:100px;
			}
	* position

			.box{
				width:100px;
				height:100px;
				position:absolute;
				left:calc(50% - 50px);
				top:calc(50% - 50px);
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
			}
			.box .child{
				display:table-cell;
				vertical-align: middle;
			}



九 html5和css3新增了哪些？
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

十 html5标签语义化（=>九）
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

十一 svg和canvas的区别（=>九）
* SVG 是一种使用 XML 描述 2D 图形的语言。
* Canvas 通过 JavaScript 来绘制 2D 图形。
* SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
* 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
* Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

十二 sessionStorage，sessopnStorage，cookie的区别(=>九)
1. cookie，sessionStorage，localStorage是存放在客户端，session对象数据是存放在服务器上,session存储数据更安全一些，一般存放用户信息，浏览器只适合存储一般的数据
  2. cookie数据始终在同源的http请求中携带，在浏览器和服务器来回传递,sessionStorage，localStorage仅在本地保存
  3. 大小限制区别，cookie数据不超过4kb，localStorage在谷歌浏览中2.6MB
  4. 数据有效期不同，cookie在设置的（服务器设置）有效期内有效，不管窗口和浏览器关闭
      sessionStorage仅在当前浏览器窗口关闭前有效，关闭即销毁（临时存储）
      localStorage始终有效

十三 token、cookie、session三者的理解
1. token就是令牌，比如你授权(登录)一个程序时,他就是个依据,判断你是否已经授权该软件（最好的身份认证，安全性好，且是唯一的）用户身份的验证方式
2. cookie是写在客户端一个txt文件，里面包括登录信息之类的，这样你下次在登录某个网站，就会自动调用cookie自动登录用户名服务器生成，发送到浏览器、浏览器保存，下次请求再次发送给服务器（存放着登录信息）
3. session是一类用来客户端和服务器之间保存状态的解决方案，会话完成被销毁（代表的就是服务器和客户端的一次会话过程）cookie中存放着sessionID，请求会发送这个id。sesion因为request对象而产生。