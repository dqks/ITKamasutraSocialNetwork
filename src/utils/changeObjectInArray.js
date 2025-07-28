export const changeObjectInArray = (items, itemId, propertyName, property) => {
    return items.map(el => {
        if (el[propertyName] === itemId) {
            return {...el, ...property};
        }
        return el;
    })
}