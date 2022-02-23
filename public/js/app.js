console.log('Client side javascript file is loaded');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#error-message');
const msg2 = document.querySelector('#forecast-message');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const location = search.value;

    msg1.textContent = 'Loading...';
    msg2.textContent = '';

    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                msg1.textContent = data.error;
                console.error(data.error);
            } else {
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;
                console.log(data.location, data.forecast);
            }
        })
    });
})