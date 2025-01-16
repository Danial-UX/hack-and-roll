import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    welcometext: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    orderbutton: {
        backgroundColor: '#ff9e4d',
        padding: 20,
        borderRadius: 10,
        margin: 16,
        width: width-50
    },
    rewardsbutton: {
        backgroundColor: '#ff9e4d',
        padding: 20,
        borderRadius: 10,
        margin: 16,
        width: width-50
    },
});
