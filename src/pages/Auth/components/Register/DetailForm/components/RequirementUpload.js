import {Text, Image, Pressable, FlatList} from 'react-native';
import {Layout, Colors, Fonts, CustomSpacing, Color} from '@styles';
import {VStack, HStack} from '@components';
import {
  ArrowBlackIcon,
  CloseIcon,
  ChecklistIcon,
  GoodPhoto,
  NoCutPhoto,
  NoBluryPhoto,
  NoReflectivePhoto,
} from '@assets';
import styles from '../../FormRegistration/FormRegistration.style';

const RequirementUpload = ({setRequirement}) => {
  const componentStyles = styles();
  const dataRequirement = [
    {text: 'Government-issued', falseRule: false},
    {text: 'Original full-size, unedited documents', falseRule: false},
    {text: 'Original full-size, unedited documents', falseRule: false},
    {text: 'Readable, well-lit, coloured images', falseRule: false},
    {text: 'No black and white images', falseRule: true},
    {text: 'No edited or expired documents', falseRule: true},
  ];
  const dataImageQuality = [
    {image: GoodPhoto, text: 'Good'},
    {image: NoCutPhoto, text: 'Not Cut'},
    {image: NoBluryPhoto, text: 'Not Blurry'},
    {image: NoReflectivePhoto, text: 'Not Reflective'},
  ];
  return (
    <VStack>
      <VStack style={componentStyles.topNav}>
        <Pressable onPress={() => setRequirement(false)}>
          <HStack>
            <Image
              source={ArrowBlackIcon}
              style={{
                width: CustomSpacing(7),
                height: CustomSpacing(12),
                marginRight: CustomSpacing(8),
              }}
            />
            <Text style={[{color: Colors.neutral90, ...Fonts.textLBold}]}>
              Identify Verification
            </Text>
          </HStack>
        </Pressable>
      </VStack>
      <Text style={componentStyles.requirementHeader}>Photo Upload</Text>
      <HStack
        style={[
          Layout.flexRowBetween,
          {
            marginHorizontal: CustomSpacing(16),
            marginTop: CustomSpacing(10),
            marginBottom: CustomSpacing(25),
          },
        ]}>
        {dataImageQuality.map((e, i) => (
          <VStack key={i} style={[Layout.flexCenter, Layout.flexCMid]}>
            <Image
              source={e.image}
              style={{width: CustomSpacing(60), height: CustomSpacing(50)}}
            />
            <Text style={[Fonts.textXs, {marginTop: CustomSpacing(8)}]}>
              {e.text}
            </Text>
          </VStack>
        ))}
      </HStack>
      <FlatList
        data={dataRequirement}
        renderItem={({item}) => {
          return (
            <HStack
              style={{
                marginBottom: CustomSpacing(10),
                marginHorizontal: CustomSpacing(16),
              }}>
              {!item.falseRule ? (
                <Image
                  source={ChecklistIcon}
                  style={{
                    width: CustomSpacing(10),
                    height: CustomSpacing(10),
                    marginRight: CustomSpacing(12),
                  }}
                />
              ) : (
                <Image
                  source={CloseIcon}
                  style={{
                    width: CustomSpacing(10),
                    height: CustomSpacing(10),
                    marginRight: CustomSpacing(12),
                  }}
                />
              )}
              <Text style={[{...Fonts.textS}]}>{item.text}</Text>
            </HStack>
          );
        }}
      />
      <Text style={componentStyles.requirementWarningText}>
        Maximum file size is 2MB in jpg/jpeg/png format.
      </Text>
    </VStack>
  );
};

export default RequirementUpload;
