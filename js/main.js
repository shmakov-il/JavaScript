'use strict';

const start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      incomeAmount = document.querySelector('.income-amount'),
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
      periodSelect = document.querySelector('.period-select'),
      targetAmount = document.querySelector('.target-amount'),
      depositCheck = document.getElementById('deposit-check'),
      periodAmount = document.querySelector('.period-amount');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');
      
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function () {

  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.persentDeposit = 0;
  this.moneyDeposit = 0;

};

AppData.prototype.cancel = function() {
    const inputClear = Array.from(document.querySelectorAll('.data [type="text"]'));
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
    const resultClear = Array.from(document.querySelectorAll('.result [type="text"]'));
    for (let i = 0; i < resultClear.length; i += 1) {
      resultClear[i].value = '';
    }
    depositCheck.checked = false;

    
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.incomeMonth = 0;
    this.expensesMonth = 0;

    this.addIncome.splice(0, this.addIncome.length);
    this.addExpenses.splice(0, this.addExpenses.length);

    const inc = this.income;
      for (let i in inc) {
        delete inc[i];
      }
    const exp = this.expenses;
      for (let i in exp) {
        delete exp[i];
      }
    this.addIncomeUnBlock();
    this.addExpensesUnBlock();
    // if (incomeItems.length > 1) {
    //   let variable = Array.prototype.slice.call(incomeItems, 1);
    //   variable.forEach((item) => {
    //   item.parentNode.removeChild(item);
    //   });
    //   incomePlus.style.display = 'block';
    // }
    // if(incomeItems.length > 1){
    //   const variable = Array.prototype.slice.call(incomeItems, 1);
    //   variable.forEach((item) =>{
    //     item.parentNode.removeChild(item);
    //   });
    //   incomePlus.style.display = 'block';
    // } else if (incomeItems.length === 0 || incomeItems.length === 1){
    //   console.log(this);
    // }

    // if(expensesItems.length > 1){
    //   const variable = Array.prototype.slice.call(expensesItems, 1);
    //   variable.forEach((item) =>{
    //     item.parentNode.removeChild(item);
    //   });
    //   expensesPlus.style.display = 'block';
    // } else if (expensesItems.length === 0 || expensesItems.length === 1){
    //   console.log(this);
    // }

    // if (expensesItems.length > 1) {
    //   let variable = Array.prototype.slice.call(expensesItems, 1);
    //   variable.forEach((item) => {
    //   item.parentNode.removeChild(item);
    //   });
    //   expensesPlus.style.display = 'block';
    // }
  };

AppData.prototype.start = function() {
    const inputBlock = Array.from(document.querySelectorAll('.data [type="text"]'));
    for (let i = 0; i < inputBlock.length; i += 1) {
      inputBlock[i].setAttribute('disabled', '');
    }
    this.budget = +salaryAmount.value;

    const cancelBtn = function () {
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
  };

AppData.prototype.showResult = function() {
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
  };

AppData.prototype.addExpensesBlock = function() {
    const cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  };

AppData.prototype.getExpenses = function() {
    expensesItems.forEach( (item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });

    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  };

AppData.prototype.getAddExpenses = function() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach( (item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  };

AppData.prototype.addIncomeBlock = function() {
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  };

AppData.prototype.getIncome = function() {
    incomeItems.forEach( (item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  };

AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach( (item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  };

AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
  };

AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth;
  };

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
  };

AppData.prototype.getInfoDeposit = function() {
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
  };

AppData.prototype.getStatusIncome = function() {
  if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay <= 600 && this.budgetDay >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 1200 && this.budgetDay > 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  };

AppData.prototype.eventsListeners = function() {
  const _this = this;
  expensesPlus.addEventListener('click', _this.addExpensesBlock.bind(_this));

  incomePlus.addEventListener('click', _this.addIncomeBlock.bind(_this));

  cancel.addEventListener('click', _this.cancel.bind(_this));

  const checkButton = () => {
    start.disabled = (!(Number(salaryAmount.value)) || +salaryAmount.value <= 0);
  };
    salaryAmount.addEventListener('input', checkButton);
    checkButton();
    start.addEventListener('click', _this.start.bind(_this));
};

AppData.prototype.addIncomeUnBlock = function(){
  incomeItems = document.querySelectorAll('.income-items');
  if(incomeItems.length > 1){
    let variable = Array.prototype.slice.call(incomeItems, 1);
    variable.forEach((item) =>{
      item.parentNode.removeChild(item);
    });
    incomePlus.style.display = 'block';
  }
};
AppData.prototype.addExpensesUnBlock = function(){
  expensesItems = document.querySelectorAll('.expenses-items');
  if(expensesItems.length > 1){
    let variable = Array.prototype.slice.call(expensesItems, 1);
    variable.forEach((item) =>{
      item.parentNode.removeChild(item);
    });
    expensesPlus.style.display = 'block';
  }
};

const appData = new AppData();
appData.eventsListeners();

// Изменение числа относительно положения ползунка
periodSelect.oninput = function() {
  periodAmount.innerHTML = periodSelect.value;
  };









