import React, { useState } from 'react';
import { Alert, View, TextInput, Button, Modal, Text, TouchableOpacity } from 'react-native';
import { create } from './Create';
import { commonStyles } from './styles.js';

export function Insert() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const insert = async () => {
        try {
            const db = await create();
            const result = await db.runAsync(`INSERT INTO passwords (name, password) VALUES (?, ?);`, [name, password]);

            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    'Password registered',
                    [{ text: 'Ok' }],
                    { cancelable: false }
                );
                setName('');
                setPassword('');
            } else {
                Alert.alert('Error', 'Error registering password');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'An error occurred while registering the password');
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
        <Button title="Inserir Senha" onPress={toggleModal} color={"#9F1905"}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={commonStyles.centeredView}>
                    <View style={commonStyles.modalView}>
                        <Text style={commonStyles.modalText}>Digite o Nome</Text>
                        <TextInput
                            placeholder="Nome"
                            value={name}
                            onChangeText={setName}
                            style={commonStyles.input}
                        />
                        <TextInput
                            placeholder="Senha (Gerada Automaticamente)"
                            value={password}
                            editable={false}
                            style={commonStyles.input}
                        />
                        <View style={commonStyles.buttonContainer}>
                        <TouchableOpacity
                                style={commonStyles.button}
                                onPress={() => setPassword(generatePassword())}>
                                <Text style={commonStyles.textStyle}>Gerar Senha</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { insert(); toggleModal(); }} disabled={!name} style={[commonStyles.button]}>
                                <Text style={commonStyles.textStyle}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={commonStyles.buttonContainer}>
                            <TouchableOpacity onPress={closeModal} style={[commonStyles.button, commonStyles.buttonClose]}>
                                <Text style={commonStyles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
