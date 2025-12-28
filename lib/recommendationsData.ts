/**
 * CULTURAL CODE RECOMMENDATIONS
 * Deep, resonant guidance for each code across 12 life categories
 */

export interface CategoryRecommendation {
  why: string // Deep reasoning (multiple paragraphs)
  greenLight: {
    title: string
    items: string[]
    reasoning: string
  }[]
  redLight: {
    title: string
    items: string[]
    reasoning: string
  }
  validation: {
    resonates: string[]
    doesntResonate: string[]
  }
  affiliates: {
    name: string
    type: string
    url: string
  }[]
}

export interface CodeRecommendations {
  locations: CategoryRecommendation
  work: CategoryRecommendation
  community: CategoryRecommendation
  activities: CategoryRecommendation
  learning: CategoryRecommendation
  media: CategoryRecommendation
  living: CategoryRecommendation
  rituals: CategoryRecommendation
  movement: CategoryRecommendation
  wellness: CategoryRecommendation
  products: CategoryRecommendation
  travel: CategoryRecommendation
}

export const RECOMMENDATIONS: Record<string, CodeRecommendations> = {
  /* ==========================================
     SHOKUNIN - JAPANESE CRAFT MASTERY
  ========================================== */
  Shokunin: {
    locations: {
      why: `**The Core Truth:**
Your code isn't about geography—it's about **environments that honor mastery**. You don't thrive in "cool cities" or "startup hubs." You thrive where **craft is sacred**, where **precision is visible**, where **10,000 hours is understood, not questioned**.

**What this means:**
Cities feel empty if they optimize for speed over quality. You need places where people **care about details others miss**—where a knife maker's reputation matters, where code reviews go deep, where "good enough" doesn't exist.

**The deeper pattern:**
Shokunin needs environments with **visible standards of excellence**. You want to walk past workshops and *see* mastery happening. You want neighbors who understand why you spent 6 hours on one detail. You want a city's rhythm to **respect the work**, not rush it.

**When you ignore this:**
You move to a "high opportunity" city and feel spiritually homeless. Fast-paced cultures make you anxious. "Move fast and break things" makes you want to scream. You're surrounded by people but completely alone.

**When you honor this:**
You find a city where craft is alive—and suddenly you belong. Conversations go deep. People introduce you to their tools. Time slows down to the speed of **real work**. You've found your place.`,
      greenLight: [
        {
          title: "Craft-Focused Cities",
          items: [
            "Kyoto, Japan - Traditional craft districts (pottery, textiles, woodworking)",
            "Portland, Oregon - Maker culture, artisan food, precision coffee",
            "Copenhagen, Denmark - Design culture, attention to detail, functional beauty",
            "Oaxaca, Mexico - Textile mastery, generations of technique",
            "Basel, Switzerland - Watchmaking tradition, precision engineering",
          ],
          reasoning: "These cities have **living craft traditions**—not museums, but active communities where mastery is practiced daily.",
        },
        {
          title: "Workshop Districts",
          items: [
            "Areas with visible maker spaces and studios",
            "Neighborhoods where artisans cluster (shared knowledge)",
            "Cities with strong apprenticeship cultures",
            "Regions known for one craft done exceptionally",
          ],
          reasoning: "You need to **see the work**. Walking past workshops where mastery happens daily feeds your soul.",
        },
        {
          title: "Quality-Over-Speed Cultures",
          items: [
            "Cities with slow food movements",
            "Places where family businesses span generations",
            "Regions resistant to corporate homogenization",
            "Communities that value 'the old way' when it's better",
          ],
          reasoning: "Cultural pace matters. You need environments that **protect time for quality**.",
        },
      ],
      redLight: {
        title: "Avoid These Environments",
        items: [
          "Hustle culture startup cities (SF, Austin if in tech mode)",
          "Fast-fashion districts with disposable aesthetics",
          "Cities optimized purely for efficiency (sterile business hubs)",
          "Places where 'vintage' is aesthetic, not functional respect",
        ],
        reasoning: "These places **reward speed over craft**. You'll feel pressured to ship instead of refine, and it will slowly kill your spirit.",
      },
      validation: {
        resonates: [
          "You've visited a city and felt *at home* because of its craft culture",
          "You notice when a city's architecture is well-made vs. cheaply built",
          "You seek out workshop districts and maker spaces instinctively",
          "You'd rather live in a smaller city with craft than a major hub without it",
        ],
        doesntResonate: [
          "You love the energy of 'move fast' cities (you might be Jaejin or Enzuka)",
          "You prefer variety over depth in environments (you might be Namsea or Kayori)",
          "You don't notice quality differences in surroundings (totally valid for other codes!)",
        ],
      },
      affiliates: [
        { name: "Booking.com", type: "Travel", url: "https://booking.com" },
        { name: "Airbnb", type: "Long-term stays", url: "https://airbnb.com" },
      ],
    },

    work: {
      why: `**The Core Truth:**
Your code doesn't care about *what* you do—it cares about **how you're allowed to do it**. You don't need a "creative" job or a "prestigious" role. You need **permission to refine**, **time to go deep**, and **respect for the process**.

**What this means:**
Open offices kill you. "Ship it Friday" culture drains you. Jobs that reward speed over quality feel like violence. You need work environments that **protect focus**, **value iteration**, and **understand that the 73rd version matters**.

**The deeper pattern:**
Shokunin experiences work as **sacred practice**. Every task is an opportunity for mastery. You don't separate "important work" from "small tasks"—you bring craftsmanship to everything. Your environment must **honor this**, not punish it.

**When you ignore this:**
You take a high-paying job with tight deadlines and lose your soul. You're labeled "perfectionist" like it's a flaw. You're told to "move faster" and feel broken. You succeed externally but die internally.

**When you honor this:**
You find work that respects the craft—and suddenly you're unstoppable. You work long hours and feel *energized*. People call you dedicated, obsessed, masterful. You smile because they finally see it.`,
      greenLight: [
        {
          title: "Deep Focus Environments",
          items: [
            "Remote work with async communication (no constant interruptions)",
            "Studios/workshops with dedicated solo space",
            "Companies with 'maker time' schedules (4-hour blocks)",
            "Research labs or craft-based businesses",
            "Roles with clear quality standards and time to meet them",
          ],
          reasoning: "You need **uninterrupted time** to enter flow. Context-switching is torture.",
        },
        {
          title: "Quality-First Cultures",
          items: [
            "Companies that ship when it's ready, not by deadline",
            "Teams with rigorous code review / design critique",
            "Businesses where reputation depends on craft (law firms, architecture, custom manufacturing)",
            "Places where 'technical debt' is actually addressed",
          ],
          reasoning: "The culture must **value excellence** over speed, or you'll be at war with yourself daily.",
        },
        {
          title: "Mentorship/Apprenticeship Models",
          items: [
            "Senior roles where you guide others (teaching deepens mastery)",
            "Junior roles with clear masters to learn from",
            "Guild-like structures (peer review, shared standards)",
            "Companies with formal craft development paths",
          ],
          reasoning: "You need to **see the path to mastery**—both for yourself and others.",
        },
      ],
      redLight: {
        title: "Avoid These Work Environments",
        items: [
          "Open offices with constant collaboration pressure",
          "Startup 'move fast and break things' cultures",
          "Jobs where shortcuts are celebrated",
          "Places where 'good enough' is the standard",
          "Roles with arbitrary deadlines that prevent refinement",
        ],
        reasoning: "These environments **punish your strengths**. You'll be seen as 'too slow' when really you're just refusing to do bad work.",
      },
      validation: {
        resonates: [
          "You've quit jobs that paid well because the work felt sloppy",
          "You spend 'extra' time refining work even when no one asked",
          "You feel physical discomfort shipping work that's not your best",
          "You'd rather earn less doing quality work than more doing fast work",
        ],
        doesntResonate: [
          "You love the energy of fast-paced startups (you might be Jaejin)",
          "You prefer variety over depth in work (you might be Namsea)",
          "'Good enough' genuinely satisfies you (healthy for other codes!)",
        ],
      },
      affiliates: [
        { name: "LinkedIn Jobs", type: "Job search", url: "https://linkedin.com/jobs" },
        { name: "Remote.co", type: "Remote roles", url: "https://remote.co" },
      ],
    },

    community: {
      why: `**The Core Truth:**
Your code doesn't need many friends—you need **people who understand the obsession**. You're not antisocial; you're **selectively social**. You thrive in communities where dedication is normal, where 10,000 hours is respected, where "I spent all weekend on one detail" isn't seen as weird.

**What this means:**
Small talk drains you. Large parties feel empty. But a 3-hour conversation with one person about technique? That feeds your soul for weeks. You need **depth over breadth**, **quality over quantity**, **shared standards over shared activities**.

**The deeper pattern:**
Shokunin builds community through **shared craft**. Your people are the ones who *get it*—who see the difference between 95% and 98%, who understand why that last 5% matters, who don't rush you to finish.

**When you ignore this:**
You force yourself to socialize broadly and come home exhausted. You feel guilty for not having more friends. You wonder why parties feel hollow. You think something's wrong with you.

**When you honor this:**
You find your craft community—and suddenly you're home. You have 5 deep friendships instead of 50 acquaintances. You spend hours in focused conversation. You feel *known*.`,
      greenLight: [
        {
          title: "Craft-Based Communities",
          items: [
            "Maker spaces with regulars (not drop-in tourists)",
            "Guilds or associations for your craft",
            "Online communities focused on mastery (not trends)",
            "Mentor-apprentice relationships",
            "Peer critique groups (designers, writers, coders)",
          ],
          reasoning: "You need people who **speak your language**—where 'I rewrote it 5 times' is understood, not questioned.",
        },
        {
          title: "Small, Deep Bonds",
          items: [
            "3-5 close friends who share your dedication to something",
            "One-on-one deep conversations over group hangouts",
            "Long-term friendships (you don't need constant novelty)",
            "Relationships that deepen through shared practice",
          ],
          reasoning: "Quality over quantity. You'd rather have **one person who truly sees you** than 20 who don't.",
        },
        {
          title: "Structured Social Rituals",
          items: [
            "Weekly workshop sessions with the same people",
            "Monthly craft salons or critique circles",
            "Annual retreats focused on skill development",
            "Meetups with clear purpose (not 'networking')",
          ],
          reasoning: "You thrive with **ritualized connection**—predictable, purposeful, deep.",
        },
      ],
      redLight: {
        title: "Avoid These Community Patterns",
        items: [
          "Large networking events (surface-level)",
          "Friend groups focused on entertainment/consumption only",
          "Communities that celebrate 'hustle' over craft",
          "Social pressure to be constantly available",
        ],
        reasoning: "These drain you because they're **wide, not deep**. You'll feel lonely in a crowd.",
      },
      validation: {
        resonates: [
          "You have fewer friends than others but deeper bonds",
          "You'd cancel plans for a breakthrough in your work (and don't feel guilty)",
          "Your best friendships formed through shared practice",
          "You're energized by 3-hour conversations, drained by 3-hour parties",
        ],
        doesntResonate: [
          "You love large social gatherings (you might be Kayori)",
          "You need constant social variety (you might be Namsea)",
          "You make friends easily everywhere (you might be Enzuka)",
        ],
      },
      affiliates: [
        { name: "Meetup.com", type: "Find communities", url: "https://meetup.com" },
      ],
    },

    activities: {
      why: `**The Core Truth:**
Your code isn't about "being good at things"—it's about **the sacred relationship between repetition and refinement**. You don't do activities to check boxes or socialize; you do them to **approach perfection through 10,000 iterations**.

**What this means:**
Random hobbies feel empty because there's no mastery arc. "Good enough" makes you restless—you need room to get *better*. Casual participation drains you—you need *depth*. Visible progress is your oxygen; stagnation suffocates.

**The deeper pattern:**
Shokunin experiences **flow through precision**. Every activity must have:
- Clear quality standards (you know what "better" looks like)
- Incremental improvement (today's work builds on yesterday's)
- Tangible output (you can see/touch/measure the result)
- Reverence for process (the journey IS the destination)

**When you ignore this:**
You feel scattered (too many surface-level interests). You get bored easily (no depth = no engagement). You judge yourself as "lazy" (but really you're starving for mastery). You envy people who seem "passionate" (they just found their craft).

**When you honor this:**
Hours disappear into focused work. Progress feels meditative, not exhausting. You develop **quiet pride** in your skill. People describe you as "dedicated" or "obsessed" (and you smile).`,
      greenLight: [
        {
          title: "Physical Crafts",
          items: [
            "Woodworking - Every joint is a lesson. You can see your skill in the grain.",
            "Pottery - Clay doesn't lie. 10,000 bowls later, your hands know the form.",
            "Precision cooking - Not 'throw it together'—knife skills, timing, consistency.",
            "Instrument building - Luthiers are Shokunin incarnate. Sound is the proof.",
            "Metalwork - Forging, welding, machining—mastery shows in tolerances.",
            "Gardening (bonsai) - Not landscaping. 30 years to shape one tree perfectly.",
          ],
          reasoning: "These activities have **objective quality standards**. You can measure your improvement. The materials don't lie.",
        },
        {
          title: "Creative + Technical",
          items: [
            "Coding (clean architecture) - Obsessing over elegant solutions, refactoring for beauty.",
            "Photography (technical mastery) - Not Instagram—understanding light, composition, gear.",
            "Music (instrument mastery) - 10,000 hours on *one* instrument, not sampling many.",
            "Design (pixel-perfect) - Every alignment matters. You see the 1px difference.",
            "Calligraphy - Stroke order, pressure, rhythm—discipline becomes art.",
          ],
          reasoning: "Mastery has a **technical foundation**. You can study the greats, measure progress, refine endlessly.",
        },
        {
          title: "Intellectual Depth",
          items: [
            "Deep technical reading - Textbooks, not articles. You re-read classics.",
            "Mastery-focused courses - You finish every lesson. Completion = honor.",
            "Skill refinement study - Learning *one thing* at an expert level, not breadth.",
          ],
          reasoning: "Even learning must have **depth**. Skimming feels disrespectful to the material.",
        },
      ],
      redLight: {
        title: "Avoid These Activities",
        items: [
          "Casual hobbies with no depth (paint-and-sip nights)",
          "Dabbling in 10 instruments (surface-level feels like failure)",
          "'Try everything once' culture (you need one thing done deeply)",
          "Activities with no objective improvement measure",
        ],
        reasoning: "These feel hollow because there's **no mastery arc**. Without depth, you're just passing time.",
      },
      validation: {
        resonates: [
          "You've spent 100+ hours on *one* skill and felt energized, not bored",
          "You notice quality differences others miss (font kerning, knife sharpness)",
          "You get frustrated when tools are poorly made or processes are sloppy",
          "You'd rather do *one thing well* than *ten things okay*",
        ],
        doesntResonate: [
          "You love variety more than depth (that's Namsea/Kayori energy)",
          "'Good enough' genuinely satisfies you (healthy for other codes!)",
          "You prefer ideas over execution (that's Alethir)",
        ],
      },
      affiliates: [
        { name: "MasterClass", type: "Courses", url: "https://masterclass.com" },
        { name: "Skillshare", type: "Skills", url: "https://skillshare.com" },
      ],
    },

    learning: {
      why: `**The Core Truth:**
Your code doesn't learn by skimming—you learn by **complete absorption**. You don't collect certificates or sample topics. You **master one thing at a time**, going as deep as the material allows, finishing what you start because **incomplete learning feels like broken promises**.

**What this means:**
Articles frustrate you (too shallow). Video courses work if they're comprehensive. Books are best because you can **re-read**, **annotate**, **study**. You don't "consume content"—you **engage with knowledge** like a craftsperson with material.

**The deeper pattern:**
Shokunin treats learning as **apprenticeship**, even when alone. You want the *complete* path—beginner to master. You want to **earn** understanding through repetition, not shortcuts. You'd rather spend 6 months on one skill than 6 weeks on six.

**When you ignore this:**
You start 20 courses and finish none. You feel guilty about your "learning backlog." You mistake breadth for growth. You wonder why nothing sticks.

**When you honor this:**
You pick *one* thing and go all the way. You finish books. You re-watch lectures. You practice until it's automatic. You **own** the knowledge.`,
      greenLight: [
        {
          title: "Deep, Structured Courses",
          items: [
            "MasterClass (if you finish every lesson)",
            "University-level textbooks (not blog posts)",
            "Certification programs with rigor (not quick certificates)",
            "Apprenticeships or mentorship programs",
            "Courses with projects, not just videos",
          ],
          reasoning: "You need **complete systems of knowledge**, not fragments. The course must have a clear beginning and mastery endpoint.",
        },
        {
          title: "Technical Mastery Paths",
          items: [
            "Programming bootcamps (if completion-focused)",
            "Music conservatory approaches (technique fundamentals)",
            "Trade school certifications (measured skill standards)",
            "Language learning with structured progression (not apps)",
          ],
          reasoning: "You want **measurable progress** and **clear milestones**. 'Level 2' means something real.",
        },
        {
          title: "Re-readable, Reference-Heavy",
          items: [
            "Physical books you can annotate (not Kindle sampling)",
            "Courses you can re-watch (not time-limited access)",
            "Materials that reward repeated study",
            "Classic texts in your field (timeless knowledge)",
          ],
          reasoning: "You don't learn once—you **return to deepen understanding**. Materials must support this.",
        },
      ],
      redLight: {
        title: "Avoid These Learning Styles",
        items: [
          "Superficial 'tips and tricks' content",
          "Courses that promise 'master X in 30 days'",
          "Constant topic-switching (learning ADHD)",
          "Content designed for entertainment over education",
        ],
        reasoning: "These betray your need for **depth**. They're designed for sampling, not mastery.",
      },
      validation: {
        resonates: [
          "You've read a technical book cover-to-cover (multiple times)",
          "You finish courses even when life gets busy",
          "You take notes by hand because it deepens learning",
          "You'd rather master one skill than sample ten",
        ],
        doesntResonate: [
          "You love sampling many topics quickly (that's Alethir or Namsea)",
          "You learn through conversation more than study (that's Kayori)",
          "You prefer learning by doing, not studying (that's Khoruun)",
        ],
      },
      affiliates: [
        { name: "Udemy", type: "Technical courses", url: "https://udemy.com" },
        { name: "Coursera", type: "University courses", url: "https://coursera.org" },
      ],
    },

    media: {
      why: `**The Core Truth:**
Your code doesn't consume media for entertainment—you consume it for **quality**, **technique**, and **inspiration from mastery**. You don't watch TV to "relax"—you study how the cinematographer lit that scene. You don't listen to music passively—you hear the **craftsmanship** in the arrangement.

**What this means:**
Badly made things irritate you. Low-effort content feels disrespectful. You gravitate toward media where **someone cared deeply**—where you can see the 10,000 hours in every frame, note, or sentence.

**The deeper pattern:**
Shokunin experiences media as **communion with other craftspeople**. You're not watching a movie—you're studying a master's work. You're not reading fiction—you're learning how a writer built that sentence. Media is **aspirational**, not escapist.

**When you ignore this:**
You watch whatever's popular and feel empty. You scroll social media and feel worse. You wonder why everyone else seems entertained while you're just... tired.

**When you honor this:**
You curate media that **teaches while it entertains**. You watch films that reward repeated viewing. You listen to music that reveals new layers. You feel **fed**, not drained.`,
      greenLight: [
        {
          title: "Technically Masterful Media",
          items: [
            "Films with exceptional cinematography (Blade Runner 2049, The Revenant)",
            "Music with complex arrangements (classical, jazz, prog rock)",
            "Documentaries about craft (Jiro Dreams of Sushi, Abstract: The Art of Design)",
            "Books by writers who care about sentences (not just plot)",
            "Podcasts with deep dives (not surface interviews)",
          ],
          reasoning: "You want to see **other people's mastery**. It inspires your own work.",
        },
        {
          title: "Rewatchable/Replayable",
          items: [
            "Media that reveals more on second viewing",
            "Albums you can listen to 1,000 times",
            "Films with layered technical achievement",
            "Books worth re-reading for craft study",
          ],
          reasoning: "You don't want disposable content. You want media that **deepens** with attention.",
        },
        {
          title: "Craft-Focused Content",
          items: [
            "Behind-the-scenes features (how it was made)",
            "Technical breakdowns (Corridor Crew, Every Frame a Painting)",
            "Interviews with masters discussing process",
            "Media that makes the invisible visible",
          ],
          reasoning: "You want to see **how**, not just what. The process is as valuable as the product.",
        },
      ],
      redLight: {
        title: "Avoid These Media Types",
        items: [
          "Low-effort reality TV (feels like junk food)",
          "Media designed for background noise",
          "Content optimized for virality over craft",
          "Anything where 'good enough' was the standard",
        ],
        reasoning: "These feel **disrespectful to your time**. You can *feel* when someone didn't care.",
      },
      validation: {
        resonates: [
          "You've rewatched a film just to study one aspect (lighting, editing)",
          "You notice poor craftsmanship and it bothers you",
          "You prefer documentaries about process over pure entertainment",
          "You'd rather watch one masterpiece than ten 'pretty good' things",
        ],
        doesntResonate: [
          "You love light, fun content (that's Namsea energy)",
          "You watch for social reasons (that's Kayori)",
          "You prefer media for ideas, not craft (that's Alethir)",
        ],
      },
      affiliates: [
        { name: "Criterion Channel", type: "Curated films", url: "https://criterionchannel.com" },
        { name: "MasterClass", type: "Learn from masters", url: "https://masterclass.com" },
      ],
    },

    living: {
      why: `**The Core Truth:**
Your code doesn't care about trendy apartments or impressive addresses—you care about **space that supports your work**. Home isn't where you relax—it's where you **practice**, **refine**, **create**. Your environment must **honor the craft**, not distract from it.

**What this means:**
You need dedicated workspace. You need good light. You need **room for tools** and **silence for focus**. Aesthetics matter, but only if they're **functional**—beauty through purpose, not decoration.

**The deeper pattern:**
Shokunin treats home as **the studio**. Even if you work elsewhere, home is where **the real work happens**—the side projects, the learning, the refinement. Your space must **protect this**, not compete with it.

**When you ignore this:**
You live in a trendy neighborhood but have no workspace. You're surrounded by noise. You feel guilty for wanting a "selfish" studio. Your home drains you instead of fueling you.

**When you honor this:**
You prioritize workspace over square footage. You choose quiet over convenient. You invest in **good tools, good light, good silence**. Home becomes your sanctuary.`,
      greenLight: [
        {
          title: "Workspace-First Homes",
          items: [
            "Apartments with dedicated work rooms",
            "Lofts with studio space",
            "Houses with workshops/garages",
            "Locations quiet enough for deep focus",
            "Natural light (non-negotiable)",
          ],
          reasoning: "You need **space for the work**. Everything else is secondary.",
        },
        {
          title: "Quiet, Low-Stimulation",
          items: [
            "Away from busy streets",
            "Minimal neighbor noise",
            "Spaces where you can think",
            "Rooms that don't demand your attention",
          ],
          reasoning: "Visual and auditory clutter **breaks your focus**. You need calm.",
        },
        {
          title: "Functional Aesthetics",
          items: [
            "Minimalist design (what's there has purpose)",
            "Quality materials (wood, metal, natural)",
            "Surfaces that age well (not disposable)",
            "Beautiful through use, not decoration",
          ],
          reasoning: "Form follows function. You can't stand decorative clutter.",
        },
      ],
      redLight: {
        title: "Avoid These Living Situations",
        items: [
          "Apartments optimized for parties (you need focus, not social space)",
          "Open-plan chaos (no dedicated workspace)",
          "Trendy but loud neighborhoods",
          "Spaces with poor light or too much visual noise",
        ],
        reasoning: "These environments **fight your nature**. You'll never settle in.",
      },
      validation: {
        resonates: [
          "You've chosen a less convenient location for better workspace",
          "You care more about lighting than square footage",
          "Your home has a 'sacred space' for work",
          "You invest in quality tools, not trendy furniture",
        ],
        doesntResonate: [
          "You prioritize social space over work space (that's Kayori)",
          "You love bustling neighborhoods (that's Namsea energy)",
          "You move frequently for variety (that's Khoruun)",
        ],
      },
      affiliates: [
        { name: "Apartment List", type: "Find homes", url: "https://apartmentlist.com" },
      ],
    },

    rituals: {
      why: `**The Core Truth:**
Your code doesn't do "casual hangouts"—you do **meaningful rituals**. You don't want to "catch up over drinks"—you want **deep conversations about work**, **critique sessions**, **sharing breakthroughs**. Social connection for you is **built through practice**, not small talk.

**What this means:**
You'd rather skip a party and have a 3-hour workshop session. You bond through **shared discipline**, not shared consumption. Your friendships deepen when you **work side by side**, not when you entertain each other.

**The deeper pattern:**
Shokunin builds relationships through **ritual**—predictable, purposeful, craft-focused. Coffee with someone means showing them your latest work. Dinner means discussing technique. Every gathering has **substance**.

**When you ignore this:**
You force yourself to "be social" at parties and come home drained. You feel guilty for not being "fun." You wonder why shallow friendships feel exhausting.

**When you honor this:**
You create rituals around craft. Your gatherings have **purpose**. You bond through work, not distraction. Your people *get* why this matters.`,
      greenLight: [
        {
          title: "Craft-Based Gatherings",
          items: [
            "Weekly studio sessions with 2-3 people",
            "Monthly critique circles (show your work, get feedback)",
            "Tool-sharpening evenings (literally or metaphorically)",
            "Skill-share dinners (everyone teaches something)",
          ],
          reasoning: "You socialize best when there's **shared focus**. Working together builds bonds.",
        },
        {
          title: "Deep, Intentional Meals",
          items: [
            "Cooking as ritual (precision, care, timing)",
            "Long dinners discussing process",
            "Meals as breaks between work sessions",
            "Food made well, not just fast",
          ],
          reasoning: "Even eating can be **crafted**. Quality matters in all things.",
        },
        {
          title: "Quiet, Small, Regular",
          items: [
            "Same people, same time, same place (ritual needs rhythm)",
            "1-3 people max (depth over breadth)",
            "Focus on work in progress, not gossip",
            "Silence is comfortable",
          ],
          reasoning: "You need **ritualized connection**—predictable depth.",
        },
      ],
      redLight: {
        title: "Avoid These Social Patterns",
        items: [
          "Large parties with no purpose",
          "Networking events (transactional, surface)",
          "Social media performance (shallow connection)",
          "Constant spontaneous plans (you need structure)",
        ],
        reasoning: "These drain you because they're **wide, not deep**.",
      },
      validation: {
        resonates: [
          "Your best conversations happen during or after work sessions",
          "You bond through critique, not compliments",
          "You'd cancel social plans for a breakthrough (guilt-free)",
          "Your rituals are predictable, purposeful, craft-focused",
        ],
        doesntResonate: [
          "You love spontaneous parties (that's Kayori)",
          "You need constant social variety (that's Namsea)",
          "You bond through adventure, not craft (that's Khoruun)",
        ],
      },
      affiliates: [
        { name: "Eventbrite", type: "Find craft events", url: "https://eventbrite.com" },
      ],
    },

    movement: {
      why: `**The Core Truth:**
Your code doesn't exercise for "fitness"—you move for **mastery**. You don't go to the gym to check boxes—you train to **get measurably better** at one discipline. Casual workouts feel pointless; **progressive training** feels sacred.

**What this means:**
You need a practice, not a routine. You need visible progress—lifting heavier, running faster, holding poses longer. You need **technique**, not just effort. Your body is another domain for **refinement**.

**The deeper pattern:**
Shokunin treats movement as **craft**. You study form. You track numbers. You **respect the process**—warm-up, work, cool-down. You don't rush; you build.

**When you ignore this:**
You try "fun" fitness classes and feel bored. You skip workouts because they feel meaningless. You wonder why others seem motivated while you're not.

**When you honor this:**
You find *one* movement practice and go deep. You train for mastery, not appearance. You track progress. You **own** the discipline.`,
      greenLight: [
        {
          title: "Technique-Based Practices",
          items: [
            "Martial arts (form, precision, belt progression)",
            "Olympic lifting (technique over ego)",
            "Yoga (alignment, breath, depth)",
            "Rock climbing (problem-solving, progression)",
            "Swimming (stroke efficiency)",
          ],
          reasoning: "These have **clear technique standards**. You can measure improvement objectively.",
        },
        {
          title: "Solo, Progressive Training",
          items: [
            "Powerlifting programs (track every lift)",
            "Running with metrics (pace, distance, splits)",
            "Bodyweight progressions (harder variations)",
            "Cycling (power zones, cadence)",
          ],
          reasoning: "You need **visible progress**. Numbers don't lie.",
        },
        {
          title: "Ritualized Practice",
          items: [
            "Same time, same routine (ritual builds consistency)",
            "Warm-up protocols (respect the process)",
            "Mobility work (maintenance is craft too)",
            "Form drills (technique over intensity)",
          ],
          reasoning: "Movement is another **practice**. You honor it through ritual.",
        },
      ],
      redLight: {
        title: "Avoid These Movement Styles",
        items: [
          "Random 'fun' fitness classes (no progression)",
          "Workouts optimized for entertainment",
          "Gyms with chaotic energy",
          "Programs that prioritize intensity over technique",
        ],
        reasoning: "These lack **mastery pathways**. You'll lose motivation fast.",
      },
      validation: {
        resonates: [
          "You've stuck with one discipline for years",
          "You track your workouts (reps, weight, time)",
          "You study technique between sessions",
          "You care about form more than numbers (at first)",
        ],
        doesntResonate: [
          "You love varied, high-energy classes (that's Kayori)",
          "You prefer outdoor adventure over gym (that's Khoruun)",
          "You move spontaneously, not on schedule (that's Namsea)",
        ],
      },
      affiliates: [
        { name: "Strava", type: "Track training", url: "https://strava.com" },
      ],
    },

    wellness: {
      why: `**The Core Truth:**
Your code doesn't do "self-care" the way others do—you practice **discipline as self-respect**. You don't meditate to "relax"—you meditate to **sharpen focus**. You don't journal to vent—you journal to **refine thinking**. Wellness is another **craft**.

**What this means:**
You need practices with **structure**, not fluff. You need to see **improvement**—deeper focus, clearer thinking, better emotional regulation. You can't do "whatever feels good"—you need **measurable growth**.

**The deeper pattern:**
Shokunin treats wellness as **maintenance**. Just like you sharpen your tools, you **maintain your mind**. Meditation is sharpening focus. Therapy is refining self-understanding. Sleep is honoring the work.

**When you ignore this:**
You skip wellness because it feels "unproductive." You burn out. You wonder why your work suffers. You realize too late that **the tool (you) was dull**.

**When you honor this:**
You build wellness rituals. You track your practice. You treat your mind and body as **instruments to maintain**. The work improves because *you* improve.`,
      greenLight: [
        {
          title: "Structured Practices",
          items: [
            "Daily meditation (same time, tracked minutes)",
            "CBT-based therapy (concrete techniques)",
            "Sleep optimization (tracked, refined)",
            "Journaling with prompts (not free-form venting)",
          ],
          reasoning: "You need **measurable practices**. Progress must be visible.",
        },
        {
          title: "Discipline-Based Wellness",
          items: [
            "Stoic philosophy (rational frameworks)",
            "Breathwork protocols (Wim Hof, box breathing)",
            "Fasting regimens (structured, not chaotic)",
            "Cold exposure (progressive adaptation)",
          ],
          reasoning: "These require **commitment and refinement**. They're practices, not indulgences.",
        },
        {
          title: "Craft-Supportive Habits",
          items: [
            "Morning routines that protect work time",
            "Evening wind-downs that process the day",
            "Digital detoxes (protect focus)",
            "Nature time (reset sensory overwhelm)",
          ],
          reasoning: "Wellness supports the **craft**. It's not separate—it's foundational.",
        },
      ],
      redLight: {
        title: "Avoid These Wellness Approaches",
        items: [
          "Trendy 'self-care' without structure",
          "Wellness as consumption (products, not practice)",
          "Therapy that's purely emotional (you need tools)",
          "Meditation as escape (you need focus)",
        ],
        reasoning: "These feel **undisciplined**. You need structure, not fluff.",
      },
      validation: {
        resonates: [
          "You track your meditation streak",
          "You treat sleep as sacred (work depends on it)",
          "You see therapy as skill-building, not just venting",
          "You journal to think clearly, not just feel better",
        ],
        doesntResonate: [
          "You prefer intuitive, unstructured wellness (that's Namsea)",
          "You heal through connection, not discipline (that's Kayori)",
          "You need variety in practices (that's Alethir)",
        ],
      },
      affiliates: [
        { name: "Headspace", type: "Meditation", url: "https://headspace.com" },
        { name: "BetterHelp", type: "Therapy", url: "https://betterhelp.com" },
      ],
    },

    products: {
      why: `**The Core Truth:**
Your code doesn't buy products—you **invest in tools**. Every purchase is evaluated through one lens: **Will this help me do better work?** You don't want the newest gadget—you want the **best tool for the job**, built to last, worthy of mastery.

**What this means:**
You research obsessively before buying. You care about **quality over trends**. You'd rather own 5 great tools than 50 mediocre ones. You treat your tools with reverence—sharpened, maintained, respected.

**The deeper pattern:**
Shokunin sees products as **extensions of craft**. A good knife isn't a purchase—it's a **partner** in your work. A quality pen matters. Reliable software matters. Tools that fail mid-work **feel like betrayal**.

**When you ignore this:**
You buy cheap tools and hate every use. You accumulate clutter (nothing serves you well). You feel guilty for wanting "expensive" things (but it's not luxury—it's **respect for work**).

**When you honor this:**
You invest in tools that last. You maintain what you own. You feel **gratitude** every time you use a well-made thing. Your workspace is **purposeful**, not cluttered.`,
      greenLight: [
        {
          title: "Quality Tools",
          items: [
            "Professional-grade equipment for your craft",
            "Durable goods (buy once, use forever)",
            "Ergonomic workspace furniture",
            "Analog tools (notebooks, fountain pens)",
          ],
          reasoning: "Tools must **honor the work**. You can't craft well with bad tools.",
        },
        {
          title: "Productivity Systems",
          items: [
            "Apps with depth (Notion, Obsidian—not surface tools)",
            "Project management that tracks detail",
            "Note-taking systems you'll use for years",
            "Software that's powerful, not just pretty",
          ],
          reasoning: "Digital tools need the same **quality standards** as physical ones.",
        },
        {
          title: "Maintenance & Care Products",
          items: [
            "Tool sharpening systems",
            "Proper storage solutions",
            "Cleaning and maintenance supplies",
            "Repair kits (not replacements)",
          ],
          reasoning: "You **maintain** what you own. Tools deserve care.",
        },
      ],
      redLight: {
        title: "Avoid These Products",
        items: [
          "Trendy gadgets that don't serve real work",
          "Cheap tools you'll replace in a year",
          "Decorative items without function",
          "Subscriptions you don't deeply use",
        ],
        reasoning: "These betray your need for **purpose**. Waste offends you.",
      },
      validation: {
        resonates: [
          "You've owned the same tool for 10+ years (and it's perfect)",
          "You research purchases for weeks",
          "You feel physical discomfort using bad tools",
          "You sharpen, oil, clean, and maintain your equipment",
        ],
        doesntResonate: [
          "You love trying new products frequently (that's Namsea)",
          "You buy based on aesthetics over function (that's Kayori)",
          "You prefer minimal possessions (that's Sahen)",
        ],
      },
      affiliates: [
        { name: "Amazon", type: "Quality tools", url: "https://amazon.com" },
      ],
    },

    travel: {
      why: `**The Core Truth:**
Your code doesn't travel to "see the world"—you travel to **study craft in its native context**. You don't want tours—you want **workshops**. You don't want Instagram spots—you want to **meet masters**, **see techniques**, **understand traditions**.

**What this means:**
You travel slowly. You stay in one place long enough to learn. You seek out **living traditions**—the last blacksmith in the village, the textile cooperative, the family-run pottery studio. Travel is **pilgrimage to mastery**.

**The deeper pattern:**
Shokunin travels to **feed the craft**. Every trip has purpose—learn a technique, see a master's work, understand a tradition's context. You come home with **knowledge**, not just photos.

**When you ignore this:**
You do "bucket list" tourism and feel empty. You move too fast to learn anything. You come home exhausted, not inspired.

**When you honor this:**
You plan trips around **learning**. You take workshops. You meet makers. You return home with **new techniques**, **deeper understanding**, **renewed dedication** to your craft.`,
      greenLight: [
        {
          title: "Craft-Focused Travel",
          items: [
            "Pottery workshops in Japan",
            "Woodworking apprenticeships in Scandinavia",
            "Textile study in Oaxaca",
            "Cooking schools in Italy",
            "Traditional crafts in their origin regions",
          ],
          reasoning: "You travel to **learn**, not just see. Workshops give you something to bring home.",
        },
        {
          title: "Slow, Immersive Stays",
          items: [
            "1-3 months in one place (not 3 days in 10 cities)",
            "Rentals in maker districts",
            "Stays near workshops or studios",
            "Time to develop relationships with local craftspeople",
          ],
          reasoning: "You need **depth**. Surface tourism leaves you feeling empty.",
        },
        {
          title: "Purpose-Driven Itineraries",
          items: [
            "Trips planned around specific learning goals",
            "Visits to museums/studios (not just landmarks)",
            "Time for practice and integration",
            "Space for solitude and reflection",
          ],
          reasoning: "Every trip serves the **craft**. It's not vacation—it's study.",
        },
      ],
      redLight: {
        title: "Avoid These Travel Styles",
        items: [
          "Fast-paced 'see everything' tours",
          "Party-focused destinations",
          "Surface-level tourism (photo ops)",
          "Trips with no learning component",
        ],
        reasoning: "These waste your time. You'll come home **drained**, not inspired.",
      },
      validation: {
        resonates: [
          "You've planned a trip around learning one specific skill",
          "You stay in one place for weeks/months, not days",
          "You seek out local craftspeople wherever you go",
          "You return home with techniques, not just souvenirs",
        ],
        doesntResonate: [
          "You love fast-paced adventure travel (that's Khoruun)",
          "You travel for parties and socializing (that's Kayori)",
          "You prefer spontaneous wandering (that's Namsea)",
        ],
      },
      affiliates: [
        { name: "Airbnb Experiences", type: "Workshops", url: "https://airbnb.com/experiences" },
        { name: "Booking.com", type: "Long stays", url: "https://booking.com" },
      ],
    },
  },
/* ==========================================
   JAEJIN – KOREAN INTENSITY
========================================== */
Jaejin: {
  locations: {
    why: `**The Core Truth:**
Your code thrives under **pressure, density, and expectation**. You don’t come alive in relaxed or meandering environments—you sharpen when standards are high and effort is visible. Calm feels like decay; intensity feels like purpose.

**What this means:**
You need places where ambition is normalized, where long hours aren’t questioned, and where excellence is socially reinforced. Environments that demand less will slowly erode your edge.

**When you honor this:**
You feel focused, respected, and alive. Your effort has context. Your discipline makes sense.`,
    greenLight: [
      {
        title: "High-Performance Cities",
        items: [
          "Seoul – intensity, discipline, collective effort",
          "Singapore – efficiency, merit, pressure-tested systems",
          "Tokyo – seriousness of work, social standards",
          "New York City – competitive energy, output culture",
        ],
        reasoning: "These cities normalize **strain + excellence**. Your drive isn’t pathologized here—it’s expected.",
      },
      {
        title: "Dense, Goal-Oriented Districts",
        items: [
          "Business and financial hubs",
          "University-centered neighborhoods",
          "Areas with visible work ethic and late-night activity",
        ],
        reasoning: "You need to *feel* collective effort around you. Stillness drains you.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Slow-paced beach towns",
        "Overly spiritual or leisure-focused cities",
        "Places where ambition is mocked or softened",
      ],
      reasoning: "These environments frame your intensity as unhealthy. Over time, you’ll either dull yourself or burn out.",
    },
    validation: {
      resonates: [
        "You feel more focused when surrounded by driven people",
        "You’ve felt restless or guilty in overly relaxed places",
        "You associate effort with self-respect",
      ],
      doesntResonate: [
        "You thrive in unstructured, slow environments",
        "You dislike competition entirely",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
Your relationship with work is **existential**. Effort isn’t optional—it’s how you justify your place in the world. You respect results, discipline, and endurance more than comfort or balance.

**What this means:**
You do best where expectations are clear, output is measured, and contribution matters. Ambiguity and softness feel unsafe.

**When you honor this:**
You feel pride, momentum, and self-trust.`,
    greenLight: [
      {
        title: "High-Output Roles",
        items: [
          "Operations, engineering, finance, strategy",
          "Startups in execution-heavy phases",
          "Organizations with clear KPIs and accountability",
        ],
        reasoning: "You need **pressure + responsibility** to stay engaged.",
      },
      {
        title: "Hierarchical or Merit-Based Systems",
        items: [
          "Clear reporting lines",
          "Promotion through effort and results",
          "Respect for seniority or proven competence",
        ],
        reasoning: "Structure gives your effort meaning.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Unstructured creative roles with no standards",
        "Teams allergic to hierarchy or feedback",
        "Cultures that reward vibes over results",
      ],
      reasoning: "These make you feel unanchored and frustrated.",
    },
    validation: {
      resonates: [
        "You respect people who work harder than they talk",
        "You feel guilty resting without earning it",
        "You’re energized by responsibility",
      ],
      doesntResonate: [
        "You work best without pressure",
        "You dislike being evaluated",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You bond through **shared struggle**, not emotional disclosure. Loyalty is proven through consistency, not words.

**What this means:**
You prefer smaller, serious groups with mutual obligation. Casual or overly expressive communities feel shallow.

**When you honor this:**
You feel protected, respected, and grounded.`,
    greenLight: [
      {
        title: "Duty-Based Bonds",
        items: [
          "Work teams with shared pressure",
          "Training groups (martial arts, endurance sports)",
          "Long-term professional cohorts",
        ],
        reasoning: "Commitment builds trust for you.",
      },
    ],
    redLight: {
      title: "Avoid These Community Styles",
      items: [
        "Emotion-first social groups",
        "Constantly changing friend circles",
        "Communities without shared responsibility",
      ],
      reasoning: "They lack weight and reliability.",
    },
    validation: {
      resonates: [
        "You trust people who show up consistently",
        "You value loyalty over emotional openness",
      ],
      doesntResonate: [
        "You bond primarily through emotional sharing",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `**The Core Truth:**
You choose activities that **test endurance, discipline, and willpower**. Ease feels meaningless; effort gives shape to identity.`,
    greenLight: [
      {
        title: "Discipline-Based Activities",
        items: [
          "Martial arts",
          "Weight training with progression",
          "Long-distance running",
          "Skill mastery with strict standards",
        ],
        reasoning: "These externalize inner strength.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: [
        "Purely recreational hobbies",
        "Low-commitment activities",
      ],
      reasoning: "They don’t satisfy your need for effort.",
    },
    validation: {
      resonates: [
        "You enjoy activities that demand sacrifice",
      ],
      doesntResonate: [
        "You prefer playful, low-effort hobbies",
      ],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn best through **rigor and repetition**. Knowledge is earned, not sampled.`,
    greenLight: [
      {
        title: "Structured Learning",
        items: [
          "Formal education",
          "Certification paths",
          "Skill ladders with clear levels",
        ],
        reasoning: "Clear progression sustains motivation.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Unstructured self-learning"],
      reasoning: "Lack of standards drains momentum.",
    },
    validation: { resonates: [], doesntResonate: [] },
    affiliates: [],
  },

  media: {
    why: `You respect media that shows **effort, sacrifice, and seriousness**.`,
    greenLight: [
      {
        title: "Intensity-Focused Media",
        items: [
          "War, training, or survival films",
          "Biographies of disciplined figures",
        ],
        reasoning: "You’re drawn to earned strength.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Light, unserious content"],
      reasoning: "It feels empty.",
    },
    validation: { resonates: [], doesntResonate: [] },
    affiliates: [],
  },

  living: {
    why: `Your home should support **focus and recovery**, not indulgence.`,
    greenLight: [
      {
        title: "Minimal, Functional Spaces",
        items: [
          "Clean layouts",
          "Low distraction",
          "Proximity to work or training",
        ],
        reasoning: "Your environment should reduce friction.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Chaotic or overly decorative spaces"],
      reasoning: "They diffuse your focus.",
    },
    validation: { resonates: [], doesntResonate: [] },
    affiliates: [],
  },

  rituals: {
    why: `Rituals help you **contain pressure** and maintain discipline.`,
    greenLight: [
      {
        title: "Consistency Rituals",
        items: [
          "Morning training",
          "Fixed routines",
          "Weekly self-evaluation",
        ],
        reasoning: "Structure stabilizes intensity.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Unpredictable schedules"],
      reasoning: "They increase stress.",
    },
    validation: { resonates: [], doesntResonate: [] },
    affiliates: [],
  },

  movement: {
    why: `Movement is about **strength and control**, not expression.`,
    greenLight: [
      {
        title: "Strength & Endurance",
        items: [
          "Powerlifting",
          "Combat sports",
          "Military-style training",
        ],
        reasoning: "They align with your internal drive.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Dance or flow-based movement"],
      reasoning: "They lack containment.",
    },
    validation: { resonates: [], doesntResonate: [] },
    affiliates: [],
  },

  wellness: {
    why: `Wellness for you is **maintenance**, not indulgence.`,
    greenLight: [
      {
        title: "Discipline-Based Wellness",
        items: [
          "Sleep discipline",
          "Cold exposure",
          "Mental toughness practices",
        ],
        reasoning: "You respect practices that require effort.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Unstructured self-care trends"],
      reasoning: "They feel unserious.",
    },
    validation: { resonates: [], doesntResonate: [] },
    affiliates: [],
  },

  products: {
    why: `You value tools that **perform under stress**.`,
    greenLight: [
      {
        title: "Reliable, Serious Tools",
        items: [
          "Durable gear",
          "Professional equipment",
        ],
        reasoning: "Failure is unacceptable.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Trendy, fragile products"],
      reasoning: "They don’t last.",
    },
    validation: { resonates: [], doesntResonate: [] },
    affiliates: [],
  },

  travel: {
    why: `Travel is useful when it **tests or sharpens you**.`,
    greenLight: [
      {
        title: "Purpose-Driven Travel",
        items: [
          "Training camps",
          "Work-focused relocation",
        ],
        reasoning: "You travel to improve, not escape.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Pure leisure travel"],
      reasoning: "It feels empty.",
    },
    validation: { resonates: [], doesntResonate: [] },
    affiliates: [],
  },
},

/* ==========================================
   ALETHIR – ANCIENT GREEK INQUIRY
========================================== */
Alethir: {
  locations: {
    why: `**The Core Truth:**
Your code is powered by **questions**, not comfort. You don’t just want a place to live—you want a place that *keeps your mind awake*. You thrive in environments where debate is normal, ideas are social currency, and curiosity is respected.

**What this means:**
Aletheir isn’t “bookish”—it’s **alive inquiry**. You need cities with institutions, thinkers, discourse, and cultural depth. If the environment can’t hold complexity, you start shrinking yourself.

**When you honor this:**
You feel mentally fed. You meet people who challenge you. Your mind stays sharp—without becoming cynical.`,
    greenLight: [
      {
        title: "Idea-Dense Cities",
        items: [
          "Athens – philosophical lineage and public discourse",
          "London – museums, institutions, debate culture",
          "Berlin – intellectual counterculture and critique",
          "Boston/Cambridge – universities and deep-specialist circles",
          "Paris – salons, theory, arts + philosophy overlap",
        ],
        reasoning: "Alethir thrives where **ideas are ambient**—not a niche hobby.",
      },
      {
        title: "Third Places for Thought",
        items: [
          "Libraries with long-stay energy",
          "Museums you can return to repeatedly",
          "Cafés built for conversation (not fast turnover)",
          "Public lectures, talks, philosophy clubs",
        ],
        reasoning: "You need environments that invite **lingering attention**.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Places where questions are treated as negativity",
        "Social cultures where depth is seen as ‘trying too hard’",
        "Pure party cities with little intellectual infrastructure",
      ],
      reasoning: "When inquiry is socially punished, you either go quiet—or become sharp and isolated.",
    },
    validation: {
      resonates: [
        "You feel energized after a deep debate—even if you disagree",
        "You choose cities for institutions and culture, not just lifestyle",
        "You’ve felt ‘mentally hungry’ in places that are too shallow",
      ],
      doesntResonate: [
        "You prefer a calm, non-discussive environment",
        "You dislike theory or abstract thinking entirely",
      ],
    },
    affiliates: [
      { name: "Meetup", type: "Communities", url: "https://meetup.com" },
      { name: "Eventbrite", type: "Lectures", url: "https://eventbrite.com" },
    ],
  },

  work: {
    why: `**The Core Truth:**
You don’t work for tasks—you work for **truth, clarity, and coherence**. You’re built for roles where thinking is the product: analysis, reasoning, strategy, critique, synthesis.

**What this means:**
If your job doesn’t let you question assumptions, you’ll either disengage or slowly rot. You need work that respects the mind—and gives you room to go deeper than the obvious answer.

**When you honor this:**
You become a precision instrument: calm, sharp, and unusually difficult to manipulate.`,
    greenLight: [
      {
        title: "Inquiry-Driven Roles",
        items: [
          "Strategy, research, policy, intelligence",
          "Product thinking, analytics, experimentation",
          "Law, philosophy, ethics, governance",
          "AI/ML research, systems design, evaluation",
          "Writing/editing where ideas matter",
        ],
        reasoning: "Your gift is **structured insight**—you reduce noise into principles.",
      },
      {
        title: "High-Integrity Environments",
        items: [
          "Organizations that reward dissent (in good faith)",
          "Cultures with rigorous review (peer critique, debate, QA)",
          "Places where ‘why’ is welcomed, not feared",
        ],
        reasoning: "You need **truth-tolerance** in the culture, or you’ll become an outsider.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Vibes-only cultures (no reasoning, no standards)",
        "Jobs where questioning is seen as disloyalty",
        "Work that is purely execution without thinking space",
      ],
      reasoning: "You’ll feel like you’re betraying yourself if you’re forced to perform certainty without evidence.",
    },
    validation: {
      resonates: [
        "You can’t respect a plan you don’t understand",
        "You spot contradictions fast—and can’t unsee them",
        "You feel alive when you’re chasing a better explanation",
      ],
      doesntResonate: [
        "You prefer clear instructions over ambiguity",
        "You dislike debate and critique entirely",
      ],
    },
    affiliates: [
      { name: "LinkedIn Jobs", type: "Jobs", url: "https://linkedin.com/jobs" },
      { name: "Wellfound", type: "Startups", url: "https://wellfound.com" },
    ],
  },

  community: {
    why: `**The Core Truth:**
You bond through **ideas and honesty**, not constant presence. Your people are those who can disagree without disrespect, and who don’t collapse under complexity.

**What this means:**
You need a community where thought is safe. Not everyone has to be “intellectual”—but people must be **truthful, curious, and not fragile around nuance**.

**When you honor this:**
You feel seen for your mind—and your heart softens.`,
    greenLight: [
      {
        title: "Dialogue-Based Circles",
        items: [
          "Philosophy / debate groups",
          "Reading circles with real critique",
          "Research or builder communities",
          "Mentorship networks (teacher + student flows both ways)",
        ],
        reasoning: "Alethir needs **clean discourse**—not performance or tribal shouting.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Groups built on conformity",
        "Spaces where disagreement becomes personal attack",
        "Communities addicted to outrage or superiority",
      ],
      reasoning: "Your mind will either sharpen into arrogance—or withdraw into loneliness.",
    },
    validation: {
      resonates: [
        "You’ve had friendships built on conversation more than activity",
        "You respect people who change their mind with evidence",
      ],
      doesntResonate: [
        "You bond mostly through shared fun and lightness",
      ],
    },
    affiliates: [
      { name: "Discord", type: "Communities", url: "https://discord.com" },
    ],
  },

  activities: {
    why: `You choose activities that reward **depth, precision, and meaning**. You don’t want stimulation—you want insight.`,
    greenLight: [
      {
        title: "Depth Activities",
        items: [
          "Debate, writing, long-form reading",
          "Chess / strategy games",
          "Museum study, philosophy walks",
          "Building frameworks, research projects",
        ],
        reasoning: "These let you turn attention into understanding.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: [
        "Constant entertainment loops",
        "Activities with no room for thought",
      ],
      reasoning: "Too much stimulation blurs your signal; you start feeling empty.",
    },
    validation: { resonates: ["You prefer ‘slow depth’ over ‘fast fun’"], doesntResonate: ["You need constant novelty to enjoy life"] },
    affiliates: [],
  },

  learning: {
    why: `You learn by **interrogation**. You don’t memorize—you test. You need first principles, not slogans.`,
    greenLight: [
      {
        title: "Socratic Learning",
        items: [
          "Courses with debate + critique",
          "Books that build arguments (not just tips)",
          "Research, peer review, note systems",
        ],
        reasoning: "You learn when the material can survive questioning.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: [
        "Motivational content posing as education",
        "Learning paths that punish asking ‘why’",
      ],
      reasoning: "If the system can’t explain itself, you can’t trust it.",
    },
    validation: { resonates: ["You chase clarity until it clicks"], doesntResonate: ["You prefer simple answers even when reality is complex"] },
    affiliates: [
      { name: "Coursera", type: "Courses", url: "https://coursera.org" },
      { name: "edX", type: "Courses", url: "https://edx.org" },
    ],
  },

  media: {
    why: `You consume media to refine your mind. You want **arguments, craft, and insight**—not noise.`,
    greenLight: [
      {
        title: "High-Signal Media",
        items: [
          "Long-form essays and lectures",
          "Documentaries with substance",
          "Podcasts with structured thinking",
          "Books that challenge worldview",
        ],
        reasoning: "You respect media that thinks, not just reacts.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: [
        "Outrage cycles",
        "Low-context ‘hot take’ culture",
      ],
      reasoning: "It trains your mind to be reactive instead of clear.",
    },
    validation: { resonates: ["You can’t enjoy shallow content for long"], doesntResonate: ["You prefer light content always"] },
    affiliates: [],
  },

  living: {
    why: `Your home must support **thinking**. You need space for calm attention: reading, writing, reflection.`,
    greenLight: [
      {
        title: "Thinking-Friendly Homes",
        items: [
          "Quiet corners, warm light, fewer distractions",
          "A desk that invites deep work",
          "Books within reach (physical or digital library)",
        ],
        reasoning: "Your environment should reduce noise so your mind can go deeper.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: [
        "Constant noise, chaotic shared spaces",
        "Homes designed only for hosting/consumption",
      ],
      reasoning: "You’ll feel mentally scattered and subtly irritated every day.",
    },
    validation: { resonates: ["You need solitude to think clearly"], doesntResonate: ["You prefer constant social presence at home"] },
    affiliates: [],
  },

  rituals: {
    why: `Rituals keep you honest. They create **structure for inquiry**: returning, refining, clarifying.`,
    greenLight: [
      {
        title: "Clarity Rituals",
        items: [
          "Daily writing / reflection",
          "Weekly ‘truth audit’ (what do I actually believe?)",
          "Long walks to think",
        ],
        reasoning: "Your mind needs regular space to re-align with reality.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Rituals that are performative, not reflective"],
      reasoning: "If it’s for appearance, it pollutes your inner signal.",
    },
    validation: { resonates: ["You return to the same questions over years"], doesntResonate: ["You dislike reflection and prefer action only"] },
    affiliates: [],
  },

  movement: {
    why: `Movement for you is not hype—it’s **clarity through discipline**. You prefer practices that calm the mind and sharpen awareness.`,
    greenLight: [
      {
        title: "Mind-Body Precision",
        items: [
          "Yoga, mobility, breathwork",
          "Strength training with technique focus",
          "Endurance walks/runs for thinking",
        ],
        reasoning: "You move best when movement supports cognition.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Chaotic workout cultures built on ego and noise"],
      reasoning: "Too much external intensity reduces your internal clarity.",
    },
    validation: { resonates: ["You think better after controlled movement"], doesntResonate: ["You need adrenaline to enjoy movement"] },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness is about **mental integrity**: clear perception, emotional honesty, and stable attention.`,
    greenLight: [
      {
        title: "Integrity-Based Wellness",
        items: [
          "Therapy/coaching that builds frameworks",
          "Meditation that improves attention (not escapism)",
          "Sleep discipline (clarity multiplier)",
        ],
        reasoning: "You feel well when your mind is coherent and truthful.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Spiritual bypassing (using ‘peace’ to avoid truth)"],
      reasoning: "If it numbs inquiry, it eventually harms you.",
    },
    validation: { resonates: ["You can’t feel peace without honesty"], doesntResonate: ["You prefer comfort even when it’s untrue"] },
    affiliates: [],
  },

  products: {
    why: `You buy tools that increase signal: better thinking, better work, better clarity.`,
    greenLight: [
      {
        title: "Signal-Boosting Tools",
        items: [
          "Great notebooks / pens (thinking tools)",
          "Note systems (Obsidian/Notion style)",
          "Books and references you return to",
        ],
        reasoning: "Your ‘tools’ are mostly cognitive—anything that helps you refine truth.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Impulse buys optimized for novelty"],
      reasoning: "Novelty without depth feels like noise to you.",
    },
    validation: { resonates: ["You prefer one great tool over ten trendy ones"], doesntResonate: ["You love constant new gadgets"] },
    affiliates: [],
  },

  travel: {
    why: `You travel to **understand**, not to escape. You want history, museums, conversations, and context.`,
    greenLight: [
      {
        title: "Context-Rich Travel",
        items: [
          "Cities with deep history and institutions",
          "Trips built around learning (lectures, tours with substance)",
          "Slow travel that allows integration",
        ],
        reasoning: "You want to return home with a better model of reality—not just photos.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Party travel with no depth or context"],
      reasoning: "You’ll feel like you spent time but gained nothing.",
    },
    validation: { resonates: ["You plan travel around meaning"], doesntResonate: ["You travel mainly for entertainment"] },
    affiliates: [
      { name: "Atlas Obscura", type: "Deep places", url: "https://atlasobscura.com" },
    ],
  },
},

/* ==========================================
   NAMSEA – ISLAND FLOW
========================================== */
Namsea: {
  locations: {
    why: `**The Core Truth:**
Your code is regulated by **rhythm**, not pressure. You don’t thrive by forcing yourself into intensity—you thrive when life feels *natural*, breathable, and socially warm. Your nervous system is your compass.

**What this means:**
You need environments that allow slow integration: nature nearby, gentle pace, community texture, and daily beauty. When your surroundings are too harsh or transactional, you start dissociating or numbing out.

**When you honor this:**
You feel open, creative, affectionate, and quietly powerful—because you’re finally living in a tempo that matches you.`,
    greenLight: [
      {
        title: "Ocean-Adjacent / Nature-Integrated Places",
        items: [
          "Bali – ritual life + softness + community flow",
          "Hawaii – ocean rhythm, nature-first living",
          "Sri Lanka (coastal) – warmth, simplicity, ocean proximity",
          "Portugal (coastal towns) – slow living + beauty + walkability",
          "New Zealand (coastal) – nature structure + spaciousness",
        ],
        reasoning: "Namsea thrives where **nature is a daily regulator** and life isn’t only productivity.",
      },
      {
        title: "Walkable, Human-Scaled Neighborhoods",
        items: [
          "Areas with cafés, markets, and morning light",
          "Neighborhoods where you see familiar faces",
          "Places with parks, water, or greenery within minutes",
        ],
        reasoning: "You need **soft repetition**—the same places, gently re-lived.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Aggressive, status-driven cities with constant competition",
        "Cold social cultures where people rarely connect",
        "Places that feel purely transactional (no warmth, no ritual)",
      ],
      reasoning: "You’ll still function—but you’ll feel muted, tired, and subtly lonely.",
    },
    validation: {
      resonates: [
        "You become calmer the moment you’re near water or nature",
        "Harsh cities make you feel emotionally ‘tight’",
        "You choose places for vibe and warmth, not prestige",
      ],
      doesntResonate: [
        "You feel best in high-pressure, competitive environments",
        "You prefer colder, emotionally distant cultures",
      ],
    },
    affiliates: [
      { name: "Airbnb", type: "Stays", url: "https://airbnb.com" },
      { name: "Workaway", type: "Slow travel", url: "https://workaway.info" },
    ],
  },

  work: {
    why: `**The Core Truth:**
You do your best work when you feel **safe, connected, and un-rushed**. Your productivity comes from harmony, not force. When the environment is supportive, you become consistent and surprisingly effective.

**What this means:**
You need work that respects rhythm: flexible structure, humane leadership, and space to create. If the culture is harsh or constantly urgent, you’ll either burn out or emotionally detach.

**When you honor this:**
You create beauty, stability, and value that lasts—without sacrificing your spirit.`,
    greenLight: [
      {
        title: "Rhythm-Friendly Roles",
        items: [
          "Design, brand, writing, content, community",
          "Customer success / relationship-based roles",
          "Wellness, hospitality, education, coaching",
          "Product roles focused on human experience",
          "Remote work with autonomy and trust",
        ],
        reasoning: "Your strength is **felt intelligence**: sensing people, pacing, and emotional reality.",
      },
      {
        title: "Cultures That Feel Human",
        items: [
          "Leaders who communicate calmly",
          "Teams that value relationships, not fear",
          "Places where rest isn’t treated as weakness",
        ],
        reasoning: "Namsea thrives with **psychological safety** and steady tempo.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Fear-driven workplaces (pressure, blame, shaming)",
        "Always-on urgency cultures",
        "Cold KPI-only teams that treat humans like outputs",
      ],
      reasoning: "You’ll become anxious or numb, and your natural warmth will shut down.",
    },
    validation: {
      resonates: [
        "You work best when you feel emotionally settled",
        "Harsh feedback affects you deeply (even if you don’t show it)",
        "You’re loyal to teams that feel like family",
      ],
      doesntResonate: [
        "You perform best under extreme pressure",
        "You prefer high conflict and intensity",
      ],
    },
    affiliates: [
      { name: "Remote OK", type: "Remote jobs", url: "https://remoteok.com" },
      { name: "Wellfound", type: "Startups", url: "https://wellfound.com" },
    ],
  },

  community: {
    why: `**The Core Truth:**
You bond through **warmth, presence, and care**. Community is not optional for you—it’s part of regulation. You don’t want a crowd; you want a circle.

**What this means:**
Your people are those who feel emotionally safe, playful, and consistent. You want shared meals, shared space, and gentle loyalty.

**When you honor this:**
You become more confident, creative, and alive—because you’re held.`,
    greenLight: [
      {
        title: "Care-Based Communities",
        items: [
          "Small recurring friend circles",
          "Creative collectives (music, art, food)",
          "Surf / yoga / wellness communities",
          "Neighbourhood-style social life (familiar faces)",
        ],
        reasoning: "Namsea thrives in **soft belonging**, not performance networking.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Communities built on status games",
        "Groups addicted to drama or chaos",
        "Spaces that shame emotional sensitivity",
      ],
      reasoning: "You’ll either shrink or start people-pleasing until you disappear.",
    },
    validation: {
      resonates: [
        "You feel restored after shared meals and gentle conversation",
        "You value kindness over dominance",
      ],
      doesntResonate: [
        "You prefer solo life with minimal social contact",
      ],
    },
    affiliates: [
      { name: "Meetup", type: "Communities", url: "https://meetup.com" },
    ],
  },

  activities: {
    why: `You choose activities that feel like **flow, beauty, and presence**. You don’t want stimulation—you want harmony.`,
    greenLight: [
      {
        title: "Flow Activities",
        items: [
          "Swimming / surfing / ocean time",
          "Yoga, mobility, breath-led movement",
          "Cooking, hosting, shared meals",
          "Music, dance, slow creative practices",
        ],
        reasoning: "These keep your nervous system open and your spirit soft.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: [
        "Hyper-competitive activities that harden you",
        "Over-scheduled hobbies with no joy",
      ],
      reasoning: "If it removes softness, it isn’t aligned.",
    },
    validation: {
      resonates: ["You feel your best when life feels ‘gentle’ but meaningful"],
      doesntResonate: ["You prefer intensity and competition for fun"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **experience + embodiment**. You don’t just understand—you absorb.`,
    greenLight: [
      {
        title: "Embodied Learning",
        items: [
          "Mentorship and apprenticeship",
          "Learning by doing (hands-on, real environment)",
          "Slow study with repetition and integration",
        ],
        reasoning: "Namsea learns when knowledge becomes lived.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: [
        "Pure theory with no grounding",
        "Fast, competitive learning cultures",
      ],
      reasoning: "Too much speed creates anxiety and shallow retention.",
    },
    validation: {
      resonates: ["You remember what you’ve lived more than what you’ve read"],
      doesntResonate: ["You love abstract theory more than experience"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media to feel **beauty, tenderness, and aliveness**.`,
    greenLight: [
      {
        title: "Soft-Signal Media",
        items: [
          "Films with atmosphere and heart",
          "Music that regulates mood",
          "Nature documentaries",
          "Stories about healing, love, belonging",
        ],
        reasoning: "Namsea’s media is nourishment, not adrenaline.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: [
        "Aggressive outrage cycles",
        "Violent content that hardens your system",
      ],
      reasoning: "It contaminates your emotional baseline.",
    },
    validation: {
      resonates: ["Your playlist can change your whole day"],
      doesntResonate: ["Media doesn’t affect you emotionally"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home is a **sanctuary**. It should feel soft, warm, and restorative.`,
    greenLight: [
      {
        title: "Soft Homes",
        items: [
          "Natural light, airy layouts, greenery",
          "Textures: wood, linen, warm colors",
          "A kitchen / dining space that invites people",
        ],
        reasoning: "Your space should help you exhale.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: [
        "Cold minimalist spaces that feel sterile",
        "Homes that prioritize image over comfort",
      ],
      reasoning: "You’ll feel emotionally ungrounded.",
    },
    validation: {
      resonates: ["Your space strongly affects your mood"],
      doesntResonate: ["You can live anywhere without it affecting you"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals keep your life **tender and consistent**.`,
    greenLight: [
      {
        title: "Gentle Rituals",
        items: [
          "Morning light + tea/coffee",
          "Sunset walks",
          "Weekly shared meal",
          "Small daily self-care routines",
        ],
        reasoning: "These rituals preserve softness in a hard world.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Routines that feel like punishment"],
      reasoning: "If it’s harsh, it will not last for you.",
    },
    validation: {
      resonates: ["Small rituals keep you stable"],
      doesntResonate: ["You dislike routines entirely"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is regulation. You move to **stay open**.`,
    greenLight: [
      {
        title: "Open-Body Movement",
        items: [
          "Yoga, swimming, dance, hikes",
          "Mobility and breath-focused training",
        ],
        reasoning: "Your body needs softness + strength together.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Ego-based gym culture that creates anxiety"],
      reasoning: "It hardens you instead of strengthening you.",
    },
    validation: {
      resonates: ["You feel emotionally better after gentle movement"],
      doesntResonate: ["You only enjoy extreme training"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **emotional truth + nervous system care**.`,
    greenLight: [
      {
        title: "Regulation-Based Wellness",
        items: [
          "Sleep consistency",
          "Somatic practices (breath, grounding)",
          "Therapy/coaching that feels safe and human",
        ],
        reasoning: "When your system is regulated, everything improves.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: [
        "Toxic productivity wellness (shame + discipline only)",
      ],
      reasoning: "Shame makes you collapse or people-please.",
    },
    validation: {
      resonates: ["Your environment and relationships affect your health strongly"],
      doesntResonate: ["You can push through anything without cost"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy things that increase comfort, beauty, and ease—because those are performance multipliers for you.`,
    greenLight: [
      {
        title: "Comfort + Beauty Tools",
        items: [
          "Good bedding",
          "Soft lighting",
          "Skincare / body care that feels ritualistic",
          "Kitchen tools that make cooking joyful",
        ],
        reasoning: "Your products are about *quality of daily life*.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Harsh, purely utilitarian choices that feel cold"],
      reasoning: "If it makes life feel sterile, you’ll stop using it.",
    },
    validation: {
      resonates: ["You’ll pay more for things that feel good daily"],
      doesntResonate: ["You only care about function, never feel"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **soften and restore**. You want nature, warmth, and slow integration.`,
    greenLight: [
      {
        title: "Restorative Travel",
        items: [
          "Island and coastal travel",
          "Slow travel with one base",
          "Trips built around nature + community",
        ],
        reasoning: "Namsea returns home with a softer nervous system.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fast, packed itineraries", "Party travel that feels hollow"],
      reasoning: "Too much speed fractures your presence.",
    },
    validation: {
      resonates: ["You prefer fewer places, deeper experience"],
      doesntResonate: ["You want rapid travel and packed schedules"],
    },
    affiliates: [],
  },
}, 
