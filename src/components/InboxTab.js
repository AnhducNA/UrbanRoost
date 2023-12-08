import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import InboxCard from "./InboxCard";

const InboxTab = () => {
    const messageList = [
        {
            id: 1,
            name: 'Le Anh Duc',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
            description: 'Hi Duc, thanks for interested in out hotel',
            status: 'Accepted',
            time: '1 month ago'
        },
        {
            id: 2,
            name: 'Le Anh Tai',
            image: "https://thumbs.dreamstime.com/b/one-beautiful-female-caucasian-high-school-senior-girl-red-crop-top-sweater-one-beautiful-female-caucasain-high-school-senior-143152935.jpg",
            description: 'Hi Tai, thanks for interested in out hotel',
            status: 'Not Possible',
            time: '2 month ago'
        },
        {
            id: 3,
            name: 'Le Anh Hoang',
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3s_tQh47BcBTFq0-_-uZmwIniv1GkjnOJlTAw7iYbjk6SBb8P2Yw63TcdRPa0r8shQw&usqp=CAU",
            description: 'Hi Hoang, thanks for interested in out hotel',
            status: 'Accepted',
            time: '3 month ago'
        },
        {
            id: 4,
            name: 'Le Anh Long',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
            description: 'Hi Long, thanks for interested in out hotel',
            status: 'Not Possible',
            time: '2 month ago'
        },
    ]

    return (
        <ScrollView
            className={"mt-5"}
            showsVerticalScrollIndicator={true}
        >
            <Text className={"px-3 font-bold text-2xl"}>
                You have no unread messages
            </Text>
            {(messageList)?.map((message, index) => {
                return (
                    <InboxCard
                        key={index}
                        name={message.name}
                        image={message.image}
                        description={message.description}
                        status={message.status}
                        time={message.time}
                    />
                )
            })}
        </ScrollView>
    );
};

export default InboxTab;
