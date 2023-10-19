
// 深拷贝1
function deepClone(obj, hash = new WeakMap()){
  if(obj instanceof RegExp) return new RegExp(obj)
  if(obj instanceof Date) return new Date(obj)
  if(obj === null || typeof obj !== 'object') return obj
  if(hash.has(obj)) return hash.get(obj)
  let t = new obj.constructor()
  hash.set(obj,t)
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      t[key] = deepClone(obj[key], hash)
    }
  }
  return t
}
// 深拷贝2
function deepClone(obj){
  if(obj instanceof RegExp) return new RegExp(obj)
  if(obj instanceof Date) return new Date(obj)
  if(obj === null || typeof obj !== 'object') return obj
  let newObj = Array.isArray(obj) ? [] : {}
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      if(typeof obj[key] === 'object'){
        newObj[key] = deepClone(obj[key])
      }else{
        newObj[key] = obj[key]
      }
    }
  }
  return newObj
}

// 模拟new
function _new(constructor, ...args){
  let obj = Object.create(constructor.prototype)
  let res = constructor.apply(obj, args)
  return res !== null && typeof res === 'object' ? obj : res
}

// 防抖
function debounce(func, delay, isImmediate){
  let timer = null
  if(isImmediate){
    let flag = true
    return function(){
      clearTimeout(timer)
      if(flag){
        func.apply(this,arguments)
        flag = false
      }else{
        timer = setTimeout(()=>{
          flag = true
        }, delay)
      }
    }
  }
  return function(){
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this, arguments)
    }, delay)
  }
}

// 节流
function throttle(func, delay, isImmediate){
  let timer = null
  if(isImmediate){
    let flag = true
    if(!timer){
      if(flag){
        func.apply(this,arguments)
        flag = false
      }
      timer = setTimeout(() => {
        flag = true;
        timer = null;
      }, wait);
    }
  }
  return function (){
    if(!timer){
      timer = setTimeout(()=>{
        func.apply(this, arguments)
        timer = null
      }, delay)
    }
  }
}

// 节流+防抖综合
function debounce_throttle(func, delay){
  let last = 0;
  let timer = null;
  return function(){
    let context = this;
    let args = arguments;
    let now = +new Date()
    if(now - last < delay){
      clearTimeout(timer)
      timer = setTimeout(()=>{
        last = now;
        func.apply(context, args)
      },delay)
    }else{
      last = now;
      func.apply(context, args)
    }
  }
}


function flat(arr) {
  let res = []
  for(let i = 0; i<arr.length;i++){
    if(arr[i] instanceof Array){
      res = res.concat(flat(arr[i]))
    }
    else{
      res.push(arr[i])
    }
  }
  return res
}
// console.log(flat([1,2,[3,4,[5,6,[7,8,[9,10]]]],11]))


function _instanceof(left, right){
  let _proto = left.__proto__
  let prototype = right.prototype
  if(_proto === null || typeof _proto !== 'object'){
    return false
  }else{
    if(_proto === prototype){
      return true
    }
    return _instanceof(_proto.__proto__,prototype)
  }

}
console.log(_instanceof([1,23,4], Object))