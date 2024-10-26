
const reverseWords = (str) => 
  str.split(' ').map(word => word.split('').reverse().join('')).join(' ');


document.getElementById("reverseBtn").addEventListener("click", () => {
  const inputString = document.getElementById("stringInput").value.toLowerCase();
  const resultText = document.getElementById("resultText");

  
  const reversedString = reverseWords(inputString);
  resultText.textContent = `Reversed words: ${reversedString}`;
});
