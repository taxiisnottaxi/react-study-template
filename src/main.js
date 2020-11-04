// JS 打包入口文件
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.jsx'

// 全局导入 Ant Design 的样式表
// 一般，我们使用的第三方UI组件的样式文件是以.css结尾的，所以，我们最好不要为.css后缀名的文件启用模块化
// 我们推荐自己不要手写.css文件，而是自己手写 scss 或 less 文件启用模块化就好了
// antd 的 JS 代码默认支持基于 ES modules 的 tree shaking。即按需加载
import 'antd/dist/antd.css'

// 使用 render 函数渲染 虚拟DOM
ReactDOM.render(<App></App>, document.getElementById('app'))
