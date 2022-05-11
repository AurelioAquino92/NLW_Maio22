import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { theme } from '../../theme';
import { FeedbackType } from '../../components/Widget'
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Screenshot } from '../Screenshot';
import { Button } from '../Button';
import { captureScreen } from 'react-native-view-shot';

interface Props {
    feedbackType: FeedbackType
    onFeedbackCanceled: () => void
    onFeedbackSent: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
    const [screenshot, setScreenShot] = useState<string|null>(null)
    
    const feedbackInfo = feedbackTypes[feedbackType]

    function handleScreenShot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
            .then(uri => setScreenShot(uri))
            .catch(error => console.log(error))
    }

    function handleRemoveShot() {
        setScreenShot(null)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                        size={24}
                        weight='bold'
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image 
                        source={feedbackInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput 
                multiline
                style={styles.input}
                placeholder="Digite o problema encontrado"
                placeholderTextColor={theme.colors.text_secondary}
            />

            <View style={styles.footer}>
                <Screenshot 
                    onTakeShot={handleScreenShot}
                    onRemoveShot={handleRemoveShot}
                    screenshot={screenshot}
                />

                <Button
                    isLoading={false}
                />
            </View>
            
        </View>
  );
}