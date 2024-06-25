import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        width: "80%",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    itemContainer: {
        backgroundColor: '#EEE',
        marginTop: 10,
        padding: 30,
        borderRadius: 10,
    },
    textHeader: {
        color: '#111',
        fontSize: 12,
        fontWeight: '700',
    },
    textBottom: {
        color: '#111',
        fontSize: 18,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 10,
    },
    input: {
        height: 40,
        marginVertical: 8,
        minWidth: 200,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        width: '100%',
    },
    closeButtonX: {
        alignSelf: 'flex-end',
    },
    closeButtonTextX: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
        marginHorizontal: 10,
    },
    buttonClose: {
        backgroundColor: '#f44336',
    },

    buttonSave: {
        backgroundColor: 'green',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

