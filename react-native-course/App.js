import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

export default function App() {
  const [text] = useState("Eduardo");
  const [picker, setPicker] = useState(null);

  const handleOpenImagePicker = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert("Permission to access camera is required");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled) {
      return;
    }
    setPicker({ localUri: pickerResult.uri });
  };

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Sharing, is not available on your device");
      return;
    }

    await Sharing.shareAsync(picker.localUri);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#303F9F" />
      <Text style={styles.title}>{text}!</Text>
      <TouchableOpacity onPress={handleOpenImagePicker}>
        <Image
          source={{
            uri:
              picker !== null
                ? picker.localUri
                : "https://picsum.photos/200/200",
          }}
          style={styles.imge}
        />
      </TouchableOpacity>
      {picker && (
        <TouchableOpacity style={styles.button} onPress={openShareDialog}>
          <Text style={styles.buttonText}>Compartir Imagen</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5CAE9",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: 700,
    fontSize: 20,
    color: "#212121",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#448AFF",
    padding: 10,
    borderRadius: 6,
    width: 200,
    elevation: 4,
  },
  buttonText: { color: "#FFF", fontWeight: 600, textAlign: "center" },
  imge: {
    marginBottom: 20,
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: "contain",
  },
});
