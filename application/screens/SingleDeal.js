import React, { useState, useEffect, useRef, useContext } from 'react';
import { Animated, ScrollView, View, StyleSheet, Linking, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { Text, IconButton, Divider, Button } from 'react-native-paper';
import { getDealById, getLogged } from "../config/DataApp";
import Styles from '../config/Styles';
import { LinearGradient } from 'expo-linear-gradient';
import Strings from "../config/Strings";
import AppLoading from '../components/AppLoading';
import { Col, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShareModal from '../components/ShareModal';
import UserContext from '../context/UserContext';
import { HTMLStyles } from '../config/HTMLStyles';
import { HTMLStylesDark } from '../config/HTMLStylesDark';
import HTMLView from 'react-native-htmlview';
import ExclusiveContent from '../components/ExclusiveContent';
import { useIsFocused } from '@react-navigation/native';
import usePreferences from '../hooks/usePreferences';
import ColorsApp from '../config/ColorsApp';
import * as Clipboard from 'expo-clipboard';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function SingleDeal(props) {

  const width = Math.round(Dimensions.get('window').width);

	const isFocused = useIsFocused();
  const {theme} = usePreferences();

  const userState = useContext(UserContext);
  const userInfo = userState.user;

  const { route } = props;
  const { navigation } = props;
  const { id } = route.params;
  const [isLoaded, setIsLoaded] = useState(false);
  const [share, setShare] = useState(false);
  const [item, setItem] = useState([]);
  const [isLogged, setisLogged] = useState('');

  const onChangeScreen = (screen) => {
    navigation.navigate(screen);
  };

  const openShare = () => {
    setShare(true);
  }

  const closeShare = () => {
    setShare(false);
  }

const checkLogged = async () => {
  const response = await getLogged();
  setisLogged(response);
}

useEffect(() => {
  checkLogged();
}, [isFocused]);

const copyCode = (code) => {
  Clipboard.setString(code);
  showMessage({
    message: Strings.ST56,
    type: "success",
    style: [{
      alignItems:'center'
    }]
  });
}

const openLink = (url) => {
  Linking.openURL(url);
};

const rightButtons = () => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
    <IconButton icon="share-variant" size={24} style={{marginHorizontal: 10}} onPress={() => openShare()}/>
    </View>
    )
};

useEffect(() => {

  props.navigation.setOptions({
    headerTintColor: theme === "dark" ? 'white' : 'black',
    headerRight: () => rightButtons(),
  });

}, []);

useEffect(() => {
      checkLogged();
}, []);

useEffect(() => {

  getDealById(id).then(response => {
      setItem(response[0]);
      setIsLoaded(true);
  })

}, []);

      if (isLoaded) {

        if(item.exclusive === 1 && isLogged === "false"){

          return (
            <ExclusiveContent/>
            );

        }else{

          return (

            <ScrollView
            contentContainerStyle={{flex: 1}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>

            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>

            <ImageBackground source={{uri: item.store_image}} resizeMode={"contain"} borderRadius={10} style={{width: width*0.30, height: width*0.30}}/>

            <Text style={{fontSize: 20, textAlign:'center', fontWeight: 'bold', marginTop: 30, marginBottom: 15}}>{item.title}</Text>

            {item.code ? <View style={{flexDirection:'row'}}>
              <Text style={{fontSize: 18, marginHorizontal: 5}}>{Strings.ST54}</Text>
              <TouchableOpacity onPress={() => openLink(item.link)} activeOpacity={1}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: ColorsApp.PRIMARY}}>{item.store}</Text>
              </TouchableOpacity>
            </View> : null}

            {item.code ? <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor: theme === "dark" ? '#333' : '#eee', paddingHorizontal: 20, paddingVertical: 20, borderRadius: 100, marginTop: 20}}>
              <Text style={{fontSize: 18, fontWeight:'bold', marginHorizontal: 10}}>{item.code}</Text>
              <Button mode="contained" labelStyle={{fontWeight:'bold', letterSpacing: 0, fontSize:15}} uppercase={false} theme={{roundness: 50}} style={{elevation:0}} onPress={() => copyCode(item.code)}>
              {Strings.ST55}
              </Button>
            </View> : null}

            {!item.code ? <View style={{marginTop: 20}}>
              <Text style={{fontSize: 18, opacity: 0.5, fontWeight:'bold', marginHorizontal: 10, marginBottom: 15}}>{Strings.ST57}</Text>
              <Button mode="contained" labelStyle={{fontWeight:'bold', letterSpacing: 0, fontSize:15}} uppercase={false} theme={{roundness: 50}} contentStyle={{paddingVertical: 10}} style={{elevation:0}} onPress={() => openLink(item.link)}>
              {Strings.ST58}
              </Button>
            </View>
            : null}

            <View style={{marginHorizontal: 20}}>
            <View style={{height: 1, backgroundColor: theme === "dark" ? '#333' : '#eee', marginTop: 20}} />
            <Text style={{fontWeight:'bold', marginTop: 20, marginBottom: 5}}>{Strings.ST60}</Text>
            {item.expire ? <Text>{Strings.ST72} {item.expire ? item.expire : null}</Text> : null}
            <Text style={{marginBottom: 20, marginTop: 10}}>{item.description}</Text>
            <View style={{height: 1, backgroundColor: theme === "dark" ? '#333' : '#eee'}} />
            </View>

            <ShareModal isVisible={share} closeModal={closeShare} itemData={item}/>
  
            </View>
            </ScrollView>
  
             );

        }

     }else{
       return (
         <AppLoading/>
         );
     }

   }


