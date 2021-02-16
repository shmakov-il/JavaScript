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
    let inputClear = Array.from(document.querySelectorAll('.data [type="text"]'));
    for (let i = 0; i < inputClear.length; i += 1) {
      inputClear[i].value = '';
    }
    periodSelect.value = '1';
    periodAmount.innerHTML = '1';
    for (let i = 0; i < inputClear.length; i += 1) {
      inputClear[i].removeAttribute('disabled');
    }
    cancel.style.display = "none";
    start.style.display = "block";
    start.setAttribute('disabled', '');
  },

  start: function() {
    let inputBlock = Array.from(document.querySelectorAll('.data [type="text"]'));
    for (let i = 0; i < inputBlock.length; i += 1) {
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
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    const _this = this;
    // Динамическое изменение накопления за период
    periodSelect.addEventListener('change', function(event) {
    incomePeriodValue.value = _this.budgetMonth * event.target.value;
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
    expensesItems.forEach( (item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });

    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },

  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach( (item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
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
    incomeItems.forEach( (item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },

  getAddIncome: function() {
    additionalIncomeItem.forEach( (item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
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

// start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.cancel.bind(appData));

start.disabled = true;
salaryAmount.addEventListener('change', function() {
  if (salaryAmount.value === '') {
    start.disabled = true;
  } else {
    start.disabled = false;
    start.addEventListener('click', appData.start.bind(appData));
  }
});




