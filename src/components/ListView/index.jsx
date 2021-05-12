import { useState, useEffect, useRef } from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import sloganIcon from "../../assets/slogan.png";
import sloganActiveIcon from "../../assets/slogan-active.gif";
import "./index.scss";
import PropTypes from "prop-types";

export default function ListView({
  className,
  enableRefresh,
  enableLoadMore,
  height,
  scrollViewStyle,
  onLoadMore,
  onRefresh,
  sloganStyle,
  children,
  bottomNoticevisible,
  bottomNoticeText = "- 我是有底线的 -",
  scrollTop,
  onScroll,
}) {
  const [refresherTriggered, setRefresherTriggered] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  var _freshing = false;

  function onScrollToLower() {
    if (enableLoadMore) {
      setIsLoadMore(true);
      onLoadMore(closeLoadMore);
    }
  }

  function closeLoadMore() {
    setIsLoadMore(false);
  }

  function onRefresherRefresh() {
    if (_freshing) return;
    _freshing = true;
    setRefresherTriggered(true);
    if (!!onRefresh) {
      onRefresh(closeRefresh);
    }
  }

  function closeRefresh() {
    setTimeout(() => {
      setRefresherTriggered(false);
      _freshing = false;
    }, 500);
  }

  function onScrollListener(e) {
    if (!!onScroll) {
      onScroll(e);
    }
  }

  return (
    <ScrollView
      className={className}
      scrollY={true}
      refresherEnabled={enableRefresh}
      enableBackToTop
      refresherThreshold={60}
      style={{ height: height, backgroundColor: "#ffffff", ...scrollViewStyle }}
      // onRefresherPulling={onPulling}
      onRefresherRefresh={onRefresherRefresh}
      refresherTriggered={refresherTriggered}
      onScrollToLower={onScrollToLower}
      scrollTop={scrollTop}
      onScroll={onScrollListener}
    >
      <View className="refresh-body-view">
        <View
          style={sloganStyle}
          className={`refresh-icon-view ${refresherTriggered ? "loading" : ""}`}
        >
          <Image
            className={`refresh-icon ${refresherTriggered ? "loading" : ""}`}
            src={refresherTriggered ? sloganActiveIcon : sloganIcon}
          ></Image>
        </View>
        {children}
      </View>
      <View className="foot-text">
        <View className="text">
          {isLoadMore
            ? "加载中..."
            : bottomNoticevisible
            ? bottomNoticeText
            : ""}
        </View>
      </View>
    </ScrollView>
  );
}
ListView.propTypes = {
  enableRefresh: PropTypes.bool, //启用下拉刷新
  enableLoadMore: PropTypes.bool, //启用上拉加载更多
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //列表高度
  scrollViewStyle: PropTypes.object, //列表样式
  onLoadMore: PropTypes.func, //加载更多函数
  onRefresh: PropTypes.func, //下拉刷新函数
  sloganStyle: PropTypes.object, //solgan样式
  children: PropTypes.node, //列表内容
  bottomNoticevisible: PropTypes.bool, //数据全部加载完成之后是否显示底部提示
};

ListView.defaultProps = {
  enableRefresh: false,
  enableLoadMore: false,
  bottomNoticevisible: false,
};
