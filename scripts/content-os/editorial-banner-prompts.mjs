#!/usr/bin/env node
/**
 * Editorial illustration banner prompts for all Artometrics articles.
 * Formula: editorial illustration, [one surreal overscale metaphor], flat graphic shapes,
 * [topic palette], heavy grain texture overlay, magazine illustration style, no text, 16:9
 *
 * Usage:
 *   node scripts/content-os/editorial-banner-prompts.mjs
 *   node scripts/content-os/editorial-banner-prompts.mjs --slug giants
 *   node scripts/content-os/editorial-banner-prompts.mjs --json
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

/** @type {Record<string, { metaphor: string, palette: string, style?: string }>} */
export const BANNER_METAPHORS = {
  // —— Sports franchises (team colors + icons) ——
  "yankees": {
    metaphor:
      "oversized interlocking NY monogram dissolving into a mountain of championship trophies and pinstripe stadium arches towering over tiny silhouetted figures",
    palette: "Yankees navy white and graphite gray",
    style: "bold empire-scale baseball iconography",
  },
  "giants": {
    metaphor:
      "California state silhouette filled with orange baseball stitching and black fog rolling off an oversized mitt, World Series rings orbiting like planets",
    palette: "Giants black orange and cream",
    style: "surreal Bay Area baseball iconography",
  },
  "dodgers": {
    metaphor:
      "precision baseball machine of interlocking gears stamped with stitching, blue LA palm silhouettes feeding white baseballs into a conveyor of pennants",
    palette: "Dodger blue white and scarlet red",
    style: "sleek industrial baseball machine metaphor",
  },
  "padres": {
    metaphor:
      "towering brown-and-gold coin stacks shaped like a baseball diamond that never quite reaches a glowing October moon, tiny silhouetted figures climbing the coins",
    palette: "Padres brown gold and sand yellow",
    style: "expensive unfinished baseball aspiration",
  },
  "blueprint": {
    metaphor:
      "blueprint drafting table where brown gold stadium blueprints unfold into a bridge of dollar bills toward a distant World Series trophy island",
    palette: "Padres brown gold cream and blueprint cyan",
    style: "ownership blueprint conceptual metaphor",
  },
  "patriots": {
    metaphor:
      "silver football helmet exploded into a schematic of interlocking gears and play sheets forming a fortress wall, red white navy banners as system diagrams",
    palette: "Patriots navy red silver and white",
    style: "system-dynasty schematic illustration",
  },
  "cowboys": {
    metaphor:
      "oversized silver blue star cracking under the weight of a gleaming brand pedestal while a lonely championship trophy sits out of reach across a stadium void",
    palette: "Cowboys navy silver white and royal blue",
    style: "brand-versus-trophy conceptual metaphor",
  },
  "lakers": {
    metaphor:
      "purple and gold Hollywood spotlight beams forming a basketball court runway with floating championship rings as jewelry, palm silhouettes and star dust",
    palette: "Lakers purple gold and black",
    style: "glamour basketball editorial metaphor",
  },
  "celtics": {
    metaphor:
      "towering shamrock-shaped ivy covering a green parquet cathedral, stacked championship banners hanging like institutional pillars over tiny silhouetted fans",
    palette: "Celtics kelly green white and gold",
    style: "institutional dynasty botanical metaphor",
  },
  "warriors": {
    metaphor:
      "golden bridge cables reshaping into basketball arcs raining threes as blue splash silhouettes leap across a Bay skyline of floating basketballs",
    palette: "Warriors royal blue gold and white",
    style: "Golden State splash dynasty metaphor",
  },

  // —— Other sports / gaming ——
  "games": {
    metaphor:
      "oversized wooden meeple and dice towers rising from a tiled board landscape like a city skyline, tokens raining as meteors",
    palette: "warm wood ochre teal and ink black",
  },
  "leagues": {
    metaphor:
      "constellation of jersey stars orbiting a giant dollar-coin sun while salary-cap rings encircle a tiny football field",
    palette: "stadium green navy gold and chalk white",
  },
  "pokemon": {
    metaphor:
      "oversized red-and-white pokéball opening into a constellation of creature silhouettes and trading-card shards across a pastel arena",
    palette: "Pokémon red white electric yellow and soft blue",
  },
  "fandom": {
    metaphor:
      "USA map mosaic where each city block is a different helmet jersey or ball icon stitched into regional patches",
    palette: "athletic primary colors cream and charcoal",
  },
  "dynasties": {
    metaphor:
      "giant trophy scale tipping between a mountain of banners and a crater of empty pedestals, tiny silhouetted athletes climbing both sides",
    palette: "championship gold crimson slate and cream",
  },
  "slices": {
    metaphor:
      "pixel-art sword slicing a glowing score orb into critic stars and dollar coins falling in opposite directions",
    palette: "neon cyan magenta charcoal and mint",
  },
  "steam": {
    metaphor:
      "steaming locomotive of game cartridges pouring playtime hourglasses and coins onto a marketplace platform",
    palette: "Steam dark navy teal orange and steel gray",
  },

  // —— Arts / film / music / language ——
  anime: {
    metaphor:
      "century-tall anime film reel unspooling into floating character silhouettes and rising sun motifs over a Tokyo skyline of cel frames",
    palette: "ink black cherry red cream and sky blue",
  },
  "lyrics": {
    metaphor:
      "two mirrored microphone towers of interlocking lyric ribbons forming a dueling skyline, sequin and handwritten note textures",
    palette: "stage gold champagne black and rose",
  },
  "billboard": {
    metaphor:
      "skyscraper of stacked vinyl records and chart arrows piercing a golden number-one crown floating above tiny silhouetted crowds",
    palette: "chart gold black hot pink and cream",
  },
  "rankings": {
    metaphor:
      "crowded staircase of identical chart positions squeezing into a narrow golden peak, vinyl discs as stepping stones",
    palette: "billboard black gold red and cream",
  },
  "broadway": {
    metaphor:
      "marquee lights forming a rising staircase of open playbills and ticket stubs climbing into a theatrical night sky",
    palette: "broadway gold crimson velvet black and cream",
  },
  "novels": {
    metaphor:
      "open hardcover books blossoming into evergreen trees dusted with paper-snow and ribbon bookmarks",
    palette: "evergreen crimson cream and warm gold",
  },
  "carols": {
    metaphor:
      "vinyl ornaments hanging from a musical staff tree while sleigh-bell notes orbit endlessly",
    palette: "holiday red green cream and silver",
  },
  "comics": {
    metaphor:
      "oversized comic-book power dial of primary-color silhouettes bursting from a torn comic panel into cosmic scale",
    palette: "comic yellow cyan magenta and ink black",
  },
  "emmys": {
    metaphor:
      "tower of Emmy-winged statues unbalanced on a TV screen pedestal, award ribbons spilling like waterfall",
    palette: "statuette gold midnight blue and champagne",
  },
  franchise: {
    metaphor:
      "hydra of interlocking movie logos and toy boxes growing from a single golden franchise trunk into a money forest",
    palette: "blockbuster gold midnight and crimson",
  },
  "margins": {
    metaphor:
      "blood-red ticket stubs morphing into dollar bills sprouting from a cracked horror-mask vault",
    palette: "horror crimson black bone white and sickly green",
  },
  "horror": {
    metaphor:
      "exploding catalog of VHS cassette silhouettes and abstract shadow shapes forming a rising tide across a torn theater curtain",
    palette: "midnight black blood red and grainy cream",
  },
  "blockbusters": {
    metaphor:
      "giant clapperboard alphabet blocks stacking into a famous-movie skyline scored with yellow star ratings",
    palette: "IMDb yellow charcoal cream and filmstrip black",
  },
  "languages": {
    metaphor:
      "world globe sprouting branching language trees with script glyphs as leaves concentrating on a few dense canopies",
    palette: "manuscript cream indigo terracotta and ink",
  },
  "trademarks": {
    metaphor:
      "monogrammed luxury trunk colliding with a bubbling tea cup courtroom gavel, fashion icons and tea leaves swirling as legal storm",
    palette: "LV brown gold jade green and court cream",
  },
  "fame": {
    metaphor:
      "mechanical music box of catalog gears cranking out reinvented pop-star silhouettes and vinyl moons",
    palette: "electric magenta chrome cream and deep violet",
  },
  "netflix": {
    metaphor:
      "hourglass of streaming red play-buttons pouring viewing-hours sand onto a couch of tiny silhouetted viewers",
    palette: "Netflix red black and cool gray",
  },
  "catalog": {
    metaphor:
      "tilting library shelves where film reels and series boxes trade places in a red-black catalog avalanche",
    palette: "Netflix red charcoal and cream",
  },
  "pixar": {
    metaphor:
      "Pixar desk lamp casting a beam that cracks across Cars and Lightyear toy blocks while other toys glow intact",
    palette: "animation blue warm amber cream and slate",
  },
  "lcsh": {
    metaphor:
      "antique world map redrawn as open public-domain books with page rivers connecting classic titles as cities",
    palette: "parchment sepia forest green and ink black",
  },
  "lcsh": {
    metaphor:
      "towering bookshelf cathedral where subject spines form stained-glass windows of knowledge",
    palette: "library brown cream burgundy and gold",
  },
  "radio": {
    metaphor:
      "USA map of radio dial towers broadcasting colored format waves like weather systems across the continent",
    palette: "broadcast orange teal cream and charcoal",
  },
  "albums": {
    metaphor:
      "mountain peak of vinyl albums crowned by a rolling stone, album covers as geologic strata",
    palette: "rock black scarlet cream and metallic silver",
  },
  "sherlock": {
    metaphor:
      "deerstalker hat and magnifying glass enlarging a labyrinth of word-count scrolls into Baker Street fog",
    palette: "fog gray burgundy cream and tobacco brown",
  },
  "simpsons": {
    metaphor:
      "yellow couch overflowing with silhouette guest stars tumbling from a TV screen sky like confetti",
    palette: "Simpsons yellow sky blue and cartoon black",
  },
  "streaming": {
    metaphor:
      "competing streaming platform towers made of stacked title tiles casting shadow libraries across a living-room landscape",
    palette: "multi-platform teal magenta charcoal and cream",
  },
  "television": {
    metaphor:
      "cracked golden television throne with prestige laurel leaves wilting on one side and critic stars raining on the other",
    palette: "prestige gold charcoal cream and muted teal",
  },
  "museums": {
    metaphor:
      "museum pediments and classical columns sinking into a topographic deprivation map of the UK, artifact silhouettes floating",
    palette: "stone gray British racing green cream and oxblood",
  },

  // —— Culture / food / travel / environment ——
  "airlines": {
    metaphor:
      "oversized cracked airplane fuselage as a broken bird skeleton hanging over a tiny airport terminal",
    palette: "cobalt navy cream and warning orange",
  },
  "alcohol": {
    metaphor:
      "continent-shaped wine bottles and beer steins pouring measured rivers of liquid across a world map bar counter",
    palette: "wine burgundy amber cream and charcoal",
  },
  "pizza": {
    metaphor:
      "giant pizza slice as a city skyline of toppings with coin stacks melting into mozzarella rivers",
    palette: "tomato red mozzarella cream basil green and crust gold",
  },
  "bikeshare": {
    metaphor:
      "orange bike-share bicycles forming a radial orbit around Portland bridges, tire tracks as city veins",
    palette: "Biketown orange forest green and mist gray",
  },
  coffee: {
    metaphor:
      "oversized coffee bean planet orbited by shipping containers and steaming cups as satellites",
    palette: "espresso brown cream jade and gold",
  },
  "coffee": {
    metaphor:
      "oversized coffee bean planet orbited by shipping containers and steaming cups as satellites",
    palette: "espresso brown cream jade and gold",
  },
  "breweries": {
    metaphor:
      "hop cone mountains and IPA bottle towers releasing bitter foam clouds across an American craft landscape",
    palette: "hop green amber foam cream and barrel brown",
  },
  "exercise": {
    metaphor:
      "USA map made of dumbbells and running shoes with some states flexing taller as fitness peaks",
    palette: "athletic teal coral cream and charcoal",
  },
  "calories": {
    metaphor:
      "burger and fry towers emitting calorie-flame auras dwarfing tiny silhouetted diners at drive-thru windows",
    palette: "ketchup red mustard yellow cream and grease brown",
  },
  "plastic": {
    metaphor:
      "ocean wave of plastic bottles and bags forming a continent that sinks mismanaged waste islands",
    palette: "ocean teal plastic white warning orange and sludge gray",
  },
  "hurricanes": {
    metaphor:
      "spiraling hurricane eye of debris and palm silhouettes striking a Puerto Rico island cross-section",
    palette: "storm slate turquoise warning yellow and deep indigo",
  },
  lego: {
    metaphor:
      "city of interlocking LEGO bricks growing increasingly complex towers of themed minifig silhouettes",
    palette: "LEGO red yellow blue and brick gray",
  },
  "legos": {
    metaphor:
      "city of interlocking LEGO bricks growing increasingly complex towers of themed minifig silhouettes",
    palette: "LEGO red yellow blue and brick gray",
  },
  "parks": {
    metaphor:
      "oversized park ranger hat and mountain peaks stamped with visitor footprints flowing like rivers into crowded trail bottlenecks",
    palette: "park service green sandstone cream and sky blue",
  },
  "restaurants": {
    metaphor:
      "alphabet grade letters A B C as neon restaurant signs tilting over steaming food carts and inspection clipboards",
    palette: "NYC taxi yellow subway green cream and brick",
  },
  "ramen": {
    metaphor:
      "giant steaming ramen bowl with noodle ribbons forming ranking ladders and brand chopsticks as survey markers",
    palette: "broth gold chili red cream and lacquer black",
  },
  "wine": {
    metaphor:
      "wine bottle price tags stretching into a critic-point staircase that doesn't always climb with the liquid gold",
    palette: "cabernet burgundy cork cream and vineyard green",
  },
  "heritage": {
    metaphor:
      "UNESCO heritage monuments sprouting across a Scandinavian map like crystalline landmarks growing year by year",
    palette: "fjord blue pine green stone cream and gold",
  },

  // —— Civics / economics / politics / education ——
  "oscars": {
    metaphor:
      "three interlocking award statues converting spotlight beams into gold coin rain over a prestige marketplace",
    palette: "oscar gold grammy chrome nobel green and cream",
  },
  "mac": {
    metaphor:
      "world map paved with Big Mac sandwiches as currency tiles, some nations inflated taller than others",
    palette: "McDonald's red yellow cream and charcoal",
  },
  "rivalry": {
    metaphor:
      "California bear and Texas star locked in a tug-of-war over a split USA map of policy icons and industry symbols",
    palette: "California gold Texas burnt orange navy and cream",
  },
  "ceos": {
    metaphor:
      "revolving glass corner-office door ejecting briefcase silhouettes down a corporate hourglass",
    palette: "boardroom navy charcoal gold and cream",
  },
  "factbook": {
    metaphor:
      "classified dossier globe unfolding into population towers versus prosperity lanterns across continents",
    palette: "intelligence olive cream crimson and slate",
  },
  "bioeconomics": {
    metaphor:
      "city skyline as a motherboard of export ports culture circuits and scarcity warning lights",
    palette: "circuit teal concrete gray gold and night indigo",
  },
  "majors": {
    metaphor:
      "diploma trees bearing fruit of dollar signs while some branches hold job-risk storm clouds",
    palette: "campus green diploma cream gold and caution orange",
  },
  "geopolitics": {
    metaphor:
      "shipping containers opening into film reels music notes and game controllers launching as national geopolitics rockets",
    palette: "export blue container orange cream and black",
  },
  "exporters": {
    metaphor:
      "three industrial chimneys shaped as US China Germany flags exhaling trade-route ribbons across a shared ocean",
    palette: "flag reds blues golds and steel gray",
  },
  "youtube": {
    metaphor:
      "YouTube play-button hive expanding into a network of studio pods and podcast microphones beyond a single channel tower",
    palette: "YouTube red black cream and electric blue",
  },
  "prisons": {
    metaphor:
      "USA state silhouettes as prison-bar graphs diverging wildly in height across a justice landscape",
    palette: "institutional gray steel blue cream and warning red",
  },
  "atlas": {
    metaphor:
      "atlas pages where each nation is drawn as its signature export product morphing into a cultural crest",
    palette: "atlas cream teal gold and ink",
  },
  "metros": {
    metaphor:
      "Manhattan skyscraper command tower facing a San Francisco invention machine of bridges and startups across a twin-city divide",
    palette: "NYC charcoal SF fog teal gold and cream",
  },
  "sf": {
    metaphor:
      "giant microscope lens magnifying a San Francisco skyline of code circuits crushed under housing-pressure weights",
    palette: "fog gray tech teal brick and gold",
  },
  "schools": {
    metaphor:
      "classroom globe of multicolored student silhouettes blooming densest in certain state-shaped gardens",
    palette: "chalk pastel primary colors cream and slate",
  },
  "superbowl": {
    metaphor:
      "football field of billboard screens exploding into viral meme confetti after the final whistle",
    palette: "Super Bowl metallic blue gold cream and ad red",
  },
  "diplomacy": {
    metaphor:
      "UN assembly hall of raised hands splitting into two tectonic vote-plate continents",
    palette: "UN blue olive cream and charcoal",
  },
  "phds": {
    metaphor:
      "graduation caps launching as rockets from exploding academic field towers of different heights",
    palette: "academic navy gold cream and research green",
  },
  "tuition": {
    metaphor:
      "diploma ladder with tuition dollar rungs stretching taller state by state into a debt cloud",
    palette: "campus brick cream gold and storm gray",
  },
  "voters": {
    metaphor:
      "ballot-box mountains rising unevenly across a USA map of checkmarks and empty polling chairs",
    palette: "election blue red cream and graphite",
  },
  "wealth": {
    metaphor:
      "pyramid of gold coin stacks where the tip holds almost everything while a vast base of tiny silhouetted figures supports it",
    palette: "wealth gold charcoal cream and deep green",
  },

  // —— Humanities ——
  "beyonce": {
    metaphor:
      "stage lights forming a geometric control grid around a lone microphone throne, golden hand closing over a concert arena",
    palette: "stage gold black rose and spotlight white",
  },
  "caesar-the-artometrics-of-emperor-julius": {
    metaphor:
      "marble laurel wreath crushing a Roman coin skyline while tiny silhouetted senators climb falling columns",
    palette: "Roman marble crimson gold and bronze",
  },
  "caesar": {
    metaphor:
      "marble laurel wreath crushing a Roman coin skyline while tiny silhouetted senators climb falling columns",
    palette: "Roman marble crimson gold and bronze",
  },
  imperial: {
    metaphor:
      "empire chronicle scroll unrolling to reveal hidden gold vaults and erased labor silhouettes beneath triumphant monuments",
    palette: "imperial purple bronze parchment and blood red",
  },
  "pantheon": {
    metaphor:
      "classical pantheon dome filled with floating name-plaques and fading silhouettes of the remembered and forgotten",
    palette: "pantheon stone gold dusk blue and cream",
  },
  "emperors": {
    metaphor:
      "timeline of emperor busts as unequal pillars some towering for decades others crumbling in months",
    palette: "Rome marble burgundy bronze and cream",
  },

  // —— Science ——
  cetaceans: {
    metaphor:
      "whale and dolphin silhouettes nested by family size like Russian dolls swimming through a scientific depth chart",
    palette: "ocean indigo seafoam cream and bone white",
  },
  "longevity": {
    metaphor:
      "hourglass of five centuries where human silhouettes grow taller as lifespan sand doubles",
    palette: "medical teal cream gold and soft charcoal",
  },
  "wastewater": {
    metaphor:
      "underground cathedral of wastewater pipes and treatment tanks serving cities of tiny silhouetted figures above",
    palette: "utility blue concrete gray seafoam and amber",
  },
  "medium": {
    metaphor:
      "Medium green circles as applause meters rising beside article-length scrolls of uneven height",
    palette: "Medium green cream charcoal and soft gold",
  },
  "nuclear": {
    metaphor:
      "abstract atomic test yield strata as geometric orange and ash-gray desert layers with instrument silhouettes",
    palette: "atomic orange ash gray warning yellow and void black",
  },
  readmitted: {
    metaphor:
      "hospital bed revolving door looping patients back through a 30-day calendar ring of medical crosses",
    palette: "hospital teal cream soft red and slate",
  },
  "metrics": {
    metaphor:
      "browser windows racing as sailboats on a sea of loading bars and metric dials",
    palette: "web blue lime cream and charcoal",
  },
};

