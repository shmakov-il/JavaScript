'use strict';

let start = document.getElementById('start'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      value4 = document.querySelector('#deposit-check'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetMonthValue = document.querySelector('.target_month-value'),
      salaryAmount = document.querySelector('.salary-amount'),
      incomePeriodValue = document.querySelector('.income_period-value'),
      incomeItems = document.querySelectorAll('.income-items'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      periodSelect = document.querySelector('.period-select'),
      targetAmount = document.querySelector('.target-amount'),
      periodAmount = document.querySelector('.period-amount');
      
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  start: function() {
  
    appData.budget = +salaryAmount.value;
    console.log(salaryAmount.value);

    appData.getExpenses();
    appData.getIncome();
  
    appData.getInfoDeposit();
    appData.getTargetMonth();
    appData.getStatusIncome();
    appData.getAddExpenses();
    appData.getAddIncome();

    appData.getBudget();

    appData.showResult();
  },

  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.ceil(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
    // Динамическое изменение накопления за период
    periodSelect.addEventListener('change', function(event) {
    incomePeriodValue.value = appData.budgetMonth * event.target.value;
    });
  },

  addExpensesBlock: function() {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },

  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });

    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  addIncomeBlock: function() {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  getIncome: function() {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getBudget: function() {
  appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
  appData.budgetDay = appData.budgetMonth / 30;
  },

  getTargetMonth: function() {
    return targetAmount.value / appData.budgetMonth;
  },

  calcPeriod: function() {
    return appData.budgetMonth * periodSelect.value;
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
};

  // start.addEventListener('click', appData.start);
  expensesPlus.addEventListener('click', appData.addExpensesBlock);
  incomePlus.addEventListener('click', appData.addIncomeBlock);

// Изменение числа относительно положения ползунка
periodSelect.oninput = function() {
  periodAmount.innerHTML = periodSelect.value;
};

// Блокировка кнопки
start.disabled = true;
salaryAmount.addEventListener('input', function() {
  if (salaryAmount.value === '') {
    start.disabled = true;
  } else {
    start.disabled = false;
    start.addEventListener('click', appData.start);
  }
});

