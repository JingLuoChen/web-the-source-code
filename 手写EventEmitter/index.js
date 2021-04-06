class EventEmitter {
    constructor() {
        this.events = {}
    }
    // 订阅 --- 监听event事件，事件触发时调用cb函数
    on(event, cb) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(cb)

        return this
    }
    // 触发事件，并把参数传给事件处理函数
    emit(event, ...args) {
        let cbs = this.events[event]
        if (!cbs) {
            throw 'error'
        }
        cbs.forEach(item => item.apply(this, args))

        return this
    }
    // 停止监听某个事件
    off(event, cb) {
        if (!cb) {
            this.events[event] = null
        } else {
            this.events[event].some((fn, i) => {
                if (fn === cb) {
                    this.events[event].splice(i, 1)
                    return true
                }
            })
        }
        return this
    }
    // 为指定事件注册一个单次监听器，单次监听器最多只触发一次，触发后立即解除监听器
    once(event, cb) {
        const func = (...args) => {
            cb.apply(this, args)
            this.off(event, func)
        }
        this.on(event, func)
        return this
    }
}


/**
 * https://segmentfault.com/a/1190000014267382
 * */
