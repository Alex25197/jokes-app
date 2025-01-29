import { FlatList } from "react-native";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleCard from "../../Components/SimpleCard";
import { router } from "expo-router";
import React from "react";

export default function Home() {
  const { isPending, isFetching, isLoading, error, data } = useQuery({
    queryKey: ["jokeCategories"],
    queryFn: () =>
      fetch("https://api.chucknorris.io/jokes/categories").then((res) =>
        res.json()
      ),
  });

  const toRandomJoke = (category: string) => {
    router.push({
      pathname: "/(tabs)/home/[category]",
      params: { category: category },
    });
  };

  const renderItem = ({ item }: { item: string }) => (
    <SimpleCard title={item} onPress={() => toRandomJoke(item)} />
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      {isFetching || isLoading || isPending ? (
        <ActivityIndicator size={"large"} animating={true} color={MD2Colors.indigo500} />
      ) : (<>
      <Text style={{ paddingLeft: 16 }} variant="headlineLarge">Categories</Text>
        <FlatList
          contentContainerStyle={{
            gap: 16,
            paddingBottom: 50,
            paddingHorizontal: 16,
            paddingTop: 16,
          }}
          data={data}
          renderItem={renderItem}
        /></>
      )}
    </SafeAreaView>
  );
}
