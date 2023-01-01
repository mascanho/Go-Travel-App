import { View, Text, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeroImage } from "../assets";
import { TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(
        () =>
            navigation.setOptions({
                headerShown: false,
            }),
        []
    );

    return (
        <SafeAreaView className="bg-white relative flex-1">
            {/* First section */}

            <View className="flex-row px-6 mt-8 items-center space-x-2">
                <View className="w-16 bg-black rounded-full h-16 justify-center">
                    <Text className="text-[#4DABB7] font-semibold m-auto text-3xl">
                        Go
                    </Text>
                </View>
                <Text className="text-[#2A2848] text-3xl font-semibold">Travel</Text>
            </View>
            <View className="mt-8 flex justify-center items-start w-full px-6 space-y-3">
                <Text className="text-[#3C6072] text-[42px]">Enjoy the trip with</Text>
                <Text className="text-[#00BCC9] text-[39px] font-bold">
                    Good Moments
                </Text>
                <Text className="text-base">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi ex
                    impedit dolores.
                </Text>
            </View>

            {/* Circle Section */}

            <View className="w-[400px] h-[400px] bg-[#00BCC9] rounded-full absolute bottom-36 -right-36"></View>
            <View className="w-[400px] h-[400px] bg-[#E99265] rounded-full absolute -bottom-28 -left-36"></View>

            {/* Hero Image */}

            <View className="flex-1 relative items-center">
                <Image
                    source={HeroImage}
                    className="w-full mt-20 h-full object-cover"
                />

                <TouchableOpacity
                    onPress={() => navigation.navigate("Discover")}
                    className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center"
                >
                    <Animatable.View
                        animation={"pulse"}
                        easing="ease-in-out"
                        iterationCount={"infinite"}
                        className="w-20 h-20 items-center justify-center rounded-full bg-[#00BCC9]"
                    >
                        <Animatable.Text
                            animation="pulse"
                            easing="ease-out"
                            iterationCount="infinite"
                            style={{ textAlign: "center" }}
                        >
                            <Text className="text-gray-50 text-4xl font-semibold">GO</Text>
                        </Animatable.Text>
                    </Animatable.View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
