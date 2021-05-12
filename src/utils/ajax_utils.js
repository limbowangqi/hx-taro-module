/**
 * @author sl
 * @description 网络请求
 */
import Taro from "@tarojs/taro";
import { BASE_API } from "./api_constants";
import { HTTP_STATUS } from "./config";
import UserManager from "./user_manager";

/**
 *
 * @param {*} url 接口
 * @param {*} data 入参
 * @param {*} isShowLoading 是否展示loading
 */
export function get(url, data, isShowLoading = false) {
  let option = {
    url,
    data,
    isShowLoading,
  };

  return baseOptions(option);
}

export function post(
  url,
  data,
  contentType = "application/json",
  isShowLoading = false
) {
  let params = {
    url,
    data,
    contentType,
    isShowLoading,
  };
  return baseOptions(params, "POST");
}

export function postj(url, data, isShowLoading = false) {
  let params = {
    url,
    data,
    contentType: "application/json",
    isShowLoading,
  };
  return baseOptions(params, "POST");
}

export function uploadFile(url, filePaths, data, isShowLoading = true) {
  let params = {
    url,
    filePaths,
    data,
    isShowLoading,
  };
  return uploadOptions(params);
}

function uploadOptions(params) {
  let { url, data, filePaths, isShowLoading } = params;
  //弹框
  if (isShowLoading) {
    Taro.showLoading({
      title: "加载中...",
      mask: true,
    });
  }
  let errMsg;
  return new Promise((resolve, reject) => {
    let resImgsData = {
      data: [],
      msg: "成功",
      code: "SUCCESS",
      success: true,
    };
    let imgFilePaths = [...filePaths];
    let uploadImg = () => {
      if (!imgFilePaths.length) {
        resolve(resImgsData);
      } else {
        let currentFilePath = imgFilePaths.pop();
        let token = UserManager.getToken();
        const option = {
          url: BASE_API + url,
          formData: data,
          name: "files",
          filePath: currentFilePath,
          header: {
            loginToken: token||'',
            wechatType: "zhYWechatMini",
          },
          success: (res) => {
            if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
              errMsg = "请求资源不存在";
            } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
              errMsg = "服务器异常";
            } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
              errMsg = "没有权限访问";
            } else if (res.statusCode === HTTP_STATUS.TOO_LARGE) {
              errMsg = "图片过大";
            } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
              //请求成功
              let resData;
              if (typeof res.data === "string") {
                resData = JSON.parse(res.data);
              } else {
                resData = res.data;
              }
              if (resData.success) {
                //do something
                resImgsData = {
                  ...resImgsData,
                  data: resImgsData.data.concat(resData.data || []),
                };
              } else {
                errMsg = resData.msg;
              }
            }
            uploadImg();
          },
          error: (e) => {
            uploadImg();
          },
        };
        Taro.uploadFile(option);
      }
    };
    uploadImg();
  }).then((data) => {
    if (isShowLoading) {
      Taro.hideLoading();
    }
    errMsg && Taro.showToast({ title: errMsg, icon: "none" });
    return data;
  });
}

function baseOptions(params, method = "GET") {
  let { url, data } = params;
  let contentType = "application/x-www-form-urlencoded";
  contentType = params.contentType || contentType;
  const option = {
    isShowLoading: params.isShowLoading || false,
    loadingText: "正在加载",
    url: BASE_API + url,
    data: data,
    method: method,
    header: { "content-type": contentType },
  };
  return Taro.request(option);
}
