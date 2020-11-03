import React from 'react'
import ReactTypes from 'prop-types'

// 方式一：逐层传递数据
// 最外层的父组件
// export default class Com1 extends React.Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             color: 'red'
//         }
//     }

//     render(){
//         return <div>
//             <h1>这是父组件</h1>
//             <Com2 color={this.state.color}></Com2>
//         </div>
//     }
// }

// // 中间的子组件
// class Com2 extends React.Component {

//     render(){
//         return <div>
//             <h3>这是子组件</h3>
//             <Com3 color={this.props.color}></Com3>
//         </div>
//     }
// }

// // 内部的孙子组件
// class Com3 extends React.Component {
//     render(){
//         return <div>
//             <h5 style={{color: this.props.color}}>这是孙子组件</h5>
//         </div>
//     }
// }

// 方式二：使用context
// 最外层的父组件
export default class Com1 extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            color: 'red'
        }
    }

    // 1. 在父组件中，定义一个 function，这个 function 有个固定的名称，叫做 getChildContext，内部
    // 必须返回一个对象，这个对象，就是要共享给所有子酸自建的数据
    getChildContext(){
        return {
            color: this.state.color
        }
    }

    // 2. 使用属性校验，规定一下传递给子组件的数据类型，需要定义一个静态的（static）
    // childContextTypes（固定名称，不要改）
    static childContextTypes = {
        color: ReactTypes.string  //规定了传递给子组件的数据类型
    }

    render(){
        return <div>
            <h1>这是父组件</h1>
            <Com2></Com2>
        </div>
    }
}

// 中间的子组件
class Com2 extends React.Component {

    render(){
        return <div>
            <h3>这是子组件</h3>
            <Com3></Com3>
        </div>
    }
}

// 内部的孙子组件
class Com3 extends React.Component {

    // 3. 上来之后，先来个属性校验，校验一下父组件传递过来的参数类型
    static contextTypes = {
        color: ReactTypes.string  // 这里，如果子组件想要使用父组件通过 context 共享的数据，
        // 那么在使用之前，一定要先做一下数据类型校验
    }

    render(){
        return <div>
            <h5 style={{color: this.context.color}}>这是孙子组件---{this.context.color}</h5>
        </div>
    }
}

