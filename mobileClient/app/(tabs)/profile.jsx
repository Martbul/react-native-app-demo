import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllUserVideos, searchVideos } from "../../services/videoServices";
import useFetchVideos from "../../hooks/useFetchVideos";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { AuthContext } from "../../contexts/AuthContext";
import { icons, images } from "../../constants";
import { logoutUser } from "../../services/userAuth";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

// [query].jsx is a dynamic route component in Next.js, which means it can receive query parameters.
const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  
  const { data: posts, refetch } = useFetchVideos(() =>
    getAllUserVideos(user.email)
  );
   const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };



  const logout = async () => {
    await logoutUser();
    setUser(null);

    //! if you use router.push that means the user can go back 
    //!to the last page but with router.replcw the user cannot go back
    router.replace('/sign-in')
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={images.userProfileImage}
                className="w-[115%] h-[115%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg "
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Videos"
                containerStyles="mr-10"
                titleStyles="text-xl "
              />

              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl "
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
