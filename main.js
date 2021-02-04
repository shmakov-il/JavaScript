'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Объявление переменных
let money,
  expenses1,
  amount1,
  expenses2,
  amount2,
  sum;
const mission = 150000,
  income = 'фриланс',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?');

  const start = function() {
    do {
      money = prompt('Ваш месячный доход?');
    } 
    while (!isNumber(money));
  };

  start();

  const getExpensesMonth = function() {

    for (let i = 0; i < 2; i++) {

      if (i === 0) {
        expenses1 = prompt('Введите обязательную статью расходов?');
        amount1 = prompt('Во сколько это обойдется?');

        while (!isNumber(amount1)) {
          amount1 = prompt('Во сколько это обойдется?');
        }
      } else if (i === 1) {
        expenses2 = prompt('Введите обязательную статью расходов?');
        amount2 = prompt('Во сколько это обойдется?');

        while (!isNumber(amount2)) {
          amount2 = prompt('Во сколько это обойдется?');
        }
      }
    }

    sum = Number(amount2) + Number(amount1);
    return sum;
  }; 

  const expensesAmount = getExpensesMonth(),

  getAccumulatedMonth = function() {
    return Number(money) - expensesAmount;
  };

  const accumulatedMonth = getAccumulatedMonth(),

  getTargetMonth = function() {
    return accumulatedMonth / 30;
  },

  budgetDay = accumulatedMonth / 30,

  showTypeOf = function(data) {
    console.log(data, typeof(data));
  },
  
  getStatusIncome = function () {
    if (budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (budgetDay <= 600 && budgetDay >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else if (budgetDay < 1200 && budgetDay > 600) {
      return ('У вас средний уровень дохода');
    } else if (budgetDay < 0) {
      return ('Что-то пошло не так');
    }

    /* switch (true) {
    case (budgetDay >= 1200):
      return ('У вас высокий уровень дохода');
    case (budgetDay <= 600 && budgetDay >= 0):
      return ('К сожалению, у вас уровень дохода ниже среднего');
    case (budgetDay < 1200 && budgetDay > 600):
      return ('У вас средний уровень дохода');
    case (budgetDay < 0):
      return ('Что-то пошло не так');
    } */
  };

// Вызов функции showTypeOf
showTypeOf(Number(money));
showTypeOf(income);
showTypeOf(deposit);

// Вывод функции getExpensesMonth
console.log('Сумма всех обязательных расходов за месяц: ', expensesAmount);

// Вывод возможных расходов
console.log('Расходы: ', addExpenses.split(', '));

// Вывод функции getTargetMonth
if (getTargetMonth() >= 0) {
  console.log('Цель будет достигнута через: ', Math.ceil(getTargetMonth()), ' месяцев (-а)');
} else {
  console.log('Цель не будет достигнута');
}

// Вывод бюджета на день
console.log('Бюджет на день: ', Math.floor(budgetDay));

// Вывод функции getStatusIncome
console.log(getStatusIncome());