const STYLE_SUFFIX =
  "flat graphic shapes, heavy grain texture overlay, Bloomberg Businessweek / The Economist / The Atlantic magazine illustration style, bold asymmetric composition, surreal conceptual metaphor, no text, 16:9";

/**
 * @param {{ metaphor: string, palette: string, style?: string }} entry
 */
export function buildPrompt(entry) {
  const styleBit = entry.style ? `${entry.style}, ` : "";
  return `editorial illustration, ${entry.metaphor}, ${STYLE_SUFFIX.replace(
    "flat graphic shapes",
    `flat graphic shapes, ${entry.palette} palette`
  ).replace("bold asymmetric composition, surreal conceptual metaphor, ", styleBit ? `${styleBit}` : "bold asymmetric composition, surreal conceptual metaphor, ")}`;
}

/** Cleaner explicit builder */
export function buildEditorialPrompt(entry) {
  const parts = [
    "editorial illustration,",
    entry.metaphor + ",",
    "flat graphic shapes,",
    `${entry.palette} palette,`,
    "heavy grain texture overlay,",
    "Bloomberg Businessweek / The Economist / The Atlantic magazine illustration style,",
  ];
  if (entry.style) parts.push(`${entry.style},`);
  else parts.push("bold asymmetric composition, surreal conceptual metaphor,");
  parts.push("no text, 16:9");
  return parts.join(" ");
}

