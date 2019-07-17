"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var language_1 = require("graphql/language");
exports.strip = function (directives, queryAST) {
    var _a;
    return language_1.visit(queryAST, (_a = {},
        _a[language_1.Kind.DIRECTIVE] = function (node) {
            console.log(node.name.value);
            if (Object.keys(directives).includes(node.name.value)) {
                return null;
            }
        },
        _a));
};
