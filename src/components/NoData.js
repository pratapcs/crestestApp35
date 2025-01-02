/**
 * Knacks App
 * @author: Schemaphic Systems
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';


export default class NoData extends Component {
    constructor(props) {
        super(props);

        this.state =
        {
            item: props.data,
            backBtn: this.props.backBtn,
            isIcon: this.props.isIcon,
            goBackIcon: this.props.goBackIcon,
            isbackcolor: this.props.isbackcolor,
            isBtnTextColor: this.props.isBtnTextColor,
            isTitle: this.props.isTitle,
            isSubtitle: this.props.isSubtitle,
        }
    }

    render() {
        return (
            <View
                style={styles.notificationNodataContainer}
            >
                {!this.state.isIcon ? (

                    <View>{this.props.Icon}</View>

                ) : (

                    <Image source={this.props.imageIcon} style={styles.noDataImgIcon}  />
                )}

                <Text style={[styles.nodataTitle, { color: (this.state.isTitle) ? this.props.titleColor : '#137999' }]}>{this.props.title}</Text>
                <Text style={[styles.nodataSubTitle, { color: (this.state.isSubtitle) ? this.props.subtitleColor : '#137999' }]}>{this.props.subtitle}</Text>

                {this.state.goBackIcon ? (
                    <View style={styles.gokackBtnView}>
                        <TouchableOpacity
                            onPress={() => this.props.goBackScreen()}
                            style={[styles.gokackBtn, { backgroundColor: (this.state.isbackcolor) ? this.props.backColor : '#5cc151' }]}>
                            <Text style={[styles.gokackBtnText, { color: (this.state.isBtnTextColor) ? this.props.btnTextColor : '#fff'}]}>{this.props.btnTitle}</Text>
                        </TouchableOpacity>
                    </View>
                ) : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        /* Nodata style------ */
        notificationNodataContainer:
        {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // height: 100,
            paddingHorizontal: 30,
            // width: '100%',
            backgroundColor:'#FBBC04',
        },

        noDataImgIcon:
        {
            width: 150,
            height: 150,
            resizeMode:'contain'
        },
        nodataTitle:
        {
            color: '#ffffff',
            fontSize: 24,
            fontWeight: "bold",
            paddingBottom: 10,
            paddingTop: 20,
        },
        nodataSubTitle:
        {
            color: '#ffffff',
            fontSize: 15,
            textAlign: 'center',
        },
        gokackBtnView:
        {
            width: '100%',
            paddingHorizontal: 40,
        },
        gokackBtn:
        {
            backgroundColor: '#5cc151',
            paddingVertical: 12,
            borderRadius: 5,
            marginTop: 20,
            width: '100%',
        },
        gokackBtnText:
        {
            textAlign: 'center',
            color: '#ffffff',
            paddingHorizontal: 50,
        },
        /* End Nodata style------ */
    })