import { View,Navigator } from "@tarojs/components";
import PropTypes from "prop-types";
import { getNavHeight } from "../../utils/display_utils";
import imgClose from "../../images/icon_close_black.png";

import "./index.scss";

export default function NavBar({ title }) {
  return (
    <View className="contain-nav-bar" style={{ height: `${getNavHeight()}PX` }}>
      <Navigator className="left-icon" openType='exit' target="miniProgram">
        <Image className="img-back" mode="scaleToFill" src={imgClose} />
      </Navigator>

      <View className="title-text">{title}</View>
    </View>
  );
}
