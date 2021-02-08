'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function() {
  do {
    money = prompt('Ваш месячный доход?');
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
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    appData.expenses1 = prompt('Введите обязательную статью расходов?');
    appData.amount1 = prompt('Во сколько это обойдется?');
    while (!isNumber(appData.amount1)) {
      appData.amount1 = prompt('Во сколько это обойдется?');
    }
    appData.expenses2 = prompt('Введите обязательную статью расходов?');
    appData.amount2 = prompt('Во сколько это обойдется?');
    while (!isNumber(appData.amount2)) {
      appData.amount2 = prompt('Во сколько это обойдется?');
    }
    appData.expenses[appData.expenses1] = Number(appData.amount1);
    appData.expenses[appData.expenses2] = Number(appData.amount2);
    

  },
};

appData.asking();
console.log(appData);

appData.getExpensesMonth = function() {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += Number(appData.expenses[key]);
    }
    return sum;
  }; 

appData.expensesMonth = appData.getExpensesMonth();
console.log('appData.expensesMonth: ', appData.expensesMonth);
  
  appData.expensesAmount = appData.getExpensesMonth();

  appData.getAccumulatedMonth = function() {
    return Number(money) - appData.expensesAmount;
  };

  const accumulatedMonth = appData.getAccumulatedMonth();

  appData.getTargetMonth = function() {
    return accumulatedMonth / 30;
  };

  appData.budgetDay = accumulatedMonth / 30;

  
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


// Вывод функции getExpensesMonth
console.log('Сумма всех обязательных расходов за месяц: ', appData.expensesAmount);



// Вывод функции getTargetMonth
if (appData.getTargetMonth() >= 0) {
  console.log('Цель будет достигнута через: ', Math.ceil(appData.getTargetMonth()), ' месяцев (-а)');
} else {
  console.log('Цель не будет достигнута');
}

// Вывод бюджета на день
console.log('Бюджет на день: ', Math.floor(appData.budgetDay));

// Вывод функции getStatusIncome
console.log(appData.getStatusIncome());


/*
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  } 
  while (!isNumber(money));
};

start();

// Создаем объект appData
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
  mission: 150000,
  period: 3,
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    appData.expenses[prompt('Введите обязательную статью расходов?')] = +prompt('Во сколько это обойдется?');
    appData.expenses[prompt('Введите обязательную статью расходов?')] = +prompt('Во сколько это обойдется?');
  },
};

appData.asking();

console.log(appData);

  appData.getExpensesMonth = function() {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += Number(appData.expenses[key]);
    }
    return sum;
  }; 

  appData.expensesMonth = appData.getExpensesMonth();
  console.log('appData.expensesMonth: ', appData.expensesMonth);

  

  appData.getBudget = function() {
    appData.budgetMonth = 500;
    return appData.budgetMonth;
  };
    console.log(appData.budgetMonth);
  

  appData.getTargetMonth = function() {
    let result = 0;
    result = appData.mission / appData.budgetMonth;
  };

  

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

// Вывод расходов за месяц
console.log('Расходы за месяц: ', Math.floor(appData.budgetDay));

// Вывод функции getTargetMonth
if (appData.getTargetMonth() >= 0) {
  console.log('Цель будет достигнута через: ', Math.ceil(appData.getTargetMonth()), ' месяцев (-а)');
} else {
  console.log('Цель не будет достигнута');
}

// Вывод функции getStatusIncome
console.log(appData.getStatusIncome());
*/