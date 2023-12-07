import { StyleSheet } from 'react-native';


// style sheet for the user page
export const userStyles = StyleSheet.create({
    container: {
        flex: 1,
        margin: "8%",
    },
    profileUpperBar:{
        marginTop: 20,
        flexDirection: "row",
        justifyContent:"space-between"
    },
    profilePic: {
        width: 100,
        height: 100,
    },
    likedShops: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
    },
    numberOfShops:{
        fontSize: 18,
        fontWeight:"600"
    },
    likedShopsText: {
        fontSize: 18,
        color: "gray"
    },
    profileName:{
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 5,
        fontSize: 18
    },
    profileBio:{
        fontSize: 18
    },
    logoutButton:{
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
        height: 40,
        backgroundColor:"#C2AFF0",
        borderRadius: 5,
        justifyContent: "center",
        alignItems:"center"
    },
    logoutText:{
        fontWeight: "600",
        fontSize: 18,
        color: "white"
    },
    shopList:{
        width: "100%",
        flex: 1,
        flexDirection:"row",
        justifyContent:"space-between",
        flexWrap:"wrap"
    },
})