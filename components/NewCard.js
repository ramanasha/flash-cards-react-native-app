import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { addCardToDeck } from '../utils/api';
import { white, black, gray } from '../utils/colors';

export default class NewCard extends React.Component {

  state = {
    questionText: '',
    answerText: '',
  };

  handleQuestionTextChange = text => {
    this.setState({
      questionText: text,
    });
  };

  handleAnswerTextChange = text => {
    this.setState({
      answerText: text,
    });
  };

  resetToDeckDetails = deck => NavigationActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({
        routeName: 'Home',
        params: {
          deck: deck,
        },
      }),
      NavigationActions.navigate({
        routeName: 'DeckDetails',
        params: {
          deck: deck,
        },
      }),
    ],
  });

  handleSubmit = () => {
    const card = {
      question: this.state.questionText,
      answer: this.state.answerText,
    };
    addCardToDeck(this.props.navigation.state.params.deck.title, card)
      .then(deck => this.props.navigation.dispatch(this.resetToDeckDetails(deck)));
  };

  render() {
    const { questionText, answerText } = this.state;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput
          value={questionText}
          placeholder='Type a question'
          style={styles.textInput}
          onChangeText={this.handleQuestionTextChange}
        />
        <TextInput
          value={answerText}
          placeholder='And an answer'
          style={styles.textInput}
          onChangeText={this.handleAnswerTextChange}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={this.handleSubmit}
        >
          <Text style={styles.btnText}>
            Submit
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: 300,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: gray,
    marginTop: 30,
    backgroundColor: white,
  },
  submitBtn: {
    backgroundColor: black,
    margin: 5,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
    borderRadius: 5,
  },
  btnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
});

NewCard.propTypes = {
  navigation: PropTypes.object.isRequired,
};
