import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,TextInput, Button, FlatList} from 'react-native';
import omdbApi from '../api/omdbApi';

function Spacer() {
    return <View style={styles.spacer} />;
  }


const RatingScreen  = ({navigation})=>{

   
    const results =navigation.getParam('results')

    const [newResults,setResults] = useState('[]')

    const [rating,setRating] = useState('')


    const ids_movies=results.map(element =>element.imdbID)
    
    
     const useResults=(callback)=>{
         for (var i  in ids_movies){
        omdbApi.get( `&i=${ids_movies[i]}`).then(({ data }) => {
        let result=data
        
        if (rating === result.imdbRating) 
        {return (setResults([result]))   
        }
        else 
        {return null}
        
  
        
      }) 
    }
  
    }
    useEffect ( () => {

        useResults();

    },[])
    
    
        

    return (
        <View style={styles.container}>
           
            <Text style={styles.title}>Rating Screen</Text>
            <Spacer/>
            <Button 
            title="Movies Platform"
            onPress={()=>{navigation.navigate('Main')}}
            />
            <Spacer />
            <Text style={styles.content}>Filter by Rating</Text>
            <TextInput
             style={styles.searchbox} 
             value={rating}
             onChangeText={(newRating)=>setRating(newRating)}
             autoCorrect= {false}
             onSubmitEditing={useResults}
            />
            <FlatList 
            data={newResults} 
            renderItem={({item}) => {
               return (
                    <View>
                        {item.imdbRating==rating 
                        ?<View>
                            <Text style={styles.content}>{item.Title}</Text> 
                            <Text style={styles.content}>IMDB Rating: {item.imdbRating}</Text>
                        </View>
                        : null 
                        }
                        
                    </View>
                )
            
            }}
            keyExtractor={item => item.imdbID}
            >
            
            </FlatList>
           
        </View>




    )


}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#223343',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70,
        paddingHorizontal:20
      },
      title:{
        color:"#FFF",
        fontSize:32,
        fontWeight:'700',
        textAlign:'center',
        marginBottom:20
         
      },
      content:{
        color:"#FFF",
        fontSize:24,
        fontWeight:'700',
        textAlign:'center',
        marginBottom:20
         
      },
      spacer:{
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      searchbox:{
        fontSize:20,
        fontWeight: '300',
        padding: 20,
        width: '100%',
        backgroundColor: "#FFF",
        borderRadius:8,
        marginBottom:20
      }
});

export default RatingScreen;