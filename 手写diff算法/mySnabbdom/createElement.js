// 把虚拟dom转成真实dom，创建真正的节点元素
export default function createElement(vnode) {
    // 创建对应的dom节点
    const newNode = document.createElement(vnode.sel)
    // 判断是有文本 还是有子节点
    if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
        // 只有文本，没有子节点
        // 把虚拟节点上的文本文案转换到真实dom元素上
        newNode.innerText = vnode.text
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 含有子节点
        for (let i = 0; i<vnode.children.length; i++) {
            let ch = vnode.children[i]
            // 递归调用生成真实dom节点
            let chNode = createElement(ch)
            newNode.appendChild(chNode)
        }
    }
    // 补充elm属性
    vnode.elm = newNode
    // 返回真实的dom元素
    return vnode.elm
}