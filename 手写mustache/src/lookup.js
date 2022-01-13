/*
*
* 函数的作用是寻找对象中的指定属性值
*
* */
export default function lookup(dataObj, keyName) {
    if (keyName.indexOf('.') !== -1 && keyName !== '.') {
        let arr = keyName.split('.')
        return arr.reduce((obj, key) => (obj && obj[key]) ? obj[key] : undefined, dataObj)
    }
    return dataObj[keyName]

}