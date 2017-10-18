import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import { connect } from 'react-redux';

class ListDeck extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'My Decks'
        }
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#CED0CE",
            }}
          />
        );
      };

    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => (
             <TouchableOpacity style={styles.deckItem} onPress={() => this.props.navigation.navigate('DeckDetail', { deckId: item.id, title: item.title })}>
                <View style={styles.textContainer}>
                    <Text style={{fontSize: 20}}>{item.title}</Text> 
                    <Text style={{fontSize: 14, color: '#c0c0c0'}}>{item.questions.length} Cards</Text>
                </View>
            </TouchableOpacity>
       
    );

    componentDidMount() {
        const { dispatch } = this.props;
        getDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
    }

    render() {
        const { decks, navigation } = this.props;
        return (
            <FlatList
            data={decks}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={this.renderSeparator}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deckItem: {
        padding: 40,
        backgroundColor: '#fff',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

function mapStateToProps(deck) {
    let decks = Object.keys(deck).map((key) => deck[key])
    return {
        decks
    }
}

export default connect(mapStateToProps)(ListDeck)
