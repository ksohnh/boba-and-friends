import { Text, View, Image } from "react-native";
import { searchStyles } from "../styles/SearchScreen";
import { useEffect } from "react";

export default function Stars({ stars }) {

    // taking the number of stars as props and returning that number of boba cups
    const rating = Math.round(stars)
    const empty = 5 - rating
    let ar = [];
    // the links for the boba cup images
    let src = require("../assets/filledStar.png")
    let emptySrc = require("../assets/emptyStar.png")

    // returning number of filled cups
    for (let i = 0; i < rating; i++) {
        ar.push(<Image
            key={i}
            style={searchStyles.star}
            source={src}
        />)
    }
    // returning number of empty cups (should add up to 5 with the filled cups)
    for (let i = 0; i < empty; i++) {
        ar.push(<Image
            key={i+rating}
            style={searchStyles.star}
            source={emptySrc}
        />)
    }

    return (<View style={searchStyles.starHub}>{ar}</View>);

}