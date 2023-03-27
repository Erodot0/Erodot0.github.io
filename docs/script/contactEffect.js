// Get all input fields and the form submit button
const formInput = document.querySelectorAll(".form--field__input");
const formBtn = document.querySelector(".form--btn");

// Initialize a variable to keep track of whether any input field has text
let isTextPresent;

// Add focus and blur event listeners to each input field
formInput.forEach((input) => {
  // Get the input field's associated label
  const label = input.previousElementSibling;
  
  // Add focus event listener to input field
  input.addEventListener("focus", () => {
    // Check if the input field has text
    const inputValue = input.value.trim().length > 0;
    // If the input field doesn't have text, add a focus effect to the label and input field
    if (label && inputValue === false) {
      label.classList.add("inputFocusEffect");
      input.classList.add("textAreaEffect");
    }
  });

  // Add blur event listener to input field
  input.addEventListener("blur", () => {
    // Check if the input field has text
    const inputValue = input.value.trim().length > 0;
    // If the input field doesn't have text, remove the focus effect from the label and input field
    if (label && inputValue === false) {
      label.classList.remove("inputFocusEffect");
      input.classList.remove("textAreaEffect");
    }

    if (formInput[0].value != "" && formInput[1].value != "" && formInput[2].value != ""){
      formBtn.classList.add("formBtnEffect")
    } else {
      formBtn.classList.remove("formBtnEffect")
    }
  });
}); 