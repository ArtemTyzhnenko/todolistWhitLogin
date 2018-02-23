import * as actionTypes from './actionsTypes';

export const receiveLocationSuccess = (city) => ({
    type: actionTypes.RECEIVE_LOCATION_SUCCESS,
    city,
});

export const receiveLocationFail = () => ({
    type: actionTypes.RECEIVE_LOCATION_FAIL,
});

export  const receiveWeatherSuccess = (data) =>({
    type: actionTypes.RECEIVE_WEATHER_SUCCESS,
    data,
});

export  const receiveWeatherFail = (data) =>({
    type: actionTypes.RECEIVE_WEATHER_FAIL,
});

export const fetchLocation = () => {
    return fetch('https://ipapi.co/json')
        .then(data => data.json())
        .then(data => data.city)
        .catch(error => alert(error))
};

export const fetchWeather = (city) => {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?appid=3b2dce7c397645e8583f51b27d0279dc&q=${city}&units=metric`)
            .then(data => data.json())
            .then(data =>data)
            .catch(error => alert('fetchWeather ERROR'))
};
