import React, {useState, useEffect} from 'react'
import { StyleSheet, Dimensions, Text, View, ScrollView, Alert } from 'react-native'
import { Button, Input, Icon, Avatar, Image } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { size, map, filter } from 'lodash'
import MapView from 'react-native-maps'

import { getCurrentLocation, loadImageFromGallery } from '../../utils/helpers'
import Modal from '../Modal'


const widthScreen = Dimensions.get("window").width

export default function AddRestaurantForm({ toastRef, setLoading, navigation }) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)    
    const [locationRestaurant, setLocationRestaurant] = useState(null)

    const addRestaurant = () =>{
        console.log(formData)
        console.log("ok")
    }

    return (
        <ScrollView style={styles.viewContainer}>
            <ImageRestaurant
                imageRestaurant={imagesSelected[0]}
            />
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
                locationRestaurant={locationRestaurant}
                setIsVisibleMap={setIsVisibleMap}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
            <MapRestaurant 
                isVisibleMap={isVisibleMap}  
                setIsVisibleMap={setIsVisibleMap} 
                setLocationRestaurant={setLocationRestaurant} 
                toastRef={toastRef} 
                locationRestaurant={locationRestaurant}
            />
        </ScrollView>
    )
}

function MapRestaurant({isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef, locationRestaurant}){
    const [newRegion, setNewRegion] = useState(null)
    useEffect(() => {
        (async()=>{
            const response = await getCurrentLocation()
            if(response.status){
                setNewRegion(response.location)
               
            }
        })()
    }, [])

    const confirmLocation = () =>{
        setLocationRestaurant(newRegion)
        toastRef.current.show("Localización guardada correctamente.", 3000)
        setIsVisibleMap(false)
    }

    return(
        <Modal isVisible={isVisibleMap} setIsVisibleMap={setIsVisibleMap}>
                <View>
                    {console.log(newRegion)}
                    {
                        newRegion && (
                            <MapView
                                style={styles.mapStyle}
                                initialRegion={newRegion}
                                showsUserLocation={true}
                                onRegionChange={(region)=>setNewRegion(region)}
                            >
                                <MapView.Marker
                                    coordinate={{
                                        latitude: newRegion.latitude,
                                        longitude: newRegion.longitude
                                    }}
                                    draggable
                                />
                            </MapView>
                        )
                    }
                    <View style={styles.viewMapBtn}>
                        <Button
                            title="Guardar Ubicación"
                            containerStyle={styles.mapBtnSaveContainer}
                            buttonStyle={styles.mapBtnSave}
                            onPress={confirmLocation}
                        />
                        <Button
                            title="Cancelar Ubicación"
                            containerStyle={styles.mapBtnCancelContainer}
                            buttonStyle={styles.mapBtnCancel}
                            onPress={()=>setIsVisibleMap(false)}
                        />
                    </View>
                </View>
        </Modal>
    )
}

function ImageRestaurant({imageRestaurant}){
    return(
        <View style={styles.viewPhoto}>
            <Image
                style={{width: widthScreen,height:200}}
                source={
                    imageRestaurant
                    ? {uri:imageRestaurant}
                    : require('../../assets/no-image.png')
                }
            />
            
        </View>
    )
}

function UploadImage({toastRef,imagesSelected,setImagesSelected}){

    const imageSelect = async() =>{
        const response = await loadImageFromGallery([4,3])
        if(!response.status){
            toastRef.current.show("No has seleccionado ninguna imagen.",3000)
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    
const removeImage=(image)=>{
    Alert.alert(
        "Eliminar Imagen",
        "¿Estás seguro que quieres elminar la imagen?",
        [
            {
                text: "No",
                style:"cancel"
            },
            {
                text: "Si",
                onPress: () => {
                    setImagesSelected(
                        filter(imagesSelected, (imageUrl) => imageUrl !== image)
                    )
                }
            }
        ],
        {
            cancellable: true
        }
    )
}

    return(
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
            {
                size(imagesSelected)<10 && (
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                    )
           
                }

            {
            map(imagesSelected,(imageRestaurant, index)=>(
                <Avatar
                    key={index}
                    style={styles.miniatureStyle}
                    source={{uri: imageRestaurant}}
                    onPress={() => removeImage(imageRestaurant) }
                />
            ))
            }
        </ScrollView>
    )
}


function FormAdd(
    {
        formData, 
    setFormData, 
    errorName, 
    errorDescription, 
    errorEmail, 
    errorAddress, 
    errorPhone,
    locationRestaurant,
    setIsVisibleMap
}
){


    const [country, setCountry] = useState("CO")
    const [callingCode, setCallingCode] = useState("57")
    const [phone, setPhone] = useState("")

    const onChange = (e, type)=>{
        setFormData({...formData,[type] : e.nativeEvent.text})
    }
    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del Restaurante"
                defaultValue={formData.name}
                onChange={(e)=> onChange(e,"name")}
                errorMessage={errorName}
            />
            <Input
                placeholder="Dirección del Restaurante"
                defaultValue={formData.address}
                onChange={(e)=> onChange(e,"address")}
                errorMessage={errorAddress}
                rightIcon={{
                    type: "material-community",
                    name:"google-maps",
                    color: locationRestaurant?"#442484":"#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input
                placeholder="Email del Restaurante"
                keyboardType="email-address"
                defaultValue={formData.email}
                onChange={(e)=> onChange(e,"email")}
                errorMessage={errorEmail}
            />
           <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country)=>{
                        setFormData({
                            ...formData, 
                            "country":country.cca2,
                            "callingCode":country.callingCode[0]
                        })
                  
                    }}
                />
                <Input
                    placeholder="Whatsapp del restaurante.."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e)=> onChange(e,"phone")}
                    errorPhone={errorPhone}
                />
           </View>
                <Input
                    placeholder="Descripción del restaurante.."
                    multiline
                    containerStyle={styles.textArea}
                    defaultValue={formData.description}
                    onChange={(e)=> onChange(e,"description")}
                    errorMessage={errorDescription}
                />
        </View>
    )
}

const defaultFormValues = () =>{
    return{
        name:"",
        description:"",
        phone:"",
        email:"",
        address:"",
        country:"CO",
        callingCode:"57"
    }
    
}

const styles = StyleSheet.create({
    viewContainer:{
        height: "100%"
    },
    viewForm:{
        marginBottom: 10
    },
    textArea:{
        height:100,
        width: "100%"
    },
    phoneView:{
        width: "80%",
        flexDirection: "row"
    },
    inputPhone:{
        width: "80%"
    },
    btnAddRestaurant:{
        margin: 20,
        backgroundColor: "#442484"
    },
    viewImage:{
        flexDirection: "row",
        marginHorizontal:20,
        marginTop:30
    },
    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle:{
        width: 70,
        height:70,
        marginRight:10
    },
    viewPhoto:{
        alignItems:"center",
        height:200,
        marginBottom: 20
    },
    mapStyle:{
        width:"100%",
        height:500
    },
    viewMapBtn:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:10
    },
    mapBtnSaveContainer:{
        paddingRight:5
    },
    mapBtnCancelContainer:{
        paddingLeft: 5
    },
    mapBtnSave:{
        backgroundColor: "#442484"
    },
    mapBtnCancel:{
        backgroundColor: "#a65273"
    }
})
