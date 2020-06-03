import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput,Button,Modal} from 'react-native';

function Spacer() {
    return <View style={styles.spacer} />;
  }


const CommentsModal = ({
    commentsModalVisible,
    setCommentsModalVisible,
    title,
    setTitle,
    content,
    setContent,
    editableStateTitle,
    setEditableStateTitle,
    editableStateContent,
    setEditableStateContent
})=>{

    
    
    return (
        <View>
            
            <Modal 
            animationType="fade"
            transparent={false}
            visible={commentsModalVisible}
            >
            <View>
                <Text style={styles.popuptitle}>Comments Section</Text>
                <Text style={styles.label}>Name:</Text>
                <TextInput 
                style= {styles.input} 
                value={title} 
                onChangeText={(text)=>setTitle(text)}
                editable={editableStateTitle}
                onEndEditing={()=>setEditableStateTitle(false)}
                  />
                <Text style={styles.label}>Comment:</Text>
                <TextInput 
                style= {styles.input} 
                value={content} 
                onChangeText={(text)=>setContent(text)}
                editable={editableStateContent}
                onEndEditing={()=>setEditableStateContent(false)}
                />
                <Text>{title} </Text>
                {content? <Text>wrote: {content} </Text> : null}
                <Spacer />
                <Button title="Close"   onPress={() =>{setCommentsModalVisible(false)
                setTitle("")
                setContent("")
                setEditableStateContent(true)
                setEditableStateTitle(true)
                }} />
            </View>
            </Modal>
        </View>

    )}



const styles = StyleSheet.create ({
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
      },
      input: {
        fontSize:18,
        borderWidth:1,
        borderColor:'black',
        marginBottom:15,
        padding:5,
        margin:5
    },
    label:{
        fontSize:20,
        marginBottom:5,
        marginLeft:5
    }



})
export default CommentsModal;