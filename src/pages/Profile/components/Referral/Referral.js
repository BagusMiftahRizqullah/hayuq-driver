import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Share,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';

import {HStack, VStack, HeaderNavigation, Button} from '@components';
import {Colors, Fonts, CustomSpacing} from '@styles';
import {ShareIcon} from '@assets';

import styles from './Referral.style';

const Referral = () => {
  const componentStyle = styles();
  const navigation = useNavigation();
  const {driverDetail} = useSelector((state) => state.main);

  const dataStepReferral = [
    {
      title: 'Invite your friends',
      subTitle: 'Just share your link',
    },
    {
      title: 'They register using your referral code',
      subTitle: 'input referral code when they sign up',
    },
    {
      title: 'You get reward!',
      subTitle: 'Then you will get Rp 5.000 🎉',
    },
  ];

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://hayuq.com/partner/register?driver&referral=${driverDetail?.driverReferrals?.code}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const goBackNavigation = () => {
    navigation.goBack('');
  };

  const handleCopyReffCode = () => {
    Clipboard.setString(`https://hayuq.com/partner/register?driver&referral=${driverDetail?.driverReferrals?.code}`);
  };

  return (
    <View style={{...componentStyle.containerReferral}}>
      <HeaderNavigation title="Referral" goback onPress={goBackNavigation} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView>
          <VStack style={{marginHorizontal: CustomSpacing(15)}}>
            <VStack>
              <Text
                style={{
                  ...Fonts.textLBold,
                  paddingVertical: CustomSpacing(10),
                  marginTop: CustomSpacing(5),
                }}>
                Refer a friend and get reward!
              </Text>
              <Text style={{...componentStyle.subTitleReferFriend}}>
                Get extra Rp. 5.000 for every referral you get. Bonus will
                directly update on your Payyuq balance.
              </Text>
            </VStack>

            <VStack>
              <Text
                style={{...Fonts.textLBold, marginBottom: CustomSpacing(20)}}>
                How it works
              </Text>
              {dataStepReferral.map((data, index) => (
                <HStack
                  key={`list-data-referral-${index}`}
                  style={{alignItems: 'flex-start'}}>
                  <VStack style={{alignItems: 'center'}}>
                    <VStack style={{...componentStyle.rounderCircleStep}}>
                      <Text
                        style={{
                          ...Fonts.textMBold,
                          color: Colors.secondaryMain,
                        }}>
                        {index + 1}
                      </Text>
                    </VStack>
                    {index !== dataStepReferral.length - 1 && (
                      <VStack style={{...componentStyle.dividerCircleStep}} />
                    )}
                  </VStack>
                  <VStack style={{marginLeft: CustomSpacing(15)}}>
                    <Text style={{...Fonts.textMBold}}>{data.title}</Text>
                    <Text style={{marginTop: CustomSpacing(2)}}>
                      {data.subTitle}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>

            <VStack style={{marginTop: CustomSpacing(50)}}>
              <HStack style={{...componentStyle.referralCodeInput}}>
                <TextInput
                  style={{
                    paddingHorizontal: CustomSpacing(20),
                    ...Fonts.textMBold,
                  }}
                  value={driverDetail?.driverReferrals?.code}
                  editable={false}
                />
                <Button
                  style={{...componentStyle.btnCopyCode}}
                  onPress={handleCopyReffCode}>
                  <Text style={{...Fonts.textMBold, color: Colors.neutral10}}>
                    Copy
                  </Text>
                </Button>
              </HStack>
              <Button
                style={{...componentStyle.btnReferFriend}}
                onPress={onShare}>
                <Image
                  source={ShareIcon}
                  style={{
                    width: CustomSpacing(20),
                    height: CustomSpacing(20),
                    marginRight: CustomSpacing(18),
                  }}
                />
                <Text style={Fonts.textMBold}>Refer friends now</Text>
              </Button>
            </VStack>
          </VStack>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Referral;
