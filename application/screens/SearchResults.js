import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView } from 'react-native';
import Styles from '../config/Styles';
import Strings from "../config/Strings";
import { searchApi } from "../config/DataApp";
import {map} from 'lodash';
import AppLoading from '../components/InnerLoading';
import TouchableScale from 'react-native-touchable-scale';
import { Avatar, Button, Card, Title, Text, Badge} from 'react-native-paper';
import LoadMoreButton from '../components/LoadMoreButton';
import ColorsApp from '../config/ColorsApp';
import EmptyResults from '../components/EmptyResults';
import { Col, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchResults(props) {

  const { route, navigation } = props;
  const { query, category, store } = route.params;

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const onChangeScreen = (id, title) => {
    navigation.navigate('singledeal', {id, title});
  };

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    searchApi(query, category, store, page+1).then((response) => {

      if (!items) {
        setItems(response);
        setLoading(false);
      }else{
        setItems([...items, ...response]);
        setLoading(false);
      }

      if (response.length <= 0) {
        setshowButton(false);
      }

      setIsLoaded(true);

    });

  };

  const renderButton = () => {

    return (
      <LoadMoreButton
      Indicator={loading}
      showButton={showButton}
      Items={items}
      Num={5}
      Click={() => loadMore()}/>
      )
  }

  useEffect(() => {
    searchApi(query, category, store).then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {

    return (
   
        <AppLoading/>
   
         );
   
      }else{

        if (items.length <= 0) {

          return(
           <EmptyResults/>
           );
    
        }else{

 return (

  <ScrollView
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}
>
    
<SafeAreaView>

    <View style={Styles.SearchScreen}>

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

    {renderButton()}

    </View>
    </SafeAreaView>
    </ScrollView>

      );

}

}

}


