import Scanner from "./scanner";
import nestTokens from "./nestTokens";
export default function parseTemplateToToken(templateStr) {
    console.log(templateStr, 'templateStr')
    let scanner = new Scanner(templateStr)
    let words
    let tokens = []
    // 让扫描器开始工作
    while(!scanner.eos()) {
        // 收集开始标记出现之前的内容
        words = scanner.scanUtil("{{")
        if (words !== '') {
            // 存起来
            tokens.push(['text', words])
        }
        // 过双大括号
        scanner.scan("{{")
        // 继续收集
        words = scanner.scanUtil("}}")
        if (words !== '') {
            // 这个words就是{{}}中间的东西，需要判断一下首字符
            if (words[0] === '#') {
                // 存起来，从下标为1的项开始
                tokens.push(['#', words.substring(1)])
            } else if (words[0] === '/') {
                // 存起来，从下标为1的项开始
                tokens.push(['/', words.substring(1)])
            } else {
                // 存起来，从下标为1的项开始
                tokens.push(['name', words])
            }
        }
        scanner.scan("}}")
    }
    console.log(tokens, 'tokens')
    // 对tokens进行加工处理
    return nestTokens(tokens)
}