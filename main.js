'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function() {
  do {
    money = prompt('Ваш месячный доход?', 250);
  } 
  while (!isNumber(money));
};

  start();

const appData = {
  budget: Number(money),
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  asking: function () {

    if (confirm('Есть ли у Вас дополнительный заработок?')) {
      let itemIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      } 
      while (isNumber(itemIncome) || !itemIncome.trim());

      let cashIncome;
      do {
        cashIncome = prompt('Сколько вы зарабатываете', 200);
      } 
      while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses;
    do {
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Телефон, Интернет , Такси,Кофе');
      appData.addExpenses = addExpenses.toLowerCase().split(',');
      appData.addExpenses = appData.addExpenses.map(item => item.trim().slice(0, 1).toUpperCase() + item.trim().slice(1)).join(', ');
    } while (isNumber(addExpenses) || !addExpenses.trim());

    let expenses1 = prompt('Введите обязательную статью расходов?', 'школа');
    let amount1 = prompt('Во сколько это обойдется?', 50);
    while (!isNumber(amount1)) {
        amount1 = prompt('Во сколько это обойдется?');
      }
    let expenses2 = prompt('Введите обязательную статью расходов?', 'садик');
    let amount2 = prompt('Во сколько это обойдется?', 20);
    while (!isNumber(amount2)) {
        amount2 = prompt('Во сколько это обойдется?');
      }
    appData.expenses[expenses1] = Number(amount1);
    appData.expenses[expenses2] = Number(amount2);

    let expensesMonth = 0;
      for (let key in appData.expenses) {
        expensesMonth += Number(appData.expenses[key]);
      }
    appData.expensesMonth = expensesMonth;

    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },

  getInfoDeposit: function() {
    if (appData.deposit) {
      do {
        appData.persentDeposit = prompt('Какой годовой процент?', 10);
      } 
      while (!isNumber(appData.persentDeposit));

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена', 500);
      } 
      while (!isNumber(appData.moneyDeposit));
    }
  },

  getBudget: function() {
  let budgetMonth = appData.budget - appData.expensesMonth;
  let budgetDay = budgetMonth / 30;
  appData.budgetMonth = budgetMonth;
  appData.budgetDay = budgetDay;
  },

  getTargetMonth: function() {
  appData.targetMonth = appData.mission / appData.budgetMonth;
  return appData.targetMonth;
  },

  getStatusIncome: function() {
  if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 1200 && appData.budgetDay > 600) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  },
  calsSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }
};
appData.asking();
appData.getInfoDeposit();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

// Выводим в консоль расходы за месяц, цель, уровень дохода
console.log('Расходы за месяц: ' + appData.expensesMonth);
// Выводим в консоль  цель
if (appData.targetMonth >= 0) {
  console.log('Цель будет достигнута через: ', Math.ceil(appData.targetMonth), ' месяцев (-а)');
} else {
  console.log('Цель не будет достигнута');
}
// Выводим в консоль уровень дохода
console.log(appData.getStatusIncome());

// Выводим в консоль то, что включает в себя программа
for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key, appData[key]);
}
