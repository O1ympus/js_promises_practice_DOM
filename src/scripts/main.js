'use strict';

const body = document.querySelector('body');
let [leftC, rightC] = [false, false];

function createNotification(msg, divClass) {
  const notification = document.createElement('div');

  notification.textContent = msg;
  notification.className = divClass;
  notification.setAttribute('data-qa', 'notification');
  body.appendChild(notification);
}

function successHandler(msg) {
  createNotification(msg, 'success');
}

function errorHandler(msg) {
  createNotification(msg, 'error');
}

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('click', (e) => {
    clearTimeout(timer);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    leftC = true;
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    rightC = true;
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    leftC = true;

    if (leftC && rightC) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    rightC = true;

    if (leftC && rightC) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
