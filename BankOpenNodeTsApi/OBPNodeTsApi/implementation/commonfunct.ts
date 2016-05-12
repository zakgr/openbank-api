export function customcontainsregexp(string: string) {
    return new RegExp(string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "i");
}
export function bankpermissions(req){
    return req.user.bank_permissions.filter(function (x) { return x.bank_id == req.params.bid; })[0];
}