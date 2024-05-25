const messages = document.querySelectorAll('.message');

messages.forEach(message => {
    setTimeout(() => {
        message.remove();
    }, 7000);
});
