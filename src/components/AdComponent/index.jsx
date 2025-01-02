import React, { useEffect } from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const AdComponent = (props) => {

    useEffect(() => {
    }, []);


    return (
        <>
            <View style={styles.adParentContainer}>

                <View style={styles.adContainer}>
                    <Image
                        style={styles.imageStyle}
                        source={{ uri: props.adImage }}
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create(
    {
        adParentContainer: {
            width: windowWidth,
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
        },
        adContainer: {
            width: 360,
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
        },
        imageStyle: {
            height: '100%',
            width: '100%',
            // resizeMode: 'contain'
        },

    });

export default AdComponent;