function isMain() {
  const entry = process.argv[1] ? fileURLToPath(import.meta.url) : "";
  return process.argv[1] && join(process.argv[1]) === entry;
}

if (isMain()) {
  function arg(name) {
    const i = process.argv.indexOf(`--${name}`);
    if (i === -1) return null;
    return process.argv[i + 1] ?? true;
  }

  const slugFilter = arg("slug");
  const asJson = process.argv.includes("--json");

  const blog = JSON.parse(
    readFileSync(join(ROOT, "src/generated/blog.json"), "utf8")
  );
  const rows = [];

  for (const post of blog) {
    const slug = post.slug || post.id;
    if (slugFilter && slugFilter !== true && slug !== slugFilter) continue;
    const entry = BANNER_METAPHORS[slug];
    if (!entry) {
      rows.push({
        slug,
        title: post.title,
        prompt: null,
        missing: true,
      });
      continue;
    }
    rows.push({
      slug,
      title: post.title,
      tags: post.tags,
      prompt: buildEditorialPrompt(entry),
    });
  }

  if (asJson) {
    console.log(JSON.stringify(rows, null, 2));
  } else if (slugFilter && rows[0]?.prompt) {
    console.log(rows[0].prompt);
  } else {
    const missing = rows.filter((r) => r.missing);
    console.log(`prompts: ${rows.length - missing.length}/${blog.length}`);
    if (missing.length) {
      console.error("Missing metaphors for:");
      for (const m of missing) console.error(`  - ${m.slug}`);
      process.exitCode = 1;
    }
    for (const r of rows.filter((r) => r.prompt)) {
      console.log(`\n## ${r.slug}\n${r.prompt}`);
    }
  }
}
