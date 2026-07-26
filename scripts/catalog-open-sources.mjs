#!/usr/bin/env node
/**
 * Build open-reference catalogs for Project Gutenberg, WikiArt/Wikimedia,
 * and Wikipedia/Wikidata into public/data/reference/.
 *
 * Usage:
 *   node scripts/catalog-open-sources.mjs
 *   npm run catalog:open
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_ROOT = path.join(ROOT, "public/data/reference");

const USER_AGENT =
  "ArtometricsCatalogBot/1.0 (+https://artometrics.com; open-reference catalogs)";
const GUTENBERG_TARGET = 250;
const FETCH_TIMEOUT_MS = 45_000;

const CLASSIC_AUTHOR_NEEDLES = [
  "Austen, Jane",
  "Dickens, Charles",
  "Shakespeare, William",
  "Twain, Mark",
  "Doyle, Arthur Conan",
  "Tolstoy, Leo",
  "Dostoyevsky, Fyodor",
  "Dostoevsky, Fyodor",
  "Brontë, Charlotte",
  "Bronte, Charlotte",
  "Brontë, Emily",
  "Bronte, Emily",
  "Melville, Herman",
  "Hawthorne, Nathaniel",
  "Poe, Edgar Allan",
  "Verne, Jules",
  "Wells, H. G.",
  "Hugo, Victor",
  "Dumas, Alexandre",
  "Carroll, Lewis",
  "Stevenson, Robert Louis",
  "Conrad, Joseph",
  "James, Henry",
  "Hardy, Thomas",
  "Eliot, George",
  "Wharton, Edith",
  "Wilde, Oscar",
  "Joyce, James",
  "Kafka, Franz",
  "Chekhov, Anton",
  "Homer",
  "Plato",
  "Aristotle",
  "Milton, John",
  "Swift, Jonathan",
  "Defoe, Daniel",
  "Shelley, Mary Wollstonecraft",
  "Shelley, Percy Bysshe",
  "Keats, John",
  "Whitman, Walt",
  "Thoreau, Henry David",
  "Emerson, Ralph Waldo",
  "Nietzsche, Friedrich",
  "Kant, Immanuel",
  "Descartes, René",
  "Voltaire",
  "Rousseau, Jean-Jacques",
  "Machiavelli, Niccolò",
  "Cervantes Saavedra, Miguel de",
  "Alighieri, Dante",
  "Goethe, Johann Wolfgang",
  "Balzac, Honoré de",
  "Flaubert, Gustave",
  "Zola, Émile",
  "Maupassant, Guy de",
  "Kipling, Rudyard",
  "London, Jack",
  "Stoker, Bram",
  "Alcott, Louisa May",
  "Montgomery, L. M.",
  "Baum, L. Frank",
  "Barrie, J. M.",
  "Gaskell, Elizabeth Cleghorn",
  "Trollope, Anthony",
  "Scott, Walter",
  "Cooper, James Fenimore",
  "Irving, Washington",
  "Longfellow, Henry Wadsworth",
  "Tennyson, Alfred",
  "Byron, George Gordon",
  "Wordsworth, William",
  "Blake, William",
  "Franklin, Benjamin",
  "Jefferson, Thomas",
  "Douglass, Frederick",
  "Equiano, Olaudah",
  "Austen",
  "Chaucer, Geoffrey",
  "Bunyan, John",
  "Fielding, Henry",
  "Sterne, Laurence",
  "Gibbon, Edward",
  "Darwin, Charles",
  "Marx, Karl",
  "Engels, Friedrich",
  "Freud, Sigmund",
  "James, William",
  "Dewey, John",
  "Chesterton, G. K.",
  "Shaw, Bernard",
  "Ibsen, Henrik",
  "Strindberg, August",
  "Pushkin, Aleksandr",
  "Turgenev, Ivan",
  "Gogol, Nikolai",
  "Andersen, H. C.",
  "Grimm, Jacob",
  "Grimm, Wilhelm",
  "Aesop",
  "Virgil",
  "Ovid",
  "Cicero",
  "Marcus Aurelius",
  "Augustine",
  "Aquinas, Thomas",
  "Bacon, Francis",
  "Hobbes, Thomas",
  "Locke, John",
  "Hume, David",
  "Smith, Adam",
  "Mill, John Stuart",
  "Woolf, Virginia",
  "Lawrence, D. H.",
  "Forster, E. M.",
  "Fitzgerald, F. Scott",
  "Hemingway, Ernest",
  "Crane, Stephen",
  "Norris, Frank",
  "Sinclair, Upton",
  "Gilman, Charlotte Perkins",
  "Stowe, Harriet Beecher",
  "Burnett, Frances Hodgson",
  "Nesbit, E.",
  "Potter, Beatrix",
];

const CLASSIC_BOOKSHELF_NEEDLES = [
  "Best Books Ever Listings",
  "Harvard Classics",
  "Banned Books from Anne Haight's list",
  "Children's Literature",
  "Science Fiction",
  "Adventure",
  "Historical Fiction",
  "Gothic Fiction",
  "Philosophy",
  "Politics",
];

/** Curated public-domain paintings (Wikimedia Commons). Used when live API fails. */
const WIKIART_CURATED = [
  {
    id: "mona-lisa",
    artist: "Leonardo da Vinci",
    title: "Mona Lisa",
    year: "c. 1503–1506",
    style: "High Renaissance",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
    license: "Public domain",
  },
  {
    id: "last-supper",
    artist: "Leonardo da Vinci",
    title: "The Last Supper",
    year: "1495–1498",
    style: "High Renaissance",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg",
    license: "Public domain",
  },
  {
    id: "birth-of-venus",
    artist: "Sandro Botticelli",
    title: "The Birth of Venus",
    year: "c. 1484–1486",
    style: "Early Renaissance",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    license: "Public domain",
  },
  {
    id: "school-of-athens",
    artist: "Raphael",
    title: "The School of Athens",
    year: "1509–1511",
    style: "High Renaissance",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
    license: "Public domain",
  },
  {
    id: "sistine-creation-of-adam",
    artist: "Michelangelo",
    title: "The Creation of Adam",
    year: "c. 1512",
    style: "High Renaissance",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
    license: "Public domain",
  },
  {
    id: "girl-with-a-pearl-earring",
    artist: "Johannes Vermeer",
    title: "Girl with a Pearl Earring",
    year: "c. 1665",
    style: "Dutch Golden Age",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0f/1665_Girl_with_a_Pearl_Earring.jpg",
    license: "Public domain",
  },
  {
    id: "night-watch",
    artist: "Rembrandt",
    title: "The Night Watch",
    year: "1642",
    style: "Dutch Golden Age",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/5a/The_Night_Watch_-_HD.jpg",
    license: "Public domain",
  },
  {
    id: "arnolfini-portrait",
    artist: "Jan van Eyck",
    title: "The Arnolfini Portrait",
    year: "1434",
    style: "Northern Renaissance",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg",
    license: "Public domain",
  },
  {
    id: "garden-of-earthly-delights",
    artist: "Hieronymus Bosch",
    title: "The Garden of Earthly Delights",
    year: "c. 1490–1510",
    style: "Northern Renaissance",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/Hieronymus_Bosch_-_The_Garden_of_Earthly_Delights_-_Garden_of_Earthly_Delights_%28Ecclesia%27s_Paradise%29.jpg",
    license: "Public domain",
  },
  {
    id: "las-meninas",
    artist: "Diego Velázquez",
    title: "Las Meninas",
    year: "1656",
    style: "Baroque",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg",
    license: "Public domain",
  },
  {
    id: "starry-night",
    artist: "Vincent van Gogh",
    title: "The Starry Night",
    year: "1889",
    style: "Post-Impressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    license: "Public domain",
  },
  {
    id: "sunflowers",
    artist: "Vincent van Gogh",
    title: "Sunflowers",
    year: "1888",
    style: "Post-Impressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/46/Vincent_Willem_van_Gogh_127.jpg",
    license: "Public domain",
  },
  {
    id: "cafe-terrace-at-night",
    artist: "Vincent van Gogh",
    title: "Café Terrace at Night",
    year: "1888",
    style: "Post-Impressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/09/Van_Gogh_-_Terrasse_des_Caf%C3%A9s_an_der_Place_du_Forum_in_Arles_am_Abend1.jpeg",
    license: "Public domain",
  },
  {
    id: "water-lilies",
    artist: "Claude Monet",
    title: "Water Lilies",
    year: "c. 1915–1926",
    style: "Impressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
    license: "Public domain",
  },
  {
    id: "impression-sunrise",
    artist: "Claude Monet",
    title: "Impression, Sunrise",
    year: "1872",
    style: "Impressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/59/Monet_-_Impression%2C_Sunrise.jpg",
    license: "Public domain",
  },
  {
    id: "luncheon-of-the-boating-party",
    artist: "Pierre-Auguste Renoir",
    title: "Luncheon of the Boating Party",
    year: "1880–1881",
    style: "Impressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8d/Pierre-Auguste_Renoir_-_Luncheon_of_the_Boating_Party_-_Google_Art_Project.jpg",
    license: "Public domain",
  },
  {
    id: "a-sunday-on-la-grande-jatte",
    artist: "Georges Seurat",
    title: "A Sunday Afternoon on the Island of La Grande Jatte",
    year: "1884–1886",
    style: "Pointillism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.png",
    license: "Public domain",
  },
  {
    id: "the-scream",
    artist: "Edvard Munch",
    title: "The Scream",
    year: "1893",
    style: "Expressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    license: "Public domain",
  },
  {
    id: "whistlers-mother",
    artist: "James McNeill Whistler",
    title: "Arrangement in Grey and Black No. 1 (Whistler's Mother)",
    year: "1871",
    style: "Tonalism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/Whistlers_Mother_high_res.jpg",
    license: "Public domain",
  },
  {
    id: "american-gothic",
    artist: "Grant Wood",
    title: "American Gothic",
    year: "1930",
    style: "Regionalism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
    license: "Public domain (US; published 1930)",
  },
  {
    id: "arrangement-in-grey-and-black",
    artist: "James Abbott McNeill Whistler",
    title: "Nocturne in Black and Gold – The Falling Rocket",
    year: "1875",
    style: "Tonalism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/66/Whistler-Nocturne_in_black_and_gold.jpg",
    license: "Public domain",
  },
  {
    id: "olympia",
    artist: "Édouard Manet",
    title: "Olympia",
    year: "1863",
    style: "Realism / Impressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/%C3%89douard_Manet_-_Olympia_-_Google_Art_Project.jpg",
    license: "Public domain",
  },
  {
    id: "bar-at-the-folies-bergere",
    artist: "Édouard Manet",
    title: "A Bar at the Folies-Bergère",
    year: "1882",
    style: "Impressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0d/%C3%89douard_Manet_-_A_Bar_at_the_Folies-Berg%C3%A8re_-_Google_Art_Project_2.jpg",
    license: "Public domain",
  },
  {
    id: "the-kiss-klimt",
    artist: "Gustav Klimt",
    title: "The Kiss",
    year: "1907–1908",
    style: "Art Nouveau / Symbolism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
    license: "Public domain",
  },
  {
    id: "great-wave",
    artist: "Katsushika Hokusai",
    title: "The Great Wave off Kanagawa",
    year: "c. 1831",
    style: "Ukiyo-e",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0d/Great_Wave_off_Kanagawa2.jpg",
    license: "Public domain",
  },
  {
    id: "liberty-leading-the-people",
    artist: "Eugène Delacroix",
    title: "Liberty Leading the People",
    year: "1830",
    style: "Romanticism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg",
    license: "Public domain",
  },
  {
    id: "raft-of-the-medusa",
    artist: "Théodore Géricault",
    title: "The Raft of the Medusa",
    year: "1818–1819",
    style: "Romanticism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/15/JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg",
    license: "Public domain",
  },
  {
    id: "wanderer-above-the-sea-of-fog",
    artist: "Caspar David Friedrich",
    title: "Wanderer above the Sea of Fog",
    year: "c. 1818",
    style: "Romanticism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
    license: "Public domain",
  },
  {
    id: "oath-of-the-horatii",
    artist: "Jacques-Louis David",
    title: "Oath of the Horatii",
    year: "1784",
    style: "Neoclassicism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/12/Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg",
    license: "Public domain",
  },
  {
    id: "saturn-devouring-his-son",
    artist: "Francisco Goya",
    title: "Saturn Devouring His Son",
    year: "c. 1820–1823",
    style: "Romanticism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/87/Francisco_de_Goya%2C_Saturno_devorando_a_su_hijo_%281819-1823%29.jpg",
    license: "Public domain",
  },
  {
    id: "third-of-may-1808",
    artist: "Francisco Goya",
    title: "The Third of May 1808",
    year: "1814",
    style: "Romanticism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_in_Google_Earth.jpg",
    license: "Public domain",
  },
  {
    id: "blue-nudes",
    artist: "Henri Matisse",
    title: "Luxe, Calme et Volupté",
    year: "1904",
    style: "Fauvism / Neo-Impressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Matisse-Luxe.jpg",
    license: "Public domain",
  },
  {
    id: "composition-vii",
    artist: "Wassily Kandinsky",
    title: "Composition VII",
    year: "1913",
    style: "Abstract",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Vasily_Kandinsky%2C_1913_-_Composition_7.jpg",
    license: "Public domain",
  },
  {
    id: "self-portrait-van-gogh",
    artist: "Vincent van Gogh",
    title: "Self-Portrait with Bandaged Ear",
    year: "1889",
    style: "Post-Impressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/68/Vincent_van_Gogh_-_Self-Portrait_with_Bandaged_Ear_-_Google_Art_Project.jpg",
    license: "Public domain",
  },
  {
    id: "sunday-afternoon-caillebotte",
    artist: "Gustave Caillebotte",
    title: "Paris Street; Rainy Day",
    year: "1877",
    style: "Impressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/95/Gustave_Caillebotte_-_Paris_Street%3B_Rainy_Day_-_Google_Art_Project.jpg",
    license: "Public domain",
  },
  {
    id: "dance-at-le-moulin",
    artist: "Pierre-Auguste Renoir",
    title: "Bal du moulin de la Galette",
    year: "1876",
    style: "Impressionism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/21/Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg",
    license: "Public domain",
  },
  {
    id: "bathers-at-asnieres",
    artist: "Georges Seurat",
    title: "Bathers at Asnières",
    year: "1884",
    style: "Pointillism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/74/Bathers_at_Asni%C3%A8res.jpg",
    license: "Public domain",
  },
  {
    id: "ophelia-millais",
    artist: "John Everett Millais",
    title: "Ophelia",
    year: "1851–1852",
    style: "Pre-Raphaelite",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg",
    license: "Public domain",
  },
  {
    id: "lady-of-shalott",
    artist: "John William Waterhouse",
    title: "The Lady of Shalott",
    year: "1888",
    style: "Pre-Raphaelite",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/John_William_Waterhouse_The_Lady_of_Shalott.jpg",
    license: "Public domain",
  },
  {
    id: "napoleon-in-his-study",
    artist: "Jacques-Louis David",
    title: "The Emperor Napoleon in His Study at the Tuileries",
    year: "1812",
    style: "Neoclassicism",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg",
    license: "Public domain",
  },
];

