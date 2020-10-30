// JS 打包入口文件
import React from 'react'
import ReactDOM from 'react-dom'

// 导入计数器组件
// import Counter from './components/Counter.jsx'
import Test from './components/TestReceiveProps.jsx'

// 使用 render 函数渲染 虚拟DOM
ReactDOM.render(
    <div>
        {/* 规定，每个用户在使用组件的时候，必须传递一个默认的数量值，作为组件初始化的数据 */}
        {/* <Counter initCount={3}></Counter> */}
        <Test></Test>
    </div>,
    document.getElementById('app')
)
