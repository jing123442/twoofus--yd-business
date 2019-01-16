
export const formatSide = (sidelist, menuType) => {
  if (!sidelist) {
    return []
  }
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
      sideArr.push(temp)
    })
    return sideArr
  } else if (menuType === '2') {
    console.log(sidelist)
    sidelist.forEach(item => {
      let temp = {
        value: item.typeName,
        id: item.id,
        child: []
      }
      if (item.subType && item.subType.length > 0) {
        for (let i = 0; i < item.subType.length; i++) {
          temp.child[i] = {}
          temp.child[i].value = item.subType[i].typeName
          temp.child[i].id = item.subType[i].id
          if (item.subType[i].subChannel && item.subType[i].subChannel.length > 0) {
            let lastchild = []
            for (let j = 0; j < item.subType[i].subChannel.length; j++) {
              lastchild.push({
                value: item.subType[i].subChannel[j].channelName,
                id: item.subType[i].subChannel[j].channelTypeId,
                href: item.subType[i].subChannel[j].channelHtml
              })
            }
            temp.child[i].lastChild = lastchild
          }
        }
      }
      sideArr.push(temp)
    })
    console.log(sideArr, '))))))))')
    return sideArr
  }
}
