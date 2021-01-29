// Объявление переменных и присваивание им значений
const money = 1200,
income = 'фриланс',
addExpenses = 'Интернет, Такси, Коммуналка',
deposit = false,
mission = 59915279351,
period = 4;

// Вывод в консоль тип данных money, income, deposit
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

// Вывод в консоль длины строки addExpenses
console.log(addExpenses.length);

// Вывод в консоль нужного текста
console.log('Период равен ' + period + ' месяцам' );
console.log('Цель заработать ' + mission + ' евро');

// Вывод в консоль строки addExpenses в нижнем регистре и ее разбиение на массив
console.log(addExpenses.toLowerCase().split(', '));

// Объявление новой переменной и присваивание ей значения
const budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);

// Вывод сообщения в модальном окне
alert('JavaScript');

// Вывод сообщения в консоль
console.log('Привет, мир!');