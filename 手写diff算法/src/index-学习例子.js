import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from "snabbdom";


import myH from '../mySnabbdom/h'

let node = myH('div', {}, h('span', {}, 2222))
console.log(node, 'node')

// 创建出patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

// 创建虚拟节点
let myVnode1 = h('a', {
    props: {
        href: 'http://www.baidu.com',
        target: '_blank'
    }}, '百度')
console.log(myVnode1, 'myVnode1')

let myVnode2 = h('div', {}, '我是一个盒子节点')
console.log(myVnode2, 'myVnode2')

let myVnode3 = h('ul', {}, [
    h('li', {}, '苹果'),
    h('li', {}, '西瓜'),
    h('li', {}, '香蕉')
])
console.log(myVnode3, 'myVnode3')

// 让虚拟节点上树
const container = document.getElementById('container')
patch(container, myVnode3)

// const patch = init([
//     // Init patch function with chosen modules
//     classModule, // makes it easy to toggle classes
//     propsModule, // for setting properties on DOM elements
//     styleModule, // handles styling on elements with support for animations
//     eventListenersModule, // attaches event listeners
// ]);
//
// const container = document.getElementById("container");
//
// const vnode = h("div#container.two.classes", { on: { click: function () {
//
//         } } }, [
//     h("span", { style: { fontWeight: "bold" } }, "This is bold"),
//     " and this is just normal text",
//     h("a", { props: { href: "/foo" } }, "I'll take you places!"),
// ]);
// // Patch into empty DOM element – this modifies the DOM as a side effect
// patch(container, vnode);
//
// const newVnode = h(
//     "div#container.two.classes",
//     { on: { click: function () {
//
//             } } },
//     [
//         h(
//             "span",
//             { style: { fontWeight: "normal", fontStyle: "italic" } },
//             "This is now italic type"
//         ),
//         " and this is still just normal text",
//         h("a", { props: { href: "/bar" } }, "I'll take you places!"),
//     ]
// );
// // Second `patch` invocation
// patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state