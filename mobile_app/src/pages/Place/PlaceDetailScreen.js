import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import request from "../../api/request";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faAngleLeft,
    faHome,
    faLocationDot,
    faStar,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {ThemeContext} from "../../context/ThemeContext";
import {colors} from "../../config/theme";
import {getData} from "../../config/asyncStorage";

const PlaceDetailScreen = ({route, navigation}) => {
    // get Theme
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    const {
        placeId,
        title,
        description,
        location,
        price,
        state,
        user_name,
        user_avatar
    } = route.params;
    // Image by placeId
    const [imageByPlaceId, setImageByPlaceId] = useState([]);
    // Category by placeId
    const [categoryByPlaceId, setCategoryByPlaceId] = useState([]);
    // initial rate
    const [rateAboutPlaceId, setRateAboutPlaceId] = useState([]);
    const [totalRateAboutPlaceId, setTotalRateAboutPlaceId] = useState();
    const [rateAverageAboutPlaceId, setRateAverageAboutPlaceId] = useState();
    // user login
    const [userLogin, setUserLogin] = useState();
    // favorite
    const [isFavorite, setIsFavorite] = useState(false);
    const handleAddFavorite = async (placeId) => {
        console.log(isFavorite)
        if(isFavorite){
        //     place is favorite

        }
        // await request.getCategoryByPlaceId(placeId)
        //     .then((response) => {
        //         setCategoryByPlaceId(response.data.data);
        //     })
        //     .catch(error => {
        //         console.log('Error getPlaceList: ' + error.message);
        //     });
    };
    // Check favorite for user and place
    const getFavoritePlaceByUserid = async (userId) => {
        if (userId) {
            await request.getFavoritePlaceByUserid(userId)
                .then((response) => {
                    const favoritePlaceByUserid = (response.data.data);
                    favoritePlaceByUserid?.map(placeItem => {
                        if (placeItem.id === placeId) {
                            setIsFavorite(true);
                            return;
                        }
                    })
                })
                .catch(error => {
                    console.log('Error getFavoritePlaceByUserid: ' + error.message);
                })
        }
    };
    const getUserLogin = async () => {
        const accessToken = await getData('accessToken');
        const accessUser = await getData('accessUser');
        if (accessToken && accessUser) {
            setUserLogin(accessUser);
        }
    };
    const getRateAboutPlaceId = async (placeId) => {
        try {
            await request.getRateAboutPlaceId(placeId).then((response) => {
                setRateAboutPlaceId(response.data.data)
                setRateAverageAboutPlaceId(response.data.rateAverage);
                setTotalRateAboutPlaceId(response.data.totalRate);
            });
        } catch (e) {
            console.log('Error getPlaceById: ' + e.message);
        }
    };
    const getImageByPlaceId = async (placeId) => {
        await request.getImageByPlaceId(placeId)
            .then((response) => {
                setImageByPlaceId(response.data.data);
            })
            .catch(error => {
                console.log('Error getPlaceList: ' + error.message);
            });
    }
    const getCategoryByPlaceId = async (placeId) => {
        await request.getCategoryByPlaceId(placeId)
            .then((response) => {
                setCategoryByPlaceId(response.data.data);
            })
            .catch(error => {
                console.log('Error getPlaceList: ' + error.message);
            });
    };
    useEffect(() => {
        getImageByPlaceId(placeId);
        getCategoryByPlaceId(placeId);
        getRateAboutPlaceId(placeId);
        getUserLogin();
        getFavoritePlaceByUserid(userLogin);
    }, [placeId]);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView className={'px-3'}>
                <View
                    style={styles.flex_row}
                >
                    <TouchableOpacity
                        style={{padding: 10}}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size={20} color={'black'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderRadius: 200, overflow: 'hidden'}}>
                        <Image
                            source={{uri: user_avatar}}
                            style={{width: 32, height: 32}}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: activeColors.primary}}>
                    <Text
                        style={[styles.title, {color: activeColors.text2,}]}
                        numberOfLines={3}
                    >
                        {title}
                    </Text>
                </View>
                {/* Scroll Image */}
                <ScrollView
                    contentContainerStyle={{
                        marginTop: 10,
                        backgroundColor: 'gray',
                        borderRadius: 20,
                        overflow: 'hidden'
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                >
                    {imageByPlaceId?.map((image, index) => {
                        return (
                            <Image
                                key={index}
                                style={{width: 300, height: 200, resizeMode: 'stretch', marginRight: 10}}
                                source={{uri: image.image}}
                            />
                        )
                    })}
                </ScrollView>
                <View style={[styles.flex_row, {marginVertical: 10}]}>
                    <Text style={{color: activeColors.primary, fontSize: 20, fontWeight: 'bold'}}>{price}</Text>
                    <View style={{
                        backgroundColor: activeColors.background_button,
                        paddingHorizontal: 20,
                        borderRadius: 5
                    }}>
                        <Text style={{color: '#fff', display: 'flex', alignItems: 'center', lineHeight: 30}}>
                            {rateAverageAboutPlaceId} <FontAwesomeIcon icon={faStar} color={'#fff'} size={15}/>
                        </Text>
                    </View>
                </View>
                <View style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: activeColors.primary}}>
                    <View style={[styles.flex_row, {}]}>
                        <FontAwesomeIcon icon={faLocationDot} color={activeColors.primary}/>
                        <View style={{flex: 1, paddingLeft: 10}}>
                            <Text style={{fontSize: 16}}>{location}</Text>
                            <Text style={{textDecorationLine: 'underline'}}>
                                Xem trên Google Maps
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.flex_row, {marginTop: 10}]}>
                        <FontAwesomeIcon icon={faUser} color={activeColors.primary}/>
                        <View style={{flex: 1, paddingLeft: 10}}>
                            <Text style={{color: (state === 'Available') ? activeColors.primary : '#E56C44'}}
                                  className="text-base font-bold"
                            >{(state === 'Available') ? 'Còn trống' : 'Đã đặt'}</Text>
                            <Text>Sở hữu bởi: {user_name}</Text>
                        </View>
                    </View>
                    <View style={[styles.flex_row, {marginTop: 10}]}>
                        <FontAwesomeIcon icon={faHome} color={activeColors.primary}/>
                        <View style={{flex: 1, paddingLeft: 10}}>
                            <Text style={{fontSize: 16}}>Loại phòng: </Text>
                            {categoryByPlaceId?.map((category, index) => {
                                return (
                                    <Text key={index}
                                          style={{textTransform: 'capitalize'}}>{category.name}</Text>
                                )
                            })}
                        </View>
                    </View>
                </View>
                {/* Description */}
                <View className={'mt-5 mb-3'}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mô tả</Text>
                    <Text style={{fontSize: 16}} numberOfLines={20}>{description}</Text>
                </View>
                {/* Rate */}
                <View className={'mt-3'}>
                    <View className={'mb-2 flex-row justify-between items-center'}>
                        <Text className={'text-base font-bold'}>Đánh giá sản phẩm</Text>
                        <Text className={'text-base text italic text-rose-800'}>
                            {totalRateAboutPlaceId} lượt đánh giá
                        </Text>
                    </View>
                    <View>
                        {rateAboutPlaceId?.map((rate, index) => {
                            return (
                                <View key={index}
                                      className={'py-2 border-b-2 border-indigo-500/50'}>
                                    <View className={'flex-row justify-between items-center'}>
                                        <Text>
                                            Người dùng {rate.from_user_id}
                                        </Text>
                                        <Text
                                            className={`${(rate.star > 3) ? 'text-green-800' : 'text-red-800'} font-bold`}>
                                            {rate.star} sao
                                        </Text>
                                        <Text>
                                            {rate.created_at}
                                        </Text>
                                    </View>
                                    <Text>
                                        {rate.content}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            <View className={'py-3 flex items-center justify-center gap-3 flex-row'}>
                <TouchableOpacity
                    className={'w-5/12'}
                    onPress={handleAddFavorite}>
                    <Text
                        className={'p-2 rounded-3xl bg-pink-600 text-white text-center text-base font-bold'}>
                        {(!!isFavorite) ? 'Xoá Yêu Thích' : 'Thêm Yêu Thích'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={'w-5/12'}
                    onPress={() => {
                        alert('booked')
                    }}>
                    <Text
                        className={'p-2 rounded-3xl bg-indigo-900 dark:bg-violet-300 text-white text-center text-base font-bold'}>
                        Đặt phòng
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    flex_row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    container: {
        width: '100%',
        height: '100%',
        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderWidth: 0
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        textAlign: 'left'
    },
})
export default PlaceDetailScreen;
