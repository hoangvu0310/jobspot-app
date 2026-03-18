import { withUniwind } from 'uniwind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, ImageBackground } from 'expo-image'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'

export const StyledSafeAreaView = withUniwind(SafeAreaView)

export const StyledImage = withUniwind(Image)

export const StyledImageBackground = withUniwind(ImageBackground)

export const StyledKeyboardAvoidingView = withUniwind(KeyboardAvoidingView)
