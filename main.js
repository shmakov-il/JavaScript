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
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    appData.expenses1 = prompt('Введите обязательную статью расходов?', 'школа');
    appData.amount1 = prompt('Во сколько это обойдется?', 100);
    while (!isNumber(appData.amount1)) {
      appData.amount1 = prompt('Во сколько это обойдется?');
    }
    appData.expenses2 = prompt('Введите обязательную статью расходов?', 'садик');
    appData.amount2 = prompt('Во сколько это обойдется?', 50);
    while (!isNumber(appData.amount2)) {
      appData.amount2 = prompt('Во сколько это обойдется?');
    }
    appData.expenses[appData.expenses1] = Number(appData.amount1);
    appData.expenses[appData.expenses2] = Number(appData.amount2);
    
    appData.getExpensesMonth = function() {
      let sum = 0;
      for (let key in appData.expenses) {
        sum += Number(appData.expenses[key]);
    }
      return sum;
  }; 

    appData.getBudget = function() {
      appData.budgetMonth = Number(money) - appData.expensesMonth;
      appData.budgetDay = appData.budgetMonth / 30; 
      return appData.budgetMonth; 
    };
    appData.output1 = appData.getBudget();
    console.log('Расходы за месяц: ', appData.output1);

    

  appData.getTargetMonth = function() {
    appData.targetMonth = appData.mission / appData.budgetMonth;
    return appData.targetMonth;
  };
  
  appData.output2 = appData.getTargetMonth();
  
  if (appData.output2 >= 0) {
  console.log('Цель будет достигнута через: ', Math.ceil(appData.output2), ' месяцев (-а)');
} else {
  console.log('Цель не будет достигнута');
}

appData.getStatusIncome = function () {
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
  appData.output3 = appData.getStatusIncome();
  console.log('Уровень дохода: ', appData.output3);

  },
};

appData.asking();

for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + appData[key]);
}
