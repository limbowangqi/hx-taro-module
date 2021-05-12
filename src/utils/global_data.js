import Taro from '@tarojs/taro';

/**
 * 临时缓存
 * @description app冷启动之后 会重置
 */
const globalData = {}
export function setGlobalData (key, val) {
  globalData[key] = val
}

export function getGlobalData (key) {
  return globalData[key]
}

/**
 * 磁盘缓存 
 * @description app卸载之后 会重置
 */
export function setStorage(key, value) {
  if (key) {
    Taro.setStorageSync(key, value)
  }
}
export function getStorage(key) {
  if (key) {
    return Taro.getStorageSync(key)
  }
}