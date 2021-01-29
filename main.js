// Объявление переменных и присваивание им значений
const money = 1200,
  income = 'фриланс',
  addExpenses = 'Интернет, Такси, Коммуналка',
  deposit = false,
  mission = 59915279351,
  period = 4,
  budgetDay = money / 30;

// Вывод в консоль тип данных money, income, deposit
console.log(typeof money, typeof income, typeof deposit);

// Вывод в консоль длины строки addExpenses
console.log(addExpenses.length);

// Вывод в консоль нужного текста
console.log('Период равен ' + period + ' месяцам' );
console.log('Цель заработать ' + mission + ' евро');

// Вывод в консоль строки addExpenses в нижнем регистре и ее разбиение на массив
console.log(addExpenses.toLowerCase().split(', '));

// Вывод в консоль budgetDay
console.log('budgetDay: ', budgetDay);