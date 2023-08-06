import React from 'react';
import { Dimensions, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

const MiniCard = (props)=>{
    console.log(
        `Video ID: ${props.videoId}`
    )
    const uri = `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`
    console.log(`uri is ${uri}`)
  return(
    
    <View style={styles.container}>
        <Pressable onPress={() => {console.log("pressed youtube video")
        Linking.openURL(`https://www.youtube.com/watch?v=${props.videoId}`).catch(err => console.error("Couldn't load page", err));
        }}>

        <Image 
           source={{uri}}
           style={styles.image}/>
           
           <View style={styles.infoContainer}>
               <Text style={styles.title}
               ellipsizeMode="tail"
               numberOfLines={3}
               >{props.title}</Text>
               <Text style={styles.channel}>Channel: {props.channel}</Text>
           </View>
        </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        elevation: 4,
    },
    image: {
        height: 220,
        width: 400,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    infoContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    channel: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
    },
})


export default MiniCard;

