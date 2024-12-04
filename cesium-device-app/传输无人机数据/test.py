#!/usr/bin/env python3

import rospy
import paho.mqtt.publish as mqtt_publish
from sensor_msgs.msg import Imu
from std_msgs.msg import Int32MultiArray

def mqtt_publish_array_data(data):

    # MQTT Broker的地址和端口
    # mqtt_url = "mqtt://broker.emqx.io:1883"

    # broker_address = "broker.emqx.io"
    # broker_port = 1883

    broker_address = "8.140.245.181"
    broker_port = 1883

    mqtt_username = "user"
    mqtt_password = "123456"

    # broker_address = "dfdae71b.cn-shenzhen.emqx.cloud"
    # broker_port = 15473

    # mqtt_username = "JACK"
    # mqtt_password = "981001"

    # MQTT主题
    mqtt_topic = "CNU/UAV/Message"

    # 将数组数据转换为字符串
    data_str = ",".join(str(value) for value in data)

    # 使用paho.mqtt.publish库发布消息
    # mqtt_publish.single(mqtt_topic, payload=data_str, hostname=mqtt_url)

    # mqtt_publish.single(mqtt_topic, payload=data_str, hostname=broker_address, port=broker_port)

    mqtt_publish.single(mqtt_topic, payload=data_str, hostname=broker_address, port=broker_port, auth={'username': mqtt_username, 'password': mqtt_password})

def imu_callback(msg):
    # 接收到sensor_msgs/NavSatFix类型消息时的回调函数
        # 114.35582251742187，30.527481060627323
    # base_longitude = -114.350297888847 + 114.35582251742187
    # base_latitude = -30.529692727747 + 30.527481060627323

    latitude = msg.linear_acceleration.x
    longitude = msg.linear_acceleration.y 
    altitude = msg.linear_acceleration.z

    current_time = rospy.Time.now().to_sec()

    Heading = 0
    Pitch = 0
    Roll = 0

    # 打印输出变量值和时间
    print(f"Time: {current_time}, Latitude: {latitude}, Longitude: {longitude}, Altitude: {altitude}")

    # 将经纬度和高度放在数组中
    # array_data = [longitude + base_longitude,latitude + base_latitude, altitude, Heading, Pitch, Roll]
    array_data = [longitude ,latitude, altitude, Heading, Pitch, Roll]

    # 发布数组数据到MQTT
    mqtt_publish_array_data(array_data)

def mqtt_array_publisher():
    # 初始化ROS节点
    rospy.init_node('mqtt_array_publisher', anonymous=True)

    # 创建一个订阅者，订阅类型为sensor_msgs/NavSatFix的消息，主题为 "navsatfix_topic"
    rospy.Subscriber('/imu', Imu, imu_callback)

    # 循环运行ROS节点
    rospy.spin()

if __name__ == '__main__':
    try:
        # 运行MQTT发布器
        mqtt_array_publisher()
    except rospy.ROSInterruptException:
        pass
