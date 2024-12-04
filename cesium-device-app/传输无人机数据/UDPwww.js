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
var dgram             =     require('dgram'); // 引入dgram模块
var net               =     require("net");
var tempor            =     [];
var arrlength         =     0;
var WebSocket         =     require('ws');
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
})

// 创建UDP服务器
const udpServer = dgram.createSocket('udp4');

// 当接收到消息时
udpServer.on('message', function (message, rinfo) {
    console.log(`接收到来自 ${rinfo.address}:${rinfo.port} 的消息: ${message}`);
    var array = message.toString().split(',');
    array[8] = 0;
    array[6] = 0;  // 设备ID
    array[7] = 0;  // 设备类型

    // 数据入库
    UAVdata.create({
        longitude: array[0],
        latitude: array[1],
        height: array[2],
        Heading: array[3],
        Pitch: array[4],
        Roll: array[5],
        EquipmentName: array[6],
        speed: array[8]
    });
});

// UDP服务器监听端口
udpServer.bind(41234, () => {
    console.log('UDP服务器已启动并监听端口 41234');
});
