import { IDebts, IBudget, IRevenune } from "../types";

interface LoopedDebts extends IDebts {
  paidOff?: boolean;
}

interface LoopedBudget extends IBudget {
  monthlyPayment?: number;
}

const getPrincipalPaid = (monthlyPayment, loanBalance, interestRate) => {
  let interestRatePerMonth = interestRate / 12 / 100;
  let principalPaid = monthlyPayment - loanBalance * interestRatePerMonth;
  return principalPaid;
};

function getStandardPayment(startingLoanAmount, interestRate) {
  let interestRatePerMonth = interestRate / 12 / 100;
  let payment = startingLoanAmount * interestRatePerMonth;

  return payment;
}

function getMortgagePayment(startingLoanAmount, totalPayments, interestRate) {
  let interestRatePerMonth = interestRate / 12 / 100;

  let payment =
    (startingLoanAmount *
      interestRatePerMonth *
      Math.pow(1 + interestRatePerMonth, totalPayments)) /
    (Math.pow(1 + interestRatePerMonth, totalPayments) - 1);

  return payment;
}

export const getTimeToPayOff = (
  debts: IDebts[],
  budget: IBudget[],
  revenue: IRevenune[]
) => {
  let newBudget: LoopedBudget[] = budget;

  let debtTotal = debts.reduce((acc, debt) => {
    return (acc += debt.amountRemaining);
  }, 0);

  let monthlyRevenue = revenue.reduce((acc, rev) => {
    return (acc += parseInt(rev.amount));
  }, 0);

  let monthlySetBudget = budget.reduce((acc, bud, indx) => {
    if (!bud.debtId) {
      return (acc += bud.amount);
    }
    const attachedDebt = debts.find((debt) => debt._id.equals(bud.debtId));

    if (!bud.amortized) {
      return (acc += getStandardPayment(
        attachedDebt?.amountRemaining,
        bud.interestRate
      ));
    }

    let amortization = getMortgagePayment(
      attachedDebt?.amountRemaining,
      bud.yearsLeft * 12,
      bud.interestRate
    );

    newBudget[indx]["monthlyPayment"] = amortization;

    return (acc += amortization);
  }, 0);

  let newDebts: LoopedDebts[] = debts;

  let monthlyCashFlow = monthlyRevenue - monthlySetBudget;

  let totalMonths = 0;

  while (debtTotal > 0) {
    if (totalMonths > 500) break;
    totalMonths += 1;

    for (let i = 0; i < newDebts.length; i++) {
      if (newDebts[i].paidOff) {
        continue;
      }

      const attachedBudget = newBudget.find(
        (bud) => newDebts[i]._id.toString() === bud?.debtId?.toString()
      );

      if (!attachedBudget?.amortized) {
        continue;
      }

      const principalPaid = getPrincipalPaid(
        attachedBudget.monthlyPayment,
        attachedBudget.interestRate,
        attachedBudget.yearsLeft * 12 - totalMonths
      );

      debtTotal += principalPaid;

      newDebts[i].amountRemaining -= principalPaid;

      if (newDebts[i].amountRemaining <= 0) {
        monthlyCashFlow += attachedBudget.monthlyPayment ?? 0;
        newDebts[i]["payedOff"] = true;
      }
    }

    debtTotal -= monthlyCashFlow;
  }

  if (totalMonths > 11) {
    return {
      years: Math.floor(totalMonths / 12),
      months: totalMonths % 12,
    };
  }

  return {
    years: 0,
    months: totalMonths,
  };
};