/** Curated Wikipedia entities (writers, figures, places). */
const WIKIPEDIA_CURATED = [
  { id: "Q692", label: "William Shakespeare", wikipediaTitle: "William_Shakespeare" },
  { id: "Q5686", label: "Charles Dickens", wikipediaTitle: "Charles_Dickens" },
  { id: "Q36322", label: "Jane Austen", wikipediaTitle: "Jane_Austen" },
  { id: "Q7243", label: "Leo Tolstoy", wikipediaTitle: "Leo_Tolstoy" },
  { id: "Q991", label: "Fyodor Dostoevsky", wikipediaTitle: "Fyodor_Dostoevsky" },
  { id: "Q6691", label: "Homer", wikipediaTitle: "Homer" },
  { id: "Q859", label: "Plato", wikipediaTitle: "Plato" },
  { id: "Q868", label: "Aristotle", wikipediaTitle: "Aristotle" },
  { id: "Q1399", label: "Niccolò Machiavelli", wikipediaTitle: "Niccol%C3%B2_Machiavelli" },
  { id: "Q307", label: "Galileo Galilei", wikipediaTitle: "Galileo_Galilei" },
  { id: "Q935", label: "Isaac Newton", wikipediaTitle: "Isaac_Newton" },
  { id: "Q937", label: "Albert Einstein", wikipediaTitle: "Albert_Einstein" },
  { id: "Q7198", label: "Cleopatra", wikipediaTitle: "Cleopatra" },
  { id: "Q1001", label: "Mahatma Gandhi", wikipediaTitle: "Mahatma_Gandhi" },
  { id: "Q8023", label: "Nelson Mandela", wikipediaTitle: "Nelson_Mandela" },
  { id: "Q22686", label: "Abraham Lincoln", wikipediaTitle: "Abraham_Lincoln" },
  { id: "Q8016", label: "Winston Churchill", wikipediaTitle: "Winston_Churchill" },
  { id: "Q7186", label: "Marie Curie", wikipediaTitle: "Marie_Curie" },
  { id: "Q7251", label: "Ada Lovelace", wikipediaTitle: "Ada_Lovelace" },
  { id: "Q34981", label: "Isaac Asimov", wikipediaTitle: "Isaac_Asimov" },
  { id: "Q1401", label: "Petrarch", wikipediaTitle: "Petrarch" },
  { id: "Q1067", label: "Dante Alighieri", wikipediaTitle: "Dante_Alighieri" },
  { id: "Q535", label: "Victor Hugo", wikipediaTitle: "Victor_Hugo" },
  { id: "Q7200", label: "Virginia Woolf", wikipediaTitle: "Virginia_Woolf" },
  { id: "Q131333", label: "Emily Dickinson", wikipediaTitle: "Emily_Dickinson" },
  { id: "Q42402", label: "Walt Whitman", wikipediaTitle: "Walt_Whitman" },
  { id: "Q131149", label: "Langston Hughes", wikipediaTitle: "Langston_Hughes" },
  { id: "Q90", label: "Paris", wikipediaTitle: "Paris" },
  { id: "Q84", label: "London", wikipediaTitle: "London" },
  { id: "Q60", label: "New York City", wikipediaTitle: "New_York_City" },
  { id: "Q220", label: "Rome", wikipediaTitle: "Rome" },
  { id: "Q1726", label: "Athens", wikipediaTitle: "Athens" },
  { id: "Q1490", label: "Tokyo", wikipediaTitle: "Tokyo" },
  { id: "Q61", label: "Washington, D.C.", wikipediaTitle: "Washington,_D.C." },
  { id: "Q64", label: "Berlin", wikipediaTitle: "Berlin" },
  { id: "Q1741", label: "Vienna", wikipediaTitle: "Vienna" },
  { id: "Q243", label: "Louvre", wikipediaTitle: "Louvre" },
  { id: "Q6373", label: "British Museum", wikipediaTitle: "British_Museum" },
  { id: "Q160236", label: "Metropolitan Museum of Art", wikipediaTitle: "Metropolitan_Museum_of_Art" },
  { id: "Q49133", label: "Harvard University", wikipediaTitle: "Harvard_University" },
];

