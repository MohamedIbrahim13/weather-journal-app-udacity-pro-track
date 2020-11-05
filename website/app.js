/* Global Variables */
const apiKey = '5cf9afd68ec3ca989613559ca1ceaa1f';
const base_url = 'https://api.openweathermap.org/data/2.5/weather';
const zipInput = document.querySelector('#zip');
const feelingInput = document.querySelector('#feelings');
const generateButton = document.querySelector('#generate');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        // console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);

    }
}
/* Function to GET data */
const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },

    });

    try {
        const newData = await response.json();
        // console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);

    }
}

// helper function to update the UI
const updateUi = (data) => {
    date.textContent = `${data.date}`;
    temp.textContent = `${data.temp} C`;
    content.textContent = `${data.feelings}`;
};

// helper function get data from the API
const getWeather = async (zip) => {
    const response = await fetch(`${base_url}?zip=${zip}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data.main.temp;

};

generateButton.addEventListener('click', (e) => {
    e.preventDefault();
    // trim whitespace
    const zip = zipInput.value.trim();
    const feeling = feelingInput.value.trim();
    // reset inputs
    zipInput.value = '';
    feelingInput.value = '';
    // get data from API , post to the server , retrieve and update the UI
    getWeather(zip).then(currentWeather => {
        postData('/add', {
            newDate,
            currentWeather,
            feeling
        });
        getData('/all').then(data => updateUi(data[0]));
    }).catch(err => console.log(err));

});
