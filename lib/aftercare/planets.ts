/** Reflective planet / season metadata for Aftercare celestial UI — not science. */

export type PlanetId =
  | "Sun"
  | "Moon"
  | "Mercury"
  | "Venus"
  | "Mars"
  | "Jupiter"
  | "Saturn";

export type PlanetMeta = {
  id: PlanetId;
  houseHint: string;
  vibe: string;
  prompt: string;
  /** Wikimedia Commons / NASA public-domain imagery */
  imageUrl: string;
  glow: string;
};

export type SignPlanet = {
  sign: string;
  planet: PlanetId;
  seasonTitle: string;
  seasonLine: string;
};

const PLANETS: Record<PlanetId, PlanetMeta> = {
  Sun: {
    id: "Sun",
    houseHint: "5th House light",
    vibe: "Vitality, visibility, creative heat",
    prompt: "Where do you want to be seen without performing?",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/640px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg",
    glow: "#E8A54B",
  },
  Moon: {
    id: "Moon",
    houseHint: "4th House tide",
    vibe: "Mood, memory, belonging",
    prompt: "What would make your body feel housed tonight?",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/640px-FullMoon2010.jpg",
    glow: "#C9C4B8",
  },
  Mercury: {
    id: "Mercury",
    houseHint: "3rd House signal",
    vibe: "Language, curiosity, quick links",
    prompt: "Name one true sentence you have been editing away.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/640px-Mercury_in_true_color.jpg",
    glow: "#B8A070",
  },
  Venus: {
    id: "Venus",
    houseHint: "7th House bond",
    vibe: "Taste, affection, aesthetic care",
    prompt: "What beauty are you willing to protect this week?",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Venus_from_Mariner_10.jpg/640px-Venus_from_Mariner_10.jpg",
    glow: "#D4A574",
  },
  Mars: {
    id: "Mars",
    houseHint: "1st House drive",
    vibe: "Agency, heat, clean conflict",
    prompt: "Where can courage be precise instead of loud?",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/640px-OSIRIS_Mars_true_color.jpg",
    glow: "#C45C3E",
  },
  Jupiter: {
    id: "Jupiter",
    houseHint: "9th House horizon",
    vibe: "Meaning, range, generous luck",
    prompt: "What belief needs a wider map — or an edit?",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/640px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    glow: "#D4C48A",
  },
  Saturn: {
    id: "Saturn",
    houseHint: "10th House structure",
    vibe: "Time, craft, earned authority",
    prompt: "Which boundary would make the work last longer?",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/640px-Saturn_during_Equinox.jpg",
    glow: "#C4B896",
  },
};

const SIGN_MAP: Record<string, Omit<SignPlanet, "sign">> = {
  Aries: {
    planet: "Mars",
    seasonTitle: "ARIES SEASON",
    seasonLine: "Begin clean. Heat with aim.",
  },
  Taurus: {
    planet: "Venus",
    seasonTitle: "TAURUS SEASON",
    seasonLine: "Root in the senses. Keep what lasts.",
  },
  Gemini: {
    planet: "Mercury",
    seasonTitle: "GEMINI SEASON",
    seasonLine: "Let curiosity travel — then finish a thread.",
  },
  Cancer: {
    planet: "Moon",
    seasonTitle: "CANCER SEASON",
    seasonLine: "Tend the tide. Softness with a door.",
  },
  Leo: {
    planet: "Sun",
    seasonTitle: "LEO SEASON",
    seasonLine: "Shine honestly. Share the light.",
  },
  Virgo: {
    planet: "Mercury",
    seasonTitle: "VIRGO SEASON",
    seasonLine: "Refine the ordinary. Done beats perfect.",
  },
  Libra: {
    planet: "Venus",
    seasonTitle: "LIBRA SEASON",
    seasonLine: "Balance includes your needs.",
  },
  Scorpio: {
    planet: "Mars",
    seasonTitle: "SCORPIO SEASON",
    seasonLine: "Go under the surface with consent.",
  },
  Sagittarius: {
    planet: "Jupiter",
    seasonTitle: "SAGITTARIUS SEASON",
    seasonLine: "Seek range. Edit the sermon.",
  },
  Capricorn: {
    planet: "Saturn",
    seasonTitle: "CAPRICORN SEASON",
    seasonLine: "Climb with rest built in.",
  },
  Aquarius: {
    planet: "Saturn",
    seasonTitle: "AQUARIUS SEASON",
    seasonLine: "Invent belonging. Stay human.",
  },
  Pisces: {
    planet: "Jupiter",
    seasonTitle: "PISCES SEASON",
    seasonLine: "Dream with a frame. Sleep is practice.",
  },
};

export function planetMeta(id: PlanetId): PlanetMeta {
  return PLANETS[id];
}

export function signPlanet(sign: string | null | undefined): SignPlanet | null {
  if (!sign) return null;
  const row = SIGN_MAP[sign];
  if (!row) return null;
  return { sign, ...row };
}

export function celestialForSign(sign: string | null | undefined) {
  const sp = signPlanet(sign);
  if (!sp) {
    return {
      sign: null as string | null,
      seasonTitle: "SKY CHECK-IN",
      seasonLine: "Add a birth date to unlock your sun season poster.",
      planet: PLANETS.Moon,
    };
  }
  return {
    sign: sp.sign,
    seasonTitle: sp.seasonTitle,
    seasonLine: sp.seasonLine,
    planet: PLANETS[sp.planet],
  };
}

export function allPlanets(): PlanetMeta[] {
  return Object.values(PLANETS);
}
