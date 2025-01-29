import { View, Text, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import JokeCard from "@/app/Components/JokeCard";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import useJokeStore from "@/store/JokeStore";

const Joke = () => {
  const local = useLocalSearchParams();
  const favJoke = useJokeStore((state) => state.addJoke);

  const { isPending, error, data, isLoading, isFetching } = useQuery({
    queryKey: ["randomJoke"],
    queryFn: () =>
      fetch(
        `https://api.chucknorris.io/jokes/random?category=${local.category}`
      ).then((res) => res.json()),
  });

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {isPending || isLoading || isFetching ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size={"large"} color={MD2Colors.indigo500} />
        </View>
      ) : (
        <JokeCard jokeData={data} onPress={() => favJoke(data)} />
      )}
    </View>
  );
};

export default Joke;
