import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import {  SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { AuthContext } from '../../contexts/AuthContext'
import { loginUser } from '../../services/userAuth'


const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const{user,isLoading,setUser} = useContext(AuthContext);
  const submit = async () => {
    if (!form.email || !form.password) {
      
      Alert.alert("Error", "Please fill in all fields");
      return
    }

    setIsSubmiting(true);

    try {
      const result = await loginUser(form.email, form.password);

      console.log("result", result);
      setUser(result);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />

          <Text className="text-2xl text-white semi-bold mt-10 font-psemibold">
            Log into Aora
          </Text>

          <FormField
            title="email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          ></FormField>

          <FormField
            title="password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          ></FormField>

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmiting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
