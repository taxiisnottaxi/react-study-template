import React from 'react'

// 评论框组件
export default class CMTBox extends React.Component {
    render(){
        return <div>
            <label>评论人：</label><br/>
            <input type="text" ref="user"/><br/>
            <label>评论内容：</label><br/>
            <textarea cols="30" rows="4" ref="content"></textarea><br/>
            <input type="button" value="发表评论" onClick={this.postComment}/>
        </div>
    }

    postComment = () => {
        // 1. 获取到评论人和评论内容
        // this.refs.user 是一个元素，此处需要挑出其 value 值
        var cmtInfo = { user: this.refs.user.value, content: this.refs.content.value }
        // 2. 从本地存储中，现获取之前的评论数组
        var list = JSON.parse(localStorage.getItem('cmts') || '[]')
        // 3. 把最新的这条评论，unshift 进去
        list.unshift(cmtInfo)
        // 4. 把最新的评论数组保存到本地去
        localStorage.setItem('cmts', JSON.stringify(list))
        // 5. 将表内容清空
        this.refs.user.value = this.refs.content.value = ''

        this.props.reload()
    }
}
