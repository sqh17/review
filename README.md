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
