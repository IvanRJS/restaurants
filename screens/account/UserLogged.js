import React, {useState,useRef,useEffect} from 'react'
import { Button } from 'react-native-elements'
import { StyleSheet, Text, View } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Toast from 'react-native-easy-toast'

import { closeSession, getCurrentUser } from '../../utils/actions'
import Loading from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'

export default function UserLogged() {
    const navigation = useNavigation()
    const toastRef = useRef()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(false)

    useEffect(() => {
        setUser(getCurrentUser())
    }, [])


    return (
        <View style={styles.container}>
            {
              user &&  (
                  <View>
                      <InfoUser 
                        user={user} 
                        setLoading={setLoading} 
                        setLoadingText={setLoadingText}
                       />
                      <Text>Account Options</Text>
                  </View>
              )
            }

            <Button
                title="Cerrar sesión"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionTitle}
                onPress={()=>{
                    closeSession()
                    navigation.navigate("restaurants")

                }
                }
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text={loadingText}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        minHeight:"100%",
        backgroundColor:"#f9f9f9"
    },
    btnCloseSession:{
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#442484",
        borderBottomWidth: 1,
        borderBottomColor: "#442484",
        paddingVertical: 10
    },
    btnCloseSessionTitle:{
        color:"#442484"
    }
})
