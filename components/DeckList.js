import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getAllDecksTemp } from '../utils/api';
import DeckItem from './DeckItem';
import { getAllDecks } from '../utils/api';

export default class DeckList extends React.Component {

  state = {
    decks: [],
  };

  componentDidMount() {
    getAllDecks().then(decks => this.setState({ decks: decks }));
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <DeckItem deck={item} navigation={this.props.navigation} />
    </View>
  );

  render() {
    const { decks } = this.state;

    return (
      <View>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    justifyContent: 'center',
  },
});
