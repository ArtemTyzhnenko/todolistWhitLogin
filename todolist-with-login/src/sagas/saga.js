import {select, put, call } from 'redux-saga/effects';
import  {receiveLocationSuccess, receiveLocationFail,
    receiveWeatherSuccess, receiveWeatherFail,
    fetchLocation, fetchWeather} from './actions'

function* fetchWeatherInYourLocation() {
    try {
        const city = yield call(fetchLocation);
        yield put(receiveLocationSuccess(city));
    } catch (e) {
        yield put(receiveLocationFail);
    }

    try{
        const city = yield select(({weather})=>weather.city);
        const weather = yield call(fetchWeather, city);
        yield  put (receiveWeatherSuccess(weather))
    } catch (e){
        yield put(receiveWeatherFail);
    }
}



export default fetchWeatherInYourLocation;