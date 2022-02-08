"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeToPayOff = void 0;
const getAmortizationPayments = (balance, interestRate, months) => {
    let monthlyRate = interestRate / 12 / 100;
    let payment = balance * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));
    let interest = balance * monthlyRate;
    let monthlyPrincipal = payment - interest;
    return {
        interest,
        monthlyPrincipal,
        payment
    };
};
const getTimeToPayOff = (debts, budget, revenue) => {
    let debtTotal = debts.reduce((acc, debt) => {
        return acc += parseInt(debt.amount);
    }, 0);
    let monthlyRevenue = revenue.reduce((acc, rev) => {
        return acc += parseInt(rev.amount);
    }, 0);
    let monthlySetBudget = budget.reduce((acc, bud) => {
        if (bud.debtId) {
            return acc;
        }
        ;
        return acc += parseInt(bud.amount);
    }, 0);
    let newDebts = debts;
    console.log('revenue', monthlyRevenue);
    console.log('budget', monthlySetBudget);
    let monthlyCashFlow = monthlyRevenue - monthlySetBudget;
    let totalMonths = 0;
    while (debtTotal > 0) {
        if (totalMonths > 500)
            break;
        totalMonths += 1;
        for (let i = 0; i < newDebts.length; i++) {
            if (newDebts[i].payedOff) {
                continue;
            }
            if (newDebts[i].amount <= 0) {
                let [filtBudget] = budget.filter(bud => { var _a; return newDebts[i]._id.toString() === ((_a = bud === null || bud === void 0 ? void 0 : bud.debtId) === null || _a === void 0 ? void 0 : _a.toString()); });
                if (!(filtBudget === null || filtBudget === void 0 ? void 0 : filtBudget.amortized)) {
                    continue;
                }
                monthlyCashFlow += getAmortizationPayments(debts[i].amount, filtBudget.interestRate, filtBudget.yearsLeft * 12).payment;
                newDebts[i]['payedOff'] = true;
                continue;
            }
            ;
            budget.filter(bud => { var _a; return newDebts[i]._id.toString() === ((_a = bud === null || bud === void 0 ? void 0 : bud.debtId) === null || _a === void 0 ? void 0 : _a.toString()); })
                .map(bud => {
                if (bud.amortized !== true) {
                    let monthlyInterest = newDebts[i].amount * (bud.interest / 100) / 12;
                    let principal = bud.amount - monthlyInterest;
                    newDebts[i].amount -= principal;
                    debtTotal -= principal;
                }
                let amortizationScheudle = getAmortizationPayments(newDebts[i].amount, bud.interestRate, bud.yearsLeft * 12 - totalMonths);
                newDebts[i].amount -= amortizationScheudle.monthlyPrincipal;
                debtTotal -= amortizationScheudle.monthlyPrincipal;
            });
        }
        console.log('monthlyCashFlow', monthlyCashFlow);
        debtTotal -= monthlyCashFlow;
    }
    ;
    if (totalMonths > 11) {
        return {
            years: Math.floor(totalMonths / 12),
            months: totalMonths % 12
        };
    }
    ;
    return {
        years: null,
        months: totalMonths
    };
};
exports.getTimeToPayOff = getTimeToPayOff;
//# sourceMappingURL=getTimeToPayOff.js.map