import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircleDot, faDotCircle, faHeart, faLocationDot, faStar} from "@fortawesome/free-solid-svg-icons";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {addWishlistPlace} from "../../features/wishlistSlice";
import {Button, Card} from "@rneui/themed";
import {ThemeContext} from "../../context/ThemeContext";
import {colors} from "../../config/theme";
import {flex} from "nativewind/dist/postcss/to-react-native/properties/flex";

function PlaceCard(
    {
        title = '',
        star = 5,
        image,
        location,
        price,
        latitude,
        longitude,
        state
    }
) {
    // get router
    const navigation = useNavigation();
    // get Theme
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];

    const dispatch = useDispatch();
    return (
        <TouchableOpacity style={[styles.wrapper, {backgroundColor: '#fff'}]}
                          onPress={(event) => {
                              navigation.navigate('PlaceDetail');
                          }}
        >
            <Card.Image
                source={{uri: image}} alt={title}
            />
            <TouchableOpacity
                style={{padding: 5, position: 'absolute', top: 0, right: 0}}
                onPress={() => {
                    dispatch(addWishlistPlace({title, star, image, price}))
                }}
            >
                <FontAwesomeIcon icon={faHeart} size={25} color={'gray'}/>
            </TouchableOpacity>
            <View style={styles.card_body}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}>
                    <Card.Title
                        numberOfLines={2}
                        style={[styles.card_body.title, {color: '#000', width: '80%'}]}
                    >
                        {title}
                    </Card.Title>
                    <Button size='sm' type="solid" color='#2DD35C' radius={'10'} buttonStyle={{padding: 4}}>
                        <Text style={{marginRight: 3, color: '#fff', fontSize: 12}}>{star}</Text>
                        <FontAwesomeIcon icon={faStar} size={10} color={'#fff'}/>
                    </Button>
                </View>
                <Text
                    numberOfLines={2}
                    style={[styles.card_body.location, {color: '#000', width: '92%'}]}
                >{location}</Text>
                <Text className="text-gray-600"
                      style={[styles.card_body.price, {color: activeColors.primary, width: '92%'}]}
                >{price}</Text>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button type={'clear'}
                            icon={<FontAwesomeIcon icon={faLocationDot} size={13} color={activeColors.primary}/>}>
                        <Text style={{fontSize: 13}}>{latitude}, {longitude}</Text>
                    </Button>
                    <Text style={[ styles.card_body.state,{ color: (state === 'Available') ? activeColors.primary : '#E56C44'}]}>
                        {state}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 26,
        position: "relative",
        borderRadius: 4,
    },
    card_body: {
        paddingVertical: 10,
        paddingHorizontal: 8,
        display: "flex",
        flexDirection: 'column',
        title: {
            textAlign: 'left',
            fontSize: 18,
            fontWeight: 700,
            fontStyle: 'normal'
        },
        star: {
            padding: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',

        },
        location: {
            fontSize: 16,
            fontWeight: 400,
            fontStyle: 'normal',
        },
        price: {
            fontSize: 20,
            fontWeight: 700,
            fontStyle: 'normal',
        },
        state: {
            fontSize: 13,
            fontWeight: 700,
            fontStyle: 'normal',
        },

    }
})

export default PlaceCard;
