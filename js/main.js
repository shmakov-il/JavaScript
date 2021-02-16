'use strict';

let start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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
  cancel: function() {
    let inputClear = Array.from(document.querySelectorAll('[type="text"]'));
    for (let i = 0; i < inputClear.length; i += 1) {
      inputClear[i].value = '';
    }
    for (let i = 0; i < 11; i += 1) {
      inputClear[i].removeAttribute('disabled');
    }
    cancel.style.display = "none";
    start.style.display = "block";
  },

  start: function() {
    let inputBlock = Array.from(document.querySelectorAll('[type="text"]'));
    for (let i = 0; i < 11; i += 1) {
      inputBlock[i].setAttribute('disabled', '');
    }
    this.budget = +salaryAmount.value;

// Появление кнопки "Сбросить"
    let cancelBtn = function () {
      cancel.style.display = "block";
      start.style.display = "none";
    };
    cancelBtn();

    this.getExpenses();
    this.getIncome();
  
    this.getInfoDeposit();
    this.getTargetMonth();
    this.getStatusIncome();
    this.getAddExpenses();
    this.getAddIncome();

    this.getBudget();

    this.showResult();
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
    let inputRange = function (event) {
      incomePeriodValue.value = this.budgetMonth * event.target.value;
    };
    periodSelect.addEventListener('change', inputRange.bind(appData));
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
    let getExpensesThis = function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    };
    expensesItems.forEach(getExpensesThis.bind(appData));

    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },

  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    let getAddExpensesThis = function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    };
    addExpenses.forEach(getAddExpensesThis.bind(appData));
    
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
    let getIncomeThis = function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    };
    incomeItems.forEach(getIncomeThis.bind(appData));

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },

  getAddIncome: function() {
    let getAddIncomeThis = function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    };
    additionalIncomeItem.forEach(getAddIncomeThis.bind(appData));
  },

  getBudget: function() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
  },

  getTargetMonth: function() {
    return targetAmount.value / this.budgetMonth;
  },

  calcPeriod: function() {
    return this.budgetMonth * periodSelect.value;
  },

  getInfoDeposit: function() {
    if (this.deposit) {
      do {
        this.persentDeposit = prompt('Какой годовой процент?', 10);
      } 
      while (!isNumber(this.persentDeposit));

      do {
        this.moneyDeposit = prompt('Какая сумма заложена', 500);
      } 
      while (!isNumber(this.moneyDeposit));
    }
  },

  getStatusIncome: function() {
  if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay <= 600 && this.budgetDay >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 1200 && this.budgetDay > 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  },
};

  expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
  incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));

// Изменение числа относительно положения ползунка
periodSelect.oninput = function() {
  periodAmount.innerHTML = periodSelect.value;
};

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.cancel.bind(appData));





