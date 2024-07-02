let toggle = document.querySelector('#toggleReadMore'),
  more = document.querySelector('#more'),
  dots = document.querySelector('#dots'),
  isExpanded = true;
let PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const submitBtn = document.querySelector('#submitBtn')
let year = document.getElementById('year');


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

toggle.onclick = toggleReadMore;

function toggleReadMore() {
  more.classList.toggle('hidden');
  dots.classList.toggle('hidden');
  toggle.innerText = isExpanded ? 'Read less' : 'Read more';
  isExpanded = !isExpanded;
}

emailjs.init({
  publicKey: PUBLIC_KEY,
});

window.addEventListener('load', () => {

  year.innerHTML = new Date().getFullYear();

  document
    .querySelector('#contact_form')
    .addEventListener('submit', function (e) {
      submitBtn.innerText = 'Loading ...'
      e.preventDefault();

      emailjs
        .sendForm('contact_service', ' contact_form', this)
        .then(() => {
          // send reply email
          emailjs.send("contact_service","reply_form",{
            user_name: document.querySelector('#user_name').value,
            from_name: "Ali nazari",
            user_email: document.querySelector('#email').value,
          }).then(()=>{
            Toast.fire({
              icon: 'success',
              title: 'Email sent successfully 😎',
            });
            submitBtn.innerText = 'Submit'
          });
          // cleaning the form
          document.querySelectorAll('input').forEach((input) => {
            input.value = null;
          });
          document.querySelector('textarea').value = null;
        })
        .catch((error) => {
          Toast.fire({
            icon: 'error',
            title: error.message,
          });
        });
    });
});

