/* eslint-disable */
import React from 'react'

import {Button, Icon, Spin, Alert} from 'antd'

import fetchJSONP from 'fetch-jsonp'

export default class MovieDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            info: {}, // 电影信息对象
            isLoading: false
        }
    }

    componentWillMount(){
        fetchJSONP('https://api.douban..com/v2/movie/subject/' + this.props.match.params.id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                info: data
            })
        })
    }

    render() {
        return <div>
            <Button type="primary" onClick={this.goBack}>
                {"< 返回电影列表页面"}
            </Button>
            {this.renderInfo()}
        </div>
    }

    // 实现返回按钮的功能
    goBack = () => {
        this.props.history.go(-1)
    }

    renderInfo = () => {
        if(this.state.isLoading){

        }else{
            return <div>
                <div style={{textAlign: "center"}}>
                    <h1>{this.state.info.title}</h1>
                    <img src={this.state.info.images.large.replace('img3','img1')}/>
                </div>
                <p style={{textIndent: '2em', lineHeight: '30px'}}>{this.state.info.summary}</p>
            </div>
        }
    }
}
