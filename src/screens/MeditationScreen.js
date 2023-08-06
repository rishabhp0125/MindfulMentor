import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import Constant from 'expo-constants';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, TextInput, View } from 'react-native';
import MiniCard from '../components/MiniCard';


const MeditationScreen = ({navigation})=>{
    const {colors} =  useTheme()
    const mycolor = colors.iconColor

    useEffect(() => {
        fetchData();
    }, [])

    const [value,setValue] = useState("5 Minute Meditation")
    const [loading,setLoading] = useState(false)
    const [MiniCardData, setMiniCard] = useState([]) 
    const fetchData = () =>{
        const fetchURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=%225%20minute%20meditation%22&type=video&key=INSERT API KEY"
        setLoading(true)
        fetch(fetchURL)
        .then(res=>{
            console.log(`res is ${JSON.stringify(res)}`)  
            return res.json()
        })
        .then(data=>{
            console.log(data)
            console.log(`JSON data: ${JSON.stringify(data)}`)
            setMiniCard(data.items)
            setLoading(false)
        })
    }

return(
      <View style={{
          flex:1,
          marginTop:Constant.statusBarHeight,
          }}>
          <View style={{
              padding:5,
              flexDirection:"row",
              justifyContent:"space-around",
              elevation:5,
              backgroundColor:colors.headerColor
        
          }}>
            
             <TextInput
             editable={false}
             style={{
                 width:"80%",
                 backgroundColor:"#e6e6e6",
                 color: "#3e3739",
                 height: 35,
                 borderRadius: 20,
                 padding: 10,
                }}
             value={value}          
             onChangeText={(text)=>setValue(text)}
             />
             <Ionicons
              style={{color:'#3e3739'}}
             name="md-send"
             size={32}
             onPress={() => {fetch}}
             />
          </View>
          {loading ?<ActivityIndicator style={{marginTop:30}} size = "large" color = "blue"/>: null}
          <FlatList
           data={MiniCardData}
           renderItem={({item})=>{
               return <MiniCard
                videoId={item.id.videoId}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
               />
           }}
           keyExtractor={item=>item.id.videoId}
          />
        
      </View>
)
        }
        
export default MeditationScreen;





