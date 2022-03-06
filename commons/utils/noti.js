import dayjs from "dayjs";
import * as Notification from "expo-notifications";
import { Platform } from "react-native";

export async function getNotificationPermission() {
  const { status: existingStatus } = await Notification.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notification.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Enable notifications to use the app");
    return;
  }

  if (Platform.OS === "android") {
    Notification.setNotificationChannelAsync("main", {
      name: "main",
      importance: Notification.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F8C",
    });

    Notification.setNotificationChannelAsync("task", {
      name: "task",
      importance: Notification.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
}

export async function cancelScheduledNotification(identifier) {
  await Notification.cancelScheduledNotificationAsync(identifier);
}

function setTimeToSecond(date) {
  return dayjs(date).second(0).millisecond(0).valueOf();
}

export async function triggerNotificationHandler(option) {
  const { identifier, body, date, repeatType, channelId } = option;

  const weekday = dayjs(date).day() + 1;
  const month = dayjs(date).month() + 1;
  const day = dayjs(date).date();
  const hour = dayjs(date).hour();
  const minute = dayjs(date).minute();

  let trigger;
  switch (repeatType) {
    case "0": {
      const difference = setTimeToSecond(date) - setTimeToSecond(new Date());
      trigger = {
        channelId,
        seconds: difference / 1000,
        repeats: false,
      };

      break;
    }
    case "1": {
      trigger = {
        channelId,
        hour: hour || date.hour,
        minute: minute || date.minute,
        repeats: true,
      };

      break;
    }
    case "2": {
      trigger = {
        channelId,
        weekday,
        hour,
        minute,
        repeats: true,
      };
      break;
    }
    case "3": {
      trigger = {
        channelId,
        month,
        day,
        hour,
        repeats: true,
      };

      break;
    }
    default:
  }

  await Notification.scheduleNotificationAsync({
    identifier,
    content: {
      title: "깜빡!",
      body: `${body} 할 시간입니다!`,
    },
    trigger,
  });
}
