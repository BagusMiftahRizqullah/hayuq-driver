import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';

import {Layout, CustomSpacing} from '@styles';
import {HStack, VStack} from '@components';
import {
  AcceptCallIcon,
  DeclineCallIcon,
  MuteCallIcon,
  SpeakerCallIcon,
  ProfilePic,
} from '@assets';

import styles from './CallPage.style';

const CallPage = ({setCall}) => {
  const componentStyles = styles();
  const [activeCall, setActiveCall] = useState(false);
  const [connected, setConnected] = useState(false);
  const [duration, setDuration] = useState(0);

  const renderNavActiveCall = [
    {
      title: 'Mute',
      img: MuteCallIcon,
      function: () => console.log('Mute Call'),
    },
    {
      title: 'Speaker',
      img: SpeakerCallIcon,
      function: () => console.log('Speaker Call'),
    },
    {
      title: 'End',
      img: DeclineCallIcon,
      function: () => {
        setCall(false);
        setConnected(false);
      },
    },
  ];

  const renderNavCall = [
    {
      title: 'Decline',
      img: DeclineCallIcon,
      function: () => setCall(false),
    },
    {
      title: 'Accpet',
      img: AcceptCallIcon,
      function: () => {
        setActiveCall(true);
        setTimeout(() => {
          setConnected(true);
        }, 2000);
      },
    },
  ];

  useEffect(() => {
    if (connected === true) {
      setTimeout(() => setDuration(duration + 1), 1000);
    }
  }, [duration, connected]);

  return (
    <VStack style={componentStyles.containerCallPage}>
      <VStack style={componentStyles.contanerContent}>
        <VStack style={Layout.flexCenter}>
          <Image source={ProfilePic} style={componentStyles.imageCall} />
          <Text style={componentStyles.textUsername}>Rebecha</Text>
          {!activeCall ? (
            <Text style={componentStyles.textCallStatus}>Ringing...</Text>
          ) : (
            <Text style={componentStyles.textCallStatus}>
              {!connected ? 'Connecting...' : `00:${duration}`}
            </Text>
          )}
        </VStack>
        <HStack style={componentStyles.bottomContainerNav}>
          {activeCall ? (
            <>
              {renderNavActiveCall.map((e, i) => (
                <VStack
                  key={`bottom-active-nav-call-${i}`}
                  style={Layout.flexCenter}>
                  <TouchableOpacity onPress={e.function}>
                    <Image
                      source={e.img}
                      style={{
                        width: CustomSpacing(74),
                        height: CustomSpacing(74),
                      }}
                    />
                  </TouchableOpacity>
                  <Text>{e.title}</Text>
                </VStack>
              ))}
            </>
          ) : (
            <>
              {renderNavCall.map((e, i) => (
                <VStack key={`bottom-nav-call-${i}`} style={Layout.flexCenter}>
                  <TouchableOpacity onPress={e.function}>
                    <Image
                      source={e.img}
                      style={{
                        width: CustomSpacing(74),
                        height: CustomSpacing(74),
                      }}
                    />
                  </TouchableOpacity>
                  <Text>{e.title}</Text>
                </VStack>
              ))}
            </>
          )}
        </HStack>
      </VStack>
    </VStack>
  );
};

export default CallPage;
