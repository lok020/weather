export function isObjsEqual(obj1, obj2) {
    var _ = require('lodash');
    return _.isEqual(obj1, obj2);
}

export function isObjEmpty(obj) {
    var _ = require('lodash');
    return _.isEmpty(obj);
}