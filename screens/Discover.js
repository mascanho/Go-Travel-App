import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ScrollView } from "react-native";
import MenuContainer from "../components/MenuContainer";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import ItemCardContainer from "../components/ItemCardContainer";
import { ActivityIndicator } from "react-native";
import { getPlacesData } from "../api/getPlacesData";


const Discover = () => {
    const navigation = useNavigation();
    const [type, setType] = useState("restaurants")
    const [isLoading, setIsLoading] = useState(false)
    const [mainData, setMainData] = useState([])
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);


    useLayoutEffect(
        () =>
            navigation.setOptions({
                headerShown: false,
            }),
        []
    );

    useEffect(() => {
        setIsLoading(true)
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then(data => {
            setMainData(data)
            setInterval(() => {
                setIsLoading(false)
            }, 1500)
        })
    }, [bl_lat, bl_lng, tr_lat, tr_lng, type])

    console.log(mainData)

    return (
        <SafeAreaView className="flex-1 bg-white relative">
            <View className="flex-row items-center justify-between px-8">
                <View className="">
                    <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
                    <Text className="text-[#527283] text-[36px]">the beauty today</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>

                    <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center">
                        <Image
                            source={Avatar}
                            className="w-full h-full rounded-md shadow-lg"

                        />
                    </View>

                </TouchableOpacity>
            </View>
            <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-md mt-4">
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    placeholder='Search'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(details?.geometry?.viewport)
                        setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                        setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                        setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                        setTr_lng(details?.geometry?.viewport?.northeast?.lng);
                    }}
                    query={{
                        key: 'AIzaSyBIgcJLUMBaIYJwbzuCgTEV4KNjXrLe_A0',
                        language: 'en',
                    }}
                />
            </View>

            {
                isLoading ? <View className='flex-1 items-center justify-center'>
                    <ActivityIndicator size='large' color='#0B646B' />
                </View>
                    : <ScrollView>
                        <View className='flex-row items-center justify-between  px-8 mt-8'>
                            <MenuContainer key={"hotel"} title={"hotels"} imageSrc={Hotels} type={type} setType={setType} />
                            <MenuContainer key={"attractions"} title={"Attractions"} imageSrc={Attractions} type={type} setType={setType} />
                            <MenuContainer key={"restaurants"} title={"restaurants"} imageSrc={Restaurants} type={type} setType={setType} />
                        </View>
                        <View>
                            <View className='flex-row items-center justify-between mt-8 px-4'>
                                <Text className='text-[#2C7379] text-[28px] font-bold '>
                                    Top Tips
                                </Text>
                                <TouchableOpacity className='flex-row items-center justify-center space-x-2'>
                                    <Text className='text-[28px] text-[#A0C4C7] font-bold'>
                                        Explore
                                    </Text>
                                    <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
                                </TouchableOpacity>
                            </View>
                            <View className='px-4 mt-8 flex-row items-center justify-evenly flex-wrap'>
                                {mainData?.length > 0 ? <>
                                    {mainData.map((data, i) => (
                                        <ItemCardContainer key={i} title={data?.name}
                                            imageSrc={data?.photo?.images?.medium?.url || 'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_960_720.jpg'}
                                            location={data?.location_string}
                                            data={data}
                                        />
                                    ))}
                                </>
                                    : <>
                                        <View className='w-full h-[400] items-center space-y-8 justify-center'>
                                            <Image source={NotFound} className='h-24 w-24 object-cover' />
                                            <Text className='text-2xl text-green-800 font-semibold'>Oooopss. No data to show here </Text>
                                        </View>
                                    </>
                                }
                            </View>
                        </View>
                    </ScrollView>
            }

        </SafeAreaView>
    );
};


export default Discover;

