import { FlatList, View } from "react-native";
import {
  ActivityIndicator,
  MD2Colors,
  Text,
  Searchbar,
  Button,
} from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import JokeCard from "../Components/JokeCard";
import { JokeType } from "@/types/Joke";

export default function Search() {
  const [searchText, setSearchText] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [hasSearched, setHasSearched] = React.useState(false);

  const { isPending, isFetching, isLoading, error, data } = useQuery({
    queryKey: ["searchJokes", searchQuery],
    queryFn: () =>
      fetch(
        `https://api.chucknorris.io/jokes/search?query=${searchQuery}`
      ).then((res) => res.json()),
    enabled: searchQuery !== "" && hasSearched,
  });

  const handleSearch = () => {
    if (searchText.trim()) {
      setSearchQuery(searchText.trim());
      setHasSearched(true);
    }
  };

  const renderItem = ({ item }: { item: JokeType }) => (
    <JokeCard jokeData={item} />
  );

  const showLoading = hasSearched && (isFetching || isLoading || isPending);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, flexDirection: "row", gap: 8 }}>
        <Searchbar
          placeholder="Search jokes"
          onChangeText={setSearchText}
          value={searchText}
          style={{ flex: 1 }}
          onSubmitEditing={handleSearch}
        />
        <Button
          mode="contained"
          onPress={handleSearch}
          disabled={!searchText.trim()}
        >
          Search
        </Button>
      </View>

      <View style={{ flex: 1 }}>
        {showLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator
              size={"large"}
              animating={true}
              color={MD2Colors.indigo500}
            />
          </View>
        ) : (
          <>
            {hasSearched && (
              <Text style={{ paddingLeft: 16 }} variant="headlineLarge">
                Search Results
              </Text>
            )}
            <FlatList
              contentContainerStyle={{
                gap: 16,
                paddingBottom: 50,
                paddingHorizontal: 16,
                paddingTop: 16,
              }}
              data={data?.result || []}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
                  <Text>
                    {!hasSearched
                      ? "Enter a search term to find jokes"
                      : searchQuery
                      ? "No jokes found"
                      : "Start searching for jokes"}
                  </Text>
                </View>
              }
              renderItem={renderItem}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}