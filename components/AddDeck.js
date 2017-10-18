 import React, { Component } from 'react';
 import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
 import { saveDeckTitle } from '../utils/api';
 import { addDeck } from '../actions';
 import { connect } from 'react-redux';
 import TextButton from './TextButton'; 
 import { black } from '../utils/colors';
 
 import { NavigationActions } from 'react-navigation'; 
 const uuidv4 = require('uuid/v4');
 
 class AddDeck extends Component {

    static CREATE_DECK_TEXT = 'What is the title of your new deck?'

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Deck'
        }
    }
    
    state = {
        title: ''
    }
    
    toDetail = (deckId, title) => {
        this.props.navigation.navigate('DeckDetail', { deckId, title })
	}

    submitDeck = () => {
        const { title } = this.state;
        const { dispatch } = this.props; 
        if (title.length > 0) {
            this.setState(() => ({
                title: ''
            }))
            const id = uuidv4();
            dispatch(addDeck({
                [id]: {
                    id,
                    title,
                    questions: []
                }
            }));

            saveDeckTitle(id, title);
            this.toDetail(id, title);            
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.question}>{AddDeck.CREATE_DECK_TEXT}</Text>
                <TextInput
                    style={styles.textField}
                    onChangeText={(title) => this.setState({title})}      
                    value={this.state.title}
                    placeholder='Deck Title'
                />

                <TextButton style={{margin: 20}} buttonColor={black} onPress={this.submitDeck}>
                    Submit
                </TextButton>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    question: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40,
        marginBottom: 20,
        fontSize: 28,
        textAlign: 'center'
    },
    textField: {
        height: 40, width: '80%', borderColor: 'gray', borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 20,
        borderColor: black
    }

  });

  export default connect()(AddDeck)
