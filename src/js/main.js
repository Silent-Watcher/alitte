import { driver } from "driver.js";
import "driver.js/dist/driver.css";

let toggle = document.querySelector('#toggleReadMore'),
  more = document.querySelector('#more'),
  dots = document.querySelector('#dots'),
  isExpanded = true;
let PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
let year = document.getElementById('year');

const submitLoader = document.querySelector('#loader');
const submitTxt = document.querySelector('#submitTxt');
const isVisited = localStorage.getItem('visited') ?? false

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


  // update the copy right section year dynamically 
  year.innerHTML = new Date().getFullYear();

  document
    .querySelector('#contact_form')
    .addEventListener('submit', function (e) {
      submitLoader.classList.replace('hidden', 'inline');
      submitTxt.innerText = 'loading...';
      e.preventDefault();
      emailjs
        .sendForm('contact_service', ' contact_form', this)
        .then(() => {
          // send reply email
          emailjs
            .send('contact_service', 'reply_form', {
              user_name: document.querySelector('#user_name').value,
              from_name: 'Ali nazari',
              user_email: document.querySelector('#email').value,
            })
            .then(() => {
              Toast.fire({
                icon: 'success',
                title: 'Email sent successfully 😎',
              });
              submitLoader.classList.replace('inline', 'hidden');
              submitTxt.innerText = 'Submit';
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
            title: 'failed to send email! try again',
          });
          submitLoader.classList.replace('inline', 'hidden');
          submitTxt.innerText = 'Submit';
          document.querySelectorAll('input').forEach((input) => {
            input.value = null;
          });
          document.querySelector('textarea').value = null;
        });
    });

    // start the app tour
    const driverObj = driver({
      popoverClass: 'driverjs-theme',
      showProgress: true,
      showButtons: ['next', 'previous'],
      steps: [
        { element: 'h1', popover: { title: 'Welcome! 🥹', description: 'wait wait Let me introduce myself My name is...' }},
        { element: '#resume', popover: { title: 'My History', description: 'you can find my resume here', side: "bottom", align: 'start' }},
        { element: '#blog-section', popover: { title: 'my writings', description: 'you can check some of my writings if you are interested!', side: "bottom", align: 'start' }},
        { element: '#contact_form', popover: { title: 'Let\'s connect!', description: 'send me good energy , song recommendation or possible working opportunities', side: "bottom", align: 'start' }},
        { element: '#buy-me-coffee', popover: { title: 'Coffee!', description: ':) 💸', side: "bottom", align: 'start' }},
      ]
    });
    
    console.log('isVisited: ', isVisited);
    if(isVisited == false)
      driverObj.drive();
      localStorage.setItem('visited' , 'true')
  });
