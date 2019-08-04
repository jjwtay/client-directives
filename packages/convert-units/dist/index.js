"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
var convert_units_1 = __importDefault(require("convert-units"));
exports.default = (function (_a) {
    var from = _a.from, to = _a.to;
    return function (value) { return convert_units_1.default(value).from(from).to(to); };
});
