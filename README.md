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

五. call和aplly的原生实现

六. bind的实现
