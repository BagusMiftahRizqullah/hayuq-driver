import {StyleSheet} from 'react-native';
import {Colors, Fonts, CustomSpacing} from '@styles';

const styles = () =>
  StyleSheet.create({
    titlePerformance: {
      ...Fonts.textMBold,
      textAlign: 'center',
      marginVertical: CustomSpacing(15),
    },
    cardDetailPerformance: {
      borderWidth: 1,
      borderColor: Colors.neutral30,
      paddingVertical: CustomSpacing(15),
      paddingRight: CustomSpacing(25),
      paddingLeft: CustomSpacing(15),
      borderRadius: CustomSpacing(8),
      backgroundColor: Colors.neutral10,
    },
    listRuleIncentive: {
      alignItems: 'flex-start',
    },
    containerListRule: {
      borderBottomWidth: 0.8,
      borderBottomColor: Colors.neutral40,
      marginTop: CustomSpacing(5),
      paddingBottom: CustomSpacing(15)
    },
  });

export default styles;
