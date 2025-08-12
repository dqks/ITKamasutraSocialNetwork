export const changeObjectInArray = (items : any, itemId : any, propertyName : any, property : any) => {
    return items.map((el : any) => {
        if (el[propertyName] === itemId) {
            return {...el, ...property};
        }
        return el;
    })
}