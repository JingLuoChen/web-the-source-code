/**
 *
 * resolve reject all race等方法是静态成员，定义在构造函数本身上
 *
 * then方法属于实例成员，定义在原型链上
 *
 * */

// 初级版
class Promise2 {
    constructor(extrect) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        let resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.value = value;
            }
        }
        let reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
            }
        }
        try {
            extrect(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onResolved, onRejected) {
        if (this.status === 'resolved') {
            onResolved(this.value)
        } else if  (this.status === 'rejected') {
            onRejected(this.reason)
        }
    }
}

//  完整版
class Promise {
    constructor(extrect) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedArray = [];
        this.rejectedArray = []
        this.isfunction = (fn) => typeof fn === 'function'

        let resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.value = value
                this.onResolvedArray.forEach(cb => cb())
            }
        }
        let reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason
                this.rejectedArray.forEach(cb => cb())
            }
        }
        try {
            extrect(resolve, reject)
        }catch (e) {
            reject(e)
        }
    }
    then(onResolved, onRejected) {
        onResolved = this.isfunction(onResolved) ? onResolved : (data) => data
        onRejected = this.isfunction(onRejected) ? onRejected : (err) => {throw err}
        return new Promise((resolve, reject) => {
            let x
            if (this.status === 'pending') {
                this.onResolvedArray.push(() => {
                    try {
                        x = onResolved(this.value)
                        x instanceof Promise ? x.then(resolve, reject) : resolve(x)
                    }catch (e) {
                        reject(e)
                    }
                })
                this.rejectedArray.push(() => {
                    try {
                        x = onRejected(this.reason)
                        x instanceof Promise ? x.then(resolve, reject) : resolve(x)
                    }catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.status === 'resolved') {
                try {
                    x = onResolved(this.value)
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x)
                }catch (e) {
                    reject(e)
                }
            }
            if (this.status === 'rejected') {
                try {
                    x = onRejected(this.reason)
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x)
                }catch (e) {
                    reject(e)
                }
            }
        })
    }

    catch(reject) {
        return this.then(undefined, reject)
    }
    finally() {

    }
    static resolve(value) {
        if (value instanceof Promise) {
            return value
        }
        return new Promise((resolve) => resolve(value))
    }
    static reject(reason) {
        if (reason instanceof Promise) {
            return reason
        }
        return new Promise((resolve, reject) => reject(reason))
    }
    static all(arr) {
        return new Promise((resolve, reject) => {
            let sum = 0
            let result = []
            for (let i=0; i<arr.length; i++) {
                if (arr[i] instanceof Promise) {
                    arr[i].then(res => {
                        sum++
                        result[i] = res
                        if (sum === arr.length) {
                            resolve(result)
                        }
                    }, err => {
                        reject(err)
                    })
                } else {
                    sum++
                    result[i] = arr[i]
                    if (sum === arr.length) {
                        resolve(result)
                    }
                }
            }
        })
    }
    static race(arr) {
        return new Promise((resolve, reject) => {
            for (let i=0; i<arr.length; i++) {
                if (arr[i] instanceof Promise) {
                    arr[i].then(res => {
                        resolve(res)
                    }, err => {
                        reject(err)
                    })
                } else {
                    resolve(arr[i])
                }
            }
        })
    }
}
