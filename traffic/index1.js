class TrafficLight {
  constructor(lights) {
    this._lights = lights;
    this._currentIndex = 0; // 记录当前灯下的索引
    this._time = Date.now(); // 记录当前时间
  }
  _update() {
    let disTime = this._disTime();
    // 计算交通灯的展示时间总和
    let total = this._lights.reduce((acc, cur) => {
      return acc + cur.lasts
    }, 0);

    // 代表一个完整的循环周期的开始时间
    this._time += total * Math.floor(disTime / total) * 1000
    disTime = disTime % total; // 从上一个循环周期的开始到现在，还有多少时间没有用完

    while (1) {
      // 在每次循环中，disTime 被减去当前交通灯颜色的持续时间（this.currentLight.lasts）。
      // 如果 disTime 仍然大于或等于 0，那么说明当前交通灯颜色还没有结束，
      // 方法将 _time 向前推进当前交通灯颜色的持续时间，并更新 _currentIndex 为下一个交通灯颜色的索引
      // 一旦 disTime 小于 0，说明当前交通灯颜色已经结束，循环终止。此时，_currentIndex 已经指向了下一个应该显示的交通灯颜色。
      disTime -= this.currentLight.lasts;
      if (disTime < 0) break
      else {
        this._time += this.currentLight.lasts * 1000
        this._currentIndex = (this._currentIndex + 1) % this._lights.length;
        // 将当前交通灯颜色的索引向前移动一个位置。如果当前已经是最后一个交通灯颜色，索引将回绕到数组的第一个元素。
        // 这样，交通灯颜色就能按照数组中的顺序循环切换
      }
    }
  }
  // 访问器
  get currentLight() {
    return this._lights[this._currentIndex]
  }
  // 计算从上次更新到现在经过了多少秒
  _disTime() {
    return (Date.now() - this._time) / 1000
  }
  // 获取当前灯的状态
  getCurrentLight() {
    this._update()
    return {
      color: this.currentLight.color,
      remain: this.currentLight.lasts - this._disTime()
    }
  }
}

const light = new TrafficLight([{
    color: 'red',
    lasts: 3
  },
  {
    color: 'yellow',
    lasts: 2
  }, {
    color: 'green',
    lasts: 5
  }
])
const countdown = document.querySelector('.countdown')
const trafficLightDom = document.querySelectorAll('.traffic-light')

function update() {
  const current = light.getCurrentLight();
  countdown.textContent = Math.ceil(current.remain)
  trafficLightDom.forEach(item=>{
    item.classList.remove('red', 'green', 'yellow')
    if(item.id === current.color){
      item.classList.add(current.color)
    }
  })
}
update()
// 动画，类似于定时器
function raf() {
  requestAnimationFrame(() => {
    raf()
    update()
  })
}

raf()