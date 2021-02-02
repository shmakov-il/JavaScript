'use strict';

// Объявление переменных
const mission = 150000,
  money = prompt('Ваш месячный доход?'),
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = prompt('Во сколько это обойдется?'),
  budgetMonth = Number(money) - Number(amount1) - Number(amount2),
  compliteTarget = mission / budgetMonth,
  budgetDay = budgetMonth / 30;


// Выводим месячный доход
console.log('Ваш месячный доход ', money);

// Выводим возможные расходы
console.log('Расходы: ', addExpenses);

// Выводим информацию про депозит
console.log('Наличие депозита: ', deposit);

// Выводим информацию про обязательные расходы
console.log('Расход 1: ', expenses1);
console.log('Величина 1: ', amount1);
console.log('Расход 2: ', expenses2);
console.log('Величина 2: ', amount2);

// Выводим бюджет на месяц
console.log('Месячный бюджет: ', budgetMonth);

// Выводим compliteTarget, за сколько будет выполнена цель mission
console.log('Цель будет достигнута за ' + Math.ceil(compliteTarget) + ' месяцев (-а)');

// Выводим дневной бюджет - budgetDay
console.log('Дневной бюджет: ', Math.floor(budgetDay));

// Пишем конструкцию условий
switch (true) {
  case (budgetDay >= 1200):
    console.log('У вас высокий уровень дохода');
    break;
  case (budgetDay <= 600 && budgetDay >= 0):
    console.log('К сожалению, у вас уровень дохода ниже среднего');
    break;
  case (budgetDay < 1200 && budgetDay > 600):
    console.log('У вас средний уровень дохода');
    break;
  case (budgetDay < 0):
    console.log('Что-то пошло не так');
}

