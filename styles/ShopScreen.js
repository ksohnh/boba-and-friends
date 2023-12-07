import { StyleSheet } from "react-native"

export const shopStyles = StyleSheet.create({
    container:{
        backgroundColor: "lightgray"
    },
    header:{
        height: 300,
        padding:"8%",
        flexDirection:"column-reverse"
    },
    shopName:{
        fontSize:45,
        color:"white",
        fontWeight:"600"
    },
    body:{
        backgroundColor:"white",
        height: "200%"
    },
    buttonHub:{
        flexDirection:"row",
        width: "100%",
        justifyContent:"space-evenly"
    },
    buttonContainer:{
        marginTop: 30,
        height: 90,
        width: 90,
        borderRadius: 5,
        alignItems:"center",
        justifyContent:"space-around"
    },
    iconContainer:{
        borderRadius: "50%",
        height: 70,
        width: 70,
        backgroundColor: "#C2AFF0",
        alignItems:"center",
        justifyContent:"center",
        marginBottom: 20
    },
    icon:{
        fontSize:30
    },
    buttonText:{
        color: "#9191E9",
        fontWeight:"500"
    },
    hoursList:{
        margin: 10,
        height: 100
    },
    hoursListItem:{
        width: 100,
        height: 100,
        backgroundColor:"black",
        margin: 10
    },
    closed:{
        color:"red",
        fontSize: 18,
    },
    open:{
        color:"#9191E9",
        fontSize: 18,
    },
    downArrow:{
        fontSize: 13,
    },
    dayName:{
        color:"#9191E9",
        fontSize: 18,
        marginRight: 30
    },
    hours:{
        fontSize: 18
    },
    hoursMenuItem:{
        fontSize: 18,
        flexDirection:"row"
    },
    hoursMenu:{
        margin: 10,
        marginTop: 20,
        borderWidth: 2,
        padding: 10,
        borderColor: "lightgray"

    },
    hoursSentence:{
        margin: 10,
        marginTop: 20,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderWidth: 2,
        padding: 10,
        borderColor: "lightgray"
    },
    backButton:{
        marginBottom: 50,
    },
    backText:{
        fontSize: 18,
        color: "#9191E9",
        fontWeight: 600
    }
})