const form = document.querySelector("#contact-form");
const btn = document.querySelector(".form--btn");
const inputs = document.querySelectorAll(".form--field__input");
let serviceId;
let templateId;

//fetching the keys
fetch('../config.json')
  .then(res => res.json() )
  .then(env => {
    serviceId = env.service_id;
    templateId = env.template_id;
  });


form.addEventListener("submit", function (event) {
  event.preventDefault();
  btn.value = "Sending...";

  const setData = {
    name: inputs[0].value,
    email: inputs[1].value,
    message: inputs[2].value,
  };

  emailjs.send(serviceId, templateId, setData).then((res) => {
    if (res.status === 200) {
      btn.value = "Email sent";
      resetForm("sent");
    } else {
      resetForm("error");
    }
  });
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
  const sentImg = document.querySelector(".emailSentWRapper--media__img");

  if (status === "sent") {
    sentTitle.innerHTML = "Email Sent!";
    sentTitle.style.color = "#90EE90";
    sentImg.src = "./assets/images/check.png";
  } else {
    sentTitle.innerHTML = "Error";
    sentTitle.style.color = "#d13636";
    sentImg.src = "./assets/images/cross.png";
  }
}
