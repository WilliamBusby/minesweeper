"use strict";

var difficultyOption = document.getElementById("landing_page__difficulty__select");
var customDifficultyNumberInputs = document.getElementById("landing_page__dropdown__custom");
difficultyOption.addEventListener("change", function (event) {
  event.preventDefault();

  if (difficultyOption.value === "custom") {
    customDifficultyNumberInputs.style.display = "grid";
  } else {
    customDifficultyNumberInputs.style.display = "none";
  }
});