import {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {AsyncStorage} from 'react-native';

import {
  HStack,
  VStack,
  HeaderNavigation,
  Button,
  ModalBottom,
  Spacer,
} from '@components';
import {ArrowDownLightIcon} from '@assets';
import {Layout, CustomSpacing, Fonts, Colors} from '@styles';
import {SETTING_CONSTANT} from './Setting.constant';
import {AUTH_CONSTANT} from '../../../Auth/Auth.constant';

import styles from './Setting.style';

const DeleteAccount = () => {
  const navigation = useNavigation();
  const componentStyles = styles();
  const dispatch = useDispatch();
  const {
    driverDetail: {drivers},
  } = useSelector((state) => state.main);
  const { isLoading } = useSelector(state => state.settingReducer)
  const [selectedReason, setSelectedReason] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isCantSubmit, setIsCantSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);

  const dataReason = [
    'This is temporary, I’ll be back',
    'Too busy/too distracting',
    'Created a second account',
    'Trouble getting started',
    'Privacy concern',
    'Something else',
  ];

  const goBackNavigation = () => {
    navigation.goBack();
  };

  const handleDeleteAccount = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const data = {driverId: drivers.id, notes: selectedReason, token};
    dispatch({
      type: SETTING_CONSTANT.DELETE_ACCOUNT,
      payload: data,
      meta: {
        success: () => {
          dispatch({type: AUTH_CONSTANT.LOGOUT});
        },
        failed: () => {
          setDeleteConfirm(false)
          setErrorSubmit(true)
        }
      },
    });
  };

  const handleCanSubmit = () => {
    if (!selectedReason) {
      setIsCantSubmit(true);
    } else {
      setDeleteConfirm(true);
    }
  };

  const handleCloseModalErrorSubmit = () => {
    setErrorSubmit(false)
  }

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      <HeaderNavigation
        title="Delete Account"
        goback
        onPress={goBackNavigation}
      />
      <View style={{padding: CustomSpacing(16)}}>
        <Text style={Fonts.headingM}>
          We thought our relationship was special ... 🙁
        </Text>
        <Text
          style={{
            ...Fonts.textM,
            textAlign: 'justify',
            lineHeight: CustomSpacing(22),
            marginVertical: CustomSpacing(15),
          }}>
          We’re sorry to see you go. Once you choose to close your account, your
          account will be hidden until you reactivate it by logging back in.
        </Text>
        <Text style={Fonts.textMBold}>
          Please, don’t leave us without a reason
        </Text>

        <SelectDropdown
          data={dataReason}
          defaultValue={selectedReason}
          onSelect={(selectedItem) => {
            setSelectedReason(selectedItem);
            setIsCantSubmit(false);
          }}
          renderDropdownIcon={() => (
            <Image
              source={ArrowDownLightIcon}
              style={componentStyles.arrowCategory}
            />
          )}
          rowTextForSelection={(item) => {
            return item;
          }}
          buttonStyle={componentStyles.categoryFilter}
          buttonTextStyle={{...Fonts.textXs, textAlign: 'left'}}
          rowTextStyle={{...Fonts.textXs}}
        />

        {isCantSubmit && (
          <Text
            style={{
              color: Colors.dangerMain,
              fontSize: CustomSpacing(12),
              marginVertical: CustomSpacing(8),
            }}>
            Please select a reason
          </Text>
        )}

        <Button
          style={{
            height: CustomSpacing(42),
            marginVertical: CustomSpacing(15),
          }}
          onPress={goBackNavigation}>
          <Text style={Fonts.textMBold}>Bring me back</Text>
        </Button>
        <Button
          style={{
            height: CustomSpacing(42),
            backgroundColor: Colors.dangerMain,
          }}
          onPress={handleCanSubmit}>
          <Text style={{...Fonts.textMBold, color: '#ffffff'}}>
            Continue to delete
          </Text>
        </Button>

        <ModalBottom
          isVisible={deleteConfirm}
          type="bottom"
          onClose={() => setDeleteConfirm(false)}>
          <VStack padding={CustomSpacing(14)}>
            <VStack vertical={CustomSpacing(10)}>
              <VStack>
                <Text style={{...Fonts.headingXsBold, textAlign: 'center'}}>
                  Still want to leave us?
                </Text>
                <Spacer height={CustomSpacing(10)} />
                <Text
                  style={{
                    ...Fonts.textM,
                    color: Colors.neutral70,
                    textAlign: 'center',
                  }}>
                  We will retain your user data for 30 days and then it will be
                  permanently deleted. You can reactivate your account at any
                  point within 30 days of deactivation by logging back in.
                </Text>
                <Spacer height={CustomSpacing(30)} />
                <Button onPress={handleDeleteAccount} isSubmitting={isLoading}>
                  <Text style={{...Fonts.textMBold}}>Ok, Delete account</Text>
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </ModalBottom>

        <ModalBottom
          onClose={handleCloseModalErrorSubmit}
          isVisible={errorSubmit}
          type="center">
          <View
            style={{
              ...componentStyles.modalStyle,
              borderRadius: CustomSpacing(10),
            }}>
            <VStack bottom={CustomSpacing(30)} top={CustomSpacing(10)}>
              <Text style={{...Fonts.textMBold, textAlign: 'center'}}>
                Submit Failed
              </Text>
            </VStack>
            <HStack style={[Layout.flexCenterMid]}>
              <Button
                onPress={handleCloseModalErrorSubmit}
                style={{paddingHorizontal: CustomSpacing(50)}}>
                <Text style={{...Fonts.textMBold}}>Try Again</Text>
              </Button>
            </HStack>
          </View>
        </ModalBottom>
      </View>
    </View>
  );
};

export default DeleteAccount;
