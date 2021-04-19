import React from 'react'

export default class About extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return<div style={{margin:200}}>
            这个网站是一个豆瓣电影的简易展示网站
        </div>
    }
}
