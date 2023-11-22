import { Redirect, Stack, Tabs, useRootNavigationState } from "expo-router";

const Home = () => {
  const navigation = useRootNavigationState();
  // https://github.com/expo/router/issues/740
  if (!navigation.key) return null;
  console.log("AVIGATION TO TABLE PAGE");
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Redirect href={"/tabs"} />
    </>
  );
};

export default Home;
