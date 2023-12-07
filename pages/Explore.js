// import { Text,View} from "react-native"
// import { exploreStyles } from "../styles/ExploreScreen"
// import { useEffect, useState } from "react"
// import {db, getDocs, doc, onAuthStateChanged, query, collection, where, auth} from "../src/firebase/config.js"

// export default function Explore(){


//     const [user, setUser] = useState(null);
//     const [listOfUsers, setListOfUsers] = useState([]);
//     useEffect(async ()=>{
//         onAuthStateChanged(auth, (curUser)=>{
//           if(curUser){
//             getDoc(doc(db, "users", curUser.uid))
//               .then((ss) => {
//                 if(ss){
//                   console.log(ss.data())
//                   setUser(ss.data())
//                 }
//               }).catch((error) =>{
//                 console.log(error.message)
//               })
//           }
//           else{
//             setUser(null);
//           }
//         })

//         let ss = await getDocs(query(collection(db,"users")))
//         ss.forEach((doc)=>{
//             setListOfUsers(...listOfUsers, doc.data());
//         })
//       },[])

//       useEffect(()=>{
//         console.log(listOfUsers);
//       },[listOfUsers])

//       function ListOfUsers(){
//         let ar = [];
//         let ret = (<></>)
//         if(listOfUsers.length > 0){
//             console.log(listOfUsers)
//             ret = listOfUsers.map((value, index)=>{
//                 <View>Hello</View>
//             })
//         }
//         return ret;
//       }

//     return (
//     <View style={exploreStyles.container}>
//         <ListOfUsers/>
//     </View>
//     )
// }