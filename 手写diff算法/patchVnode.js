import createElement from "./createElement";
import updateChildren from "./updateChildren";
export default function patchVnode(oldVnode, newVnode) {
    // 判断新旧vnode是不是同一个对象
    if (oldVnode === newVnode) {
        // 新旧vnode对象是同一个对象 可以不用处理
        return
    }
    // 新旧vnode不是同一个对象，说明有更新变化
    // 判断newVnode是不是有text属性
    if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
        // newVnode有text属性
        oldVnode.elm.innerText = newVnode.text
    } else {
        // newVnode没有text属性，有children属性
        // 判断oldVnode是不是有children属性
        if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
            // 需要进行精细化对比 需要对比children是不是发生了变化
            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
        } else {
            // oldVnode没有children属性，newVnode有children属性
            oldVnode.elm.innerText = ''
            for (let i = 0; i <= newVnode.children.length; i++) {
                let newVnodeElm = createElement(newVnode.children[i])
                oldVnode.elm.appendChild(newVnodeElm)
            }
        }
    }

}