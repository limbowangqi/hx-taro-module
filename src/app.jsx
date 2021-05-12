import Taro, { Component, Config } from "@tarojs/taro";
import Index from "./pages/index/index";
import {
  setScreenWidth,
  setScreenHeight,
  setSafeBottomHeight,
  setSafeTopHeight,
} from "./utils/display_utils";
import UserManager from "./utils/user_manager";

import "./app.scss";

/**
 * 初始化 屏幕数据
 */
(function initDisplay() {
  const res = Taro.getSystemInfoSync();
  if (res) {
    setSafeTopHeight(res.statusBarHeight);
    setScreenWidth(res.screenWidth);
    setScreenHeight(res.screenHeight);
    setSafeBottomHeight(res.statusBarHeight >= 44 ? 34 : 0);
  }
})();

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  componentDidMount() {
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    pages: ["pages/index/index"],
    // //分包
    // subPackages: [
    //   {
    //     root: "packages/treat",
    //     pages: [
    //       "report-upload/index",
    //       "report-detail/index",
    //       "join-period/index",
    //     ],
    //   },
    //   {
    //     root: "packages/user",
    //     pages: [
    //       "login/index",
    //       "relation-choose/index",
    //       "info-upload/index",
    //       "info-detail/index",
    //       "warn-page/index",
    //     ],
    //   },
    // ],
    window: {
      // navigationStyle: "custom",
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black",
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
