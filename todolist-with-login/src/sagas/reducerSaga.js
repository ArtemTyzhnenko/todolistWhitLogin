import * as actionsTypes from './actionsTypes';

let initialState = {
    city: '',
    isFetching: true,
    didInvalidate: false,
    weatherInfo: {
        city: '',
        temp: 0,
        weather: '',
        pressure: '',
        icon: '',
    }
};


const weather = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.RECEIVE_LOCATION_SUCCESS:
            return {
                ...state,
                city: action.city,
                isFetching: true,
                didInvalidate: false,
            };
        case actionsTypes.RECEIVE_LOCATION_FAIL:
            return {
                ...state,
                city: '',
                isFetching: true,
                didInvalidate: true,
            };
        case actionsTypes.RECEIVE_WEATHER_SUCCESS:
            return {
                ...state,
                city: '',
                isFetching: false,
                didInvalidate: false,
                weatherInfo: {
                    ...state.weatherInfo,
                    city: action.data.name,
                    temp: action.data.main.temp,
                    weather: action.data.weather.map((item) => item.description).join(),
                    icon: action.data.weather.map((item) => item.icon).join(),
                    pressure: action.data.main.pressure,
                    isFetching: false,
                    didInvalidate: false,
                }
            };
        case actionsTypes.RECEIVE_WEATHER_FAIL: {
            return {
                ...state,
                city: '',
                isFetching: true,
                didInvalidate: false,
            }
        }
        default:
            return state;
    }
};

export default weather;