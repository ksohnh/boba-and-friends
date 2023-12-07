import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableHighlight, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { homeStyles } from "../styles/HomeScreen"
import { useEffect } from 'react';
import { auth, onAuthStateChanged, db, doc, getDoc } from '../src/firebase/config';

// home page, the initial starting point of the app
export default function Initial({navigation}) {
  const [text, setText] = useState('');
  // empty data
  const emptyUser = {
    "NumberOfLikes":0,
    "bio":"",
    "email":"",
    "friends":[],
    "likedShops":[],
    "name":""
}
// the api key necessary to make calls
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer dc75HXCjF5m44rBC3L0h2iZy6B_PrK0TUH2OzqpXvq_FDb0ngDZw2KvcsXzL2vJ8wPN7K1EEc2D88fuPKAQDMt6Iy0Yg6wzqYMFY8sj_AO-MbxUcDg1AOhnQPzNtZXYx'
    }
  };

  // empty data
  const testData = 
    {
      "businesses": [
        {
          "id": "cNNTPEqz5uMY5cjCW7M8oA",
          "alias": "tea-dō-central-sq-cambridge-3",
          "name": "Tea-Dō Central Sq",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/-ie9cX7ABKX6MAcTReCCdw/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/tea-d%C5%8D-central-sq-cambridge-3?adjust_creative=PqEn8INaVxSS8dRbLH7qSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=PqEn8INaVxSS8dRbLH7qSA",
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
          "coordinates": {
            "latitude": 42.363876,
            "longitude": -71.100404
          },
          "transactions": [
            "delivery",
            "pickup"
          ],
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
            ]
          },
          "phone": "+16177508564",
          "display_phone": "(617) 750-8564",
          "distance": 1464.9829959044218
        }
      ],
      "total": 236,
      "region": {
        "center": {
          "longitude": -71.11106872558594,
          "latitude": 42.374259574919634
        }
      }
    };
  

  // takes the query put in by the user and makes an api call to yelp fusion
  async function handleSubmit(){
    console.log(text)
    fetch(`https://api.yelp.com/v3/businesses/search?location=Cambridge%2C%20Massachusetts&term=boba&sort_by=best_match&limit=20&origin=*`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if(response["total"] == 0){
          setText("No results");
        }
        else{
          // navigating to the search screen passing the data as props if the data actually returned
          navigation.navigate("Search", {
            data: response
          })
        }
      })
      .catch(err => console.error("error: " + err));
    // let e = testData;    
  }

  const [user, setUser] = useState(emptyUser);
  useEffect(()=>{
    // checking if the user logged in or not
    onAuthStateChanged(auth, (curUser)=>{
      if(curUser){
        getDoc(doc(db, "users", curUser.uid))
          .then((ss) => {
            if(ss){
              console.log(ss.data())
              setUser(ss.data())
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

  // rendering the home screen
  return (
    <ScrollView style={homeStyles.container}>
      <TextInput style={homeStyles.searchBar}
        placeholder='Search'
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        onSubmitEditing={handleSubmit}
      ></TextInput>
      <View style={homeStyles.header}>
        <Text style={homeStyles.headerText}>boba&friends</Text>
      </View>
      <View style={homeStyles.body}>
        {/* conditional rendering of a welcome message if the user is logged in */}
        <View style={homeStyles.bodyContainer}>
        {user ? (  
          <View>
            <Text style={homeStyles.welcomeText}>Hi <Text style={homeStyles.username}>{user.name}!</Text></Text>
            <Text style={homeStyles.welcomeText}>Search up boba shops, and</Text>
            <Text style={homeStyles.welcomeText}>find your next favorite drink!</Text>
          </View>                
          ) : (
<View>
            <Text style={homeStyles.welcomeText}>Please <Text style={homeStyles.username}>Log In!</Text></Text>
          </View>           )}
        </View>
      </View>
      
      {/* <View style={homeStyles.footer}>
        <Text style={homeStyles.footerText}>Made by Kevin Sohn</Text>
        <Text style={homeStyles.footerText}>CS50 Final Project</Text>
      </View> */}
      <StatusBar style="auto" />
    </ScrollView>
  );
}