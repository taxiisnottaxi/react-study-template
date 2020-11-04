import React from 'react'

// react-router-dom
// 如果要使用路由模块，第一步，安装：npm install react-router-dom

// 第二步，导入路由模块，按需导入三个
// 1.HashRouter 表示一个路由的根容器，将来所有的路由相关的东西，都要包裹在 HashRouter 里面
//      而且，一个网站中，只需要一个 HashRouter 就好了
// 2.Route 表示一个路由规则，在 Route 上有两个比较重要的属性，path 和 component
// 3.Link 表示一个路由的链接，就好比 vue 中的 <router-link to=""></router-link>
import { HashRouter, Route, Link } from 'react-router-dom'

import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Movie from './components/Movie.jsx'

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        // 当使用 HashRouter 把 App 根组件的元素包裹起来之后，网站就已经启用路由了
        // 一个 HashRouter 中只能放唯一的根元素
        // 在一个网站中，只需要使用唯一一次 <HashRouter></HashRouter>即可
        return <HashRouter>
            <div>
                <h1>这是网站的APP根组件</h1>
                <hr/>
                <Link to="/home">首页</Link>&nbsp;&nbsp;
                <Link to="/movie/top250/10">电影</Link>&nbsp;&nbsp;
                <Link to="/about">关于</Link>
                <hr/>

                {/* Route创建的标签就是路由规则，其中 path 表示要匹配的内容，component表示要展示的组件 */}
                {/* 在 Vue 中有一个专门的 router-view 标签，专门用来放置匹配到的路由组件，但是
                 react-router 中并没有类似这样的标签，而是直接将 Router 当做占位符 */}
                {/* Route 具有两种身份：
                        1. 一个路由匹配规则
                        2. 一个占位符，表示将来匹配到的组件都放到这个位置 */}
                <Route path="/home" component={Home}></Route>
                <hr/>
                {/* 注意：默认情况下，路由中的规则是模糊匹配的，如果路由可以部分匹配成功，
                就会展示路由对应的组件，精确匹配要添加exact属性 */}
                {/* 如果要匹配参数，则可以在匹配规则中使用:修饰符，表示这个位置匹配到的是参数 */}
                <Route path="/movie/:type/:id" component={Movie} exact></Route>
                <hr/>
                <Route path="/about" component={About}></Route>
            </div>
        </HashRouter>
    }
}