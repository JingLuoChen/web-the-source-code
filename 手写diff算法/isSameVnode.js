export default function isSameVnode(a, b) {
    return a.sel === b.sel && a.key === b.key
}