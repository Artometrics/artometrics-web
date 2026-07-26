/** Reflective reading banks — not science, medical, or financial advice. */

export type NumberReading = {
  number: number;
  title: string;
  keywords: string[];
  essay: string;
  seasonPrompt: string;
};

export type SunReading = {
  sign: string;
  element: string;
  modality: string;
  essay: string;
  seasonNote: string;
};

const LIFE_PATH: Record<number, Omit<NumberReading, "number">> = {
  1: {
    title: "The Path of Initiative",
    keywords: ["agency", "beginnings", "clarity"],
    essay:
      "Life Path 1 asks you to trust the first honest impulse — not the loudest one. You grow when you claim authorship over small choices and stop waiting for a perfect map. Independence here is not isolation; it is the courage to start before approval arrives. The shadow is forcing outcomes or mistaking stubbornness for vision. Soften the grip, keep the direction. Your work thrives when you treat each day as a draft of leadership rather than a verdict on worth.",
    seasonPrompt:
      "This season: name one beginning you have delayed and take a single concrete step — no grand reveal required.",
  },
  2: {
    title: "The Path of Attunement",
    keywords: ["partnership", "patience", "nuance"],
    essay:
      "Life Path 2 is the art of listening without disappearing. You notice the room before you speak, and that sensitivity is a strength when you also protect your own tempo. Collaboration suits you when it is mutual — not when you absorb everyone else's weather. The gift is diplomacy that still tells the truth. The risk is over-accommodation until resentment blooms. Practice naming needs early, gently, and without apology. Harmony is not silence; it is two clear notes held at once.",
    seasonPrompt:
      "This season: ask for one thing you usually hint at. Let the relationship meet you halfway.",
  },
  3: {
    title: "The Path of Expression",
    keywords: ["voice", "play", "synthesis"],
    essay:
      "Life Path 3 turns experience into language, image, or humor before it calcifies into private pressure. You are meant to circulate ideas — through conversation, craft, or quiet creative ritual. Joy is not frivolous for you; it is how insight stays mobile. The trap is scattering attention until nothing finishes, or performing lightness while something heavier goes unnamed. Choose one channel and deepen it. Your charisma lands best when it carries a real sentence underneath the sparkle.",
    seasonPrompt:
      "This season: finish one expressive piece (paragraph, sketch, voice note) and share it with a trusted person.",
  },
  4: {
    title: "The Path of Structure",
    keywords: ["craft", "reliability", "foundation"],
    essay:
      "Life Path 4 builds what lasts — habits, frameworks, rooms where other people can rest. You thrive when effort has a visible shape: schedules, drafts, rituals that make chaos navigable. Discipline for you is devotion, not punishment. The shadow appears as rigidity or working so hard the original purpose blurs. Leave intentional gaps in the plan. Your integrity shines when structure serves life rather than replacing it. Steady does not mean stuck; it means you know where the load-bearing walls are.",
    seasonPrompt:
      "This season: reinforce one foundation (sleep, money habit, creative block of time) for fourteen days.",
  },
  5: {
    title: "The Path of Motion",
    keywords: ["freedom", "curiosity", "adaptation"],
    essay:
      "Life Path 5 learns through change — new rooms, new questions, new versions of the self. Variety feeds you, but freedom without a spine becomes restlessness. You are here to practice conscious risk: leave what is stale, keep what is true. The gift is adaptability that helps others exhale. The risk is escaping commitment the moment it asks for depth. Choose experiments with an end date and a return path. Adventure counts most when it widens your capacity to stay present after the novelty fades.",
    seasonPrompt:
      "This season: change one routine on purpose — then notice what you miss and what you do not.",
  },
  6: {
    title: "The Path of Care",
    keywords: ["responsibility", "beauty", "belonging"],
    essay:
      "Life Path 6 tends the circle — home, craft, community, the aesthetics of how people feel held. You often sense what others need before they ask. That gift becomes heavy when care turns into control or martyrdom. Love, for you, includes standards: beauty that is honest, loyalty that still allows difference. Repair is sacred work. So is rest. You are not required to be everyone's shelter. Choose where your stewardship actually belongs and let the rest of the world remain the world's.",
    seasonPrompt:
      "This season: care for one person or place — including yourself — with a clear boundary around the rest.",
  },
  7: {
    title: "The Path of Inquiry",
    keywords: ["depth", "solitude", "discernment"],
    essay:
      "Life Path 7 seeks the pattern under the pattern. Study, contemplation, and selective company restore you. You do not owe everyone your interior life; privacy is part of your intelligence. The gift is insight that arrives after sitting with a question longer than comfort allows. The shadow is isolation that turns into superiority or endless analysis without embodiment. Touch grass. Share one finding. Your solitude is a workshop, not a fortress — open the door when the work wants witnesses.",
    seasonPrompt:
      "This season: dedicate quiet hours to one question, then translate what you learn into a single clear paragraph.",
  },
  8: {
    title: "The Path of Stewardship",
    keywords: ["power", "resources", "consequence"],
    essay:
      "Life Path 8 deals in material and social consequence — money, influence, systems that scale. Ambition is not the enemy; unconscious ambition is. You grow when you claim authority without apologizing for competence, then use it cleanly. The gift is strategic vision that can build real structures. The risk is equating worth with output or control. Audit where power concentrates in your life. Redistribute, renegotiate, or release. Success that costs your integrity is not success — it is a delayed invoice.",
    seasonPrompt:
      "This season: make one financial or leadership decision that aligns power with your actual values.",
  },
  9: {
    title: "The Path of Completion",
    keywords: ["compassion", "release", "perspective"],
    essay:
      "Life Path 9 gathers many rooms of experience and asks you to give something back — art, advocacy, forgiveness, a wider view. You feel the collective weather; that empathy needs containers or it floods. Endings are your curriculum: close chapters with dignity so new ones can begin. The gift is humanitarian imagination. The trap is rescuing everyone while neglecting the self that still needs a home. Practice completion rituals. Generosity that includes you lasts longer than sacrifice that empties you.",
    seasonPrompt:
      "This season: finish or release one unfinished obligation — then mark the ending with a small ceremony.",
  },
  11: {
    title: "The Illuminator (Master 11)",
    keywords: ["intuition", "inspiration", "nervous voltage"],
    essay:
      "Life Path 11 carries a brighter voltage of Path 2 — intuition that wants to become signal for others. You may sense atmosphere early and feel responsible for translating it. Grounding is non-negotiable: sleep, body, earth, one trusted witness. Inspiration without embodiment frays the nervous system. You are not required to be a channel at all hours. When you speak from lived clarity rather than urgency, people listen. Master numbers ask for mastery of the ordinary first — then the light travels farther.",
    seasonPrompt:
      "This season: pair every intuitive hit with one grounding act before you act on it publicly.",
  },
  22: {
    title: "The Architect (Master 22)",
    keywords: ["vision", "infrastructure", "scale"],
    essay:
      "Life Path 22 is Path 4 with a longer horizon — big dreams that still need bolts and schedules. You can translate idealism into institutions, projects, or cultural rooms that outlast a mood. The gift is pragmatic mysticism: believe in the cathedral, then order the brick. The shadow is overwhelm, or shrinking to Path 4's smaller safety when the vision scares you. Break the empire into weeks. Recruit help. Your legacy work does not require you to carry every beam alone.",
    seasonPrompt:
      "This season: draft a one-page plan for a large, kind ambition — then schedule the first brick.",
  },
  33: {
    title: "The Teacher of Care (Master 33)",
    keywords: ["compassion", "service", "boundaries"],
    essay:
      "Life Path 33 intensifies Path 6 into teaching through lived care. People may look to you for emotional weather guidance. That role is holy when chosen and corrosive when assumed by default. Your curriculum includes joy, not only responsibility. Heal the urge to earn love through usefulness. When you model sustainable kindness — rest included — you teach more than any speech. Master 33 asks: can care scale without self-erasure? Answer with practice, not perfection.",
    seasonPrompt:
      "This season: teach one gentle practice you already live — and refuse one caretaking role that is not yours.",
  },
};

