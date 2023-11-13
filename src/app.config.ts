export default defineAppConfig({
  pages: ["pages/index/index", "pages/home/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    position: "bottom",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/home/index",
        text: "主页",
      },
    ],
  },
});
