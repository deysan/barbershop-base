'use strict'

const loginLink = document.querySelector('.login-link');
const loginPopup = document.querySelector('.modal-login');
const loginClose = loginPopup.querySelector('.modal-close');
const loginForm = loginPopup.querySelector('.login-form');
const loginLogin = loginPopup.querySelector('[name=login]');
const loginPassword = loginPopup.querySelector('[name=password]');

let isStorageSupport = true;
let storageLocal = '';

try {
  storageLocal = localStorage.getItem('login');
} catch (err) {
  isStorageSupport = false;
}

loginLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  loginPopup.classList.add('modal-show');
  if (storageLocal) {
    loginLogin.value = storageLocal;
    loginPassword.focus();
  } else {
    loginLogin.focus();
  }
});

loginClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  loginPopup.classList.remove('modal-show');
  if (loginPopup.classList.contains('modal-error')) {
    loginPopup.classList.remove('modal-error');
  }
});

loginForm.addEventListener('submit', function (evt) {
  if (!loginLogin.value || !loginPassword.value) {
    evt.preventDefault();
    if (loginPopup.classList.contains('modal-error')) {
      loginPopup.classList.remove('modal-error');
    }
    loginPopup.classList.add('modal-error');
  } else if (isStorageSupport) {
    localStorage.setItem('login', loginLogin.value);
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (loginPopup.classList.contains('modal-show')) {
      evt.preventDefault();
      loginPopup.classList.remove('modal-show');
      if (loginPopup.classList.contains('modal-error')) {
        loginPopup.classList.remove('modal-error');
      }
    }
  }
});
