import { Image, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { assetUrl } from "@/lib/assets";
import { formatDate, getPodcastEpisodes } from "@/lib/content";

export default function PodcastIndex() {
  const episodes = getPodcastEpisodes();

  return (
    <Wrapper className="gap-3 py-12">
      <PageSeo
        title="Podcast"
        description="Conversations extending Artometrics reporting."
        path="/podcast"
      />
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">
        Podcast
      </Text>
      <Text className="text-[40px] font-light font-serif text-fg">Interviews</Text>
      <Text className="text-base mb-4 max-w-[560px] leading-6 text-muted">
        Conversations with analysts, founders, and historians extending Artometrics reporting.
      </Text>
      <View className="gap-5 flex-row flex-wrap">
        {episodes.map((ep) => {
          const image = assetUrl(ep.image?.url);
          return (
            <Link key={ep.id} href={`/podcast/interviews/${ep.id}`} asChild>
              <Pressable
                className="flex-basis-[300px] flex-grow border border-border overflow-hidden bg-bg-elevated"
              >
                {image ? (
                  <Image source={{ uri: image }} className="w-full aspect-video" resizeMode="cover" />
                ) : null}
                <View className="p-4 gap-2">
                  <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">
                    Episode {ep.episodeNumber ?? ep.id}
                    {ep.isLocked ? " · Members" : ""}
                  </Text>
                  <Text className="text-xl leading-[26px] text-fg">{ep.title}</Text>
                  <Text className="text-sm leading-[22px] text-muted" numberOfLines={3}>
                    {ep.description}
                  </Text>
                  <Text className="text-xs text-subtle">
                    {formatDate(ep.pubDate)}
                    {ep.duration ? ` · ${ep.duration}` : ""}
                  </Text>
                </View>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </Wrapper>
  );
}