const notes = {
  gutenberg: { fetch: null, fallback: null },
  wikiart: { fetch: null, fallback: null },
  wikipedia: { fetch: null, fallback: null },
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function writeReadme(dir, body) {
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, "README.md"), body.trimStart(), "utf8");
}

async function fetchText(url, { accept } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: accept || "*/*",
      },
    });
    if (!res.ok) {
      const err = new Error(`HTTP ${res.status} for ${url}`);
      err.status = res.status;
      throw err;
    }
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJson(url, { accept } = {}) {
  const text = await fetchText(url, {
    accept: accept || "application/json",
  });
  return JSON.parse(text);
}

/** Minimal CSV parser that handles quoted fields with commas. */
function parseCsv(text) {
  const rows = [];
  let i = 0;
  const len = text.length;

  function readField() {
    if (text[i] === '"') {
      i += 1;
      let out = "";
      while (i < len) {
        if (text[i] === '"') {
          if (text[i + 1] === '"') {
            out += '"';
            i += 2;
            continue;
          }
          i += 1;
          break;
        }
        out += text[i];
        i += 1;
      }
      if (text[i] === ",") i += 1;
      return out;
    }
    let out = "";
    while (i < len && text[i] !== "," && text[i] !== "\n" && text[i] !== "\r") {
      out += text[i];
      i += 1;
    }
    if (text[i] === ",") i += 1;
    return out;
  }

  function readRow() {
    if (i >= len) return null;
    if (text[i] === "\r") i += 1;
    if (text[i] === "\n") {
      i += 1;
      return null;
    }
    const fields = [];
    while (i < len && text[i] !== "\n" && text[i] !== "\r") {
      fields.push(readField());
    }
    if (text[i] === "\r") i += 1;
    if (text[i] === "\n") i += 1;
    return fields;
  }

  const header = readRow();
  if (!header) return [];
  while (i < len) {
    const fields = readRow();
    if (!fields || fields.length === 0) continue;
    const obj = {};
    for (let c = 0; c < header.length; c += 1) {
      obj[header[c]] = fields[c] ?? "";
    }
    rows.push(obj);
  }
  return rows;
}

