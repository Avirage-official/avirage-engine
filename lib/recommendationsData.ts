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
/* ==========================================
   SIYUANE – DISCIPLINED ENDURANCE & QUIET DIGNITY
   (Ethiopian Highlands + Han Chinese)
========================================== */
Siyuane: {
  locations: {
    why: `**The Core Truth:**
Your code is built on **endurance with dignity**. You are not driven by speed or display—you are driven by *continuity*. You survive, adapt, and progress through patience, discipline, and long memory.

**What this means:**
You thrive in environments that reward steadiness, respect effort, and value quiet competence. Places that glorify chaos, excess emotion, or constant reinvention exhaust you.

**When you honor this:**
You feel grounded, resilient, and internally proud—because your life moves forward without spectacle.`,
    greenLight: [
      {
        title: "Continuity-Based Environments",
        items: [
          "Highland or agrarian regions with strong tradition",
          "Cities with long civilizational memory",
          "Places where respect is earned slowly",
          "Environments that value order and perseverance",
        ],
        reasoning: "Siyuane thrives where **time is respected** and progress is cumulative.",
      },
      {
        title: "Stable, Structured Neighborhoods",
        items: [
          "Predictable daily rhythms",
          "Respectful public behavior",
          "Clear social expectations",
        ],
        reasoning: "Your nervous system settles when life feels **reliable and ordered**.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Hyper-chaotic or emotionally volatile cultures",
        "Places obsessed with novelty and reinvention",
        "Environments that reward loudness over consistency",
      ],
      reasoning: "You’ll feel quietly disrespected and worn down over time.",
    },
    validation: {
      resonates: [
        "You value endurance more than brilliance",
        "You respect people who quietly carry responsibility",
        "You prefer slow progress that lasts",
      ],
      doesntResonate: [
        "You thrive on constant excitement and change",
        "You prefer expressive chaos over stability",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work with **long-term seriousness**. You don’t chase short wins—you build something that holds over decades. Your strength is reliability, follow-through, and disciplined effort.

**What this means:**
You do best in roles where responsibility is real and continuity matters. Flashy cultures that constantly pivot make you feel unanchored.

**When you honor this:**
You become indispensable—trusted, steady, and deeply respected.`,
    greenLight: [
      {
        title: "Endurance-Oriented Roles",
        items: [
          "Operations, systems maintenance, infrastructure",
          "Research, engineering, long-horizon projects",
          "Education, training, stewardship roles",
          "Family business, institutional work",
        ],
        reasoning: "Your power is **staying power**—others rely on you.",
      },
      {
        title: "Respectful Hierarchies",
        items: [
          "Clear roles and expectations",
          "Merit built over time",
          "Cultures that reward loyalty and consistency",
        ],
        reasoning: "You work best where effort compounds.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Hype-driven startups with no stability",
        "Workplaces addicted to constant urgency",
        "Cultures that dismiss patience as weakness",
      ],
      reasoning: "You’ll feel undervalued and drained, even if you perform well.",
    },
    validation: {
      resonates: [
        "You take pride in being dependable",
        "You dislike abandoning work halfway",
        "You prefer depth over rapid advancement",
      ],
      doesntResonate: [
        "You want fast recognition and constant change",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You form bonds through **shared endurance and mutual respect**, not emotional display. Trust is built slowly—and once earned, it’s strong.

**What this means:**
You value communities that are loyal, disciplined, and steady. Excessive emotional volatility or performative intimacy feels unsafe to you.

**When you honor this:**
You feel quietly supported—without needing constant reassurance.`,
    greenLight: [
      {
        title: "Duty-Bound Communities",
        items: [
          "Family-centered networks",
          "Communities built on mutual responsibility",
          "Groups that show up consistently",
        ],
        reasoning: "Siyuane bonds through **reliability, not intensity**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Drama-driven social groups",
        "Communities that fracture easily under stress",
      ],
      reasoning: "You withdraw when trust feels unstable.",
    },
    validation: {
      resonates: [
        "You value loyalty over emotional excitement",
        "You trust actions more than words",
      ],
      doesntResonate: [
        "You need frequent emotional expression to feel close",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that reward **discipline, patience, and repetition**.`,
    greenLight: [
      {
        title: "Endurance Activities",
        items: [
          "Long walks, hiking, distance running",
          "Skill-building through repetition",
          "Practices that improve slowly over time",
        ],
        reasoning: "You feel strongest when effort accumulates.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["High-chaos activities with no structure"],
      reasoning: "They drain rather than strengthen you.",
    },
    validation: {
      resonates: ["You enjoy steady effort more than bursts"],
      doesntResonate: ["You get bored without constant novelty"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **discipline and repetition**. Mastery comes from patience.`,
    greenLight: [
      {
        title: "Structured Learning",
        items: [
          "Long-term study paths",
          "Curricula with clear progression",
          "Practice-based learning",
        ],
        reasoning: "You trust learning that unfolds step by step.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Unstructured, hype-driven learning"],
      reasoning: "Without continuity, learning feels shallow.",
    },
    validation: {
      resonates: ["You respect teachers who emphasize fundamentals"],
      doesntResonate: ["You prefer fast, unstructured learning"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media for **grounding and perspective**, not stimulation.`,
    greenLight: [
      {
        title: "Grounded Media",
        items: [
          "Historical narratives",
          "Documentaries about endurance and survival",
          "Stories of perseverance",
        ],
        reasoning: "You’re drawn to narratives that last.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Chaotic, outrage-based media"],
      reasoning: "It unsettles your inner stability.",
    },
    validation: {
      resonates: ["You prefer calm, serious content"],
      doesntResonate: ["You enjoy constant emotional stimulation"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **stable, modest, and dependable**.`,
    greenLight: [
      {
        title: "Grounded Living",
        items: [
          "Simple, functional spaces",
          "Order and cleanliness",
          "Objects with long-term use",
        ],
        reasoning: "Stability at home reinforces internal strength.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Constantly changing or chaotic spaces"],
      reasoning: "They erode your sense of continuity.",
    },
    validation: {
      resonates: ["You value reliability over aesthetics"],
      doesntResonate: ["You enjoy frequent change at home"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals give you **continuity and strength**.`,
    greenLight: [
      {
        title: "Discipline Rituals",
        items: [
          "Daily routines repeated over years",
          "Seasonal or weekly cycles",
          "Quiet personal practices",
        ],
        reasoning: "Repetition anchors you.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Inconsistent or chaotic routines"],
      reasoning: "They weaken your internal structure.",
    },
    validation: {
      resonates: ["You like rituals that endure"],
      doesntResonate: ["You dislike routine"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **conditioning and preservation**, not display.`,
    greenLight: [
      {
        title: "Endurance-Based Movement",
        items: [
          "Walking, hiking, steady running",
          "Strength training with consistency",
        ],
        reasoning: "Your body mirrors your long-term mindset.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Flashy, injury-prone training"],
      reasoning: "You prefer longevity over spectacle.",
    },
    validation: {
      resonates: ["You train for durability"],
      doesntResonate: ["You chase intensity"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness is about **resilience and prevention**.`,
    greenLight: [
      {
        title: "Preventive Wellness",
        items: [
          "Consistent sleep",
          "Simple nutrition routines",
          "Regular, modest self-care",
        ],
        reasoning: "Small habits sustain you for decades.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Extreme wellness swings"],
      reasoning: "They disrupt your internal balance.",
    },
    validation: {
      resonates: ["You prefer consistency over extremes"],
      doesntResonate: ["You like drastic resets"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy for **durability and usefulness**.`,
    greenLight: [
      {
        title: "Long-Life Products",
        items: [
          "Durable tools",
          "Simple, repairable items",
        ],
        reasoning: "You value longevity over novelty.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Trendy disposable goods"],
      reasoning: "They feel wasteful to you.",
    },
    validation: {
      resonates: ["You keep things for years"],
      doesntResonate: ["You replace things often"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **understand continuity and history**.`,
    greenLight: [
      {
        title: "Grounded Travel",
        items: [
          "Slow travel with one base",
          "Regions with deep historical continuity",
        ],
        reasoning: "You value understanding over novelty.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fast, chaotic travel"],
      reasoning: "It disrupts your internal rhythm.",
    },
    validation: {
      resonates: ["You prefer depth over variety in travel"],
      doesntResonate: ["You like constant movement"],
    },
        affiliates: [],
  },              // closes travel
},                // closes Kayori (or Shokunin / last code)
/* ==========================================
   SAHEN – HORIZON FREEDOM & MEASURED RESTRAINT
   (Tuareg)
========================================== */
Sahen: {
  locations: {
    why: `**The Core Truth:**
Your code is built around **freedom through restraint**. You don’t want excess—you want *space*. Space to move, to think, to breathe. You thrive when nothing is cluttering your horizon.

**What this means:**
You need environments that feel open, uncluttered, and honest. Over-engineered cities, crowded schedules, and constant stimulation suffocate you.

**When you honor this:**
You feel sovereign, calm, and internally vast—because your life has room to move.`,
    greenLight: [
      {
        title: "Open-Horizon Environments",
        items: [
          "Desert, steppe, or wide-sky regions",
          "Places with minimal visual and social clutter",
          "Regions where silence is respected",
          "Cultures that value autonomy over control",
        ],
        reasoning: "Sahen thrives where **space itself is a resource**.",
      },
      {
        title: "Low-Density Living",
        items: [
          "Homes with open sightlines",
          "Neighborhoods without constant intrusion",
          "Life arrangements with buffer time",
        ],
        reasoning: "Your nervous system relaxes when nothing presses in.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Crowded, noisy cities with no escape",
        "Over-scheduled cultures with no downtime",
        "Places that monitor or control movement",
      ],
      reasoning: "You’ll feel trapped, irritable, or quietly rebellious.",
    },
    validation: {
      resonates: [
        "You feel better when you can see far and move freely",
        "Crowds and noise exhaust you",
        "You need unstructured time to feel like yourself",
      ],
      doesntResonate: [
        "You love dense, highly social environments",
        "You prefer tightly packed schedules",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when given **autonomy and trust**. Micromanagement drains you. You want responsibility without surveillance.

**What this means:**
You thrive in roles where outcomes matter more than constant presence. Systems that obsess over monitoring make you disengage.

**When you honor this:**
You become efficient, self-directed, and deeply reliable.`,
    greenLight: [
      {
        title: "Autonomy-Driven Roles",
        items: [
          "Independent or remote work",
          "Field work or roles with movement",
          "Project-based responsibilities",
          "Roles with minimal bureaucracy",
        ],
        reasoning: "Your productivity comes from **freedom, not pressure**.",
      },
      {
        title: "Trust-Based Cultures",
        items: [
          "Leaders who set direction, then step back",
          "Clear goals with minimal oversight",
        ],
        reasoning: "You work best when you’re not constantly watched.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Micromanaged teams",
        "Constant check-ins and surveillance",
        "Roles that restrict movement or flexibility",
      ],
      reasoning: "You’ll quietly withdraw or disengage.",
    },
    validation: {
      resonates: [
        "You do better when trusted",
        "You dislike unnecessary meetings",
      ],
      doesntResonate: [
        "You enjoy constant collaboration and oversight",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You value **loose-bond loyalty**. You don’t need constant contact—but when it matters, you show up.

**What this means:**
Your ideal community respects independence and doesn’t demand constant availability. You prefer fewer, deeper bonds.

**When you honor this:**
You feel connected without feeling owned.`,
    greenLight: [
      {
        title: "Low-Demand Communities",
        items: [
          "Small circles with mutual respect",
          "Communities that allow distance without guilt",
        ],
        reasoning: "Sahen bonds through **choice, not obligation**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "High-demand social groups",
        "Communities that equate closeness with control",
      ],
      reasoning: "You’ll feel pressured or suffocated.",
    },
    validation: {
      resonates: [
        "You value independence in relationships",
        "You dislike being constantly expected",
      ],
      doesntResonate: [
        "You want constant social interaction",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that give you **space and self-direction**.`,
    greenLight: [
      {
        title: "Open-Ended Activities",
        items: [
          "Solo travel or long walks",
          "Navigation, exploration, mapping",
          "Activities without strict schedules",
        ],
        reasoning: "You feel alive when you can roam.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Tightly choreographed group activities"],
      reasoning: "They feel restrictive.",
    },
    validation: {
      resonates: ["You enjoy wandering without a plan"],
      doesntResonate: ["You prefer structured activities"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **self-directed exploration**.`,
    greenLight: [
      {
        title: "Independent Learning",
        items: [
          "Self-paced study",
          "Learning through travel or lived experience",
        ],
        reasoning: "You trust your own path.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Rigid curricula with no flexibility"],
      reasoning: "They feel confining.",
    },
    validation: {
      resonates: ["You learn best alone"],
      doesntResonate: ["You like classroom structure"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media to **expand your sense of space and perspective**.`,
    greenLight: [
      {
        title: "Wide-Horizon Media",
        items: [
          "Travel writing",
          "Stories of exploration and endurance",
        ],
        reasoning: "You’re drawn to vastness.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fast, noisy content"],
      reasoning: "It crowds your inner space.",
    },
    validation: {
      resonates: ["You like media that slows you down"],
      doesntResonate: ["You enjoy constant stimulation"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **open, simple, and unencumbered**.`,
    greenLight: [
      {
        title: "Minimal Living",
        items: [
          "Few but meaningful possessions",
          "Open layouts, uncluttered space",
        ],
        reasoning: "Less weight = more freedom.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Cluttered or crowded homes"],
      reasoning: "They feel heavy.",
    },
    validation: {
      resonates: ["You feel lighter with fewer things"],
      doesntResonate: ["You like collecting many items"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals give you **orientation, not obligation**.`,
    greenLight: [
      {
        title: "Orientation Rituals",
        items: [
          "Daily check-in with direction and intention",
          "Rituals that ground without fixing you in place",
        ],
        reasoning: "You need alignment, not rigidity.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Heavy, binding routines"],
      reasoning: "They restrict your movement.",
    },
    validation: {
      resonates: ["You like light structure"],
      doesntResonate: ["You like strict routines"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **navigation and endurance**.`,
    greenLight: [
      {
        title: "Navigational Movement",
        items: [
          "Long walks, hiking, trekking",
          "Endurance movement at your own pace",
        ],
        reasoning: "Movement clears your horizon.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Crowded gyms and rigid classes"],
      reasoning: "They feel confining.",
    },
    validation: {
      resonates: ["You move to think"],
      doesntResonate: ["You move to socialize"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness depends on **space, autonomy, and recovery**.`,
    greenLight: [
      {
        title: "Space-Based Wellness",
        items: [
          "Adequate rest and alone time",
          "Nature exposure",
        ],
        reasoning: "Space heals you.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Constant stimulation and obligation"],
      reasoning: "It exhausts you.",
    },
    validation: {
      resonates: ["You need solitude to reset"],
      doesntResonate: ["You reset through social energy"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy for **portability and usefulness**.`,
    greenLight: [
      {
        title: "Lightweight Tools",
        items: [
          "Durable, portable gear",
          "Multipurpose items",
        ],
        reasoning: "Freedom means carrying less.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Heavy, single-use possessions"],
      reasoning: "They feel like anchors.",
    },
    validation: {
      resonates: ["You like traveling light"],
      doesntResonate: ["You enjoy heavy setups"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **move and recalibrate your horizon**.`,
    greenLight: [
      {
        title: "Horizon Travel",
        items: [
          "Long routes rather than packed itineraries",
          "Travel that allows wandering",
        ],
        reasoning: "Movement restores you.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Crowded tourist circuits"],
      reasoning: "They feel claustrophobic.",
    },
    validation: {
      resonates: ["You like open-ended journeys"],
      doesntResonate: ["You prefer guided tours"],
    },
    affiliates: [],
  },
},
/* ==========================================
   LHUMIR – STILLNESS, CLARITY & INNER DISCIPLINE
   (Tibetan)
========================================== */
Lhumir: {
  locations: {
    why: `**The Core Truth:**
Your code is oriented around **clarity through stillness**. You don’t seek stimulation or expression—you seek *altitude*. When the noise drops, your perception sharpens.

**What this means:**
You thrive in environments that are quiet, spacious, and restrained. Excessive stimulation, emotional noise, or materialism clouds your inner clarity.

**When you honor this:**
You feel centered, perceptive, and quietly powerful—because nothing is pulling you away from yourself.`,
    greenLight: [
      {
        title: "High-Clarity Environments",
        items: [
          "Mountain or elevated regions",
          "Quiet towns with minimal sensory overload",
          "Places with strong contemplative culture",
          "Environments that respect silence",
        ],
        reasoning: "Lhumir thrives where **clarity is protected**.",
      },
      {
        title: "Low-Stimulation Living",
        items: [
          "Minimal advertising and noise",
          "Simple daily rhythms",
          "Natural light and open air",
        ],
        reasoning: "Your nervous system resets in calm, sparse settings.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Loud, overstimulating cities",
        "Places obsessed with consumption or display",
        "Emotionally chaotic cultures",
      ],
      reasoning: "Your perception dulls when there’s too much input.",
    },
    validation: {
      resonates: [
        "Silence feels nourishing to you",
        "You see more when things slow down",
        "You feel drained by constant stimulation",
      ],
      doesntResonate: [
        "You thrive in loud, busy environments",
        "You dislike quiet or solitude",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when your mind is **clear and undisturbed**. Your contribution comes from insight, discernment, and long attention—not speed.

**What this means:**
You thrive in roles that allow deep focus, ethical alignment, and minimal interruption. Chaotic workplaces scatter your attention and erode quality.

**When you honor this:**
You produce work that is precise, thoughtful, and unusually grounded.`,
    greenLight: [
      {
        title: "Clarity-Based Roles",
        items: [
          "Research, analysis, strategy",
          "Teaching, mentoring, guidance roles",
          "Design or writing requiring deep focus",
          "Wellness, contemplative, or ethical fields",
        ],
        reasoning: "Your value comes from **seeing clearly**, not reacting quickly.",
      },
      {
        title: "Calm Work Cultures",
        items: [
          "Few meetings, high trust",
          "Respect for deep work",
          "Leaders who value composure",
        ],
        reasoning: "Stillness allows your intelligence to surface.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Always-on urgency cultures",
        "Emotionally reactive teams",
        "Workplaces with constant interruptions",
      ],
      reasoning: "They fragment your attention and reduce your effectiveness.",
    },
    validation: {
      resonates: [
        "You do your best thinking alone or in quiet",
        "You value composure under pressure",
      ],
      doesntResonate: [
        "You enjoy constant collaboration and buzz",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You connect through **shared depth and mutual restraint**. You don’t need many people—you need sincerity.

**What this means:**
You prefer communities that value humility, calm presence, and ethical conduct. Excessive emotional display or social drama feels destabilizing.

**When you honor this:**
You feel supported without being pulled out of yourself.`,
    greenLight: [
      {
        title: "Depth-Oriented Communities",
        items: [
          "Small contemplative or spiritual circles",
          "Mentor–student style relationships",
          "Communities built on shared values, not noise",
        ],
        reasoning: "Lhumir bonds through **presence, not performance**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Drama-driven groups",
        "Communities addicted to stimulation or status",
      ],
      reasoning: "They disturb your inner equilibrium.",
    },
    validation: {
      resonates: [
        "You prefer few but meaningful relationships",
        "You value humility in others",
      ],
      doesntResonate: [
        "You want large, highly social communities",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that cultivate **stillness, awareness, and discipline**.`,
    greenLight: [
      {
        title: "Contemplative Activities",
        items: [
          "Meditation and breath practices",
          "Solitary walks in nature",
          "Journaling or reflective study",
        ],
        reasoning: "These activities sharpen perception.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["High-noise, high-stimulation activities"],
      reasoning: "They scatter your attention.",
    },
    validation: {
      resonates: ["You enjoy quiet practices"],
      doesntResonate: ["You need excitement to feel alive"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **contemplation and integration**.`,
    greenLight: [
      {
        title: "Deep Learning",
        items: [
          "Slow study of foundational texts",
          "Learning that integrates ethics and insight",
        ],
        reasoning: "You value understanding over accumulation.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fast, shallow learning systems"],
      reasoning: "They don’t leave lasting insight.",
    },
    validation: {
      resonates: ["You revisit the same ideas over time"],
      doesntResonate: ["You prefer fast-paced learning"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media to **clarify, not stimulate**.`,
    greenLight: [
      {
        title: "Clarity Media",
        items: [
          "Documentaries with depth",
          "Talks or writings on wisdom and ethics",
          "Minimalist or nature-based content",
        ],
        reasoning: "Media should quiet the mind, not agitate it.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Loud, reactive, outrage-driven content"],
      reasoning: "It clouds perception.",
    },
    validation: {
      resonates: ["You feel calmer after good media"],
      doesntResonate: ["You enjoy chaotic content"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **simple, quiet, and intentional**.`,
    greenLight: [
      {
        title: "Minimal Living",
        items: [
          "Sparse but warm interiors",
          "Spaces designed for calm and reflection",
        ],
        reasoning: "Your environment supports inner clarity.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Cluttered, noisy homes"],
      reasoning: "They disturb your focus.",
    },
    validation: {
      resonates: ["You feel better in uncluttered spaces"],
      doesntResonate: ["You like busy, decorative homes"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals maintain your **inner alignment and discipline**.`,
    greenLight: [
      {
        title: "Alignment Rituals",
        items: [
          "Morning stillness practice",
          "Daily reflection or intention-setting",
        ],
        reasoning: "Consistency keeps you centered.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Chaotic or excessive routines"],
      reasoning: "They dilute focus.",
    },
    validation: {
      resonates: ["You value quiet daily rituals"],
      doesntResonate: ["You dislike routine"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is about **balance and awareness**.`,
    greenLight: [
      {
        title: "Mindful Movement",
        items: [
          "Yoga, tai chi–like practices",
          "Slow, intentional strength or walking",
        ],
        reasoning: "Movement supports clarity.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Aggressive, chaotic training"],
      reasoning: "It disrupts awareness.",
    },
    validation: {
      resonates: ["You move to stay centered"],
      doesntResonate: ["You move for adrenaline"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **mental clarity and ethical alignment**.`,
    greenLight: [
      {
        title: "Clarity-Based Wellness",
        items: [
          "Regular rest",
          "Practices that calm the nervous system",
        ],
        reasoning: "Calm supports health.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Overstimulation and excess"],
      reasoning: "They erode balance.",
    },
    validation: {
      resonates: ["Calm improves your health"],
      doesntResonate: ["You thrive on stimulation"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy for **simplicity and purpose**.`,
    greenLight: [
      {
        title: "Essential Products",
        items: [
          "Minimal, high-quality items",
          "Tools that reduce complexity",
        ],
        reasoning: "Less distraction = more clarity.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Excessive or flashy possessions"],
      reasoning: "They clutter attention.",
    },
    validation: {
      resonates: ["You prefer fewer possessions"],
      doesntResonate: ["You like collecting many things"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **reset perspective and deepen awareness**.`,
    greenLight: [
      {
        title: "Contemplative Travel",
        items: [
          "Retreats or quiet regions",
          "Nature-focused, slow journeys",
        ],
        reasoning: "Travel should clarify, not overwhelm.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fast, noisy travel"],
      reasoning: "It fragments attention.",
    },
    validation: {
      resonates: ["You travel to reflect"],
      doesntResonate: ["You travel for excitement"],
    },
    affiliates: [],
  },
},
/* ==========================================
   KHOISAN – ATTUNEMENT, PRESENCE & TRACKING INTELLIGENCE
   (San / Khoisan)
========================================== */
Khoisan: {
  locations: {
    why: `**The Core Truth:**
Your code is built around **deep attunement to the present moment**. You don’t live abstractly—you read reality as it unfolds. Subtle changes in environment, people, and mood register instantly for you.

**What this means:**
You thrive in places that are natural, relational, and responsive. Overly artificial, rigid, or disconnected environments dull your perception.

**When you honor this:**
You feel alert, alive, and quietly wise—because you’re fully in contact with what’s real.`,
    greenLight: [
      {
        title: "Sensory-Natural Environments",
        items: [
          "Nature-rich regions with open land",
          "Places where daily life happens outdoors",
          "Low-noise, low-artifice environments",
          "Communities close to land and weather",
        ],
        reasoning: "Khoisan thrives where **the senses stay awake**.",
      },
      {
        title: "Responsive Living Spaces",
        items: [
          "Homes with natural light and airflow",
          "Spaces that allow movement and awareness",
        ],
        reasoning: "Your nervous system stays regulated through sensory feedback.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Highly artificial or sealed-off spaces",
        "Overly bureaucratic or rule-heavy cultures",
        "Places that suppress instinct or intuition",
      ],
      reasoning: "You’ll feel numb, anxious, or disconnected from yourself.",
    },
    validation: {
      resonates: [
        "You notice small changes others miss",
        "You feel best when outdoors or moving",
        "Artificial environments drain you",
      ],
      doesntResonate: [
        "You prefer fully controlled, artificial spaces",
        "You ignore sensory input easily",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when you can **read situations in real time**. Your intelligence is adaptive, intuitive, and situational—not rigidly procedural.

**What this means:**
You thrive in roles that reward observation, responsiveness, and on-the-ground awareness. Static desk roles or heavy abstraction disconnect you.

**When you honor this:**
You become highly effective—anticipating issues before they surface.`,
    greenLight: [
      {
        title: "Situational Intelligence Roles",
        items: [
          "Field work, research, or observation-based roles",
          "User research, ethnography, UX research",
          "Coaching, facilitation, mediation",
          "Crisis response or adaptive operations",
        ],
        reasoning: "Your strength is **reading the moment accurately**.",
      },
      {
        title: "Flexible Work Structures",
        items: [
          "Environments that allow movement",
          "Workflows that adapt in real time",
        ],
        reasoning: "Rigid systems blunt your intelligence.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Highly scripted or inflexible roles",
        "Workplaces that dismiss intuition",
        "Purely abstract or theoretical work",
      ],
      reasoning: "You’ll feel underused and mentally disconnected.",
    },
    validation: {
      resonates: [
        "You can sense problems early",
        "You adjust naturally to changing conditions",
      ],
      doesntResonate: [
        "You prefer fixed procedures",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You bond through **shared awareness and mutual responsiveness**. You read people quickly and value honesty in presence more than words.

**What this means:**
You prefer communities that are emotionally transparent and grounded. Pretence, hierarchy, or excessive formality feels unsafe.

**When you honor this:**
You feel connected without needing explanation.`,
    greenLight: [
      {
        title: "Attuned Communities",
        items: [
          "Small groups with high trust",
          "Communities comfortable with silence",
          "Groups that respond to real needs, not roles",
        ],
        reasoning: "Khoisan bonds through **shared sensing**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Highly performative social groups",
        "Rigid hierarchies that suppress instinct",
      ],
      reasoning: "They feel false or threatening.",
    },
    validation: {
      resonates: [
        "You sense honesty quickly",
        "You dislike social masks",
      ],
      doesntResonate: [
        "You enjoy formal or performative social scenes",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that sharpen **awareness and responsiveness**.`,
    greenLight: [
      {
        title: "Awareness Activities",
        items: [
          "Tracking, navigation, exploration",
          "Martial arts or movement requiring awareness",
          "Nature-based skill practices",
        ],
        reasoning: "These keep your senses tuned.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Repetitive activities with no awareness demand"],
      reasoning: "They dull perception.",
    },
    validation: {
      resonates: ["You enjoy activities that require attention"],
      doesntResonate: ["You prefer autopilot routines"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **direct experience and observation**.`,
    greenLight: [
      {
        title: "Experiential Learning",
        items: [
          "Learning by watching and doing",
          "Real-world experimentation",
        ],
        reasoning: "Khoisan learns by *being present*.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Purely theoretical instruction"],
      reasoning: "Without context, learning feels hollow.",
    },
    validation: {
      resonates: ["You learn fastest by doing"],
      doesntResonate: ["You prefer abstract study"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media to **observe reality more clearly**.`,
    greenLight: [
      {
        title: "Reality-Based Media",
        items: [
          "Nature documentaries",
          "Human behavior and observational content",
        ],
        reasoning: "You’re drawn to what reveals truth.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Overly edited, artificial content"],
      reasoning: "It feels misleading.",
    },
    validation: {
      resonates: ["You like raw, real media"],
      doesntResonate: ["You enjoy heavy spectacle"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **open, sensory, and alive**.`,
    greenLight: [
      {
        title: "Sensory Living",
        items: [
          "Natural materials",
          "Indoor–outdoor flow",
        ],
        reasoning: "Your awareness depends on sensory richness.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Sealed, artificial interiors"],
      reasoning: "They numb perception.",
    },
    validation: {
      resonates: ["You feel better in natural spaces"],
      doesntResonate: ["You prefer sealed environments"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals help you **stay oriented to reality**.`,
    greenLight: [
      {
        title: "Presence Rituals",
        items: [
          "Daily sensory check-ins",
          "Quiet observation practices",
        ],
        reasoning: "Presence is your anchor.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Rigid rituals disconnected from reality"],
      reasoning: "They feel empty.",
    },
    validation: {
      resonates: ["You like rituals that keep you aware"],
      doesntResonate: ["You prefer symbolic ritual only"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **awareness-in-motion**.`,
    greenLight: [
      {
        title: "Responsive Movement",
        items: [
          "Martial arts, agility training",
          "Trail walking, natural movement",
        ],
        reasoning: "Movement sharpens perception.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Mindless, repetitive training"],
      reasoning: "It disconnects you.",
    },
    validation: {
      resonates: ["You move to stay alert"],
      doesntResonate: ["You move to zone out"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **being in tune with your body and environment**.`,
    greenLight: [
      {
        title: "Attunement Wellness",
        items: [
          "Listening to bodily signals",
          "Nature-based regulation",
        ],
        reasoning: "Your body tells you what you need.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Ignoring bodily feedback"],
      reasoning: "Disconnection creates imbalance.",
    },
    validation: {
      resonates: ["You notice health signals early"],
      doesntResonate: ["You ignore physical cues"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy tools that support **adaptability and awareness**.`,
    greenLight: [
      {
        title: "Adaptive Tools",
        items: [
          "Lightweight, responsive gear",
          "Tools that enhance perception",
        ],
        reasoning: "Your tools should extend your senses.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Overly complex or heavy products"],
      reasoning: "They reduce responsiveness.",
    },
    validation: {
      resonates: ["You like simple, effective tools"],
      doesntResonate: ["You like complex systems"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **reawaken perception**.`,
    greenLight: [
      {
        title: "Awareness Travel",
        items: [
          "Nature immersion travel",
          "Journeys focused on observation, not consumption",
        ],
        reasoning: "Travel sharpens your senses.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Overplanned tourist travel"],
      reasoning: "It dulls awareness.",
    },
    validation: {
      resonates: ["You travel to feel more present"],
      doesntResonate: ["You travel mainly for luxury"],
    },
    affiliates: [],
  },
},
/* ==========================================
   ASHKARA – ETHICAL FIRE & PRINCIPLED ORDER
   (Persian / Zoroastrian)
========================================== */
Ashkara: {
  locations: {
    why: `**The Core Truth:**
Your code is governed by **truth, order, and moral clarity**. You thrive where values are explicit and actions align with principles. Ambiguity corrodes your energy.

**What this means:**
You need environments that reward integrity, fairness, and responsibility. Places that normalize corruption, double standards, or moral fog exhaust you.

**When you honor this:**
You feel steady, purposeful, and internally lit—because your life aligns with what you believe.`,
    greenLight: [
      {
        title: "Principle-Driven Environments",
        items: [
          "Cultures with strong civic ethics",
          "Places that value justice and accountability",
          "Institutions with clear rules applied fairly",
        ],
        reasoning: "Ashkara thrives where **order is moral**, not arbitrary.",
      },
      {
        title: "Structured, Respectful Living",
        items: [
          "Clean, well-maintained public spaces",
          "Predictable systems that work",
        ],
        reasoning: "Order supports ethical action.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Corrupt or rule-bending cultures",
        "Places where power overrides principle",
      ],
      reasoning: "Moral inconsistency drains you.",
    },
    validation: {
      resonates: [
        "You care deeply about fairness",
        "Hypocrisy angers you more than failure",
      ],
      doesntResonate: [
        "You’re comfortable with moral ambiguity",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when there is **ethical alignment**. Your motivation comes from doing the *right* thing well—not from shortcuts or optics.

**What this means:**
You excel in roles with clear standards, accountability, and meaningful responsibility. Shady incentives or unclear ethics disengage you.

**When you honor this:**
You become a pillar—trusted, decisive, and respected.`,
    greenLight: [
      {
        title: "Integrity-Centered Roles",
        items: [
          "Governance, policy, compliance",
          "Law, ethics, risk, quality assurance",
          "Leadership with accountability",
          "Engineering or systems with safety focus",
        ],
        reasoning: "Your strength is **moral reliability**.",
      },
      {
        title: "Transparent Cultures",
        items: [
          "Clear decision-making processes",
          "Open accountability and consequences",
        ],
        reasoning: "Transparency fuels your commitment.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Incentives that reward cutting corners",
        "Cultures that blur responsibility",
      ],
      reasoning: "You’ll disengage or burn out.",
    },
    validation: {
      resonates: [
        "You want to be proud of your work",
        "You prefer clear rules over favors",
      ],
      doesntResonate: [
        "You’re fine bending rules to win",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You bond through **shared values and mutual responsibility**. Trust is built on consistency and ethical behavior.

**What this means:**
You prefer communities with standards and purpose. Gossip, manipulation, or moral laxity erodes trust.

**When you honor this:**
You feel safe, respected, and aligned.`,
    greenLight: [
      {
        title: "Values-Based Communities",
        items: [
          "Civic or service-oriented groups",
          "Communities with codes of conduct",
        ],
        reasoning: "Ashkara bonds through **principle, not proximity**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Groups that excuse unethical behavior",
        "Status games without accountability",
      ],
      reasoning: "They feel unsafe to you.",
    },
    validation: {
      resonates: [
        "You respect people who stand by their word",
      ],
      doesntResonate: [
        "You enjoy morally loose social scenes",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that reinforce **discipline and integrity**.`,
    greenLight: [
      {
        title: "Principled Activities",
        items: [
          "Structured training with rules",
          "Service or duty-based practices",
        ],
        reasoning: "Order strengthens your inner fire.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Chaotic activities with no standards"],
      reasoning: "They feel empty.",
    },
    validation: {
      resonates: ["You enjoy structure with purpose"],
      doesntResonate: ["You prefer rule-free play"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **clear frameworks and ethical grounding**.`,
    greenLight: [
      {
        title: "Foundational Learning",
        items: [
          "Systems thinking",
          "Ethics, philosophy, governance",
        ],
        reasoning: "You value truth over novelty.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Relativistic or purely opinion-based learning"],
      reasoning: "It feels unanchored.",
    },
    validation: {
      resonates: ["You seek first principles"],
      doesntResonate: ["You enjoy ambiguity for its own sake"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media to **clarify right action**.`,
    greenLight: [
      {
        title: "Principled Media",
        items: [
          "Investigative journalism",
          "Ethics and history",
        ],
        reasoning: "You want truth with responsibility.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Sensational or manipulative content"],
      reasoning: "It pollutes judgment.",
    },
    validation: {
      resonates: ["You care about accuracy"],
      doesntResonate: ["You enjoy sensationalism"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **orderly and intentional**.`,
    greenLight: [
      {
        title: "Orderly Living",
        items: [
          "Clean lines, functional layouts",
          "Spaces that support routine",
        ],
        reasoning: "Order reinforces clarity.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Disorganized, neglected spaces"],
      reasoning: "They feel disrespectful to you.",
    },
    validation: {
      resonates: ["You feel calmer when things are in order"],
      doesntResonate: ["You’re fine with disorder"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals keep your **ethical compass lit**.`,
    greenLight: [
      {
        title: "Integrity Rituals",
        items: [
          "Daily intention-setting",
          "Weekly review of actions vs values",
        ],
        reasoning: "Fire is sustained through attention.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Rituals without meaning"],
      reasoning: "They feel hollow.",
    },
    validation: {
      resonates: ["You like reflecting on alignment"],
      doesntResonate: ["You avoid self-review"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **discipline in action**.`,
    greenLight: [
      {
        title: "Disciplined Training",
        items: [
          "Martial arts with codes",
          "Strength training with form and safety",
        ],
        reasoning: "Structure builds confidence.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Reckless or ruleless training"],
      reasoning: "It violates your sense of order.",
    },
    validation: {
      resonates: ["You value safe, principled training"],
      doesntResonate: ["You chase risk for thrill"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **alignment and responsibility**.`,
    greenLight: [
      {
        title: "Aligned Wellness",
        items: [
          "Consistent routines",
          "Preventive care",
        ],
        reasoning: "Integrity supports health.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Neglect or extremes"],
      reasoning: "They break trust with yourself.",
    },
    validation: {
      resonates: ["You like steady habits"],
      doesntResonate: ["You swing between extremes"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy for **quality and responsibility**.`,
    greenLight: [
      {
        title: "Responsible Products",
        items: [
          "Durable, ethically made goods",
        ],
        reasoning: "Your purchases reflect your values.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Disposable or unethical products"],
      reasoning: "They feel wrong to you.",
    },
    validation: {
      resonates: ["You care where things come from"],
      doesntResonate: ["You only care about price"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **understand civilization and values**.`,
    greenLight: [
      {
        title: "Civilizational Travel",
        items: [
          "Historic cities and cultural heritage",
          "Journeys with meaning and learning",
        ],
        reasoning: "Travel should deepen understanding.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Aimless or indulgent travel"],
      reasoning: "It feels empty.",
    },
    validation: {
      resonates: ["You travel to learn values"],
      doesntResonate: ["You travel just to escape"],
    },
    affiliates: [],
  },
},
/* ==========================================
   YATEVAR – COSMIC ORDER, DUTY & RITUAL TIME
   (Vedic Indian + Nahua/Aztec)
========================================== */
Yatevar: {
  locations: {
    why: `**The Core Truth:**
Your code is oriented around **living in alignment with cosmic order**. Life is not random to you—it unfolds in cycles, duties, and moments that must be honored at the right time.

**What this means:**
You thrive in environments where rhythm, ritual, and structure guide daily life. Places that ignore time, season, or responsibility feel disorienting.

**When you honor this:**
You feel purposeful, steady, and protected—because you are moving with time, not against it.`,
    greenLight: [
      {
        title: "Ritualized, Time-Aware Environments",
        items: [
          "Cultures with daily and seasonal rituals",
          "Places where tradition shapes daily rhythm",
          "Environments tied to land, calendar, and ceremony",
        ],
        reasoning: "Yatevar thrives where **time has meaning**.",
      },
      {
        title: "Structured Sacred Spaces",
        items: [
          "Places with temples, plazas, or communal ritual sites",
          "Homes aligned with routine and order",
        ],
        reasoning: "Sacred structure anchors your sense of duty.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Timeless, structureless lifestyles",
        "Cultures that dismiss duty or responsibility",
        "Places detached from land and season",
      ],
      reasoning: "You feel unmoored when nothing marks time.",
    },
    validation: {
      resonates: [
        "You feel grounded by routine and ritual",
        "You sense when something is ‘out of time’",
      ],
      doesntResonate: [
        "You prefer total spontaneity",
        "You dislike obligation entirely",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when your role feels like **service within a larger order**. Meaning comes from fulfilling your part well—not from personal gain alone.

**What this means:**
You excel in roles with clear responsibility, lineage, or social function. Aimless work drains you.

**When you honor this:**
You feel dignified, steady, and inwardly aligned.`,
    greenLight: [
      {
        title: "Duty-Oriented Roles",
        items: [
          "Education, teaching, mentorship",
          "Governance, civil service",
          "Ritual, spiritual, or cultural stewardship",
          "Roles with clear generational impact",
        ],
        reasoning: "Your motivation comes from **right action**.",
      },
      {
        title: "Order-Driven Work Cultures",
        items: [
          "Clear hierarchies of responsibility",
          "Respect for process and timing",
        ],
        reasoning: "You work best when structure reflects meaning.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Directionless or purely profit-driven roles",
        "Cultures that dismiss responsibility",
      ],
      reasoning: "They feel hollow and destabilizing.",
    },
    validation: {
      resonates: [
        "You like knowing your role and duty",
        "You take responsibility seriously",
      ],
      doesntResonate: [
        "You prefer work with no expectations",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You belong through **shared ritual and mutual obligation**. Community is sustained by showing up consistently.

**What this means:**
You value groups that honor roles, elders, and continuity. Communities without structure feel fragile.

**When you honor this:**
You feel protected and socially anchored.`,
    greenLight: [
      {
        title: "Ritual-Bound Communities",
        items: [
          "Family-centered or lineage-based groups",
          "Communities with ceremonies and shared calendars",
        ],
        reasoning: "Yatevar bonds through **duty and repetition**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Highly fluid groups with no continuity",
        "Communities that reject obligation",
      ],
      reasoning: "They feel unstable to you.",
    },
    validation: {
      resonates: [
        "You value commitment",
        "You respect elders and tradition",
      ],
      doesntResonate: [
        "You dislike structured community",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that reinforce **discipline and ritual timing**.`,
    greenLight: [
      {
        title: "Ritual Activities",
        items: [
          "Daily spiritual or grounding practices",
          "Ceremony-based movement or art",
        ],
        reasoning: "Repetition gives meaning.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Random activities with no continuity"],
      reasoning: "They feel empty.",
    },
    validation: {
      resonates: ["You enjoy doing things at set times"],
      doesntResonate: ["You avoid routine"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **lineage, repetition, and sacred texts**.`,
    greenLight: [
      {
        title: "Traditional Learning",
        items: [
          "Study of foundational texts",
          "Teacher–student transmission",
        ],
        reasoning: "Knowledge gains power through continuity.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Contextless or purely trendy learning"],
      reasoning: "It lacks grounding.",
    },
    validation: {
      resonates: ["You respect ancient knowledge"],
      doesntResonate: ["You prefer novelty only"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media to **understand order, myth, and time**.`,
    greenLight: [
      {
        title: "Mythic & Historical Media",
        items: [
          "Epics, mythology, sacred history",
          "Civilizational documentaries",
        ],
        reasoning: "Stories teach duty and consequence.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Disposable or nihilistic content"],
      reasoning: "It erodes meaning.",
    },
    validation: {
      resonates: ["You enjoy mythic narratives"],
      doesntResonate: ["You prefer purely casual content"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **ordered and ritually grounded**.`,
    greenLight: [
      {
        title: "Ritual Living",
        items: [
          "Defined spaces for rest, work, and reflection",
          "Objects with symbolic meaning",
        ],
        reasoning: "Structure reinforces alignment.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Disordered or purposeless spaces"],
      reasoning: "They confuse your rhythm.",
    },
    validation: {
      resonates: ["Your space reflects your values"],
      doesntResonate: ["You don’t care about spatial order"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals keep you **aligned with time and duty**.`,
    greenLight: [
      {
        title: "Time-Based Rituals",
        items: [
          "Daily, weekly, and seasonal practices",
          "Ritual review of actions and duties",
        ],
        reasoning: "Time gives structure to meaning.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Ritual-free living"],
      reasoning: "You feel unanchored.",
    },
    validation: {
      resonates: ["Ritual gives you stability"],
      doesntResonate: ["You dislike ceremony"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **devotion and discipline**.`,
    greenLight: [
      {
        title: "Disciplined Movement",
        items: [
          "Yoga-like or form-based practices",
          "Movement tied to breath and rhythm",
        ],
        reasoning: "Movement becomes offering.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Chaotic training"],
      reasoning: "It lacks intention.",
    },
    validation: {
      resonates: ["You move with intention"],
      doesntResonate: ["You move randomly"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **balance and duty to the body**.`,
    greenLight: [
      {
        title: "Balanced Wellness",
        items: [
          "Routine sleep and nourishment",
          "Preventive, cyclical care",
        ],
        reasoning: "Balance sustains life.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Disregarding bodily rhythm"],
      reasoning: "It breaks alignment.",
    },
    validation: {
      resonates: ["You respect bodily cycles"],
      doesntResonate: ["You ignore your body"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy items with **symbolic and functional value**.`,
    greenLight: [
      {
        title: "Meaningful Products",
        items: [
          "Tools used daily with intention",
          "Objects tied to ritual or routine",
        ],
        reasoning: "Use gives meaning.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Disposable, meaningless items"],
      reasoning: "They feel empty.",
    },
    validation: {
      resonates: ["You value purposeful possessions"],
      doesntResonate: ["You buy impulsively"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **encounter sacred time and place**.`,
    greenLight: [
      {
        title: "Sacred Travel",
        items: [
          "Pilgrimage-style journeys",
          "Cultural or ceremonial destinations",
        ],
        reasoning: "Travel should mark transformation.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Aimless tourism"],
      reasoning: "It lacks meaning.",
    },
    validation: {
      resonates: ["Travel feels meaningful when purposeful"],
      doesntResonate: ["You travel just to escape"],
    },
    affiliates: [],
  },
},
/* ==========================================
   ENZUKA – VITALITY, HONOR & EMBODIED STRENGTH
   (Maasai + Zulu)
========================================== */
Enzuka: {
  locations: {
    why: `**The Core Truth:**
Your code is powered by **life-force and honor**. You are meant to feel strong in your body and respected in your stance. Environments that weaken vitality or blur respect drain you.

**What this means:**
You thrive where movement is natural, posture matters, and people carry themselves with pride. Weak, apathetic, or overly ironic cultures erode your fire.

**When you honor this:**
You feel confident, grounded, and alive—because your strength is visible and earned.`,
    greenLight: [
      {
        title: "Vital, Embodied Environments",
        items: [
          "Warm climates with outdoor living",
          "Cultures that value physical presence",
          "Places where posture, dress, and bearing matter",
        ],
        reasoning: "Enzuka thrives where **strength is normalized**.",
      },
      {
        title: "Land-Connected Living",
        items: [
          "Access to open land or nature",
          "Daily movement built into life",
        ],
        reasoning: "Vitality is maintained through contact with land.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Sedentary, indoor-only lifestyles",
        "Cultures that shame strength or pride",
        "Environments that reward passivity",
      ],
      reasoning: "Your fire dims when strength is suppressed.",
    },
    validation: {
      resonates: [
        "You feel better when your body is strong",
        "Respect and dignity matter deeply to you",
      ],
      doesntResonate: [
        "You’re indifferent to physical vitality",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when your role allows **leadership, responsibility, and visible contribution**. You want to *stand* for something.

**What this means:**
You thrive in work that rewards courage, decisiveness, and presence. Roles that reduce you to anonymity or desk-bound passivity feel demeaning.

**When you honor this:**
You become inspiring—others trust your strength and follow your lead.`,
    greenLight: [
      {
        title: "Leadership & Responsibility Roles",
        items: [
          "Team leadership and management",
          "Security, safety, or protection roles",
          "Field leadership or operations",
          "Training, coaching, mentorship",
        ],
        reasoning: "Your authority comes from **embodied confidence**.",
      },
      {
        title: "Respect-Based Work Cultures",
        items: [
          "Clear hierarchy of responsibility",
          "Cultures that reward courage and follow-through",
        ],
        reasoning: "Honor fuels your motivation.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Overly passive or consensus-only cultures",
        "Work that removes bodily agency",
      ],
      reasoning: "You’ll feel diminished.",
    },
    validation: {
      resonates: [
        "You like being trusted with responsibility",
        "You perform better when your presence matters",
      ],
      doesntResonate: [
        "You prefer invisible, low-stakes roles",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You bond through **mutual respect and shared strength**. Loyalty and honor define belonging.

**What this means:**
You value communities that uphold dignity, protect members, and recognize contribution. Weak boundaries or disrespect dissolve trust.

**When you honor this:**
You feel proud of who you stand with.`,
    greenLight: [
      {
        title: "Honor-Based Communities",
        items: [
          "Tight-knit groups with clear roles",
          "Communities that value courage and loyalty",
        ],
        reasoning: "Enzuka bonds through **earned respect**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Communities that tolerate disrespect",
        "Groups that undermine strength",
      ],
      reasoning: "They feel unsafe or degrading.",
    },
    validation: {
      resonates: [
        "You value loyalty highly",
        "You dislike disrespect being ignored",
      ],
      doesntResonate: [
        "You’re comfortable with weak boundaries",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that express **strength, courage, and vitality**.`,
    greenLight: [
      {
        title: "Strength Activities",
        items: [
          "Strength training",
          "Endurance challenges",
          "Competitive or skill-based physical pursuits",
        ],
        reasoning: "Your spirit sharpens through challenge.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Passive or purely sedentary hobbies"],
      reasoning: "They weaken your edge.",
    },
    validation: {
      resonates: ["You enjoy physical challenge"],
      doesntResonate: ["You avoid exertion"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **challenge, mentorship, and testing yourself**.`,
    greenLight: [
      {
        title: "Trial-Based Learning",
        items: [
          "Learning by doing under pressure",
          "Mentorship with high standards",
        ],
        reasoning: "You grow through proving capability.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Purely theoretical learning"],
      reasoning: "Without embodiment, it feels weak.",
    },
    validation: {
      resonates: ["You like being tested"],
      doesntResonate: ["You dislike challenge"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media to **feel strength and honor**.`,
    greenLight: [
      {
        title: "Honor Media",
        items: [
          "Stories of courage and leadership",
          "Narratives of resilience and pride",
        ],
        reasoning: "You resonate with strength done right.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Cynical or mocking content"],
      reasoning: "It corrodes dignity.",
    },
    validation: {
      resonates: ["You like stories of bravery"],
      doesntResonate: ["You enjoy irony-heavy content"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **grounded and strength-supporting**.`,
    greenLight: [
      {
        title: "Strong Living",
        items: [
          "Space for movement and training",
          "Solid, functional furnishings",
        ],
        reasoning: "Your space should support vitality.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fragile or cramped living spaces"],
      reasoning: "They feel constricting.",
    },
    validation: {
      resonates: ["You like solid, functional spaces"],
      doesntResonate: ["You prefer delicate aesthetics"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals reinforce **honor and readiness**.`,
    greenLight: [
      {
        title: "Strength Rituals",
        items: [
          "Morning physical activation",
          "Regular self-discipline practices",
        ],
        reasoning: "Readiness maintains dignity.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Rituals that promote passivity"],
      reasoning: "They dull your edge.",
    },
    validation: {
      resonates: ["You like rituals that build strength"],
      doesntResonate: ["You prefer soft routines"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **expression of life-force**.`,
    greenLight: [
      {
        title: "Powerful Movement",
        items: [
          "Strength, sprinting, jumping",
          "Training that builds confidence",
        ],
        reasoning: "Movement affirms your presence.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Minimal or overly gentle movement"],
      reasoning: "You feel under-stimulated.",
    },
    validation: {
      resonates: ["You like feeling physically powerful"],
      doesntResonate: ["You prefer very gentle movement"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **strength, respect, and discipline**.`,
    greenLight: [
      {
        title: "Strength-Based Wellness",
        items: [
          "Consistent training and recovery",
          "Clear personal standards",
        ],
        reasoning: "Strength sustains health.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Neglecting the body"],
      reasoning: "Weakness compounds.",
    },
    validation: {
      resonates: ["Physical strength improves your confidence"],
      doesntResonate: ["You don’t connect health with strength"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy products that enhance **durability and strength**.`,
    greenLight: [
      {
        title: "Durable Gear",
        items: [
          "Training equipment",
          "Hard-wearing clothing and tools",
        ],
        reasoning: "Your tools should last.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fragile or decorative-only items"],
      reasoning: "They feel useless.",
    },
    validation: {
      resonates: ["You like tough gear"],
      doesntResonate: ["You like delicate products"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **test strength and experience vitality**.`,
    greenLight: [
      {
        title: "Challenging Travel",
        items: [
          "Adventure or physically engaging travel",
          "Journeys that test endurance",
        ],
        reasoning: "Challenge reawakens your fire.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Passive luxury travel"],
      reasoning: "It feels empty.",
    },
    validation: {
      resonates: ["You like travel that challenges you"],
      doesntResonate: ["You travel to avoid effort"],
    },
    affiliates: [],
  },
},
  /* ==========================================
   KHORUUN – VASTNESS, STOIC ENDURANCE & SOVEREIGN WILL
   (Mongolian)
========================================== */
Khoruun: {
  locations: {
    why: `**The Core Truth:**
Your code is built around **sovereignty and wide horizons**. You are strongest when you feel uncontained—free to move, decide, and endure on your own terms.

**What this means:**
You thrive in environments that feel spacious, honest, and uncompressed. Over-regulated, crowded, or emotionally intrusive places drain your resolve.

**When you honor this:**
You feel calm, formidable, and internally unshakeable—because nothing is pressing in on you.`,
    greenLight: [
      {
        title: "Wide, Uncompressed Environments",
        items: [
          "Open plains, steppes, or big-sky regions",
          "Low-density cities or frontier-like towns",
          "Places that value independence and toughness",
        ],
        reasoning: "Khoruun thrives where **space equals freedom**.",
      },
      {
        title: "Self-Sufficient Living Contexts",
        items: [
          "Places where people rely on themselves",
          "Cultures that respect resilience and grit",
        ],
        reasoning: "Your nervous system stabilizes when autonomy is normal.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Crowded, over-policed cities",
        "Cultures that demand emotional conformity",
        "Places that micromanage daily life",
      ],
      reasoning: "You’ll feel constrained and quietly resistant.",
    },
    validation: {
      resonates: [
        "You need space to think and move",
        "You dislike being monitored or controlled",
      ],
      doesntResonate: [
        "You enjoy dense, highly regulated environments",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when you are given **authority over your own execution**. You don’t need hand-holding—you need trust.

**What this means:**
You excel in roles that reward toughness, long endurance, and independent judgment. Excessive supervision kills motivation.

**When you honor this:**
You become relentless—quietly outlasting others.`,
    greenLight: [
      {
        title: "Autonomous, Endurance Roles",
        items: [
          "Independent operations or field work",
          "Logistics, infrastructure, or resilience-focused roles",
          "Leadership where decisions stick",
          "Entrepreneurial or frontier-style work",
        ],
        reasoning: "Your strength is **self-directed endurance**.",
      },
      {
        title: "Low-Interference Cultures",
        items: [
          "Clear goals, minimal oversight",
          "Respect for decisiveness",
        ],
        reasoning: "Trust unlocks your best work.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Micromanagement-heavy teams",
        "Emotionally performative workplaces",
      ],
      reasoning: "You disengage when autonomy is removed.",
    },
    validation: {
      resonates: [
        "You prefer being trusted to figure things out",
        "You handle long, difficult efforts well",
      ],
      doesntResonate: [
        "You like constant feedback and collaboration",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You value **loyalty without intrusion**. You don’t need constant closeness—just reliability when it matters.

**What this means:**
You prefer small, tough, dependable circles. Emotional dependency or social pressure feels burdensome.

**When you honor this:**
You feel bonded without losing independence.`,
    greenLight: [
      {
        title: "Low-Drama, Loyal Communities",
        items: [
          "Small groups built on shared hardship",
          "Communities that respect personal distance",
        ],
        reasoning: "Khoruun bonds through **shared endurance**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "High-emotion, high-demand social groups",
        "Communities that equate closeness with control",
      ],
      reasoning: "They feel suffocating.",
    },
    validation: {
      resonates: [
        "You value loyalty over intimacy",
        "You show up when it counts",
      ],
      doesntResonate: [
        "You want constant emotional connection",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that test **endurance, will, and self-reliance**.`,
    greenLight: [
      {
        title: "Endurance Activities",
        items: [
          "Long-distance movement",
          "Cold exposure or resilience training",
          "Solo challenges",
        ],
        reasoning: "Challenge strengthens your core.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Soft, convenience-driven hobbies"],
      reasoning: "They feel weakening.",
    },
    validation: {
      resonates: ["You enjoy pushing limits quietly"],
      doesntResonate: ["You avoid discomfort"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **testing, hardship, and real conditions**.`,
    greenLight: [
      {
        title: "Trial-Based Learning",
        items: [
          "Learning through responsibility",
          "Skills tested under pressure",
        ],
        reasoning: "Khoruun learns by enduring reality.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Overly theoretical learning"],
      reasoning: "If it’s not tested, it’s not real.",
    },
    validation: {
      resonates: ["You trust experience over theory"],
      doesntResonate: ["You prefer abstract study"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media that reflects **strength, resilience, and vastness**.`,
    greenLight: [
      {
        title: "Endurance Media",
        items: [
          "Stories of survival and conquest",
          "Narratives about solitude and willpower",
        ],
        reasoning: "You resonate with toughness done quietly.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Overly sentimental or noisy content"],
      reasoning: "It feels weak or distracting.",
    },
    validation: {
      resonates: ["You like stoic characters"],
      doesntResonate: ["You prefer emotional drama"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **simple, strong, and unrestrictive**.`,
    greenLight: [
      {
        title: "Sovereign Living",
        items: [
          "Minimal but durable setup",
          "Space to move and think",
        ],
        reasoning: "Your home should never feel confining.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Cramped or fragile living spaces"],
      reasoning: "They feel limiting.",
    },
    validation: {
      resonates: ["You like simple, tough environments"],
      doesntResonate: ["You enjoy delicate or ornate spaces"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals reinforce **self-discipline and readiness**.`,
    greenLight: [
      {
        title: "Endurance Rituals",
        items: [
          "Daily physical readiness check",
          "Personal codes of conduct",
        ],
        reasoning: "Discipline preserves sovereignty.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Comfort-only routines"],
      reasoning: "They weaken resolve.",
    },
    validation: {
      resonates: ["You like holding yourself to standards"],
      doesntResonate: ["You dislike self-discipline"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **endurance and control**.`,
    greenLight: [
      {
        title: "Enduring Movement",
        items: [
          "Strength and stamina training",
          "Movement that builds toughness",
        ],
        reasoning: "Your body mirrors your will.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Soft, convenience-focused training"],
      reasoning: "It feels weakening.",
    },
    validation: {
      resonates: ["You like feeling physically tough"],
      doesntResonate: ["You prefer gentle-only movement"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **strength, recovery, and restraint**.`,
    greenLight: [
      {
        title: "Resilience Wellness",
        items: [
          "Adequate recovery after exertion",
          "Simple, sustaining nutrition",
        ],
        reasoning: "Strength must be maintained.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Excessive indulgence"],
      reasoning: "It erodes resilience.",
    },
    validation: {
      resonates: ["You feel best when strong and rested"],
      doesntResonate: ["You ignore recovery"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy products for **durability and autonomy**.`,
    greenLight: [
      {
        title: "Hard-Wearing Tools",
        items: [
          "Rugged gear",
          "Tools that work anywhere",
        ],
        reasoning: "Your tools should survive hardship.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fragile, high-maintenance products"],
      reasoning: "They feel unreliable.",
    },
    validation: {
      resonates: ["You like gear that lasts"],
      doesntResonate: ["You enjoy delicate products"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **experience scale, distance, and self-reliance**.`,
    greenLight: [
      {
        title: "Vast Travel",
        items: [
          "Remote regions",
          "Journeys requiring endurance and planning",
        ],
        reasoning: "Distance restores your sense of self.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Over-managed, luxury-only travel"],
      reasoning: "It feels artificial.",
    },
    validation: {
      resonates: ["You like remote travel"],
      doesntResonate: ["You want everything handled for you"],
    },
    affiliates: [],
  },
},
/* ==========================================
   SILJOA – COLD RESILIENCE, FORESIGHT & QUIET COMPETENCE
   (Inuit + Sámi)
========================================== */
Siljoa: {
  locations: {
    why: `**The Core Truth:**
Your code is built for **survival through foresight**. You don’t trust comfort that isn’t earned. You feel safest when you’re prepared, steady, and living inside a system that can handle winter—literal or metaphorical.

**What this means:**
You thrive in environments that respect nature, limit waste, and prioritize practicality. Places that reward excess, impulsivity, or fragile systems make you anxious.

**When you honor this:**
You feel calm and capable—because you know you can handle what’s coming.`,
    greenLight: [
      {
        title: "Preparedness-Friendly Environments",
        items: [
          "Cold or seasonal climates with real winter logistics",
          "Communities where people plan ahead (food, heat, transport)",
          "Places that value practicality and repair culture",
        ],
        reasoning: "Siljoa thrives where **preparedness is normal**.",
      },
      {
        title: "Nature-Respecting Living",
        items: [
          "Access to water, forest, sky, or open land",
          "Places where people understand weather and limits",
        ],
        reasoning: "Your nervous system settles when reality is acknowledged—not denied.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Fragile, over-consumptive cities that ignore limits",
        "Places where systems break often (power, safety, logistics)",
        "Cultures that mock planning as paranoia",
      ],
      reasoning: "When nobody prepares, you carry the burden alone.",
    },
    validation: {
      resonates: [
        "You feel safer when you’re prepared",
        "You notice resource waste quickly",
        "You prefer reliable systems over luxury",
      ],
      doesntResonate: [
        "You love spontaneity and hate planning",
        "You dislike dealing with practicalities",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when reliability matters. You are a **stability builder**—someone who anticipates failure, reduces risk, and keeps things working when conditions are harsh.

**What this means:**
You thrive in roles that reward planning, resilience, and long attention. Chaotic, improvisational workplaces exhaust you.

**When you honor this:**
You become the person everyone relies on—quietly essential.`,
    greenLight: [
      {
        title: "Resilience & Systems Roles",
        items: [
          "Reliability engineering, infrastructure, security",
          "Operations, logistics, contingency planning",
          "Risk, safety, QA, compliance",
          "Anything that requires planning for worst-case",
        ],
        reasoning: "Your strength is **anticipation + stability**.",
      },
      {
        title: "Low-Drama Work Cultures",
        items: [
          "Clear responsibility and protocols",
          "Teams that respect calm competence",
        ],
        reasoning: "Siljoa works best in environments that value steadiness.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Always-on chaos cultures",
        "Places that refuse contingency planning",
        "Work that rewards risk-taking without responsibility",
      ],
      reasoning: "You’ll burn out protecting the system from itself.",
    },
    validation: {
      resonates: [
        "You think in contingencies automatically",
        "You prefer stable, well-designed systems",
      ],
      doesntResonate: [
        "You like high-risk work with no structure",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You bond through **dependability and shared survival intelligence**. You don’t need many people—you need people who show up when it matters.

**What this means:**
You value small circles with trust, competence, and emotional steadiness. Loud social scenes feel unsafe or tiring.

**When you honor this:**
You feel protected without needing constant interaction.`,
    greenLight: [
      {
        title: "Reliability-Based Communities",
        items: [
          "Small circles with mutual aid",
          "Communities that share resources and responsibility",
          "Groups where calm is respected",
        ],
        reasoning: "Siljoa bonds through **mutual preparedness**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Drama-driven social groups",
        "People who create crises repeatedly",
      ],
      reasoning: "Unnecessary chaos feels dangerous to you.",
    },
    validation: {
      resonates: [
        "You trust actions more than words",
        "You prefer steady people",
      ],
      doesntResonate: [
        "You love highly social, chaotic communities",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that build **competence, resilience, and calm focus**.`,
    greenLight: [
      {
        title: "Competence Activities",
        items: [
          "Outdoor skills, hiking, navigation",
          "Skill practice with real-world utility",
          "Long quiet craft or building projects",
        ],
        reasoning: "You enjoy capability that lasts.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Shallow activities optimized only for stimulation"],
      reasoning: "They feel pointless.",
    },
    validation: {
      resonates: ["You like useful skills"],
      doesntResonate: ["You prefer pure entertainment"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **practical understanding and systems thinking**.`,
    greenLight: [
      {
        title: "Practical Learning",
        items: [
          "Hands-on training",
          "Learning that improves reliability and preparedness",
        ],
        reasoning: "You trust knowledge you can apply under pressure.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Hype learning without real-world grounding"],
      reasoning: "If it fails under stress, it isn’t knowledge.",
    },
    validation: {
      resonates: ["You learn for survival value"],
      doesntResonate: ["You learn mainly for novelty"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media that strengthens **perspective and preparedness**.`,
    greenLight: [
      {
        title: "High-Utility Media",
        items: [
          "Survival, nature, and systems documentaries",
          "Calm long-form content with real insight",
        ],
        reasoning: "You want signal, not noise.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Outrage cycles and chaotic stimulation"],
      reasoning: "It destabilizes your baseline.",
    },
    validation: {
      resonates: ["You prefer calm, practical media"],
      doesntResonate: ["You love loud, chaotic content"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **safe, warm, and prepared**.`,
    greenLight: [
      {
        title: "Prepared Home",
        items: [
          "Warm, insulated, cozy setup",
          "Emergency basics handled quietly",
          "Simple organization that reduces stress",
        ],
        reasoning: "Preparedness is emotional safety for you.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fragile, chaotic homes with constant problems"],
      reasoning: "Unreliability keeps you tense.",
    },
    validation: {
      resonates: ["You like things working reliably"],
      doesntResonate: ["You don’t care if things break"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals keep you **ready and steady**.`,
    greenLight: [
      {
        title: "Preparedness Rituals",
        items: [
          "Weekly reset: food, tasks, systems check",
          "Seasonal planning and decluttering",
        ],
        reasoning: "Small routines prevent big problems.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Routines that create chaos or ignore reality"],
      reasoning: "They break trust with yourself.",
    },
    validation: {
      resonates: ["You feel calmer when prepared"],
      doesntResonate: ["Routines feel suffocating to you"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **conditioning for resilience**.`,
    greenLight: [
      {
        title: "Resilience Movement",
        items: [
          "Strength + endurance balance",
          "Outdoor walking, hiking, carrying capacity",
        ],
        reasoning: "You train for durability, not aesthetics.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Risky, injury-prone intensity with no purpose"],
      reasoning: "Longevity matters to you.",
    },
    validation: {
      resonates: ["You like training that makes you capable"],
      doesntResonate: ["You train only for appearance"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness is **stability, warmth, and nervous-system calm**.`,
    greenLight: [
      {
        title: "Stability Wellness",
        items: [
          "Good sleep and recovery",
          "Warmth, routine, and steady nutrition",
        ],
        reasoning: "Your system thrives when stable.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Extreme swings and neglect"],
      reasoning: "Instability feels unsafe.",
    },
    validation: {
      resonates: ["You need stability to feel well"],
      doesntResonate: ["You like constant change"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy for **utility, durability, and preparedness**.`,
    greenLight: [
      {
        title: "Reliability Products",
        items: [
          "Warm layers, durable gear",
          "Tools that reduce risk and increase readiness",
        ],
        reasoning: "Your purchases are contingency planning.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Trendy disposable goods"],
      reasoning: "They fail when you need them.",
    },
    validation: {
      resonates: ["You choose durable things"],
      doesntResonate: ["You buy for trends"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **reset perspective and test capability**.`,
    greenLight: [
      {
        title: "Resilience Travel",
        items: [
          "Cold or nature-based travel",
          "Trips with practical planning and calm pace",
        ],
        reasoning: "You like travel that feels real and grounding.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Chaotic, unplanned travel with constant surprises"],
      reasoning: "Unnecessary risk isn’t fun to you.",
    },
    validation: {
      resonates: ["You like travel with preparation"],
      doesntResonate: ["You like unpredictable travel"],
    },
    affiliates: [],
  },
},
/* ==========================================
   WOHAKA – LINEAGE, LAND & WARRIOR STEWARDSHIP
   (Māori + Lakota)
========================================== */
Wohaka: {
  locations: {
    why: `**The Core Truth:**
Your code is rooted in **belonging to land and lineage**. You don’t see yourself as separate from place or people—you are part of a living continuity that must be protected.

**What this means:**
You thrive where land is respected, ancestry is acknowledged, and people act as guardians rather than consumers. Places that treat land as disposable feel deeply wrong to you.

**When you honor this:**
You feel grounded, purposeful, and internally strong—because you know what you stand for.`,
    greenLight: [
      {
        title: "Land-Rooted Environments",
        items: [
          "Regions with strong indigenous or ancestral presence",
          "Places where land is cared for, not exploited",
          "Communities tied to water, mountains, or plains",
        ],
        reasoning: "Wohaka thrives where **land is kin**, not resource.",
      },
      {
        title: "Ancestral Living Contexts",
        items: [
          "Homes connected to family history",
          "Places where elders and ancestry are respected",
        ],
        reasoning: "Lineage stabilizes your identity.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Extractive, rootless cities",
        "Cultures that dismiss ancestry or land care",
        "Places that prioritize profit over stewardship",
      ],
      reasoning: "You feel spiritually displaced and frustrated.",
    },
    validation: {
      resonates: [
        "You feel protective toward land or community",
        "Ancestry and roots matter to you",
      ],
      doesntResonate: [
        "You feel no attachment to place",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when your role feels like **service and protection**. Your effort is strongest when it safeguards people, land, or future generations.

**What this means:**
You thrive in work that carries responsibility beyond yourself. Purely self-serving or extractive work feels hollow.

**When you honor this:**
You become a guardian—respected for strength, loyalty, and integrity.`,
    greenLight: [
      {
        title: "Stewardship & Protection Roles",
        items: [
          "Community leadership",
          "Environmental or land management",
          "Security, protection, or advocacy roles",
          "Education tied to heritage or values",
        ],
        reasoning: "Your motivation is **guardianship**.",
      },
      {
        title: "Honor-Based Work Cultures",
        items: [
          "Clear responsibility and accountability",
          "Respect for elders and experience",
        ],
        reasoning: "Honor fuels your commitment.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Exploitative or purely profit-driven work",
        "Roles disconnected from real-world impact",
      ],
      reasoning: "They feel meaningless or corrupt.",
    },
    validation: {
      resonates: [
        "You want your work to protect something real",
        "Responsibility motivates you",
      ],
      doesntResonate: [
        "You only want personal gain",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You bond through **shared identity and mutual protection**. Community is a circle you defend, not a network you use.

**What this means:**
You value loyalty, accountability, and shared history. Weak boundaries or disloyalty feel like betrayal.

**When you honor this:**
You feel proud of who you belong to.`,
    greenLight: [
      {
        title: "Kinship-Based Communities",
        items: [
          "Family-centered groups",
          "Tribal or values-based communities",
          "Circles with shared responsibility",
        ],
        reasoning: "Wohaka bonds through **kinship and duty**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Rootless, transactional social scenes",
        "Groups that avoid accountability",
      ],
      reasoning: "They feel unsafe or shallow.",
    },
    validation: {
      resonates: [
        "You value loyalty above popularity",
        "You dislike people who abandon responsibility",
      ],
      doesntResonate: [
        "You prefer casual, low-commitment relationships",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that express **strength, honor, and connection to land**.`,
    greenLight: [
      {
        title: "Warrior–Steward Activities",
        items: [
          "Strength and endurance training",
          "Outdoor skills and land-based practices",
          "Activities that build protective capability",
        ],
        reasoning: "Strength exists to serve and protect.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Purely indulgent or detached activities"],
      reasoning: "They feel empty.",
    },
    validation: {
      resonates: ["You like strength with purpose"],
      doesntResonate: ["You prefer entertainment-only activities"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **lineage, story, and responsibility**.`,
    greenLight: [
      {
        title: "Lineage Learning",
        items: [
          "Learning from elders or mentors",
          "Oral history and lived wisdom",
        ],
        reasoning: "Knowledge is carried through people.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Contextless or purely abstract learning"],
      reasoning: "It lacks grounding.",
    },
    validation: {
      resonates: ["You respect elders as teachers"],
      doesntResonate: ["You reject tradition entirely"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media that honors **identity, struggle, and responsibility**.`,
    greenLight: [
      {
        title: "Lineage & Honor Media",
        items: [
          "Stories of ancestral struggle",
          "Narratives about land, identity, and protection",
        ],
        reasoning: "Stories teach responsibility.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Cynical or rootless content"],
      reasoning: "It erodes meaning.",
    },
    validation: {
      resonates: ["You like stories about belonging"],
      doesntResonate: ["You prefer ironic detachment"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **anchored and protective**.`,
    greenLight: [
      {
        title: "Anchored Living",
        items: [
          "Homes tied to land or family",
          "Spaces that feel safe and solid",
        ],
        reasoning: "Home is territory and refuge.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Temporary, rootless living setups"],
      reasoning: "They feel unstable.",
    },
    validation: {
      resonates: ["You want a place to defend and care for"],
      doesntResonate: ["You like never settling anywhere"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals maintain **honor, memory, and responsibility**.`,
    greenLight: [
      {
        title: "Lineage Rituals",
        items: [
          "Honoring ancestors",
          "Rituals tied to land or seasons",
        ],
        reasoning: "Memory strengthens identity.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Ritual-free, amnesiac living"],
      reasoning: "You feel unanchored.",
    },
    validation: {
      resonates: ["You value remembrance"],
      doesntResonate: ["You ignore history"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **warrior readiness**.`,
    greenLight: [
      {
        title: "Protective Movement",
        items: [
          "Strength, balance, and endurance",
          "Movement that builds confidence and stability",
        ],
        reasoning: "Your body is a guardian.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fragile or passive movement"],
      reasoning: "It feels unsafe.",
    },
    validation: {
      resonates: ["You like feeling capable"],
      doesntResonate: ["You avoid physical challenge"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **alignment with land, body, and duty**.`,
    greenLight: [
      {
        title: "Grounded Wellness",
        items: [
          "Nature exposure",
          "Physical strength and routine",
        ],
        reasoning: "Grounding sustains you.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Disconnection from body or land"],
      reasoning: "It weakens you.",
    },
    validation: {
      resonates: ["Nature restores you"],
      doesntResonate: ["You feel fine disconnected from land"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy products that support **durability and protection**.`,
    greenLight: [
      {
        title: "Protective Tools",
        items: [
          "Durable gear",
          "Tools tied to land or work",
        ],
        reasoning: "Your tools serve responsibility.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Disposable, meaningless products"],
      reasoning: "They feel wasteful.",
    },
    validation: {
      resonates: ["You value durable things"],
      doesntResonate: ["You buy purely for novelty"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **reconnect with land, ancestry, and responsibility**.`,
    greenLight: [
      {
        title: "Rooted Travel",
        items: [
          "Ancestral or culturally meaningful travel",
          "Journeys tied to land and learning",
        ],
        reasoning: "Travel should deepen belonging.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Rootless, party-driven travel"],
      reasoning: "It feels empty.",
    },
    validation: {
      resonates: ["You travel for meaning"],
      doesntResonate: ["You travel just for escape"],
    },
    affiliates: [],
  },
},
/* ==========================================
   KARAYNI – HARMONY, OFFERING & LIVED BALANCE
   (Balinese + Quechua)
========================================== */
Karayni: {
  locations: {
    why: `**The Core Truth:**
Your code is oriented around **balance between worlds**—self and community, work and ritual, earth and spirit. Life feels right when everything is in proportion.

**What this means:**
You thrive in environments where daily life includes beauty, ritual, and care for both people and land. Places that are purely transactional or aggressively individualistic feel spiritually dry.

**When you honor this:**
You feel calm, generous, and quietly joyful—because your life flows in balance.`,
    greenLight: [
      {
        title: "Harmony-Centered Environments",
        items: [
          "Cultures with daily rituals and offerings",
          "Places where community life is visible",
          "Regions that integrate nature into daily living",
        ],
        reasoning: "Karayni thrives where **life is continuously rebalanced**.",
      },
      {
        title: "Communal, Beautiful Living",
        items: [
          "Villages or neighborhoods with shared spaces",
          "Environments that value aesthetics and care",
        ],
        reasoning: "Beauty and harmony regulate your nervous system.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Purely profit-driven cities",
        "Places that dismiss ritual or care",
        "Cultures that glorify imbalance and burnout",
      ],
      reasoning: "You feel drained when harmony is ignored.",
    },
    validation: {
      resonates: [
        "You feel better when life feels balanced",
        "Beauty and care matter to you",
      ],
      doesntResonate: [
        "You thrive in hyper-competitive environments",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when your labor feels like **contribution, not extraction**. Work is an offering to community and continuity.

**What this means:**
You thrive in roles where value is shared and effort is acknowledged. Work that exploits people or land feels deeply wrong.

**When you honor this:**
You become steady, generous, and trusted.`,
    greenLight: [
      {
        title: "Contribution-Oriented Roles",
        items: [
          "Community-based enterprises",
          "Education, healing, or cultural work",
          "Sustainable agriculture or design",
          "Roles that integrate care and productivity",
        ],
        reasoning: "Your motivation comes from **shared benefit**.",
      },
      {
        title: "Balanced Work Cultures",
        items: [
          "Respect for rest and ceremony",
          "Integration of human rhythm into schedules",
        ],
        reasoning: "Balance sustains your energy.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Exploitative or burnout-driven cultures",
        "Work disconnected from real human impact",
      ],
      reasoning: "They feel spiritually misaligned.",
    },
    validation: {
      resonates: [
        "You care about how work affects people",
        "You dislike purely extractive systems",
      ],
      doesntResonate: [
        "You only care about efficiency",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You belong through **mutual care and shared rhythm**. Community is sustained by contribution, not dominance.

**What this means:**
You value groups that look after one another and maintain harmony. Excessive conflict or ego disrupts belonging.

**When you honor this:**
You feel held and purposeful.`,
    greenLight: [
      {
        title: "Care-Based Communities",
        items: [
          "Villages or tight-knit neighborhoods",
          "Groups with shared rituals or service",
        ],
        reasoning: "Karayni bonds through **reciprocity**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Competitive or status-driven groups",
        "Communities that ignore collective wellbeing",
      ],
      reasoning: "They fracture harmony.",
    },
    validation: {
      resonates: [
        "You enjoy contributing to group wellbeing",
        "Harmony matters more than winning",
      ],
      doesntResonate: [
        "You thrive on competition",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that cultivate **balance, beauty, and presence**.`,
    greenLight: [
      {
        title: "Harmonizing Activities",
        items: [
          "Gardening, farming, or land care",
          "Art, craft, and ceremonial creation",
          "Shared cooking or preparation",
        ],
        reasoning: "Creation restores balance.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Aggressive or purely competitive activities"],
      reasoning: "They disrupt harmony.",
    },
    validation: {
      resonates: ["You like creating beauty"],
      doesntResonate: ["You enjoy constant competition"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **practice, ritual, and community transmission**.`,
    greenLight: [
      {
        title: "Embodied & Communal Learning",
        items: [
          "Learning through doing with others",
          "Skill passed through participation",
        ],
        reasoning: "Knowledge lives in practice.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Abstract learning with no application"],
      reasoning: "It feels disconnected.",
    },
    validation: {
      resonates: ["You learn best through practice"],
      doesntResonate: ["You prefer theory only"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media to **feel connection and continuity**.`,
    greenLight: [
      {
        title: "Connection Media",
        items: [
          "Stories of community and land",
          "Narratives about balance and care",
        ],
        reasoning: "Media should nourish harmony.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Cynical or divisive content"],
      reasoning: "It disrupts balance.",
    },
    validation: {
      resonates: ["You enjoy gentle, meaningful stories"],
      doesntResonate: ["You like harsh or cynical content"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **alive, cared for, and balanced**.`,
    greenLight: [
      {
        title: "Living Harmony",
        items: [
          "Natural materials and greenery",
          "Spaces designed for gathering and ritual",
        ],
        reasoning: "Your space mirrors balance.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Sterile or neglectful homes"],
      reasoning: "They feel dead.",
    },
    validation: {
      resonates: ["You feel better in warm, lived-in spaces"],
      doesntResonate: ["You prefer sterile minimalism"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals maintain **balance and gratitude**.`,
    greenLight: [
      {
        title: "Balance Rituals",
        items: [
          "Daily gratitude or offering practices",
          "Seasonal rituals tied to land",
        ],
        reasoning: "Gratitude restores harmony.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Ritual-free, rushed living"],
      reasoning: "You feel unbalanced.",
    },
    validation: {
      resonates: ["Ritual keeps you grounded"],
      doesntResonate: ["You dislike ceremony"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **flow and integration**.`,
    greenLight: [
      {
        title: "Flow Movement",
        items: [
          "Yoga, dance, tai chi–like practices",
          "Movement that feels rhythmic and gentle",
        ],
        reasoning: "Flow maintains balance.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Harsh, force-based training"],
      reasoning: "It disrupts equilibrium.",
    },
    validation: {
      resonates: ["You like flowing movement"],
      doesntResonate: ["You enjoy aggressive training"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **balance, care, and rhythm**.`,
    greenLight: [
      {
        title: "Harmonious Wellness",
        items: [
          "Balanced nutrition and rest",
          "Practices that integrate body and emotion",
        ],
        reasoning: "Balance sustains health.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Burnout cycles"],
      reasoning: "They break harmony.",
    },
    validation: {
      resonates: ["You feel best when life is balanced"],
      doesntResonate: ["You like pushing extremes"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy products that support **daily harmony and care**.`,
    greenLight: [
      {
        title: "Care-Based Products",
        items: [
          "Handmade or locally made goods",
          "Items that support ritual or daily care",
        ],
        reasoning: "Your purchases support balance.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Disposable, careless products"],
      reasoning: "They feel disrespectful.",
    },
    validation: {
      resonates: ["You value craftsmanship"],
      doesntResonate: ["You buy without care"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **restore balance and connection**.`,
    greenLight: [
      {
        title: "Harmonizing Travel",
        items: [
          "Cultural immersion travel",
          "Slow travel with community contact",
        ],
        reasoning: "Travel should rebalance you.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fast, extractive tourism"],
      reasoning: "It feels draining.",
    },
    validation: {
      resonates: ["You travel to connect"],
      doesntResonate: ["You travel to consume"],
    },
    affiliates: [],
  },
},
/* ==========================================
   SKENARI – CONSENSUS, FORESIGHT & SEVEN-GENERATION DUTY
   (Haudenosaunee)
========================================== */
Skenari: {
  locations: {
    why: `**The Core Truth:**
Your code is oriented around **long-term consequence**. You naturally think beyond yourself—asking how actions ripple forward through time.

**What this means:**
You thrive in environments that value patience, dialogue, and stewardship. Short-term, extractive cultures feel reckless to you.

**When you honor this:**
You feel calm and morally clear—because your life aligns with continuity.`,
    greenLight: [
      {
        title: "Long-Term-Oriented Environments",
        items: [
          "Cultures that value sustainability",
          "Places with strong civic processes",
          "Communities that plan beyond immediate gain",
        ],
        reasoning: "Skenari thrives where **future impact matters**.",
      },
      {
        title: "Deliberate Living Contexts",
        items: [
          "Quiet, thoughtful towns",
          "Places that support discussion and reflection",
        ],
        reasoning: "Slowness supports wise decisions.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Short-term profit-driven cities",
        "Cultures that reward impulsive decisions",
      ],
      reasoning: "They feel dangerous to the future.",
    },
    validation: {
      resonates: [
        "You think about long-term consequences",
        "You feel uneasy about short-sighted choices",
      ],
      doesntResonate: [
        "You only care about immediate results",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when decisions are made **collectively and responsibly**. Power should be accountable and informed by many perspectives.

**What this means:**
You excel in governance, planning, mediation, and stewardship roles. Top-down, unilateral decision-making frustrates you.

**When you honor this:**
You become a stabilizing voice—trusted for wisdom and fairness.`,
    greenLight: [
      {
        title: "Consensus & Stewardship Roles",
        items: [
          "Governance and policy",
          "Urban or environmental planning",
          "Mediation, facilitation, diplomacy",
          "Community leadership",
        ],
        reasoning: "Your strength is **collective wisdom**.",
      },
      {
        title: "Deliberative Work Cultures",
        items: [
          "Shared decision-making",
          "Time given for reflection",
        ],
        reasoning: "Good decisions take time.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Authoritarian leadership",
        "Cultures that dismiss discussion as weakness",
      ],
      reasoning: "You’ll feel ethically compromised.",
    },
    validation: {
      resonates: [
        "You value listening before deciding",
        "You dislike rushed decisions",
      ],
      doesntResonate: [
        "You prefer unilateral control",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You belong through **shared responsibility and voice**. Everyone matters, and decisions should reflect that.

**What this means:**
You value inclusive communities with clear processes for dialogue. Exclusion or dominance erodes trust.

**When you honor this:**
You feel respected and grounded.`,
    greenLight: [
      {
        title: "Consensus-Based Communities",
        items: [
          "Groups that seek agreement, not dominance",
          "Communities with clear dialogue processes",
        ],
        reasoning: "Skenari bonds through **shared voice**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Hierarchical groups that silence voices",
      ],
      reasoning: "They feel unjust.",
    },
    validation: {
      resonates: [
        "You want everyone heard",
      ],
      doesntResonate: [
        "You’re comfortable silencing others",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that encourage **reflection and collective thinking**.`,
    greenLight: [
      {
        title: "Deliberative Activities",
        items: [
          "Group discussions or councils",
          "Community service or volunteering",
        ],
        reasoning: "Action follows thought.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Purely impulsive activities"],
      reasoning: "They ignore consequence.",
    },
    validation: {
      resonates: ["You enjoy thoughtful discussion"],
      doesntResonate: ["You act without reflection"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **story, dialogue, and generational wisdom**.`,
    greenLight: [
      {
        title: "Generational Learning",
        items: [
          "History and civic studies",
          "Learning through storytelling",
        ],
        reasoning: "Wisdom accumulates over time.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Learning detached from consequence"],
      reasoning: "Knowledge must serve continuity.",
    },
    validation: {
      resonates: ["You respect elders’ wisdom"],
      doesntResonate: ["You dismiss history"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media to **understand consequence and responsibility**.`,
    greenLight: [
      {
        title: "Responsibility Media",
        items: [
          "Long-form journalism",
          "Historical and civic documentaries",
        ],
        reasoning: "Context matters.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Clickbait or outrage media"],
      reasoning: "It distorts judgment.",
    },
    validation: {
      resonates: ["You like deep analysis"],
      doesntResonate: ["You prefer hot takes"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **stable, thoughtful, and intentional**.`,
    greenLight: [
      {
        title: "Intentional Living",
        items: [
          "Spaces designed for gathering and discussion",
          "Homes that feel durable and calm",
        ],
        reasoning: "Stability supports foresight.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Chaotic or disposable living setups"],
      reasoning: "They feel short-sighted.",
    },
    validation: {
      resonates: ["You like durable, intentional spaces"],
      doesntResonate: ["You live only for convenience"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals maintain **memory and accountability**.`,
    greenLight: [
      {
        title: "Continuity Rituals",
        items: [
          "Seasonal reflection",
          "Ritual review of decisions and impact",
        ],
        reasoning: "Reflection preserves wisdom.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Living without reflection"],
      reasoning: "You feel unmoored.",
    },
    validation: {
      resonates: ["Reflection matters to you"],
      doesntResonate: ["You avoid looking back"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **grounding and steady**.`,
    greenLight: [
      {
        title: "Grounded Movement",
        items: [
          "Walking, steady strength work",
          "Movement that supports longevity",
        ],
        reasoning: "Consistency matters more than intensity.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Reckless, injury-prone training"],
      reasoning: "Longevity matters.",
    },
    validation: {
      resonates: ["You train for long life"],
      doesntResonate: ["You chase extremes"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **balance and long-term care**.`,
    greenLight: [
      {
        title: "Sustainable Wellness",
        items: [
          "Preventive care",
          "Moderation and consistency",
        ],
        reasoning: "Health is cumulative.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Short-term fixes"],
      reasoning: "They ignore future cost.",
    },
    validation: {
      resonates: ["You think long-term about health"],
      doesntResonate: ["You rely on quick fixes"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy with **future impact in mind**.`,
    greenLight: [
      {
        title: "Responsible Products",
        items: [
          "Durable, repairable goods",
          "Ethically sourced items",
        ],
        reasoning: "Purchases are votes for the future.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Disposable, harmful products"],
      reasoning: "They burden future generations.",
    },
    validation: {
      resonates: ["You care about product impact"],
      doesntResonate: ["You buy without considering consequences"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **learn from history and governance**.`,
    greenLight: [
      {
        title: "Learning Travel",
        items: [
          "Cultural, historical destinations",
          "Travel that deepens civic understanding",
        ],
        reasoning: "Travel should inform responsibility.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Pure entertainment travel"],
      reasoning: "It feels shallow.",
    },
    validation: {
      resonates: ["You travel to learn"],
      doesntResonate: ["You travel just for fun"],
    },
    affiliates: [],
  },
},
/* ==========================================
   KINMORA – TIME, PATTERN & CYCLICAL MASTERY
   (Maya)
========================================== */
Kinmora: {
  locations: {
    why: `**The Core Truth:**
Your code is attuned to **patterns across time**. You instinctively sense cycles, timing, and cause–effect relationships. Life feels right when actions align with the right moment.

**What this means:**
You thrive in environments that respect rhythm, seasonality, and long arcs of change. Chaotic, short-term-focused places feel disorienting.

**When you honor this:**
You feel precise, calm, and insightful—because you’re moving with time, not fighting it.`,
    greenLight: [
      {
        title: "Time-Aware Environments",
        items: [
          "Cultures with calendars, rituals, or seasonal structure",
          "Places connected to astronomy, land cycles, or agriculture",
          "Environments that reward patience and foresight",
        ],
        reasoning: "Kinmora thrives where **timing matters**.",
      },
      {
        title: "Patterned Living Spaces",
        items: [
          "Homes with routine and rhythm",
          "Spaces aligned with natural light and cycles",
        ],
        reasoning: "Rhythm stabilizes your perception.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Always-on, time-blind cultures",
        "Places obsessed with immediacy and speed",
      ],
      reasoning: "They disrupt your sense of timing.",
    },
    validation: {
      resonates: [
        "You’re sensitive to timing",
        "You notice repeating patterns in life",
      ],
      doesntResonate: [
        "You act without regard for timing",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when you can **plan, anticipate, and align actions with cycles**. Your intelligence shines when you’re allowed to think ahead.

**What this means:**
You excel in strategy, analysis, forecasting, and systems design. Reactive or purely short-term work drains you.

**When you honor this:**
You become a quiet strategist—often seeing outcomes before others do.`,
    greenLight: [
      {
        title: "Pattern & Strategy Roles",
        items: [
          "Strategy, planning, forecasting",
          "Data analysis and systems design",
          "Research, architecture, or long-range planning",
        ],
        reasoning: "Your strength is **seeing cycles before they peak**.",
      },
      {
        title: "Long-Horizon Work Cultures",
        items: [
          "Respect for planning time",
          "Tolerance for delayed results",
        ],
        reasoning: "Good timing beats fast action.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Firefighting-only cultures",
        "Work that ignores long-term consequences",
      ],
      reasoning: "You feel underused and rushed.",
    },
    validation: {
      resonates: [
        "You like planning ahead",
        "You think in systems and cycles",
      ],
      doesntResonate: [
        "You prefer pure improvisation",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You bond through **shared rhythm and continuity**. You value groups that endure over time.

**What this means:**
You prefer communities with traditions, calendars, and shared milestones. Highly fluid groups feel unstable.

**When you honor this:**
You feel anchored and socially coherent.`,
    greenLight: [
      {
        title: "Continuity-Based Communities",
        items: [
          "Groups with long-standing traditions",
          "Communities that celebrate cycles and anniversaries",
        ],
        reasoning: "Kinmora bonds through **shared time**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Ephemeral or constantly shifting groups",
      ],
      reasoning: "They lack continuity.",
    },
    validation: {
      resonates: [
        "You value tradition and rhythm",
      ],
      doesntResonate: [
        "You prefer constant social novelty",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that reinforce **timing, patience, and pattern awareness**.`,
    greenLight: [
      {
        title: "Cyclical Activities",
        items: [
          "Gardening or seasonal projects",
          "Skill-building over long periods",
        ],
        reasoning: "Mastery unfolds over time.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Instant-gratification activities"],
      reasoning: "They feel shallow.",
    },
    validation: {
      resonates: ["You enjoy long-term projects"],
      doesntResonate: ["You prefer quick wins"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **patterns, repetition, and historical context**.`,
    greenLight: [
      {
        title: "Pattern Learning",
        items: [
          "History, astronomy, systems thinking",
          "Learning that reveals cycles and structures",
        ],
        reasoning: "Understanding patterns creates foresight.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fragmented learning without context"],
      reasoning: "It obscures the bigger picture.",
    },
    validation: {
      resonates: ["You learn by seeing connections"],
      doesntResonate: ["You prefer isolated facts"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media to **understand long arcs and hidden order**.`,
    greenLight: [
      {
        title: "Pattern Media",
        items: [
          "Historical documentaries",
          "Content on cycles, systems, or time",
        ],
        reasoning: "You want depth over immediacy.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fast, reactive news cycles"],
      reasoning: "They distort perspective.",
    },
    validation: {
      resonates: ["You prefer long-form media"],
      doesntResonate: ["You like rapid-fire updates"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **rhythmic and intentional**.`,
    greenLight: [
      {
        title: "Cyclical Living",
        items: [
          "Consistent routines",
          "Spaces aligned with light and season",
        ],
        reasoning: "Environment reinforces timing.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Chaotic, time-blind living"],
      reasoning: "It disrupts rhythm.",
    },
    validation: {
      resonates: ["Routine grounds you"],
      doesntResonate: ["You dislike any routine"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals keep you **aligned with cycles and intention**.`,
    greenLight: [
      {
        title: "Time Rituals",
        items: [
          "Daily and seasonal check-ins",
          "Ritual reflection on timing and progress",
        ],
        reasoning: "Ritual tracks movement through time.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Living without markers of time"],
      reasoning: "You lose orientation.",
    },
    validation: {
      resonates: ["You like marking time"],
      doesntResonate: ["You ignore cycles"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **measured and sustainable**.`,
    greenLight: [
      {
        title: "Rhythmic Movement",
        items: [
          "Endurance-based training",
          "Movement tied to breath and pacing",
        ],
        reasoning: "Consistency beats intensity.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Erratic or extreme training"],
      reasoning: "It breaks rhythm.",
    },
    validation: {
      resonates: ["You train steadily"],
      doesntResonate: ["You train impulsively"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **alignment with bodily cycles**.`,
    greenLight: [
      {
        title: "Cyclical Wellness",
        items: [
          "Regular sleep and eating rhythms",
          "Respect for recovery phases",
        ],
        reasoning: "Health is cyclical.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Ignoring bodily rhythms"],
      reasoning: "It creates imbalance.",
    },
    validation: {
      resonates: ["You feel best with regular rhythms"],
      doesntResonate: ["You ignore your body clock"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy products that support **longevity and timing**.`,
    greenLight: [
      {
        title: "Long-Life Products",
        items: [
          "Durable, timeless tools",
          "Items that improve with use",
        ],
        reasoning: "Value accumulates over time.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Disposable or trend-driven products"],
      reasoning: "They lack continuity.",
    },
    validation: {
      resonates: ["You value longevity"],
      doesntResonate: ["You chase trends"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **observe cycles and ancient intelligence**.`,
    greenLight: [
      {
        title: "Temporal Travel",
        items: [
          "Ancient sites and ruins",
          "Journeys aligned with seasons or celestial events",
        ],
        reasoning: "Travel should deepen temporal awareness.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Random, rushed travel"],
      reasoning: "It lacks timing.",
    },
    validation: {
      resonates: ["You like meaningful timing in travel"],
      doesntResonate: ["You travel impulsively"],
    },
    affiliates: [],
  },
},
/* ==========================================
   TJUKARI – SONGLINES, LAND MEMORY & STORY-NAVIGATION
   (Aboriginal Australian)
========================================== */
Tjukari: {
  locations: {
    why: `**The Core Truth:**
Your code is built on **place-memory**. You don’t relate to land as scenery—you relate to it as *story*, law, and living map. You orient through patterns, subtle cues, and meaning carried in place.

**What this means:**
You thrive in environments where nature is close and respected, and where life isn’t severed from land. Purely artificial, rootless places can make you feel dislocated.

**When you honor this:**
You feel grounded, intuitive, and quietly guided—because the world starts speaking again.`,
    greenLight: [
      {
        title: "Land-Speaking Environments",
        items: [
          "Nature-rich regions with minimal visual noise",
          "Places where people know the land’s rhythms",
          "Environments with strong local identity and story",
        ],
        reasoning: "Tjukari thrives where **place still has voice**.",
      },
      {
        title: "Low-Artifice Living",
        items: [
          "Homes with natural materials and airflow",
          "Daily life that includes outside time",
        ],
        reasoning: "Your nervous system regulates through land contact.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "Rootless cities with no relationship to place",
        "Highly artificial indoor-only lifestyles",
        "Cultures that treat land as disposable",
      ],
      reasoning: "Disconnection from place becomes disconnection from self.",
    },
    validation: {
      resonates: [
        "Place affects your mood strongly",
        "You feel better when you spend time on land",
        "You notice subtle environmental cues",
      ],
      doesntResonate: [
        "Place doesn’t matter to you",
        "You feel fine living fully indoors",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when you can **read context and patterns**—and when your work respects human and ecological reality.

**What this means:**
You excel in roles involving observation, mapping, cultural insight, ecology, user understanding, and systems that depend on context. Work that ignores context feels reckless.

**When you honor this:**
You become an exceptional guide—seeing what others miss.`,
    greenLight: [
      {
        title: "Context & Mapping Roles",
        items: [
          "User research, ethnography, field research",
          "Ecology, sustainability, land-related work",
          "Strategy roles that require contextual intelligence",
          "Design that reflects real human behavior",
        ],
        reasoning: "Your strength is **situational wisdom**.",
      },
      {
        title: "Reality-Respecting Work Cultures",
        items: [
          "Teams that observe before deciding",
          "Work that values listening and iteration",
        ],
        reasoning: "Listening prevents harm and improves outcomes.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Abstract work detached from real conditions",
        "Cultures that ‘decide first’ then ignore evidence",
      ],
      reasoning: "You’ll feel ethically and cognitively misaligned.",
    },
    validation: {
      resonates: [
        "You need to understand context before acting",
        "You see patterns others overlook",
      ],
      doesntResonate: [
        "You prefer acting fast without context",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You bond through **shared place, shared story, and shared care**. Belonging comes from continuity, not constant contact.

**What this means:**
You prefer communities with rooted identity, respect for elders, and real presence. Performative social scenes feel empty.

**When you honor this:**
You feel held by continuity—without needing intensity.`,
    greenLight: [
      {
        title: "Rooted Communities",
        items: [
          "Small circles with shared history or values",
          "Communities that honor elders and memory",
          "Groups tied to place through care and presence",
        ],
        reasoning: "Tjukari bonds through **continuity and place**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Rootless, transactional social networks",
        "Communities that dismiss history and elders",
      ],
      reasoning: "They feel ungrounded and unreliable.",
    },
    validation: {
      resonates: [
        "You value elders and lived wisdom",
        "You prefer depth over constant social activity",
      ],
      doesntResonate: [
        "You enjoy highly performative social scenes",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that cultivate **listening, land contact, and story-awareness**.`,
    greenLight: [
      {
        title: "Land-Based Activities",
        items: [
          "Walking, hiking, exploring quietly",
          "Nature observation and tracking",
          "Photography or journaling as witnessing",
        ],
        reasoning: "You recharge through contact with land and attention.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["High-noise, high-stimulation activities"],
      reasoning: "They drown out your signal.",
    },
    validation: {
      resonates: ["Quiet nature time restores you"],
      doesntResonate: ["You prefer constant stimulation"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **story, place, and repetition**.`,
    greenLight: [
      {
        title: "Place-Based Learning",
        items: [
          "Learning through lived experience",
          "Mentorship and narrative learning",
        ],
        reasoning: "Knowledge sticks when it’s carried in story.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fragmented learning with no context"],
      reasoning: "It doesn’t integrate.",
    },
    validation: {
      resonates: ["You remember stories better than facts"],
      doesntResonate: ["You prefer purely technical learning"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media to **connect with meaning and place**.`,
    greenLight: [
      {
        title: "Meaningful Media",
        items: [
          "Nature and culture documentaries",
          "Long-form storytelling",
        ],
        reasoning: "You prefer media that deepens perception.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Outrage loops and noise-heavy content"],
      reasoning: "It overwhelms your inner listening.",
    },
    validation: {
      resonates: ["You prefer slow, meaningful content"],
      doesntResonate: ["You like fast, noisy content"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **breathable, grounded, and connected to outside**.`,
    greenLight: [
      {
        title: "Breathable Living",
        items: [
          "Natural light, airflow, plants",
          "Spaces that allow quiet and reflection",
        ],
        reasoning: "Your home should keep your senses open.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Sealed, artificial interiors with constant noise"],
      reasoning: "They numb perception.",
    },
    validation: {
      resonates: ["You feel better when your home breathes"],
      doesntResonate: ["You prefer sealed environments"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals keep you **in relationship with land and memory**.`,
    greenLight: [
      {
        title: "Memory Rituals",
        items: [
          "Regular walks in the same places",
          "Quiet gratitude for land and life",
          "Seasonal check-ins with nature",
        ],
        reasoning: "Repetition deepens relationship.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Ritual-free living"],
      reasoning: "You lose orientation.",
    },
    validation: {
      resonates: ["You like returning to the same places"],
      doesntResonate: ["You dislike repetition"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **navigation and listening**.`,
    greenLight: [
      {
        title: "Listening Movement",
        items: [
          "Walking, hiking, natural movement",
          "Movement that keeps awareness open",
        ],
        reasoning: "Movement helps you listen to the world.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Chaotic, overstimulating training"],
      reasoning: "It disrupts your awareness.",
    },
    validation: {
      resonates: ["You move to clear your mind"],
      doesntResonate: ["You move for adrenaline"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **grounding, sleep, and nervous-system regulation through nature**.`,
    greenLight: [
      {
        title: "Grounded Wellness",
        items: [
          "Consistent sleep",
          "Nature exposure as regulation",
          "Simple routines that reduce noise",
        ],
        reasoning: "Nature stabilizes your system.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Overstimulation and irregular rhythms"],
      reasoning: "They disconnect you from your baseline.",
    },
    validation: {
      resonates: ["Nature improves your wellbeing"],
      doesntResonate: ["Nature doesn’t affect you"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy products that support **simplicity, durability, and land-connection**.`,
    greenLight: [
      {
        title: "Grounding Products",
        items: [
          "Simple, durable items",
          "Tools for outdoor time and observation",
        ],
        reasoning: "Your tools should support presence.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Disposable, noisy, overly complex products"],
      reasoning: "They add clutter to attention.",
    },
    validation: {
      resonates: ["You value simple, durable tools"],
      doesntResonate: ["You like complex gadgets"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **learn landscapes and deepen relationship with place**.`,
    greenLight: [
      {
        title: "Landscape Travel",
        items: [
          "Slow travel in nature-rich regions",
          "Journeys that prioritize observation over consumption",
        ],
        reasoning: "Travel should deepen your map of the world.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Checklist tourism"],
      reasoning: "It feels disconnected.",
    },
    validation: {
      resonates: ["You prefer slow, place-based travel"],
      doesntResonate: ["You like rushing through many places"],
    },
    affiliates: [],
  },
},
/* ==========================================
   RENARA – QUIET POWER, HARMONY & INNER STILLNESS
   (Javanese)
========================================== */
Renara: {
  locations: {
    why: `**The Core Truth:**
Your code is built on **inner composure and subtle influence**. Power is not loud—it is calm, contained, and felt without being announced.

**What this means:**
You thrive in environments that value harmony, politeness, and emotional regulation. Chaotic, aggressive, or overly expressive places exhaust you.

**When you honor this:**
You feel centered, dignified, and quietly authoritative—because nothing pulls you off balance.`,
    greenLight: [
      {
        title: "Harmonious, Low-Noise Environments",
        items: [
          "Cultures that value politeness and restraint",
          "Places with aesthetic order and calm pacing",
          "Environments where conflict is handled subtly",
        ],
        reasoning: "Renara thrives where **calm equals strength**.",
      },
      {
        title: "Elegant Living Contexts",
        items: [
          "Homes designed for tranquility",
          "Spaces that feel intentional and uncluttered",
        ],
        reasoning: "Outer calm supports inner composure.",
      },
    ],
    redLight: {
      title: "Avoid These Environments",
      items: [
        "High-conflict or confrontational cultures",
        "Noisy, chaotic, emotionally volatile spaces",
      ],
      reasoning: "They destabilize your inner balance.",
    },
    validation: {
      resonates: [
        "You dislike unnecessary confrontation",
        "You value calm and grace",
      ],
      doesntResonate: [
        "You enjoy loud or aggressive environments",
      ],
    },
    affiliates: [],
  },

  work: {
    why: `**The Core Truth:**
You work best when influence is exercised **indirectly and skillfully**. You don’t dominate—you guide.

**What this means:**
You excel in roles requiring diplomacy, coordination, and emotional intelligence. Environments that reward force over finesse frustrate you.

**When you honor this:**
You become quietly indispensable—respected for steadiness and wisdom.`,
    greenLight: [
      {
        title: "Diplomatic & Harmonizing Roles",
        items: [
          "Coordination, operations, or facilitation",
          "Advisory or behind-the-scenes leadership",
          "Cultural, HR, or people-centered roles",
        ],
        reasoning: "Your strength is **soft power**.",
      },
      {
        title: "Respectful Work Cultures",
        items: [
          "Low-ego environments",
          "Clear roles with mutual respect",
        ],
        reasoning: "Harmony allows you to lead subtly.",
      },
    ],
    redLight: {
      title: "Avoid These Work Environments",
      items: [
        "Aggressive, confrontational workplaces",
        "Cultures that reward dominance and noise",
      ],
      reasoning: "You’ll withdraw or disengage.",
    },
    validation: {
      resonates: [
        "You influence without forcing",
        "You prefer calm leadership",
      ],
      doesntResonate: [
        "You like aggressive competition",
      ],
    },
    affiliates: [],
  },

  community: {
    why: `**The Core Truth:**
You belong through **mutual respect and emotional containment**. Harmony matters more than self-expression.

**What this means:**
You prefer communities that maintain social grace and avoid public conflict. Emotional excess feels destabilizing.

**When you honor this:**
You feel safe, respected, and socially fluent.`,
    greenLight: [
      {
        title: "Grace-Based Communities",
        items: [
          "Polite, emotionally regulated groups",
          "Communities with unspoken but respected norms",
        ],
        reasoning: "Renara bonds through **mutual restraint**.",
      },
    ],
    redLight: {
      title: "Avoid These Community Patterns",
      items: [
        "Drama-driven or emotionally explosive groups",
      ],
      reasoning: "They disrupt harmony.",
    },
    validation: {
      resonates: [
        "You value emotional self-control",
      ],
      doesntResonate: [
        "You enjoy public emotional expression",
      ],
    },
    affiliates: [],
  },

  activities: {
    why: `You choose activities that cultivate **stillness, grace, and refinement**.`,
    greenLight: [
      {
        title: "Refining Activities",
        items: [
          "Meditation or contemplative practices",
          "Art, music, or craft with precision",
          "Slow, intentional routines",
        ],
        reasoning: "Refinement strengthens inner calm.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["High-adrenaline, chaotic activities"],
      reasoning: "They disturb balance.",
    },
    validation: {
      resonates: ["You like calm, focused activities"],
      doesntResonate: ["You seek constant stimulation"],
    },
    affiliates: [],
  },

  learning: {
    why: `You learn through **absorption, observation, and patience**.`,
    greenLight: [
      {
        title: "Quiet Learning",
        items: [
          "Learning by observing masters",
          "Slow, layered understanding",
        ],
        reasoning: "Depth comes from patience.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Fast, loud, surface-level learning"],
      reasoning: "It lacks depth.",
    },
    validation: {
      resonates: ["You learn best slowly"],
      doesntResonate: ["You want instant mastery"],
    },
    affiliates: [],
  },

  media: {
    why: `You consume media to **restore calm and perspective**.`,
    greenLight: [
      {
        title: "Quiet Media",
        items: [
          "Subtle, atmospheric films or music",
          "Content focused on nuance and mood",
        ],
        reasoning: "Subtlety feeds you.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Sensational or confrontational media"],
      reasoning: "It agitates you.",
    },
    validation: {
      resonates: ["You like subtle storytelling"],
      doesntResonate: ["You enjoy shock value"],
    },
    affiliates: [],
  },

  living: {
    why: `Your home should feel **serene, ordered, and refined**.`,
    greenLight: [
      {
        title: "Serene Living",
        items: [
          "Minimal but warm design",
          "Intentional placement of objects",
        ],
        reasoning: "Order reinforces composure.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Cluttered or noisy spaces"],
      reasoning: "They disturb inner stillness.",
    },
    validation: {
      resonates: ["Your space affects your mood strongly"],
      doesntResonate: ["You don’t care about atmosphere"],
    },
    affiliates: [],
  },

  rituals: {
    why: `Rituals help you **maintain inner equilibrium**.`,
    greenLight: [
      {
        title: "Stillness Rituals",
        items: [
          "Daily quiet reflection",
          "Slow, intentional morning routines",
        ],
        reasoning: "Stillness preserves power.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Rushed, chaotic routines"],
      reasoning: "They erode composure.",
    },
    validation: {
      resonates: ["You like quiet rituals"],
      doesntResonate: ["You rush through your day"],
    },
    affiliates: [],
  },

  movement: {
    why: `Movement is **grace and control**.`,
    greenLight: [
      {
        title: "Graceful Movement",
        items: [
          "Slow, controlled practices",
          "Movement emphasizing balance and posture",
        ],
        reasoning: "Grace reflects inner order.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Explosive or chaotic training"],
      reasoning: "It breaks flow.",
    },
    validation: {
      resonates: ["You like controlled movement"],
      doesntResonate: ["You prefer explosive intensity"],
    },
    affiliates: [],
  },

  wellness: {
    why: `Your wellness comes from **calm regulation and balance**.`,
    greenLight: [
      {
        title: "Calm Wellness",
        items: [
          "Regular sleep and gentle routines",
          "Practices that soothe the nervous system",
        ],
        reasoning: "Calm sustains health.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Overstimulation and stress cycles"],
      reasoning: "They erode wellbeing.",
    },
    validation: {
      resonates: ["Calm improves your health"],
      doesntResonate: ["You thrive under constant stress"],
    },
    affiliates: [],
  },

  products: {
    why: `You buy products that reflect **elegance, subtlety, and quality**.`,
    greenLight: [
      {
        title: "Refined Products",
        items: [
          "Well-crafted, understated items",
          "Products that age gracefully",
        ],
        reasoning: "Quality speaks quietly.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Flashy, loud, low-quality products"],
      reasoning: "They feel vulgar.",
    },
    validation: {
      resonates: ["You prefer understated quality"],
      doesntResonate: ["You like flashy products"],
    },
    affiliates: [],
  },

  travel: {
    why: `You travel to **restore inner balance and observe harmony**.`,
    greenLight: [
      {
        title: "Serene Travel",
        items: [
          "Slow, culturally respectful travel",
          "Destinations known for calm and beauty",
        ],
        reasoning: "Travel should soften you, not overstimulate you.",
      },
    ],
    redLight: {
      title: "Avoid",
      items: ["Chaotic, party-driven travel"],
      reasoning: "It disrupts equilibrium.",
    },
    validation: {
      resonates: ["You travel to find calm"],
      doesntResonate: ["You travel for chaos"],
    },
    affiliates: [],
  },
},

}                 // closes RECOMMENDATIONS
