"use strict";
let current;
let currentDate;
let check;
const cta = document.querySelector('button');
const container = document.querySelector('.container');

// Завантаження попереднього стану з локального сховища
const savedState = localStorage.getItem('buttonState');
const savedDateMessage = localStorage.getItem('dateMessage');
console.log(savedDateMessage);
current = savedState || 'off';
currentDate = savedDateMessage || formattedDate();
updateButtonAndContainer();

cta.addEventListener("click", toggleCta);

function toggleCta() {
    if (current === 'off') {
        current = 'on';
        check = 'off';
    } else {
        current = 'off';
        check = 'on';
    }

    // Збереження поточного стану в локальному сховищі
    localStorage.setItem('buttonState', current);
    localStorage.setItem('dateMessage', `Last turn ${check}: ${currentDate}`);
    currentDate = formattedDate();
    updateButtonAndContainer();
    runMessage();
    
}

function updateButtonAndContainer() {
    cta.innerText = current === 'off' ? 'Turn off' : 'Turn on';
    container.style.backgroundColor = current === 'off' ? '#ffffff' : '#171414';
}

function runMessage() {
    const existingTextMessage = container.querySelector('.text-message');
    
    // Видалення попереднього текстового повідомлення
    if (existingTextMessage) {
        existingTextMessage.remove();
    }

    const textMessage = document.createElement('div');
    textMessage.classList.add('text-message');
    textMessage.textContent = `Last turn ${check} ${currentDate}`;
    container.append(textMessage);
}

function formattedDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    return `${formatNumber(day)}-${formatNumber(month)}-${year} ${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
}

function formatNumber(number) {
    return number < 10 ? `0${number}` : number;
}
