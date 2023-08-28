const movements = [200, 450, -400, 3000, -650, 130, 70, 1300];

// forEach loop is high order func that need call back func
// it loop an array and 
movements.forEach(function(movement,index,array){
// first parameter is current element
// second is current index
// last is the entire array
    if (movement > 0){
        console.log(`movement ${index+1}You deposited ${movement}`);
    }
    else {
        console.log(`movement ${index+1} You withdraw ${Math.abs(movement)}`);
    }
})

// 0: func(200)
// 1: func(450)
// 2: func (400)

// break and continue do not work in forEach loop
// if u want to break out of the loop you should use for of loop