import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'MobileFlashcards::Notifications';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Mobile Flashcards',
        body: `Don't forget to take a quiz today!`,
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted' || status == 'undetermined') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let tommorow = new Date();
                            tommorow.setDate(tommorow.getDate());
                            tommorow.setHours(19);
                            tommorow.setMinutes(58);
                            tommorow.setho
                            Notifications.scheduleLocalNotificationAsync(createNotification(),
                            {
                                time: tommorow,
                                repeat: 'day'
                            })
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    })
            }
        })
}