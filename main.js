'use strict';

// Объявление переменных
const mission = 150000,
  income = 'фриланс',
  money = prompt('Ваш месячный доход?'),
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = prompt('Во сколько это обойдется?'),
  getExpensesMonth = function() {
    return Number(amount1) + Number(amount2);
  }, 
  getAccumulatedMonth = function() {
    return Number(money) - Number(amount1) - Number(amount2);
  },
  accumulatedMonth = getAccumulatedMonth(),
  getTargetMonth = function() {
    return accumulatedMonth / 30;
  },
  budgetDay = accumulatedMonth / 30,
  showTypeOf = function(data) {
    console.log(data, typeof(data));
  },
  getStatusIncome = function () {
    switch (true) {
    case (budgetDay >= 1200):
      return ('У вас высокий уровень дохода');
    case (budgetDay <= 600 && budgetDay >= 0):
      return ('К сожалению, у вас уровень дохода ниже среднего');
    case (budgetDay < 1200 && budgetDay > 600):
      return ('У вас средний уровень дохода');
    case (budgetDay < 0):
      return ('Что-то пошло не так');
    }
  };

// Вызов функции showTypeOf
showTypeOf(Number(money));
showTypeOf(income);
showTypeOf(deposit);

// Вывод функции getExpensesMonth
console.log('Сумма всех обязательных расходов за месяц: ', getExpensesMonth());

// Вывод возможных расходов
console.log('Расходы: ', addExpenses.split(', '));

// Вывод функции getTargetMonth
console.log('Цель будет достигнута через: ', Math.ceil(getTargetMonth()), ' месяцев (-а)');

// Вывод бюджета на день
console.log('Бюджет на день: ', Math.floor(budgetDay));

// Вывод функции getStatusIncome
console.log(getStatusIncome());
