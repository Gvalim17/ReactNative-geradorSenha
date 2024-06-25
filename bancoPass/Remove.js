import React, { useState } from 'react';
import { Alert, View, TextInput, Button, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { create } from './Create.js';
import { commonStyles } from './styles.js';

export function Remove() {
    const [modalVisible, setModalVisible] = useState(false);
    const [inputName, setInputName] = useState('');

    const remove = async () => {
        try {
            const db = await create();
            const result = await db.runAsync(`DELETE FROM passwords WHERE name = ?;`, [inputName]);
            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    'Password removed',
                    [{ text: 'Ok' }],
                    { cancelable: false }
                );
                setInputName('');
            } else {
                Alert.alert('Error', 'Error removing password');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'An error occurred while removing the password');
        }
        setModalVisible(false);
    };

    return (
        <View style={commonStyles.container}>
            <Button title="Delete" onPress={() => setModalVisible(true)} color={"#9F1905"}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={commonStyles.centeredView}>
                    <View style={commonStyles.modalView}>
                        <Text style={commonStyles.modalText}>Digite o nome para DELETAR</Text>
                        <TextInput
                            placeholder="Nome"
                            value={inputName}
                            onChangeText={name => setInputName(name)}
                            style={commonStyles.input}
                        />
                        <View style={commonStyles.buttonContainer}>
                            <TouchableOpacity
                                style={commonStyles.button}
                                onPress={remove}
                            >
                                <Text style={commonStyles.textStyle}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[commonStyles.button, commonStyles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={commonStyles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

