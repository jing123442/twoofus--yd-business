import moment from 'moment'

const FilterTime = (value, format = 'YYYY-MM-DD') => {
  let momentObj = moment(value)
  if (value && momentObj['_isValid']) {
    return momentObj.format(format)
  }
  return value
}

export default {
  FilterTime
}
