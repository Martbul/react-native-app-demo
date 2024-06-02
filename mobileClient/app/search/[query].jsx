import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchVideos } from "../../services/videsServices";
import useFetchVideos from "../../hooks/useFetchVideos";
import SearchInput from "../../components/SearchInput";
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'
// [query].jsx is a dynamic route component in Next.js, which means it can receive query parameters.
const Search = () => {
  const { query } = useLocalSearchParams();
  // const { data: posts, refetch } = useFetchVideos(searchVideos(query));
  const { data: posts, refetch } = useFetchVideos(()=>searchVideos(query));
console.log('posts',posts);
  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      {/*FlatList is used for rendering a list of elements */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Seach vides
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6  mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View> 
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
