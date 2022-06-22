import {
    GET_LOGIN_NONCE,
    STORE_LOGIN_NONCE,
    LOGIN_USER,
    GET_USER,
    GET_USERS,
    STORE_USER,
    STORE_USERS,
    CREATE_USER,
    UPDATE_USER,
    GET_LOGGED_IN_USER,
    STORE_LOGGED_IN_USER,
    FOLLOW_USER,
    UNFOLLOW_USER,
} from "../constants/users";

// Login
export const getLoginNonce = (wallet_address) => ({
    type: GET_LOGIN_NONCE,
    wallet_address
})
export const storeLoginNonce = (nonce) => ({
    type: STORE_LOGIN_NONCE,
    nonce
})
export const loginUser = (wallet_address, signedNonce, redirectWindow) => ({
    type: LOGIN_USER,
    wallet_address,
    signedNonce,
    redirectWindow
})

export const getUser = (wallet_address) => ({
    type: GET_USER,
    wallet_address
})
export const storeUser = (user) => ({
    type: STORE_USER,
    user
})

export const getUsers = () => ({
    type: GET_USERS
})

export const storeUsers = (users) => ({
    type: STORE_USERS,
    users
})

export const getLoggedInUser = () => ({
    type: GET_LOGGED_IN_USER
})
export const storeLoggedInUser = (loggedInUser) => ({
    type: STORE_LOGGED_IN_USER,
    loggedInUser
})

export const createUser = (user, redirectWindow) => ({
    type: CREATE_USER,
    user,
    redirectWindow
})

export const updateUser = (wallet_address, updatedUser, redirectWindow) => ({
    type: UPDATE_USER,
    wallet_address,
    updatedUser,
    redirectWindow
})

export const followUser = (wallet_address_to_follow, redirectWindow) => ({
    type: FOLLOW_USER,
    wallet_address_to_follow,
    redirectWindow
})
export const unfollowUser = (wallet_address_to_unfollow, redirectWindow) => ({
    type: UNFOLLOW_USER,
    wallet_address_to_unfollow,
    redirectWindow
})