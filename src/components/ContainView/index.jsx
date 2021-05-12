import { useEffect, useState } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  getSafeBottomHeight,
  getSafeTopHeight,
} from "../../utils/display_utils";
import PropTypes from "prop-types";

import "./index.scss";
import UserManager from "../../utils/user_manager";

export default function ContainView({
  style,
  height = "100vh",
  hideSafeTop,
  hideSafeBottom,
  children,
}) {
  return (
    <View
      className={`contain-content-view`}
      style={{ height: height, ...style }}
      onTouchMove={(ev) => {
        ev.stopPropagation();
      }}
    >
      {!hideSafeTop && <View style={{ height: getSafeTopHeight() + "PX" }} />}

      {children}

      {!hideSafeBottom && (
        <View style={{ height: getSafeBottomHeight() + "PX" }} />
      )}
    </View>
  );
}
ContainView.propTypes = {
  /**
   * 是否隐藏顶部安全区域
   */
  hideSafeTop: PropTypes.bool,
  /**
   * 是否隐藏底部安全区域
   */
  hideSafeBottom: PropTypes.bool,
};

ContainView.defaultProps = {
  hideSafeTop: false,
  hideSafeBottom: false,
};
