import React from 'react'
// 导入 fetch-jsonp
import fetchJSONP from 'fetch-jsonp'

// 导入 UI 组件
import { Spin, Alert, Pagination } from 'antd';

import MovieItem from './MovieItem.jsx'

export default class MovieList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movies: [], // 电影列表
            nowPage: parseInt(props.match.params.page) || 1,//当前展示第几页的数据
            pageSize: 12,// 每页显示多少条数据
            total: 0,// 当前电影分类下,总共有多少条数据
            isLoading: true,//如果为true,表示正在加载数据
            movieType: props.match.params.type//保存一下要获取的电影的类型
        }
    }

    componentWillMount(){
        // fetch('http://www.baidu.com')
        //     .then(response => {
        //         //当使用 fetch API 获取数据的时候,第一个 .then 获取不到数据
        //         // 第一个 .then 拿到的是一个 Promise 对象,我们可以调用 response.json 得到一个新的 Promise
        //         // console.log(response)
        //         return response.json() // 是一个 Promise 对象
        //     })
        //     .then(data => {
        //         console.log(data)
        //     })

        // setTimeout(() => {
        //     // 假设 1s 以后,数据获取回来了,就将isLoading设置为false
        //     this.setState({
        //         isLoading: false
        //     })
        // },  3000)
        this.loadMovieListByTypeAndPage()
    }

    componentWillReceiveProps(nextProps){
        // 每当地址栏变化的时候，重置state中的参数项，重置完毕之后，我们可以重新发起数据请求
        this.setState({
            isLoading: true,// 又要重新加载数据了
            nowPage: parseInt(nextProps.match.params.page) || 1,//要获取第几页的数据
            movieType: nextProps.match.params.type, //电影类型
        }, function(){
            this.loadMovieListByTypeAndPage()
        })
    }

    render() {
        return <div>
            {this.renderList()}
            
        </div>
    }

    // 根据电影类型和页码,获取电影数据
    loadMovieListByTypeAndPage = () => {
        // fetch受跨域限制,无法访问
        // fetch('https://api.douban.com/v2/movie/in_theaters')
        // .then(response => response.json())
        // .then(data=>{
        //     console.log(data)
        // })

        // 开始获取数据的索引
        // const start = this.state.pageSize * (this.state.nowPage - 1)
        // const url = `https://api.douban.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`

        // // 注意:默认的 windows.fetch受到跨域限制,无法直接使用,这时候,我们使用第三方包
        // // fetch-jsonp来发送 JSONP 请求,和浏览器内置的fetch完全兼容
        // // 使用 fetch-jsonp,Make JSONP request like window.fetch
        // fetchJSONP(url)
        // .then(response => response.json()) //箭头函数可以忽略return
        // .then(data=>{
        //     // console.log(data)
        //     this.setState({
        //         isLoading: false,//将loading项目隐藏
        //         movies: data.subjects,//为电影列表重新赋值
        //         total: data.total,//把总条数保存到state上
        //     })
        // })

        // var data = {}
        // if (this.state.movieType === 'top250') {
        //     data = require('../test_data/top250.json')
        // }else if(this.state.movieType === 'in_theaters'){
        //     data = require('../test_data/in_theaters.json')
        // }else if(this.state.movieType === 'comming_soon'){
        //     data = require('../test_data/comming_soon.json')
        // }
        // console.log(this.state.movieType)
        const data = require(`../test_data/${this.state.movieType}.json`)
        setTimeout(() => {
            this.setState({
                isLoading: false,//将loading项目隐藏
                movies: data.subjects,//为电影列表重新赋值
                total: data.total,//把总条数保存到state上
            })
        }, 1000)
    }

    // 渲染电影列表的方法
    renderList = () => {
        if(this.state.isLoading){
            return <Spin tip="Loading...">
                <Alert
                message="正在加载中..."
                description="精彩内容,马上呈现..."
                type="info"
                />
            </Spin>
        }else{
            return <div style={{height: '100%'}}>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {this.state.movies.map(item => {
                        return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
                    })}
                </div>
                {/* 分页 */}
                
                <Pagination defaultCurrent={this.state.nowPage} pageSize={this.state.pageSize} total={this.state.total/12} onChange={this.pageChanged} />
            </div>
        }
    }

    // 当页码改变的时候，加载新一页的数据
    pageChanged = (page) => {
        // 由于我们手动使用 BOM 对象实现了跳转，这样不好，最好使用路由的方法进行编程式导航
        // window.location.href = '/#/movie' + this.state.movieType + '/' + page
        // 使用 react-router-dom 实现编程式导航
        this.props.history.push('/#/movie' + this.state.movieType + '/' + page)
    }
}

// 在 React 中,我们可以使用 fetch API 来获取数据,fetch API是基于 Promise 封装的
