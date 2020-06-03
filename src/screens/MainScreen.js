import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput,ScrollView ,Image,TouchableOpacity,Modal,Button} from 'react-native';
import omdbApi from '../api/omdbApi';
import CommentsModal from '../components/CommentsModal';




function Spacer() {
  return <View style={styles.spacer} />;
}


const MainScreen= ({navigation})=>{

  const [modalVisible, setModalVisible] = useState(false);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [editableStateTitle,setEditableStateTitle] = useState(true)
  const [editableStateContent,setEditableStateContent] = useState(true)
  const [state,setState] = useState ({
    searchText:"Enter a movie ...",
    results:[],
    selected:{}
  })
  
  
  const search = ()=> {
   
    omdbApi.get( `&s=/${state.searchText}`).then(({data})=>{
      
      let results =data.Search
     
      setState(prevState=>{ return {...prevState,results} } )  
    })
    .catch((error) => console.error(error))

  }
    

  const openPopup = (id) =>{
    omdbApi.get( `&t=${id}`).then(({ data }) => {
      let result=data;
      setModalVisible(true)
      
      setState(prevState =>{
        return {...prevState,selected:result}
        
      }) 
    })
    
  }
  useEffect ( () => {

    omdbApi.get( "&s=/Movie&plot=full" ).then(({data})=>{
      
      let results =data.Search
      setState(prevState=>{ return {...prevState,results} } )  
    })

   },[])
  
  if (typeof state.results==="undefined"){
    
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Movies Platform</Text>
      <TextInput 
      style={styles.searchbox}
      onChangeText={searchText=> setState (prevState =>{
        return{...prevState,searchText}
      })}
      value={state.searchText}
      onSubmitEditing={search}
      />
      <Text style={styles.titleNotFound}>Movie not Found</Text>
      </View>
      )
  }

  
    
  return (
    
  <View style={styles.container}>
      <Text style={styles.title}>Movies Platform</Text>
      <TextInput
      style={styles.searchbox}
      onChangeText={searchText=> setState (prevState =>{
        return{...prevState,searchText}
      })}
      value={state.searchText}
      onSubmitEditing={search}
      />
      <Button 
      title="Filter by Rating"
      color="#b0e0e6"
      onPress={()=>{navigation.navigate('Rating',{results:state.results})}}
      />
      <Spacer/>
      
      
      <ScrollView style={styles.results}>
        {state.results.map(result=>(
          <TouchableOpacity key={result.imdbID} onPress={() => openPopup(result.Title)}>
            <View style={styles.result}>
              <Image 
              source={{uri:result.Poster}}
              style={styles.image}
              resizeMode="cover"
              />
              <Text style={styles.heading}>{result.Title}</Text> 
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
           
      <Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      >
        <View style={styles.popup}>
          <Text style={styles.popuptitle}>Title: {state.selected.Title}</Text>
          <Text style={styles.popuptext}>Release Data: {state.selected.Released}</Text>
          <Image source={{uri:state.selected.Poster}} style={styles.image} />
          <Text style={styles.popuptext}>IMDB Rating:{state.selected.imdbRating}</Text>
          <Button 
          title="Close"
          onPress={() => {setModalVisible(false)}}
          style={{marginBottom:20}}
          />
          <Spacer />
          <Button 
          title="Comments Section"
          onPress={() => {setCommentsModalVisible(true)}}
          />

            
          <CommentsModal 
            commentsModalVisible={commentsModalVisible}
            setCommentsModalVisible={setCommentsModalVisible}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent ={setContent}
            editableStateTitle ={editableStateTitle}
            setEditableStateTitle = {setEditableStateTitle}
            editableStateContent ={editableStateContent}
            setEditableStateContent={setEditableStateContent}
          />
         
          
         
        </View>

      </Modal>
            

  </View>
  );
}


const styles = StyleSheet.create({
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
  titleNotFound:{
    color:'red',
    fontSize:24,
    fontWeight:'700',
    textAlign:'center',
    marginBottom:20
  },
  searchbox:{
    fontSize:20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: "#FFF",
    borderRadius:8,
    marginBottom:20
  },
  results:{
    flex:1,

  },
  result:{
    flex:1,
    width:'100%',
    marginBottom:20
  },
  heading:{
    color:'#FFF',
    fontSize:18,
    fontWeight:'700',
    padding:20,
    backgroundColor:'#445565'
  },
  image:{
    width:'100%',
    height:300,
    marginBottom:20
  },
  popuptext:{
    marginBottom:20
  },
  popup:{
    padding:20

  },
  popuptitle:{
    fontSize:24,
    fontWeight:'700',
    marginBottom:5,
    alignSelf:'center'
  },
  spacer:{
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
  
});

export default MainScreen;