import type { CampaignDay } from './campaignData.types'

export const CAMPAIGN_DAYS: CampaignDay[] = [
    // ==========================================
    // STORY 0, ДЕНЬ 1
    // ==========================================
    {
        dayIndex: 0,
        phase: 'Story 0',
        dayLabel: 'Story 0, День 1',
        title: 'Positioning + инфраструктура + аккаунты',
        summary: 'Фиксируем core message, создаём таблицу, профили, аккаунты. Макс начинает landing.',
        tasks: [
            {
                id: '001',
                title: '001. Кира: Написать и зафиксировать core positioning',
                description: 'Зачем: До любых постов и активностей нужно зафиксировать ЧТО мы говорим. Без этого каждый пост, комментарий, connection request будет "от балды". Positioning — фундамент всей кампании.',
                steps: [
                    'Открыть Google Doc (или Notion) — создать документ "KORU Positioning"',
                    'Записать Core Message:\n  "From URL to keyword strategy in 5 minutes.\n  Topic clusters, priority scoring, page mapping, content briefs — one click.\n  4 hours of manual work, automated."',
                    'Записать Positioning Statement:\n  "KORU — для SEO-фрилансеров и небольших агентств, которые тратят часы на ручной keyword research. В отличие от Ahrefs/Semrush которые дают данные, KORU даёт готовую стратегию."',
                    'Записать "Что мы ГОВОРИМ":\n  — "4 hours → 5 minutes" (конкретная экономия времени)\n  — "From URL to strategy" (простота — вставил URL, получил план)\n  — "Topic clusters, not keyword lists" (наш дифференциатор)\n  — "Built for freelancers and small agencies" (для кого)',
                    'Записать "Что мы НЕ ГОВОРИМ":\n  — "AI-powered" (так говорят все 50 конкурентов)\n  — "All-in-one" (positioning Walmart — ни о чём)\n  — "Cheaper than Ahrefs" (гонка на дно по цене)\n  — "AI visibility tracking" (crowded market, не наш фокус)',
                    'Расшарить документ с Настей и Максом'
                ],
                subtasks: [
                    { id: '001-st1', text: 'Core message записан' },
                    { id: '001-st2', text: 'Positioning statement записан' },
                    { id: '001-st3', text: '"Говорим / не говорим" записано' },
                    { id: '001-st4', text: 'Документ расшарен с командой' }
                ],
                assignee: 'Кира',
                estimate: '1 час',
                priority: 'high',
                tags: ['planning'],
                tip: 'Этот документ — библия кампании. Перед каждым постом и комментарием сверяйся: мы говорим то что здесь написано?'
            },
            {
                id: '002',
                title: '002. Кира: Обновить LinkedIn профиль (headline + about)',
                description: 'Зачем: Когда кто-то увидит пост или получит connection request — первое что сделает — откроет профиль. Профиль должен вызывать любопытство: "что она строит?" Headline строится на БОЛИ клиента, не на решении.',
                steps: [
                    'Зайти в LinkedIn → Edit Profile',
                    'Изменить Headline на:\n  "SEO professionals spend 4 hours on keyword research. I\'m fixing that."',
                    'Изменить About section на:\n  Параграф 1: "I spent the last 6 months talking to SEO freelancers and agency owners. Every single one told me the same thing: keyword research takes forever, and the tools give data but not answers."\n  Параграф 2: "I keep asking one question: what if you could go from a URL to a full keyword strategy in 5 minutes? Not a list of keywords — a clustered, prioritized, mapped-to-pages plan."\n  Параграф 3: "Building something. More soon."',
                    'ПРОВЕРИТЬ: нигде НЕТ слова "KORU" или деталей продукта',
                    'Profile photo: профессиональное, чёткое, нейтральный фон',
                    'Cover photo: тёмный, минималистичный',
                    'Попросить Настю посмотреть профиль и дать feedback: "выглядит ли интригующе?"'
                ],
                subtasks: [
                    { id: '002-st1', text: 'Headline обновлён' },
                    { id: '002-st2', text: 'About обновлён' },
                    { id: '002-st3', text: 'Нет упоминаний KORU' },
                    { id: '002-st4', text: 'Настя посмотрела и ОК' }
                ],
                assignee: 'Кира',
                estimate: '1 час',
                priority: 'high',
                tags: ['linkedin', 'branding'],
                tip: 'Headline Evolution по фазам кампании:\n  Weeks 1-2: "...spend 4 hours...I\'m fixing that" (интрига)\n  Weeks 3-4: "Building a tool that turns URL into keyword strategy | In stealth" (building in public)\n  Week 5+: "Founder & CEO at KORU | From URL to SEO strategy in 5 minutes" (reveal)'
            },
            {
                id: '003',
                title: '003. Кира: Создать Twitter/X аккаунт',
                description: 'Зачем: SEO-сообщество очень активно в Twitter. Там реально обсуждают инструменты, жалуются на баги, сравнивают tools. LinkedIn = профессиональный networking. Twitter = живые дискуссии. Нужны оба канала.',
                steps: [
                    'Зайти на twitter.com (или x.com) → Sign Up',
                    'Username: что-то связанное с именем (не KORU пока)',
                    'Bio: "Building a tool that turns URLs into keyword strategies. SEO should take 5 minutes, not 4 hours."',
                    'Profile photo: то же что LinkedIn',
                    'Подписаться на 20-30 ключевых SEO-людей:\n  Lily Ray, Aleyda Solis, John Mueller, Barry Schwartz, Kevin Indig, Cyrus Shepard, Marie Haynes, Glenn Gabe',
                    'Подписаться на хештеги: #SEO, #SEOTools, #TechnicalSEO, #KeywordResearch',
                    'НЕ постить пока — первая неделя = слушать, лайкать, изучать что обсуждают'
                ],
                subtasks: [
                    { id: '003-st1', text: 'Аккаунт создан' },
                    { id: '003-st2', text: 'Bio заполнен' },
                    { id: '003-st3', text: 'Подписки на 20-30 SEO-людей' }
                ],
                assignee: 'Кира',
                estimate: '30 мин',
                priority: 'high',
                tags: ['setup']
            },
            {
                id: '004',
                title: '004. Настя: Создать Google Sheets для tracking prospects',
                description: 'Зачем: Это основной артефакт кампании — таблица где мы отслеживаем всех людей которых нашли, их статус, приоритет. Без таблицы вся работа Насти по research будет неструктурированной. Таблица используется каждый день до конца кампании.',
                steps: [
                    'Создать новый Google Sheet, назвать: "KORU Prospects — 2026"',
                    'Создать вкладку "Prospects" с 14 колонками:\n  A: Full Name (имя и фамилия)\n  B: LinkedIn URL (ссылка на профиль)\n  C: Title / Role (должность)\n  D: Company (компания)\n  E: Company Size (размер компании)\n  F: Segment — DROPDOWN с 3 вариантами: Freelance SEO | Small Agency 3-15 | In-House Manager\n  G: Location (город, страна)\n  H: Source (откуда нашли: LinkedIn search, Group, Conference, etc.)\n  I: Activity Level — DROPDOWN: High | Medium | Low\n  J: Content Topics (о чём постят)\n  K: Priority — DROPDOWN: A | B | C\n  L: Notes (заметки, зачем этот человек важен)\n  M: Status — DROPDOWN: Researched | Connected | Engaged | Declined\n  N: Date Added (дата добавления)',
                    'Добавить Data Validation для dropdown колонок (F, I, K, M):\n  Выделить колонку → Data → Data Validation → List of items → ввести варианты',
                    'Заморозить первую строку: View → Freeze → 1 row',
                    'Добавить Conditional Formatting:\n  Выделить все строки → Format → Conditional formatting\n  Priority A → зелёная заливка (#D4E8D4)\n  Priority B → жёлтая (#FFF2CC)\n  Priority C → серая (#F4F4F4)',
                    'Создать вкладку "Metrics" с колонками:\n  Week | Total Profiles | Priority A | Priority B | Priority C | Comments Left | Requests Sent | Acceptance Rate | Notes',
                    'Создать вкладку "Sources Log" с колонками:\n  Date | Search Query | Platform | Results Found | Notes | Status (Used/Planned)',
                    'Расшарить доступ:\n  Настя — Editor\n  Макс — Viewer\n  Кира — Owner'
                ],
                subtasks: [
                    { id: '004-st1', text: 'Sheet создан и назван' },
                    { id: '004-st2', text: '14 колонок на месте' },
                    { id: '004-st3', text: 'Dropdown validation работает' },
                    { id: '004-st4', text: 'Conditional formatting работает' },
                    { id: '004-st5', text: 'Metrics вкладка создана' },
                    { id: '004-st6', text: 'Sources Log вкладка создана' },
                    { id: '004-st7', text: 'Доступ расшарен' }
                ],
                assignee: 'Настя',
                estimate: '1 час',
                priority: 'high',
                tags: ['setup']
            },
            {
                id: '005',
                title: '005. Макс: Начать делать landing page koru-seo.com',
                description: 'Зачем: Когда люди видят профиль Киры и кликают на website — они должны увидеть профессиональный landing, а не 404. Landing собирает emails заинтересованных людей ДО запуска. Дедлайн: конец Story 0 (День 3).',
                steps: [
                    'Платформа: Carrd / Framer / Custom — на выбор Макса',
                    'Дизайн: тёмная тема, цвета #0d1117 (фон) + #3fb68e (акцент)',
                    'Текст (Кира предоставит):\n  H1: "Stop researching. Start strategizing."\n  Подзаголовок: "From URL to keyword strategy. In minutes, not hours."\n  CTA: "Get early access"\n  Email capture: поле email + кнопка "Notify me"',
                    'Email service: Mailchimp или ConvertKit — простая форма',
                    'Thank you message: "Thanks! We\'ll let you know when it\'s ready."',
                    'КРИТИЧНО: НЕ добавлять скриншоты продукта, списки фич, цены. Только тизер.',
                    'Проверить mobile и desktop'
                ],
                subtasks: [
                    { id: '005-st1', text: 'Landing page live на koru-seo.com' },
                    { id: '005-st2', text: 'Email capture работает' },
                    { id: '005-st3', text: 'Mobile + desktop OK' }
                ],
                assignee: 'Макс',
                estimate: '1 день',
                priority: 'high',
                tags: ['landing'],
                warning: 'Никаких скриншотов, фич, цен! Soft stealth mode.'
            }
        ]
    },

    // ==========================================
    // STORY 0, ДЕНЬ 2
    // ==========================================
    {
        dayIndex: 1,
        phase: 'Story 0',
        dayLabel: 'Story 0, День 2',
        title: 'Группы + Onboarding + Company Page',
        summary: 'Настя подаёт заявки в LinkedIn группы. Кира проводит onboarding Насти (новый ICP). Кира создаёт Company Page.',
        tasks: [
            {
                id: '006',
                title: '006. Настя: Подать заявки в 10 LinkedIn групп (аккаунт Киры)',
                description: 'Зачем: Группы — источник prospects на Week 2 (мы будем искать активных участников) и канал органического engagement. Заявки апрувят медленно (иногда неделю), поэтому подаём СЕЙЧАС чтобы к Week 2 были approved.',
                steps: [
                    'Зайти в LinkedIn аккаунт КИРЫ → Groups → Discover',
                    'Найти и подать заявку в каждую из 10 групп:\n  1. SEO Professionals\n  2. Technical SEO\n  3. Search Engine Land\n  4. Digital Marketing\n  5. SEO & SEM Professionals\n  6. Content Marketing & SEO\n  7. Agency Growth & Scaling\n  8. Moz Community\n  9. SEO for Startups\n  10. International SEO',
                    'Если группа закрытая — заполнить join question:\n  Для Киры: "Interested in SEO workflows and tools as a tech founder"\n  НЕ упоминать KORU или продукт',
                    'Записать в Sources Log (вкладка в Sheets):\n  Date | Group Name | Status (Pending) | Account (Kira)'
                ],
                subtasks: [
                    { id: '006-st1', text: 'SEO Professionals — заявка подана' },
                    { id: '006-st2', text: 'Technical SEO — подана' },
                    { id: '006-st3', text: 'Search Engine Land — подана' },
                    { id: '006-st4', text: 'Digital Marketing — подана' },
                    { id: '006-st5', text: 'SEO & SEM Professionals — подана' },
                    { id: '006-st6', text: 'Content Marketing & SEO — подана' },
                    { id: '006-st7', text: 'Agency Growth & Scaling — подана' },
                    { id: '006-st8', text: 'Moz Community — подана' },
                    { id: '006-st9', text: 'SEO for Startups — подана' },
                    { id: '006-st10', text: 'International SEO — подана' },
                    { id: '006-st11', text: 'Все записаны в Sources Log' }
                ],
                assignee: 'Настя',
                estimate: '30 мин',
                priority: 'high',
                tags: ['setup', 'linkedin']
            },
            {
                id: '007',
                title: '007. Настя: Подать заявки в 10 LinkedIn групп (аккаунт Насти)',
                description: 'Зачем: Два аккаунта в группах = можем видеть больше discussions и participants. Тот же список групп.',
                steps: [
                    'Зайти в LinkedIn аккаунт НАСТИ',
                    'Подать заявку в те же 10 групп',
                    'Join question для Насти: "Interested in SEO as part of my work in digital marketing"',
                    'Записать в Sources Log: Account = Nastya'
                ],
                subtasks: [
                    { id: '007-st1', text: '10 заявок подано в аккаунте Насти' },
                    { id: '007-st2', text: 'Записано в Sources Log' }
                ],
                assignee: 'Настя',
                estimate: '20 мин',
                priority: 'high',
                tags: ['setup', 'linkedin']
            },
            {
                id: '008',
                title: '008. Кира + Настя: Провести onboarding — новый ICP и messaging',
                description: 'Зачем: Настя будет каждый день искать людей и комментировать посты. Если она не понимает КТО наш клиент и КАКОЙ тон — она будет собирать нерелевантных людей и писать не те комментарии. Лучше потратить 1.5 часа сейчас, чем 3 недели исправлять ошибки.',
                steps: [
                    'Созвон 1.5 часа (Zoom/Google Meet)',
                    'Часть 1 — Кто наш клиент (ICP). Объяснить 3 сегмента:\n  1. Freelance SEO Consultant — работает один, 5-20 клиентов, сам покупает tools, платит $200+/мес за стек инструментов, keyword research = его главная боль (3-4 часа на клиента)\n  2. Small SEO Agency Owner (3-15 человек) — scaling проблема, 10 клиентов x 4 часа = 40 часов/мес на keyword research, нужна эффективность\n  3. In-House SEO Manager (50-500 employees) — отчитывается перед руководством, нужны готовые стратегии для презентации',
                    'Часть 2 — Priority A/B/C по новым критериям:\n  A: АКТИВНО постит про keyword research, SEO workflows, tool comparisons. Freelance или agency 3-15. High LinkedIn activity.\n  B: SEO professional, но менее активен. In-house managers. Medium activity.\n  C: Tangentially related. Digital marketing generalists. Low activity.',
                    'Часть 3 — Тон комментариев:\n  ПРАВИЛЬНО: "How long does keyword clustering take you per client?" / "Do you use a tool or spreadsheet for grouping?" / "What\'s your biggest time sink in keyword research?"\n  НЕПРАВИЛЬНО: "Great post!" / "I agree!" / "Interesting thoughts!"\n  Тон: человек который ГЛУБОКО понимает боль keyword research и задаёт sharp вопросы',
                    'Часть 4 — Живые примеры:\n  Открыть 3-5 LinkedIn профилей → Кира объясняет: "Это Priority A потому что..."\n  Открыть 3-5 постов → Кира объясняет: "Под этим комментируем так..."',
                    'Часть 5 — Логистика:\n  Daily check-in первые 2 недели (15 мин в конце дня)\n  Weekly retrospective в пятницу\n  Как задавать вопросы если что-то непонятно'
                ],
                subtasks: [
                    { id: '008-st1', text: 'Созвон проведён (1.5+ часа)' },
                    { id: '008-st2', text: 'Настя может назвать 3 сегмента ICP' },
                    { id: '008-st3', text: 'Настя понимает разницу A/B/C' },
                    { id: '008-st4', text: 'Настя знает тон комментариев (sharp вопросы, не "great post!")' },
                    { id: '008-st5', text: 'Daily check-in настроен' }
                ],
                assignee: 'Кира + Настя',
                estimate: '1.5 часа',
                priority: 'high',
                tags: ['onboarding'],
                warning: 'Если Настя не может объяснить разницу A/B/C своими словами — повторить. Это фундамент.'
            },
            {
                id: '009',
                title: '009. Кира: Создать LinkedIn Company Page KORU (soft stealth)',
                description: 'Зачем: Когда prospects кликнут на "KORU" в профиле Киры (позже) — должна быть реальная Company Page. Это даёт доверие: "компания существует". Но в stealth mode — никаких деталей продукта.',
                steps: [
                    'LinkedIn → Work → Create a Company Page',
                    'Company name: KORU',
                    'Website: koru-seo.com',
                    'Industry: Software Development',
                    'Company size: 2-10 employees',
                    'Company type: Privately Held',
                    'Logo: текст "KORU" на тёмном фоне (#0d1117). НЕ визуальный логотип — просто текст.',
                    'Cover image: минималистичная, тёмная. Без скриншотов.',
                    'About: "Rethinking how SEO professionals do keyword research. Launching 2026."\n  Больше НИЧЕГО.',
                    'НЕ добавлять KORU в Experience Киры пока — это будет на Week 4-5'
                ],
                subtasks: [
                    { id: '009-st1', text: 'Company Page создана' },
                    { id: '009-st2', text: 'About = одна тизерная строка' },
                    { id: '009-st3', text: 'Нет деталей продукта' }
                ],
                assignee: 'Кира',
                estimate: '45 мин',
                priority: 'medium',
                tags: ['linkedin', 'branding']
            }
        ]
    },

    // ==========================================
    // STORY 0, ДЕНЬ 3
    // ==========================================
    {
        dayIndex: 2,
        phase: 'Story 0',
        dayLabel: 'Story 0, День 3',
        title: 'Тестовый прогон + написать посты + график',
        summary: 'Настя делает тест 5 профилей. Кира пишет ЧЕРНОВИКИ первых 6 постов (в документ, НЕ публикует). Согласование графика с Максом.',
        tasks: [
            {
                id: '010',
                title: '010. Настя: Найти 5 тестовых профилей и добавить в Sheets',
                description: 'Зачем: Это quality gate перед стартом. Проверяем что Настя правильно понимает новый ICP. Если ошибки — лучше исправить сейчас, а не через 3 недели.',
                steps: [
                    'Открыть LinkedIn',
                    'В поиск ввести: "SEO consultant" AND "freelance"',
                    'Перейти в People tab',
                    'Найти 5 профилей которые по мнению Насти = Priority A',
                    'Для каждого заполнить ВСЕ 14 колонок в Sheets (~10 мин на профиль)',
                    'В колонке Notes ОБЯЗАТЕЛЬНО написать reasoning: "Priority A because: [конкретные причины]"',
                    'Пометить эти 5 строк комментом "TEST RUN — review needed"',
                    'Написать Кире что готово'
                ],
                subtasks: [
                    { id: '010-st1', text: '5 профилей добавлены в Sheets' },
                    { id: '010-st2', text: 'Все 14 полей заполнены' },
                    { id: '010-st3', text: 'Reasoning в Notes' },
                    { id: '010-st4', text: 'Кире сообщено' }
                ],
                assignee: 'Настя',
                estimate: '50 мин',
                priority: 'high',
                tags: ['review']
            },
            {
                id: '011',
                title: '011. Кира: Проревьюить 5 тестовых профилей Насти',
                description: 'Зачем: Убедиться что Настя правильно определяет Priority, Segment, Activity Level. 4+ из 5 правильных = go. Меньше = дополнительное обучение.',
                steps: [
                    'Открыть Sheets → найти 5 строк с "TEST RUN"',
                    'Для каждого из 5 профилей:\n  — Открыть LinkedIn профиль\n  — Проверить: Priority правильный?\n  — Segment из 3 новых?\n  — Activity Level адекватный?\n  — Notes полезные, с reasoning?',
                    'Дать feedback Насте:\n  4+ из 5 правильные → "Отлично, стартуем Week 1"\n  3 правильные → "Хорошо, но вот корректировки: [конкретно]"\n  2 или меньше → "Нужна дополнительная сессия, созвон 30 мин"'
                ],
                subtasks: [
                    { id: '011-st1', text: 'Все 5 проревьюены' },
                    { id: '011-st2', text: '4+ из 5 правильные' },
                    { id: '011-st3', text: 'Feedback Насте дан' }
                ],
                assignee: 'Кира',
                estimate: '30 мин',
                priority: 'high',
                tags: ['review']
            },
            {
                id: '012',
                title: '012. Кира: Написать ЧЕРНОВИКИ постов 1-6 (в документ, НЕ публиковать)',
                description: 'Зачем: Пишем ВСЕ посты для Weeks 1-2 заранее в одном документе. Это даёт единый tone, возможность отредактировать как серию, и снимает нагрузку "придумывать контент каждый день". Посты будут публиковаться по графику — сегодня только пишем.',
                steps: [
                    'Открыть Google Doc — создать "KORU Campaign Posts"',
                    'Пост 1 (для Week 1, Понедельник — LinkedIn + Twitter):\n  Тема: "The keyword research time trap"\n  Текст: "I asked 20 SEO freelancers how long keyword research takes per client. Average: 3-4 hours. For a freelancer with 10 clients, that\'s 40 hours/month just on research. Not strategy. Not content. Just research."\n  Финальная строка (CTA): "How long does yours take?"\n  Хэштеги (max 3-5): #SEO #KeywordResearch #SEOTools',
                    'Пост 2 (Week 1, Среда — LinkedIn):\n  Тема: "Keyword lists vs keyword strategies"\n  Текст: "Every SEO tool gives you a list of keywords sorted by volume and difficulty. But that\'s not a strategy. A strategy is: here are 5 topic clusters, here\'s which pages already cover them, here\'s what\'s missing, here\'s the priority order. Tools give data. Professionals need strategy."\n  CTA: "What does your keyword-to-strategy process look like?"',
                    'Пост 3 (Week 1, Пятница — Twitter thread + LinkedIn):\n  Тема: "The tool stack problem"\n  Текст: "A typical freelance SEO setup: Ahrefs ($129/mo) + Surfer ($99/mo) + Screaming Frog ($259/yr). That\'s $290/month before you earn a dollar. And you STILL cluster keywords manually in a spreadsheet."\n  CTA: "What\'s your tool stack? And what\'s still manual?"',
                    'Пост 4 (Week 2, Понедельник — LinkedIn + Twitter):\n  Тема: "What if keyword research took 5 minutes?"\n  Текст: "I keep asking myself: what if you could paste a URL and get topic clusters, page mapping, and a content plan in 5 minutes? Not keyword soup — an actual strategy. Not a list to sort through — an action plan."\n  CTA: "Would that change how you work?"',
                    'Пост 5 (Week 2, Среда — LinkedIn):\n  Тема: "The spreadsheet SEO workflow"\n  Текст: "I watched an SEO consultant build a keyword strategy last week. She had 4 tabs open: Ahrefs for data, a spreadsheet for clustering, Google Docs for the brief, and Asana for tasks. Four tools that don\'t talk to each other. She spent 3 hours."\n  CTA: "Sound familiar?"',
                    'Пост 6 (Week 2, Пятница — LinkedIn + Twitter):\n  Тема: "Building something"\n  Текст: "We talked to 30 SEO professionals. The top 3 time sinks: keyword clustering (manual), content brief creation (manual), audit-to-action translation (manual). We\'re building something to fix this. More soon."\n  CTA: нет — тизер. ПЕРВЫЙ РАЗ даём link на landing в КОММЕНТАРИИ.',
                    'ПРАВИЛА для всех постов:\n  — Короткие абзацы (1-2 предложения)\n  — Личный тон (я, мы), не корпоративный\n  — Без emoji spam\n  — Max 3-5 хэштегов\n  — НИКАКИХ упоминаний KORU в постах 1-5\n  — В посте 6 = только hint, без бренда'
                ],
                subtasks: [
                    { id: '012-st1', text: 'Google Doc создан' },
                    { id: '012-st2', text: 'Пост 1 написан' },
                    { id: '012-st3', text: 'Пост 2 написан' },
                    { id: '012-st4', text: 'Пост 3 написан' },
                    { id: '012-st5', text: 'Пост 4 написан' },
                    { id: '012-st6', text: 'Пост 5 написан' },
                    { id: '012-st7', text: 'Пост 6 написан' },
                    { id: '012-st8', text: 'Все посты проверены на tone и правила' }
                ],
                assignee: 'Кира',
                estimate: '3 часа',
                priority: 'high',
                tags: ['content'],
                warning: 'Это ЧЕРНОВИКИ в документе! НЕ публиковать сейчас. Публикация начинается Week 1.',
                tip: 'Пост 4 = переломный. Первый раз звучит "5 minutes" и "URL to strategy". Это seed для всего positioning.'
            },
            {
                id: '013',
                title: '013. Кира + Макс: Согласовать график и launch date',
                description: 'Зачем: Без фиксированных дат кампания расплывается. Launch date определяет ВСЕ остальные даты (отсчёт назад).',
                steps: [
                    'Созвон 30 мин',
                    'Согласовать launch date (Week 6). Учесть:\n  — Готовность продукта (keyword clustering — Task из Product Roadmap)\n  — Бизнес-календарь (не в праздники)\n  — День недели для launch post (Вторник или Среда = лучший engagement)',
                    'От launch date отсчитать назад:\n  Week 5 = -1 неделя | Week 4 = -2 | Week 3 = -3 | Week 2 = -4 | Week 1 = -5',
                    'Создать Google Calendar события для всей команды',
                    'Проверить: landing page будет готов к Day 3? Если нет — когда?',
                    'Уведомить Настю о start date Week 1'
                ],
                subtasks: [
                    { id: '013-st1', text: 'Launch date зафиксирована' },
                    { id: '013-st2', text: 'Все weeks с датами' },
                    { id: '013-st3', text: 'Calendar события созданы' },
                    { id: '013-st4', text: 'Настя уведомлена' }
                ],
                assignee: 'Кира + Макс',
                estimate: '30 мин',
                priority: 'high',
                tags: ['planning']
            }
        ],
        keyMetric: 'Story 0 Done: positioning записан, профили настроены (LinkedIn+Twitter), sheets готов, группы поданы, onboarding проведён, 6 постов написаны (не опубликованы), график зафиксирован.'
    },

    // ==========================================
    // WEEK 1, ПОНЕДЕЛЬНИК
    // ==========================================
    {
        dayIndex: 3,
        phase: 'Week 1',
        dayLabel: 'Week 1, Понедельник',
        title: 'ПУБЛИКАЦИЯ ПОСТА 1 + начало research',
        summary: 'Кира публикует первый пост из документа и 2 часа отвечает на комментарии. Настя начинает research — первые 4 LinkedIn запроса.',
        tasks: [
            {
                id: '014',
                title: '014. Кира: Опубликовать Пост 1 на LinkedIn',
                description: 'Зачем: Первый пост кампании. Тема: боль keyword research ("4 hours"). Цель: вызвать дискуссию. Алгоритм LinkedIn решает в первые 2 часа.',
                steps: [
                    'Зайти в LinkedIn → Start a post',
                    'Нажать кнопку копирования на тексте ниже → вставить в LinkedIn',
                    'Проверить форматирование: короткие абзацы, пробелы между ними',
                    'Опубликовать',
                    'Записать время публикации'
                ],
                subtasks: [
                    { id: '014-st1', text: 'Пост 1 опубликован на LinkedIn' },
                    { id: '014-st2', text: 'Время записано' }
                ],
                assignee: 'Кира',
                estimate: '10 мин',
                priority: 'high',
                tags: ['content'],
                copyBlocks: [{
                    label: 'Текст поста для LinkedIn (copy-paste)',
                    text: 'I asked 20 SEO freelancers one simple question:\n\n"How long does keyword research take you per client?"\n\nThe average answer: 3-4 hours.\n\nFor a freelancer managing 10 clients, that\'s 40 hours a month.\n\nJust on research.\nNot strategy.\nNot content creation.\nNot client communication.\n\nJust sitting in Ahrefs, exporting spreadsheets, and manually clustering keywords.\n\n40 hours. That\'s a full work week every month spent on a process that hasn\'t fundamentally changed in 10 years.\n\nThe tools got prettier. The data got bigger. But the workflow? Still manual. Still spreadsheets. Still hours.\n\nHow long does yours take?\n\n#SEO #KeywordResearch #SEOTools'
                }]
            },
            {
                id: '015',
                title: '015. Кира: Опубликовать Пост 1 на Twitter',
                description: 'Зачем: Twitter = второй канал. SEO-тусовка обсуждает инструменты здесь. Адаптированная версия.',
                steps: [
                    'Зайти в Twitter → New Tweet',
                    'Скопировать текст ниже → вставить → опубликовать'
                ],
                subtasks: [
                    { id: '015-st1', text: 'Tweet опубликован' }
                ],
                assignee: 'Кира',
                estimate: '5 мин',
                priority: 'high',
                tags: ['content'],
                copyBlocks: [{
                    label: 'Tweet (copy-paste)',
                    text: 'I asked 20 SEO freelancers how long keyword research takes per client.\n\nAverage: 3-4 hours.\n\nFor someone with 10 clients = 40 hours/month just on research.\n\nThe tools got better. The workflow didn\'t.\n\nHow long does yours take?\n\n#SEO #KeywordResearch'
                }]
            },
            {
                id: '016',
                title: '016. Кира: 2 часа engagement — отвечать на ВСЕ комментарии',
                description: 'Зачем: Алгоритм LinkedIn решает в первые 2 часа. Каждый ответ = сигнал алгоритму. Молчание = пост умирает. ИСПОЛЬЗУЙ ТЕМПЛЕЙТЫ НИЖЕ.',
                steps: [
                    '2 часа после публикации — быть на LinkedIn и Twitter',
                    'На КАЖДЫЙ комментарий — ответить (использовать темплейты ниже)',
                    'Лайкнуть каждый комментарий',
                    'Записать имена commenters — если SEO professional → Sheets (Source: "Organic Post 1")'
                ],
                subtasks: [
                    { id: '016-st1', text: '2 часа engagement отработаны' },
                    { id: '016-st2', text: 'Все комментарии отвечены' },
                    { id: '016-st3', text: 'Commenters записаны' }
                ],
                assignee: 'Кира',
                estimate: '2 часа',
                priority: 'high',
                tags: ['engagement'],
                warning: '2 ЧАСА = NON-NEGOTIABLE. Не отвлекаться. Самый важный момент для поста.',
                copyBlocks: [
                    {
                        label: 'Reply если кто-то согласен ("So true!")',
                        text: 'Right? The crazy part is that the tools keep getting more powerful, but the actual workflow — going from data to strategy — hasn\'t changed. Curious: do you do the clustering part manually or have you found something that helps?'
                    },
                    {
                        label: 'Reply если кто-то называет своё время ("Mine takes 3 hours")',
                        text: 'That\'s about average from what I\'ve been hearing. The clustering step seems to be where most of the time goes — going from a flat list to organized topic groups. Is that true for you too, or is it something else?'
                    },
                    {
                        label: 'Reply если кто-то спрашивает "What\'s the solution?"',
                        text: 'Working on something actually. Not ready to share details yet, but the core idea is: what if you could go from URL to clustered keyword strategy automatically? More soon. Would love your input when it\'s ready.'
                    },
                    {
                        label: 'Reply если кто-то не согласен ("AI can do this already")',
                        text: 'Interesting — which tools have you found that actually cluster keywords well? Most I\'ve seen give you a flat list sorted by volume, but the actual grouping into topic clusters is still manual. Genuinely curious what\'s working for you.'
                    }
                ]
            },
            {
                id: '017',
                title: '017. Настя: LinkedIn searches — 4 запроса (batch 1 часть 1)',
                description: 'Зачем: Начинаем строить базу prospects. Каждый запрос — это конкретный search в LinkedIn который находит SEO-профессионалов. Цель сегодня: 10-15 профилей в Sheets.',
                steps: [
                    'Запрос 1: Открыть LinkedIn → Search → ввести "SEO consultant" AND "freelance" → People tab',
                    '  — Записать в Sources Log: Date, Query, Platform=LinkedIn, Results Found\n  — Просмотреть первые 20-30 результатов\n  — Выбрать 3-5 самых релевантных (Priority A по нашим критериям)\n  — Для каждого заполнить ВСЕ 14 колонок в Sheets',
                    'Запрос 2: "SEO agency" AND "founder" → тот же процесс',
                    'Запрос 3: "Head of SEO" → тот же процесс',
                    'Запрос 4: "keyword research" AND "SEO" (искать в Posts, не People — найти тех кто пишет про keyword research) → добавить активных авторов',
                    'Фокус при выборе:\n  — Кто постит про keyword research, SEO workflows, tool comparisons?\n  — Freelance или agency 3-15 человек?\n  — Высокая LinkedIn активность?'
                ],
                subtasks: [
                    { id: '017-st1', text: 'Запрос 1: "SEO consultant freelance" — сделан' },
                    { id: '017-st2', text: 'Запрос 2: "SEO agency founder" — сделан' },
                    { id: '017-st3', text: 'Запрос 3: "Head of SEO" — сделан' },
                    { id: '017-st4', text: 'Запрос 4: "keyword research" в постах — сделан' },
                    { id: '017-st5', text: '10-15 профилей добавлены в Sheets' },
                    { id: '017-st6', text: 'Sources Log обновлён' }
                ],
                assignee: 'Настя',
                estimate: '1.5 часа',
                priority: 'high',
                tags: ['research', 'linkedin'],
                tip: 'LinkedIn free = ~100 searches в месяц (3-4 в день). Каждый поиск дорог! Записывай в Sources Log чтобы не повторяться.'
            }
        ]
    },

    // ==========================================
    // WEEK 1, ВТОРНИК
    // ==========================================
    {
        dayIndex: 4,
        phase: 'Week 1',
        dayLabel: 'Week 1, Вторник',
        title: 'Research продолжение + follow-up engagement',
        summary: 'Настя делает ещё 4 запроса. Кира отвечает на новые комментарии + начинает Twitter listening.',
        tasks: [
            {
                id: '018',
                title: '018. Кира: Ответить на новые комментарии к Посту 1 + Twitter listening',
                description: 'Зачем: Комментарии продолжают приходить 24-48 часов после публикации. Каждый ответ = дополнительный reach. Twitter listening = понять что обсуждает SEO-сообщество.',
                steps: [
                    'LinkedIn: открыть Пост 1 → ответить на все НОВЫЕ комментарии (те что появились после вчерашних 2 часов)',
                    'Для каждого commenter: открыть профиль → если SEO professional → добавить в Sheets (Source: "Organic Post 1")',
                    'Twitter: 30 минут listening:\n  — Пролистать ленту подписок\n  — Лайкнуть 5-10 постов SEO-людей\n  — Ответить (reply) на 2-3 поста (добавить value, не pitch)\n  — Пример reply: "This is exactly the problem — I talked to 20 consultants and clustering was the #1 time sink for all of them."'
                ],
                subtasks: [
                    { id: '018-st1', text: 'LinkedIn комментарии отвечены' },
                    { id: '018-st2', text: 'Commenters проверены и добавлены' },
                    { id: '018-st3', text: 'Twitter: 30 мин listening + 2-3 replies' }
                ],
                assignee: 'Кира',
                estimate: '1 час',
                priority: 'medium',
                tags: ['engagement']
            },
            {
                id: '019',
                title: '019. Настя: LinkedIn searches — 4 запроса (batch 1 часть 2)',
                description: 'Зачем: Продолжаем строить базу. Цель к концу дня: 25-30 профилей total.',
                steps: [
                    'Запрос 5: "SEO manager" AND "agency"',
                    'Запрос 6: "SEO audits" AND "freelance"',
                    'Запрос 7: "SEO strategist"',
                    'Запрос 8: "digital marketing" AND "SEO" AND "director"',
                    'Тот же процесс: Sources Log → top 20-30 → 3-5 лучших → Sheets',
                    'Проверить что нет дубликатов со вчерашними'
                ],
                subtasks: [
                    { id: '019-st1', text: '4 запроса сделаны' },
                    { id: '019-st2', text: '25-30 профилей total' },
                    { id: '019-st3', text: 'Sources Log обновлён' }
                ],
                assignee: 'Настя',
                estimate: '1.5 часа',
                priority: 'high',
                tags: ['research', 'linkedin']
            }
        ]
    },

    // ==========================================
    // WEEK 1, СРЕДА
    // ==========================================
    {
        dayIndex: 5,
        phase: 'Week 1',
        dayLabel: 'Week 1, Среда',
        title: 'ПУБЛИКАЦИЯ ПОСТА 2 + batch 2 + mid-week review',
        summary: 'Кира публикует Пост 2 (LinkedIn). Настя — новые запросы. Вечером: Кира проверяет 10-15 профилей.',
        tasks: [
            {
                id: '020',
                title: '020. Кира: Опубликовать Пост 2 на LinkedIn',
                description: 'Зачем: Пост 2 = "Keyword lists vs strategies". Данные ≠ стратегия. Только LinkedIn.',
                steps: [
                    'Скопировать текст ниже → LinkedIn → опубликовать',
                    'Записать время'
                ],
                subtasks: [{ id: '020-st1', text: 'Пост 2 опубликован' }],
                assignee: 'Кира', estimate: '10 мин', priority: 'high', tags: ['content'],
                copyBlocks: [{
                    label: 'Пост 2 для LinkedIn (copy-paste)',
                    text: 'Every SEO tool on the market gives you the same thing: a list of keywords sorted by volume and difficulty.\n\nBut a list is not a strategy.\n\nA strategy looks like this:\n\n-> Here are 5 topic clusters relevant to your site\n-> Here\'s which of your existing pages already cover each cluster\n-> Here\'s what\'s missing -- the content gaps\n-> Here\'s the priority order based on difficulty, volume, and your current coverage\n-> Here\'s a content brief for each gap\n\nThat\'s what an SEO professional does manually. Open Ahrefs, export to spreadsheet, spend 2 hours grouping, cross-reference with site pages, write briefs in Google Docs.\n\nTools give data. Professionals need strategy.\n\nWhat does your keyword-to-strategy process look like?\n\n#SEO #ContentStrategy #KeywordResearch'
                }]
            },
            {
                id: '021',
                title: '021. Кира: 2 часа engagement — Пост 2',
                description: 'Зачем: Тот же принцип — алгоритм решает в первые 2 часа.',
                steps: [
                    '2 часа: отвечать на каждый комментарий',
                    'Content-rich ответы, follow-up вопросы',
                    'Записать commenters'
                ],
                subtasks: [{ id: '021-st1', text: '2ч engagement' }, { id: '021-st2', text: 'Commenters записаны' }],
                assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['engagement']
            },
            {
                id: '022',
                title: '022. Настя: LinkedIn searches — 4 запроса (batch 2 часть 1)',
                description: 'Зачем: Новый набор запросов, более специфичные роли.',
                steps: [
                    'Запрос 9: "SEO analyst" AND "senior"',
                    'Запрос 10: "organic search" AND "manager"',
                    'Запрос 11: "site audit" AND "SEO"',
                    'Запрос 12: "SEO" AND "ecommerce" AND "consultant"',
                    'Sources Log → search → select → Sheets'
                ],
                subtasks: [{ id: '022-st1', text: '4 запроса' }, { id: '022-st2', text: '35-40 total' }],
                assignee: 'Настя', estimate: '1.5 часа', priority: 'high', tags: ['research']
            },
            {
                id: '023',
                title: '023. Кира + Настя: Mid-week review (15 мин)',
                description: 'Зачем: Проверить что Настя правильно определяет Priority после 30+ профилей. Лучше скорректировать сейчас.',
                steps: [
                    'Кира: открыть 10-15 random профилей в Sheets',
                    'Проверить: Priority правильный? Segment корректный? Notes полезные?',
                    'Дать feedback. Если есть ошибки — объяснить.',
                    'Занимает 15 минут, можно в конце дня'
                ],
                subtasks: [{ id: '023-st1', text: 'Review проведён' }, { id: '023-st2', text: 'Feedback дан' }],
                assignee: 'Кира + Настя', estimate: '15 мин', priority: 'high', tags: ['review']
            }
        ]
    },

    // ==========================================
    // WEEK 1, ЧЕТВЕРГ
    // ==========================================
    {
        dayIndex: 6,
        phase: 'Week 1',
        dayLabel: 'Week 1, Четверг',
        title: 'Research finish + Twitter cross-check + competitor research',
        summary: 'Настя завершает batch 2 + проверяет топ профилей в Twitter. Кира собирает жалобы на конкурентов.',
        tasks: [
            {
                id: '024',
                title: '024. Настя: Batch 2 finish + Twitter cross-check топ 15-20 профилей',
                description: 'Зачем: Batch 2 завершает основные LinkedIn запросы. Twitter cross-check: Twitter часто показывает более реальную активность чем LinkedIn. Человек может быть тихий в LinkedIn но очень активный в Twitter.',
                steps: [
                    'Завершить оставшиеся запросы batch 2',
                    'Взять топ 15-20 Priority A из Sheets',
                    'Для каждого: найти Twitter/X аккаунт (часто ссылка в LinkedIn profile)',
                    'Проверить: частота постов, followers, о чём пишут',
                    'Обновить Activity Level в Sheets если нужно (если в Twitter очень активен → повысить)',
                    'В Notes добавить Twitter info',
                    'Цель: 50+ профилей total'
                ],
                subtasks: [
                    { id: '024-st1', text: 'Batch 2 завершён' },
                    { id: '024-st2', text: '15-20 проверены в Twitter' },
                    { id: '024-st3', text: '50+ total в Sheets' }
                ],
                assignee: 'Настя', estimate: '2.5 часа', priority: 'high', tags: ['research']
            },
            {
                id: '025',
                title: '025. Кира: Собрать 10-15 цитат про боль keyword research',
                description: 'Зачем: Реальные слова реальных людей = лучший маркетинговый copy. Эти цитаты используем в будущих постах (Phase 2) и на landing page.',
                steps: [
                    'Искать в LinkedIn: посты с "keyword research" AND "manual" OR "time" OR "hours"',
                    'Искать в Twitter: #SEOtools complaints, "frustrated with" keyword research',
                    'Искать в Reddit: r/SEO "alternative to" OR "better than"',
                    'Записать 10-15 конкретных цитат/жалоб (copy-paste или screenshot)',
                    'Формат: "Quote" — Name, Role — Source (LinkedIn/Twitter/Reddit)',
                    'Это сырьё для постов Phase 2 и для launch post'
                ],
                subtasks: [
                    { id: '025-st1', text: '10-15 цитат собраны' },
                    { id: '025-st2', text: 'Записаны с источником' }
                ],
                assignee: 'Кира', estimate: '1.5 часа', priority: 'medium', tags: ['research', 'content'],
                tip: 'Это золото. Слова реальных людей > любой маркетинговый copy который мы можем придумать.'
            }
        ]
    },

    // ==========================================
    // WEEK 1, ПЯТНИЦА
    // ==========================================
    {
        dayIndex: 7,
        phase: 'Week 1',
        dayLabel: 'Week 1, Пятница',
        title: 'ПОСТ 3 + weekly review + черновики W3-W4',
        summary: 'Кира публикует Пост 3 (Twitter thread + LinkedIn). Настя — weekly metrics. Кира пишет черновики постов 7-12.',
        tasks: [
            {
                id: '026',
                title: '026. Кира: Опубликовать Пост 3 на Twitter (thread)',
                description: 'Зачем: Пост 3 = "The tool stack problem" ($290/мес). Twitter thread формат идеален — числа, факты, короткие tweets.',
                steps: [
                    'Взять текст Поста 3 из Google Doc',
                    'Адаптировать в thread:\n  Tweet 1: "A typical freelance SEO setup:"\n  Tweet 2: "Ahrefs: $129/mo"\n  Tweet 3: "Surfer SEO: $99/mo"\n  Tweet 4: "Screaming Frog: $259/yr"\n  Tweet 5: "Total: $290/month. And you STILL cluster keywords manually in a spreadsheet."\n  Tweet 6: "What\'s your stack? What\'s still manual?"',
                    'Опубликовать thread'
                ],
                subtasks: [{ id: '026-st1', text: 'Twitter thread опубликован' }],
                assignee: 'Кира', estimate: '15 мин', priority: 'high', tags: ['content']
            },
            {
                id: '027',
                title: '027. Кира: Опубликовать Пост 3 на LinkedIn + 2ч engagement',
                description: 'Зачем: Тот же контент адаптирован для LinkedIn (один пост, не thread). Engagement 2 часа.',
                steps: [
                    'Адаптировать Пост 3 для LinkedIn (один текст вместо thread)',
                    'Опубликовать',
                    '2 часа engagement на LinkedIn + Twitter (оба)',
                    'Записать commenters'
                ],
                subtasks: [{ id: '027-st1', text: 'LinkedIn пост' }, { id: '027-st2', text: '2ч engagement' }],
                assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement']
            },
            {
                id: '028',
                title: '028. Настя: Weekly metrics review',
                description: 'Зачем: Каждую пятницу обновляем метрики чтобы понимать прогресс. Без этого не знаем on track мы или нет.',
                steps: [
                    'Открыть вкладку Metrics в Sheets',
                    'Заполнить строку Week 1:\n  — Total profiles: цель 50-80\n  — Priority A / B / C breakdown\n  — Comments Left: 0 (engagement ещё не начался)\n  — Requests Sent: 0\n  — Notes: что сработало, что нет',
                    'Проверить Sources Log: сколько LinkedIn searches использовано из 100 в месяц?',
                    'Проверить статусы заявок в группы (которые подавали в Story 0 День 2)',
                    'Подготовить короткое summary для Киры (2-3 строки в чат)'
                ],
                subtasks: [
                    { id: '028-st1', text: 'Metrics обновлены' },
                    { id: '028-st2', text: '50-80 профилей в базе' },
                    { id: '028-st3', text: 'Группы проверены' },
                    { id: '028-st4', text: 'Summary Кире отправлено' }
                ],
                assignee: 'Настя', estimate: '30 мин', priority: 'high', tags: ['review']
            },
            {
                id: '029',
                title: '029. Кира: Написать ЧЕРНОВИКИ постов 7-12 (Weeks 3-4)',
                description: 'Зачем: Пишем заранее вперёд. Посты 7-9 = Phase 2 (Building in Public — показываем ЧТО строим). Посты 10-12 = Phase 3 (Reveal — раскрываем KORU). Не публикуем — только пишем в документ.',
                steps: [
                    'Открыть Google Doc "KORU Campaign Posts"',
                    'Пост 7 (Week 3, Пн): "Building a keyword engine"\n  "What if you could go from URL → crawl → seed extraction → clustering → page mapping — automatically? We\'re building exactly this. No name yet. But it works."',
                    'Пост 8 (Week 3, Ср): "Topic clusters > keyword lists"\n  Показать mockup/визуализацию кластеров (Кира сделает скриншот или diagram)',
                    'Пост 9 (Week 3, Пт): "From research to action in one platform"\n  Показать pipeline: audit → keywords → brief → task. Масштаб.',
                    'Пост 10 (Week 4, Пн): "Meet KORU"\n  REVEAL бренда. Что это, для кого. Ссылка на landing.',
                    'Пост 11 (Week 4, Ср): "What beta testers are saying"\n  Quotes от beta users (если есть к тому времени)',
                    'Пост 12 (Week 4, Пт): "URL to strategy — live demo"\n  GIF/video 30 сек. Демо в действии.'
                ],
                subtasks: [
                    { id: '029-st1', text: 'Посты 7-12 написаны в документ' }
                ],
                assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content'],
                warning: 'ЧЕРНОВИКИ! Не публиковать. Публикация по графику на Weeks 3-4.'
            }
        ],
        keyMetric: 'Week 1: 50-80 profiles, 3 posts published (LinkedIn + Twitter), 10-15 pain quotes collected, posts 7-12 drafted.'
    },

    // Weeks 2-7 follow same granular pattern...
    // Including key milestone days with same level of detail

    {
        dayIndex: 8, phase: 'Week 2', dayLabel: 'Week 2, Понедельник',
        title: 'ПОСТ 4 (переломный!) + groups research + ПЕРВЫЕ DMs',
        summary: 'Переломный пост: "What if 5 minutes?" Настя: группы. Кира: ПЕРВЫЕ DMs к людям из комментариев.',
        tasks: [
            {
                id: '030',
                title: '030. Кира: Опубликовать Пост 4 на LinkedIn + Twitter',
                description: 'Зачем: ПЕРЕЛОМНЫЙ ПОСТ. Первый раз звучит "5 minutes" и "URL to strategy". Это переход от чистой боли к hints на решение. Должен вызвать "I wish!" и "How?" реакции.',
                steps: [
                    'Скопировать Пост 4 из Google Doc',
                    'Опубликовать на LinkedIn',
                    'Адаптировать и опубликовать на Twitter',
                    'НЕ раскрывать продукт. Если кто-то спросит "How?" — ответить: "Working on it. More soon."'
                ],
                subtasks: [{ id: '030-st1', text: 'LinkedIn' }, { id: '030-st2', text: 'Twitter' }],
                assignee: 'Кира', estimate: '15 мин', priority: 'high', tags: ['content'],
                copyBlocks: [
                    {
                        label: 'Пост 4 для LinkedIn (copy-paste)',
                        text: 'I keep asking myself one question:\n\nWhat if keyword research took 5 minutes instead of 4 hours?\n\nNot a list of keywords to sort through. An actual strategy:\n\n- Paste a URL\n- Get topic clusters automatically grouped by theme\n- See which of your pages already cover each cluster\n- See the gaps -- where you need new content\n- Get a prioritized action plan based on difficulty and opportunity\n\nNot keyword soup. A mapped, clustered, prioritized strategy. From URL to action plan.\n\nIn 5 minutes.\n\nWould that change how you work?\n\n#SEO #KeywordResearch'
                    },
                    {
                        label: 'Пост 4 для Twitter (copy-paste)',
                        text: 'What if keyword research took 5 minutes instead of 4 hours?\n\nNot a list to sort through.\n\nA mapped, clustered, prioritized strategy. From URL to action plan.\n\nWould that change how you work?\n\n#SEO #KeywordResearch'
                    }
                ]
            },
            {
                id: '031',
                title: '031. Кира: 2ч engagement Пост 4',
                description: 'Зачем: Этот пост должен получить БОЛЬШЕ реакций чем предыдущие.',
                steps: [
                    '2 часа engagement на обеих платформах',
                    'ОСОБО записать тех кто написал "I wish!", "How?", "Tell me more" — это HOTTEST leads',
                    'НЕ раскрывать продукт! "Working on it. More soon."'
                ],
                subtasks: [{ id: '031-st1', text: '2ч engagement' }, { id: '031-st2', text: 'Hot leads записаны' }],
                assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['engagement'],
                warning: 'НЕ раскрывать продукт! Интрига = сила. "Working on it. More soon." — максимум.'
            },
            {
                id: '032',
                title: '032. Кира: Отправить ПЕРВЫЕ 3-5 DMs тёплым людям',
                description: 'Зачем: Люди из комментариев к постам 1-4 = самые тёплые leads. Они УЖЕ резонируют с проблемой. Не ждать Week 4 — момент горячий СЕЙЧАС. Цель: beta testers / early feedback.',
                steps: [
                    'Выбрать 3-5 человек которые активно комментировали посты 1-4',
                    'Для каждого — написать DM:\n  "Hey [Name], loved your take on [specific thing from their comment]. I\'m actually building something to solve exactly this — keyword research from URL to strategy in minutes. Would love your input as an early tester. No strings — just want feedback from someone who does this daily. Interested?"',
                    'НЕ pitch. Это приглашение на feedback/beta.',
                    'Записать: кому отправлено, когда, ответили ли'
                ],
                subtasks: [
                    { id: '032-st1', text: '3-5 DMs отправлены' },
                    { id: '032-st2', text: 'Записано кому и когда' }
                ],
                assignee: 'Кира', estimate: '30 мин', priority: 'high', tags: ['outreach'],
                tip: 'DMs СЕЙЧАС, не в Week 4! Тёплые контакты из комментариев = лучшие beta testers.',
                copyBlocks: [{
                    label: 'DM Template: Beta invite (заменить [Name] и [topic])',
                    text: 'Hey [Name],\n\nReally enjoyed your takes on [specific topic from their comments]. Especially the point about [specific thing they said].\n\nI\'m actually building something to solve exactly this -- keyword research from URL to clustered strategy in minutes instead of hours.\n\nWould love your input as an early tester. No strings attached -- just want feedback from someone who actually does this work daily.\n\nInterested?'
                }]
            },
            {
                id: '033',
                title: '033. Настя: LinkedIn groups deep-dive — первые 5 групп + СТАРТ engagement',
                description: 'Зачем: Группы = источник quality prospects. Люди в группах активно обсуждают SEO = они наш ICP. ПЛЮС: с сегодня начинаем ежедневный engagement (3-5 комментариев к постам Priority A).',
                steps: [
                    'Открыть каждую из 5 групп (те где Настя/Кира уже approved):\n  1. SEO Professionals\n  2. Technical SEO\n  3. Search Engine Land\n  4. Digital Marketing\n  5. SEO & SEM Professionals',
                    'В каждой группе:\n  — Найти самые активные discussions за последний месяц\n  — Кто часто комментирует? Кто получает engagement?\n  — Добавить 3-5 активных участников в Sheets\n  — Source: "Group: [название группы]"',
                    'НЕ комментировать в группах пока!',
                    'ENGAGEMENT (отдельно от групп):\n  — Найти 3-5 свежих постов от Priority A людей в LinkedIn feed\n  — Написать thoughtful comment на каждый:\n    "How long does clustering take you per client?" / "Do you use a tool or spreadsheet?"\n  — Записать в tracking: Date | Prospect | Post topic | Comment'
                ],
                subtasks: [
                    { id: '033-st1', text: '5 групп исследованы' },
                    { id: '033-st2', text: '15-20 новых профилей' },
                    { id: '033-st3', text: '3-5 комментариев оставлены (engagement)' }
                ],
                assignee: 'Настя', estimate: '3 часа', priority: 'high', tags: ['research', 'engagement'],
                warning: 'В группах: ТОЛЬКО исследование, не комментировать. Engagement = к ПОСТАМ Priority A в ленте, не в группах.',
                copyBlocks: [
                    {
                        label: 'Комментарий: вопрос про workflow',
                        text: 'How long does the clustering part take you? That\'s always been the biggest time sink for everyone I\'ve talked to -- going from a flat keyword list to organized topic groups.'
                    },
                    {
                        label: 'Комментарий: data point',
                        text: 'This matches what I\'ve been hearing too -- the average I\'ve seen is 3-4 hours per client for keyword research alone. And that\'s before you even write a brief or create tasks.'
                    },
                    {
                        label: 'Комментарий: вопрос про tools',
                        text: 'Do you cluster in a spreadsheet or have you found a tool that actually does it well? Everyone I\'ve talked to is still doing it manually.'
                    },
                    {
                        label: 'Комментарий: personal story',
                        text: 'I watched a consultant do this exact workflow last week -- four tabs open, copy-pasting between Ahrefs, a spreadsheet, Google Docs, and Asana. Three hours. Sound familiar?'
                    },
                    {
                        label: 'Комментарий: ask for specifics',
                        text: 'Curious -- when you say "keyword strategy," what does your actual process look like? Do you start with seed keywords and expand, or analyze competitor content first?'
                    }
                ]
            }
        ]
    },

    // ... continuing with same granularity for remaining weeks
    // Key milestone days included below

    {
        dayIndex: 12, phase: 'Week 2', dayLabel: 'Week 2, Пятница',
        title: 'ПОСТ 6 (первый тизер + landing link!) + weekly review',
        summary: 'ПЕРВЫЙ ТИЗЕР. Первый раз ссылка на landing в комментарии. С этого момента — каждый пост имеет landing link.',
        tasks: [
            {
                id: '040',
                title: '040. Кира: Опубликовать Пост 6 + ПЕРВЫЙ landing link в комментарии',
                description: 'Зачем: Пост 6 = "Building something" тизер. ВПЕРВЫЕ даём link на koru-seo.com в комментарии. Это начало email capture funnel. С этого поста — КАЖДЫЙ следующий пост имеет ссылку.',
                steps: [
                    'Опубликовать Пост 6 на LinkedIn + Twitter',
                    'СРАЗУ после публикации — написать ПЕРВЫЙ КОММЕНТАРИЙ под постом:\n  "If you want to see it when it\'s ready: koru-seo.com"',
                    'На Twitter: добавить ссылку в reply к своему tweet',
                    '2 часа engagement',
                    'ПРАВИЛО: с этого момента КАЖДЫЙ пост = ссылка в первом комментарии'
                ],
                subtasks: [
                    { id: '040-st1', text: 'Пост опубликован' },
                    { id: '040-st2', text: 'Landing link в первом комментарии' },
                    { id: '040-st3', text: '2ч engagement' }
                ],
                assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content'],
                warning: 'С этого момента КАЖДЫЙ пост = landing link в комментарии. Это email capture machine.',
                copyBlocks: [
                    {
                        label: 'Пост 6 для LinkedIn (copy-paste)',
                        text: 'We talked to 30 SEO professionals over the last three months.\n\nThe top 3 time sinks they mentioned:\n\n1. Keyword clustering -- still done manually in spreadsheets\n2. Content brief creation -- still done manually in Google Docs\n3. Translating audit findings into actual tasks -- still done by hand\n\nThree workflows. All manual. All taking hours every week.\n\nWe\'re building something to change this.\n\nMore soon.\n\n#SEO #BuildInPublic'
                    },
                    {
                        label: 'ПЕРВЫЙ КОММЕНТАРИЙ (сразу после публикации)',
                        text: 'If you want to see it when it\'s ready: koru-seo.com'
                    },
                    {
                        label: 'Пост 6 для Twitter (copy-paste)',
                        text: 'We talked to 30 SEO professionals.\n\nTop 3 time sinks:\n1. Keyword clustering (manual)\n2. Content brief creation (manual)\n3. Audit-to-action translation (manual)\n\nWe\'re building something to change this.\n\nMore soon.\n\n#SEO #BuildInPublic'
                    }
                ]
            },
            {
                id: '041',
                title: '041. Настя: Weekly review Week 2',
                description: 'Зачем: Еженедельные метрики.',
                steps: [
                    'Metrics: target 120-180 total',
                    'Engagement tracking: сколько комментариев за неделю, какие реакции',
                    'Группы: статусы обновлены?',
                    'Summary Кире'
                ],
                subtasks: [
                    { id: '041-st1', text: '120-180 total' },
                    { id: '041-st2', text: 'Engagement stats' }
                ],
                assignee: 'Настя', estimate: '30 мин', priority: 'high', tags: ['review']
            }
        ],
        keyMetric: 'Week 2: 120-180 profiles, 3-5 beta DMs sent, engagement active (15-25 comments), email capture started'
    },

    {
        dayIndex: 13, phase: 'Week 3', dayLabel: 'Week 3, Понедельник',
        title: 'HEADLINE CHANGE + ПОСТ 7 "Building a keyword engine"',
        summary: 'Headline меняется! Пост 7 = первый Building in Public. Показываем ЧТО строим.',
        tasks: [
            {
                id: '042',
                title: '042. Кира: Сменить LinkedIn headline на stealth mode',
                description: 'Зачем: Переход к фазе Building in Public. Headline теперь говорит про продукт (без бренда). Смена headline создаёт "career update" notification у всех connections — бесплатная волна внимания!',
                steps: [
                    'LinkedIn → Edit Profile',
                    'Headline: "Building a tool that turns a URL into a keyword strategy in 5 minutes | In stealth"',
                    'Featured section: добавить link на koru-seo.com',
                    'НЕ менять Experience (KORU будет добавлен позже)'
                ],
                subtasks: [
                    { id: '042-st1', text: 'Headline обновлён' },
                    { id: '042-st2', text: 'Featured: landing link' }
                ],
                assignee: 'Кира', estimate: '10 мин', priority: 'high', tags: ['branding'],
                tip: 'Career update notification = бесплатный reach! Все connections увидят "Кира обновила headline".'
            },
            {
                id: '043',
                title: '043. Кира: Опубликовать Пост 7 + 2ч engagement + DMs',
                description: 'Зачем: Первый Building in Public пост. Показываем pipeline: URL → clusters → mapping.',
                steps: [
                    'Пост 7 на LinkedIn + Twitter',
                    'Landing link в первом комментарии',
                    '2ч engagement',
                    'DMs к 2-3 новым тёплым людям (из свежих комментариев)'
                ],
                subtasks: [
                    { id: '043-st1', text: 'Пост 7 published' },
                    { id: '043-st2', text: 'Landing link' },
                    { id: '043-st3', text: '2ч engagement' },
                    { id: '043-st4', text: '2-3 DMs' }
                ],
                assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'outreach'],
                copyBlocks: [
                    {
                        label: 'Пост 7 для LinkedIn (copy-paste)',
                        text: 'What if there was a keyword engine that works like this:\n\n1. You paste a URL\n2. It crawls your site automatically\n3. It extracts seed keywords from your content\n4. It expands them into hundreds of related terms\n5. It classifies each keyword by search intent\n6. It filters out irrelevant noise\n7. It clusters everything into topic groups\n8. It maps clusters to your existing pages\n9. It identifies the gaps\n10. It gives you a prioritized action plan\n\nAll in one pipeline. Automatically. In minutes.\n\nNo spreadsheets. No copy-pasting between tools. No manual clustering.\n\nWe\'re building exactly this. No name yet. But it works.\n\nAnd yes -- it handles step 7 (clustering) automatically. That\'s the part everyone still does by hand.\n\n#BuildInPublic #SEO #KeywordResearch'
                    },
                    {
                        label: 'Первый комментарий (landing link)',
                        text: 'Want early access? koru-seo.com'
                    },
                    {
                        label: 'DM Template: beta invite (заменить [Name], [topic])',
                        text: 'Hey [Name],\n\nYour comment on my post about [topic] was spot on. I\'m actually building the exact tool I described -- keyword research from URL to strategy in minutes.\n\nWould love to get your take on it. Can I give you early access? 15 minutes of your time, and I\'d genuinely value your feedback.\n\nNo pressure either way!'
                    }
                ]
            },
            {
                id: '044',
                title: '044. Настя: G2/Capterra reviewers research + engagement',
                description: 'Зачем: Люди которые оставляют reviews на Ahrefs/SEMrush = proven buyers SEO tools. Самые качественные leads.',
                steps: [
                    'G2.com: страницы Ahrefs, SEMrush, Screaming Frog, Surfer SEO, Sitebulb',
                    'Для каждого: посмотреть recent reviews (6 мес) → кликнуть на reviewer → LinkedIn → Sheets',
                    'Notes: "Reviewed [Tool] on G2"',
                    'Capterra: тот же процесс',
                    'Engagement: 3-5 комментариев к постам Priority A'
                ],
                subtasks: [
                    { id: '044-st1', text: 'G2/Capterra: 5 tools' },
                    { id: '044-st2', text: 'Engagement: 3-5 comments' }
                ],
                assignee: 'Настя', estimate: '3 часа', priority: 'high', tags: ['research', 'engagement']
            }
        ]
    },

    {
        dayIndex: 17, phase: 'Week 3', dayLabel: 'Week 3, Пятница',
        title: 'ПОСТ 9 + final review Priority A + prepare outreach',
        summary: 'Пост 9 (pipeline post). Кира лично ревьюит КАЖДЫЙ Priority A. Подготовка к Week 4 outreach.',
        tasks: [
            {
                id: '050',
                title: '050. Кира: Пост 9 + engagement',
                description: 'Зачем: Последний Building in Public пост перед reveal. Показываем масштаб: audit → keywords → brief → task.',
                steps: ['Пост 9 на LinkedIn + Twitter', 'Landing link', '2ч engagement', 'DMs к hot leads'],
                subtasks: [{ id: '050-st1', text: 'Пост 9 + engagement + DMs' }],
                assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'outreach']
            },
            {
                id: '051',
                title: '051. Кира: Final review ВСЕХ Priority A профилей',
                description: 'Зачем: На следующей неделе Настя начнёт отправлять connection requests этим людям. Кира должна ЛИЧНО подтвердить каждого. Ошибка тут = впустую потраченные requests.',
                steps: [
                    'Sheets → фильтр Priority A',
                    'Для каждого профиля:\n  — Открыть LinkedIn\n  — Подтвердить или изменить Priority\n  — Записать: чем персонализировать connection request? (recent post, conference, group, etc.)',
                    'Финал: 40-60 Priority A подтверждено',
                    'Feedback Насте по ошибкам'
                ],
                subtasks: [
                    { id: '051-st1', text: 'Все Priority A проверены' },
                    { id: '051-st2', text: '40-60 подтверждено' },
                    { id: '051-st3', text: 'Personalization notes для каждого' }
                ],
                assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['review']
            },
            {
                id: '052',
                title: '052. Настя: Weekly review + подготовить connection templates',
                description: 'Зачем: На Week 4 начинаем outreach. Templates должны быть готовы ЗАРАНЕЕ.',
                steps: [
                    'Metrics: target 200-300 total, 40-60 A, 80-120 B',
                    'Подготовить 3 connection request templates (< 300 символов каждый):\n  Template 1 (для тех кто комментировал): "Hi [Name], your post about [topic] resonated with me. I\'m building [tool name when revealed] — turns a URL into a full keyword strategy. Would love to connect."\n  Template 2 (для agency owners): "Hi [Name], I\'ve been following [Agency]. We\'re building something to cut keyword research from hours to minutes. Would be great to connect."\n  Template 3 (для conference speakers): "Hi [Name], your talk at [Conference] on [topic] was excellent. Working in the same space — would love to connect."',
                    'Engagement: 3-5 comments'
                ],
                subtasks: [
                    { id: '052-st1', text: 'Metrics: 200-300 total' },
                    { id: '052-st2', text: '3 templates готовы' },
                    { id: '052-st3', text: 'Engagement done' }
                ],
                assignee: 'Настя', estimate: '1.5 часа', priority: 'high', tags: ['review', 'outreach']
            }
        ],
        keyMetric: 'Week 3: 200-300 profiles, 40-60 Priority A confirmed, beta testers using product, templates ready'
    },

    {
        dayIndex: 18, phase: 'Week 4', dayLabel: 'Week 4, Понедельник',
        title: 'REVEAL KORU + ПОСТ 10 + OUTREACH START',
        summary: 'Бренд KORU раскрыт! Headline финальный. Пост 10 "Meet KORU". Настя начинает connection requests.',
        tasks: [
            {
                id: '053',
                title: '053. Кира: Финальный headline + Experience update',
                description: 'Зачем: REVEAL. Бренд KORU теперь публичный. Headline = финальный positioning.',
                steps: [
                    'Headline: "Founder & CEO at KORU | From URL to SEO strategy in 5 minutes"',
                    'Experience: добавить "CEO at KORU" как current position',
                    'Company Page KORU: обновить About с полным positioning'
                ],
                subtasks: [{ id: '053-st1', text: 'Headline final' }, { id: '053-st2', text: 'Experience updated' }],
                assignee: 'Кира', estimate: '15 мин', priority: 'high', tags: ['branding']
            },
            {
                id: '054',
                title: '054. Кира: Пост 10 "Meet KORU" + engagement + DMs',
                description: 'Зачем: Самый важный пост до launch. Раскрываем ЧТО, для КОГО, КАК работает. Ссылка на landing.',
                steps: ['Пост 10 LinkedIn + Twitter', 'Landing link', '2ч engagement', 'DMs к hot leads'],
                subtasks: [{ id: '054-st1', text: 'Reveal post published' }, { id: '054-st2', text: 'Engagement + DMs' }],
                assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'outreach'],
                copyBlocks: [
                    {
                        label: 'Пост 10 "Meet KORU" для LinkedIn (copy-paste)',
                        text: 'It\'s time.\n\nFor the last three months, we\'ve been building a tool for SEO freelancers and small agencies who are tired of spending hours on keyword research.\n\nIt\'s called KORU.\n\nHere\'s what it does:\n\n-> Paste any URL\n-> Get topic clusters automatically (not keyword lists -- clusters)\n-> See which pages already cover each topic\n-> See the gaps -- where you need new content\n-> Generate content briefs in one click\n-> Turn everything into tasks for your team\n\nFrom URL to keyword strategy in 5 minutes. Not 4 hours.\n\nWe built this because every SEO professional we talked to said the same thing: "The tools give me data. I need strategy."\n\nKORU gives you strategy.\n\nEarly access is open: koru-seo.com\n\n#KORU #SEO #KeywordResearch #LaunchingSoon'
                    },
                    {
                        label: 'Первый комментарий',
                        text: 'Try it free: koru-seo.com'
                    },
                    {
                        label: 'Пост 10 для Twitter (copy-paste)',
                        text: 'Meet KORU.\n\nPaste a URL. Get topic clusters, page mapping, content briefs. Automatically.\n\nFrom URL to keyword strategy in 5 minutes.\n\nBuilt for SEO freelancers and small agencies who are tired of spending hours on keyword research.\n\nEarly access: koru-seo.com\n\n#KORU #SEO'
                    }
                ]
            },
            {
                id: '055',
                title: '055. Настя: ПЕРВЫЕ connection requests (8-10 штук)',
                description: 'Зачем: Начинаем строить network. 8-10 в день (реалистично, качественно). КАЖДЫЙ request персонализирован — reference что-то конкретное о человеке.',
                steps: [
                    'Выбрать 8-10 Priority A с: highest Activity Level + те кто получил engagement от нас',
                    'Для каждого:\n  1. Открыть профиль (30 сек)\n  2. Посмотреть recent post или bio\n  3. Выбрать template 1/2/3\n  4. Персонализировать (заменить [Name], [topic], [specific detail])\n  5. Отправить\n  6. Записать: Date | Name | Template | Status',
                    'КРИТИЧНО: НЕ generic! "I\'d like to add you to my network" = мусор. Reference что-то конкретное.',
                    'Engagement: 3-5 comments к постам'
                ],
                subtasks: [
                    { id: '055-st1', text: '8-10 requests отправлены' },
                    { id: '055-st2', text: 'Каждый персонализирован' },
                    { id: '055-st3', text: 'Tracking обновлён' },
                    { id: '055-st4', text: 'Engagement: 3-5 comments' }
                ],
                assignee: 'Настя', estimate: '2 часа', priority: 'high', tags: ['outreach', 'engagement'],
                warning: '30 секунд на профиль ПЕРЕД отправкой. Без этого = generic spam = low acceptance rate.',
                copyBlocks: [
                    {
                        label: 'Connection Request: для тех кто получил engagement (заменить [Name], [topic])',
                        text: 'Hi [Name], your recent post about [specific topic] really hit home. I\'m building KORU -- turns a URL into a full keyword strategy automatically. Would love to connect and share what we\'re doing.'
                    },
                    {
                        label: 'Connection Request: для agency owners (заменить [Name], [Agency], [specific])',
                        text: 'Hi [Name], I\'ve been following [Agency Name]\'s work -- impressed by your approach to [something specific]. We\'re building KORU to cut keyword research from hours to minutes. Would be great to connect.'
                    },
                    {
                        label: 'Connection Request: для conference speakers (заменить [Name], [Conference], [topic], [detail])',
                        text: 'Hi [Name], your talk at [Conference] about [topic] was excellent -- especially [specific detail]. Building in the same space. Would love to connect.'
                    }
                ]
            }
        ]
    },

    {
        dayIndex: 22, phase: 'Week 4', dayLabel: 'Week 4, Пятница',
        title: 'ПОСТ 12 (demo!) + GO/NO-GO review',
        summary: 'Пост с demo GIF. Критический review: acceptance rate определяет Week 5.',
        tasks: [
            {
                id: '060',
                title: '060. Кира: Записать demo GIF/video (30 сек)',
                description: 'Зачем: Показать продукт в действии. 30 секунд: вставить URL → keywords появляются → clusters → brief. Это самый мощный content asset кампании.',
                steps: [
                    'Открыть KORU (production или demo env)',
                    'Записать screen recording: URL paste → analysis → clusters → brief',
                    'Обрезать до 30 сек. Без звука. Subtitle если нужно.',
                    'Формат: GIF (для LinkedIn/Twitter) + MP4 (backup)'
                ],
                subtasks: [{ id: '060-st1', text: 'Demo записан (30 сек GIF)' }],
                assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['content']
            },
            {
                id: '061',
                title: '061. Кира: Пост 12 "Live demo" + engagement',
                description: 'Зачем: Пост с demo = highest engagement потенциал. Люди видят реальный продукт.',
                steps: ['Пост 12 + demo GIF + landing link', '2ч engagement', 'DMs к тем кто пишет "How do I try this?"'],
                subtasks: [{ id: '061-st1', text: 'Demo post + engagement' }],
                assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'outreach']
            },
            {
                id: '062',
                title: '062. Кира + Настя: GO/NO-GO review для Week 5',
                description: 'Зачем: Acceptance rate определяет продолжаем ли outreach или fix approach.',
                steps: [
                    'Total Priority A requests: target 30-40',
                    'Acceptance rate:\n  50%+ = отлично\n  30-50% = хорошо, continue\n  20-30% = review templates\n  <20% = STOP outreach, fix everything',
                    'Beta testers: сколько пользуются? Есть testimonials?',
                    'Email signups: сколько?',
                    'Ретро: какие templates работают лучше?'
                ],
                subtasks: [
                    { id: '062-st1', text: '30-40 requests sent' },
                    { id: '062-st2', text: 'Acceptance >= 25%' },
                    { id: '062-st3', text: '2+ testimonials' }
                ],
                assignee: 'Кира + Настя', estimate: '1 час', priority: 'high', tags: ['review'],
                warning: 'Acceptance < 20% = STOP. Не переходить к Week 5.'
            }
        ],
        keyMetric: 'Week 4: 30-40 Priority A requests, acceptance >= 25%, demo published, 2+ testimonials'
    },

    {
        dayIndex: 27, phase: 'Week 5', dayLabel: 'Week 5, Пятница',
        title: 'Pre-launch FINAL check',
        summary: 'Всё проверяем. Launch через выходные.',
        tasks: [
            {
                id: '070',
                title: '070. Кира: Pre-launch checklist — КАЖДЫЙ пункт',
                description: 'Зачем: Launch = один шанс. Checklist = ничего не забыть.',
                steps: [
                    'Launch post: написан? reviewed? demo GIF вставлен?',
                    'Beta tester testimonials: 2-3 готовы? (copy-pasted в пост)',
                    'Landing page: работает? email capture OK?',
                    'Email waitlist draft: "We launched!" email написан?',
                    'Beta testers notified: "We launch Tuesday — comment in first 30 min please"?',
                    'Product: stable? demo-ready? (Макс подтвердил)',
                    'Twitter: launch post адаптирован?',
                    'Team sync: Настя знает что делать в launch day?'
                ],
                subtasks: [
                    { id: '070-st1', text: 'Launch post final' },
                    { id: '070-st2', text: 'Testimonials ready' },
                    { id: '070-st3', text: 'Landing OK' },
                    { id: '070-st4', text: 'Email draft ready' },
                    { id: '070-st5', text: 'Beta testers notified' },
                    { id: '070-st6', text: 'Product stable (Макс ОК)' },
                    { id: '070-st7', text: 'ALL SYSTEMS GO' }
                ],
                assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['planning']
            }
        ],
        keyMetric: 'Everything ready. No last-minute surprises.'
    },

    {
        dayIndex: 29, phase: 'Week 6', dayLabel: 'Week 6, Вторник',
        title: 'LAUNCH DAY!',
        summary: 'THE DAY. 9:00 AM пост. Beta testers комментируют первые. Кира online весь день.',
        tasks: [
            {
                id: '075',
                title: '075. Кира: 9:00 AM — Опубликовать launch post на LinkedIn',
                description: 'Зачем: LAUNCH. Пост должен быть опубликован утром (9 AM EST = peak LinkedIn). Структура: hook → problem → solution → social proof → demo → CTA.',
                steps: [
                    'РОВНО в 9:00 AM EST опубликовать launch post:',
                    'Hook: "4 hours → 5 minutes" (callback к Посту 1 из Week 1)',
                    'Problem: "Keyword research is broken. Tools give lists, not strategies."',
                    'Solution: "KORU: paste a URL, get topic clusters, page mapping, content briefs. Automatically."',
                    'Social proof: 2-3 beta tester quotes',
                    'Demo: вставить GIF (30 сек)',
                    'CTA: "Try it free at koru-seo.com"',
                    'Landing link в первом комментарии (как обычно)'
                ],
                subtasks: [{ id: '075-st1', text: 'Launch post live на LinkedIn' }],
                assignee: 'Кира', estimate: '5 мин', priority: 'high', tags: ['content'],
                copyBlocks: [
                    {
                        label: 'LAUNCH POST для LinkedIn (copy-paste) — ЗАМЕНИТЬ [quotes] и приложить GIF',
                        text: 'Remember when I asked how long keyword research takes?\n\nThe answer was 3-4 hours per client. 40 hours a month. Spreadsheets. Manual clustering. Copy-pasting between four tools.\n\nToday, that changes.\n\nMeet KORU.\n\nPaste a URL. Get:\n-> Topic clusters (not keyword lists -- actual clusters)\n-> Page mapping (which pages cover what)\n-> Content gaps (what\'s missing)\n-> Content briefs (one click)\n-> Tasks for your team (another click)\n\nFrom URL to keyword strategy in 5 minutes.\n\nHere\'s what beta testers said:\n\n"[QUOTE 1 -- replace with real beta tester quote]"\n-- [Name], [Role]\n\n"[QUOTE 2 -- replace]"\n-- [Name], [Role]\n\n[ATTACH DEMO GIF HERE]\n\nWe built this because every SEO professional told us: "The tools give me data. I need strategy."\n\nKORU gives you strategy.\n\nTry it free: koru-seo.com\n\n#KORU #SEO #KeywordResearch #Launch'
                    },
                    {
                        label: 'Первый комментарий',
                        text: 'Try it free: koru-seo.com\n\nHappy to answer any questions below!'
                    }
                ]
            },
            {
                id: '076',
                title: '076. Кира: 9:05 AM — Опубликовать launch post на Twitter',
                description: 'Зачем: Twitter mirror. Другая аудитория.',
                steps: ['Скопировать текст ниже → опубликовать как thread'],
                subtasks: [{ id: '076-st1', text: 'Twitter launch live' }],
                assignee: 'Кира', estimate: '5 мин', priority: 'high', tags: ['content'],
                copyBlocks: [{
                    label: 'Launch Twitter thread (copy-paste)',
                    text: '1/ We launched KORU today.\n\nPaste a URL. Get a keyword strategy in 5 minutes.\n\nNot a keyword list. A strategy: topic clusters, page mapping, content gaps, briefs.\n\n2/ We built this because every SEO professional we talked to said the same thing:\n\n"I spend 3-4 hours on keyword research per client. The tools give data, not strategy."\n\n3/ KORU does what you do manually:\n- Clusters keywords by topic\n- Maps them to your existing pages\n- Identifies gaps\n- Generates content briefs\n- Creates tasks\n\nAutomatically. In minutes.\n\n4/ Try it free: koru-seo.com\n\n#KORU #SEO #Launch'
                }]
            },
            {
                id: '077',
                title: '077. Кира: 9:00-11:00 — 2 ЧАСА отвечать на КАЖДЫЙ комментарий',
                description: 'Зачем: Алгоритм LinkedIn решает в первые 2 часа. Beta testers комментируют в первые 30 мин (pre-arranged). Каждый ответ Киры = signal алгоритму + social proof. Это САМЫЕ важные 2 часа кампании.',
                steps: [
                    'Быть на LinkedIn и Twitter одновременно',
                    'КАЖДЫЙ комментарий = ответ. Content-rich, не "Thanks!"',
                    'Лайкать каждый комментарий',
                    'Записать кто комментирует — обновить Status в Sheets',
                    'Если кто-то спрашивает "How?" — отправить DM с landing link'
                ],
                subtasks: [
                    { id: '077-st1', text: '2 часа non-stop engagement' },
                    { id: '077-st2', text: 'Все комментарии отвечены' }
                ],
                assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['engagement'],
                warning: 'ЭТО САМЫЕ ВАЖНЫЕ 2 ЧАСА ВСЕЙ КАМПАНИИ. Телефон в silent. Никаких отвлечений.'
            },
            {
                id: '078',
                title: '078. Кира: 10:00 AM — Отправить email waitlist "We launched!"',
                description: 'Зачем: Люди которые подписались на landing page ждут этот email. Отправляем через 1 час после поста — чтобы пост уже набрал momentum.',
                steps: [
                    'Зайти в email service (Mailchimp/ConvertKit)',
                    'Отправить заготовленный email:\n  Subject: "KORU is live — try it free"\n  Body: короткое описание + link на signup/landing'
                ],
                subtasks: [{ id: '078-st1', text: 'Email отправлен' }],
                assignee: 'Кира', estimate: '5 мин', priority: 'high', tags: ['outreach']
            },
            {
                id: '079',
                title: '079. Настя: Track reactions + update Sheets',
                description: 'Зачем: Знать кто из нашей базы реагирует на launch.',
                steps: [
                    'Мониторить весь день: кто из Sheets лайкнул / прокомментировал / зашёл на landing',
                    'Обновить Status: Researched → Engaged',
                    '5-7 комментариев к постам connections (amplify)',
                    'Записать все метрики: impressions, likes, comments, shares'
                ],
                subtasks: [
                    { id: '079-st1', text: 'Reactions tracked' },
                    { id: '079-st2', text: 'Sheets updated' },
                    { id: '079-st3', text: 'Metrics записаны' }
                ],
                assignee: 'Настя', estimate: '2 часа', priority: 'high', tags: ['monitoring']
            }
        ]
    },

    {
        dayIndex: 32, phase: 'Week 6', dayLabel: 'Week 6, Пятница',
        title: 'Launch week review',
        summary: 'Полный обзор. Метрики. Ретроспектива. Plan Week 7+.',
        tasks: [
            {
                id: '085',
                title: '085. Кира + Настя: Launch Week Review',
                description: 'Зачем: Понять результаты. Что сработало. Что дальше.',
                steps: [
                    'Собрать ВСЕ метрики:\n  — Launch post: impressions, likes, comments, shares\n  — Profile views за неделю\n  — Email signups total\n  — Landing visits\n  — Product signups\n  — DM conversations\n  — Demo calls booked',
                    'Ретро:\n  — Что дало больше всего signups? (пост? DMs? email?)\n  — Какие connection requests сработали лучше?\n  — Что бы сделали по-другому?',
                    'Week 7+ план:\n  — Priority C outreach (Настя)\n  — Convert engaged → users (Кира)\n  — Regular content 2 поста/неделю\n  — Demo calls с interested leads'
                ],
                subtasks: [
                    { id: '085-st1', text: 'All metrics compiled' },
                    { id: '085-st2', text: 'Retro done' },
                    { id: '085-st3', text: 'Week 7+ plan' }
                ],
                assignee: 'Кира + Настя', estimate: '1.5 часа', priority: 'high', tags: ['review']
            }
        ],
        keyMetric: 'THE metrics: signups, demo calls, paying users. Everything else is vanity.'
    },

    {
        dayIndex: 33, phase: 'Week 7+', dayLabel: 'Week 7+',
        title: 'Post-launch: convert engagement → users',
        summary: 'Настя: Priority C outreach. Кира: convert engaged connections into paying users.',
        tasks: [
            {
                id: '090',
                title: '090. Настя: Priority C outreach (10-15/день) + ongoing engagement',
                description: 'Зачем: Social proof после launch. Outreach теперь проще — есть product, есть testimonials.',
                steps: [
                    '10-15 requests в день. Templates: mention launch, link to demo post.',
                    'Ongoing: 5-7 comments в день',
                    'Track acceptance + signups from new connections'
                ],
                subtasks: [{ id: '090-st1', text: 'Priority C active' }],
                assignee: 'Настя', estimate: '2 часа/день', priority: 'medium', tags: ['outreach']
            },
            {
                id: '091',
                title: '091. Кира: DMs к ВСЕМ "Engaged" + demo calls + regular content',
                description: 'Зачем: Engagement без конверсии = vanity metrics. Каждый "Engaged" в Sheets = потенциальный paying user.',
                steps: [
                    'Sheets → фильтр Status = "Engaged"',
                    'Каждому DM: "Thanks for checking out KORU! Happy to do a quick walkthrough if you want to see it in action — just let me know."',
                    'Demo calls: 15-20 мин каждый. Show pipeline. Answer questions.',
                    'Content: 2 поста в неделю:\n  — User stories (когда появятся)\n  — Product updates\n  — SEO insights (использовать данные KORU)',
                    'Twitter: продолжать engagement + cross-post'
                ],
                subtasks: [
                    { id: '091-st1', text: 'DMs to all Engaged' },
                    { id: '091-st2', text: 'Demo calls scheduled' },
                    { id: '091-st3', text: 'Regular content started' }
                ],
                assignee: 'Кира', estimate: '2-3 часа/день', priority: 'high', tags: ['outreach', 'content']
            }
        ],
        keyMetric: 'Week 7+: convert engagement → signups → paying users. Revenue starts here.'
    }
]

export const TOTAL_CAMPAIGN_DAYS = CAMPAIGN_DAYS.length
