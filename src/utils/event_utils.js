/**
 * 事件中心
 */
import Taro, { Component, useState, useEffect, useDidHide } from "@tarojs/taro";

export function withEventTrigger(...eventNames) {
  return (WrappedComponent) => {
    return class extends WrappedComponent {
      componentDidMount() {
        // 订阅登录登出动作
        eventNames &&
          eventNames.forEach((name) => {
            Taro.eventCenter.on(name, this.onEvnetChange.bind(this, name));
          });
        if (!!super.componentDidMount) {
          super.componentDidMount();
        }
      }

      onEvnetChange = (name, data) => {
        !!super.onEvnetChange && super.onEvnetChange(name, data);
      };

      componentWillUnmount() {
        eventNames &&
          eventNames.forEach((name) => {
            Taro.eventCenter.off(name, this.onEvnetChange.bind(this, name));
          });
        if (!!super.componentWillUnmount) {
          super.componentWillUnmount();
        }
      }
    };
  };
}
/**
 * 试用于function
 * @param WrappedComponent
 */
 export function useEventTrigger(eventName, onEventChange, depends) {

  useEffect(() => {
    const bindChange = (res) => {
      if (!!onEventChange) {
        onEventChange(res);
      }
    };

    Taro.eventCenter.on(eventName, bindChange);
    return () => {
      Taro.eventCenter.off(eventName, bindChange);
    };
  }, depends||[]);
}