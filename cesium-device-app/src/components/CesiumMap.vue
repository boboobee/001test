<template>
  <div
    id="cesiumContainer"
    ref="cesiumContainer"
    style="width: 100%; height: 500px"
  ></div>
  <button @click="toggleView">切换2D/3D视图</button>
</template>
  
  <script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  data() {
    return {
      viewer: null,
      is3D: true,
    };
  },
  mounted() {
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZWIxOWVkNi0wNmVhLTQwNDEtODE4Ny02NTE0Y2YyNWZiZjkiLCJpZCI6MTM3NDA0LCJpYXQiOjE2ODM2NDEzNjN9.Ei9ndNnuCP9aK1kz5A04UetndSEDYJrNvh56hIcFB3g";

    // 初始化Cesium
    this.viewer = new Cesium.Viewer(this.$refs.cesiumContainer, {
      sceneMode: Cesium.SceneMode.SCENE3D,
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

    // 设置初始位置在经度0，纬度0，高度500米
    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        116.30014273942052,
        39.92958344773789,
        500
      ),
    });

    // 加载设备位置
    this.loadDeviceLocations();
  },
  methods: {
    toggleView() {
      this.is3D = !this.is3D;
      this.viewer.scene.mode = this.is3D
        ? Cesium.SceneMode.SCENE3D
        : Cesium.SceneMode.SCENE2D;
    },

    async loadDeviceLocations() {
      const response = await axios.get("http://localhost:3000/api/get-devices");
      const devices = response.data;

      devices.forEach((device) => {
        this.viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            device.longitude,
            device.latitude,
            device.elevation
          ),
          point: { pixelSize: 10, color: Cesium.Color.RED },
          label: {
            text: device.model,
            font: "14pt sans-serif",
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          },
        });
      });
    },
  },
};
</script>
  
  <style>
@import "cesium/Widgets/widgets.css";
</style>
  