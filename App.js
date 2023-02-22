import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useState } from "react";

import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "1087781033481-01r2fpek383aviuqtoucgk2bdfmm2bcu.apps.googleusercontent.com",
  forceCodeForRefreshToken: true,
});

export default function App() {
  const [progress, setProgress] = useState(false);

  const [userInfo, setUserInfo] = useState(null);

  const prettyJson = (value) => {
    return JSON.stringify(value, null, 2);
  };

  const renderUserInfo = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.userInfo}>Welcome {userInfo.user.name}</Text>
        <Image
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={{
            uri: userInfo.user.photo,
          }}
        />
        <Text>Your user info: {prettyJson(userInfo.user)}</Text>
      </View>
    );
  };

  const signIn = async () => {
    try {
      setProgress(true);
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then((userInfo) => setUserInfo(userInfo));
    } catch (e) {
      console.log(e);
    } finally {
      setProgress(false);
    }
  };

  return (
    <View style={styles.container}>
      {userInfo ? renderUserInfo() : null}
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={progress}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
