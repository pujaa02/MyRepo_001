"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../models/database"));
function checkmail(req, res) {
    database_1.default.query(`select * from login where email='${req.query.email}'`, async function (err, result) {
        if (err)
            throw err;
        const data = await result;
        res.json(data);
    });
}
exports.default = checkmail;
//# sourceMappingURL=checkdate.js.map