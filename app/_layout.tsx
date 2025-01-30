import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    presentationOptions: ['alert', 'sound'],
  }),
});

export default function RootLayout() {
  const queryClient = new QueryClient();
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Please enable notifications to receive random jokes!');
      }
    };

    const subscription1 = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    requestPermissions();

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </PaperProvider>
  );
}
