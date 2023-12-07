import { StyleSheet } from "react-native"

export const searchStyles = StyleSheet.create({
    container:{
        paddingBottom: 150
    },
    searchBar: {
        marginTop: "15%",
        height: 60,
        width: "84%",
        borderWidth: 1,
        borderColor:"lightgray",
        margin: "8%",
        borderRadius: 5,
        backgroundColor: "white",
        padding:20,
        fontSize:20
    },
    shopHub:{
        height: "100%",
        width: "100%",
        display: "flex",
        marginBottom: 200
    },
    shopBar: {
        display: "flex",
        flexDirection: "row",
        width: "85%",
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        marginLeft: "8%",
        marginRight: "8%",
        paddingTop: "6%",
        paddingBottom: "6%",
    },
    shopImage:{
        height: 100,
        width: 100,
        borderRadius: 5,
        marginRight: "6%"
    },
    shopText:{
        justifyContent:"space-between"  
    },
    shopName:{
        fontSize: 17,
        width: 200,
        fontWeight:"bold"
    },
    closed:{
        color: "red"
    },
    open:{
        color: "#9191E9"
    },
    star:{
        width: 9 * 2,
        height: 16 * 2,
        margin: 5
    },
    starHub:{
        display:"flex",
        flexDirection:"row"
    }
})