const EXPRESSION: Record<number, Omit<NumberReading, "number">> = {
  1: {
    title: "Expression 1 — Signature of the Pioneer",
    keywords: ["originality", "direction", "self-trust"],
    essay:
      "Your Expression (Destiny) number 1 suggests a life signature of authorship. The name you carry — or choose — points toward roles where you initiate, name the problem, or set a tone others can follow. You communicate best when you own a clear point of view. Soften the need to be first in every room; be first in integrity instead. Destiny here is not fame; it is becoming someone whose yes and no can be trusted.",
    seasonPrompt: "Say one true sentence publicly that you have been editing into oblivion.",
  },
  2: {
    title: "Expression 2 — Signature of the Diplomat",
    keywords: ["mediation", "timing", "receptivity"],
    essay:
      "Expression 2 writes you as a bridge — someone who can hold tension without detonating it. Your destiny work often involves partnership, editing, counseling, or translating between camps. Guard against becoming only the glue. Your name's path asks for presence that includes your own preference. Harmony that silences you is incomplete. Practice timed speech: listen fully, then place your note in the chord.",
    seasonPrompt: "Mediate one conflict — including an inner one — by naming both sides out loud.",
  },
  3: {
    title: "Expression 3 — Signature of the Communicator",
    keywords: ["story", "wit", "visibility"],
    essay:
      "Expression 3 destinies lean toward making the invisible sayable. Writing, teaching, performance, design, or lively conversation may be how your name moves through the world. Finish more than you start. Your gifts multiply when a project has an audience of one honest reader. Charm opens doors; substance keeps them open. Let humor tell the truth rather than dodge it.",
    seasonPrompt: "Publish or send one piece of unfinished creative work in its current honest form.",
  },
  4: {
    title: "Expression 4 — Signature of the Builder",
    keywords: ["systems", "craft", "durability"],
    essay:
      "Expression 4 marks a destiny of making things work — tools, teams, manuscripts with spines. People may rely on your follow-through. Choose projects worthy of that reliability. Avoid becoming the unpaid infrastructure of everyone else's dream. Build something with your name on the foundation stone, even if the stone is a private ritual no one sees.",
    seasonPrompt: "Ship one durable improvement: a template, a habit tracker, a repaired boundary.",
  },
  5: {
    title: "Expression 5 — Signature of the Explorer",
    keywords: ["range", "reinvention", "message"],
    essay:
      "Expression 5 destinies resist a single costume. You may reinvent titles, cities, or mediums — and still be coherent if a through-line of curiosity stays lit. Your name asks you to teach freedom with responsibility: show how change can be ethical. Document the journey so others can borrow a map without stealing your path.",
    seasonPrompt: "Tell the story of one reinvention without apologizing for the plot twist.",
  },
  6: {
    title: "Expression 6 — Signature of the Steward",
    keywords: ["devotion", "aesthetics", "community"],
    essay:
      "Expression 6 destinies often center beauty-with-responsibility: design that cares, families (chosen or blood), editorial rooms that feel humane. Your name's work includes standards — what you will and will not host. Create spaces where people feel both welcome and honest. Refuse the role of endless host if it costs your art.",
    seasonPrompt: "Host or design one small gathering or page that feels like home — then leave on time.",
  },
  7: {
    title: "Expression 7 — Signature of the Analyst",
    keywords: ["research", "mystery", "precision"],
    essay:
      "Expression 7 destinies favor depth careers of the mind and spirit — research, critique, contemplative art, technical mastery. Your name may open doors when you show receipts: method, sources, lived inquiry. Share enough of the process that others can trust the conclusion. Mystery is magnetic; secrecy that starves connection is not destiny, just habit.",
    seasonPrompt: "Write a short methodology note for something you already know deeply.",
  },
  8: {
    title: "Expression 8 — Signature of the Executive",
    keywords: ["scale", "negotiation", "legacy assets"],
    essay:
      "Expression 8 destinies traffic in consequence — budgets, platforms, reputations, institutions. Your name can become a seal of competence if you keep ethics visible in the ledger. Negotiate cleanly. Mentor power literacy in others. Measure success by what improves when you leave the room, not only by what you control while in it.",
    seasonPrompt: "Renegotiate one agreement so power and compensation match contribution.",
  },
  9: {
    title: "Expression 9 — Signature of the Humanitarian",
    keywords: ["synthesis", "advocacy", "closure"],
    essay:
      "Expression 9 destinies gather many genres of experience into service or art with a wide aperture. Your name may travel farther than your body. Beware savior scripts. Offer perspective, then let people keep agency. Completing cycles — projects, griefs, public chapters — is part of how your destiny stays clean.",
    seasonPrompt: "Close one public or private chapter with a clear thank-you and goodbye.",
  },
  11: {
    title: "Expression 11 — Signature of the Messenger",
    keywords: ["vision", "sensitivity", "broadcast"],
    essay:
      "Expression 11 destinies amplify insight into message. You may feel called to inspire — carefully. Ground every broadcast in a body and a budget of energy. Your name works best as a lantern, not a siren. Teach what you have metabolized, not only what you have sensed.",
    seasonPrompt: "Share one insight only after you have slept on it and edited for kindness.",
  },
  22: {
    title: "Expression 22 — Signature of the Master Builder",
    keywords: ["institutions", "long game", "practical magic"],
    essay:
      "Expression 22 destinies want visionary infrastructure — schools of thought, platforms, cultural projects that house many. Start smaller than the dream and more solid than the pitch. Your name becomes legacy when the system still works without your constant adrenaline.",
    seasonPrompt: "Define the smallest viable version of your largest kind idea — then schedule it.",
  },
  33: {
    title: "Expression 33 — Signature of the Healing Teacher",
    keywords: ["guidance", "compassion", "example"],
    essay:
      "Expression 33 destinies teach through how you live care. Curriculum may be formal or quiet. Your name should not become a brand of endless availability. Model repair, rest, and joyful standards. The lesson is love with a spine.",
    seasonPrompt: "Offer one teaching that includes your own boundary as part of the lesson.",
  },
};

