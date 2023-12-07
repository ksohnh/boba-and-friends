import { Text, View, ScrollView, TouchableHighlight, Pressable, Linking} from "react-native"
import { shopStyles } from "../styles/ShopScreen"
import { useEffect, useState } from "react";
import Stars from "./Stars";
import {db, doc, increment, setDoc, getDoc, onAuthStateChanged, auth, arrayUnion, updateDoc} from "../src/firebase/config.js"

// shop details page
export default function Shop({ route, navigation }) {
    // const data = {
    //     "id": "cNNTPEqz5uMY5cjCW7M8oA",
    //     "alias": "tea-dō-central-sq-cambridge-3",
    //     "name": "Tea-Dō Central Sq",
    //     "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/-ie9cX7ABKX6MAcTReCCdw/o.jpg",
    //     "is_claimed": true,
    //     "is_closed": false,
    //     "url": "https://www.yelp.com/biz/tea-d%C5%8D-central-sq-cambridge-3?adjust_creative=PqEn8INaVxSS8dRbLH7qSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=PqEn8INaVxSS8dRbLH7qSA",
    //     "phone": "+16177508564",
    //     "display_phone": "(617) 750-8564",
    //     "review_count": 10,
    //     "categories": [
    //         {
    //             "alias": "bubbletea",
    //             "title": "Bubble Tea"
    //         },
    //         {
    //             "alias": "juicebars",
    //             "title": "Juice Bars & Smoothies"
    //         }
    //     ],
    //     "rating": 5,
    //     "location": {
    //         "address1": "425 Massachusetts Ave",
    //         "address2": "4c",
    //         "address3": "",
    //         "city": "Cambridge",
    //         "zip_code": "02139",
    //         "country": "US",
    //         "state": "MA",
    //         "display_address": [
    //             "425 Massachusetts Ave",
    //             "4c",
    //             "Cambridge, MA 02139"
    //         ],
    //         "cross_streets": ""
    //     },
    //     "coordinates": {
    //         "latitude": 42.363876,
    //         "longitude": -71.100404
    //     },
    //     "photos": [
    //         "https://s3-media1.fl.yelpcdn.com/bphoto/-ie9cX7ABKX6MAcTReCCdw/o.jpg",
    //         "https://s3-media1.fl.yelpcdn.com/bphoto/p3orAPwTBh28wAH68yIM2g/o.jpg",
    //         "https://s3-media2.fl.yelpcdn.com/bphoto/5PyvsgendDNRPxYBsGbJlg/o.jpg"
    //     ],
    //     "hours": [
    //         {
    //             "open": [
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1200",
    //                     "end": "2200",
    //                     "day": 0
    //                 },
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1500",
    //                     "end": "2200",
    //                     "day": 1
    //                 },
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1200",
    //                     "end": "2200",
    //                     "day": 2
    //                 },
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1200",
    //                     "end": "2200",
    //                     "day": 3
    //                 },
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1200",
    //                     "end": "2300",
    //                     "day": 4
    //                 },
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1200",
    //                     "end": "2300",
    //                     "day": 5
    //                 },
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1200",
    //                     "end": "2200",
    //                     "day": 6
    //                 }
    //             ],
    //             "hours_type": "REGULAR",
    //             "is_open_now": true
    //         }
    //     ],
    //     "transactions": [
    //         "pickup",
    //         "delivery"
    //     ],
    //     "messaging": {
    //         "url": "https://www.yelp.com/raq/cNNTPEqz5uMY5cjCW7M8oA?adjust_creative=PqEn8INaVxSS8dRbLH7qSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=PqEn8INaVxSS8dRbLH7qSA#popup%3Araq",
    //         "use_case_text": "Message the Business"
    //     }
    // }
    const { data } = route.params
    const [user, setUser] = useState(null);
    const [uid, setUID] = useState(null);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const hours = data["hours"][0]["open"];

    const [hoursVisible, setHoursVisible] = useState(true);

    // button calling the shop if clicked
    function handleCall() {
        Linking.canOpenURL(`tel:${data["phone"]}`)
        .then((supported) => {
            if(supported){
                Linking.openURL(`tel:${data["phone"]}`)
            }
            else{
                console.log("Link Not Supported")
            }
        })
    }

    // button handling the like if clicked, updating the user and shop's information
    async function handleLike() { 
        console.log(user)
        console.log("uid: " + uid)
        console.log("shop id: " + data["id"])

        await updateDoc(doc(db, "users", uid),{
            likedShops: arrayUnion(data["id"]),
            NumberOfLikes: increment(1)
        })
        let ref = doc(db, "shops", data["id"])
        let ss = await getDoc(ref)

        // checking if the shop is already inputted or not
        if(!(ss.data()=== undefined)){
            // if it exists, update the likes
            console.log("Updating doc")
            if(!ss.data().LikedBy.includes(uid)){
                await updateDoc(ref, {
                    LikedBy: arrayUnion(uid),
                    NumberOfLikes: increment(1)
                })
            }
            else{                  
            }
        }
        // if not, create a new shop with 1 like
        else{
            console.log("Creating new doc")
            await setDoc(doc(db, "shops", data["id"]), {
                    Image: data["image_url"],
                    LikedBy: [uid],
                    NumberOfLikes: 1,
                    Posts: []
                })
            }
    }

    // button navigating to Yelp's specific shop page to order food if clicked
    function handleOrder() {
        Linking.canOpenURL(`tel:${data["url"]}`)
        .then((supported) => {
            if(supported){
                Linking.openURL(data["url"])
            }
            else{
                console.log("Link Not Supported")
            }
        })
    }

    // displaying and hiding the shop's hours
    function handleClick() {
        if (hoursVisible) {
            setHoursVisible(false);
        }
        else {
            setHoursVisible(true);
        }
    }

    // rendering the hours in an easily digestible list
    function HoursList() {
        let today = new Date();
        let day = today.getDay();
        if (hoursVisible) {
            // returning a mapped out version of the hours if clicked
            const ret = (hours.map((value, index) =>
                <View style={shopStyles.hoursMenuItem} key={index}>
                    <Text style={shopStyles.dayName}>{daysOfWeek[value.day]}</Text>
                    <Text style={shopStyles.hours}>{toStandard(value.start)} - {toStandard(value.end)}</Text>
                </View>))
            return (
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={handleClick}
                    style={shopStyles.hoursMenu}>
                    <View>{ret}</View>
                </TouchableHighlight>
            )
        }
        // showing the hours for the current day if clicked
        return (
            <TouchableHighlight activeOpacity={0.6}
                underlayColor="#DDDDDD" onPress={handleClick}>
                <View style={shopStyles.hoursSentence}>
                    {data.is_closed ?
                        (<Text style={shopStyles.closed}>Closed</Text>)
                        : (<Text style={shopStyles.open}>Open</Text>)}
                    <Text style={shopStyles.hours}>{toStandard(hours[day].start)} - {toStandard(hours[day].end)}</Text>
                    <Text style={shopStyles.downArrow}>Show More</Text>
                </View>
            </TouchableHighlight>
        )
    }

    // function converting the time from military (gotten from the API) to standard
    function toStandard(inputTime) {
        let hours = parseInt(inputTime.substr(0, 2));
        let minutes = inputTime.substr(2, 4);
        let zone = "am";
        if (hours >= 12) {
            zone = "pm";
        }
        let ret = hours + ":" + minutes + zone;
        if (hours >= 13) {
            ret = (hours % 13) + ":" + minutes + zone;
        }
        return ret;
    }

    // checking if the user is logged in
    useEffect(()=>{
        onAuthStateChanged(auth, (curUser)=>{
        if(curUser){
            getDoc(doc(db, "users", curUser.uid))
            .then((ss) => {
                if(ss){
                console.log(ss.data())
                setUser(ss.data())
                setUID(ss.id)
                }
            }).catch((error) =>{
                console.log(error.message)
            })
        }
        else{
            setUser(null);
        }
        })
    },[])

    // rendering the shop details page
    return (
        <ScrollView style={shopStyles.container}>
            <View style={shopStyles.header}>
                <Stars style={shopStyles.stars} stars={data["rating"]} />
                <Text style={shopStyles.shopName}>{data["name"]}</Text>
                <Pressable style={shopStyles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={shopStyles.backText}>⬅️ Back</Text>
                </Pressable>
            </View>
            <View style={shopStyles.body}>
                <View style={shopStyles.buttonHub}>
                    <Pressable style={shopStyles.buttonContainer} onPress={handleCall}>
                        <View style={shopStyles.iconContainer}>
                            <Text style={shopStyles.icon}>📞</Text>
                        </View>
                        <Text style={shopStyles.buttonText}>Call</Text>
                    </Pressable>
                    <Pressable style={shopStyles.buttonContainer} onPress={handleOrder}>
                        <View style={shopStyles.iconContainer}>
                            <Text style={shopStyles.icon}>🌐</Text>
                        </View>
                        <Text style={shopStyles.buttonText}>Order</Text>
                    </Pressable>
                    <Pressable style={shopStyles.buttonContainer} onPress={handleLike}>
                        <View style={shopStyles.iconContainer}>
                            <Text style={shopStyles.icon}>❤️</Text>
                        </View>
                        <Text style={shopStyles.buttonText}>Like</Text>
                    </Pressable>
                </View>
                <View style={shopStyles.hoursList}>
                    <HoursList />
                </View>
            </View>
        </ScrollView>
    )
}