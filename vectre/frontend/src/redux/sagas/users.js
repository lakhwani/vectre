import { call, put, takeLatest } from "redux-saga/effects"
import {getRequest, postRequest, putRequest} from "./index";
import {
    storeUsers,
    storeLoginNonce,
    storeLoggedInUser,
    storeUser,
} from "../actions/users";
import {
    GET_LOGIN_NONCE,
    LOGIN_USER,
    GET_USER,
    GET_USERS,
    GET_LOGGED_IN_USER,
    CREATE_USER,
    UPDATE_USER,
    FOLLOW_USER,
    UNFOLLOW_USER,
} from "../constants/users";
import {
    BASE_API_URL,
    USERS
} from "../constants/endpoints";
import { getCreate } from "../actions/create";

// Login
function* getLoginNonce(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.GET_LOGIN_NONCE, { wallet_address: action.wallet_address }), responseData = response[1]
        if (responseData.success)
            yield put(storeLoginNonce(responseData.nonce))
    } catch (error) {
        console.log(error)
    }
}
function* loginUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.LOGIN, { wallet_address: action.wallet_address, signed_nonce: action.signedNonce }), responseData = response[1]
        console.log(responseData)
        if (responseData.success)
            yield put(action.redirectWindow("/home"))
    } catch (error) {
        console.log(error)
    }
}

function* getLoggedInUser() {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_LOGGED_IN_USER), responseData = response[1]
        if (responseData.success) {
            yield put(storeLoggedInUser(responseData.user))
        } else { // TODO: Show error message
            console.log(responseData.message)
        }
    } catch (error) {
        console.log(error)
    }
}

function* getUser(action) {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_USERS + `/${action.wallet_address}`), responseData = response[1]
        if (responseData.success) {
            yield put(storeUser(responseData.user))
        } else { // TODO: Show error message
        }
    } catch (error) {
        console.log(error)
    }
}
function* getUsers() {
    try {
        const response = yield call(getRequest, BASE_API_URL + USERS.GET_USERS), responseData = response[1]
        if (responseData.success) {
            yield put(storeUsers(responseData.users))
        } else { // TODO: Show error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* createUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.CREATE_USER, action.user), responseData = response[1]
        if (responseData.success) { // TODO: Show toast success message
            yield put(getCreate(responseData))
            if (action.redirectWindow) yield put(action.redirectWindow("/home"))
        } else { // TODO: Show toast error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateUser(action) {
    try {
        const response = yield call(putRequest, BASE_API_URL + USERS.UPDATE_USER.replace("{wallet_address}", action.wallet_address), action.updatedUser), responseData = response[1]
        if (responseData.success) { // TODO: Show toast success message
            if (action.redirectWindow) yield put(action.redirectWindow(`/user/${action.wallet_address}`))
        } else { // TODO: Show toast error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* followUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.FOLLOW_USER.replace("{wallet_address}", action.wallet_address_to_follow), {}), responseData = response[1]
        if (responseData.success) { // TODO: Show toast success message
            if (action.redirectWindow) yield put(action.redirectWindow(`/user/${action.wallet_address_to_follow}`))
        } else { // TODO: Show toast error message
        }
    } catch (error) {
        console.log(error)
    }
}
function* unfollowUser(action) {
    try {
        const response = yield call(postRequest, BASE_API_URL + USERS.UNFOLLOW_USER.replace("{wallet_address}", action.wallet_address_to_unfollow), {}), responseData = response[1]
        if (responseData.success) { // TODO: Show toast success message
            if (action.redirectWindow) yield put(action.redirectWindow(`/user/${action.wallet_address_to_unfollow}`))
        } else { // TODO: Show toast error message
        }
    } catch (error) {
        console.log(error)
    }
}

function* usersSaga() {
    yield takeLatest(GET_LOGIN_NONCE, getLoginNonce)
    yield takeLatest(LOGIN_USER, loginUser)
    yield takeLatest(GET_LOGGED_IN_USER, getLoggedInUser)
    yield takeLatest(GET_USER, getUser)
    yield takeLatest(GET_USERS, getUsers)
    yield takeLatest(CREATE_USER, createUser)
    yield takeLatest(UPDATE_USER, updateUser)
    yield takeLatest(FOLLOW_USER, followUser)
    yield takeLatest(UNFOLLOW_USER, unfollowUser)
}

export default usersSaga
