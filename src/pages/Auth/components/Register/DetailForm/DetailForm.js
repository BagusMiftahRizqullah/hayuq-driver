import {useState} from 'react';
import {Text, View, Image, Pressable} from 'react-native';

import StnkForm from './components/StnkForm';
import IdcardForm from './components/IdcardForm';
import BankAccountForm from './components/BankAccount';
import DrivingLicenseForm from './components/DrivivingLicenseForm';
import SkckForm from './components/SkckForm';
import PhotoProfile from './components/PhotoProfile';

import {HStack, VStack} from '@components';
import {Layout, Colors, Fonts, CustomSpacing} from '@styles';
import {ArrowBlackIcon, TriangleAlertIcon} from '@assets';
import RequirementUpload from './components/RequirementUpload';
import styles from './DetailForm.style';

const DetailForm = ({activeForm, setActiveForm}) => {
  const componentStyles = styles();
  const [requirement, setRequirement] = useState(false);

  return (
    <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
      {requirement ? (
        <RequirementUpload setRequirement={setRequirement} />
      ) : (
        <View style={[Layout.flex, {backgroundColor: Colors.neutral10}]}>
          <HStack style={componentStyles.topNav}>
            <Pressable
              onPress={() => setActiveForm('')}
              style={{marginRight: CustomSpacing(8)}}>
              <HStack>
                <Image
                  source={ArrowBlackIcon}
                  style={componentStyles.topNavArrow}
                />

                <Text
                  style={[{color: Colors.neutral90, ...Fonts.headingSBold}]}>
                  {activeForm}
                </Text>
              </HStack>
            </Pressable>
          </HStack>
          <VStack style={[Layout.flex]}>
            <Pressable onPress={() => setRequirement(true)}>
              <HStack style={componentStyles.guideCard}>
                <Image
                  source={TriangleAlertIcon}
                  style={{
                    width: CustomSpacing(16),
                    height: CustomSpacing(14),
                    marginRight: CustomSpacing(11),
                  }}
                />
                <Text
                  style={{
                    ...Fonts.textM,
                    ...Layout.flex,
                    color: Colors.neutral60,
                    textAlign: 'justify',
                    paddingVertical: CustomSpacing(5),
                    lineHeight: CustomSpacing(22),
                  }}>
                  follow the photo guide to make document verification easier.
                  Click to check.
                </Text>
              </HStack>
            </Pressable>

            {activeForm === 'Photo Profile' && (
              <PhotoProfile
                text="Photo Profile"
                setActiveForm={setActiveForm}
              />
            )}
            {activeForm === 'ID Card' && (
              <IdcardForm setActiveForm={setActiveForm} />
            )}
            {activeForm === 'Driving License' && (
              <DrivingLicenseForm setActiveForm={setActiveForm} />
            )}
            {activeForm === 'SKCK' && (
              <SkckForm setActiveForm={setActiveForm} />
            )}
            {activeForm === 'STNK' && (
              <StnkForm setActiveForm={setActiveForm} />
            )}
            {activeForm === 'Bank Account' && (
              <BankAccountForm setActiveForm={setActiveForm} />
            )}
          </VStack>
        </View>
      )}
    </View>
  );
};

export default DetailForm;
