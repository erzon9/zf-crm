/**
 * 将内容保存到 localStorage 中
 * 
 * @param {string} name 存内容的建
 * @param {any} content 要存的内容
 */
export let ut_store = function (name, content) {
  try {
    let data = {
      time: Date.now(),
      content
    }
    localStorage.setItem(name, JSON.stringify(data));
  } catch (e) {
    console.log(`无法保存内容 ${name} 到本地:${e.message}`);
  }
}

/**
 * 根据有效期判断是否获取内容
 * 
 * @param {string} name 获取的内容的名称 
 * @param {number} shelfLife 有效期
 */
export let ut_pick = function (name, shelfLife = 60 * 1000) {
  try {
    let data = localStorage.getItem(name);
    if (!data) return null;
    let {time, content} = JSON.parse(data);
    let now = Data.now();
    if (now - time > shelfLife) {
      return null;
    } 
    return content;
  } catch (e) {
    return null;
    console.log(`获取内容 ${name} 失败：${e.message}`);
  }
}