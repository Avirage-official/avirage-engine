/**
 * CULTURAL HERITAGE DATA
 * Deep historical context for each Cultural Code
 */

export interface HeritageChapter {
  id: string
  title: string
  subtitle: string
  era?: string
  content: {
    intro: string
    sections: {
      heading: string
      paragraphs: string[]
      highlights?: string[]
      quote?: {
        text: string
        attribution: string
      }
    }[]
  }
}

export interface HeritageData {
  codeName: string
  cultureType: 'single' | 'fusion'
  level1: string
  level2?: string // For fusion codes
  mapImage?: string // Optional heritage map/illustration
  chapters: HeritageChapter[]
}

export const HERITAGE_DATA: Record<string, HeritageData> = {
  /* ==========================================
     JAEJIN - KOREAN HERITAGE
  ========================================== */
  jaejin: {
    codeName: 'Jaejin',
    cultureType: 'single',
    level1: 'Korean',
    chapters: [
      {
        id: 'foundations',
        title: 'Ancient Foundations',
        subtitle: 'The roots of collective resilience',
        era: '57 BCE - 935 CE',
        content: {
          intro: 'Korean culture emerged on a mountainous peninsula caught between three empires—China, Japan, and the northern nomadic tribes. Geography shaped destiny: survival required unity, speed, and unwavering collective resolve.',
          sections: [
            {
              heading: 'The Three Kingdoms & Unity',
              paragraphs: [
                'From 57 BCE to 668 CE, three kingdoms—Goguryeo, Baekje, and Silla—competed fiercely for dominance on the Korean peninsula. This wasn't mere political rivalry; it was an existential crucible that forged the Korean psyche. Victory required total mobilization: every farmer could be called to war, every artisan redirected to defense.',
                'The eventual unification under Silla (668 CE) didn't erase this competitive intensity—it internalized it. Koreans learned that survival demanded not just individual excellence, but synchronized collective effort. The concept of 우리 (uri, "we/us") became more fundamental than "I." Your fate was inseparable from your community's fate.',
                'This period established a pattern: when pressure mounted, Koreans didn't fragment—they compressed into a unified force. Speed of response became cultural doctrine. Hesitation meant conquest.',
              ],
              highlights: [
                'Geography as pressure: peninsula position meant constant threat from all sides',
                'Unity through crisis: survival required collective mobilization',
                'Speed as virtue: slow response = annihilation',
              ],
            },
            {
              heading: 'Confucian & Buddhist Synthesis',
              paragraphs: [
                'Buddhism arrived in the 4th century, but it was Confucianism—adopted from China—that became Korea's structural DNA. Unlike Chinese Confucianism, which emphasized scholarly contemplation, Korean Confucianism took on a militant urgency. The Five Relationships weren't philosophical concepts; they were operational hierarchies with immediate consequences.',
                'Korean Confucianism demanded 효 (hyo, filial piety) not as sentiment but as unbreakable duty. Children didn't just respect parents—they subordinated their entire life trajectory to family expectations. This created a culture where individual desires were secondary to collective advancement. The family unit became a performance team, not a support network.',
                'Buddhism provided spiritual depth, but even Korean Buddhism took on a disciplined, rigorous character. Meditation wasn't escape from the world—it was training for sharper engagement with it. The synthesis created a culture of intense focus: spiritual practice sharpened worldly performance.',
              ],
              quote: {
                text: '하늘이 무너져도 솟아날 구멍이 있다',
                attribution: 'Korean proverb: "Even if the sky falls, there is a hole through which you can rise"',
              },
            },
            {
              heading: 'Geographic Determinism',
              paragraphs: [
                'Korea's mountainous terrain (70% of the peninsula) meant limited arable land and constant resource scarcity. There was no room for inefficiency. Every harvest had to succeed. Every construction project had to be completed before winter. Procrastination wasn't a personal failing—it was a threat to communal survival.',
                'The peninsula's position—jutting into the sea between China and Japan—made Korea a perpetual battleground for regional powers. Invasions came in waves: Mongols, Manchus, Japanese. Each conquest reinforced the lesson: speed and unity were the only defenses against overwhelming force.',
                'This geography created a culture that treats urgency as baseline. The Korean concept of 빨리빨리 (ppalli ppalli, "hurry hurry") isn't modern impatience—it's ancient survival instinct calcified into daily practice.',
              ],
            },
          ],
        },
      },
      {
        id: 'crucible',
        title: 'Historical Crucible',
        subtitle: 'Forged in fire and pressure',
        era: '1231 - 1910 CE',
        content: {
          intro: 'If the ancient period planted the seeds of Korean intensity, the medieval and early modern eras refined it through relentless pressure. Multiple invasions, colonial occupation, and forced isolation didn't break Korean culture—they compressed it into diamond.',
          sections: [
            {
              heading: 'Mongol Invasions & Defiance',
              paragraphs: [
                'From 1231 to 1259, Mongol forces—who had conquered everything from China to Eastern Europe—crashed against Korea repeatedly. The Goryeo dynasty refused to submit. Korean forces retreated to Ganghwa Island and resisted for nearly three decades. This wasn't strategic brilliance; it was civilizational stubbornness.',
                'When the Mongols finally achieved nominal control, they didn't break Korean identity—they hardened it. The Korean language, culture, and social structures remained intact. The lesson was clear: you can occupy Korean land, but you cannot occupy Korean will.',
                'This period established a cultural archetype: even when overwhelmed, Koreans don't surrender identity. They endure, adapt, and wait for the moment to re-emerge. This defensive intensity would become a defining trait—what Koreans call 한 (han), a complex emotion mixing grief, resilience, and righteous anger.',
              ],
            },
            {
              heading: 'The Hermit Kingdom Era',
              paragraphs: [
                'After centuries of invasions, the Joseon Dynasty (1392-1897) adopted a policy of deliberate isolation, earning Korea the nickname "Hermit Kingdom." But this wasn't withdrawal—it was strategic compression. Cut off from external influences, Korean culture intensified inward.',
                'During this period, Korean Confucianism became even more rigorous than its Chinese source. The civil service examination system (과거, gwageo) became brutally competitive. Families would sacrifice everything to educate one son for the exam. Success meant elevation for the entire clan; failure meant generational shame.',
                'This era perfected the Korean pattern of total commitment. There was no "good enough." You studied until you passed, or you died trying. This binary thinking—all-in or nothing—became embedded in Korean consciousness.',
              ],
              highlights: [
                'Isolation intensified culture rather than weakening it',
                'Civil exams created hyper-competitive educational culture',
                'Binary thinking: total success or total failure, no middle ground',
              ],
              quote: {
                text: '공부가 제일 쉬웠어요',
                attribution: 'Modern Korean phrase (ironic): "Studying was the easiest part" — reflecting the intensity of academic pressure',
              },
            },
            {
              heading: 'Japanese Occupation',
              paragraphs: [
                'From 1910 to 1945, Korea endured brutal Japanese colonial rule. The Japanese attempted to erase Korean identity: banned the Korean language in schools, forced adoption of Japanese names, conscripted labor and "comfort women" for the war effort.',
                'This period should have crushed Korean culture. Instead, it created a pressure-cooker effect. Koreans preserved their language in secret schools. They maintained cultural practices in hidden spaces. When liberation came in 1945, Korean identity didn't have to be rebuilt—it exploded outward with accumulated force.',
                'The trauma of occupation created what psychologists call "compressed modernization"—a culture that refuses to be slow because slowness once meant extinction. Japanese occupation taught Koreans that cultural survival required militant preservation and rapid adaptation simultaneously.',
              ],
            },
          ],
        },
      },
      {
        id: 'cultural-dna',
        title: 'Cultural DNA',
        subtitle: 'The codes that shape behavior',
        era: 'Timeless Patterns',
        content: {
          intro: 'Beneath the historical events lies a set of cultural operating systems—ways of being that transcend any single era. These are the invisible codes that make Korean culture recognizable across centuries.',
          sections: [
            {
              heading: '빨리빨리 (Ppalli Ppalli) - The Velocity Imperative',
              paragraphs: [
                'Walk through any Korean city and you'll hear it constantly: "ppalli ppalli" (hurry up, quickly quickly). This isn't just linguistic habit—it's cultural metabolism. Koreans experience time differently. A "quick lunch" is 10 minutes. "Soon" means within the hour. "Later" means tomorrow at the latest.',
                'This velocity isn't stress—it's baseline. Korean toddlers are taught to eat quickly so the family can move on to the next activity. Students learn to speed-read because there's too much material to cover slowly. Workers stay late not out of obligation but because leaving tasks unfinished feels physically uncomfortable.',
                'Western cultures often pathologize this as "workaholic" or "unhealthy." But for Koreans, speed is virtue. Slowness isn't relaxation—it's disrespect to everyone waiting on you. The question isn't "Why so fast?" but "Why would you be slow?"',
              ],
              highlights: [
                'Time perception is fundamentally different: minutes feel like hours when idle',
                'Speed is respect: being quick shows you value others' time',
                'Velocity as social lubricant: fast transactions build trust',
              ],
            },
            {
              heading: '한 (Han) - Compressed Sorrow as Fuel',
              paragraphs: [
                'Han is untranslatable—the closest approximation is "righteous, compressed sorrow that fuels action." It's not depression (which is passive) nor anger (which is scattered). Han is grief that has been squeezed under so much pressure it becomes diamond-hard resolve.',
                'A Korean farmer who lost land to invasion doesn't just grieve—he works twice as hard on half the land and produces more than before. A student who fails an exam doesn't just feel sad—she studies through the night for a year and scores #1 the next time. Han transforms suffering into rocket fuel.',
                'This is why Korean art—music, film, drama—often has a melancholic intensity that foreigners find surprising. It's not wallowing in sadness; it's acknowledging that pain is the raw material of excellence. You don't avoid han; you forge it into weapons.',
              ],
              quote: {
                text: '고생 끝에 낙이 온다',
                attribution: 'Korean proverb: "After hardship comes happiness" — but the happiness is earned through suffering, not waited for',
              },
            },
            {
              heading: 'Hierarchical Precision',
              paragraphs: [
                'Korean has seven levels of formality built into the language itself. You cannot speak Korean without immediately declaring your relationship to the listener: superior, inferior, equal, intimate, formal, casual. This isn't politeness—it's social GPS.',
                'In Korean workplaces, hierarchy isn't oppressive (as Western observers often assume)—it's clarifying. Everyone knows exactly where they stand, what's expected, who decides what. There's no ambiguity about chain of command. This enables faster execution because you're not constantly negotiating authority.',
                'The flip side: Koreans struggle in flat hierarchies. Give a Korean team "equal authority" and they'll immediately establish informal hierarchy based on age, experience, or competence. Not because they're authoritarian, but because they literally cannot function efficiently without clear structure.',
              ],
            },
            {
              heading: '우리 (Uri) - Collective Before Individual',
              paragraphs: [
                'The Korean word "uri" means "we/our/us"—but Koreans use it where English speakers would say "I/my." You don't say "my country" (나의 나라) but "our country" (우리 나라). You don't say "my wife"—you say "our wife." Even "my stomach hurts" becomes "our stomach hurts."',
                'This isn't just grammar—it's identity. A Korean person doesn't fully exist as an individual; they exist as a node in multiple "uri" networks: family, school, company, region, nation. When Korea's national soccer team plays, millions don't watch as spectators—they ARE the team. The collective victory or defeat is personal.',
                'This makes Korean teams incredibly powerful. There's no "good enough for me" thinking. If the team wins, you win. If the team loses, you failed—even if you performed well individually. This creates intense pressure but also extraordinary cohesion.',
              ],
            },
          ],
        },
      },
      {
        id: 'compressed-modernity',
        title: 'Compressed Modernity',
        subtitle: 'From rubble to hyperpower in 70 years',
        era: '1950 - 2020',
        content: {
          intro: 'In 1953, Korea was the poorest country on Earth—poorer than most of Africa. By 2020, it was the world's 10th largest economy, a cultural superpower, and a technological leader. This transformation wasn't gradual development; it was civilizational sprint.',
          sections: [
            {
              heading: 'The Korean War & Zero Point',
              paragraphs: [
                'The Korean War (1950-53) destroyed everything. Seoul changed hands four times. Ninety percent of industrial facilities were obliterated. Three million people died. The country was divided, traumatized, and had a per capita GDP of $67—about the same as Ghana.',
                'Most war-torn nations take generations to recover. Korea had a different response: "We lost everything, so now we have nothing to lose." There was no gradualism, no "let's take our time rebuilding." The attitude was: "Build everything, build it now, build it better than before."',
                'The Korean government set impossible targets—100% literacy in a generation, industrialization in a decade. Korean families responded by sacrificing everything for education. Students studied 16 hours a day. Parents sold land to send kids to college. This wasn't ambition; it was mobilization.',
              ],
              highlights: [
                '1960: Per capita GDP $79 (one of world's poorest)',
                '2020: Per capita GDP $31,846 (world's 10th largest economy)',
                'Fastest economic development in recorded history',
              ],
            },
            {
              heading: 'Education as National Religion',
              paragraphs: [
                'Korean parents don't just value education—they worship it. The annual college entrance exam (수능, suneung) is a national event. Planes are grounded during listening sections. Offices open late so test-takers avoid traffic. Entire families plan their lives around this single test.',
                'Students attend school, then private academies (학원, hagwon) until midnight. They give up sleep, hobbies, social life—all for test scores. A student scoring in the top 1% isn't exceptional; they're meeting basic expectations. Anything less is failure.',
                'This creates a generation that treats "impossible" as a starting negotiation. Korean students are trained from childhood to believe: "If you're not first, you're last." There's no bronze medal mentality. You win or you re-take until you win.',
              ],
              quote: {
                text: '개천에서 용 난다',
                attribution: 'Korean proverb: "A dragon rises from a stream" — education is the great equalizer',
              },
            },
            {
              heading: 'Chaebols & Total Work',
              paragraphs: [
                'Korean conglomerates (chaebols like Samsung, Hyundai, LG) aren't just companies—they're national destiny projects. Employees don't "work for" Samsung; they ARE Samsung. The company provides housing, healthcare, education for your kids, and social status. In return, you give everything.',
                'The Korean term 야근 (yageun, overnight work) isn't an emergency measure—it's standard practice. Leaving before your boss is social suicide. Taking all your vacation days suggests you're not committed. This isn't employer exploitation; it's cultural expectation internalized.',
                'Westerners call this "toxic work culture." Koreans call it "taking things seriously." The logic is simple: if you're not willing to give 100%, why should anyone trust you with responsibility?',
              ],
            },
            {
              heading: 'Military Service as Crucible',
              paragraphs: [
                'Every Korean man serves 18-21 months in the military. This isn't just national defense—it's the final stage of becoming Korean. You enter as an individual; you exit as a unit member who understands hierarchy, sacrifice, and speed under pressure.',
                'Military service reinforces every cultural code: ppalli ppalli (orders are executed immediately, no debate), han (you endure discomfort without complaint), uri (your squad is your identity), hierarchy (rank is absolute). Those who resist these codes are broken down and rebuilt.',
                'When Korean men return to civilian life, they carry military efficiency into everything. Business meetings run like mission briefings. Projects execute like tactical operations. The question isn't "Can we do this?" but "How fast can we do this?"',
              ],
            },
          ],
        },
      },
      {
        id: 'contemporary',
        title: 'Contemporary Expressions',
        subtitle: 'How ancient patterns show up today',
        era: '2000 - Present',
        content: {
          intro: 'Korean culture has gone global—but not by softening. K-pop, K-drama, Korean gaming, Korean startups: all carry the same intensity DNA. The world is encountering Korean velocity in export form.',
          sections: [
            {
              heading: 'K-Pop as Perfection Engine',
              paragraphs: [
                'K-pop isn't music—it's manufactured excellence. Trainees practice 14+ hours daily for years before debut. Choreography is rehearsed until muscle memory is perfect. Vocals are trained until every note is flawless. There is no "good enough"—only "perfect or you're cut."',
                'Groups like BTS didn't become global through talent alone—they became global through systematic obliteration of competition. They out-worked, out-practiced, out-performed everyone. When Western artists rehearse for a week before a tour, K-pop groups have been rehearsing the same routine for 18 months.',
                'Critics call it manufactured and soulless. Koreans call it "respect for craft." The logic: if you're going to do something, do it better than anyone has ever done it. Anything less is disrespect to your audience.',
              ],
              highlights: [
                'Average trainee period: 3-5 years before debut',
                'Practice schedules: 14-16 hours daily, 7 days a week',
                'Perfection as baseline: "almost perfect" means re-record',
              ],
            },
            {
              heading: 'Gaming Dominance',
              paragraphs: [
                'South Korea has 25 million gamers in a population of 51 million. Esports athletes are national celebrities. Gaming isn't entertainment—it's competitive sport taken as seriously as the Olympics.',
                'Korean StarCraft players in the early 2000s practiced 12+ hours daily. League of Legends teams train like Olympic athletes. When international teams scrim (practice) 6 hours a day, Korean teams scrim 14. The result: Koreans dominate global esports across nearly every title.',
                'The secret isn't genetic—it's cultural. Korean gamers treat every match like it matters. They review replays obsessively. They drill mechanics until they're automatic. Losing isn't disappointing—it's unacceptable. This intensity overwhelms players from cultures where gaming is "just for fun."',
              ],
            },
            {
              heading: 'Startup Culture: Execution Over Ideas',
              paragraphs: [
                'Silicon Valley celebrates visionaries. Korea celebrates executors. In Seoul's startup scene, nobody cares about your brilliant idea. They care about: "Can you ship it this week?" If yes, you're valuable. If no, you're theoretical.',
                'Korean startups move at terrifying speed. A feature that takes Western companies 3 months to build gets shipped in 3 weeks by Korean teams. This isn't because Korean engineers are smarter—it's because they're willing to work nights and weekends without being asked.',
                'The phrase "move fast and break things" originated in Silicon Valley but is practiced most ruthlessly in Seoul. Korean founders don't pivot—they execute, measure, iterate, and execute again. Speed is the competitive advantage.',
              ],
              quote: {
                text: '빨리 실패하고, 더 빨리 배워라',
                attribution: 'Korean startup mantra: "Fail quickly, learn faster"',
              },
            },
            {
              heading: 'Beauty Standards & Self-Optimization',
              paragraphs: [
                'South Korea has the highest rate of cosmetic surgery per capita globally. This isn't vanity—it's the same perfectionism applied to appearance. If you can improve, why wouldn't you? Settling for "natural" when "optimized" is available feels like giving up.',
                'Korean skincare routines (10+ steps nightly) aren't luxury—they're baseline. Korean women don't view this as oppression; they view it as personal excellence. The logic: your face is your most visible project. Why wouldn't you perfect it?',
                'This extends beyond appearance. Koreans optimize everything: diet (endless health fads), fitness (functional training, not just appearance), productivity (constant experimentation with systems). The goal is always the same: eliminate inefficiency, maximize output.',
              ],
            },
          ],
        },
      },
      {
        id: 'archetype',
        title: 'The Intensity Archetype',
        subtitle: 'Why Korean culture creates the Jaejin pattern',
        era: 'Synthesis',
        content: {
          intro: 'After exploring history, practices, and modern expressions, one pattern emerges: Korean culture is an intensity engine. Every element—geography, history, language, social structure—reinforces the same message: Speed. Excellence. No excuses.',
          sections: [
            {
              heading: 'From Survival to Excellence',
              paragraphs: [
                'Korean intensity wasn't chosen—it was imposed by geography and history. A peninsula between empires, with limited resources and constant threats, created a culture where slowness meant death and mediocrity meant conquest.',
                'Over centuries, this survival imperative calcified into identity. Even when external threats disappeared, the internal drive remained. Koreans no longer NEED to be fast and excellent—they cannot conceive of being any other way.',
                'This is the Jaejin pattern: intensity not as temporary effort but as permanent operating system. You don't "try hard when needed"—you exist in a state of perpetual mobilization. Rest isn't a goal; it's a grudging necessity between sprints.',
              ],
            },
            {
              heading: 'The Collective Performance Machine',
              paragraphs: [
                'Western individualism says: "Express yourself. Find your authentic path. Balance is key." Korean collectivism says: "The team wins or everyone loses. Your authentic self is your team role. Balance is for people without goals."',
                'This creates superhuman collective performance. When Koreans mobilize as a unit—whether a company, a sports team, or a nation—they become almost unstoppable. The cultural codes (ppalli ppalli, han, uri, hierarchy) all point in the same direction: synchronized, high-velocity execution.',
                'The cost is individual freedom. Korean culture doesn't accommodate the person who wants to "find themselves" or "take time to figure things out." You're assigned a role, given a standard, and expected to exceed it. This is suffocating for some, liberating for others.',
              ],
            },
            {
              heading: 'Why This Produces "Jaejin"',
              paragraphs: [
                'The Jaejin archetype—named using Korean phonetics deliberately—captures a specific flavor of intensity. Not German precision (which is systematic but patient). Not American hustle (which is individualistic and opportunistic). Not Japanese discipline (which is ritualized and stable).',
                'Jaejin intensity is: collective, urgent, competitive, and relentless. It's the intensity of a country that went from poorest to richest in one lifetime. The intensity of students who study until they physically collapse. The intensity of workers who voluntarily sleep at the office.',
                'If you have Jaejin in your pattern, you carry this cultural inheritance—even if you've never been to Korea. You experience the world through Korean velocity. You're uncomfortable with slowness. You bond through shared effort, not shared leisure. You measure worth through output, not intention.',
              ],
              highlights: [
                'Intensity as identity, not just work ethic',
                'Collective mobilization over individual expression',
                'Speed and excellence as moral imperatives',
                'Rest as tactical recovery, not life goal',
              ],
            },
            {
              heading: 'Living the Pattern Today',
              paragraphs: [
                'If you're Jaejin-aligned, modern "work-life balance" culture probably feels suffocating. Advice to "slow down" registers as offensive. People telling you to "relax" don't understand that your baseline is their sprint.',
                'You're not damaged. You're not workaholic (a pathologizing Western term). You're operating from a different cultural template—one where intensity is virtue, where collective achievement is personal identity, where speed is respect.',
                'The challenge isn't to "fix" your intensity—it's to find environments that match it. Seek teams that execute. Avoid cultures that celebrate "good enough." Surround yourself with people who won't ask you to slow down, but will run faster beside you.',
              ],
              quote: {
                text: '할 수 있다',
                attribution: 'Korean phrase: "I/We can do it" — not hope, but certainty',
              },
            },
          ],
        },
      },
    ],
  },

  // Placeholder for other codes
  shokunin: {
    codeName: 'Shokunin',
    cultureType: 'single',
    level1: 'Japanese',
    chapters: [
      {
        id: 'placeholder',
        title: 'Heritage Coming Soon',
        subtitle: 'Deep dive into Japanese craft mastery traditions',
        content: {
          intro: 'Full heritage content for Shokunin will be available soon.',
          sections: [],
        },
      },
    ],
  },
}
