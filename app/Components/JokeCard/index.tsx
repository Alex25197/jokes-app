import { AntDesign } from "@expo/vector-icons";
import { Card, Text, Button, MD2Colors, IconButton } from "react-native-paper";
import { Image } from "react-native";
import { JokeType } from "@/types/Joke";

export default function JokeCard({
  jokeData,
  onPress,
  onPressSecondary,
}: {
  jokeData: JokeType;
  onPress?: () => void;
  onPressSecondary?: () => void;
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
        {onPress && <IconButton onPress={onPress} icon={"heart"} iconColor={MD2Colors.red500} />}
        {onPressSecondary && <IconButton onPress={onPressSecondary} icon={"delete"} iconColor={MD2Colors.blue500} />}
      </Card.Actions>
    </Card>
  );
}
