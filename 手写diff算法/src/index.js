import myH from '../mySnabbdom/h'
import patch from '../mySnabbdom/patch'
import {h} from "snabbdom";

const container = document.getElementById('container')
const btn = document.getElementById("btn")


const vnode1 = myH('ul', {}, [
    h('li', {key: 'A'}, '苹果'),
    h('li', {key: 'B'}, '西瓜'),
    h('li', {key: 'C'}, '香蕉'),
    h('li', {key: 'D'}, '柚子')
])

patch(container, vnode1)


const vnode2 = myH('ul', {}, [
    h('li', {key: 'Q'}, 'QQQ'),
    h('li', {key: 'A'}, '苹果'),
])

// const vnode2 = myH('ul', {}, [
//     h('li', {key: 'A'}, '苹果苹果苹果'),
//     h('li', {key: 'B'}, '西瓜'),
//     h('li', {key: 'M'}, '橘子'),
//     h('li', {key: 'N'}, '草莓'),
//     h('li', {key: 'C'}, '香蕉'),
//     h('li', {key: 'D'}, '柚子')
// ])

btn.onclick = function () {
    patch(vnode1, vnode2)
}

