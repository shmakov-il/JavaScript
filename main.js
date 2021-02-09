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

let appData = {
  budget: Number(money),
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
};
// Спрашиваем у пользователя данные
appData.asking = function() {
  let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Телефон, Интернет');
  appData.addExpenses = addExpenses.toLowerCase().split(', ');

  appData.deposit = confirm('Есть ли у вас депозит в банке?');

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
};
appData.asking();

// Считаем сумму всех обязательных расходов
appData.getExpensesMonth = function() {
  let sum = 0;
      for (let key in appData.expenses) {
        sum += Number(appData.expenses[key]);
    }
    appData.expensesMonth = sum;
};
appData.getExpensesMonth();

// Считаем бюдежт на месяц и на день
appData.getBudget = function() {
  let budgetMonth = appData.budget - appData.expensesMonth;
  let budgetDay = budgetMonth / 30;
  appData.budgetMonth = budgetMonth;
  appData.budgetDay = budgetDay;
};
appData.getBudget();

// Считаем цель
appData.getTargetMonth = function() {
  appData.targetMonth = appData.mission / appData.budgetMonth;
  return appData.targetMonth;
};
appData.getTargetMonth();

// Считаем уровень дохода
appData.getStatusIncome = function() {
  if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 1200 && appData.budgetDay > 600) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
};
appData.getStatusIncome();

// Выводим в консоль расходы за месяц, цель, уровень дохода
console.log('Расходы за месяц: ' + appData.budgetMonth);
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


console.log(appData);




