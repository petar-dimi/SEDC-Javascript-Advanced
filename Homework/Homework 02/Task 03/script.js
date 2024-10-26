
const squareArrayElements = function(arr) {
  return arr.map(number => number * number);
};


document.getElementById("calculateBtn").addEventListener("click", () => {
  const input = document.getElementById("arrayInput").value;
  const resultText = document.getElementById("resultText");

 
  const numbersArray = input.split(',').map(Number);


  if (numbersArray.some(isNaN)) {
      resultText.textContent = "Please enter valid numbers separated by commas.";
      return;
  }

  
  const squaredArray = squareArrayElements(numbersArray);
  resultText.textContent = `Squared elements: ${squaredArray.join(', ')}`;
});
