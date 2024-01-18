import {
    faBell, faBookOpen, faBriefcase,
    faHouse,
    faLanguage,
    faLock,
    faMoneyBill,
    faMoon,
    faRightToBracket
} from "@fortawesome/free-solid-svg-icons";

const accountSettingsListData = [
    {
        header: "Account Settings",
        menuItems: [
            {
                title: "Personal Information",
                icon: faHouse,
                link: "/",
            },
            {
                title: "Login & Security",
                icon: faRightToBracket,
                link: "/",
            },
            {
                title: "Payments and payouts",
                icon: faMoneyBill,
                link: "/",
            },
            {
                title: "Translation",
                icon: faLanguage,
                link: "",
            },
            {
                title: "Notification",
                icon: faBell,
                link: "",
            },
            {
                title: "DarkMode",
                icon: faMoon,
                link: "",
            },
            {
                title: "Privacy and Sharing",
                icon: faLock,
                link: "",
            },
            {
                title: "Travel for Work",
                icon: faBriefcase,
                link: "",
            },
        ],
    },
    {
        header: "Hosting",
        menuItems: [
            {
                title: "List your Space",
                icon: faHouse,
                link: "/",
            },
            {
                title: "Learn about hosting",
                icon: faHouse,
                link: "/",
            },
            {
                title: "Host an Experience",
                icon: faHouse,
                link: "/",
            },
        ],
    },
    {
        header: "Legal",
        menuItems: [
            {
                title: "Terms of Service",
                icon: faBookOpen,
                link: "/",
            },
            {
                title: "Privacy Policy",
                icon: faBookOpen,
                link: "/",
            },
        ],
    },
];

export default accountSettingsListData;
