import React from 'react'

export default class BindThis extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            msg: '这是默认的msg'
        }

        // 绑定 this 并传参的方式2：在构造函数中绑定并传参
        // 注意：当为一个函数调用 bind 改变了this 指向之后，bind 函数调用的结果，有一个返回值，这个返回值就是被改变this指向后的函数引用
        // 注意，bind不会修改原函数的this指向，一定要承接一下
        this.changeMsg2 = this.changeMsg2.bind(this, '汽车', '变形金刚')
    }

    render(){
        return <div>
            <h1>绑定This并传参的几种方式</h1>
            {/* 
                方式二： 
                    bind的作用：为前面的函数，修改函数内部的 this 指向
                    让函数内部的this指向bind参数列表中的第一个参数
                    bind和call/apply的区别是call/apply修改完this指向之后，会立即调用前面的函数，但是bind不会立即调用，bind只修改this指向
                    注意：bind中的第一个参数是用来修改this指向的，第一个参数后面的所有参数，都将作为将来调用前面函数收的参数传递进去
                    方式1：在事件处理函数中，直接使用 bind 绑定 this 并传参
            */}
            <input type="button" value="绑定this并传参的方式一" onClick={this.changeMsg1.bind(this,"小猪", "佩奇")} />

            <input type="button" value="绑定this并传参的方式二" onClick={this.changeMsg2} />
            {/* 方式三，使用箭头函数，可以将changeMsg3改成箭头函数，也可以通过箭头函数的形式调用 */}
            <input type="button" value="绑定this并传参的方式三" onClick={() => {this.changeMsg3('haha')}} />
            {/* 
                如果将changeMsg3函数改成箭头函数的形式，这里直接调用，那么React在第一次解析到的时候回发现是一个函数调用，回立即调用这个函数，而不是点击之后再调用；
                应当包一个箭头函数，代表是一个函数，而不是函数调用
             */}
            {/* <input type="button" value="绑定this并传参的方式三" onClick={this.changeMsg3('haha')} /> */}
            <hr/>

            <h3>{this.state.msg}</h3>
             {/* 在 Vue 中，有 v-model 指令来实现双向数据绑定，但是，在 React 中，根本没有指令的概念，因此 React 默认也不支持双向数据绑定 */}
            {/* React 只支持，把数据从 state 上传输到页面，但是，无法自动实现数据从页面传输到 state 中进行保存，也就是，React 不支持数据
            的自动逆向传递，只实现了数据的单向绑定 */}
            {/* 注意，如果为表单元素，提供了 value 属性绑定，那么，必须同时为表单元素绑定readOnly属性，或者提供一个onChange事件 */}
            {/* 如果提供了 readOnly，表示这个元素只读的不能被修改 */}
            {/* 如果提供了 onChange 表示这个元素的值可以被修改，但是要自己定义修改的逻辑 */}
            <input type="text" style={{width: '100%'}} value={this.state.msg} onChange={this.txtChange}/>
        </div>
    }

    txtChange = (e) => {
        console.log('ok')
        // 如果想要让文本框在触发 onChange 的时候，同时需要把文本框的最新值保存在state中，那么我们需要手动调用this.setState
        // 获取文本框中最新文本的三种方式
        // 1. 使用document.getElementById()来拿
        // 2. 使用ref来拿
        // 3. 使用事件对象的参数 e 来拿，e.target就表示触发这个事件的事件源对象，得到的是一个原生的JS DOM对象
        // console.log(e.target.value)
        this.setState({
            msg: e.target.value
        })
    }

    changeMsg1(arg1, arg2){
        // 这里的方法是一个普通方法，因此在触发的时候，这里的 this 是 undefined
        // console.log(this)
        this.setState({
            msg: '绑定 this 并传递参数方式1'
        })
    }

    changeMsg2(arg1, arg2){
        // 这里的方法是一个普通方法，因此在触发的时候，这里的 this 是 undefined
        console.log(this)
        this.setState({
            msg: '绑定 this 并传递参数方式2'
        })
    }

    changeMsg3(arg1, arg2){
        // 这里的方法是一个普通方法，因此在触发的时候，这里的 this 是 undefined
        console.log(this)
        this.setState({
            msg: '绑定 this 并传递参数方式3'
        })
    }

    // 更改this的方式


    // 方式一：改成箭头函数之后，函数的this就会指向外围的组件实例
    // changeMsg1 = () => {
    //     // 这里的方法是一个普通方法，因此在触发的时候，这里的 this 是 undefined
    //     console.log(this)
    //     this.setState({
    //         msg: '绑定 this 并传递参数'
    //     })
    // }


}