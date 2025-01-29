import useJokeStore from "@/store/JokeStore";
import { JokeType } from "@/types/Joke";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import JokeCard from "../Components/JokeCard";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export default function Favorites() {
  const favoriteJokes = useJokeStore((state) => state.favoriteJokes);
  const removeJoke = useJokeStore((state) => state.removeJoke);
  const renderItem = ({ item }: { item: JokeType }) => (
    <JokeCard jokeData={item} onPressSecondary={() => removeJoke(item.id)} />
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      {favoriteJokes.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Jokes to show</Text>
        </View>
      ) : (
        <>
        <Text style={{ paddingLeft: 16 }} variant="headlineLarge">Favorite Jokes</Text>
        <FlatList
          contentContainerStyle={{
            gap: 16,
            paddingBottom: 50,
            paddingHorizontal: 16,
            paddingTop: 16,
          }}
          data={favoriteJokes}
          renderItem={renderItem}
        /></>
      )}
    </SafeAreaView>
  );
}