const SOUL_URGE: Record<number, Omit<NumberReading, "number">> = {
  1: {
    title: "Soul Urge 1 — Craves Autonomy",
    keywords: ["sovereignty", "respect", "space"],
    essay:
      "The vowels of your name lean toward a heart that needs self-direction. You feel most alive when choices are truly yours. Love that micromanages will starve you; love that cheers your agency feeds you. Honor the urge to lead your own mornings. Soften the fear that needing independence makes you unloving — it makes you honest.",
    seasonPrompt: "Protect one daily hour that no one else schedules.",
  },
  2: {
    title: "Soul Urge 2 — Craves Resonance",
    keywords: ["tenderness", "alliance", "peace"],
    essay:
      "Soul Urge 2 wants companionship that feels like music in tune. You long to be met in the subtle layers. Seek friends and partners who notice tone, not only content. Your heart softens in mutual care — and bruises when you are the only one adapting. Ask for reciprocity early.",
    seasonPrompt: "Tell someone what kind of closeness actually restores you.",
  },
  3: {
    title: "Soul Urge 3 — Craves Delight",
    keywords: ["play", "beauty", "audience"],
    essay:
      "Soul Urge 3 hungers for creative oxygen — laughter, color, conversation that sparkles without lying. When life becomes only duty, your heart dims. Schedule delight as seriously as work. Share joy without performing constant entertainment.",
    seasonPrompt: "Do one purely delightful thing with no productivity alibi.",
  },
  4: {
    title: "Soul Urge 4 — Craves Stability",
    keywords: ["order", "loyalty", "predictability"],
    essay:
      "Soul Urge 4 wants the ground to hold. Routines, kept promises, and tangible progress calm your inner weather. Chaos can feel like disrespect. Build containers that let you relax. Allow a little flex so stability does not become a cage.",
    seasonPrompt: "Stabilize one corner of your week — then enjoy the quiet it creates.",
  },
  5: {
    title: "Soul Urge 5 — Craves Horizon",
    keywords: ["novelty", "travel", "options"],
    essay:
      "Soul Urge 5 needs oxygen through change. Your heart opens on the move — new streets, new ideas, new versions of intimacy that do not trap. Commit to people and values, not to fossilized routines. Plan adventure so restlessness does not sabotage good things.",
    seasonPrompt: "Book or plan one small escape that refreshes without burning bridges.",
  },
  6: {
    title: "Soul Urge 6 — Craves Devotion",
    keywords: ["home", "beauty", "mutual care"],
    essay:
      "Soul Urge 6 longs to love and be loved in lasting rooms — aesthetic, emotional, communal. Your heart wants to tend and be tended. Watch the slide into over-giving. Receive as practice. Devotion includes the self who still needs a soft chair.",
    seasonPrompt: "Accept help once without immediately repaying it.",
  },
  7: {
    title: "Soul Urge 7 — Craves Truth",
    keywords: ["privacy", "meaning", "depth talk"],
    essay:
      "Soul Urge 7 wants conversations that matter and solitude that restores. Small talk can feel like static. Your heart opens for people who can sit in silence and then go deep. Protect study time. Trust that selective intimacy is not coldness.",
    seasonPrompt: "Have one undistracted deep conversation — or an equally deep hour alone.",
  },
  8: {
    title: "Soul Urge 8 — Craves Efficacy",
    keywords: ["impact", "recognition", "resources"],
    essay:
      "Soul Urge 8 wants to matter in the material world — to see effort convert into results and respect. Ambition is a love language for you when it stays ethical. Notice when status hunger replaces intimacy. Celebrate competence in yourself and others without turning life into a scoreboard.",
    seasonPrompt: "Name a win out loud — then share credit where it belongs.",
  },
  9: {
    title: "Soul Urge 9 — Craves Meaning",
    keywords: ["compassion", "art", "release"],
    essay:
      "Soul Urge 9 wants life to mean something beyond the private ledger. Your heart leans toward causes, stories, forgiveness arcs. Grief and idealism may travel together. Practice releasing people and projects that have completed their chapter so new meaning can enter.",
    seasonPrompt: "Donate time, attention, or resources to something larger than your inbox.",
  },
  11: {
    title: "Soul Urge 11 — Craves Inspiration",
    keywords: ["awe", "guidance", "voltage"],
    essay:
      "Soul Urge 11 longs to feel lit from within and to offer that light carefully. Overstimulation is real. Choose muses and mentors who calm your system. Your heart needs beauty and purpose — and also dark, quiet rooms.",
    seasonPrompt: "Seek one inspiring input, then take a walk with no podcast.",
  },
  22: {
    title: "Soul Urge 22 — Craves Legacy Impact",
    keywords: ["building", "service at scale", "patience"],
    essay:
      "Soul Urge 22 wants to feel that daily labor feeds a cathedral, not only a checklist. Your heart settles when vision and logistics shake hands. Pace the dream so burnout does not steal the legacy.",
    seasonPrompt: "Connect today's chores to the long kind future in one written sentence.",
  },
  33: {
    title: "Soul Urge 33 — Craves Healing Love",
    keywords: ["nurture", "teaching", "wholeness"],
    essay:
      "Soul Urge 33 yearns to love in ways that heal — and to be loved without having to earn it through service. Your heart expands in mutual caretaking. Shrink the audience of people you try to save. Enlarge the circle of people who restore you.",
    seasonPrompt: "Receive nurturing without turning it into a debt.",
  },
};

