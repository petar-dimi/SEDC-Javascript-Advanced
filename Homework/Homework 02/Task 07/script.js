
const countVowels = (str) => {
  const vowels = 'aeiou';
  return Array.from(str.toLowerCase())
              .filter(char => vowels.includes(char))
              .length;
};

document.getElementById("countBtn").addEventListener("click", () => {
  const inputString = document.getElementById("stringInput").value;
  const resultText = document.getElementById("resultText");

  
  const vowelCount = countVowels(inputString);
  resultText.textContent = `Number of vowels: ${vowelCount}`;
});
