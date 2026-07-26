const SIGNS = [
  'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini',
  'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius',
] as const

/** Tropical sun sign from month/day (approx cusp dates). */
export function sunSignFromDate(isoDate: string): string | null {
  const d = parseIsoDate(isoDate)
  if (!d) return null
  const m = d.getUTCMonth() + 1
  const day = d.getUTCDate()
  if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return 'Capricorn'
  if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return 'Aquarius'
  if ((m === 2 && day >= 19) || (m === 3 && day <= 20)) return 'Pisces'
  if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return 'Aries'
  if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return 'Taurus'
  if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return 'Gemini'
  if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return 'Cancer'
  if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return 'Leo'
  if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return 'Virgo'
  if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return 'Libra'
  if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return 'Scorpio'
  return 'Sagittarius'
}

export function parseIsoDate(isoDate: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim())
  if (!m) return null
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]))
  if (Number.isNaN(d.getTime())) return null
  return d
}

export function ageFromBirthDate(isoDate: string, now = new Date()) {
  const birth = parseIsoDate(isoDate)
  if (!birth) return null
  let age = now.getUTCFullYear() - birth.getUTCFullYear()
  const md = now.getUTCMonth() - birth.getUTCMonth()
  if (md < 0 || (md === 0 && now.getUTCDate() < birth.getUTCDate())) age -= 1
  return age
}

export function nextBirthday(isoDate: string, now = new Date()) {
  const birth = parseIsoDate(isoDate)
  if (!birth) return null
  const y = now.getUTCFullYear()
  let next = new Date(Date.UTC(y, birth.getUTCMonth(), birth.getUTCDate()))
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  if (next < today) next = new Date(Date.UTC(y + 1, birth.getUTCMonth(), birth.getUTCDate()))
  const days = Math.round((next.getTime() - today.getTime()) / 86400000)
  return { date: next.toISOString().slice(0, 10), daysUntil: days }
}

/** Reduce to a single digit, preserving master numbers 11 / 22 / 33. */
export function reduceNumerology(sum: number) {
  let n = sum
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = [...String(n)].reduce((a, c) => a + Number(c), 0)
  }
  return n
}

/** Pythagorean life-path style number from birth date. Reflective, not scientific. */
export function lifePathNumber(isoDate: string) {
  const digits = isoDate.replace(/\D/g, '')
  if (digits.length < 8) return null
  const sum = [...digits].reduce((a, c) => a + Number(c), 0)
  return reduceNumerology(sum)
}

/** Pythagorean letter values A=1 … I=9, J=1 … R=9, S=1 … Z=8. */
const LETTER_VALUE: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])

function lettersOf(name: string) {
  return [...name.toLowerCase()].filter((ch) => LETTER_VALUE[ch] != null)
}

function sumLetters(chars: string[]) {
  return chars.reduce((a, ch) => a + (LETTER_VALUE[ch] ?? 0), 0)
}

/** Expression / Destiny — all letters of the display name. */
export function expressionNumber(name: string) {
  const letters = lettersOf(name)
  if (!letters.length) return null
  return reduceNumerology(sumLetters(letters))
}

/** Soul Urge — vowels only (A E I O U). */
export function soulUrgeNumber(name: string) {
  const vowels = lettersOf(name).filter((ch) => VOWELS.has(ch))
  if (!vowels.length) return null
  return reduceNumerology(sumLetters(vowels))
}

/** Personality — consonants only. */
export function personalityNumber(name: string) {
  const consonants = lettersOf(name).filter((ch) => !VOWELS.has(ch))
  if (!consonants.length) return null
  return reduceNumerology(sumLetters(consonants))
}

export type NameNumbers = {
  expression: number | null
  soulUrge: number | null
  personality: number | null
}

export function nameNumbers(name: string): NameNumbers {
  const trimmed = name.trim()
  if (!trimmed) return { expression: null, soulUrge: null, personality: null }
  return {
    expression: expressionNumber(trimmed),
    soulUrge: soulUrgeNumber(trimmed),
    personality: personalityNumber(trimmed),
  }
}

export function moonPhaseApprox(date = new Date()) {
  // Simple approximation from known new moon reference (2000-01-06)
  const knownNew = Date.UTC(2000, 0, 6, 18, 14)
  const synodic = 29.53058867
  const days = (date.getTime() - knownNew) / 86400000
  const phase = ((days % synodic) + synodic) % synodic
  const names = [
    { max: 1.84566, name: 'New Moon' },
    { max: 5.53699, name: 'Waxing Crescent' },
    { max: 9.22831, name: 'First Quarter' },
    { max: 12.91963, name: 'Waxing Gibbous' },
    { max: 16.61096, name: 'Full Moon' },
    { max: 20.30228, name: 'Waning Gibbous' },
    { max: 23.99361, name: 'Last Quarter' },
    { max: 27.68493, name: 'Waning Crescent' },
    { max: 29.53, name: 'New Moon' },
  ]
  const name = names.find((n) => phase <= n.max)?.name ?? 'New Moon'
  return { name, ageDays: Math.round(phase * 10) / 10, illumination: Math.round((1 - Math.cos((phase / synodic) * 2 * Math.PI)) * 50) }
}

export function birthdayInsight(isoDate: string) {
  const sign = sunSignFromDate(isoDate)
  const age = ageFromBirthDate(isoDate)
  const next = nextBirthday(isoDate)
  const path = lifePathNumber(isoDate)
  const moon = moonPhaseApprox()
  return {
    sunSign: sign,
    age,
    nextBirthday: next,
    lifePath: path,
    moonToday: moon,
    note: sign
      ? `Your sun in ${sign} frames a season of soft self-honesty. Life path ${path ?? '—'} asks for gentle consistency — not perfection.`
      : 'Add your birth date to unlock birthday and sign insights.',
    signs: SIGNS,
  }
}
