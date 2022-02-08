"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    insertMultipleExpected: async (req, res) => {
        const db = req.app.get('db');
        const { expected, type } = req.body;
        const { userId } = req.params;
        console.log(expected);
        await expected.map(async (obj) => {
            await db.Expected.insertExpected([type, obj.value, obj.name, obj.debtId, userId, new Date()]);
        });
        res.send('inserted');
    }
};
//# sourceMappingURL=expected.js.map