<template>
    <div id="app">
      <div id="cesiumContainer" ref="cesiumContainer"></div>
    </div>
  </template>
  
  <script>
  import ROSLIB from 'roslib';
  import Cesium from 'cesium/Cesium';
  
  export default {
    data() {
      return {
        ros: null,
        viewer: null
      };
    },
  
    mounted() {
      this.initializeViewer();
      this.initializeROS();
    },
  
    methods: {
      initializeViewer() {
        this.viewer = new Cesium.Viewer(this.$refs.cesiumContainer, {
          // 初始化Cesium Viewer 的选项
        });
      },
  
      initializeROS() {
        this.ros = new ROSLIB.Ros({
          url: 'ws://localhost:9090' // 替换为你的ROS WebSocket服务器地址
        });
  
        this.ros.on('connection', () => {
          console.log('Connected to ROS.');
        });
  
        this.ros.on('error', (error) => {
          console.error('Error connecting to ROS: ', error);
        });
  
        this.ros.on('close', () => {
          console.log('Connection to ROS closed.');
        });
  
        // 订阅主题
        const droneTopic = new ROSLIB.Topic({
          ros: this.ros,
          name: '/drone_data', // 替换为你的无人机主题
          messageType: 'sensor_msgs/Imu' // 替换为实际的消息类型
        });
  
        droneTopic.subscribe((message) => {
          console.log('Received drone data: ', message);
          this.handleDroneData(message);
        });
  
        const roverTopic = new ROSLIB.Topic({
          ros: this.ros,
          name: '/rover_data', // 替换为你的无人车主题
          messageType: 'nav_msgs/Odometry' // 替换为实际的消息类型
        });
  
        roverTopic.subscribe((message) => {
          console.log('Received rover data: ', message);
          this.handleRoverData(message);
        });
      },
  
      handleDroneData(message) {
        const dronePosition = Cesium.Cartesian3.fromDegrees(message.longitude, message.latitude, message.altitude);
        this.addOrUpdateEntity('drone', dronePosition, '无人机');
      },
  
      handleRoverData(message) {
        const roverPosition = Cesium.Cartesian3.fromDegrees(message.longitude, message.latitude, message.altitude);
        this.addOrUpdateEntity('rover', roverPosition, '无人车');
      },
  
      addOrUpdateEntity(id, position, label) {
        let entity = this.viewer.entities.getById(id);
        if (entity) {
          entity.position = position;
        } else {
          entity = this.viewer.entities.add({
            id: id,
            position: position,
            point: {
              pixelSize: 10,
              color: Cesium.Color.RED,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 2,
            },
            label: {
              text: label,
              font: '14pt monospace',
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 2,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -9),
            },
          });
        }
      }
    }
  };
  </script>
  