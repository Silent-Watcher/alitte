let toggle = document.querySelector('#toggleReadMore'),
  more = document.querySelector('#more'),
  dots = document.querySelector('#dots'),
  isExpanded = true;
let PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
let year = document.getElementById('year');

const submitLoader = document.querySelector('#loader');
const submitTxt = document.querySelector('#submitTxt');
const iframe = document.querySelector('#soundCloud-iframe');
const travoltaDancing = document.querySelector('#travolta-dancing');
const failedIframeLoadMsg = document.querySelector('#iframe-failed-msg')

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
            title: error.message,
          });
        });
    });

    fetch('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1394781433&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false',{
      mode: 'no-cors'
    })
      .then((response) => {
          iframe.classList.remove('hidden');
          travoltaDancing.src = '/dancin.gif'
          failedIframeLoadMsg.classList.replace('flex' , 'hidden')
        })
        .catch(error =>{
          console.log('error: ', error);
          failedIframeLoadMsg.classList.replace('hidden' , 'flex')
          iframe.classList.add('hidden')
         travoltaDancing.src = '/waiting.gif'
      })
  });
