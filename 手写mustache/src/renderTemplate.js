/*
*
* 函数的作用是 把tokens数组转为dom字符串
*
* */
import lookup from "./lookup";
import parseArray from "./parseArray";
export default function renderTemplate(tokens, data) {
    let renderStr = ''
    for (let i=0; i<tokens.length; i++) {
        let token = tokens[i]
        if (token[0] === '#') {
            renderStr += parseArray(token, data)
        } else if (token[0] === 'text') {
            renderStr += token[1]
        } else if (token[0] === 'name') {
            renderStr += lookup(data, token[1])
        }
    }
    return renderStr
}