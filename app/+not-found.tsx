import { Text } from "react-native";
import { Link, Stack } from "expo-router";
import { Wrapper } from "@/components/Wrapper";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not found", headerShown: false }} />
      <Wrapper className="items-start gap-3 py-20">
        <Text className="text-sm tracking-[2px] text-accent">404</Text>
        <Text className="text-[32px] font-light text-fg">Page not found</Text>
        <Link href="/">
          <Text className="mt-2 font-semibold text-accent">Return home</Text>
        </Link>
      </Wrapper>
    </>
  );
}
