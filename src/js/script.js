import dotenv from 'dotenv';
import Swal from 'sweetalert2';

dotenv.config();
const btn = document.getElementById('button');

const {SERVICE_KEY, TEMPLATE_KEY, PUBLIC_KEY} = process.env;

emailjs.init(String(PUBLIC_KEY));

const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  try {
    btn.disabled = true;
    btn.textContent = 'Sending...';
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.message) {
      const serviceID = String(SERVICE_KEY);
      const templateID = String(TEMPLATE_KEY); 
      emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          btn.textContent = 'Send Email';
          Swal.fire('E-mail was sent correctly!');
        })
        .catch(() => {
          Swal.fire({
            title: 'Error!',
            text: 'Please fill the form before sending a message!',
            icon: 'error',
            confirmButtonText: 'Close'
          })
          btn.disabled = false;
          return
        })
        .then(() => btn.disabled = false)
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill the form before sending a message!',
        icon: 'error',
        confirmButtonText: 'Close'
      })
      btn.disabled = false;
      return
    }
    
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Close'
    })
    btn.disabled = false;
    return
    
  } finally {
    form.reset();
  }
});
