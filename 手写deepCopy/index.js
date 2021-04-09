/*
*
* 基础版本---只能对对象进行深拷贝
* */
function deepCopy(obj) {
    let result
    if (typeof obj === 'object') {
        result = obj.constructor === 'Array' ? [] : {}

        for (let i of obj) {
            result[i] = typeof obj[i] ? deepCopy(obj[i]) : obj[i]
        }
    } else {
        result = obj
    }
    return result
}
