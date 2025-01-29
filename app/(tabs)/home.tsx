import { FlatList } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import {
  useQuery,
} from '@tanstack/react-query'
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleCard from "../Components/SimpleCard";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ['jokeCategories'],
    queryFn: () =>
      fetch('https://api.chucknorris.io/jokes/categories').then((res) =>
        res.json(),
      ),
  })

  const renderItem = ({ item } : { item: string }) => <SimpleCard title={item}/>;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <FlatList contentContainerStyle={{ gap: 16, paddingBottom: 50, paddingHorizontal: 16, paddingTop: 16 }} data={data} renderItem={renderItem} />
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </SafeAreaView>
  );
}
