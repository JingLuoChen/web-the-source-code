import vnode from "./vnode";
import isSameVnode from "./isSameVnode";
import createElement from "./createElement";
import patchVnode from "./patchVnode";

export default function (oldVnode, newVnode) {
    // 判断老节点是不是虚拟节点
    if (oldVnode.sel === '' || oldVnode.sel === undefined) {
        // 把真是dom转成虚拟节点
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }
    console.log(oldVnode, 'oldVnode')
    // 判断oldVnode和newVnode是不是同一个节点
    if (isSameVnode(oldVnode, newVnode)) {
        // 是同一个节点，对比新旧节点是不是发生了变化
        patchVnode(oldVnode, newVnode)
    } else {
        // 不是同一个节点
        // 暴力拆除和新增
        let newVnodeElm = createElement(newVnode)
        if (oldVnode.elm.parentNode && newVnode) {
            // 增加新的节点
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        }
        // 删除老的节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}