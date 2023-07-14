import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const CreatePostsScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [coordinats, setCoordinats] = useState(null);
  const navigation = useNavigation();

  const getGeoLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCoordinats(coords);
    } catch (error) {
      console.log("Error getting location:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
      getGeoLocation();
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.formContainer,
              marginBottom: isShowKeyboard ? 50 : 50,
            }}
          >
            <View style={styles.addPhotoContainer}>
              <Camera style={styles.camera} type={type} ref={setCameraRef}>
                <View style={styles.addPhotoIcon}>
                  <TouchableOpacity
                    onPress={async () => {
                      if (cameraRef) {
                        const { uri } = await cameraRef.takePictureAsync();
                        await MediaLibrary.createAssetAsync(uri);
                      }
                    }}
                  >
                    <MaterialIcons
                      name="photo-camera"
                      size={24}
                      color="#BDBDBD"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.flipBtn}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <MaterialIcons
                    name="flip-camera-ios"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </Camera>
            </View>
            <Text style={styles.addPhotoText}>Завантажте фото</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                // value={setNamePost}
                onFocus={() => setIsShowKeyboard(true)}
              />
              <View style={styles.locationContainre}>
                <SimpleLineIcons
                  style={styles.locationIcon}
                  name="location-pin"
                  size={24}
                  color="#BDBDBD"
                />
                <TextInput
                  style={[styles.input, styles.inputPad]}
                  placeholder="Місцевість..."
                  // value={setCoordinats}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("PostsScreen", { coordinats })}
            >
              <Text style={styles.buttonText}>Опубліковати</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },

  addPhotoContainer: {
    backgroundColor: "#E8E8E8",
    width: "90%",
    height: 240,
    borderRadius: 8,
  },
  camera: { flex: 1 },
  flipBtn: {
    top: 10,
    left: 10,
  },
  addPhotoIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "40%",
    left: "40%",
  },
  addPhotoText: {
    color: "#BDBDBD",
    marginTop: 8,
    alignItems: "flex-start",
    marginRight: " 50%",
  },
  inputContainer: {
    marginTop: 24,
    width: "90%",
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    width: "90%",
    height: 50,

    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#E8E8E8",
    backgroundColor: "#FFF",
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputPad: {
    paddingLeft: 20,
  },
  locationIcon: {
    top: 35,
    left: 10,
    zIndex: 1,
  },
  button: {
    width: "90%",
    height: 51,
    borderRadius: 24,
    backgroundColor: "#FF6C00",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 32,
    padding: 15,
  },
  buttonText: {
    color: "#fff",
  },
});

export default CreatePostsScreen;
