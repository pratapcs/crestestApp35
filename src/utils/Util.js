/**
 * Knacks App
 * @author: Schemaphic Systems
 */

import React from 'react';
import { Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import regexifyString from 'regexify-string';
import CryptoJS from "react-native-crypto-js";


import {
  SKEY
} from '../store/constants';


export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    console.log("Error in storeData@Util: " + JSON.stringify(e));
  }
}

export const getData = async (key) => {
  return new Promise((resolve, reject) => {

    AsyncStorage.getItem(key)
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        console.log("Error in getData@Util: " + JSON.stringify(err));
        reject(err);
      });
  });
}

export const truncate = (val, len) => {
  return (val.length > len) ? val.substr(0, len - 1) + '&hellip;' : val;
}

export const isConnectionAvailable = () => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      resolve({ status: state.isConnected, type: state.type });
    });
  });
}

export const isValidMobileNumber = (val) => {
  let numbers = '0123456789';

  if (val.length < 10 || val.length > 10) {
    return false;
  }

  for (var i = 0; i < val.length; i++) {
    if (numbers.indexOf(val[i]) < 0) {
      return false;
    }
  }
  return true;
}

export const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
}

export const isNumeric = (val) => {
  let numbers = '0123456789';

  for (var i = 0; i < val.length; i++) {
    if (numbers.indexOf(val[i]) < 0) {
      return false;
    }
  }
  return true;
}

export const log = (val, val2, val3, val4) => {
  val2 = val2 || "";
  val3 = val3 || "";
  val4 = val4 || "";

  console.log(val, val2, val3, val4);
}

export const clearAllData = () => {
  return AsyncStorage.clear();
}

export const alert = (value) => {
  return Alert.alert(value);
}

export const validateEmail = (email) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const addBoldToContent = (content) => {
  content = regexifyString({
    pattern: /\[b\].*?\[\/b\]/gim,
    decorator: (match, index) => {
      return <Text style={{ textDecorationLine: 'underline' }}>{match.replace(/\[b\]|\[\/b\]/gi, '')}</Text>
    },
    input: content,
  });
  return content;
}

export const underlineBoldFormatContent = (content) => {
  content = regexifyString({
    pattern: /\[u\].*?\[\/u\]|\[b\].*?\[\/b\]/gim,
    decorator: (match, index) => {
      if (match.indexOf("[u]") >= 0) {
        return <Text style={{ textDecorationLine: 'underline', color: '#693470', }}>{match.replace(/\[u\]|\[\/u\]/gi, '')}</Text>
      } else if (match.indexOf("[b]") >= 0) {
        return <Text style={{ /* fontWeight: 'bold', */ color: '#693470', }}>{match.replace(/\[b\]|\[\/b\]/gi, '')}</Text>
      } else {
        return match;
      }
    },
    input: content,
  });
  return content;
}

export const getAassembleCatAndSubcat = (mediaCategory, mediaSubCategory) => {
  let cat = mediaCategory;
  let subCat = mediaSubCategory;

  let result = "";

  if (cat != "") {
    result = cat + " | ";
  }

  if (subCat != "") {
    result = result + subCat;
  }

  return result;
}

export const getDisplayValueAsShortForm = (value) => {
  let result;

  if (value < 1000) {
    result = value;
  } else if (value > 999 && value < 1000000) {
    result = Math.floor(value / 1000) + "k";
  } else {
    result = Math.floor(value / 1000000) + "m"
  }
  return result;
}

export const getUserTypeName = (type) => {
  switch (type) {
    case '2':
      return 'Performer';
      break;
    case '7':
      return 'General Viewer';
      break;
    case '4':
      return 'Mentor';
      break;
    case '5':
      return 'Coach';
      break;
    case '3':
      return 'Club/Academy ';
      break;
    case '6':
      return 'Sponsor';
      break;
    default:
      return null;
  }
}

// export function decryptAES (encryptedBase64, key){
export function decryptAES(encryptedText) {
  let bytes = CryptoJS.AES.decrypt(encryptedText, SKEY);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);

  // console.log("********", originalText); // 'my message'
  return originalText;
};

export function inputAlphabetOnlyWithSpace(event){
  if (!/[A-Za-z\s]/.test(event.key)) {
    event.preventDefault();
  }
}








