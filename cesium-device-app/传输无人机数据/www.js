#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app               =     require('../app');
var debug             =     require('debug')('UVA:server');
var server            =     require("http").Server(app);
var RealTime          =     require("../models/RealTime");
var UAVdata           =     require("../models/UAVdata");


var MissionPolygon    =     require("../models/MissionPolygon");
var fs                =     require('fs');
var mqtt              =     require("mqtt");
var net               =     require("net");
var tempor            =     [];
var arrlength         =     0;
var WebSocket         =     require('ws');
//io请求引包
var socketIo          =     require('socket.io');
var soc               =     socketIo(server);
var socUAV            =     soc.of('/UAV');
var socMissionPolygon =     soc.of('/MissionPolygon');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8002');
app.set('port', port);

/**
 * Create HTTP server.
 */
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


RealTime.find(function (err,result) {
   arrlength = result.length;

   for(let i = 0; i<result.length; i++){
       var arrTempor = [
           result[i].Point,
           result[i].longitude,
           result[i].latitude
       ];
       tempor.push(arrTempor);
   };
   //arr.push(tempor);
})

//无人机mqtt设置
const clientUAV1  = mqtt.connect('mqtts://sbbb2480.ala.cn-hangzhou.emqxsl.cn:8883',{
        username: "user",
        password: '123456' 
});
clientUAV1.on("connect", function() {
  console.log("MQTT服务器clientUAV连接成功");
  //console.log(client.options.clientId);
  clientUAV1.subscribe("CNU/UAV/Message", { qos: 1 }); // 订阅text消息
});
const clientUAV2 = mqtt.connect('mqtt://8.140.245.181',{
        username: "uav2",
        password: '123456' 
});
clientUAV2.on("connect", function() {
  console.log("MQTT服务器clientUGV1连接成功");
  //console.log(client.options.clientId);
  clientUAV2.subscribe("CNU/UGV1/Message", { qos: 1 }); // 订阅text消息
});



//接收无人机位姿消息消息
clientUAV1.on("message", function(top, message) {
  //console.log("UAVmessage");
  // console.log(message);
  console.log(message.toString());
  var array = message.toString().split(',');
  array[8] = 0;
  //设备ID
  array[6] = 0;
  //设备类型
  array[7] = 0;
  //数据入库
  UAVdata.create({
      longitude: array[0],
      latitude: array[1],
      height: array[2],
      Heading: array[3],
      Pitch: array[4],
      Roll:array[5],
      EquipmentName:array[6],
      speed:array[8]
    });
  
});



