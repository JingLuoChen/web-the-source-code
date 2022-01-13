import parseTemplateToToken from "./parseTemplateToToken";
import renderTemplate from "./renderTemplate";
window.zp_TemplateEngine = {
    // 调用渲染方法
    render(templateStr, data) {
        // 调用parseTemplateToToken函数，让模板字符串能够变为tokens数组
        let tokens = parseTemplateToToken(templateStr)
        // 调用renderTemplate函数，让tokens数组转为dom字符串
        console.log(tokens, 'tokens')
        let domStr = renderTemplate(tokens, data)
        console.log(domStr, 'renderStr')
        return domStr
    }
}