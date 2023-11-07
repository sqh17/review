# react部分

- [react部分](#react部分)
  - [react原理](#react原理)
  - [react的生命周期](#react的生命周期)
    - [旧版](#旧版)
    - [新版（16.0以上）类组件方式](#新版160以上类组件方式)
    - [新版 函数组件方式](#新版-函数组件方式)
  - [react的diff原理](#react的diff原理)
  - [对react的fiber架构的理解](#对react的fiber架构的理解)
  - [react的setState的机制](#react的setstate的机制)
  - [说说对React的refs的理解](#说说对react的refs的理解)
  - [说说对react的hooks的理解，解决了什么问题](#说说对react的hooks的理解解决了什么问题)
  - [react的key的作用](#react的key的作用)
  - [react之间如何通信](#react之间如何通信)
  - [react引入css的方式有哪些](#react引入css的方式有哪些)
  - [react绑定方式有哪些](#react绑定方式有哪些)
  - [说说react的事件机制](#说说react的事件机制)
  - [说说对受控组件和非受控组件的理解，应用场景](#说说对受控组件和非受控组件的理解应用场景)
  - [react的类组件和函数组件的理解和区别](#react的类组件和函数组件的理解和区别)
  - [super()和super(props)的区别](#super和superprops的区别)
  - [state和props的区别](#state和props的区别)
  - [react有哪些特性](#react有哪些特性)
  - [react构建组件的方式有哪些](#react构建组件的方式有哪些)
  - [在react中组件间的过渡动画如何实现](#在react中组件间的过渡动画如何实现)
  - [react router有几种模式？实现原理](#react-router有几种模式实现原理)
  - [如何提高组件的渲染效率，在组件中如何避免不必要的render](#如何提高组件的渲染效率在组件中如何避免不必要的render)
  - [说说对immutable的理解](#说说对immutable的理解)
  - [说说redux中间件的理解，常用的中间件](#说说redux中间件的理解常用的中间件)
  - [使用 React 进行性能优化时，采取哪些措施](#使用-react-进行性能优化时采取哪些措施)

### react原理

react是通过组件的状态和虚拟dom比较的方式实现的，当状态发生变化时，React 会重新渲染只有发生变化的部分，从而提高性能。这种基于状态更新和虚拟 DOM 的比较是 React 的核心机制，保证了组件的高效更新和视图的响应性。单向数据流。

### react的生命周期

react的生命周期一般都经历组件初始化，组件更新，组件销毁这三大流程

#### 旧版

  1. __componentWillMount__
    在组件将要被挂载到 DOM 上之前调用，可以在此方法中执行一些准备工作。
  2. __componentDidMount__
    在组件初次渲染完成后调用，可以在此方法中执行一些需要 DOM 完成渲染的操作，如 Ajax 请求等
  3. __componentWillReceiveProps(nextProps)__
    在组件接收到新的 props 时调用，可以在此方法中根据接收到的新 props 更新组件的状态
  4. __shouldComponentUpdate(nextProps, nextState)__
    在组件接收到新的 props 或者状态发生改变时调用，可以通过返回布尔值来控制组件是否需要重新渲染，默认返回 true
  5. __componentWillUpdate(nextProps, nextState)__
    在组件将要被重新渲染前调用，可以在此方法中执行一些更新前的准备工作
  6. __componentDidUpdate(prevProps, prevState)__
    在组件重新渲染完成后调用，可以在此方法中执行一些需要 DOM 完成渲染的操作，如更新其他库（如 jQuery）所管理的 DOM
  7. __componentWillUnmount__
    在组件将要被卸载和销毁前调用，可以在此方法中清理组件使用的资源，如取消定时器、取消订阅等
  8. __componentDidCatch(error, info)__
    在组件的子组件发生错误时调用，可以在此方法中捕获错误并进行错误处理

#### 新版（16.0以上）类组件方式

  新版中取消了componentWillMount，componentWillReceiveProps，componentWillUpdate这三个钩子函数，打上了unsafe标识，并且采用新的钩子函数

  1. __constructor(props)__
    在组件被实例化时调用，用于初始化组件的状态和绑定方法，注意：构造函数中不应执行副作用或订阅事件
  2. __static getDerivedStateFromProps(nextProps, prevState)__
    当组件收到新的 props 时调用，用于根据传入的 props 计算并返回新的 state，注意：这是一个静态方法，不应直接访问组件实例的属性
  3. __render()__
    渲染方法，用于返回组件的 React 元素渲染方法，用于返回组件的 React 元素
  4. __componentDidMount()__
    在组件挂载后调用，通常用于执行副作用操作（如数据获取、订阅事件等）或初始化第三方库
  5. __shouldComponentUpdate(nextProps, nextState)__
    在组件接收到新的 props 或 state 时调用，用于决定是否重新渲染组件，可以根据当前的 props 和 state 与下一个传入的 props 和 state 进行比较，返回 true 或 false
  6. __getSnapshotBeforeUpdate(prevProps, prevState)__
    在组件更新前调用，返回一个值作为 componentDidUpdate 方法的第三个参数，可以在此方法中读取 DOM 元素的信息，如滚动位置，在 componentDidUpdate 中进行恢复
  7. __componentDidUpdate(prevProps, prevState, snapshot)__
    在组件更新后调用，通常用于处理更新后的副作用操作，可以在此方法中进行网络请求、订阅事件等
  8. __componentWillUnmount()__
    在组件即将卸载前调用，用于执行一些清理工作，如清除定时器、取消订阅等
  9. __static getDerivedStateFromError(error)__
    当组件的子组件抛出错误时调用，用于捕获错误并返回一个新的 state
  10. __componentDidCatch(error, info)__
    当组件的子组件抛出错误时调用，用于记录错误信息和进行错误处理

挂载阶段：constructor=>static getDerivedStateFromProps=>render=>componentDidMount
更新阶段：static getDerivedStateFromProps=>shouldComponentUpdate=>render=>getSnapshotBeforeUpdate=>componentDidUpdate
卸载阶段：componentWillUnmount

#### 新版 函数组件方式

  1. __useState__
    用于在函数组件中定义和更新状态。替代了传统 class 组件中的 state 属性和 setState 方法
  2. __useEffect__
    用于处理副作用操作，如数据获取、订阅事件、DOM 操作等，替代了传统 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 方法
  3. __useCallback__
    用于缓存回调函数，避免不必要的重新创建
  4. __useRef__
    用于在函数组件中引用 DOM 元素或保存任意可变值
  5. __useContext__
    用于在组件中访问 React 上下文。它接收一个上下文对象并返回该上下文的当前值
  6. __useMemo__
    用于缓存计算结果，避免不必要的重复计算

### react的diff原理

React 会检查组件的 key 属性值，用于确定是否同一个组件（通过 key 的一致性）
React 使用 diff 算法来逐层对比两个 Virtual DOM 树的节点。
Diff 算法会优先比较同级的节点，而不会跨级别比较，

1. 更新相同类型的组件：如果两个节点的类型相同，React 会更新该节点的属性和状态（如果有变化）。
2. 替换不同类型的组件：如果两个节点的类型不同，React 会将旧的节点替换为新的节点。这意味着旧组件的状态会被销毁，新组件会重新创建。
3. 递归比较子节点：如果两个父节点的类型相同，React 会对比它们的子节点。React 会在子节点列表中寻找相同的 key 值，以确定需要进行更新或替换的子节点。
4. 对比顺序：React 会尽可能地复用已有的节点，而不是直接销毁和重新创建，以提高性能

### 对react的fiber架构的理解

传统的 React 渲染是基于递归的深度优先算法，它在进行组件渲染时，会一直递归到底层的子组件，直到渲染完整棵组件树。这种方式存在一个问题，就是如果组件树很大，渲染时间较长，会导致页面卡顿，用户体验不好,React Fiber 是 React 16 版本引入的一种新的调和机制，用于改进 React 的渲染方式，将递归渲染变成迭代渲染，引入一个叫fiber的数据结构，将渲染任务分割成多个小任务，可以中断、恢复和优先级调度，以达到更好的性能，主要以下特点：

1. 任务切片：将大的渲染任务拆分成小的任务单元，每个任务单元被称为一个 Fiber 节点。
2. 调度优先级：Fiber 节点可以分配优先级，分为高优先级、普通优先级和低优先级。这样可以确保高优先级的任务优先执行，提升用户响应速度和流畅度
3. 异步渲染：Fiber 架构中，渲染任务可以被中断和恢复。这样可以在浏览器空闲或用户操作时，优先处理重要的交互事件，提升用户体验
4. 渲染阶段划分：Fiber 将渲染过程划分为不同的阶段，每个阶段有自己的任务类型和优先级。可以根据优先级和任务类型灵活调度任务
5. 双缓存：Fiber 使用双缓存技术，在内存中维护两个 Fiber 树结构，一个当前正在显示的 Fiber 树（Current Fiber Tree）和一个用于计算的新的 Fiber 树（Work In Progress Fiber Tree）。通过比较这两颗树的差异，可以高效地更新组件

### react的setState的机制

组件的 state 属性是只读的，只能通过 setState() 方法来修改。setState() 是一个异步的方法，用于告诉 React 需要更新组件的状态，并触发一次重新渲染。setState() 方法的调用有两个作用：一是更新组件状态，二是告诉 React 需要重新渲染组件
setState() 方法的机制如下：

1. 将参数传递给 setState() 方法，React 会将其合并为一个对象，与原来的 state 合并成一个新的 state 对象
2. React 会根据新的 state 对象计算出需要更新的组件，确定哪些组件需要重新渲染
3. React 会将需要重新渲染的组件加入更新队列，等待更新
4. React 会根据更新队列中组件的优先级和更新的位置，分成一定数量的批次进行更新。这里优先级由多个因素决定，如是否是用户交互触发的更新、是否是首次渲染等
5. 每次批次中，React 会对批次中的组件进行渲染，并将渲染结果更新到 DOM 中

### 说说对React的refs的理解

React 中，refs 是一种访问组件或其中的 DOM 元素的方法。通过使用 ref 属性，你可以创建对组件实例或 DOM 元素的引用,需要注意的是，使用 refs 应该尽量避免过度使用，因为它们会绕过 React 的数据流，打破了组件的封装性

### 说说对react的hooks的理解，解决了什么问题

React Hooks 是 React 16.8 版本引入的一种特性，它允许函数组件在不使用类组件和生命周期方法的情况下管理状态和方法
React Hooks 主要解决了以下几个问题：

1. 状态管理：在类组件中，管理组件的内部状态需要使用 state 和 setState 方法。而在函数组件中，原本是无法直接管理状态的。Hooks 通过引入 useState 钩子函数，使函数组件能够在没有类组件的情况下声明和使用状态。useState 返回一个状态值和更新状态的函数，并且可以用于管理多个状态
2. 生命周期逻辑：在过去，处理组件生命周期方法（例如 componentDidMount 和 componentDidUpdate）需要将逻辑分散在不同的生命周期方法中。这往往导致代码逻辑复杂且难以维护。Hooks 引入了 useEffect 钩子函数，它允许我们在函数组件中执行副作用，例如订阅事件、发送网络请求、处理定时器等。useEffect 接收一个回调函数，该函数会在每次渲染后执行
3. 组件逻辑复用：在类组件中，通过继承和 mixin 可以实现逻辑复用。但这些方法往往增加了组件层级，同时使代码变得复杂。React Hooks 提供了自定义钩子函数的能力，这样我们可以将一组逻辑封装在钩子函数中，并在多个组件间共享和复用这些逻辑
4. 渲染性能优化：在一些特定情况下，当状态变化时，React 类组件可能会重新渲染整个组件树。这会导致性能问题。通过使用 useMemo 和 useCallback 钩子函数，我们可以对一些计算密集型的操作进行优化，只在相关依赖发生变化时重新计算

### react的key的作用

react中的key主要用列表，他能确定列表里每一项的位置，当值发生变化的时候，可以根据key准确快速知道新增删除还是更改，重新渲染时只更新需要变化的部分，提高性能

### react之间如何通信

1. 父组件向子组件传递数据： 父组件可以通过 props 将数据传递给子组件，子组件可以通过 props 来接收并使用这些数据
2. 子组件向父组件传递数据或触发事件： 子组件通过回调函数将数据传递给父组件，或者通过回调函数触发父组件中的事件。父组件可以将回调函数作为 props 传递给子组件，子组件在适当的时机调用回调函数
3. 使用 Context API 进行多层级组件通信： Context API 可以在 React 中实现跨层级的组件通信，避免通过 props 一层一层地传递数据。父组件通过创建一个 Context 对象，并通过 Provider 组件提供数据，子组件通过 Consumer 组件访问数据

### react引入css的方式有哪些

1. 内联样式
2. 模块化 CSS，React 支持使用 CSS 模块化的方式，将样式文件与组件关联起来。在组件的同级目录中创建一个以 .module.css 为后缀的 CSS 文件，并在组件中通过导入语句引入。然后可以使用导入的样式作为类名或属性值
3. 全局 CSS： 可以将 CSS 文件作为全局样式直接引入到项目中

### react绑定方式有哪些

1. 使用箭头函数绑定事件函数，在组件中使用箭头函数定义事件处理函数，并将其作为属性传递给组件中相应的元素。这样在事件触发时，函数内部的 this 会自动绑定为组件实例
2. 使用 bind 方法绑定事件处理函数： 在构造函数中使用 bind 方法来绑定事件处理函数，以确保函数内部的 this 绑定为组件实例
3. 使用类属性语法绑定事件处理函数： 在类组件中，可以使用类属性语法（ES7）来定义事件处理函数，它会自动将函数绑定为组件实例

### 说说react的事件机制

React 的事件机制与浏览器原生事件机制类似，但也有自己独特的特点
React 的事件处理函数与普通的 JavaScript 函数相似，但有一个固定的参数 - 事件对象（event）。与原生的浏览器事件不同的是，React 中的事件是针对虚拟 DOM 的，而不是针对真实 DOM 的。这意味着 React 中的事件处理函数只能够被 React 组件的虚拟 DOM 所监听和处理
合成事件对象是对原生 DOM 事件的一个封装，包含了一些特定属性和方法，target/currentTarget/stopPropagation/preventdefault，

React 处理合成事件的底层原理就是：React 通过在组件上面添加事件监听器的方式来处理事件，当事件触发时，会构建一个合成事件对象。并将该合成事件对象传递给事件监听器，一般是事件委托给更高一级的元素。在事件监听器中，可以通过访问合成事件对象的属性来获取事件的相关信息，在事件处理器执行过程中，可能会修改组件的状态或者触发其他某些操作，从而需要重新渲染组件。React 通过将事件处理器的返回值与当前渲染的组件进行比较，来确定是否需要重新渲染组件

### 说说对受控组件和非受控组件的理解，应用场景

1. 受控组件是指在 React 中，表单元素的值（如 input、select、textarea 等）受 React 组件的状态（state）所控制。也就是说，表单元素的值由组件的状态来决定，并通过事件触发修改组件状态。这种方式下，表单元素的值和状态是同步的
2. 非受控组件是指表单元素的值在 React 组件之外处理，而不受组件状态的控制。换句话说，表单元素的值存储在 DOM 元素本身中，并通过 DOM API 获取和更新

### react的类组件和函数组件的理解和区别

1. 类组件，类组件是通过 ES6 中的 class 关键字和 extends 关键字创建的组件。它们必须继承自 React.Component 或者 React.PureComponent ，并且包含一个 render() 函数，用于返回要渲染的内容，拥有自己的状态（state）和生命周期方法（lifecycle methods）。它们支持 state 和 props 的更新，以及可以动态地渲染和更新内容，适用于面向对象编程风格
2. 函数组件是通过一个函数来创建的，这个函数接受以 props 为参数，并返回要渲染的内容。在函数式组件中，不需要定义 render() 方法，组件的输出直接返回 return 中的内容，通过使用react hooks来操作状态和生命周期

### super()和super(props)的区别

1. super(): 在构造函数中使用 super() 调用父类的构造函数时，不传递任何参数给父类。这意味着在子类的构造函数中，super() 会调用父类的构造函数，但不会传递任何参数。这种情况下，子类继承了父类的所有实例属性和方法，但没有传递额外的参数给父类构造函数
2. super(props): 在构造函数中使用 super(props) 调用父类的构造函数时，将传递当前子类组件的 props 对象作为参数给父类。这意味着在子类的构造函数中，super(props) 会调用父类的构造函数，并传递当前子类组件的 props 给父类。这样可以在父类构造函数中访问和使用传递给子类的属性

### state和props的区别

1. props 是组件的属性，它是从父组件传递给子组件的，是一个只读的变量，子组件不能修改它的值。props 通过组件属性来传递数据，父组件通过设置属性值并传递给子组件，子组件内部通过 this.prop 来获取其值，从而实现与父组件之间的数据交流，
2. state 是组件的状态，是在组件中可变的数据，只能被组件自身修改。state 通常是在组件的 constructor() 中初始化，或在生命周期方法中更新其值，从而达到在组件内部管理和更新其状态的目的。

其主要的区别在于：

1. props 是从外部传递给组件的，组件本身无法修改其值；
2. state 是组件内部的状态，能够在组件内部被修改。

### react有哪些特性

1. 组件化开发
2. 虚拟dom
3. 单向数据流
4. jsx语法
5. react hooks
6. 强大的生命周期函数
7. 支持服务端渲染

### react构建组件的方式有哪些

1. 类组件（Class Components）： 类组件是通过继承 React.Component 类并实现 render 方法来定义的。类组件具有状态（state）和生命周期方法，可以处理复杂的逻辑和交互。使用类组件时，组件的状态和属性可以通过 this.state 和 this.props 进行访问

    ```javascript
    import React from 'react';
    class MyClassComponent extends React.Component {
      constructor(props) {
        super(props);
        // 构造函数，用于初始化组件的状态等
      }
      componentDidMount() {
        // 组件挂载后执行的生命周期方法，可以发送请求等操作
      }
      componentDidUpdate(prevProps, prevState) {
        // 组件更新后执行的生命周期方法，可以根据前后 props 或 state 的变化进行相关操作
      }
      componentWillUnmount() {
        // 组件卸载前执行的生命周期方法，可以清理定时器、取消订阅等操作
      }
      handleClick() {
        // 处理点击事件逻辑
      }
      render() {
        return <button onClick={this.handleClick}>Click me</button>;
      }
    }
    ```

2. 函数组件（Function Components）： 函数组件是使用纯函数的方式来定义的，没有自己的状态。函数组件接收一个 props 参数，并返回一个 React 元素。通过使用 React Hooks API，函数组件可以管理状态和生命周期

    ```javascript
    import React from 'react';
    function MyFunctionComponent(props) {
      return <div>Hello, I am a function component</div>;
    }
    ```

3. 无状态函数组件（Stateless Function Components）： 无状态函数组件是函数组件的一种特殊形式，它没有 this 上下文，也没有生命周期方法。它只接收 props 并返回一个 React 元素。这种组件适用于只需要根据传入的属性渲染内容的场景

    ```javascript
    import React from 'react';
    const MyStatelessFunctionComponent = (props) => {
      return <div>Hello, I am a stateless function component</div>;
    };
    ```

### 在react中组件间的过渡动画如何实现

### react router有几种模式？实现原理

1. BrowserRouter： 使用 HTML5 的 pushState 和 popState API 来处理路由。它通过修改浏览器的 URL，而不会重新加载页面。BrowserRouter 需要后端服务器的支持，用于在任何路由下都返回同一个 HTML 页面，并由前端路由处理页面的渲染。
2. HashRouter： 使用 URL 的哈希部分（即 # 后面的部分）来处理路由。HashRouter 的实现不依赖于浏览器的历史 API，因此可以在不支持 HTML5 History API 的环境中使用（例如旧版浏览器或一些特殊环境）。
3. MemoryRouter： 使用内存中的 URL 来处理路由。它不会改变浏览器的 URL，而是在内存中管理路由状态。MemoryRouter 通常用于非浏览器环境，如服务器渲染或测试环境
实现原理
基于 React 的组件化和虚拟 DOM 的概念。当路由切换时，React Router 会更新当前路由对应的组件树，并根据具体的路由参数（如路径参数、查询参数等）来渲染相应的组件

### 如何提高组件的渲染效率，在组件中如何避免不必要的render

1. 使用 PureComponent 或 shouldComponentUpdate： PureComponent 是 React 提供的一个优化了的组件基类，它已经实现了 shouldComponentUpdate 方法来基于浅比较检查当前组件的 props 和 state 是否发生变化。如果没有变化，则不进行重新渲染。如果不使用 PureComponent，可以手动在组件中实现 shouldComponentUpdate 方法，根据业务逻辑判断是否需要重新渲染。
2. 使用 React.memo： React.memo 是一个高阶函数，用于包裹函数组件并对其进行记忆化。它会通过比较组件的 props 是否发生变化来决定是否进行重新渲染。可以在函数组件外部使用 React.memo 包裹组件，从而避免不必要的重新渲染。
3. 避免在 render 方法中创建新的对象： 在每次渲染时创建新的对象，会导致 React 认为组件的 props 或 state 发生了变化，从而触发重新渲染。可以通过将对象提前创建并保存在组件实例中，或者使用 useMemo 或 useCallback 来缓存对象，避免在每次渲染时创建新对象。
4. 使用 shouldComponentUpdate 或 React.memo 进行深层比较： 默认情况下，React 在进行比较时使用的是浅比较。但是当需要比较复杂的数据结构或嵌套对象时，浅比较可能无法正确检测到变化。可以在 shouldComponentUpdate 方法或 React.memo 中使用深层比较来检查更复杂的数据结构。
5. 使用 Key 属性来唯一标识子组件： 当在列表或动态生成组件时，为每个子组件提供唯一的 key 属性。这样，当列表发生变化时，React 可以根据 key 属性来判断哪些子组件需要更新、删除或添加，避免不必要的重新渲染

### 说说对immutable的理解

Immutable（不可变）是一种数据的编程模式，它表示在对象创建后不可被修改。Immutable 数据结构的特点是一旦创建就不能被更改，任何修改操作都会返回一个新的对象。这种不可变性带来了一些好处，例如更好的性能、更易于追踪数据的变化和高效的状态管理

### 说说redux中间件的理解，常用的中间件

### 使用 React 进行性能优化时，采取哪些措施

1. 列表渲染确保唯一key
2. 避免在 render 方法中直接绑定函数，可以使用箭头函数或将函数绑定到类的实例上，以避免在每次渲染时创建新的函数
3. 使用 React 的 Fragment 或空标签（<>…</>）来取代不必要的包裹元素，减少生成的 DOM 节点数量
4. 将较大的组件拆分成较小的子组件，以提高组件的可读性和可维护性，并能更好地利用 React 的重渲染优化策略
5. 使用 React 的 lazy 和 Suspense 功能来延迟加载和渲染组件，以减少页面的初始加载时间
6. 使用 useMemo 和 useCallback 函数来缓存计算结果和事件处理函数，避免不必要的计算和函数重复创建
7. 使用应用程序状态管理库（如 Redux、Mobx）来避免不必要的组件重渲染，并在组件之间共享数据和状态
