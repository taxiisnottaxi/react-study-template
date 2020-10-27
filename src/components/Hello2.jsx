import React from 'react'
// 区别2：
// 虽然在 React dev tools 中，并没有显示说 class 组件中的 props 是只读的
// 但是经过测试得知，是只读的。只要是组件的 props，就是只读的

// 使用 class 创建的类，通过 extends 关键字，继承了 React.Component 之后，
// 这个类就是一个组件的模板，如果想要引用这个组件，
// 可以把类的名称以标签形式导入模板中
export default class Hello2 extends React.Component{
    constructor(props) {
        // 注意：如果使用 extends 实现了继承，那么在 constructor 的第一行
        // 一定要显式调用一下 super()
        // super() 表示父类的构造函数
        super()
        // 注意：在构造器中，要想访问props，不可直接通过 this.props，需要显式定义props
        // 建议创建 constructor 之后，带上props这个参数
        console.log(props)

        // 注意：这是固定写法，this.state 表示当前组件实例的私有数据对象，
        // 就好比 Vue 中，组件实例身上的 data 函数
        // data(){return {}}函数
        // 如果 state 中的数据想要在组件中使用，直接通过 this.state.属性访问
        this.state = {
            msg: '这是Hello2组件的私有属性'
        }
    }

    // 类的内部需要有 render 函数
    render() {
        return <div>
            <h1>这是使用 class 类创建的组件</h1>
            <h3>外界传递过来的数据是：{this.props.address}---{this.props.info}</h3>
            <h5>{this.state.msg}</h5>

            {/* 
                1.1 在 React 中，如果想要为元素绑定事件，不能使用传统网页中的 onclick事件
                而是要使用 React 中提供的 onClick
                1.2 也就是说，React中提供的事件绑定机制，基本都是驼峰命名，同时，基本上，
                传统的 JS 事件，都被React 重新定义了一下，改成了驼峰命名。
                2.1 在 React 提供的事件绑定机制中，事件的处理函数，必须直接给定一个 function，
                而不是给定一个 function 的名称
                2.2 在为 React 事件绑定处理函数的时候，需要通过this.函数名，来把函数的引用交给事件
            */}
            <input type="button" value="修改msg" id="btnChangeMsg" onClick={this.changeMsg}/>
            <br/>
        </div>
    }

    changeMsg = () => {
        // console.log('ok')
        // 注意：这里不是传统网页，所以 React 已经帮我们规定死了，在方法中，默认 this 指向 undefined；并不是指向调用者
        // 这边将普通函数改成箭头函数就可以了，因为箭头函数不改变this指向
        // 此处箭头函数的this就是实例

        // 直接使用 this.state.msg = '123' 为 state 上的数据重新赋值，可以修改 state 中的数据值，但是页面不会被更新
        // 所以这种方式，React 不推荐，以后尽量少用
        // this.state.msg = '123'
        // 如果要为 this.state 上的数据重新赋值，那么，React推荐使用 this.setState({配置项})来重新为 state赋值
        // 注意：this.setState 方法只会重新覆盖那些显式定义的属性，如果没有提供最全的属性，则没有提供的属性值，不会被覆盖
        // this.setState({
        //     msg: '123'
        // })

        // this.setState 方法，也支持传递一个 function，如果传递的是 function，则在 function 内部，必须 return 一个对象；
        // 在 function 的参数中，支持传递两个参数，其中，第一个参数是 prevState，表示为修改之前的老的 state 数据
        // 第二个参数，是外界传递给当前组件的 props 数据
        this.setState(function(prevState, props){
            // console.log(prevState)
            return {
                msg: '123'
            }
        }, function(){
            // 由于 this.setState 是异步执行的，所以，如果想要立即拿到最新的执行结果，保险的方式是在回调函数中执行
            console.log(this.state.msg)
        })
        // 经过测试发现，this.setState 在调用结束的时候，内部是异步执行的，所以，当立即调用完 this.setState 后，输出的值可能是旧的
        // console.log(this.state.msg)
    }
}