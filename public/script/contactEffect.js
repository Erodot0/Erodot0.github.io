const formInput = document.querySelectorAll(".form--field__input");
const formBtn = document.querySelector(".form--btn")
let isTextPresent;

formInput.forEach((input) => {
  const label = input.previousElementSibling;
  input.addEventListener("focus", () => {
    const inputValue = input.value.trim().length > 0;
    if (label && inputValue === false) {
      label.classList.add("inputFocusEffect");
      input.classList.add("textAreaEffect");
    }
  });

  input.addEventListener("blur", () => {
    const inputValue = input.value.trim().length > 0;
    if (label && inputValue === false) {
      label.classList.remove("inputFocusEffect");
      input.classList.remove("textAreaEffect");
    }
  });
});

const textarea = formInput[2];
textarea.addEventListener("focus", () => {
    textarea.classList.add("textAreaEffect");
});
textarea.addEventListener("blur", () => {
  const inputValue = textarea.value.trim().length > 0;
  if (inputValue === false) {
    textarea.classList.remove("textAreaEffect");
  }
});
