module.exports = function(...args){
    return args.reduce((accum, current) => accum - current )
}