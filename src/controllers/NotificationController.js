/**
 * Knacks App
 * @author: Schemaphic Systems
 */

import React from 'react';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { getData, storeData } from "../utils/Util";
import Emitter from '../utils/Emitter';
import * as Events from '../configs/Events';
import GlobalConfigs from '../configs/GlobalConfigs';


const showNotification = (notification, data) => {
  PushNotification.localNotification(
    {
      id: notification.messageId,
      channelId: "knack-default-channel-id",
      title: notification.title,
      message: notification.body,
      bigPictureUrl: notification.imageUrl,
      picture: notification.imageUrl,
      bigLargeIconUrl: notification.imageUrl,
      priority: "high",
      vibrate: true,
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      playSound: true,
      soundName: "default",
      userInfo: data,
      foreground: true,
      actions: data.action == "A5" ? ['Accept', 'Decline'] : [],
      invokeApp: data.action == "A5" ? false : true,
    });
}

export default class NotificationController extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      notification: null,
    }
  }

  componentDidMount = async () => {
    

    let getNotification = await getData("notification");
   
    this.setState({
      notification: getNotification,
    })

    this.setupPushConfiguration();
  }

  setupPushConfiguration = async () => {
    PushNotification.configure(
      {
        onNotification: function (notification) {
          // console.log("PushNotification.onNotification > NOTIFICATION:....", notification);
          /* if (notification.userInteraction) {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
            Emitter.emit(Events.SHOW_NOTIFICATION, { notification });
          } */
          if (notification) {
            console.log("Q2");
            Emitter.emit(Events.SHOW_NOTIFICATION, { notification });
          }
        },

        onAction: function (notification) {
          // if (notification.action == "Accept") {
          //   console.log("onAction > ACTION", notification, notification.action);
          // }
          Emitter.emit(Events.ACTION_NOTIFICATION, { notification });
          //console.log("onAction > ACTION - debasis : ", notification, notification.action);
        },
        
        onRegistrationError: function (err) {
          console.error(err.message, err);
        },

        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        
        popInitialNotification: true,
        requestPermissions: true,
      });

    PushNotification.createChannel(
      {
        channelId: "knack-default-channel-id",
        channelName: "knack default channel",
        channelDescription: "A channel to categorise your notifications",
        playSound: true,
        soundName: "default",
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );


    messaging().getToken(firebase.app().options.messagingSenderId)
      .then((result) => {
        storeData("deviceToken", result);
        // console.log("DeviceToken : " + result);
      })
      .catch(e => console.log("GET TOKEN ERROR :" + e));

    messaging().onMessage(async remoteMessage => {
     
      if (Platform.OS == 'ios') {
        PushNotificationIOS.requestPermissions().then(() =>
          showNotification(remoteMessage.notification, remoteMessage.data),
        );
      } else {
        
        if (GlobalConfigs.FOCUS_NOTIFICATION_SCREEN == true ) {
          // Emitter.emit(Events.WITHOUT_ACTION_NOTIFICATION, { remoteMessage });
          
        } else {
          // Emitter.emit(Events.WITHOUT_ACTION_NOTIFICATION, { remoteMessage });
          showNotification(remoteMessage.notification, remoteMessage.data);
        }
      } 
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      //console.log('Message handled in the background!', JSON.stringify(remoteMessage));
      if (Platform.OS == 'ios') {
        PushNotificationIOS.requestPermissions().then(() =>
          showNotification(remoteMessage.notification, remoteMessage.data),
        );
      } else {
        console.log("setBackgroundMessageHandler > NOTIFICATION:", remoteMessage.notification);
        showNotification(remoteMessage.notification, remoteMessage.data);
      }
    });
  }

  render() {
    return (
      null
    );
  }
};