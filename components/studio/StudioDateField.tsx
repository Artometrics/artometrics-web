import { Platform, Text, TextInput, View } from "react-native";

export function StudioDateField({
  label,
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <View className="gap-1.5">
      <Text className="text-xs font-bold uppercase tracking-[0.8px] text-muted">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColorClassName="text-subtle"
        autoCapitalize="none"
        autoCorrect={false}
        {...(Platform.OS === "web" ? ({ type: "date" } as object) : null)}
        className="min-h-[44px] rounded-[2px] border border-border bg-bg-elevated px-3 py-2.5 font-serif text-base text-fg outline-none"
      />
    </View>
  );
}

export function StudioTimeField({
  label,
  value,
  onChange,
  placeholder = "HH:MM",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <View className="gap-1.5">
      <Text className="text-xs font-bold uppercase tracking-[0.8px] text-muted">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColorClassName="text-subtle"
        autoCapitalize="none"
        autoCorrect={false}
        {...(Platform.OS === "web" ? ({ type: "time" } as object) : null)}
        className="min-h-[44px] rounded-[2px] border border-border bg-bg-elevated px-3 py-2.5 font-serif text-base text-fg outline-none"
      />
    </View>
  );
}
