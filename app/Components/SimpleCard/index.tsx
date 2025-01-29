import { AntDesign } from "@expo/vector-icons";
import { Card, Text, Avatar } from "react-native-paper";

export default function SimpleCard({ title }: { title: string }) {
  return (
    <Card>
      <Card.Title  titleStyle={{ fontSize: 24, fontWeight: 'bold' }} title={title} left={()=> <AntDesign name="API" size={24} color="black" />} />

      {/* <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content> */}
    </Card>
  );
}
