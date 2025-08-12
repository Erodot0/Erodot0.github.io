'use strict';
// Get the HTML form element and button
const form = document.querySelector('#contact-form');
const btn = document.querySelector('.form--btn');

// Get all the input fields in the form
const inputs = document.querySelectorAll('.form--field__input');

// Add an event listener for the form submission
form.addEventListener('submit', function (event) {
  // Prevent the form from actually submitting
  event.preventDefault();

  // Change the text on the button to indicate that the form is being submitted
  btn.value = 'Sending...';

  // Collect the data from the input fields
  const setData = {
    from_name: inputs[0].value,
    from_email: inputs[1].value,
    message: inputs[2].value,
  };

  // Send the data using emailjs
  emailjs.send('service_nawfksp', 'template_mkt650n', setData).then((res) => {
    // Check the response status and update the button text accordingly
    if (res.status === 200) {
      btn.value = 'Email sent';
      // Call the resetForm function with a status of "sent"
      resetForm('sent');
    } else {
      btn.value = 'Error';
      // Call the resetForm function with a status of "error"
      resetForm('error');
    }
  });
});

// A function to reset the form after submission
function resetForm(status) {
  // Add a class to blur the form
  form.classList.add('formBlur');

  // Reset each input field, and toggle a class to remove the focus effect
  inputs.forEach((input) => {
    const label = input.previousElementSibling;
    input.value = '';
    input.classList.toggle('textAreaEffect');
    if (label) {
      label.classList.toggle('inputFocusEffect');
    }
  });

  // Update the HTML elements in the sent message section based on the status of the form submission
  const sentTitle = document.querySelector('.emailSentWRapper--title');
  const sentImg = document.querySelector('.emailSentWRapper--media__img');

  // If the email has been successfully sent
  if (status === 'sent') {
    sentTitle.innerHTML = 'Email Sent!';
    sentTitle.style.color = '#90EE90';
    sentImg.src = './assets/images/check.png';
    sentImg.alt = 'Email sent icon';
  } // If there was an error sending the email
  else {
    sentTitle.innerHTML = 'Error';
    sentTitle.style.color = '#d13636';
    sentImg.src = './assets/images/cross.png';
    sentImg.alt = 'Email error icon';
  }
}
