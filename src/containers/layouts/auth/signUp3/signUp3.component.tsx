import React from 'react';
import {
  ButtonProps,
  ImageProps,
  View,
} from 'react-native';
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { Button } from '@kitten/ui';
import {
  SignUpForm2,
  SignUpForm2Data,
} from '@src/components/auth';
import { ProfilePhoto } from '@src/components/social';
import {
  ScrollableAvoidKeyboard,
  ImageOverlay,
  textStyle,
} from '@src/components/common';
import {
  IconSource,
  PlusIconFill,
} from '@src/assets/icons';
import {
  imageSignUp3Bg,
  ImageSource,
} from '@src/assets/images';

interface ComponentProps {
  onSignUpPress: (formData: SignUpForm2Data) => void;
  onSignInPress: () => void;
  onPhotoPress: () => void;
}

export type SignUp3Props = ThemedComponentProps & ComponentProps;

interface State {
  formData: SignUpForm2Data | undefined;
}

class SignUp3Component extends React.Component<SignUp3Props, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = imageSignUp3Bg;

  private profileImage: IconSource = require('../../../../assets/icons/icon-person.png');

  private onFormDataChange = (formData: SignUpForm2Data) => {
    this.setState({ formData });
  };

  private onPhotoButtonPress = () => {
    this.props.onPhotoPress();
  };

  private onSignInButtonPress = () => {
    this.props.onSignInPress();
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress(this.state.formData);
  };

  private renderPhotoButtonIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    const { themedStyle } = this.props;

    return PlusIconFill({ ...style, ...themedStyle.photoButtonIcon });
  };

  private renderPhotoButton = (): React.ReactElement<ButtonProps> => {
    const { themedStyle } = this.props;

    return (
      <Button
        style={themedStyle.photoButton}
        icon={this.renderPhotoButtonIcon}
        onPress={this.onPhotoButtonPress}
      />
    );
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ScrollableAvoidKeyboard>
        <ImageOverlay
          style={themedStyle.container}
          source={this.backgroundImage.imageSource}>
          <View style={themedStyle.headerContainer}>
            <ProfilePhoto
              style={themedStyle.photo}
              resizeMode='center'
              source={this.profileImage.imageSource}
              button={this.renderPhotoButton}
            />
          </View>
          <SignUpForm2
            style={themedStyle.formContainer}
            onDataChange={this.onFormDataChange}
          />
          <Button
            style={themedStyle.signUpButton}
            textStyle={textStyle.button}
            size='giant'
            disabled={!this.state.formData}
            onPress={this.onSignUpButtonPress}>
            SIGN UP
          </Button>
          <Button
            style={themedStyle.signInButton}
            textStyle={themedStyle.signUpText}
            appearance='ghost'
            activeOpacity={0.75}
            onPress={this.onSignInButtonPress}>
            Already have an account? Sign In
          </Button>
        </ImageOverlay>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const SignUp3 = withStyles(SignUp3Component, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  photo: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: 'center',
    backgroundColor: theme['background-basic-color-1'],
    tintColor: theme['text-hint-color'],
  },
  photoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    transform: [{ translateY: 80 }],
  },
  photoButtonIcon: {
    width: 24,
    height: 24,
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
  },
  signUpText: {
    color: 'white',
    ...textStyle.subtitle,
  },
}));

