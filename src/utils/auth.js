/**
 * 
 * @param {array} auth 路由权限
 * @param {array} powers 用户权限
 */
export let check = (auth, powers) => {
  return !!auth.find(item => {
    return powers.includes(item);
  });
}