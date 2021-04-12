import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase/app'
import { Button } from 'react-native-elements'

export default function ListReviews({navigation, idRestaurant}) {
    const [userLogged, setUserLogged] = useState(false)

    firebase.auth().onAuthStateChanged((user)=>{
        user ? setUserLogged(true):setUserLogged(false)
    })

    return (
        <View>
            {
                userLogged ?(
                    <Button
                        buttonStyle={styles.btnAddReview}
                        titleStyle={styles.btnTitleAddReview}
                        title="Escribre una opinion"
                        icon={{
                            type:"material-community",
                            name:"square-edit-outline",
                            coolr:"#a376c7"
                        }}
                    />
                ): (
                    <Text 
                    style={styles.mustLoginText}
                    onPress={()=>navigation.navigate("login")}
                    >
                        Para escribir una opinión es necesario estar logeado.(" ")
                        <Text style={styles.loginText}>
                            Pulsa aquí para iniciar sesión.
                        </Text>
                    </Text>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent"
    },
    btnTitleAddReview: {
        color: "#a376c7"
    },
    mustLoginText: {
        textAlign: "center",
        color: "#a376c7",
        padding: 20,
    },
    loginText: {
        fontWeight: "bold"
    },
    viewReview: {
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
})
