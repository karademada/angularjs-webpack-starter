"use strict";

const path = require("path");
const zlib = require("zlib");

// Helper functions
const _root = path.resolve(__dirname, ".."); // project root folder

function hasProcessFlag(flag) {
    return process.argv.join("").indexOf(flag) > -1;
}

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ["node_modules"].concat(args));
}

function prependExt(extensions, args) {
    args = args || [];
    if (!Array.isArray(args)) { args = [args] }
    return extensions.reduce(function(memo, val) {
        return memo.concat(val, args.map(function(prefix) {
            return prefix + val;
        }));
    }, [""]);
}

exports.hasProcessFlag = hasProcessFlag;
exports.root = root;
exports.rootNode = rootNode;
exports.prependExt = prependExt;
exports.prepend = prependExt;
