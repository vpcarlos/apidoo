export function objectIsEmpty(object) {
    if (Object.entries(object).length === 0 && object.constructor === Object) {
        return true
    }
    return false;
}
