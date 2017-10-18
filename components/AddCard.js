import React, { Component } from 'react';
import { Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { saveCardToDeck } from '../utils/api';
import { addCardToDeck } from '../actions';
import { NavigationActions } from 'react-navigation'; 
import TextButton from './TextButton'; 
import { black } from '../utils/colors';
const uuidv4 = require('uuid/v4');

class AddCard extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Card'
        }
    }
        
    state = {
        question: '',
        answer: ''
    }

    submitCard = () => {
        const { question, answer } = this.state;
        const { dispatch, navigation } = this.props; 
        const { deckId } = navigation.state.params;
        if (question.length > 0 && answer.length > 0) {
            const id = uuidv4();
            const card = { id, question, answer }
            dispatch(addCardToDeck(deckId, card));
            saveCardToDeck(deckId, card);
            this.toDeck();
        }
    }

    toDeck = () => {
        this.props.navigation.goBack();
	}

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <TextInput
                    style={[styles.textField, { marginTop: 40 }]}
                    onChangeText={(question) => this.setState({question})}      
                    value={this.state.question}
                    placeholder='Enter Question'
                />

                <TextInput
                    style={styles.textField}
                    onChangeText={(answer) => this.setState({answer})}      
                    value={this.state.answer}
                    placeholder='Enter Anwer'
                />

                <TextButton style={{margin: 20}} buttonColor={black} onPress={this.submitCard}>
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
    textField: {
        height: 40, width: '80%', borderColor: 'gray', borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 25,
        borderColor: black
    }
});


export default connect()(AddCard)