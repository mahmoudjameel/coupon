import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import AppLoading from '../components/InnerLoading';
import { getStores, getCategories } from "../config/DataApp";
import Styles from '../config/Styles';
import { RadioButton, Text, TextInput } from 'react-native-paper';
import Strings from "../config/Strings";
import SearchSelect from '../components/SearchSelect';
import { map, size } from 'lodash';
import ColorsApp from '../config/ColorsApp';
import hexToRgba from 'hex-to-rgba';
import TouchableScale from 'react-native-touchable-scale';
import usePreferences from '../hooks/usePreferences';

export default function SearchWorkout(props) {

	const {navigation} = props;

  const {theme} = usePreferences();
  
  const [query, setQuery] = useState('');

  const [store, setStore] = useState('');
  const [stores, setStores] = useState([]);

  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getStores().then((response) => {
     setStores(response);
   });
  }, []);

  useEffect(() => {
    getCategories().then((response) => {
     setCategories(response);
   });
  }, []);

  useEffect(() => {
    
    if(size(stores) >= 1 || size(categories) >= 1){
      setIsLoaded(true)
    }
    
  }, [stores, categories]);

  const showResults = () => {
    navigation.navigate('searchresults', {
      query: query,
      store: store,
      category: category
    });    
  };

  const onSubmitEditing = (query) => {
    navigation.navigate('searchresults', {query});
  };

  if (isLoaded) {

      return(

    <View style={{flex:1}}>

    <ScrollView
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}>

    <SafeAreaView style={{marginBottom:20}}>
    
    <TextInput
              placeholder={Strings.ST21}
              mode="outlined"
              value={query}
              left={<TextInput.Icon name="magnify" color={ColorsApp.PRIMARY} />}
              style={[Styles.header1Input, {marginHorizontal: 15, marginTop: 10}]}
              theme={{ roundness: 12 }}
              outlineColor={theme === "dark" ? 'transparent' : 'white'}
              activeOutlineColor={hexToRgba(ColorsApp.PRIMARY, '0.3')}
              onChangeText={text => setQuery(text)}
              onSubmitEditing={() => onSubmitEditing(query)}
            />

    <SearchSelect data={stores} showImage={true} title={Strings.ST59} selected={store} setValue={(value) => setStore(value)}/>

    <SearchSelect data={categories} title={Strings.ST69} selected={category} setValue={(value) => setCategory(value)}/>

    </SafeAreaView>

    </ScrollView>

    <TouchableOpacity onPress={() => showResults()} activeOpacity={1}>
    <View style={Styles.button_filter}>
    <Text style={Styles.button_filter_label}>{Strings.ST70}</Text>
    </View>
    </TouchableOpacity>

    </View>

        );

  }else{
   return (
     <AppLoading/>
     );
 }
 
}

