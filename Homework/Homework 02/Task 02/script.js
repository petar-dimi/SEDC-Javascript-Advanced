
const changeTextColor = (element, color = "black") => {
  element.style.color = color;
};


const changeTextSize = (element, textSize = 24) => {
  element.style.fontSize = `${textSize}px`;
};


document.getElementById("changeStyleBtn").addEventListener("click", () => {
  const headerText = document.getElementById("headerText");
  const textSize = document.getElementById("textSizeInput").value;
  const color = document.getElementById("colorInput").value;

 
  changeTextColor(headerText, color || "black");
  changeTextSize(headerText, textSize || 24);
});