function splitSubjects(raw) {
  if (!raw) return [];
  return raw
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseAuthors(raw) {
  if (!raw) return [];
  return raw
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

function matchesClassicAuthor(authorsRaw) {
  const a = authorsRaw || "";
  return CLASSIC_AUTHOR_NEEDLES.some((needle) =>
    a.toLowerCase().includes(needle.toLowerCase()),
  );
}

function bookshelfScore(bookshelves) {
  const b = bookshelves || "";
  let score = 0;
  for (const needle of CLASSIC_BOOKSHELF_NEEDLES) {
    if (b.includes(needle)) score += 5;
  }
  return score;
}

function mapGutendexBook(book) {
  const formats = book.formats || {};
  const downloadUrl =
    formats["text/plain; charset=utf-8"] ||
    formats["text/plain"] ||
    formats["application/epub+zip"] ||
    formats["text/html"] ||
    undefined;
  return {
    id: String(book.id),
    title: book.title,
    authors: (book.authors || []).map((a) => a.name).filter(Boolean),
    subjects: book.subjects || [],
    url: `https://www.gutenberg.org/ebooks/${book.id}`,
    ...(downloadUrl ? { downloadUrl } : {}),
  };
}

async function fetchGutendexCatalog() {
  const items = [];
  let next = "https://gutendex.com/books/?languages=en&sort=popular";
  while (next && items.length < GUTENBERG_TARGET) {
    const page = await fetchJson(next);
    for (const book of page.results || []) {
      items.push(mapGutendexBook(book));
      if (items.length >= GUTENBERG_TARGET) break;
    }
    next = page.next;
  }
  return items.slice(0, GUTENBERG_TARGET);
}

async function fetchGutenbergCsvCatalog() {
  const csvUrl =
    "https://www.gutenberg.org/cache/epub/feeds/pg_catalog.csv";
  const text = await fetchText(csvUrl, { accept: "text/csv,text/plain,*/*" });
  const rows = parseCsv(text);
  const scored = [];

  for (const row of rows) {
    if ((row.Type || "").trim() !== "Text") continue;
    const langs = (row.Language || "")
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!langs.includes("en")) continue;

    const authorHit = matchesClassicAuthor(row.Authors);
    const shelf = bookshelfScore(row.Bookshelves);
    if (!authorHit && shelf === 0) continue;

    const id = String(row["Text#"] || "").trim();
    if (!id) continue;

    scored.push({
      score: (authorHit ? 20 : 0) + shelf + Math.max(0, 5 - Math.log10(Number(id) || 1)),
      item: {
        id,
        title: (row.Title || "").trim(),
        authors: parseAuthors(row.Authors),
        subjects: splitSubjects(row.Subjects),
        url: `https://www.gutenberg.org/ebooks/${id}`,
        downloadUrl: `https://www.gutenberg.org/ebooks/${id}.txt.utf-8`,
      },
    });
  }

  scored.sort((a, b) => b.score - a.score || Number(a.item.id) - Number(b.item.id));

  // Prefer diversity: cap ~6 works per primary author string.
  const perAuthor = new Map();
  const selected = [];
  for (const { item } of scored) {
    const key = (item.authors[0] || "unknown").toLowerCase();
    const n = perAuthor.get(key) || 0;
    if (n >= 6) continue;
    perAuthor.set(key, n + 1);
    selected.push(item);
    if (selected.length >= GUTENBERG_TARGET) break;
  }

  // If still short, fill without per-author cap.
  if (selected.length < GUTENBERG_TARGET) {
    const seen = new Set(selected.map((x) => x.id));
    for (const { item } of scored) {
      if (seen.has(item.id)) continue;
      selected.push(item);
      seen.add(item.id);
      if (selected.length >= GUTENBERG_TARGET) break;
    }
  }

  return selected.slice(0, GUTENBERG_TARGET);
}

async function buildGutenbergCatalog() {
  const generatedAt = new Date().toISOString();
  try {
    const items = await fetchGutendexCatalog();
    notes.gutenberg.fetch = `gutendex.com OK (${items.length} items)`;
    return {
      generatedAt,
      source: "https://gutendex.com/books/?languages=en&sort=popular",
      license:
        "Project Gutenberg license — works are predominantly public domain in the United States; verify each title.",
      items,
    };
  } catch (err) {
    notes.gutenberg.fetch = `gutendex.com failed: ${err.message}`;
    console.warn(`[gutenberg] ${notes.gutenberg.fetch}`);
    try {
      const items = await fetchGutenbergCsvCatalog();
      notes.gutenberg.fallback = `pg_catalog.csv curated classics (${items.length} items)`;
      console.warn(`[gutenberg] fallback → ${notes.gutenberg.fallback}`);
      return {
        generatedAt,
        source: "https://www.gutenberg.org/cache/epub/feeds/pg_catalog.csv",
        license:
          "Project Gutenberg license — works are predominantly public domain in the United States; verify each title.",
        items,
      };
    } catch (err2) {
      notes.gutenberg.fallback = `CSV also failed: ${err2.message}`;
      throw new Error(`Gutenberg catalog failed: ${err2.message}`);
    }
  }
}

async function tryWikiartLiveApi() {
  // WikiArt has no stable public open API; probe Wikimedia Commons search as a live path.
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=painting%20public%20domain&srnamespace=6&srlimit=5&format=json";
  await fetchJson(url);
  return true;
}

async function buildWikiartCatalog() {
  const generatedAt = new Date().toISOString();
  try {
    await tryWikiartLiveApi();
    notes.wikiart.fetch =
      "Wikimedia Commons API reachable; using embedded curated PD set (~40)";
  } catch (err) {
    notes.wikiart.fetch = `live API failed: ${err.message}`;
    notes.wikiart.fallback = "embedded curated PD list";
    console.warn(`[wikiart] ${notes.wikiart.fetch}; using curated list`);
  }

  // Always ship the curated PD set for stable, attributed image URLs.
  if (!notes.wikiart.fallback) {
    notes.wikiart.fallback =
      "embedded curated famous PD works (stable Commons URLs)";
  }

  return {
    generatedAt,
    source: "Wikimedia Commons (curated public-domain painting references)",
    license:
      "Predominantly public domain via Wikimedia Commons; individual files may carry CC or jurisdiction-specific notes — see each item.license and Commons file pages.",
    items: WIKIART_CURATED.map((w) => ({ ...w })),
  };
}

async function enrichWikipediaEntity(entity) {
  const title = entity.wikipediaTitle;
  const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
  try {
    const summary = await fetchJson(summaryUrl, {
      accept: "application/json",
    });
    return {
      id: entity.id,
      label: summary.title || entity.label,
      description: summary.description || summary.extract || "",
      url: summary.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${title}`,
      ...(summary.thumbnail?.source
        ? { thumbnail: summary.thumbnail.source }
        : {}),
    };
  } catch {
    return {
      id: entity.id,
      label: entity.label,
      description: "",
      url: `https://en.wikipedia.org/wiki/${title}`,
    };
  }
}

async function tryWikidataSparql(entities) {
  const values = entities.map((e) => `wd:${e.id}`).join(" ");
  const query = `
SELECT ?item ?itemLabel ?itemDescription WHERE {
  VALUES ?item { ${values} }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`.trim();
  const url = `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(query)}`;
  return fetchJson(url, { accept: "application/sparql-results+json" });
}

async function buildWikipediaCatalog() {
  const generatedAt = new Date().toISOString();
  let sparqlOk = false;
  try {
    await tryWikidataSparql(WIKIPEDIA_CURATED.slice(0, 5));
    sparqlOk = true;
    notes.wikipedia.fetch = "Wikidata SPARQL OK (probe)";
  } catch (err) {
    notes.wikipedia.fetch = `Wikidata SPARQL failed: ${err.message}`;
    console.warn(`[wikipedia] ${notes.wikipedia.fetch}`);
  }

  const items = [];
  let enriched = 0;
  for (const entity of WIKIPEDIA_CURATED) {
    const item = await enrichWikipediaEntity(entity);
    if (item.description || item.thumbnail) enriched += 1;
    items.push(item);
  }

  notes.wikipedia.fallback = sparqlOk
    ? `curated ${items.length} entities; Wikipedia REST enriched ${enriched}`
    : `static curated list + Wikipedia REST (${enriched}/${items.length} enriched)`;

  return {
    generatedAt,
    source: sparqlOk
      ? "Wikidata SPARQL + English Wikipedia REST summaries (curated entity set)"
      : "Curated Wikidata IDs + English Wikipedia REST summaries",
    license:
      "Wikipedia and Wikidata content: CC BY-SA 4.0 (text); media may have separate licenses. See https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use",
    items,
  };
}

function gutenbergReadme() {
  return `# Project Gutenberg reference catalog

Open-reference index of English-language classics for Artometrics reports and tooling.

## Files

- \`catalog.json\` — \`{ generatedAt, source, license, items[] }\`
  - \`items[]\`: \`id\`, \`title\`, \`authors\`, \`subjects\`, \`url\`, optional \`downloadUrl\`

## Source

Prefer Gutendex (\`https://gutendex.com\`) sorted by popularity. If that API is unavailable, the builder falls back to the official Project Gutenberg CSV feed and curates ~250 classics by known authors / bookshelves.

## License / attribution

- Project Gutenberg ebooks are generally free to reuse where the text is public domain in your jurisdiction.
- Always verify the license block inside each ebook and local copyright rules.
- Do not remove Gutenberg trademark / license notices when redistributing texts.
- Catalog metadata regenerated by \`npm run catalog:open\`.

## Rebuild

\`\`\`bash
npm run catalog:open
\`\`\`
`;
}

function wikiartReadme() {
  return `# WikiArt / Wikimedia art reference catalog

Curated public-domain (and noted) painting references with Wikimedia Commons image URLs.

## Files

- \`catalog.json\` — \`{ generatedAt, source, license, items[] }\`
  - \`items[]\`: \`id\`, \`artist\`, \`title\`, \`year\`, \`style\`, \`imageUrl\`, \`license\`

## Source

There is no stable open WikiArt dump used here. The catalog embeds ~40 famous works with Commons URLs so the app can cite imagery without a live WikiArt dependency. A Commons API probe is attempted at build time for connectivity notes only.

## License / attribution

- Prefer files marked **Public domain** on Wikimedia Commons.
- Some 20th-century works may still be copyrighted outside certain jurisdictions — check \`item.license\` and the Commons file page before reuse.
- Credit artists and Commons file pages in published charts / articles.
- Catalog regenerated by \`npm run catalog:open\`.

## Rebuild

\`\`\`bash
npm run catalog:open
\`\`\`
`;
}

function wikipediaReadme() {
  return `# Wikipedia / Wikidata reference catalog

Curated entities (writers, historical figures, places, institutions) for open-reference linking.

## Files

- \`catalog.json\` — \`{ generatedAt, source, license, items[] }\`
  - \`items[]\`: \`id\` (Wikidata QID), \`label\`, \`description\`, \`url\`, optional \`thumbnail\`

## Source

Static curated Wikidata IDs (~40). Labels/descriptions/thumbnails are enriched via the English Wikipedia REST summary API when reachable. Wikidata SPARQL is probed at build time.

## License / attribution

- Wikipedia text: **CC BY-SA 4.0** (and GFDL legacy where applicable).
- Wikidata: **CC0**.
- Thumbnails may have separate licenses — check the linked Wikipedia / Commons page.
- Follow [Wikimedia Terms of Use](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use).
- Catalog regenerated by \`npm run catalog:open\`.

## Rebuild

\`\`\`bash
npm run catalog:open
\`\`\`
`;
}

async function main() {
  console.log("Building open-reference catalogs…");

  const gutenberg = await buildGutenbergCatalog();
  const gutenbergDir = path.join(OUT_ROOT, "gutenberg");
  writeJson(path.join(gutenbergDir, "catalog.json"), gutenberg);
  writeReadme(gutenbergDir, gutenbergReadme());
  console.log(`gutenberg: ${gutenberg.items.length} items → ${path.relative(ROOT, gutenbergDir)}`);

  const wikiart = await buildWikiartCatalog();
  const wikiartDir = path.join(OUT_ROOT, "wikiart");
  writeJson(path.join(wikiartDir, "catalog.json"), wikiart);
  writeReadme(wikiartDir, wikiartReadme());
  console.log(`wikiart: ${wikiart.items.length} items → ${path.relative(ROOT, wikiartDir)}`);

  const wikipedia = await buildWikipediaCatalog();
  const wikipediaDir = path.join(OUT_ROOT, "wikipedia");
  writeJson(path.join(wikipediaDir, "catalog.json"), wikipedia);
  writeReadme(wikipediaDir, wikipediaReadme());
  console.log(`wikipedia: ${wikipedia.items.length} items → ${path.relative(ROOT, wikipediaDir)}`);

  console.log("\nFetch / fallback notes:");
  for (const [key, n] of Object.entries(notes)) {
    console.log(`  ${key}: fetch=${n.fetch || "—"}; fallback=${n.fallback || "—"}`);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
