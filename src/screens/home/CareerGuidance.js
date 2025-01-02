import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import HeaderComponent from '../../components/HeaderComponent';
import Pdf from 'react-native-pdf';
import Config from 'react-native-config';
import { Buffer } from 'buffer';
import { ActivityIndicator } from 'react-native-paper';

import { getAwsCredentialsData } from '../../store/actions/LibraryAction';
import { decryptAES } from "../../utils/Util";

const CareerGuidance = (props) => {
  // const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
  const source = { uri: Config.PDFURL + 'assets/guide.pdf', cache: true };
  // const source = { uri: Config.PDFURL + 'elibrary/1681908726652IC10PHCH1CM.1.2.3.4.pdf', cache: true };
  // const source = { uri: props.route.params.elibraryPdfPath, cache: true };
  // const source = { uri: "https://crestestclv.s3.ap-south-1.amazonaws.com/elibrary/1681908726652IC10PHCH1CM.1.2.3.4.pdf", cache: true };

  const awsCredentialsAccessKeyId = useSelector((state) => state.elibrary.awsCredentialsAccessKeyId);
  const awsCredentialsSecretaccessKey = useSelector((state) => state.elibrary.awsCredentialsSecretaccessKey);
  const dispatch = useDispatch();

  const [sourcePdfUrl, setSourcePdfUrl] = useState({
    uri: Config.PDFURL + 'assets/guide.pdf',
    cache: true,
  });
  const [base64Pdf, setBase64Pdf] = useState('');
  const [isPdfLoading, setIsPdfLoading] = useState(true);

  useEffect(() => {
    if (props?.route?.params !== undefined && props?.route?.params !== null && props?.route?.params !== '') {
      getPdfContentFromAWSS3BucketPrivately(props?.route?.params?.elibraryPdfPath);
    }

  }, []);

  useEffect(() => {
    dispatch(getAwsCredentialsData(props));
  }, []);

  const AWS = require('aws-sdk');
  AWS.config.update({
    region: Config.APP_S3_BUCKET_REGION,
    accessKeyId: decryptAES(awsCredentialsAccessKeyId),
    secretAccessKey: decryptAES(awsCredentialsSecretaccessKey),
  });

  const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  const getPdfContentFromAWSS3BucketPrivately = url => {
    const S3_BUCKET_NAME = Config.APP_S3_BUCKET_NAME;
    let parts = url.split('/');
    const pdfFileName = parts[parts.length - 1];

    let pdfFileWithoutPageNumber = pdfFileName.split('#');
    let finalPdfFileWithoutPageNumber = pdfFileWithoutPageNumber[0];
    let fullPathPdf = `elibrary/${finalPdfFileWithoutPageNumber}`;
    s3.getObject(
      {
        Bucket: S3_BUCKET_NAME,
        Key: fullPathPdf,
        ResponseContentType: 'Uint8Array',
      },
      (err, data) => {
        if (err) {
          console.log('@@Error : ' + err);
        } else {
          setBase64Pdf(new Buffer.from(data.Body).toString('base64'));
        }
      },
    );
  };

  const leftIconHandeler = () => {
    props.navigation.goBack();
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#245C75"
        translucent
        hidden={false}
      />
      <HeaderComponent
        headerName="Career Guidance"
        leftIcon="chevron-back"
        leftIconHandeler={leftIconHandeler}
      />

      {/* <View style={{ flex: 1, backgroundColor: '#e7bc00', alignItems: 'center', justifyContent: 'center', }}>
                <Text>Career Guidance</Text>
            </View> */}
      {/* <Text>{Config.PDFURL + pdfFileName}</Text> */}
      <View style={styles.container}>
        <Pdf
          trustAllCerts={false}
          source={{ uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf'}}
          // source={source}
          /* source={{
            uri: 'data:application/pdf;base64,' + base64Pdf,
            cache: true,
          }} */
          renderActivityIndicator={() => <ActivityIndicator color="red" size={'large'} />}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
            setIsPdfLoading(false);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
            Linking.openURL(uri)
          }}
          page={1}
          style={styles.pdf}
        />
        {/* {isPdfLoading && (
          <View style={styles.activityContainer}>
            <ActivityIndicator color="red" size={'large'} />
            <Text>Loading...</Text>
          </View>
        )} */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffaf',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    /* borderWidth:1,
        borderStyle:'solid',
        borderColor:'#ff0000' */
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default CareerGuidance;
