'use strict';

const form = document.querySelector('#contact-form');
const btn = document.querySelector('.form--btn');
const nameInput = document.getElementById('formName');
const emailInput = document.getElementById('formEmail');
const messageInput = document.getElementById('formMessage');
const websiteInput = document.getElementById('formWebsite');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (websiteInput.value) {
    return;
  }

  btn.value = 'Sending...';

  const payload = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
  };

  try {
    const res = await fetch('/.netlify/functions/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      btn.value = 'Email sent';
      resetForm('sent');
    } else {
      btn.value = 'Error';
      resetForm('error');
    }
  } catch (err) {
    btn.value = 'Error';
    resetForm('error');
  }
});

function resetForm(status) {
  form.classList.add('formBlur');

  [nameInput, emailInput, messageInput, websiteInput].forEach((input) => {
    const label = input.previousElementSibling;
    input.value = '';
    input.classList.toggle('textAreaEffect');
    if (label) {
      label.classList.toggle('inputFocusEffect');
    }
  });

  const sentTitle = document.querySelector('.emailSentWRapper--title');
  const sentImg = document.querySelector('.emailSentWRapper--media__img');

  if (status === 'sent') {
    sentTitle.textContent = 'Email Sent!';
    sentTitle.style.color = '#90EE90';
    sentImg.src = './assets/images/check.png';
    sentImg.alt = 'Email sent icon';
  } else {
    sentTitle.textContent = 'Error';
    sentTitle.style.color = '#d13636';
    sentImg.src = './assets/images/cross.png';
    sentImg.alt = 'Email error icon';
  }
}
