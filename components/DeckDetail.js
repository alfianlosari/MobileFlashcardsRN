import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'; 
import TextButton from './TextButton'; 
import { black, white } from '../utils/colors';

class DeckDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;
        return {
            title
        }
    }

    addCard = () => {
        const { navigation } = this.props;
        const { deckId } = navigation.state.params;            
        navigation.navigate('AddCard', { deckId }) 
    }

    startQuiz = () => {
        const { navigation } = this.props;
        const { deckId } = navigation.state.params;  
        navigation.navigate('Quiz',{ deckId })
    }

    render() {
        const { deck } = this.props;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.deckView}>
                    <Text style={{fontSize: 36}}>{deck.title}</Text>
                    <Text style={{fontSize: 27, color: '#c0c0c0'}}>{deck.questions.length} cards</Text>
                </View>

                <TextButton style={{margin: 20}} buttonColor={white} textColor={black} viewStyle={{marginBottom: 10, borderWidth: 1}} onPress={this.addCard}>
                    Add Card
                </TextButton>

                <TextButton style={{margin: 20}} buttonColor={black} textColor={white} onPress={this.startQuiz}>
                    Start Quiz
                </TextButton>
         
            </ScrollView>
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
    deckView: {
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 100
    }
});

function mapStateToProps(decks, { navigation }) {
    const { deckId } = navigation.state.params;    
    return {
        deck: decks[deckId]
    }
}

export default connect(mapStateToProps)(DeckDetail)
