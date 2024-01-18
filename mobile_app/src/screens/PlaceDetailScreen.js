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
import request from "../api/request";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft, faCircle, faHome, faLocationDot, faStar} from "@fortawesome/free-solid-svg-icons";
import {ThemeContext} from "../context/ThemeContext";
import {colors} from "../config/theme";

const PlaceDetailScreen = ({route, navigation}) => {
    // get Theme
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    const {
        placeId,
        title,
        description,
        image,
        location,
        star,
        price,
        type_place,
        latitude,
        longitude,
        state
    } = route.params;
    const [placeData, setPlaceData] = useState([]);
    const [ownRoomData, setOwnRoomData] = useState([]);
    const getPlaceById = async (id) => {
        try {
            await request.getPlaceById(id).then(response => {
                setPlaceData(response.data);
            })
        } catch (e) {
            console.log('Error getPlaceById: ' + e.message);
        }
    }
    const getOwnRoomByIdPlace = async (id) => {
        try {
            setOwnRoomData({'image': 'https://randomuser.me/api/portraits/men/36.jpg'})
        } catch (e) {
            console.log('Error getOwnRoomByIdPlace: ' + e.message);
        }
    }
    useEffect(() => {
        getPlaceById(placeId);
        getOwnRoomByIdPlace(placeId);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{paddingBottom: 100}}>
                <View
                    style={styles.flex_row}
                >
                    <TouchableOpacity style={{padding: 10}}
                                      onPress={() => {
                                          navigation.goBack();
                                      }}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size={20} color={'black'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderRadius: 200, overflow: 'hidden'}}>
                        <Image
                            source={{uri: ownRoomData.image}}
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
                    contentContainerStyle={{marginTop: 10, backgroundColor: 'gray', borderRadius: 20, overflow: 'hidden'}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                >
                    <Image
                        style={{width: 300, height: 200, resizeMode: 'stretch', marginRight: 10}}
                        source={{uri: image}}
                    />
                    <Image
                        style={{width: 300, height: 200, resizeMode: 'stretch', marginRight: 10}}
                        source={{uri: image}}
                    />
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
                        <FontAwesomeIcon icon={faCircle}
                                         color={(state === 'Available') ? activeColors.primary : '#E56C44'}/>
                        <View style={{flex: 1, paddingLeft: 10}}>
                            <Text style={{fontSize: 16}}>{state}</Text>
                            <Text>Owned By: Duc</Text>
                        </View>
                    </View>
                    <View style={[styles.flex_row, {marginTop: 10}]}>
                        <FontAwesomeIcon icon={faHome} color={activeColors.primary}/>
                        <View style={{flex: 1, paddingLeft: 10}}>
                            <Text style={{fontSize: 16}}>Type room: </Text>
                            <Text style={{textTransform: 'capitalize'}}>{type_place}</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Description</Text>
                    <Text style={{fontSize: 16}} numberOfLines={20}>{description}</Text>
                </View>
            </ScrollView>
            <TouchableOpacity style={{paddingHorizontal: 20, paddingTop: 10}}>
                <Text style={[styles.btn_book, {backgroundColor: activeColors.primary}]}>
                    Book Now
                </Text>
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
