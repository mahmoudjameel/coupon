import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, ImageBackground} from 'react-native';
import Styles from '../config/Styles';
import {map} from 'lodash';
import {getFeaturedDeals} from "../config/DataApp";
import ConfigApp from "../config/ConfigApp";
import { Avatar, Button, Card, Title, Text, Badge} from 'react-native-paper';
import Heading from './Heading';
import TouchableScale from 'react-native-touchable-scale';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {Grid, Row, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Strings from "../config/Strings";
import Loading from './InnerLoading';
import Rating from './Rating';

export default function ExclusiveDeals() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();
  
  const onChangeScreen = (id, title) => {
    navigation.navigate('singledeal', {id, title});
  };

  useEffect(() => {
    getFeaturedDeals().then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return (
      <Loading/>
      );
  }

  if (isLoaded) {
    return (
      <View style={{marginTop: 20, marginBottom: 10}}>

        {map(items, (item, i) => (

        <TouchableScale key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id, item.title)} activeScale={0.98} tension={100} friction={10}>
        <Card style={Styles.card12}>
          <View style={Styles.badgeLeftTop}>
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 12}}>{item.category}</Text>
          </View>
          {item.exclusive ? <View style={Styles.badgeRightTop}>
          <Icon name="crown" color="#000" size={15}></Icon>
          <Text style={{color: '#000', marginLeft: 5, fontWeight: '600', fontSize: 12}}>{Strings.ST29}</Text>
          </View> : null}
          <Card.Cover source={{ uri: item.gif ? item.gif : item.image }} style={Styles.card12View} />
          {item.timeleft ? <View style={Styles.card12Expire}>
          <Icon name="clock-time-three-outline" color="#fff" size={15} style={{marginRight: 6}}></Icon>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 13}}>{item.timeleft}</Text>
          </View>
          : null}
          {item.verified ? <View style={{marginLeft: 20, marginTop: 13, flexDirection:'row'}}>
          <Icon name="check" color="#32d296" size={15}></Icon>
          <Text style={{color: '#32d296', marginLeft:5, fontWeight: '600', fontSize: 12}}>{Strings.ST71}</Text>
          </View> : null}
          <Card.Title
          title={item.title}
          titleNumberOfLines={1}
          titleStyle={{fontWeight: 'bold', fontSize: 17, marginTop: 0}}
          subtitle={item.tagline}
          subtitleNumberOfLines={1}
          subtitleStyle={{fontSize: 14}}
          />

          <View style={{marginBottom: 15, marginTop:5, marginHorizontal: 10}}>
          <Button icon="content-cut" theme={{ roundness: 100 }} labelStyle={{fontWeight:'bold', fontSize:14}} uppercase={false} contentStyle={{paddingVertical: 7, elevation: 0}} mode="contained">
            {Strings.ST53}
          </Button>
          </View>

        </Card>
        </TouchableScale>

          ))}
      </View>
      );
  }

}