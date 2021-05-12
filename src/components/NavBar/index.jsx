import { View } from "@tarojs/components";
import PropTypes from "prop-types";
import { getNavHeight } from "../../utils/display_utils";

import "./index.scss";

const imgBack = 'https://static.aistarfish.com/front-release/file/F2021032217051714600002793.icon_back.png';
const imgHome = 'https://static.aistarfish.com/front-release/file/F2021032217051714100006084.icon_home.png'
export default function NavBar({
  title,
  backvisible,
  customVisable,
  customRender,
  onCustomClick,
}) {
  function handleBackClick() {
    Taro.navigateBack();
  }

  function handleHomeClick() {
    Taro.redirectTo({ url: "/pages/index/index" });
  }

  return (
    <View className="contain-nav-bar" style={{ height: `${getNavHeight()}PX` }}>
      {backvisible && (
        <View
          className="left-icon"
          onClick={handleBackClick}
        >
          <Image
            className="img-back"
            mode="scaleToFill"
            src={imgBack}
          />
        </View>
      )}
      {(customVisable || customRender) && <View className="title-line" />}
      {(customVisable || customRender) && (
        <View
          className="custom-icon"
          onClick={!!onCustomClick ? onCustomClick : handleHomeClick}
        >
          {!!customRender ? (
            customRender
          ) : (
            <Image className="img-home" src={imgHome} />
          )}
        </View>
      )}
      <View className="title-text">{title}</View>
    </View>
  );
}

NavBar.propTypes = {
  title: PropTypes.string, //导航栏标题
  backvisible: PropTypes.bool, //是否展示返回按钮
  customVisable: PropTypes.bool, //是否展示 自定义view
  customRender: PropTypes.node, //自定义view
  onCustomClick: PropTypes.func, //自定义view 点击操作
};

NavBar.defaultProps = {
  backvisible: true,
  customVisable: true,
};
