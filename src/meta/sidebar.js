// import { getSide } from '@/utils/token'
// const staticBar = [
//   {
//     key: 'home',
//     ico: 'home',
//     value: '主页面板'
//   },
//   {
//     key: 'site',
//     ico: 'web',
//     value: '网站管理',
//     child: [
//       {
//         key: 'nlist',
//         ico: 'notice',
//         value: '公告管理'
//       }
//     ]
//   }
//   // {
//   //   key: 'mess',
//   //   ico: 'rizhi',
//   //   value: '信息管理',
//   //   children: []
//   // }
// ]

export const formatSide = (sidelist, menuType) => {
  if (!sidelist) {
    return []
  }
  console.log(menuType)
  // let sideList = JSON.parse(getSide())
  let sideArr = []
  if (menuType === '1') {
    sidelist.forEach(item => {
      let temp = {
        value: item.name,
        id: item.id,
        child: []
      }
      if (item.children && item.children.length > 0) {
        item.children.forEach(chil => {
          temp.child.push({
            key: chil.href,
            ico: chil.icon,
            value: chil.name,
            id: item.id,
            child: []
          })
        })
      }
      console.log(temp, '当前的temp----1')
      sideArr.push(temp)
    })
    return sideArr
  } else if (menuType === '2') {
    sidelist.forEach(item => {
      let temp = {
        value: item.typeName,
        id: item.id,
        child: []
      }
      if (item.subType && item.subType.length > 0) {
        item.subType.forEach(middle => {
          temp.child.push({
            value: middle.typeName,
            id: middle.id,
            child: []
          })
        })
        if (item.subType.subChannel && item.subType.subChannel > 0) {
          item.subType.subChannel.forEach(chi => {
            temp.child.child.push({
              value: chi.channelName,
              id: chi.channelId,
              key: chi.channelHtml
            })
          })
        }
      }
      sideArr.push(temp)
      console.log(temp, '当前的temp----1')
    })
  }
  return sideArr
}
