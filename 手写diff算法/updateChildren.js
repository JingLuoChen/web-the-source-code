import isSameVnode from "./isSameVnode";
import patchVnode from "./patchVnode";
import createElement from "./createElement";
export default function updateChildren(parentNode, oldCh, newCh) {
    // 新前与旧前
    // 新后与旧后
    // 新后与旧前 --- 此种方式命中的，旧前所指向的节点移动到旧节点的最后
    // 新前与旧后 --- 此种方式命中的，旧后所指向的节点移动到旧节点的最前
    // 都没有命中的话，就是循环遍历
    // 新前
    let newStartIdx = 0
    // 旧前
    let oldStartIdx = 0
    // 新后
    let newEndIdx = newCh.length - 1
    // 旧后
    let oldEndIdx = oldCh.length - 1
    // 新前节点
    let newStartVnode = newCh[0]
    // 旧前节点
    let oldStartVnode = oldCh[0]
    // 新后节点
    let newEndVnode = newCh[newEndIdx]
    // 旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    let keyMap = null
    // 进行循环判断 4种情况进行判断
    while(newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
        if (isSameVnode(oldStartVnode, newStartVnode)) {
            // 新前与旧前
            // 命中规则1 是同一个节点，需要对比是否发生变化
            patchVnode(oldStartVnode, newStartVnode)
            // 指针移动，节点移动
            newStartVnode = newCh[++newStartIdx]
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (isSameVnode(newEndVnode, oldEndVnode)) {
            // 新后与旧后
            // 命中规则2 是同一个节点，需要对比是否发生变化
            patchVnode(oldEndVnode, newEndVnode)
            // 指针移动，节点移动
            newEndVnode = newCh[--newEndIdx]
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (isSameVnode(newEndVnode, oldStartVnode)) {
            // 新后与旧前
            // 命中规则3 是同一个节点，需要对比是否发生变化
            patchVnode(oldStartVnode, newEndVnode)
            // 指针移动，节点移动
            newEndVnode = newCh[--newEndIdx]
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (isSameVnode(newStartVnode, oldEndVnode)) {
            // 新前与旧后
            // 命中规则4 是同一个节点，需要对比是否发生变化
            patchVnode(oldEndVnode, newStartVnode)
            // 指针移动，节点移动
            newStartVnode = newCh[++newStartIdx]
            oldEndVnode = oldCh[--oldEndIdx]
        } else {
            // 都没有命中的情况，需要使用循环进行遍历
            // ACB -> CABD
            if (!keyMap) {
                keyMap = {}
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const key = oldCh[i].key
                    if (key !== undefined) {
                        keyMap[key] = i
                    }
                }
            }
            // 寻找到当前这项（newStartIdx）这项在keyMap中的映射的位置序号
            const idxInOld = keyMap[newStartVnode.key]
            if (idxInOld === undefined) {
                // idxInOld为undefined 代表新增的项
                parentNode.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
            } else {
                // 代表原来就有此项需要进行移动，原来的项需要设置为undefined
                const elmToMove = oldCh[idxInOld]
                // 判断内容是否有变动
                patchVnode(elmToMove, newStartVnode)
                //因为移动 原有数据要进行设置为undefined
                oldCh[idxInOld] = undefined
                // 移动，调用insertBefore也可以实现移动
                parentNode.insertBefore(elmToMove.elm, oldStartVnode.elm)
            }
            // 指针下移，只移动新的头
            newStartVnode = newCh[++newStartIdx]
        }
    }
    // 是否还有新的剩余需要插入 或者 老的剩余需要删除
    if (newStartIdx <= newEndIdx) {
        // 新节点还有剩余，需要插入进去
        // AB -> ABCD AB -> ACDB
        // 寻找标杆
        const before = newCh[newEndIdx + 1] === undefined ? null : newCh[newEndIdx + 1].elm
        // insertBefore方法可以自动识别null，如果null就会自动排到队尾去，和appendChild是一致的，但是不能直接使用appendChild进行添加
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            parentNode.insertBefore(createElement(newCh[i]), before)
        }
    } else if (oldStartIdx <= oldEndIdx) {
        // 老节点还有剩余，需要暴力删除
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentNode.removeChild(oldCh[i].elm)
            }
        }
    }


}