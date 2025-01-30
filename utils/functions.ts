  import * as Notifications from 'expo-notifications';
  
  const handleRandomJokeNotification = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const joke = await response.json();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Random Chuck Norris Joke 💪",
          body: joke.value,
          data: { id: joke.id },
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again.');
    }
  };