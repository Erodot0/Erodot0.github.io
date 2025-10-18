// ===== EmailJS config =====
// 1) Create account: https://www.emailjs.com
// 2) Add email service (Gmail/Outlook/etc.)
// 3) Create a template with variables: reasons, message, date_time
// 4) Fill these three values:
const EMAILJS_PUBLIC_KEY = "ZKX9Xt1UaNb3P15Ad";
const EMAILJS_SERVICE_ID = "service_e1huimm";
const EMAILJS_TEMPLATE_ID = "template_cdkplzb";
// Optional: hardcode the recipient email inside your EmailJS template (recommended).
// Or add a template variable "to_email" and supply it below.

// Init EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

const form = document.getElementById('complaintForm');
const sendBtn = document.getElementById('sendBtn');
const statusEl = document.getElementById('status');

function showStatus(text, isError = false){
  statusEl.hidden = false;
  statusEl.textContent = text;
  statusEl.style.background = isError ? '#ffe6ea' : '#fff0f7';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  sendBtn.disabled = true;
  showStatus('Sending…');

  // Collect checked reasons
  const reasons = Array.from(document.querySelectorAll('input[name="reason"]:checked'))
    .map(el => el.value);

  if (reasons.length === 0) {
    showStatus('Pick at least one reason.', true);
    sendBtn.disabled = false;
    return;
  }

  const message = document.getElementById('message').value.trim();
  if (!message) {
    showStatus('Type the complaint/instructions.', true);
    sendBtn.disabled = false;
    return;
  }

  const templateParams = {
    reasons: reasons.join(', '),
    message: message,
    date_time: new Date().toLocaleString()
    // If your template expects to_email, add it:
    // to_email: "your@email.com"
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    showStatus('Message sent. I’ll handle it. 💌');
    form.reset();
  } catch (err) {
    console.error(err);
    showStatus('Send failed. Check EmailJS keys/service/template IDs.', true);
  } finally {
    sendBtn.disabled = false;
  }
});
