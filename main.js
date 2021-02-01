'use strict';

// Объявление переменной mission 
const mission = 150000;

// Спрашиваем у пользователя месячный доход
const money = prompt('Ваш месячный доход?');
console.log('Ваш месячный доход ', money);

// Спрашиваем у пользователя возможные расходы
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log('Расходы: ', addExpenses);

// Спрашиваем у пользователя про депозит
const deposit = confirm('Есть ли у вас депозит в банке?');
console.log('Наличие депозита: ', deposit);

// Спрашиваем у пользователя два раза про обязательную статью расходов
const expenses1 = prompt('Введите обязательную статью расходов?');
console.log('Расход 1: ', expenses1);
const expenses2 = prompt('Введите обязательную статью расходов?');
console.log('Расход 2: ', expenses2);

// Спрашиваем у пользователя про величину этих двух расходов
const amount1 = prompt('Во сколько это обойдется?');
console.log('Величина 1: ', amount1);
const amount2 = prompt('Во сколько это обойдется?');
console.log('Величина 2: ', amount2);

// Вычисляем бюджет на месяц
const budgetMonth = Number(money) - Number(amount1) - Number(amount2);
console.log('Месячный бюджет: ', budgetMonth);

// Расчет compliteTarget, за сколько будет выполнена цель mission
const compliteTarget = mission / budgetMonth;
console.log('Цель будет достигнута за ' + Math.ceil(compliteTarget) + ' месяцев (-а)');

// Вычисляем дневной бюджет - budgetDay
const budgetDay = budgetMonth / 30;
console.log('Дневной бюджет: ', Math.floor(budgetDay));

// Пишем конструкцию условий
switch (true) {
  case (budgetDay >= 1200):
    console.log('У вас высокий уровень дохода');
    break;
  case (budgetDay <= 600 && budgetDay > 0):
    console.log('К сожалению, у вас уровень дохода ниже среднего');
    break;
  case (budgetDay < 1200 && budgetDay > 600):
    console.log('У вас средний уровень дохода');
    break;
  case (budgetDay < 0):
    console.log('Что-то пошло не так');
}

