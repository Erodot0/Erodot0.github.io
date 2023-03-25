const form = document.querySelector("#contact-form");
const inputs = document.querySelectorAll(".form--field__input");

let emailSent = false;
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const setData = {
    name: inputs[0].value,
    email: inputs[1].value,
    message: inputs[2].value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    if (xhr.responseText == "success") {
      resetForm("sent");
    } else {
      resetForm("error");
    }
  };
  xhr.send(JSON.stringify(setData));
});

function resetForm(status) {
  form.classList.add("formBlur");
  inputs.forEach((input) => {
    const label = input.previousElementSibling;
    input.value = "";
    input.classList.toggle("textAreaEffect");
    if (label) {
      label.classList.toggle("inputFocusEffect");
    }
  });

  const sentTitle = document.querySelector(".emailSentWRapper--title");
  const sentImg = document.querySelector(".emailSentWRapper--media__img")

  if (status === "sent") {
    sentTitle.innerHTML = "Email Sent!"
    sentTitle.style.color = "#90EE90"
    sentImg.src = "./assets/images/check.png"
} else {
    sentTitle.innerHTML = "Error"
    sentTitle.style.color = "#d13636"
    sentImg.src = "./assets/images/cross.png"
  }
}
