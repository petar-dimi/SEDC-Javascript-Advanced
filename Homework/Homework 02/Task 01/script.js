
function countDigits(number) {
  return Math.abs(number).toString().length;
}

function isEvenOrOdd(number) {
  return number % 2 === 0 ? "Even" : "Odd";
}


function isPositiveOrNegative(number) {
  return number >= 0 ? "Positive" : "Negative";
}


function getNumberStats() {
  const number = parseInt(document.getElementById('numberInput').value);

  if (isNaN(number)) {
      console.log("Please enter a valid number.");
      return;
  }

  const digits = countDigits(number);
  const evenOdd = isEvenOrOdd(number);
  const positiveNegative = isPositiveOrNegative(number);

  console.log(`${digits} Digits, ${evenOdd}, ${positiveNegative}`);
}
