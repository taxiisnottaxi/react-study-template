import React from 'react'
// 注意：prop-types包中职能单一，只提供了一些常见的数据类型，用于做类型校验
import ReactTypes from 'prop-types'

// 咱们封装组件的目的，是为了团队协作开发更加方便，有的人只负责开发组件，有的人只负责调用别人开发好的组件
// 最好在封装组件的时候，为组件的一些必要数据，进行类型校验
export default class Counter extends React.Component {
    constructor(props){
        super(props)

        // 初始化组件的私有状态，保存的是组件的私有数据
        this.state = {
            // 基数，把外界传递过来的 initCount 赋值给 state 中的 count 值
            // 这样，就把 count 值改成了可读可写的 state 属性，今后，就能实现点击按钮，count 值+1的效果
            initCount: props.initCount
        }
    }

    // 在封装一个组件的时候，组件内部，肯定有一些数据是必须的，哪怕用户没有传递一些相关的启动参数，
    // 这时候，组件内部，尽量给自己提供一个默认值
    // 在 React 中，使用静态的 defaultProps 属性，来设置组件的默认属性值
    // 固定写法
    static defaultProps = {
        initCount: 0 // 如果外界没有传入initCount这个参数，那么自己初始化为0
    }

    // 这是创建一个静态的 propTypes 对象，在这个对象中，可以把外界传递过来的属性，做类型校验
    // 注意：如果要为传递过来的属性做类型校验。必须安装 React 提供的第三方包，叫做 prop-types
    // prop-types大概在v.15.*之前并没有单独抽离出来，那时候，还和 react 包 在一起；
    // 后来官方单独将其抽离成一个包，就叫做 prop-types
    // 固定写法
    static propTypes = {
        initCount: ReactTypes.number // 使用 prop-types 包，来定义 initCount 为 number 类型
    }

    // 在组件即将挂载到页面上的时候执行，此时，组件尚未挂载到页面中
    // 虚拟DOM 没有创建
    componentWillMount(){//这个函数等同于 Vue 中的 created 生命周期函数
        // 此时无法获取页面上的任何元素，因为 虚拟DOM 和 页面 都还没有开始渲染！
        // 【这个阶段无法操作页面上的DOM元素】
        // console.log(document.getElementById('myh3'))
        // 可以拿到传递过来的数据
        // console.log(this.props.initCount)
        // 可以拿到state中的私有数据
        // console.log(this.state.msg)
        // 可以拿到自己定义的函数
        // this.myselfFunction()
    }

    // 当执行到这个生命周期函数的时候，即将要开始渲染内存中的 虚拟DOM 了，当这条个函数执行完，内存中就有了一个渲染好的虚拟DOM
    // 但是页面上尚未真正显示DOM元素。
    render(){
        // 在 return 之前，虚拟DOM还没有开始创建，页面上是空的，根本拿不到任何的元素
        // console.log(document.getElementById('myh3'))
        
        // 在组件运行阶段中，每当调用 render 函数的时候，页面上的DOM元素，还是之前旧的
        // console.log(this.refs.hs && this.refs.h3.innrtHTML)

        // 不可以在render中修改状态，因为会陷入死循环
        // 状态更改会调用render，而如果在render中有状态更改，就会形成闭合死循环
        // this.setState({
        //     initCount: this.state.initCount + 1
        // })
        
        return <div>
            <h1>这是一个 Counter 计数器组件</h1>
            <input type="button" value="+1" id="btn" onClick={this.increment}/>
            <hr/>
            <h3 id="myh3" ref="h3">当前的数量是：{this.state.initCount}</h3>
        </div>
        // 在 return 执行完毕之后，虚拟DOM创建好了，但是还没有挂载到真正的页面中

    }

    increment = () => {
        this.setState({
            initCount: this.state.initCount + 1
        })
    }

    // 当组件挂载到页面上之后，会进入这个生命周期函数，只要进入这个生命周期函数了，必然说明页面上已经有可见的DOM元素了
    componentDidMount(){
        // 在这个函数中，我们可以放心去操作页面上需要使用的 DOM元素
        // 如果我们想操作 DOM元素，最早只能在这个里面操作
        // componentDidMount 相当于 Vue 中的 mounted 函数
        // console.log(document.getElementById('myh3'))

        // 在 React 中也可以像操作普通的DOM元素那样绑定事件
        // document.getElementById('btn').onclick = () => {
        //     // console.log('ok')
        //     // 这种写法是不可以的，因为this指向的是btn，而不是组件实例
        //     // 如果使用箭头函数，this确实指向的是组件实例，但是会报错，说属性无法修改
        //     // this.props.initCount++
        //     // props是只读的，无法更改，要想将其变成可读可写，使用state
        //     this.setState({
        //         initCount: this.state.initCount + 1
        //     })
        // }

        // 上面我们使用的是原生的DOM事件，并不推荐，我们推荐使用React的单击事件
        // 比如使用onClick事件
    }

    // 当组件执行完 componentDidMount 函数后，就进入到运行中的状态，componentDidMount是创建阶段的最后一个函数

    // 从这里开始，就进入组件的运行中状态
    // 判断组件是否需要更新，需要返回的是一个布尔值
    shouldComponentUpdate(nextProps, nextState){
        // 1. 必须返回布尔值
        // 2. 返回如果是false，则不会继续执行后续的生命周期函数，而是直接退回到的运行中的状态
        // 由于后续的 render 函数并没有被调用，因此页面不会被更新，但是组件的state状态被修改了
        // return false

        // 需求：如果 state 中的 initCount 值是偶数则更新，否则不更新
        // 经过打印测试，在 shouldComponentUpdate 中，通过 this.state.initCount 拿到的值是上一次的旧数据，并不是当前最新的
        // console.log(this.state.initCount)
        // return this.state.initCount%2===0?true:false
        // 这边由于不同步，不可以使用this.state.initCount，使用nextState
        // return nextState.initCount % 2 === 0 ? true : false
        return true
    }

    // 组件将要更新，此时尚未更新，在进入这个生命周期函数的时候，
    // 内存中的虚拟DOM是旧的，页面上的DOM元素也是旧的
    componentWillUpdate(){
        // 经过打印分析，得到此时页面上的 DOM 节点都是旧的，应该慎重操作，因为可能操作的是旧的DOM
        // console.log(document.getElementById('myh3').innerText)
        // 使用 ref(表示对组件真正实例的引用)，先为元素绑定ref属性
        console.log(this.refs.h3.innerHTML)
    }

    // 组件完成了更新，此时state中的数据、虚拟DOM、页面上的DOM都是最新的，此时，你可以放心大胆的操作界面
    componentDidUpdate(){
        console.log(this.refs.h3.innerHTML)
    }

    myselfFunction(){
        console.log("这是我自己定义的函数，和生命周期无关")
    }
}
