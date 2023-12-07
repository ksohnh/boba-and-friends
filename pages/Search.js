import { View, Text, Button, TextInput, Image, ScrollView, TouchableHighlight } from "react-native";
import { searchStyles } from "../styles/SearchScreen"
import { useState, useEffect } from "react";
import Stars from "./Stars";

export default function App({ route, navigation }) {
    const { data } = route.params;
    const [text, setText] = useState("");
    const testData = {
        "id": "cNNTPEqz5uMY5cjCW7M8oA",
        "alias": "tea-dō-central-sq-cambridge-3",
        "name": "Tea-Dō Central Sq",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/-ie9cX7ABKX6MAcTReCCdw/o.jpg",
        "is_claimed": true,
        "is_closed": false,
        "url": "https://www.yelp.com/biz/tea-d%C5%8D-central-sq-cambridge-3?adjust_creative=PqEn8INaVxSS8dRbLH7qSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=PqEn8INaVxSS8dRbLH7qSA",
        "phone": "+16177508564",
        "display_phone": "(617) 750-8564",
        "review_count": 10,
        "categories": [
            {
                "alias": "bubbletea",
                "title": "Bubble Tea"
            },
            {
                "alias": "juicebars",
                "title": "Juice Bars & Smoothies"
            }
        ],
        "rating": 5,
        "location": {
            "address1": "425 Massachusetts Ave",
            "address2": "4c",
            "address3": "",
            "city": "Cambridge",
            "zip_code": "02139",
            "country": "US",
            "state": "MA",
            "display_address": [
                "425 Massachusetts Ave",
                "4c",
                "Cambridge, MA 02139"
            ],
            "cross_streets": ""
        },
        "coordinates": {
            "latitude": 42.363876,
            "longitude": -71.100404
        },
        "photos": [
            "https://s3-media1.fl.yelpcdn.com/bphoto/-ie9cX7ABKX6MAcTReCCdw/o.jpg",
            "https://s3-media1.fl.yelpcdn.com/bphoto/p3orAPwTBh28wAH68yIM2g/o.jpg",
            "https://s3-media2.fl.yelpcdn.com/bphoto/5PyvsgendDNRPxYBsGbJlg/o.jpg"
        ],
        "hours": [
            {
                "open": [
                    {
                        "is_overnight": false,
                        "start": "1200",
                        "end": "2200",
                        "day": 0
                    },
                    {
                        "is_overnight": false,
                        "start": "1500",
                        "end": "2200",
                        "day": 1
                    },
                    {
                        "is_overnight": false,
                        "start": "1200",
                        "end": "2200",
                        "day": 2
                    },
                    {
                        "is_overnight": false,
                        "start": "1200",
                        "end": "2200",
                        "day": 3
                    },
                    {
                        "is_overnight": false,
                        "start": "1200",
                        "end": "2300",
                        "day": 4
                    },
                    {
                        "is_overnight": false,
                        "start": "1200",
                        "end": "2300",
                        "day": 5
                    },
                    {
                        "is_overnight": false,
                        "start": "1200",
                        "end": "2200",
                        "day": 6
                    }
                ],
                "hours_type": "REGULAR",
                "is_open_now": true
            }
        ],
        "transactions": [
            "pickup",
            "delivery"
        ],
        "messaging": {
            "url": "https://www.yelp.com/raq/cNNTPEqz5uMY5cjCW7M8oA?adjust_creative=PqEn8INaVxSS8dRbLH7qSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=PqEn8INaVxSS8dRbLH7qSA#popup%3Araq",
            "use_case_text": "Message the Business"
        }
    }
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer dc75HXCjF5m44rBC3L0h2iZy6B_PrK0TUH2OzqpXvq_FDb0ngDZw2KvcsXzL2vJ8wPN7K1EEc2D88fuPKAQDMt6Iy0Yg6wzqYMFY8sj_AO-MbxUcDg1AOhnQPzNtZXYx'
        }
    };

    async function handlePress(cur) {
        let shopData = await fetch(`https://api.yelp.com/v3/businesses/${cur.id}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

        // let shopData = testData;
        console.log(shopData);
        navigation.navigate("Shop", {
            data: shopData
        })
    }

    async function handleSubmit(){
        let e = await fetch(`https://api.yelp.com/v3/businesses/search?location=Cambridge%2C%20Massachusetts&term=${text}&sort_by=best_match&limit=20`, options)
          .then(response => response.json())
          .catch(err => console.error(err));
    
        // let e = testData;
        navigation.push("Search", {
          data: e
        })
      }

    return (
        <View style={searchStyles.container}>
            <TextInput style={searchStyles.searchBar} 
            placeholder='Search'
            onChangeText={newText => setText(newText)}
            defaultValue={text}
            onSubmitEditing={handleSubmit}/>
            <ScrollView style={searchStyles.shopHub}>
                {data["businesses"].map((cur, index) =>
                (
                    <TouchableHighlight
                        activeOpacity={0.6} 
                        underlayColor="#DDDDDD" 
                        key={cur.id}
                        onPress={()=> handlePress(cur)} 
                        >
                        <View style={searchStyles.shopBar} >
                            <Image style={searchStyles.shopImage} source={{
                                uri: `${cur.image_url}`,
                            }} />
                            <View style={searchStyles.shopText}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={searchStyles.shopName}>{index + 1}. {cur.name}</Text>
                                <Stars stars={cur.rating} />
                                {cur.is_closed ?
                                    (<Text style={searchStyles.closed}>Closed</Text>)
                                    :
                                    (<Text style={searchStyles.open}>Open</Text>)
                                }
                                <Text>{cur.location.address1}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                )
                )}
            </ScrollView>
        </View>
    );
}