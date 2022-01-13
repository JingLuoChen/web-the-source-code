import lookup from "./lookup";
import renderTemplate from "./renderTemplate";
export default function parseArray(token, data) {
    // 这个获取数组，然后需要进行循环遍历
    let v = lookup(data, token[1])
    // 结果字符串
    let result = ''
    for (let i = 0; i < v.length; i++) {
        result += renderTemplate(token[2], {
            ...v[i],
            '.': v[i]
        })
    }
    return result
}