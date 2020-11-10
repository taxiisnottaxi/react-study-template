// 这是项目的根组件
import React from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'

// 全局导入样式，默认会按需导入
import 'antd/dist/antd.css'
// 导入模块化的样式
import styles from  './css/app.scss'

// 导入需要的 ant design 组件
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

// 导入路由相关的组件页面
import HomeContainer from './components/home/Home.jsx'
import MovieContainer from './components/movie/Movie.jsx'
import AboutContainer from './components/about/About.jsx'

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentWillMount(){
        console.log()
    }

    render() {
        return <HashRouter>
            <Layout className="layout" style={{height: '100%'}}>
                {/* Header 头部区域 */}
                <Header>
                    <div className={styles.logo} />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={window.location.hash.split('/')[1]}>
                        <Menu.Item key="home">
                            <Link to="/home">首页</Link>
                        </Menu.Item>
                        <Menu.Item key="movie">
                            <Link to="/movie/in_theaters/1">电影</Link>
                        </Menu.Item>
                        <Menu.Item key="about">
                            <Link to="/about">关于</Link>
                        </Menu.Item>
                    </Menu>
                </Header>

                {/* 中间的内容区域 */}
                {/* flex=1代表占了剩余的高度 */}
                <Content style={{ backgroundColor: "#fff", height: '100%', flex: 1}}>
                    <Route path="/home" component={HomeContainer}></Route>
                    <Route path="/movie" component={MovieContainer}></Route>
                    <Route path="/about" component={AboutContainer}></Route>
                </Content>

                {/* Footer底部区域 */}
                <Footer style={{ textAlign: 'center' }}>2020 react 牛刀小试</Footer>
            </Layout>
        </HashRouter>
    }
}
