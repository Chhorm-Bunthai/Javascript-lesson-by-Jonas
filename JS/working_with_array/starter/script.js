'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function (movements){
  containerMovements.innerHTML = ' ';
  movements.forEach(function(mov,i){
    
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1}${type}</div>
          <div class="movements__value">${mov}</div>
        </div>`
    containerMovements.insertAdjacentHTML('afterbegin',html)
  });
}
const calcPrintBalance = function(acc){
  acc.balance = acc.movements.reduce((acc,mov)=> acc + mov,0);
  labelBalance.textContent = `${acc.balance} EUR`;
};


const calcDisplaySummary = function (acc){
  const incomes = acc.movements.filter(mov=>mov > 0).reduce((acc,mov) =>   acc + mov,0
  );
  labelSumIn.textContent = `${incomes}©`

  const outcomes = acc.movements.filter(mov=> mov<0).reduce((acc,mov)=>acc = mov , 0)
  labelSumOut.textContent = `${Math.abs(outcomes)}USD`;

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate/100).filter((int,i,arr)=>{
    // console.log(arr);
    return int >= 1;
  }).reduce((acc,int)=>acc = int , 0)
  labelSumInterest.textContent = `${interest}©`
}

const createUserName = function(accs){

  accs.forEach(function(acc){
    acc.username=acc.owner.toLowerCase().split(' ').map(word =>word[0]).join('')
  })

}
createUserName(accounts)
console.log(accounts);

//Event handler
const updateUI = function(){
  displayMovements(currentAccount.movements);
      calcPrintBalance(currentAccount);
      calcDisplaySummary(currentAccount)
}

let currentAccount;
btnLogin.addEventListener('click',function(e){
  e.preventDefault();
  currentAccount = accounts.find(acc=>acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)){
      labelWelcome.textContent = `welcome back, ${currentAccount.owner.split(' ')[0]}`;
      containerApp.style.opacity = 100;
      inputLoginPin.blur();

      // clear input field
      inputLoginUsername.value =inputLoginPin.value = '';
      // update UI
      updateUI(currentAccount)
  }
});

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(acc=>acc.username === inputTransferTo.value);
  inputTransferAmount.value=inputTransferTo.value = ''

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc !== currentAccount?.username){

    // doing the tranfer
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)

    updateUI(currentAccount)
  }
});

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  
  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)){

    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    console.log(index);
    // delete account
    accounts.splice(index,1);

    // hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value=inputClosePin.value = '';
})

btnLoan.addEventListener('click',function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov=>mov>=amount*0.1)){
    currentAccount.movements.push(amount);
    updateUI(currentAccount)
  }
  inputLoanAmount.value = ''
})






/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// The find method
// find method does not return new array but it only return the first element that satifies the condition
// return only element
// const firstWithdraw = movements.find(mov => mov < 0)
// console.log(movements);
// console.log(firstWithdraw);
// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);



// map method
// const createUserName = function(accs){

//   accs.forEach(function(acc){
//     acc.username=acc.owner.toLowerCase().split(' ').map(word =>word[0]).join('')
//   })

// }
// createUserName(accounts)
// console.log(accounts);


// Filter method
// Return new array
// const deposit = movements.filter(function(mov){
//   return mov > 0
// });
// console.log(movements);
// console.log(deposit);


// const deposits = [];
// for (const mov of movements){
//   if (mov > 0){
//     deposits.push(mov)
//   }
// }
// console.log(deposits);
// const withdrawal = movements.filter(function(mov){
//   return mov < 0
// })
// console.log(withdrawal);


/* Reduce method */
// We use reduce method to boil down all element in array to one single value

// first is accomulator
// const balance = movements.reduce(function(acc,cur,index,arr){
//   return acc + cur
// },0)
//  0 here is the initializer in the first loop
// console.log(balance);


// reduce method also work for finding max
// const max = movements.reduce((acc,mov)=> {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0])
// console.log(max);

/* The magic of chaining methods */
const eurToUsd = 1.1;

// pipeline
// const totalDepositsUSD = movements.filter(mov => mov > 0 ).map(mov => mov * eurToUsd).reduce((acc,mov) => acc + mov, 0)
// we can do this because of filter and map return array but reduce return a value not array so we can not do this anymore
// console.log(totalDepositsUSD);




/* Some and every */

// console.log(movements.some(mov=>mov === -130));
// const anyDeposit = movements.some(mov=>mov>5000)
// console.log(anyDeposit);



/* flat and flatmap */

const arr = [[1,2,3],[4,5,6],7,8]
console.log(arr.flat());
const arrdeep = [[[1,2],3],[4,[5,6]],[7],8]
console.log(arrdeep.flat(2));

// flat
// const overalBalance = accounts.map(acc=>
//   acc.movements).flat().reduce((acc,mov)=> acc + mov,0)
//   console.log(overalBalance);

// flatmap
// const overalBalance1 = accounts.flatMap(acc=>
//   acc.movements).reduce((acc,mov)=> acc + mov,0)
//   console.log(overalBalance1);


/* Sorting Array */

/////////////////////////////////////////////////
