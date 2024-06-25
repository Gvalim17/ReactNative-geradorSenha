import React, { useState } from 'react';
import { Alert, Button, FlatList, Text, View, Modal, TouchableOpacity } from 'react-native';
import { create } from './Create';
import { commonStyles } from './styles';

export function AllPasswords() {
    const [flatListItems, setFlatListItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const getAll = async () => {
        try {
            const db = await create();
            const allRows = await db.getAllAsync('SELECT * FROM passwords');
            setFlatListItems(allRows);

            if (allRows.length === 0) {
                Alert.alert('Warning', 'No password registered', [{ text: 'Ok' }], { cancelable: false });
            } else {
                setModalVisible(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const listItemView = (item) => (
        <View key={item.id} style={commonStyles.itemContainer}>
            <Text style={commonStyles.textHeader}>Código</Text>
            <Text style={commonStyles.textBottom}>{item.id}</Text>

            <Text style={commonStyles.textHeader}>Nome</Text>
            <Text style={commonStyles.textBottom}>{item.name}</Text>

            <Text style={commonStyles.textHeader}>Senha</Text>
            <Text style={commonStyles.textBottom}>{item.password}</Text>
        </View>
    );

    return (
        <View style={commonStyles.container}>
            <Button title="Listar senhas" onPress={getAll} color={"#9F1905"}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={commonStyles.centeredView}>
                    <View style={commonStyles.modalView}>
                        <TouchableOpacity style={commonStyles.closeButtonX} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={commonStyles.closeButtonTextX}>X</Text>
                        </TouchableOpacity>
                        <FlatList
                            style={{ marginTop: 30 }}
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                            data={flatListItems}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => listItemView(item)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};


