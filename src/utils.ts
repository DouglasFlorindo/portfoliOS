export function isMobile() {

    if (window.innerWidth <= 750) {
        return true
    } else {
        return false
    }
}


export function removeItemOnce(arr: Array<any>, value: any) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
