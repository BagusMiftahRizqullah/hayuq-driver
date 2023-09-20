import { useEffect, useState } from 'react';
import {Text, Pressable, Image, ScrollView} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {VStack, HStack, Button} from '@components';
import {ArrowBlackIcon} from '@assets';
import {Colors, Fonts, CustomSpacing, Layout} from '@styles';
import {AUTH_CONSTANT} from '../../../../Auth.constant';

import styles from '../SuccessRegisterStyle';

const ViewDocument = ({setViewDocument}) => {
  const dispatch = useDispatch();
  const componentStyles = styles();
  const navigation = useNavigation();
  const { dataUser, documentRejected } = useSelector(state => state.auth)
  const [listDataReject, setListDataReject] = useState([])

  const handleBackViewDocument = () => {
    setViewDocument(false);
  };

  const handleRedirect = () => {
    navigation.navigate('FormRegistration')
  };

  const renderTitle = (title) => {
    switch (title) {
      case 'driverktp':
        return 'ID Card'
      case 'driverbank': 
        return 'Bank Account'
      case 'driverskck':
        return 'SKCK'
      case 'driverlicense':
        return 'Driving License'
      case 'drivervehicles':
        return 'STNK'
    }
  }

  const handleGetDocumentReject = () => {
    dispatch({
      type: AUTH_CONSTANT.GET_DOCUMENT_REJECTED,
      payload: dataUser.id,
      meta: {
        success: function(data) {
          setListDataReject(data)
        }
      }
    })
  };

  useEffect(() => {
    handleGetDocumentReject();
  }, [])

  useEffect(() => {
    if (documentRejected){
      setListDataReject(documentRejected)
    }
  }, [documentRejected])


  return (
    <VStack style={Layout.flex}>
      <Pressable onPress={handleBackViewDocument}>
        <HStack style={componentStyles.topNav}>
          <Image source={ArrowBlackIcon} style={componentStyles.topNavArrow} />
          <Text style={[{color: Colors.neutral90, ...Fonts.headingXsBold}]}>
            View Document
          </Text>
        </HStack>
      </Pressable>
      <ScrollView style={Layout.flex}>
        <VStack style={{...componentStyles.borderedCard, marginTop: CustomSpacing(20)}}>
          <Text
            style={[
              {
                color: Colors.neutral90,
                marginBottom: CustomSpacing(5),
                ...Fonts.textLBold,
              },
            ]}>
            {dataUser?.email}
          </Text>
          <Text style={[{color: Colors.neutral90, ...Fonts.textM}]}>
            {dataUser?.phone}
          </Text>
        </VStack>
        <VStack style={{margin: CustomSpacing(16)}}>
          <Text
            style={[
              {
                color: Colors.neutral90,
                marginBottom: CustomSpacing(12),
                ...Fonts.textLBold,
              },
            ]}>
            File Upload
          </Text>
          <Text style={{lineHeight: CustomSpacing(22), textAlign: 'justify'}}>
            <Text style={{...Fonts.textMBold, textAlign: 'justify'}}>
              Please Note:
            </Text>{' '}
            Your file will need to be verified from Hayuq team. You have to wait
            1x24 to active your driver account.
          </Text>
          <Text style={{lineHeight: CustomSpacing(22), textAlign: 'justify'}}>
            <Text style={Fonts.textMBold}>Important:</Text> We will notify if
            your document doesnt meet Hayuq guideline. Please change in 2x24 to
            upload your new file to replace the old one.
          </Text>
        </VStack>
        {listDataReject.length > 0 && listDataReject?.map((data) => (
          <>
            {listDataReject.length > 0 && Object?.keys(data)?.map((keys,index) => (
              <VStack key={`list-document-reject-${index}`} style={componentStyles.borderedCard}>
                <HStack>
                  <Image 
                    source={{uri: data[keys].path}}
                    style={componentStyles.roundedPhoto}
                  />
                  <VStack style={{marginLeft: CustomSpacing(16)}}>
                    <Text style={[Fonts.textMBold]}>{renderTitle(keys)}</Text>
                    <Text style={componentStyles.labeledText}>
                      {data[keys].document_status}
                    </Text>
                  </VStack>
                </HStack>
                <HStack
                  style={{
                    ...Fonts.textS,
                    marginTop: CustomSpacing(4),
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}>
                  <Text style={{marginRight: CustomSpacing(5)}}>Notes : </Text>
                  <Text
                    style={{
                      ...Fonts.textS,
                      ...Layout.flex,
                      textAlign: 'justify',
                      lineHeight: CustomSpacing(21),
                    }}>
                    {data[keys].notes}
                  </Text>
                </HStack>
                <HStack style={{width: '100%', justifyContent: 'flex-end'}}>
                  <Button
                    style={{
                      paddingVertical: CustomSpacing(6),
                      paddingHorizontal: CustomSpacing(12),
                      marginTop: CustomSpacing(10),
                    }}
                    onPress={handleRedirect}
                  >
                    <Text style={Fonts.textMBold}>Changes</Text>
                  </Button>
                </HStack>
              </VStack>
            ))}
          </>
        ))}
      </ScrollView>
    </VStack>
  );
};

export default ViewDocument;