const PERSONALITY: Record<number, Omit<NumberReading, "number">> = {
  1: {
    title: "Personality 1 — First Impression: Direct",
    keywords: ["decisive", "bold", "clear"],
    essay:
      "Consonants in your name project initiative. Others may read you as capable and self-directed before you speak. Soften edges when collaboration needs warmth; keep the clarity. You do not have to perform confidence — just refuse to hide your point.",
    seasonPrompt: "Lead one meeting or conversation with a clear opening ask.",
  },
  2: {
    title: "Personality 2 — First Impression: Approachable",
    keywords: ["gentle", "attentive", "diplomatic"],
    essay:
      "Personality 2 presents as receptive and easy to talk to. People may unload on you. That is a compliment and a boundary test. Show warmth without becoming a waiting room. Let your face and timing say you are listening — and that you also have a self.",
    seasonPrompt: "Practice a kind redirect when someone treats you as unpaid therapy.",
  },
  3: {
    title: "Personality 3 — First Impression: Expressive",
    keywords: ["lively", "witty", "visible"],
    essay:
      "Personality 3 arrives colorful — humor, style, or verbal spark. Enjoy it, then let people see the quieter draft underneath. Performance is a door, not the whole house.",
    seasonPrompt: "Share one serious thought in the same room where you usually joke.",
  },
  4: {
    title: "Personality 4 — First Impression: Reliable",
    keywords: ["steady", "practical", "composed"],
    essay:
      "Personality 4 reads as grounded and competent. Others may assign you logistics by default. Accept what fits; decline what does not. Your exterior calm is an asset — do not let it erase your need for play.",
    seasonPrompt: "Say no to one task that only arrived because you look capable.",
  },
  5: {
    title: "Personality 5 — First Impression: Magnetic Motion",
    keywords: ["adaptable", "curious", "restless"],
    essay:
      "Personality 5 suggests changeability and intrigue. People may not know which version of you will show up — use that as range, not flakiness. Signal when you are here to stay for a chapter.",
    seasonPrompt: "Commit visibly to one plan for the next month.",
  },
  6: {
    title: "Personality 6 — First Impression: Warm Steward",
    keywords: ["caring", "tasteful", "responsible"],
    essay:
      "Personality 6 presents as someone who hosts well — emotionally or aesthetically. People assume you will take care of it. Sometimes you will. Sometimes you will point them to their own capacity. Both are love.",
    seasonPrompt: "Host with delight, then leave the cleanup of others' emotions to them.",
  },
  7: {
    title: "Personality 7 — First Impression: Reserved Depth",
    keywords: ["mysterious", "thoughtful", "selective"],
    essay:
      "Personality 7 can read as cool or enigmatic. That distance protects your inner work. Smile when you mean it; explain less than you think you must. The right people will lean in.",
    seasonPrompt: "Offer one sincere personal detail to someone who has earned it.",
  },
  8: {
    title: "Personality 8 — First Impression: Authority",
    keywords: ["capable", "polished", "formidable"],
    essay:
      "Personality 8 projects competence and presence. Doors may open — and so may projections. Soften when trust needs humanity. Keep the spine when negotiations need clarity.",
    seasonPrompt: "Pair one authoritative move with one moment of genuine warmth.",
  },
  9: {
    title: "Personality 9 — First Impression: Wide-Hearted",
    keywords: ["wise", "inclusive", "worldly"],
    essay:
      "Personality 9 can feel worldly or compassionate on contact. People may assume you have seen a lot — and ask for perspective. Share generously without becoming everyone's elder. Keep a private life that is not content.",
    seasonPrompt: "Give advice once, then ask a question back.",
  },
  11: {
    title: "Personality 11 — First Impression: Inspired",
    keywords: ["electric", "sensitive", "memorable"],
    essay:
      "Personality 11 may feel charged — people notice you. Manage the voltage with rest and ordinary habits so inspiration does not tip into overwhelm for you or them.",
    seasonPrompt: "Arrive somewhere important grounded: water, breath, then words.",
  },
  22: {
    title: "Personality 22 — First Impression: Capable Visionary",
    keywords: ["substantial", "ambitious", "credible"],
    essay:
      "Personality 22 suggests you look like someone who could build the thing. Use that credibility carefully. Under-promise, over-deliver, invite collaborators early.",
    seasonPrompt: "Show one slide or sentence of the big plan — then the next concrete step.",
  },
  33: {
    title: "Personality 33 — First Impression: Healing Presence",
    keywords: ["nurturing", "wise", "magnetic care"],
    essay:
      "Personality 33 can make strangers feel oddly safe. That gift needs boundaries or it drains. Be the warm room, not the entire hospital.",
    seasonPrompt: "Offer presence with a clear time box.",
  },
};

