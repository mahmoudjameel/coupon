import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { getDealsByCategory } from "../config/DataApp";
import Styles from '../config/Styles';
import {map} from 'lodash';
import Loading from '../components/InnerLoading';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadMoreButton from '../components/LoadMoreButton';
import Empty from '../components/Empty';
import UserContext from '../context/UserContext';
import Strings from "../config/Strings";
import TouchableScale from 'react-native-touchable-scale';
import Rating from '../components/Rating';

export default function SingleCategory(props) {

  const contextState = useContext(UserContext);
  const userInfo = contextState.user;

  const { route } = props;
  const { navigation } = props;
  const { id, title } = route.params;
  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const onChangeScreen = (id, title) => {
    navigation.navigate('singledeal', {id, title});
  };

useEffect(() => {

  props.navigation.setOptions({
    title:title,
  });

}, []);

  useEffect(() => {

    getDealsByCategory(id).then(response => {
        setData(response);
        setIsLoaded(true);
    })

  }, []);

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getDealsByCategory(id, page+1).then((response) => {

      if (!data) {
        setData(response);
        setLoading(false);
      }else{
        setData([...data, ...response]);
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
      Items={data}
      Num={10}
      Click={() => loadMore()}/>
      )
  }

  if (isLoaded) {

   return (
    <ScrollView
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}>

    <View style={{marginTop: 20, marginHorizontal: 20}}>

        {data && data.length ? null : <Empty/>}

        {map(data, (item, i) => (

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

    <View style={{height: 50}}></View>

    </View>

    </ScrollView>

    );

 }else{
   return (
     <Loading/>
     );
 }

}


