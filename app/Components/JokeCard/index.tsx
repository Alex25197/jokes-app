import { AntDesign } from "@expo/vector-icons";
import { Card, Text, Button, MD2Colors, IconButton } from "react-native-paper";
import { Image } from "react-native";
import { JokeType } from "@/types/Joke";

export default function JokeCard({
  jokeData,
  onPress,
}: {
  jokeData: JokeType;
  onPress?: () => void;
}) {
  return (
    <Card onPress={onPress}>
      <Card.Title
        titleStyle={{ fontSize: 24, fontWeight: "bold" }}
        title={"Chuck Norris Joke"}
        left={() => (
          <Image
            source={{ uri: jokeData?.icon_url }}
            style={{ width: 50, height: 50 }}
          />
        )}
      />

      <Card.Content>
        <Text variant="titleLarge">Joke</Text>
        <Text variant="bodyMedium">{jokeData?.value}</Text>
      </Card.Content>
      <Card.Actions>
        <IconButton onPress={() => console.log("Fav")} icon={"heart"} iconColor={MD2Colors.red500} />
      </Card.Actions>
    </Card>
  );
}
