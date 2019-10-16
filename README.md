#### 开头
为了备战面试，从其他的面试题或者想到的问题总结如下，最低一天一个题。

  一. 什么是二分查找，思路是什么？实现方式有哪些？

    二分查找：就是在一个已排序的数组中通过值去查找索引。 
    思路：  1.将已排序的数组折半，分成两个数组。  
           2.判断要查找的数和中间位置数值的大小，来判断要查找的数实在哪一半  
           3.之后继续折半查找，直至找到这个数。

	时间复杂度：O(log2n) => O(logn)
    代码实现：
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
