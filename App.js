import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default function App() {
  const [theme, setTheme] = useState(false)
  const [entryNumber, setEntryNumber] = useState('')
  const [historyNumber, setHistoryNumber] = useState('')
  const buttons = ['C', 'DEL', '/', 7, 8, 9, '*', 4, 5, 6, '+', 1, 2, 3, '-', 0, '.', '=']

  const styles = StyleSheet.create({
    container: {
      flex: 0.5,
    },

    result: {
      backgroundColor: theme ? '#282f3b' : '#f5f5f5',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      maxWidth: '100%',
      height: '52.5vh',
    },

    resultText: {
      maxHeight: 45,
      color: '#ff6666',
      margin: 15,
      fontSize: 35,
    },

    historyText: {
      color: theme ? '#b5b7bb' : '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
      paddingTop: 100
    },

    themeButton: {
      backgroundColor: theme ? '#7b8082' : '#e5e5e5',
      alignSelf: 'flex-start',
      buttom: '5%',
      margin: 15,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      position: 'absolute'
    },

    buttons: {
      width: '100%',
      height: '35%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    button: {
      borderColor: theme ? '#3f4d6b' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '25%',
      minHeight: '54%',
      flex: 2,
    },

    textButton: {
      color: theme ? '#b5b7bb' : '#7c7c7c',
      fontSize: 28,
    }
  });

  const handleInput = (btnPressed) => {

    if(btnPressed === '+' || btnPressed === '-' || btnPressed === '*' || btnPressed === '/'){
      setEntryNumber(entryNumber + btnPressed)
      return;
    }

    switch(btnPressed){
      case 'DEL':
        setEntryNumber(entryNumber.substring(0, (entryNumber.length - 1)))
        return
      case 'C':
        setHistoryNumber('')
        setEntryNumber('')
        return
      case '=':
        setHistoryNumber(entryNumber + '=')
        calculate()
        return
    }

    setEntryNumber(entryNumber + btnPressed)
  }

  const calculate = () => {

    let lastCalculate = entryNumber[entryNumber.length - 1]

    if(lastCalculate === '/' || lastCalculate === '*' || lastCalculate === '+' || lastCalculate === '-' || lastCalculate === '.'){
      setEntryNumber(entryNumber)
    } else {
      let result = eval(entryNumber).toString()
      setEntryNumber(result)
      return
    }
  }
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.result}>
        <TouchableOpacity style={styles.themeButton}>
          <Icon name={theme ? 'light-up' : 'moon'} size={24} color={theme ? '#ffffff' : '#000000'} onPress={() => theme ? setTheme(false) : setTheme(true)}/>
        </TouchableOpacity>
        <Text style={styles.historyText}>{historyNumber}</Text>
        <Text style={styles.resultText}>{entryNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((btn) => 
          btn === '=' || btn === '/' || btn === '*' || btn === '+' || btn === '-' ?
          <TouchableOpacity key={btn} style={[styles.button, { backgroundColor: '#ff6666', maxWidth: '20%' }]} onPress={() => handleInput(btn)}>
            <Text style={[styles.textButton, { color: '#ffffff', fontSize: 28 }]}>{btn}</Text>
          </TouchableOpacity>
          : btn === 0 ?
            <TouchableOpacity key={btn} style={[styles.button, { 
              backgroundColor: typeof(btn) === 'number' ?
              theme ? '#303946' : '#ffffff' : theme === true ? '#414853' : '#ededed', minWidth: '36%'
          }]} onPress={() => handleInput(btn)}>
              <Text style={styles.textButton}>{btn}</Text>
            </TouchableOpacity>
            : btn === '.' || btn === 'DEL' ?
              <TouchableOpacity key={btn} style={[styles.button, { 
                backgroundColor: btn === '.' ? 
                theme ? '#303946' : '#ffffff' : theme === true ? '#414853' : '#ededed', minWidth: '37%' 
              }]}
                onPress={() => handleInput(btn)}
              >
                <Text style={styles.textButton}>{btn}</Text>
              </TouchableOpacity>
              : btn === 'C' ?
                <TouchableOpacity key={btn} style={[styles.button, { 
                  backgroundColor: typeof(btn) === 'number' ? 
                  theme ? '#303946' : '#ffffff' : theme === true ? '#414853' : '#ededed', minWidth: '36%' 
                }]}
                  onPress={() => handleInput(btn)}
                >
                  <Text style={styles.textButton}>{btn}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity key={btn} style={[styles.button, { 
                  backgroundColor: typeof(btn) === 'number' ? 
                  theme ? '#303946' : '#ffffff' : theme === true ? '#414853' : '#ededed' 
                }]}
                  onPress={() => handleInput(btn)}
                >
                  <Text style={styles.textButton}>{btn}</Text>
                </TouchableOpacity>
        )}
      </View>
    </View>
  );
}