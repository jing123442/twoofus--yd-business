import { getSide } from '@/utils/token'
const staticBar = [
  {
    key: 'home',
    ico: 'home',
    value: '主页面板'
  },
  {
    key: 'site',
    ico: 'web',
    value: '网站管理',
    child: [
      {
        key: 'nlist',
        ico: 'notice',
        value: '公告管理'
      }
    ]
  }
  // {
  //   key: 'mess',
  //   ico: 'rizhi',
  //   value: '信息管理',
  //   children: []
  // }
]
const async = false
const formatSide = () => {
  if (!getSide()) {
    return []
  }
  let sideList = JSON.parse(getSide())
  let sideArr = []
  sideList.forEach(item => {
    let temp = {
      key: item.href,
      ico: item.icon,
      value: item.name,
      child: []
    }
    if (item.children && item.children.length > 0) {
      item.children.forEach(chil => {
        temp.child.push({
          key: chil.href,
          ico: chil.icon,
          value: chil.name,
          child: []
        })
      })
    }
    sideArr.push(temp)
  })
  // console.log(sideArr)
  return sideArr
}
// formatSide()
const sideBar = {
  mainbar() {
    return async ? formatSide() : staticBar
  }
}
// console.log(sideBar)
export default sideBar
