import { FlatList, Text, View } from "react-native";
import { useChallengesQuery } from "../gql/generated/schema";

export default function ChallengesList() {
  const { data } = useChallengesQuery();
  const challenges = data?.challenges || [];

  return (
    <>
      <View>
        <Text>Liste de challenges</Text>
      </View>
      <FlatList
        data={challenges}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
}
