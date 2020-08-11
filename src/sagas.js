import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'
import {actions, t} from './actions';
const baseUrl = 'https://api.github.com/users';

function* loadUserData(action) {
    console.log('loadUserData--')
    const response = yield axios.get(`${baseUrl}/${action.name}/repos`);
    yield put(actions.loadUserDataSuccess(response.data))
}

export function* watchLoadUserData() {
    console.log('watchLoadUserData--')
    yield takeLatest(t.LOAD_USER_DATA, loadUserData)
    
}
