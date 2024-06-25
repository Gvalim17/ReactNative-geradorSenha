import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Modal, Text, TouchableOpacity } from 'react-native';
import { create } from './Create';
import { commonStyles } from './styles.js';

export function Update() {
    const [updateId, setUpdateId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const update = async () => {
        try {
            const generatedPassword = generatePassword();

            const db = await create();
            const result = await db.runAsync(`UPDATE passwords SET name = ? , password = ? WHERE id = ?;`, [updateName, generatedPassword, updateId]);

            if (result.changes > 0) {
                Alert.alert('Success', 'Password updated', [{ text: 'Ok' }], { cancelable: false });
                setUpdateId('');
                setUpdateName('');
                setNewPassword(generatedPassword);
                setNewPassword('');
                toggleModal();
            } else {
                Alert.alert('Error', 'Error updating password');
            }
        } catch (error) {
            console.log('Error updating password:', error);
            Alert.alert('Error', 'An error occurred while updating the password');
        }
    };

    const generatePassword = (length = 8, useUppercase = true, useNumber = true) => {
        const lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
        const uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numberCharset = "123456789";
        let charset = lowercaseCharset;

        if (useUppercase) charset += uppercaseCharset;
        if (useNumber) charset += numberCharset;

        let password = lowercaseCharset[Math.floor(Math.random() * lowercaseCharset.length)];

        if (useUppercase) {
            password += uppercaseCharset[Math.floor(Math.random() * uppercaseCharset.length)];
        }

        if (useNumber) {
            password += numberCharset[Math.floor(Math.random() * numberCharset.length)];
        }

        for (let i = password.length; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        return password.split('').sort(() => Math.random() - 0.5).join('');
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={commonStyles.container}>
        <Button title="Update" onPress={toggleModal} color={"#9F1905"}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={commonStyles.centeredView}>
                    <View style={commonStyles.modalView}>
                        <Text style={commonStyles.modalText}>Digite o ID para Atualizar</Text>
                        <TextInput
                            placeholder="Digite ID"
                            value={updateId}
                            onChangeText={id => setUpdateId(id)}
                            style={commonStyles.input}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="Novo Nome"
                            value={updateName}
                            onChangeText={name => setUpdateName(name)}
                            style={commonStyles.input}
                        />
                        <TextInput
                            placeholder="Nova Senha (Gerada Automaticamente)"
                            value={newPassword}
                            editable={false}
                            style={commonStyles.input}
                        />
                        <View style={commonStyles.buttonContainer}>
                            <TouchableOpacity
                                style={commonStyles.button}
                                onPress={update}
                                disabled={!updateName || !updateId}
                            >
                                <Text style={commonStyles.textStyle}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={[commonStyles.button, commonStyles.buttonClose]}>
                                <Text style={commonStyles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

