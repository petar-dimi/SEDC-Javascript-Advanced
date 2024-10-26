
document.getElementById("calculateBtn").addEventListener("click", () => {
  const inputNumber = parseInt(document.getElementById("factorialInput").value);
  const resultText = document.getElementById("resultText");

  if (isNaN(inputNumber) || inputNumber < 0) {
      resultText.textContent = "Please enter a non-negative integer.";
      console.log("Invalid input. Enter a non-negative integer.");
      return;
  }


  (function calculateFactorial(num) {
      let factorial = 1;
      for (let i = 1; i <= num; i++) {
          factorial *= i;
      }
      console.log(`Factorial of ${num} is: ${factorial}`);
      resultText.textContent = `Factorial of ${num} is: ${factorial}`;
  })(inputNumber); 
});