const SUN: Record<string, Omit<SunReading, "sign">> = {
  Aries: {
    element: "Fire",
    modality: "Cardinal",
    essay:
      "Aries sun energy leads with heat and honesty. You learn by moving — experiments, beginnings, courage that does not wait for consensus. The season of your sun asks for clean starts and clean repairs after impact. Temper the blade with listening; keep the spark.",
    seasonNote:
      "Seasonal note: initiate one brave action, then practice the pause that makes bravery wise.",
  },
  Taurus: {
    element: "Earth",
    modality: "Fixed",
    essay:
      "Taurus sun energy roots in the senses — food, craft, loyalty, the long yield of patience. You stabilize rooms. Watch for clinging when change would fertilize the field. Pleasure is data; so is rest.",
    seasonNote:
      "Seasonal note: invest in one slow pleasure that also builds a future asset (skill, garden, savings, craft).",
  },
  Gemini: {
    element: "Air",
    modality: "Mutable",
    essay:
      "Gemini sun energy thinks in plural — tabs open, languages crossing, curiosity as oxygen. Your gift is connection and translation. Choose depth projects so versatility does not become evasion.",
    seasonNote:
      "Seasonal note: pick two conversations or texts to finish fully before opening a third thread.",
  },
  Cancer: {
    element: "Water",
    modality: "Cardinal",
    essay:
      "Cancer sun energy remembers — moods, histories, the temperature of home. You lead by caretaking atmospheres. Protect your shell without disappearing inside it. Softness is strength when it has a door you control.",
    seasonNote:
      "Seasonal note: tend your actual home base (body, room, inbox) before tending everyone else's.",
  },
  Leo: {
    element: "Fire",
    modality: "Fixed",
    essay:
      "Leo sun energy wants to warm a room and be seen doing it honestly. Creativity and generosity are twin fuels. Pride becomes poison only when it cannot apologize. Shine, then share the spotlight.",
    seasonNote:
      "Seasonal note: make one thing for an audience of people you love — then receive their response without deflecting.",
  },
  Virgo: {
    element: "Earth",
    modality: "Mutable",
    essay:
      "Virgo sun energy refines — edits, systems, the sacred ordinary. Service is your love language when it stays humble. Perfectionism is fear in work clothes. Done and kind beats flawless and cruel.",
    seasonNote:
      "Seasonal note: improve one process by 10%, then stop polishing and use the change.",
  },
  Libra: {
    element: "Air",
    modality: "Cardinal",
    essay:
      "Libra sun energy seeks fair beauty — in art, justice, and relationship. You feel imbalance in the room. Decide anyway. Harmony that includes your needs is the real aesthetic.",
    seasonNote:
      "Seasonal note: make one decision you have been balancing forever; let the mobile find a new rest point.",
  },
  Scorpio: {
    element: "Water",
    modality: "Fixed",
    essay:
      "Scorpio sun energy goes under the surface — motive, loyalty, transformation. Intensity is a gift when it is chosen, not compulsive. Practice transparency in safe rooms. Power shared cleanly outlives power hoarded.",
    seasonNote:
      "Seasonal note: name one truth you have been circling and speak it to a trustworthy witness.",
  },
  Sagittarius: {
    element: "Fire",
    modality: "Mutable",
    essay:
      "Sagittarius sun energy aims past the near horizon — meaning, travel, big laughs, bigger questions. Belief needs revision rights. Teach what you are still learning. Freedom loves a compass.",
    seasonNote:
      "Seasonal note: study or travel one degree beyond comfort, then write what changed in your map.",
  },
  Capricorn: {
    element: "Earth",
    modality: "Cardinal",
    essay:
      "Capricorn sun energy climbs with patience — reputation, craft, long authority. Ambition softens when it includes care for the body that climbs. Legacy is daily. Rest is strategy.",
    seasonNote:
      "Seasonal note: define success for the next quarter in one sentence that a rested you would still respect.",
  },
  Aquarius: {
    element: "Air",
    modality: "Fixed",
    essay:
      "Aquarius sun energy thinks in networks and futures. You innovate how people belong. Stay human in the experiment — friendship is not a beta test. Weird is welcome; cold is optional.",
    seasonNote:
      "Seasonal note: contribute one idea to a community, then ask what they actually need next.",
  },
  Pisces: {
    element: "Water",
    modality: "Mutable",
    essay:
      "Pisces sun energy dissolves hard edges — art, empathy, dream logic. Boundaries are how compassion survives. Make beauty that has a frame. Sleep is spiritual practice.",
    seasonNote:
      "Seasonal note: create or consume one piece of art, then touch something real (water, wood, a walk) afterward.",
  },
};

function pick(
  bank: Record<number, Omit<NumberReading, "number">>,
  n: number,
): NumberReading {
  const base = bank[n] ?? bank[(n % 9) || 9]!;
  return { number: n, ...base };
}

export function lifePathReading(n: number | null): NumberReading | null {
  if (n == null) return null;
  return pick(LIFE_PATH, n);
}

export function expressionReading(n: number | null): NumberReading | null {
  if (n == null) return null;
  return pick(EXPRESSION, n);
}

export function soulUrgeReading(n: number | null): NumberReading | null {
  if (n == null) return null;
  return pick(SOUL_URGE, n);
}

export function personalityReading(n: number | null): NumberReading | null {
  if (n == null) return null;
  return pick(PERSONALITY, n);
}

export function sunSignReading(sign: string | null): SunReading | null {
  if (!sign) return null;
  const body = SUN[sign];
  if (!body) return null;
  return { sign, ...body };
}
