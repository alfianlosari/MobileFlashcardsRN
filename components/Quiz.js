import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'; 
import { black, white, red, green } from '../utils/colors';
import TextButton from './TextButton'; 
import { setLocalNotification, clearLocalNotification} from '../utils/helpers';

class Quiz extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Quiz"
        }
    }

    state = {
        currentQuestionIndex: 0,
        correct: 0,
        incorrect: 0,
        isQuestion: true,
    }

    submitCorrect = () => {
        this.setState((state) => {
            const count = state['currentQuestionIndex'] + 1
            const correctCount = state['correct'] + 1
            return {
				...state,
                ['currentQuestionIndex']: count,
                ['correct']: correctCount,
                isQuestion: true
			}
        })
    }

    submitIncorrect = () => {
        this.setState((state) => {
            const count = state['currentQuestionIndex'] + 1
            const incorrectCount = state['incorrect'] + 1
            return {
				...state,
                ['currentQuestionIndex']: count,
                ['incorrect']: incorrectCount,
                isQuestion: true
			}
        })
    }

    toggleQuestion = () => {
        this.setState((state) => {
            const isQuestion = !state['isQuestion']
            return {
                ...state,
                ['isQuestion']: isQuestion
            }
        })
    }

    resetQuiz = () => {
        this.setState({
            currentQuestionIndex: 0,
            correct: 0,
            incorrect: 0,
            isQuestion: true,
        });
    }

    toDeck = () => {
        this.props.navigation.goBack();
    }
    
    quizCompleted = () => {
        clearLocalNotification();
        setLocalNotification();
    }

    render() {
        const { deck } = this.props;
        const { currentQuestionIndex } = this.state;
        if (deck === null) {
            return (
                <ScrollView contentContainerStyle={styles.containerCenter} style={styles.container}>
                    <Text style={styles.textInfo}>Fetching Cards...</Text>
                </ScrollView>
            )
        }

        if (deck.questions.length === 0) {
            return (
                <ScrollView contentContainerStyle={styles.containerCenter} style={styles.container}>
                    <Text style={[styles.textInfo, {marginBottom: 10}]}>No Cards. Please Add Card to Deck</Text>
                    <TextButton style={{margin: 20}} buttonColor={white} textColor={black} viewStyle={{marginBottom: 10, borderWidth: 1}} onPress={this.toDeck}>
                        Back To Deck
                    </TextButton>
                </ScrollView>
            )
        }


        if (currentQuestionIndex >= deck.questions.length) {
            this.quizCompleted();
            return (
                <ScrollView contentContainerStyle={styles.containerCenter}>
                    <Text style={[styles.textInfo, {marginBottom: 10}]}>Quiz Finished</Text>
                    <Text style={[styles.textInfo, {marginBottom: 20}]}>{(this.state.correct / deck.questions.length) * 100}% Correct</Text>
                    <TextButton style={{margin: 20}} buttonColor={white} textColor={black} viewStyle={{marginBottom: 10, borderWidth: 1}} onPress={this.toDeck}>
                        Back To Deck
                    </TextButton>
                    <TextButton style={{margin: 20}} buttonColor={black} textColor={white} onPress={this.resetQuiz}>
                        Restart Quiz
                    </TextButton>
                </ScrollView>
            )
        }

        return (
            <ScrollView contentContainerStyle={styles.containerStart}>
                <Text style={{color: '#4a4a4a', fontSize: 20, alignSelf: 'flex-start', margin: 16}}>{`${currentQuestionIndex + 1}/${deck.questions.length}`}</Text>
                {
                    this.state.isQuestion
                    ?  <Text style={styles.textMain}>{deck.questions[currentQuestionIndex].question}</Text>
                    :  <Text style={styles.textMain}>{deck.questions[currentQuestionIndex].answer}</Text>
                }
                <TouchableOpacity onPress={this.toggleQuestion}>
                    {
                        this.state.isQuestion
                        ?  <Text style={styles.textFlip}>Show Answer</Text>
                        :  <Text style={styles.textFlip}>Question</Text>
                    }

                </TouchableOpacity>

                <TextButton style={{margin: 20}} buttonColor={green} textColor={white} viewStyle={{marginBottom: 10}} onPress={this.submitCorrect}>
                    Correct
                </TextButton>
                <TextButton style={{margin: 20}} buttonColor={red} textColor={white} onPress={this.submitIncorrect}>
                    Incorrect
                </TextButton> 
            </ScrollView>       
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },containerStart: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    textInfo: {
        fontSize: 30,
        marginLeft: 16,
        marginRight: 16,
        textAlign: 'center'
    },
    textMain: {
        fontSize: 36,
        marginTop: 80,
        marginBottom: 10,
        marginLeft: 16,
        marginRight: 16,
        textAlign: 'center'
    },
    textFlip: {
        color: red,
        fontSize: 18,
        marginBottom: 80
    },
    containerCenter: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });

function mapStateToProps(decks, { navigation }) {
    const { deckId } = navigation.state.params;    
    return {
        deck: decks[deckId]
    }
}

export default connect(mapStateToProps)(Quiz)