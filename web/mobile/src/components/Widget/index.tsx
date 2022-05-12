import { ChatTeardropDots } from 'phosphor-react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import BottomSheet from '@gorhom/bottom-sheet';
import { styles } from './styles';
import { useRef } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Options } from '../Options';
import { Form } from '../Form';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Success } from '../Success';

export type FeedbackType = keyof typeof feedbackTypes

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleOpen(){
    bottomSheetRef.current?.expand()
  }

  function handleFeedbackCanceled(){
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  function handleFeedbackSent(){
    setFeedbackSent(true)
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>
      
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent
          ?
          <Success onSendAnotherFeedback={handleFeedbackCanceled}/>
          :
          <>
            {
              feedbackType
              ?
              <Form
                feedbackType={feedbackType}
                onFeedbackCanceled={handleFeedbackCanceled}
                onFeedbackSent={handleFeedbackSent}
              />
              :
              <Options onFeedbackTypeChanged={setFeedbackType}/>
            }
          </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);