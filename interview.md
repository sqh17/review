# 开头

该部分就是记录面试的问题以及回答

#### 1025面试

1. url输入到页面展示的过程，dom渲染过程
    前者忽略，说后者
    1. 解析html，构建dom树，自上而下，自左向右的顺序解析html元素，并将他们转为dom节点，形成依赖关系的树状层次树
    2. 构建render树，在解析html中，会解析css，生成cssom树，两者相结合，形成render树，并计算几何信息，盒模型的尺寸位置
    3. 布局layout，浏览器进行布局计算，确定每个节点的准确位置和大小
    4. 绘制painting，根据布局计算的结果，将页面绘制在屏幕上
    5. 合成，绘制完成后，浏览器会将绘制结果合成为一张或多张页面表面（Layer），可以减少页面的重绘和重排次数，并提高渲染性能。
2. 两栏布局，左侧固定200px;右侧自适应，五种方式

    ```html
    <div class='con'>
      <div class="left"></div>
      <div class="right"></div>
    </div>
    ```

    1. flex

        ```css
        .con{
          display: flex;
        }
        .left{
          width: 200px;
        }
        .right{
          flex: 1;
        }
        ```

    2. grid

        ```css
        .con{
          display: grid;
          grid-template-columns: 200px 1fr;
        }
        ```

    3. position

        ```css
        .con{
          position: relative;
        }
        .left{
          position: absolute;
          left: 0;
          top: 0;
          width: 200px;
        }
        .right{
          margin-left: 200px;
        }
        ```

    4. margin

        ```css
        .con{
          oveflow: hidden;
        }
        .left{
          float: left;
          width: 200px;
        }
        .right{
          margin-left: 200px;
        }

        ```

    5. float

        ```css
        .con{
          oveflow: hidden;
        }
        .left{
          float: left;
          width: 200px;
        }
        .right{
          margin-left: 200px;
        }
        ```

3. 怎么判断已滚动到底部

  ```javascript
  function isScrollAtBottom() {
    // 获取当前滚动位置
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // 获取页面可视区域的高度
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // 获取页面内容总高度
    var documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // 判断是否滚动到底部
    if (scrollPosition + windowHeight >= documentHeight) {
      return true;
    } else {
      return false;
    }
  }

  ```

4. 怎么判断对象是空对象

    1. for in
    2. Object.keys(obj).length === 0
    3. JSON.stringify(obj) === '{}'
    4. Object.getOwnPropertyNames(obj).length === 0
    5. Reflect.ownKeys(obj).length === 0
    6. Object.values(obj).length === 0
    7. Object.entries(obj).length === 0

5. 移动端如何画1px的线，太粗了

    1. 使用 CSS 的 border-width 和 transform 属性

          ```css
          .line {
            position: relative;
            border-top: 1px solid #000;
            transform: scaleY(0.5);
          }
          ```

    2. 使用 CSS 的 ::before 或 ::after 伪元素以及 transform 属性

          ```css
          .line {
            position: relative;
          }
          .line::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 1px;
            background-color: #000;
            transform: scaleY(0.5);
          }
          ```

    3. svg

          ```html
          <svg class="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
            <line x1="0" y1="0.5" x2="1" y2="0.5" stroke="#000" stroke-width="1" />
          </svg>
          ```

    4. canvas

          ```javascript
          var canvas = document.getElementById('lineCanvas');
          var context = canvas.getContext('2d');
          var devicePixelRatio = window.devicePixelRatio || 1;
          var backingStoreRatio = context.webkitBackingStorePixelRatio || 1;
          var ratio = devicePixelRatio / backingStoreRatio;
          var lineWidth = 1 * ratio;

          canvas.width = canvas.offsetWidth * ratio;
          canvas.height = 1 * ratio;

          context.lineWidth = lineWidth;
          context.strokeStyle = '#000';
          context.beginPath();
          context.moveTo(0, 0.5);
          context.lineTo(canvas.width, 0.5);
          context.stroke();
          ```

6. 上机题
  略
