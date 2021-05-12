/**
 * @author sl
 * @description 屏幕相关的数据
 */

import { getGlobalData, setGlobalData } from "./global_data";

/**
 * 获取安全区域高度
 * 去掉navBar区域和top、bottom安全区域
 */
export function getSafeHeightWithoutNav() {
  return getSafeTopHeight() + getSafeBottomHeight() + 44;
}

/**
 * 屏幕顶部安全区域
 */
export function getNavHeight() {
  return 44;
}

/**
 * 屏幕顶部安全区域
 */
export function getSafeTopHeight() {
  return getGlobalData("safeTopHeight") || 44;
}

export function setSafeTopHeight(val) {
  setGlobalData("safeTopHeight", val);
}

/**
 * 屏幕宽度
 */
export function getScreenWidth() {
  return getGlobalData("screenWidth");
}

export function setScreenWidth(val) {
  setGlobalData("screenWidth", val);
}

/**
 * 屏幕高度
 */
export function getScreenHeight() {
  return getGlobalData("screenHeight");
}

export function setScreenHeight(val) {
  setGlobalData("screenHeight", val);
}

/**
 * 屏幕底部安全区域
 */
export function getSafeBottomHeight() {
  return getGlobalData("safeAreaHeight");
}

export function setSafeBottomHeight(val) {
  setGlobalData("safeAreaHeight", val);
}
