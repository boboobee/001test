<template>
  <div id="cesiumContainer"></div>
</template>

<script >
var Cesium = require("cesium/Cesium");
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZWIxOWVkNi0wNmVhLTQwNDEtODE4Ny02NTE0Y2YyNWZiZjkiLCJpZCI6MTM3NDA0LCJpYXQiOjE2ODM2NDEzNjN9.Ei9ndNnuCP9aK1kz5A04UetndSEDYJrNvh56hIcFB3g";
    var viewer = new Cesium.Viewer("cesiumContainer", {
      sceneModePicker: true, // 隐藏场景模式选择器
      baseLayerPicker: true, // 底图选择器
      timeline: false, // 隐藏时间线
      animation: false, // 隐藏动画控件
      fullscreenButton: false, // 隐藏全屏按钮
      vrButton: false, // 隐藏 VR 按钮
      infoBox: false, // 隐藏信息框
      selectionIndicator: false, // 隐藏选择指示器
      homeButton: false, // 隐藏主页按钮
      geocoder: false, // 隐藏地理编码器
      navigationHelpButton: false, // 隐藏导航帮助按钮
      navigationInstructionsInitiallyVisible: false, // 隐藏初始导航说明
      showRenderLoopErrors: false, // 隐藏渲染循环错误
      creditContainer: document.createElement("div"), // 隐藏 Cesium 的版权信息
    });

    // 设置视图到指定的位置

    const setView = () => {
      const destination = Cesium.Cartesian3.fromDegrees(
        116.30014273942052,
        39.92958344773789,
        500
      );

      viewer.camera.setView({
        destination: destination,
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-90.0),
          roll: 0.0,
        },
      });
    };

    // Initial view setting
    setView();

    // Add event listener for mode change
    viewer.scene.modeChanged.addEventListener(() => {
      if (viewer.scene.mode === Cesium.SceneMode.SCENE2D) {
        // Change to 2D mode and set view
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(
            116.30014273942052,
            39.92958344773789,
            0
          ), // Z值设置为0
          orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(0.0), // 在2D模式下，pitch和roll都可以设为0
            roll: 0.0,
          },
        });
      }
    });

    // 设置视图到指定的位置,代码结束，但是目前只能完成初始的视图切换，点击切换之后位置会失效
  },
};
</script>





<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100%; /* 确保 html 和 body 占满百分之百的高度 */
  margin: 0; /* 去掉默认的 margin */
  padding: 0; /* 去掉默认的 padding */
}

#cesiumContainer {
  position: absolute; /* 让容器绝对定位 */
  top: 0; /* 从顶部开始 */
  left: 0; /* 从左侧开始 */
  right: 0; /* 伸展到右侧 */
  bottom: 0; /* 伸展到底部 */
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
