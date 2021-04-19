/* eslint-disable */
import React from 'react'

// 布局相关的组件
import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;

// 路由相关组件
import { Link, Route, Switch } from 'react-router-dom'
// 导入路由组件页面
import MovieList from './MovieList.jsx'
import MovieDetail from './MovieDetail.jsx'

export default class Movie extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return <Layout style={{height: '100%'}}>
        <Sider width={200} className="site-layout-background">
            <Menu mode="inline" defaultSelectedKeys={window.location.hash.split('/')[2]} style={{ height: '100%', borderRight: 0 }}>
                <Menu.Item key="in_theaters">
                    <Link to="/movie/in_theaters/1">正在热映</Link>
                </Menu.Item>
                <Menu.Item key="comming_soon">
                    <Link to="/movie/comming_soon/1">即将上映</Link>
                </Menu.Item>
                <Menu.Item key="top250">
                    <Link to="/movie/top250/1">Top250</Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout style={{ paddingLeft: '1px' }}>
            <Content style={{background:'#fff',padding: 10,margin: 0,minHeight: 280}}>
                {/* 在匹配路由规则的时候,这里提供了两个参数 */}
                {/* 如果想要从路由规则中,提取参数,需要使用 this.props.match.params */}
                {/* 注意：哪怕为路由启用了 exact 精确匹配模式，也会从善到下，把所有的路由规则匹配一遍 */}
                {/* 使用 Switch 可以实现只匹配第一个匹配到的 */}
                <Switch>
                    <Route exact path="/movie/detail/:id" component={MovieDetail}></Route>
                    <Route exact path="/movie/:type/:page" component={MovieList}></Route>
                </Switch>
            </Content>
        </Layout>
      </Layout>
    }
}
