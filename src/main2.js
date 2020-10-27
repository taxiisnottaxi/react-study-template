// JS 打包入口文件
// 1. 导入 React 包
import React from 'react'
import ReactDOM from 'react-dom'

// 使用 JS 语法，创建虚拟DOM元素
// var myDiv = React.createElement('h1', {id: 'myDiv', title: 'ok'}, '这是一个H1')
// 使用 JSX 语法，创建虚拟DOM，本质是一种转换过程，转成 createElement
var myDiv = <div>OKOKOK</div>





// 在使用 Hello 组件之前,先导入组件
import Hello from './components/Hello.jsx'
import Hello2 from './components/Hello2.jsx'

// 注意：以上两种创建组件的方式，具有本质上的区别，其中
// 使用 function 构造函数创建的组件，内部没有state私有数据，只有一个 props 来接收外界传递过来的数据；
// 使用 class 关键字创建的组件，内部，除了有 this.props 这个只读属性之外，还有一个专门用于存放
// 自己私有数据的 this.state 属性，这个 state 是可读可写的！
// 基于上面的区别：我们可以为这两种创建组件的方式，下定义：
// 使用 function 创建的组件，叫做【无状态组件】；使用class创建的组件叫做【有状态组件】
// 有状态组件和无状态组件最本质的区别就是有无 state 属性；同时，class 创建的组件，有自己的生命周期函数，
// 当时，function 创建的组件，没有自己的生命周期函数；
// 问题来了：什么时候使用有状态组件？什么时候使用无状态组件？
// 1. 如果一个组件需要存放自己的私有数据，或者需要在组件的不同阶段执行不同的业务逻辑，
// 此时非常适用 class 创建出来的有状态组件
// 2. 如果一个组件，只需要根据外界传递过来的 props，渲染固定的页面结构，就使用
// function创建出来的无状态组件；（使用无状态组件的小小好处是：由于剔除了组件的
// 生命周期，所以，运行速度会相对快一丢丢）


ReactDOM.render(
    <div>
        <Hello name="zs" age={20}></Hello>
        <Hello2 address="北京传智播客" info="黑马程序员"></Hello2>
    </div>,
    document.getElementById('app')
)
