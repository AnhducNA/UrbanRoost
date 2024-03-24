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

const PlaceDetailScreen = ({route, navigation}) => {
    // get Theme
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    const {
        placeId,
        title,
        description,
        location,
        star,
        price,
        state,
        user_name,
        user_avatar
    } = route.params;
    const [ownRoomData, setOwnRoomData] = useState([]);
    // Image by placeId
    const [imageByPlaceId, setImageByPlaceId] = useState([]);
    // Category by placeId
    const [categoryByPlaceId, setCategoryByPlaceId] = useState([]);

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
    }

    useEffect(() => {
        getImageByPlaceId(placeId);
        getCategoryByPlaceId(placeId)
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{paddingBottom: 100}}>
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
                            {star} <FontAwesomeIcon icon={faStar} color={'#fff'} size={15}/>
                        </Text>
                    </View>
                </View>
                <View style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: activeColors.primary}}>
                    <View style={[styles.flex_row, {}]}>
                        <FontAwesomeIcon icon={faLocationDot} color={activeColors.primary}/>
                        <View style={{flex: 1, paddingLeft: 10}}>
                            <Text style={{fontSize: 16}}>{location}</Text>
                            <Text style={{textDecorationLine: 'underline'}}>
                                View on Google Maps
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.flex_row, {marginTop: 10}]}>
                        <FontAwesomeIcon icon={faUser} color={activeColors.primary}/>
                        <View style={{flex: 1, paddingLeft: 10}}>
                            <Text style={{color: (state === 'Available') ? activeColors.primary : '#E56C44'}}
                                  className="text-base font-bold"
                            >{state}</Text>
                            <Text>Owned By: {user_name}</Text>
                        </View>
                    </View>
                    <View style={[styles.flex_row, {marginTop: 10}]}>
                        <FontAwesomeIcon icon={faHome} color={activeColors.primary}/>
                        <View style={{flex: 1, paddingLeft: 10}}>
                            <Text style={{fontSize: 16}}>Type room: </Text>
                            {categoryByPlaceId?.map((category, index) => {
                                return (
                                    <Text key={index}
                                          style={{textTransform: 'capitalize'}}>{category.name}</Text>
                                )
                            })}
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Description</Text>
                    <Text style={{fontSize: 16}} numberOfLines={20}>{description}</Text>
                </View>
            </ScrollView>
            <TouchableOpacity style={{paddingHorizontal: 20, paddingTop: 10}}>
                <TouchableOpacity
                    onPress={() => {
                        alert('booked')
                    }}>
                    <Text style={[styles.btn_book, {backgroundColor: activeColors.primary}]}>
                        Book Now
                    </Text>
                </TouchableOpacity>
            </TouchableOpacity>
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
    btn_book: {
        paddingVertical: 10,
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
        borderRadius: 20
    }
})
export default PlaceDetailScreen;
