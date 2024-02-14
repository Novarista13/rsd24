import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";


export default function Edit() {
  const { id } = useLocalSearchParams();
  const [subject, setSubject] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`${api}/${id}`);
      const data = await res.json();
      setSubject(data.subject);
    })();
  }, []);

  return (
    <View style={{ flexDirection: "row", padding: 20 }}>
      <TextInput
        style={{ flexGrow: 1, backgroundColor: "#ddd", paddingLeft: 10 }}
        value={subject}
        onChangeText={setSubject}
      />
      <Button
        title="save"
        onPress={async () => {
          const res = await fetch(`${api}/${id}`, {
            method: "PUT",
            body: JSON.stringify({ subject }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          router.replace("/");
        }}
      />
    </View>
  );
}
