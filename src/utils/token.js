import Cookies from 'js-cookie'
const TokenKey = 'Hm-yd-token'
const SideBar = 'Hm-yd-side'
const AppId = 'Hm-yd-appid'
const staffCode = 'Hm-yd-staffcode'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getSide () {
  return Cookies.get(SideBar)
}

export function setSide (list) {
  return Cookies.set(SideBar, list)
}

export function removeSide () {
  return Cookies.remove(SideBar)
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
