import React from 'react'

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return<div style={{margin:200}}>
            我们使用react-router-dom这个库实现React的路由，这里链接的是Home页面，整个页面核心部分在电影路由那边。
        </div>
    }
}
