const redLight = document.getElementById('red');  
const yellowLight = document.getElementById('yellow');  
const greenLight = document.getElementById('green');  
const countdownElement = document.querySelector('.countdown');  
  
let currentTime = 5; // 初始倒计时时间  
let currentLight = 'green'; // 初始交通灯颜色  
greenLight.classList.add('green');  
// 定义交通灯颜色变化的时间  
const lightDurations = {  
  green: 5000, // 绿灯时间（毫秒）  
  yellow: 2000, // 黄灯时间（毫秒）  
  red: 7000 // 红灯时间（毫秒）  
};  
  
// 更新倒计时的函数  
function updateCountdown() {  
  if (currentTime > 0) {  
    countdownElement.textContent = currentTime;  
    currentTime--;  
    setTimeout(updateCountdown, 1000);  
  } else {  
    changeLight();  
  }  
}  
  
// 切换交通灯颜色的函数  
function changeLight() {  
  switch (currentLight) {  
    case 'green':  
      greenLight.classList.remove('green');  
      yellowLight.classList.add('yellow');  
      currentLight = 'yellow';  
      currentTime = lightDurations.yellow / 1000; // 转换为秒  
      break;  
    case 'yellow':  
      yellowLight.classList.remove('yellow');  
      redLight.classList.add('red');  
      currentLight = 'red';  
      currentTime = lightDurations.red / 1000; // 转换为秒  
      break;  
    case 'red':  
      redLight.classList.remove('red');  
      greenLight.classList.add('green');  
      currentLight = 'green';  
      currentTime = lightDurations.green / 1000; // 转换为秒  
      break;  
  }  
  updateCountdown(); // 重置倒计时  
}  
  
// 初始化倒计时  
updateCountdown();  