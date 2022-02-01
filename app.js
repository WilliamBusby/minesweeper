
const difficultyOption = document.getElementById("landing_page__difficulty__select");
const customDifficultyNumberInputs = document.getElementById("landing_page__dropdown__custom");

const changedDifficultyCustomCheck = () => {
  if(difficultyOption.value === "custom") {
    customDifficultyNumberInputs.style.display = "grid";
  } else {
    customDifficultyNumberInputs.style.display = "none";
  }
}