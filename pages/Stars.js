import { Text, View, Image } from "react-native";
import { searchStyles } from "../styles/SearchScreen";
import { useEffect } from "react";

export default function Stars({ stars }) {

    const rating = Math.round(stars)
    const empty = 5 - rating
    let ar = [];
    let src = require("../assets/filledStar.png")
    let emptySrc = require("../assets/emptyStar.png")

    for (let i = 0; i < rating; i++) {
        ar.push(<Image
            key={i}
            style={searchStyles.star}
            source={src}
        />)
    }
    for (let i = 0; i < empty; i++) {
        ar.push(<Image
            key={i+rating}
            style={searchStyles.star}
            source={emptySrc}
        />)
    }

    return (<View style={searchStyles.starHub}>{ar}</View>);

}