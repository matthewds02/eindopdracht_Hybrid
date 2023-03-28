import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';

const DeleteRecipeModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>Weet je zeker dat je dit recept wilt verwijderen?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.modalCancel}>Nee</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <Text style={styles.modalConfirm}>Ja</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalCancel: {
    color: '#666',
    marginRight: 16,
  },
  modalConfirm: {
    color: 'red',
  },
});

export default DeleteRecipeModal;
