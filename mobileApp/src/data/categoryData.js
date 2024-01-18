import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHome, faHotel, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";

const categoryList = [
    {
        id: 1,
        name: "Room for rent",
        icon: <FontAwesomeIcon icon={faHome} color='#7472E0'/>,
        url: "/",
    },
    {
        id: 2,
        name: "Place for sale",
        icon: <FontAwesomeIcon icon={faSalesforce} color='#7472E0'/>,
        url: "/",
    },
    {
        id: 3,
        name: "Roommate",
        icon: <FontAwesomeIcon icon={faUserGroup} color='#7472E0'/>,
        url: "/",
    },
    {
        id: 4,
        name: "Hotel",
        icon: <FontAwesomeIcon icon={faHotel} color='#7472E0'/>,
        url: "/",
    },
];

export default categoryList;
