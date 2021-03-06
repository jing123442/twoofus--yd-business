import Cookies from 'js-cookie'
const TokenKey = 'Hm-yd-token'
const AppId = 'Hm-yd-appid'
const staffCode = 'Hm-yd-staffcode'
const UserName = 'Hm-yd-username'
const PassWord = 'Hm-yd-password'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getAppId () {
  return Cookies.get(AppId)
}

export function setAppId (appId) {
  return Cookies.set(AppId, appId)
}

export function setStaffCode (staffcode) {
  return Cookies.set(staffCode, staffcode)
}

export function getStaffCode () {
  return Cookies.get(staffCode)
}

export function setUserName (name) {
  return Cookies.set(UserName, name)
}

export function getUserName () {
  return Cookies.get(UserName)
}

export function setPassWord (password) {
  return Cookies.set(PassWord, password)
}

export function getPassWord () {
  return Cookies.get(PassWord)
}
