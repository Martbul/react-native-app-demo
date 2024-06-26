import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllVideos, getLatestVideos } from '../../services/videoServices'
import useFetchVideos from '../../hooks/useFetchVideos'
import VideoCard from '../../components/VideoCard'
import { AuthContext } from '../../contexts/AuthContext'
const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const {data:posts,refetch} = useFetchVideos(getAllVideos)
  const {data:latestPosts} = useFetchVideos(getLatestVideos)
  const [refreshing, setRefreshing] = useState(false)
 // console.log('latestPosts',latestPosts);

  //when a user pulls down the screen, it will call this function and fetch new videos(like on instagram)
    const onRefresh = async() => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }


  return (
    <SafeAreaView className="bg-primary h-full">
      {/*FlatList is used for rendering a list of elements */}
     <FlatList
        data={posts}
        
        keyExtractor={(item)=> item._id}
        renderItem={({item})=>(
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome back,</Text>
                <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode="contain"
                />


              </View>

            </View>

            <SearchInput></SearchInput>
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest videos</Text>
              <Trending
                  posts={latestPosts ?? []}
                  
              />
            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState
          title="No videos found"
          subtitle="Be the first to upload a video" 
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}

          
     />
    </SafeAreaView>
  )
}

export default Home