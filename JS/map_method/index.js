const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const movementUSD=movements.map(function(mov){
  return mov * eurToUsd;
});
console.log(movements);
console.log(movementUSD);


// const mo = [];
// for(const mov of movements){
//   mo.push(mov * eurToUsd);
// }