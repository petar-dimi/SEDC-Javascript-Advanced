
let array = [
  -10, 5, 7894, NaN, 'Hello world', Infinity, false, { name: 'Bob', age: 23 },
  25, name => `Hello ${name}`, -Infinity, ['hi', 28, -93, true], 
  undefined, 14, null, 159, 0, -11
];


const productOfPositives = function(arr) {
 
  const positiveNumbers = arr.filter(
      item => typeof item === 'number' && isFinite(item) && item > 0
  );

 
  if (positiveNumbers.length === 0) return 0;


  return positiveNumbers.reduce((product, number) => product * number, 1);
};


document.getElementById("calculateBtn").addEventListener("click", () => {
  const resultText = document.getElementById("resultText");


  const productResult = productOfPositives(array);
  resultText.textContent = `Product of all positive numbers: ${productResult}`;
});
