import { StatusBar } from "expo-status-bar";
import {  Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
   return (
      <View className="flex-1 items-center justify-center bg-white">
         <Text>Open up App.js to start working</Text>
         <StatusBar style="auto"></StatusBar>
         <Link href='/profile' style={{color:"blue"}}>Go to profile</Link>
      </View>
   )
}
