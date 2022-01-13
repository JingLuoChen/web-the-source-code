/*
* 扫描器类
*
* */
export default class Scanner {
    constructor(templaterStr) {
        // 将模板字符串存储到实例身上
        this.templaterStr = templaterStr
        // 指针
        this.pos = 0
        // 尾巴，从一开始就是模板字符串原串
        this.tail = templaterStr
    }
    // 功能弱，就是走过执行内容，没有返回值
    scan(tag) {
        if (this.tail.indexOf(tag) === 0) {
            this.pos += tag.length
            this.tail = this.templaterStr.substring(this.pos)
        }
    }
    // 让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前走过的字符串
    scanUtil(stopTag) {
        let pos_back = this.pos
        // 当尾巴的开头不是stopTag时，指针继续下移
        while(!this.eos() && this.tail.indexOf(stopTag) !== 0) {
            this.pos++
            this.tail = this.templaterStr.substring(this.pos)
        }
        return this.templaterStr.substring(pos_back, this.pos)
    }
    // 指针是否到头，返回boolean
    eos() {
        return this.pos >= this.templaterStr.length
    }
}