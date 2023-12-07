import { StyleSheet } from "react-native"

export const homeStyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#686868"
    },
    searchBar: {
        zIndex: 10,
        marginTop: 270,
        height: 60,
        width: "84%",
        borderWidth: 1,
        borderColor:"lightgray",
        margin: "8%",
        borderRadius: 5,
        position: "absolute",
        backgroundColor: "white",
        padding:15,
        fontSize:20
    },
    header: {
        height:300,
        flexDirection:"column-reverse",
        padding: "8%",
    },
    headerText:{
        fontSize:45,
        color:"white",
        fontWeight:"600"
    },
    bodyContainer: {
        marginTop: 50,
    },

    welcomeText:{
        margin: "8%",
        marginTop: 0,
        marginBottom: 10,
        fontSize: 25,
        fontWeight: "600"
    },
    username:{
        color: "#457EAC"
    },
    body: {
        backgroundColor:"white",
        height: 400
    },
    portLabel:{
        margin: "8%",
        marginTop: 0,
        marginBottom: 10,
        fontWeight: "300",
        fontSize:20,
        fontStyle:"italic"
    },
    imagePort:{
        marginLeft:"8%",
        marginRight:"8%",
        flex: 2,
        flexDirection:"row",
        justifyContent:"space-between",
        flexWrap: "wrap",
        marginBottom:"8%",
    },
    sampleImage: {
        backgroundColor: "#C2AFF0",
        width: 150,
        height: 150,
        borderRadius: 5,
        marginBottom:27
    },
    button:{
        width:150,
        height:150,
    },
    tinyLogo: {
        width: 150,
        height: 150,
      },
    footer:{
        padding: "8%",
        backgroundColor: "#686868",
        height: 100
    },
    footerText:{
        color:"#C2AFF0",
    },
});