import type { CampaignDay } from './campaignData.types'

export const CAMPAIGN_DAYS: CampaignDay[] = [
    // ==========================================
    // STORY 0 (3 дня)
    // ==========================================
    {
        dayIndex: 0, phase: 'Story 0', dayLabel: 'Story 0, День 1',
        title: 'Positioning + инфраструктура + аккаунты',
        summary: 'Фиксируем messaging, создаём Sheets, оптимизируем LinkedIn, создаём Twitter. Макс начинает landing.',
        tasks: [
            { id: '001', title: '001. Кира: Написать и зафиксировать core positioning', description: 'Зачем: Фундамент всей кампании. Без этого посты и комментарии будут "от балды".', steps: ['Создать документ "KORU Positioning"', 'Записать core message, positioning statement, "что говорим / не говорим"', 'Расшарить с командой'], subtasks: [{ id: '001-st1', text: 'Core message записан' }, { id: '001-st2', text: 'Расшарено с командой' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['planning'], copyBlocks: [{ label: 'Core Message', text: 'From URL to keyword strategy in 5 minutes.\nTopic clusters, priority scoring, page mapping, content briefs — one click.\n4 hours of manual work, automated.' }, { label: 'Positioning Statement', text: 'KORU — для SEO-фрилансеров и небольших агентств, которые тратят часы на ручной keyword research. В отличие от Ahrefs/Semrush которые дают данные, KORU даёт готовую стратегию.' }] },
            { id: '002', title: '002. Кира: Обновить LinkedIn профиль', description: 'Зачем: Первое что увидит prospect. Headline строится на БОЛИ клиента.', steps: ['Headline: см. текст ниже', 'About: см. текст ниже', 'Photo: профессиональное. Cover: тёмный.', 'Проверить: нигде нет "KORU"'], subtasks: [{ id: '002-st1', text: 'Headline обновлён' }, { id: '002-st2', text: 'About обновлён' }, { id: '002-st3', text: 'Нет упоминаний KORU' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['linkedin', 'branding'], copyBlocks: [{ label: 'Headline (copy-paste в LinkedIn)', text: 'SEO professionals spend 4 hours on keyword research. I\'m fixing that.' }, { label: 'About (copy-paste в LinkedIn)', text: 'I spent the last 6 months talking to SEO freelancers and agency owners. Every single one told me the same thing: keyword research takes forever, and the tools give data but not answers.\n\nI keep asking one question: what if you could go from a URL to a full keyword strategy in 5 minutes? Not a list of keywords — a clustered, prioritized, mapped-to-pages plan.\n\nBuilding something. More soon.' }] },
            { id: '003', title: '003. Кира: Создать Twitter/X аккаунт', description: 'Зачем: SEO-сообщество активно в Twitter. Второй канал.', steps: ['Sign up на twitter.com', 'Bio: см. ниже', 'Подписаться на 20-30 SEO-людей: Lily Ray, Aleyda Solis, John Mueller, Barry Schwartz, Kevin Indig', 'НЕ постить пока — неделя listening'], subtasks: [{ id: '003-st1', text: 'Аккаунт создан' }, { id: '003-st2', text: 'Подписки 20-30' }], assignee: 'Кира', estimate: '30 мин', priority: 'high', tags: ['setup'], copyBlocks: [{ label: 'Twitter Bio (copy-paste)', text: 'Building a tool that turns URLs into keyword strategies. SEO should take 5 minutes, not 4 hours.' }] },
            { id: '004', title: '004. Настя: Создать Google Sheets', description: 'Зачем: Основная таблица для всех prospects. Используется каждый день.', steps: ['Создать "KORU Prospects — 2026"', '14 колонок + data validation + conditional formatting', 'Вкладки Metrics + Sources Log', 'Расшарить команде'], subtasks: [{ id: '004-st1', text: 'Sheet создан' }, { id: '004-st2', text: 'Validation + formatting' }, { id: '004-st3', text: 'Доступ расшарен' }], assignee: 'Настя', estimate: '1 час', priority: 'high', tags: ['setup'] },
            { id: '005', title: '005. Макс: Landing page koru-seo.com', description: 'Зачем: Email capture. Когда prospect кликнет website — не 404.', steps: ['Тёмная тема, #0d1117 + #3fb68e', 'Текст: см. ниже', 'Email capture + "Notify me"', 'НЕТ скриншотов, фич, цен'], subtasks: [{ id: '005-st1', text: 'Landing live' }, { id: '005-st2', text: 'Email capture работает' }], assignee: 'Макс', estimate: '1 день', priority: 'high', tags: ['landing'], copyBlocks: [{ label: 'Landing page copy', text: 'H1: Stop researching. Start strategizing.\n\nSubheadline: From URL to keyword strategy. In minutes, not hours.\n\nCTA: Get early access\n[Email input] [Notify me]' }] }
        ]
    },
    {
        dayIndex: 1, phase: 'Story 0', dayLabel: 'Story 0, День 2',
        title: 'Группы + Onboarding + Company Page',
        summary: 'LinkedIn группы, onboarding Насти (новый ICP — 3 сегмента), Company Page в stealth.',
        tasks: [
            { id: '006', title: '006. Настя: Подать заявки в 10 LinkedIn групп (Кира)', description: 'Зачем: Группы = источник prospects на Week 2. Апрувят медленно → подаём сейчас.', steps: ['LinkedIn аккаунт Киры → Groups → Discover', '10 групп: SEO Professionals, Technical SEO, Search Engine Land, Digital Marketing, SEO & SEM Professionals, Content Marketing & SEO, Agency Growth & Scaling, Moz Community, SEO for Startups, International SEO', 'Записать статусы в Sources Log'], subtasks: [{ id: '006-st1', text: '10 заявок подано (Кира)' }, { id: '006-st2', text: 'Sources Log' }], assignee: 'Настя', estimate: '30 мин', priority: 'high', tags: ['setup', 'linkedin'] },
            { id: '007', title: '007. Настя: Подать заявки в 10 групп (Настя)', description: 'Зачем: Два аккаунта = больше видимости.', steps: ['Те же 10 групп, аккаунт Насти', 'Sources Log'], subtasks: [{ id: '007-st1', text: '10 заявок (Настя)' }], assignee: 'Настя', estimate: '20 мин', priority: 'high', tags: ['setup', 'linkedin'] },
            { id: '008', title: '008. Кира + Настя: Onboarding — новый ICP + messaging', description: 'Зачем: Настя каждый день ищет людей и пишет комменты. Без понимания ICP — будет ошибаться.', steps: ['Созвон 1.5 часа', '3 сегмента ICP: Freelance SEO / Small Agency 3-15 / In-House Manager', 'Priority A/B/C по новым критериям', 'Тон комментов: sharp вопросы, не "Great post!"', 'Разбор 5 живых профилей + 3 постов'], subtasks: [{ id: '008-st1', text: 'Созвон проведён' }, { id: '008-st2', text: 'ICP ясен' }, { id: '008-st3', text: 'Тон понятен' }], assignee: 'Кира + Настя', estimate: '1.5 часа', priority: 'high', tags: ['onboarding'] },
            { id: '009', title: '009. Кира: LinkedIn Company Page (soft stealth)', description: 'Зачем: Доверие. Без деталей продукта.', steps: ['KORU | Software Development | 2-10', 'About: "Rethinking how SEO professionals do keyword research. Launching 2026."', 'НЕ добавлять KORU в Experience пока'], subtasks: [{ id: '009-st1', text: 'Company Page создана' }], assignee: 'Кира', estimate: '45 мин', priority: 'medium', tags: ['linkedin', 'branding'] }
        ]
    },
    {
        dayIndex: 2, phase: 'Story 0', dayLabel: 'Story 0, День 3',
        title: 'Тестовый прогон + написать посты + график',
        summary: 'Настя — тест 5 профилей. Кира — черновики 6 постов. График с Максом.',
        tasks: [
            { id: '010', title: '010. Настя: Найти 5 тестовых профилей', description: 'Зачем: Quality gate. Проверяем понимание нового ICP.', steps: ['"SEO consultant" AND "freelance" → 5 Priority A', 'Все 14 колонок + reasoning в Notes', 'Сообщить Кире'], subtasks: [{ id: '010-st1', text: '5 профилей добавлены' }, { id: '010-st2', text: 'Кире сообщено' }], assignee: 'Настя', estimate: '50 мин', priority: 'high', tags: ['review'] },
            { id: '011', title: '011. Кира: Ревью 5 профилей Насти', description: 'Зачем: 4+ из 5 правильные = go.', steps: ['Открыть каждый → Priority OK? Segment OK? Notes?', 'Feedback Насте'], subtasks: [{ id: '011-st1', text: '4+ из 5 OK' }, { id: '011-st2', text: 'Feedback дан' }], assignee: 'Кира', estimate: '30 мин', priority: 'high', tags: ['review'] },
            { id: '012', title: '012. Кира: Написать черновики постов 1-6 (НЕ публиковать)', description: 'Зачем: Все посты на 2 недели заранее. Единый tone. Публикация по графику.', steps: ['Создать Google Doc "KORU Campaign Posts"', 'Написать 6 постов (тексты в copy blocks)', 'НЕ публиковать — только черновики'], subtasks: [{ id: '012-st1', text: 'Пост 1 написан' }, { id: '012-st2', text: 'Пост 2 написан' }, { id: '012-st3', text: 'Пост 3 написан' }, { id: '012-st4', text: 'Пост 4 написан' }, { id: '012-st5', text: 'Пост 5 написан' }, { id: '012-st6', text: 'Пост 6 написан' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content'], warning: 'ЧЕРНОВИКИ! НЕ публиковать.' },
            { id: '013', title: '013. Кира + Макс: График + launch date', description: 'Зачем: Без дат кампания расплывается.', steps: ['Созвон 30 мин', 'Launch date (Week 6)', 'Отсчитать назад, Calendar события'], subtasks: [{ id: '013-st1', text: 'Launch date' }, { id: '013-st2', text: 'Calendar' }], assignee: 'Кира + Макс', estimate: '30 мин', priority: 'high', tags: ['planning'] }
        ],
        keyMetric: 'Story 0 Done: positioning, profiles, sheets, groups, onboarding, 6 постов, график.'
    },

    // ==========================================
    // WEEK 1 — INTRIGUE + RESEARCH (5 дней)
    // ==========================================
    {
        dayIndex: 3, phase: 'Week 1', dayLabel: 'Week 1, Понедельник',
        title: 'ПОСТ 1 + начало research',
        summary: 'Публикуем первый пост. Настя начинает LinkedIn searches.',
        tasks: [
            { id: '014', title: '014. Кира: Опубликовать Пост 1 на LinkedIn', description: 'Зачем: Первый пост. Боль keyword research. Алгоритм решает в первые 2 часа.', steps: ['LinkedIn → Start a post → скопировать текст ниже', 'Проверить форматирование', 'Опубликовать'], subtasks: [{ id: '014-st1', text: 'Опубликован' }], assignee: 'Кира', estimate: '10 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Пост 1 LinkedIn (copy-paste)', text: 'I asked 20 SEO freelancers one simple question:\n\n"How long does keyword research take you per client?"\n\nThe average answer: 3-4 hours.\n\nFor a freelancer managing 10 clients, that\'s 40 hours a month.\n\nJust on research.\nNot strategy.\nNot content creation.\nNot client communication.\n\nJust sitting in Ahrefs, exporting spreadsheets, and manually clustering keywords.\n\n40 hours. That\'s a full work week every month spent on a process that hasn\'t fundamentally changed in 10 years.\n\nThe tools got prettier. The data got bigger. But the workflow? Still manual. Still spreadsheets. Still hours.\n\nHow long does yours take?\n\n#SEO #KeywordResearch #SEOTools' }] },
            { id: '015', title: '015. Кира: Пост 1 на Twitter', description: 'Зачем: Второй канал.', steps: ['Скопировать текст → Twitter → опубликовать'], subtasks: [{ id: '015-st1', text: 'Tweet опубликован' }], assignee: 'Кира', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Tweet (copy-paste)', text: 'I asked 20 SEO freelancers how long keyword research takes per client.\n\nAverage: 3-4 hours.\n\nFor someone with 10 clients = 40 hours/month just on research.\n\nThe tools got better. The workflow didn\'t.\n\nHow long does yours take?\n\n#SEO #KeywordResearch' }] },
            { id: '016', title: '016. Кира: 2ч engagement — ответить на ВСЕ комменты', description: 'Зачем: Алгоритм решает в первые 2 часа. Каждый ответ = signal.', steps: ['2 часа на LinkedIn + Twitter', 'Каждый коммент = content-rich ответ', 'Записать commenters'], subtasks: [{ id: '016-st1', text: '2ч engagement' }, { id: '016-st2', text: 'Commenters записаны' }], assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['engagement'], warning: '2 ЧАСА NON-NEGOTIABLE.', copyBlocks: [{ label: 'Reply: кто-то согласен', text: 'Right? The crazy part is the tools keep getting more powerful, but the actual workflow — going from data to strategy — hasn\'t changed. Do you do the clustering part manually or have you found something that helps?' }, { label: 'Reply: кто-то называет время', text: 'That\'s about average. The clustering step seems to be where most time goes — from flat list to organized topic groups. Is that true for you too?' }, { label: 'Reply: "What\'s the solution?"', text: 'Working on something actually. Not ready to share yet, but the core idea: URL to clustered keyword strategy, automatically. More soon.' }] },
            { id: '017', title: '017. Настя: LinkedIn searches batch 1 (4 запроса)', description: 'Зачем: Начинаем строить базу. Цель: 10-15 профилей.', steps: ['"SEO consultant" AND "freelance"', '"SEO agency" AND "founder"', '"Head of SEO"', '"keyword research" AND "SEO" (в Posts)', 'Для каждого: Sources Log → top 20-30 → 3-5 лучших → Sheets'], subtasks: [{ id: '017-st1', text: '4 queries done' }, { id: '017-st2', text: '10-15 профилей' }], assignee: 'Настя', estimate: '1.5 часа', priority: 'high', tags: ['research'] }
        ]
    },
    {
        dayIndex: 4, phase: 'Week 1', dayLabel: 'Week 1, Вторник',
        title: 'Research продолжение',
        summary: 'Настя — ещё 4 запроса. Кира — follow-up + Twitter listening.',
        tasks: [
            { id: '018', title: '018. Кира: Follow-up комменты + Twitter listening', description: 'Зачем: Комменты приходят 24-48ч. Twitter listening = понять что обсуждают.', steps: ['LinkedIn: ответить на новые комменты к Посту 1', 'Commenters → если SEO pro → Sheets', 'Twitter: 30 мин listening, лайки, 2-3 replies'], subtasks: [{ id: '018-st1', text: 'Комменты отвечены' }, { id: '018-st2', text: 'Twitter 30 мин' }], assignee: 'Кира', estimate: '1 час', priority: 'medium', tags: ['engagement'] },
            { id: '019', title: '019. Настя: LinkedIn searches batch 1 часть 2 (4 запроса)', description: 'Зачем: Довести до 25-30 total.', steps: ['"SEO manager" AND "agency"', '"SEO audits" AND "freelance"', '"SEO strategist"', '"digital marketing" AND "SEO" AND "director"'], subtasks: [{ id: '019-st1', text: '25-30 total' }], assignee: 'Настя', estimate: '1.5 часа', priority: 'high', tags: ['research'] }
        ]
    },
    {
        dayIndex: 5, phase: 'Week 1', dayLabel: 'Week 1, Среда',
        title: 'ПОСТ 2 + batch 2 + review',
        summary: 'Пост 2 (LinkedIn). Новые queries. Mid-week review.',
        tasks: [
            { id: '020', title: '020. Кира: Пост 2 на LinkedIn + 2ч engagement', description: 'Зачем: "Keyword lists vs strategies". Данные ≠ стратегия.', steps: ['Скопировать текст → LinkedIn → опубликовать', '2ч engagement'], subtasks: [{ id: '020-st1', text: 'Пост + engagement' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement'], copyBlocks: [{ label: 'Пост 2 LinkedIn (copy-paste)', text: 'Every SEO tool on the market gives you the same thing: a list of keywords sorted by volume and difficulty.\n\nBut a list is not a strategy.\n\nA strategy looks like this:\n\n-> Here are 5 topic clusters relevant to your site\n-> Here\'s which of your existing pages already cover each cluster\n-> Here\'s what\'s missing — the content gaps\n-> Here\'s the priority order based on difficulty, volume, and your current coverage\n-> Here\'s a content brief for each gap\n\nThat\'s what an SEO professional does manually. Open Ahrefs, export to spreadsheet, spend 2 hours grouping, cross-reference with site pages, write briefs in Google Docs.\n\nTools give data. Professionals need strategy.\n\nWhat does your keyword-to-strategy process look like?\n\n#SEO #ContentStrategy #KeywordResearch' }] },
            { id: '022', title: '022. Настя: Batch 2 (4 запроса)', description: 'Зачем: Более специфичные роли.', steps: ['"SEO analyst" AND "senior"', '"organic search" AND "manager"', '"site audit" AND "SEO"', '"SEO" AND "ecommerce"'], subtasks: [{ id: '022-st1', text: '35-40 total' }], assignee: 'Настя', estimate: '1.5 часа', priority: 'high', tags: ['research'] },
            { id: '023', title: '023. Кира + Настя: Mid-week review (15 мин)', description: 'Зачем: Проверить качество после 30+ профилей.', steps: ['Кира: 10-15 random → Priority OK?', 'Feedback'], subtasks: [{ id: '023-st1', text: 'Review + feedback' }], assignee: 'Кира + Настя', estimate: '15 мин', priority: 'high', tags: ['review'] }
        ]
    },
    {
        dayIndex: 6, phase: 'Week 1', dayLabel: 'Week 1, Четверг',
        title: 'Research finish + competitor pain research',
        summary: 'Настя завершает batch 2 + Twitter cross-check. Кира собирает жалобы на конкурентов.',
        tasks: [
            { id: '024', title: '024. Настя: Batch 2 finish + Twitter cross-check 15-20', description: 'Зачем: Twitter показывает реальную активность. Цель: 50+ total.', steps: ['Завершить batch 2', 'Топ 15-20 Priority A → найти в Twitter → обновить Activity Level', '50+ total'], subtasks: [{ id: '024-st1', text: 'Batch 2 done' }, { id: '024-st2', text: 'Twitter check' }, { id: '024-st3', text: '50+ total' }], assignee: 'Настя', estimate: '2.5 часа', priority: 'high', tags: ['research'] },
            { id: '025', title: '025. Кира: Собрать 10-15 цитат про боль keyword research', description: 'Зачем: Реальные слова = лучший marketing copy. Для будущих постов и landing.', steps: ['LinkedIn: посты с "keyword research" AND "manual"', 'Twitter: #SEOtools complaints', 'Reddit: r/SEO "alternative to"', 'Записать 10-15 цитат с источником'], subtasks: [{ id: '025-st1', text: '10-15 цитат' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'medium', tags: ['research', 'content'] }
        ]
    },
    {
        dayIndex: 7, phase: 'Week 1', dayLabel: 'Week 1, Пятница',
        title: 'ПОСТ 3 + weekly review + черновики W3-W4',
        summary: 'Пост 3 "Tool stack" (thread + LinkedIn). Weekly metrics. Кира пишет посты 7-12.',
        tasks: [
            { id: '026', title: '026. Кира: Пост 3 Twitter thread + LinkedIn + 2ч engagement', description: 'Зачем: "$290/month и вручную". Числа = engagement magnet.', steps: ['Twitter thread → LinkedIn adaptation', '2ч engagement обе платформы'], subtasks: [{ id: '026-st1', text: 'Twitter thread' }, { id: '026-st2', text: 'LinkedIn пост' }, { id: '026-st3', text: 'Engagement' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement'], copyBlocks: [{ label: 'Пост 3 LinkedIn (copy-paste)', text: 'Let\'s talk about the cost of doing SEO in 2026.\n\nA typical freelance SEO setup:\n\nAhrefs: $129/month\nSurfer SEO: $99/month\nScreaming Frog: $259/year ($22/month)\n\nThat\'s $250/month minimum. Before you earn a single dollar from a client.\n\nAnd after paying $250/month for three separate tools, you still:\n- Cluster keywords manually in a spreadsheet\n- Write content briefs in Google Docs\n- Track tasks in Asana or Trello\n- Copy-paste data between four tabs\n\nThe tools don\'t talk to each other.\n\n$250/month for data silos.\n\nWhat\'s your tool stack? And what\'s still manual?\n\n#SEO #SEOTools #FreelanceSEO' }, { label: 'Twitter thread (copy-paste по 1 tweet)', text: '1/ The cost of doing SEO in 2026:\n\n2/ Ahrefs: $129/mo\nSurfer SEO: $99/mo\nScreaming Frog: $22/mo\nTotal: $250/month MINIMUM.\n\n3/ And after $250/month, you still:\n- Cluster keywords manually\n- Write briefs in Google Docs\n- Track tasks separately\n- Copy-paste between everything\n\n4/ The tools don\'t talk to each other.\nAudit ≠ keywords ≠ briefs ≠ tasks.\n$250/month for data silos.\n\n5/ What\'s your stack? What\'s still manual?' }] },
            { id: '028', title: '028. Настя: Weekly metrics', description: 'Зачем: Каждую пятницу — метрики.', steps: ['Metrics tab: total (target 50-80), A/B/C breakdown', 'Sources Log: сколько searches использовано?', 'Статусы групп', 'Summary Кире'], subtasks: [{ id: '028-st1', text: 'Metrics обновлены' }, { id: '028-st2', text: '50-80 total' }], assignee: 'Настя', estimate: '30 мин', priority: 'high', tags: ['review'] },
            { id: '029', title: '029. Кира: Черновики постов 7-12 (Weeks 3-4)', description: 'Зачем: Пишем заранее.', steps: ['Посты 7-12 в Google Doc (Building in Public + Reveal)'], subtasks: [{ id: '029-st1', text: '6 постов написаны' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content'] }
        ],
        keyMetric: 'Week 1: 50-80 profiles, 3 posts, Twitter active, pain quotes collected'
    },

    // ==========================================
    // WEEK 2 — HINTS + GROUPS + DMs START (5 дней)
    // ==========================================
    {
        dayIndex: 8, phase: 'Week 2', dayLabel: 'Week 2, Понедельник',
        title: 'ПОСТ 4 (переломный!) + groups + FIRST DMs',
        summary: 'Первый hint на решение "5 minutes". Группы. Первые DMs к тёплым людям.',
        tasks: [
            { id: '030', title: '030. Кира: Пост 4 LinkedIn + Twitter + 2ч engagement', description: 'Зачем: ПЕРЕЛОМНЫЙ. Первый раз "5 minutes" и "URL to strategy".', steps: ['Скопировать → LinkedIn + Twitter', '2ч engagement', 'НЕ раскрывать продукт! "Working on it. More soon."', 'Записать кто написал "I wish!" или "How?"'], subtasks: [{ id: '030-st1', text: 'Посты' }, { id: '030-st2', text: 'Engagement' }, { id: '030-st3', text: 'Hot leads записаны' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement'], warning: 'НЕ раскрывать продукт!', copyBlocks: [{ label: 'Пост 4 LinkedIn (copy-paste)', text: 'I keep asking myself one question:\n\nWhat if keyword research took 5 minutes instead of 4 hours?\n\nNot a list of keywords to sort through. An actual strategy:\n\n- Paste a URL\n- Get topic clusters automatically grouped by theme\n- See which of your pages already cover each cluster\n- See the gaps — where you need new content\n- Get a prioritized action plan based on difficulty and opportunity\n\nNot keyword soup. A mapped, clustered, prioritized strategy. From URL to action plan.\n\nIn 5 minutes.\n\nWould that change how you work?\n\n#SEO #KeywordResearch' }, { label: 'Tweet (copy-paste)', text: 'What if keyword research took 5 minutes instead of 4 hours?\n\nNot a list to sort through.\nA mapped, clustered, prioritized strategy. From URL to action plan.\n\nWould that change how you work?\n\n#SEO #KeywordResearch' }] },
            { id: '032', title: '032. Кира: ПЕРВЫЕ 3-5 DMs тёплым людям', description: 'Зачем: Commenters постов 1-4 = самые тёплые. Момент горячий СЕЙЧАС.', steps: ['3-5 DMs из commenters', 'Записать кому, когда, ответили ли'], subtasks: [{ id: '032-st1', text: '3-5 DMs' }], assignee: 'Кира', estimate: '30 мин', priority: 'high', tags: ['outreach'], copyBlocks: [{ label: 'DM Template (заменить [Name], [topic])', text: 'Hey [Name],\n\nReally enjoyed your takes on [specific topic from their comments]. Especially the point about [specific thing they said].\n\nI\'m actually building something to solve exactly this — keyword research from URL to clustered strategy in minutes instead of hours.\n\nWould love your input as an early tester. No strings attached — just want feedback from someone who actually does this work daily.\n\nInterested?' }] },
            { id: '033', title: '033. Настя: Groups deep-dive (5 групп) + START engagement', description: 'Зачем: Groups = quality prospects. С сегодня: 3-5 комментов/день.', steps: ['5 групп: SEO Professionals, Technical SEO, Search Engine Land, Digital Marketing, SEO & SEM', 'Активные участники → Sheets', 'СТАРТ engagement: 3-5 комментов к постам Priority A'], subtasks: [{ id: '033-st1', text: '5 групп' }, { id: '033-st2', text: '3-5 комментов' }], assignee: 'Настя', estimate: '3 часа', priority: 'high', tags: ['research', 'engagement'], copyBlocks: [{ label: 'Коммент: вопрос про workflow', text: 'How long does the clustering part take you? That\'s always been the biggest time sink for everyone I\'ve talked to — going from a flat keyword list to organized topic groups.' }, { label: 'Коммент: data point', text: 'This matches what I\'ve been hearing — the average is 3-4 hours per client for keyword research alone. And that\'s before you even write a brief.' }, { label: 'Коммент: вопрос про tools', text: 'Do you cluster in a spreadsheet or have you found a tool that actually does it well? Everyone I\'ve talked to is still doing it manually.' }, { label: 'Коммент: personal story', text: 'I watched a consultant do this exact workflow last week — four tabs open, copy-pasting between Ahrefs, spreadsheet, Google Docs, and Asana. Three hours.' }] }
        ]
    },
    {
        dayIndex: 9, phase: 'Week 2', dayLabel: 'Week 2, Вторник',
        title: 'Groups (ч.2) + conferences + DM follow-ups',
        summary: 'Оставшиеся 5 групп. Конференции. Кира follow-up DMs.',
        tasks: [
            { id: '034', title: '034. Настя: Groups (5) + conferences (3) + engagement', description: 'Зачем: Расширяем sources.', steps: ['5 групп: Agency Growth, Moz, SEO for Startups, Content Marketing, International SEO', 'Конференции: BrightonSEO, MozCon, SearchLove → speakers → LinkedIn', 'Engagement: 3-5 comments'], subtasks: [{ id: '034-st1', text: 'Groups done' }, { id: '034-st2', text: '3 conferences' }, { id: '034-st3', text: 'Engagement' }], assignee: 'Настя', estimate: '3 часа', priority: 'high', tags: ['research', 'engagement'] },
            { id: '035', title: '035. Кира: DM follow-ups + warm list', description: 'Зачем: Не потерять горячие контакты.', steps: ['Проверить ответы на DMs', 'Если заинтересован → 15 мин demo или beta access', 'Twitter: 3-5 replies'], subtasks: [{ id: '035-st1', text: 'DM follow-ups' }, { id: '035-st2', text: 'Twitter replies' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['outreach'] }
        ]
    },
    {
        dayIndex: 10, phase: 'Week 2', dayLabel: 'Week 2, Среда',
        title: 'ПОСТ 5 + communities',
        summary: 'Пост 5 "Spreadsheet workflow". Настя: SEO communities.',
        tasks: [
            { id: '036', title: '036. Кира: Пост 5 LinkedIn + 2ч engagement + DMs', description: 'Зачем: "4 tools that don\'t talk to each other" — relatable.', steps: ['Пост 5 на LinkedIn', '2ч engagement', '2-3 DMs к новым commenters'], subtasks: [{ id: '036-st1', text: 'Пост + engagement + DMs' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'outreach'], copyBlocks: [{ label: 'Пост 5 LinkedIn (copy-paste)', text: 'I watched an SEO consultant build a keyword strategy last week.\n\nShe had four tabs open:\n1. Ahrefs — pulling keyword data\n2. Google Sheets — manually clustering keywords by topic\n3. Google Docs — writing the content brief\n4. Asana — creating tasks for her writer\n\nFour tools. None of them connected. She copy-pasted between all four for three hours.\n\nWhen I asked "Is there a tool that connects all of this?" she laughed and said "I wish."\n\nShe\'s not alone. Every SEO professional I\'ve talked to has some version of this workflow.\n\nSound familiar?\n\n#SEO #Productivity #SEOTools' }] },
            { id: '037', title: '037. Настя: Communities + conferences finish + engagement', description: 'Зачем: Reddit, Facebook, Slack = quality leads.', steps: ['Traffic Think Tank, SEO Signals Lab, r/SEO, r/bigseo, Women in Tech SEO', 'Конференции: SMX, pubcon, Chiang Mai SEO', 'Engagement: 3-5 comments'], subtasks: [{ id: '037-st1', text: 'Communities + conferences' }, { id: '037-st2', text: 'Engagement' }], assignee: 'Настя', estimate: '3 часа', priority: 'medium', tags: ['research', 'engagement'] }
        ]
    },
    {
        dayIndex: 11, phase: 'Week 2', dayLabel: 'Week 2, Четверг',
        title: 'G2/Capterra + beta push',
        summary: 'Настя: proven buyers. Кира: push beta invites.',
        tasks: [
            { id: '038', title: '038. Настя: G2/Capterra reviewers + engagement', description: 'Зачем: Reviewers = proven buyers.', steps: ['G2/Capterra: Ahrefs, SEMrush, Screaming Frog, Surfer, Sitebulb', 'Reviewers → LinkedIn → Sheets', 'Engagement: 3-5 comments'], subtasks: [{ id: '038-st1', text: '5 tools' }, { id: '038-st2', text: 'Engagement' }], assignee: 'Настя', estimate: '3 часа', priority: 'high', tags: ['research', 'engagement'] },
            { id: '039', title: '039. Кира: Beta push + Twitter', description: 'Зачем: К концу Week 2 нужны 3-5 beta testers.', steps: ['DMs к ещё 3-5 людям', 'Follow up с неответившими', 'Twitter: 3-5 replies'], subtasks: [{ id: '039-st1', text: '3-5 beta agreements total' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['outreach'] }
        ]
    },
    {
        dayIndex: 12, phase: 'Week 2', dayLabel: 'Week 2, Пятница',
        title: 'ПОСТ 6 (первый тизер + LANDING LINK!) + review',
        summary: 'ПЕРВЫЙ ТИЗЕР. Первая ссылка на landing. С этого момента каждый пост = landing link.',
        tasks: [
            { id: '040', title: '040. Кира: Пост 6 + ПЕРВЫЙ landing link + 2ч engagement', description: 'Зачем: "Building something." ВПЕРВЫЕ landing link в комментарии. Email capture funnel START.', steps: ['Пост 6 LinkedIn + Twitter', 'СРАЗУ первый коммент: "koru-seo.com"', '2ч engagement', 'ПРАВИЛО: с этого момента КАЖДЫЙ пост = landing link'], subtasks: [{ id: '040-st1', text: 'Пост' }, { id: '040-st2', text: 'Landing link в комменте' }, { id: '040-st3', text: 'Engagement' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content'], warning: 'С этого поста КАЖДЫЙ пост = landing link в комментарии.', copyBlocks: [{ label: 'Пост 6 LinkedIn (copy-paste)', text: 'We talked to 30 SEO professionals over the last three months.\n\nThe top 3 time sinks they mentioned:\n\n1. Keyword clustering — still done manually in spreadsheets\n2. Content brief creation — still done manually in Google Docs\n3. Translating audit findings into actual tasks — still done by hand\n\nThree workflows. All manual. All taking hours every week.\n\nWe\'re building something to change this.\n\nMore soon.\n\n#SEO #BuildInPublic' }, { label: 'Первый комментарий (сразу после поста)', text: 'If you want to see it when it\'s ready: koru-seo.com' }] },
            { id: '041', title: '041. Настя: Weekly review Week 2', description: 'Зачем: Метрики.', steps: ['Target: 120-180 total', 'Engagement stats', 'Groups статусы'], subtasks: [{ id: '041-st1', text: '120-180 total' }], assignee: 'Настя', estimate: '30 мин', priority: 'high', tags: ['review'] }
        ],
        keyMetric: 'Week 2: 120-180 profiles, 3-5 beta testers, engagement active, email capture started'
    },

    // ==========================================
    // WEEK 3 — BUILDING IN PUBLIC (5 дней)
    // ==========================================
    {
        dayIndex: 13, phase: 'Week 3', dayLabel: 'Week 3, Понедельник',
        title: 'HEADLINE CHANGE + ПОСТ 7',
        summary: 'Headline → stealth mode. Первый Building in Public пост.',
        tasks: [
            { id: '042', title: '042. Кира: Сменить headline + Featured', description: 'Зачем: Переход к Building in Public. Career update notification = бесплатный reach!', steps: ['Headline: "Building a tool that turns a URL into a keyword strategy in 5 minutes | In stealth"', 'Featured: link на koru-seo.com'], subtasks: [{ id: '042-st1', text: 'Headline' }, { id: '042-st2', text: 'Featured' }], assignee: 'Кира', estimate: '10 мин', priority: 'high', tags: ['branding'] },
            { id: '043', title: '043. Кира: Пост 7 + 2ч engagement + DMs', description: 'Зачем: "Building a keyword engine" — показываем ЧТО строим.', steps: ['Пост 7 LinkedIn + Twitter', 'Landing link в комменте', '2ч engagement', '2-3 DMs'], subtasks: [{ id: '043-st1', text: 'Пост 7' }, { id: '043-st2', text: 'Engagement' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'outreach'], copyBlocks: [{ label: 'Пост 7 LinkedIn (copy-paste)', text: 'What if there was a keyword engine that works like this:\n\n1. You paste a URL\n2. It crawls your site automatically\n3. It extracts seed keywords from your content\n4. It expands them into hundreds of related terms\n5. It classifies each keyword by search intent\n6. It filters out irrelevant noise\n7. It clusters everything into topic groups\n8. It maps clusters to your existing pages\n9. It identifies the gaps\n10. It gives you a prioritized action plan\n\nAll in one pipeline. Automatically. In minutes.\n\nNo spreadsheets. No copy-pasting between tools. No manual clustering.\n\nWe\'re building exactly this. No name yet. But it works.\n\n#BuildInPublic #SEO #KeywordResearch' }, { label: 'Первый комментарий', text: 'Want early access? koru-seo.com' }] },
            { id: '044', title: '044. Настя: SEO blog contributors + engagement', description: 'Зачем: Blog contributors = уважаемые практики.', steps: ['Search Engine Journal, Search Engine Land, Moz Blog, Ahrefs Blog', 'Contributors → LinkedIn → Sheets', 'Engagement: 3-5 comments'], subtasks: [{ id: '044-st1', text: 'Blog contributors' }, { id: '044-st2', text: 'Engagement' }], assignee: 'Настя', estimate: '3 часа', priority: 'high', tags: ['research', 'engagement'] }
        ]
    },
    {
        dayIndex: 14, phase: 'Week 3', dayLabel: 'Week 3, Вторник',
        title: 'Blog contributors (ч.2) + engagement',
        summary: 'Настя: оставшиеся blogs. Кира: DM follow-ups + beta demos.',
        tasks: [
            { id: '045', title: '045. Настя: Blogs finish + engagement', description: 'Зачем: Doделать sources.', steps: ['Backlinko, Semrush Blog, Search Engine Watch', 'Engagement: 3-5 comments'], subtasks: [{ id: '045-st1', text: 'Blogs done' }, { id: '045-st2', text: 'Engagement' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research', 'engagement'] },
            { id: '046', title: '046. Кира: Beta demos + DM follow-ups', description: 'Зачем: Конвертировать interested → actual beta testers.', steps: ['Провести demo (15 мин) с согласившимися', 'Собрать feedback', 'Follow up с остальными DMs'], subtasks: [{ id: '046-st1', text: 'Demo(s)' }, { id: '046-st2', text: 'Follow-ups' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'high', tags: ['outreach'] }
        ]
    },
    {
        dayIndex: 15, phase: 'Week 3', dayLabel: 'Week 3, Среда',
        title: 'ПОСТ 8 + categorization start',
        summary: 'Пост 8 "Topic clusters > keyword lists". Настя начинает финальную категоризацию.',
        tasks: [
            { id: '047', title: '047. Кира: Пост 8 + 2ч engagement', description: 'Зачем: Визуальный пост — показать кластеры. Если есть скриншот из KORU — приложить.', steps: ['Пост 8 LinkedIn + landing link', '2ч engagement'], subtasks: [{ id: '047-st1', text: 'Пост 8 + engagement' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement'], copyBlocks: [{ label: 'Пост 8 LinkedIn (copy-paste)', text: 'This is what keyword research looks like today:\n\nA flat list. 200 keywords. Sorted by volume. Good luck figuring out which ones to target.\n\nThis is what it should look like:\n\n-> Cluster: "SEO audit tools" (8 keywords, avg. difficulty 32)\n  Covered by /blog/best-seo-tools (position 15)\n  Gap: "free seo audit tool" — needs new page\n\n-> Cluster: "technical SEO" (12 keywords, avg. difficulty 45)\n  Partially covered by /services/technical-seo\n  Gap: "core web vitals audit" — expand existing page\n\n-> Cluster: "keyword research process" (6 keywords, avg. difficulty 28)\n  Not covered at all — create new content\n\nThat\'s not a list. That\'s a strategy. Clustered. Mapped. Prioritized.\n\nWe\'re making this automatic.\n\n#SEO #KeywordStrategy #BuildInPublic' }] },
            { id: '048', title: '048. Настя: Categorization start + engagement', description: 'Зачем: Перед outreach — все профили consistent.', steps: ['Пройти все профили: A/B/C consistent?', 'Спорные → для Киры', 'Engagement: 3-5 comments'], subtasks: [{ id: '048-st1', text: 'Categorization started' }, { id: '048-st2', text: 'Engagement' }], assignee: 'Настя', estimate: '2.5 часа', priority: 'high', tags: ['review', 'engagement'] }
        ]
    },
    {
        dayIndex: 16, phase: 'Week 3', dayLabel: 'Week 3, Четверг',
        title: 'Categorization finish + engagement',
        summary: 'Настя финализирует. Кира — спорные cases + beta.',
        tasks: [
            { id: '049a', title: '049a. Настя: Categorization finish + engagement', description: 'Зачем: Всё должно быть ready к пятничному review.', steps: ['Все профили: Source, Activity Level, Notes заполнены', 'Engagement: 3-5 comments'], subtasks: [{ id: '049a-st1', text: 'Cleanup done' }, { id: '049a-st2', text: 'Engagement' }], assignee: 'Настя', estimate: '2 часа', priority: 'high', tags: ['review', 'engagement'] },
            { id: '049b', title: '049b. Кира: Спорные cases + beta feedback', description: 'Зачем: Решить спорные Priority. Собрать feedback от beta.', steps: ['Review спорных cases из Sheets', 'Собрать feedback от beta testers'], subtasks: [{ id: '049b-st1', text: 'Cases решены' }, { id: '049b-st2', text: 'Beta feedback' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['review'] }
        ]
    },
    {
        dayIndex: 17, phase: 'Week 3', dayLabel: 'Week 3, Пятница',
        title: 'ПОСТ 9 + final review Priority A + templates',
        summary: 'Pipeline пост. Кира ревьюит ВСЕ Priority A. Настя готовит connection templates.',
        tasks: [
            { id: '050', title: '050. Кира: Пост 9 + 2ч engagement', description: 'Зачем: "From research to action" — масштаб pipeline.', steps: ['Пост 9 LinkedIn + Twitter + landing link', '2ч engagement + DMs'], subtasks: [{ id: '050-st1', text: 'Пост 9 + engagement' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'outreach'], copyBlocks: [{ label: 'Пост 9 LinkedIn (copy-paste)', text: 'Here\'s what we\'re connecting into one platform:\n\nAudit -> finds technical issues on your site\n|\nKeywords -> discovers topic opportunities you\'re missing\n|\nBriefs -> generates content plans for each opportunity\n|\nTasks -> creates actionable items for your team\n\nOne pipeline. Every step feeds the next.\n\nYour audit finds a missing H1.\nYour keyword analysis finds "seo audit tool" is a top opportunity.\nYour brief generator creates an outline.\nYour task board shows "Write: SEO Audit Tool comparison — outline ready."\n\nNo switching between four tools. No copy-pasting.\n\nFrom problem -> to plan -> to action. In one place.\n\nWe\'re close. Really close.\n\n#SEO #BuildInPublic' }] },
            { id: '051', title: '051. Кира: Final review ВСЕ Priority A', description: 'Зачем: Это люди которые получат connection requests. Лично проверить каждого.', steps: ['Sheets → фильтр Priority A', 'Каждый: открыть LinkedIn, подтвердить, записать чем персонализировать', 'Target: 40-60 Priority A'], subtasks: [{ id: '051-st1', text: '40-60 Priority A confirmed' }, { id: '051-st2', text: 'Personalization notes' }], assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['review'] },
            { id: '052', title: '052. Настя: Weekly review + connection templates', description: 'Зачем: Metrics + templates для Week 4.', steps: ['Metrics: target 200-300', 'Подготовить 3 connection templates'], subtasks: [{ id: '052-st1', text: '200-300 total' }, { id: '052-st2', text: 'Templates ready' }], assignee: 'Настя', estimate: '1.5 часа', priority: 'high', tags: ['review', 'outreach'] }
        ],
        keyMetric: 'Week 3: 200-300 profiles, 40-60 Priority A, beta testers active, templates ready'
    },

    // ==========================================
    // WEEK 4 — REVEAL + OUTREACH (5 дней)
    // ==========================================
    {
        dayIndex: 18, phase: 'Week 4', dayLabel: 'Week 4, Понедельник',
        title: 'REVEAL KORU + ПОСТ 10 + outreach start',
        summary: 'Бренд KORU раскрыт! Headline финальный. Настя начинает connection requests.',
        tasks: [
            { id: '053', title: '053. Кира: Final headline + Experience', description: 'Зачем: REVEAL.', steps: ['Headline: "Founder & CEO at KORU | From URL to SEO strategy in 5 minutes"', 'Experience: CEO at KORU', 'Company Page: обновить About'], subtasks: [{ id: '053-st1', text: 'Headline' }, { id: '053-st2', text: 'Experience' }], assignee: 'Кира', estimate: '15 мин', priority: 'high', tags: ['branding'] },
            { id: '054', title: '054. Кира: Пост 10 "Meet KORU" + 2ч engagement + DMs', description: 'Зачем: Самый важный пост до launch.', steps: ['Пост 10 LinkedIn + Twitter', 'Landing link', '2ч engagement', 'DMs к hot leads'], subtasks: [{ id: '054-st1', text: 'Reveal post' }, { id: '054-st2', text: 'Engagement + DMs' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'outreach'], copyBlocks: [{ label: 'Пост 10 LinkedIn (copy-paste)', text: 'It\'s time.\n\nFor the last three months, we\'ve been building a tool for SEO freelancers and small agencies who are tired of spending hours on keyword research.\n\nIt\'s called KORU.\n\nHere\'s what it does:\n\n-> Paste any URL\n-> Get topic clusters automatically (not keyword lists — clusters)\n-> See which pages already cover each topic\n-> See the gaps — where you need new content\n-> Generate content briefs in one click\n-> Turn everything into tasks for your team\n\nFrom URL to keyword strategy in 5 minutes. Not 4 hours.\n\nWe built this because every SEO professional we talked to said the same thing: "The tools give me data. I need strategy."\n\nKORU gives you strategy.\n\nEarly access is open: koru-seo.com\n\n#KORU #SEO #KeywordResearch #LaunchingSoon' }] },
            { id: '055', title: '055. Настя: ПЕРВЫЕ connection requests (8-10)', description: 'Зачем: Строим network. 8-10/день, качественно, персонализированно.', steps: ['8-10 Priority A с highest Activity', 'ПЕРСОНАЛИЗИРОВАТЬ каждый (30 сек на профиль)', 'Tracking', 'Engagement: 3-5 comments'], subtasks: [{ id: '055-st1', text: '8-10 requests' }, { id: '055-st2', text: 'Engagement' }], assignee: 'Настя', estimate: '2 часа', priority: 'high', tags: ['outreach', 'engagement'], copyBlocks: [{ label: 'CR: engagement-based (заменить [Name], [topic])', text: 'Hi [Name], your recent post about [specific topic] really hit home. I\'m building KORU — turns a URL into a full keyword strategy automatically. Would love to connect and share what we\'re doing.' }, { label: 'CR: agency owners (заменить [Name], [Agency], [specific])', text: 'Hi [Name], I\'ve been following [Agency Name]\'s work — impressed by your approach to [something specific]. We\'re building KORU to cut keyword research from hours to minutes. Would be great to connect.' }, { label: 'CR: speakers (заменить [Name], [Conference], [topic])', text: 'Hi [Name], your talk at [Conference] about [topic] was excellent — especially [specific detail]. Building in the same space. Would love to connect.' }] }
        ]
    },
    {
        dayIndex: 19, phase: 'Week 4', dayLabel: 'Week 4, Вторник',
        title: 'Outreach + monitoring + beta testimonials',
        summary: 'Продолжаем outreach. Мониторим acceptance. Собираем testimonials.',
        tasks: [
            { id: '056', title: '056. Настя: Outreach (8-10) + monitoring + engagement', description: 'Зачем: Consistency.', steps: ['8-10 requests', 'Проверить acceptances вчерашних', 'Engagement: 3-5 comments'], subtasks: [{ id: '056-st1', text: '8-10 requests' }, { id: '056-st2', text: 'Acceptance check' }], assignee: 'Настя', estimate: '2 часа', priority: 'high', tags: ['outreach', 'monitoring'] },
            { id: '057', title: '057. Кира: Testimonial requests + new connection engagement', description: 'Зачем: Testimonials к launch post.', steps: ['Beta testers: попросить 2-3 sentence quote', 'Новые connections: comment на их пост (НЕ pitch сразу)', 'Twitter engagement'], subtasks: [{ id: '057-st1', text: 'Testimonial requests' }, { id: '057-st2', text: 'Connection engagement' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['outreach', 'engagement'], copyBlocks: [{ label: 'Testimonial request DM (заменить [Name], [thing])', text: 'Hey [Name],\n\nThanks so much for testing KORU — your feedback on [specific thing] was really valuable.\n\nQuick favor: would you be ok sharing a sentence or two about your experience? Something genuine, in your own words.\n\nWe\'re gearing up for launch and a few real voices would mean a lot.\n\nNo pressure at all!' }] }
        ]
    },
    {
        dayIndex: 20, phase: 'Week 4', dayLabel: 'Week 4, Среда',
        title: 'ПОСТ 11 + outreach',
        summary: 'Пост 11 "Beta testers saying". Outreach продолжается.',
        tasks: [
            { id: '058', title: '058. Кира: Пост 11 + 2ч engagement', description: 'Зачем: Social proof.', steps: ['Пост 11: beta quotes или research quotes', 'Landing link', '2ч engagement'], subtasks: [{ id: '058-st1', text: 'Пост 11 + engagement' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement'] },
            { id: '059', title: '059. Настя: Outreach (8-10) + engagement', description: 'Зачем: Consistency.', steps: ['8-10 requests + monitoring + 3-5 comments'], subtasks: [{ id: '059-st1', text: 'Outreach + engagement' }], assignee: 'Настя', estimate: '2 часа', priority: 'high', tags: ['outreach', 'engagement'] }
        ]
    },
    {
        dayIndex: 21, phase: 'Week 4', dayLabel: 'Week 4, Четверг',
        title: 'Outreach + demo recording',
        summary: 'Настя: outreach. Кира: записать demo GIF.',
        tasks: [
            { id: '059b', title: '059b. Настя: Outreach (8-10) + engagement', description: 'Зачем: Добиваем Priority A.', steps: ['8-10 requests + 3-5 comments'], subtasks: [{ id: '059b-st1', text: 'Outreach + engagement' }], assignee: 'Настя', estimate: '2 часа', priority: 'high', tags: ['outreach'] },
            { id: '060', title: '060. Кира: Записать demo GIF/video (30 сек)', description: 'Зачем: Для поста 12 и launch post. Самый мощный content asset.', steps: ['Открыть KORU', 'Записать: URL paste → analysis → clusters → brief', '30 сек GIF + MP4'], subtasks: [{ id: '060-st1', text: 'Demo записан' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['content'] }
        ]
    },
    {
        dayIndex: 22, phase: 'Week 4', dayLabel: 'Week 4, Пятница',
        title: 'ПОСТ 12 (demo!) + GO/NO-GO',
        summary: 'Demo post. Критический review: acceptance rate.',
        tasks: [
            { id: '061', title: '061. Кира: Пост 12 demo + 2ч engagement', description: 'Зачем: Люди видят реальный продукт.', steps: ['Пост 12 + GIF + landing link', '2ч engagement'], subtasks: [{ id: '061-st1', text: 'Demo post + engagement' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement'], copyBlocks: [{ label: 'Пост 12 LinkedIn (copy-paste + приложить GIF)', text: 'People kept asking: "What does it actually look like?"\n\nSo here\'s a 30-second demo.\n\n1. I paste a URL\n2. KORU crawls the site\n3. Keywords are discovered and classified\n4. They\'re automatically clustered by topic\n5. Each cluster is mapped to existing pages\n6. Gaps identified. Priorities set.\n7. One click -> full content brief\n\nURL to strategy. 5 minutes.\n\nTry it: koru-seo.com\n\n[ATTACH GIF]\n\n#KORU #SEO #ProductDemo' }] },
            { id: '062', title: '062. Кира + Настя: GO/NO-GO review', description: 'Зачем: Acceptance rate определяет Week 5.', steps: ['Total Priority A: target 30-40', 'Acceptance: >=25% → GO. <20% → STOP', 'Beta testimonials: 2+?', 'Email signups?'], subtasks: [{ id: '062-st1', text: '30-40 sent' }, { id: '062-st2', text: 'Acceptance >=25%' }, { id: '062-st3', text: '2+ testimonials' }], assignee: 'Кира + Настя', estimate: '1 час', priority: 'high', tags: ['review'], warning: 'Acceptance <20% = STOP Week 5 outreach.' }
        ],
        keyMetric: 'Week 4: 30-40 Priority A, acceptance >=25%, demo published, 2+ testimonials'
    },

    // ==========================================
    // WEEK 5 — PRIORITY B + PRE-LAUNCH (5 дней)
    // ==========================================
    {
        dayIndex: 23, phase: 'Week 5', dayLabel: 'Week 5, Понедельник',
        title: 'Priority B outreach start + launch post draft',
        summary: 'Расширяем на Priority B. Кира пишет launch post.',
        tasks: [
            { id: '063', title: '063. Настя: Priority B outreach (12-15) + engagement', description: 'Зачем: Масштабируем. Priority B = in-house managers, content strategists.', steps: ['12-15 requests/день', 'Engagement: 5-7 comments (усиливаем перед launch)'], subtasks: [{ id: '063-st1', text: '12-15 requests' }, { id: '063-st2', text: 'Engagement' }], assignee: 'Настя', estimate: '3 часа', priority: 'high', tags: ['outreach', 'engagement'] },
            { id: '064', title: '064. Кира: Написать launch post + launch plan', description: 'Зачем: THE launch post. Спланировать launch day.', steps: ['Launch post: hook → problem → solution → social proof → demo → CTA', 'Launch day plan: time, beta testers, email, Twitter'], subtasks: [{ id: '064-st1', text: 'Launch post written' }, { id: '064-st2', text: 'Launch plan ready' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'planning'] }
        ]
    },
    {
        dayIndex: 24, phase: 'Week 5', dayLabel: 'Week 5, Вторник',
        title: 'Outreach + launch post review',
        summary: 'Настя: outreach. Кира: review launch post.',
        tasks: [
            { id: '065', title: '065. Настя: Priority B outreach (12-15) + engagement', description: 'Зачем: Consistency.', steps: ['12-15 requests + 5-7 comments'], subtasks: [{ id: '065-st1', text: 'Outreach + engagement' }], assignee: 'Настя', estimate: '3 часа', priority: 'high', tags: ['outreach'] },
            { id: '066', title: '066. Кира: Review launch post + DMs + Twitter', description: 'Зачем: Finalize post. Continue engagement.', steps: ['Re-read launch post. Edit.', 'DMs к interested people', 'Twitter engagement'], subtasks: [{ id: '066-st1', text: 'Post reviewed' }, { id: '066-st2', text: 'DMs + Twitter' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'medium', tags: ['content', 'outreach'] }
        ]
    },
    {
        dayIndex: 25, phase: 'Week 5', dayLabel: 'Week 5, Среда',
        title: 'Outreach continue',
        summary: 'Настя: outreach. Кира: engagement + beta follow-ups.',
        tasks: [
            { id: '067', title: '067. Настя: Priority B outreach (12-15) + engagement', description: 'Зачем: Добиваем.', steps: ['12-15 requests + 5-7 comments'], subtasks: [{ id: '067-st1', text: 'Outreach + engagement' }], assignee: 'Настя', estimate: '3 часа', priority: 'high', tags: ['outreach'] },
            { id: '068', title: '068. Кира: Beta final feedback + testimonials check', description: 'Зачем: Убедиться что testimonials ready для launch post.', steps: ['Check: все testimonials получены?', 'If missing: gentle reminder DM', 'Insert quotes into launch post'], subtasks: [{ id: '068-st1', text: 'Testimonials in launch post' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['outreach'] }
        ]
    },
    {
        dayIndex: 26, phase: 'Week 5', dayLabel: 'Week 5, Четверг',
        title: 'Outreach + email draft',
        summary: 'Настя: outreach. Кира: email waitlist draft.',
        tasks: [
            { id: '069a', title: '069a. Настя: Priority B outreach (12-15) + engagement', description: 'Зачем: Финальный push перед launch.', steps: ['12-15 requests + 5-7 comments'], subtasks: [{ id: '069a-st1', text: 'Outreach + engagement' }], assignee: 'Настя', estimate: '3 часа', priority: 'high', tags: ['outreach'] },
            { id: '069b', title: '069b. Кира: Draft "We launched" email', description: 'Зачем: Email к waitlist в launch day.', steps: ['Subject: "KORU is live — try it free"', 'Short body + signup link'], subtasks: [{ id: '069b-st1', text: 'Email drafted' }], assignee: 'Кира', estimate: '30 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Launch email (copy-paste в Mailchimp/ConvertKit)', text: 'Subject: KORU is live — try it free\n\nHey,\n\nIt\'s here.\n\nKORU is live. You signed up for early access, and now it\'s ready.\n\nWhat it does:\n-> Paste any URL\n-> Get topic clusters (not keyword lists)\n-> See coverage gaps\n-> Generate content briefs in one click\n-> Turn everything into tasks\n\nFrom URL to keyword strategy in 5 minutes.\n\nTry it free: [koru-seo.com/signup]\n\nIf you have questions, just reply — I read every one.\n\nKira\nFounder, KORU' }] }
        ]
    },
    {
        dayIndex: 27, phase: 'Week 5', dayLabel: 'Week 5, Пятница',
        title: 'Pre-launch FINAL check',
        summary: 'ВСЁ проверяем. Launch через выходные.',
        tasks: [
            { id: '070', title: '070. Кира + Настя: Pre-launch checklist', description: 'Зачем: Один шанс. Ничего не забыть.', steps: ['Launch post: ready + demo GIF?', 'Testimonials: 2-3 вставлены?', 'Landing: working?', 'Email: drafted?', 'Beta testers: notified? ("comment in first 30 min")', 'Product: stable? (Макс ОК)', 'Twitter launch post adapted?'], subtasks: [{ id: '070-st1', text: 'Launch post final' }, { id: '070-st2', text: 'Testimonials ready' }, { id: '070-st3', text: 'Landing OK' }, { id: '070-st4', text: 'Email ready' }, { id: '070-st5', text: 'Beta testers notified' }, { id: '070-st6', text: 'Product stable' }, { id: '070-st7', text: 'ALL SYSTEMS GO' }], assignee: 'Кира + Настя', estimate: '2 часа', priority: 'high', tags: ['planning'] }
        ],
        keyMetric: 'Week 5: 60-80 Priority B, testimonials ready, launch post final, ALL GO'
    },

    // ==========================================
    // WEEK 6 — LAUNCH (5 дней)
    // ==========================================
    {
        dayIndex: 28, phase: 'Week 6', dayLabel: 'Week 6, Понедельник',
        title: 'Teaser day',
        summary: '"Tomorrow." Финальные проверки.',
        tasks: [
            { id: '071', title: '071. Кира: Teaser post + final checks', description: 'Зачем: Build anticipation.', steps: ['LinkedIn + Twitter: "Tomorrow."', 'Final check: всё работает?', 'Remind beta testers: "Tomorrow morning"'], subtasks: [{ id: '071-st1', text: 'Teaser posted' }, { id: '071-st2', text: 'All checked' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['content'] }
        ]
    },
    {
        dayIndex: 29, phase: 'Week 6', dayLabel: 'Week 6, Вторник',
        title: 'LAUNCH DAY!',
        summary: '9:00 AM пост. Beta testers comment first. Кира online весь день.',
        tasks: [
            { id: '075', title: '075. Кира: 9:00 — Launch post LinkedIn', description: 'Зачем: THE moment.', steps: ['9:00 AM EST → опубликовать'], subtasks: [{ id: '075-st1', text: 'LinkedIn live' }], assignee: 'Кира', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'LAUNCH POST LinkedIn (заменить [QUOTE], приложить GIF)', text: 'Remember when I asked how long keyword research takes?\n\nThe answer was 3-4 hours per client. 40 hours a month. Spreadsheets. Manual clustering. Copy-pasting between four tools.\n\nToday, that changes.\n\nMeet KORU.\n\nPaste a URL. Get:\n-> Topic clusters (not keyword lists — actual clusters)\n-> Page mapping (which pages cover what)\n-> Content gaps (what\'s missing)\n-> Content briefs (one click)\n-> Tasks for your team (another click)\n\nFrom URL to keyword strategy in 5 minutes.\n\nHere\'s what beta testers said:\n\n"[QUOTE 1]" — [Name], [Role]\n"[QUOTE 2]" — [Name], [Role]\n\n[ATTACH DEMO GIF]\n\nTry it free: koru-seo.com\n\n#KORU #SEO #KeywordResearch #Launch' }, { label: 'Первый комментарий', text: 'Try it free: koru-seo.com\n\nHappy to answer any questions below!' }] },
            { id: '076', title: '076. Кира: 9:05 — Twitter launch thread', description: 'Зачем: Second channel.', steps: ['Thread'], subtasks: [{ id: '076-st1', text: 'Twitter live' }], assignee: 'Кира', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Twitter thread (copy-paste)', text: '1/ We launched KORU today.\n\nPaste a URL. Get a keyword strategy in 5 minutes.\nNot a list. A strategy: topic clusters, page mapping, content gaps, briefs.\n\n2/ We built this because every SEO pro said: "I spend 3-4 hours on keyword research per client. The tools give data, not strategy."\n\n3/ KORU automates: clustering, page mapping, gap identification, brief generation, task creation.\nIn minutes.\n\n4/ Try it free: koru-seo.com\n\n#KORU #SEO #Launch' }] },
            { id: '077', title: '077. Кира: 9:00-11:00 — 2 ЧАСА engagement', description: 'Зачем: САМЫЕ ВАЖНЫЕ 2 ЧАСА КАМПАНИИ.', steps: ['Каждый коммент = ответ', 'Beta testers comment в первые 30 мин', 'Лайкать всё'], subtasks: [{ id: '077-st1', text: '2ч engagement' }], assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['engagement'], warning: 'ТЕЛЕФОН В SILENT. НИКАКИХ ОТВЛЕЧЕНИЙ. ЭТО ВСЁ РЕШАЕТ.' },
            { id: '078', title: '078. Кира: 10:00 — Email waitlist', description: 'Зачем: Через 1 час после поста.', steps: ['Отправить email в Mailchimp/ConvertKit'], subtasks: [{ id: '078-st1', text: 'Email sent' }], assignee: 'Кира', estimate: '5 мин', priority: 'high', tags: ['outreach'] },
            { id: '079', title: '079. Настя: Track reactions + amplify', description: 'Зачем: Знать кто реагирует.', steps: ['Мониторить кто лайкнул/commented', 'Update Status в Sheets → "Engaged"', '5-7 comments к connections'], subtasks: [{ id: '079-st1', text: 'Reactions tracked' }, { id: '079-st2', text: 'Amplification' }], assignee: 'Настя', estimate: '2 часа', priority: 'high', tags: ['monitoring', 'engagement'] }
        ]
    },
    {
        dayIndex: 30, phase: 'Week 6', dayLabel: 'Week 6, Среда',
        title: 'Post-launch day 1',
        summary: 'Continue engagement. DMs to interested.',
        tasks: [
            { id: '080', title: '080. Кира: Post-launch engagement + conversion DMs', description: 'Зачем: Convert interest → signups.', steps: ['Answer all comments', 'DMs to interested: "Happy to do a walkthrough"', 'Track signups'], subtasks: [{ id: '080-st1', text: 'Comments + DMs' }], assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['engagement', 'outreach'], copyBlocks: [{ label: 'DM post-launch (copy-paste, заменить [Name])', text: 'Hey [Name],\n\nThanks for the kind words on the launch post! Really appreciate it.\n\nHappy to do a quick 15-minute walkthrough if you want to see KORU in action with your own site. No pitch — just a demo.\n\nWant me to send a calendar link?' }] },
            { id: '081', title: '081. Настя: Track + amplify + engagement', description: 'Зачем: Мониторинг.', steps: ['Continue tracking reactions', '5-7 comments'], subtasks: [{ id: '081-st1', text: 'Track + engage' }], assignee: 'Настя', estimate: '1.5 часа', priority: 'high', tags: ['monitoring', 'engagement'] }
        ]
    },
    {
        dayIndex: 31, phase: 'Week 6', dayLabel: 'Week 6, Четверг',
        title: 'Post-launch day 2',
        summary: 'Follow-up. Demo calls.',
        tasks: [
            { id: '082', title: '082. Кира: Follow-up engagement + demo calls', description: 'Зачем: Convert.', steps: ['Answer comments', 'Demo calls с interested', 'Twitter engagement'], subtasks: [{ id: '082-st1', text: 'Follow-up done' }], assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['engagement', 'outreach'] },
            { id: '083', title: '083. Настя: Engagement + ongoing tracking', description: 'Зачем: Keep momentum.', steps: ['5-7 comments', 'Track new reactions'], subtasks: [{ id: '083-st1', text: 'Engagement + tracking' }], assignee: 'Настя', estimate: '1 час', priority: 'medium', tags: ['engagement', 'monitoring'] }
        ]
    },
    {
        dayIndex: 32, phase: 'Week 6', dayLabel: 'Week 6, Пятница',
        title: 'Launch week review',
        summary: 'Полный обзор. Метрики. Retro. Week 7+ plan.',
        tasks: [
            { id: '085', title: '085. Кира + Настя: Launch Week Review', description: 'Зачем: Понять результаты.', steps: ['ALL metrics: impressions, likes, comments, shares, profile views, email signups, landing visits, product signups, DMs, demo calls', 'Retro: что сработало, что нет', 'Week 7+ plan: Priority C + regular content + convert'], subtasks: [{ id: '085-st1', text: 'Metrics compiled' }, { id: '085-st2', text: 'Retro' }, { id: '085-st3', text: 'Week 7+ plan' }], assignee: 'Кира + Настя', estimate: '1.5 часа', priority: 'high', tags: ['review'] }
        ],
        keyMetric: 'THE metrics: signups, demo calls, paying users'
    },

    // ==========================================
    // WEEK 7+ — POST-LAUNCH
    // ==========================================
    {
        dayIndex: 33, phase: 'Week 7+', dayLabel: 'Week 7+',
        title: 'Post-launch: convert → users',
        summary: 'Priority C outreach. Convert engaged → paying users. Regular content.',
        tasks: [
            { id: '090', title: '090. Настя: Priority C outreach (10-15/день) + engagement', description: 'Зачем: Social proof есть. Outreach easier.', steps: ['10-15 requests/день', '5-7 comments/день'], subtasks: [{ id: '090-st1', text: 'Priority C active' }], assignee: 'Настя', estimate: '2 часа/день', priority: 'medium', tags: ['outreach'] },
            { id: '091', title: '091. Кира: DMs to Engaged + demos + content', description: 'Зачем: Revenue starts here.', steps: ['DMs to ALL "Engaged" → demo offer', 'Demo calls', 'Content: 2 posts/week (user stories, updates, insights)', 'Twitter: continue'], subtasks: [{ id: '091-st1', text: 'DMs to engaged' }, { id: '091-st2', text: 'Regular content' }], assignee: 'Кира', estimate: '2-3 часа/день', priority: 'high', tags: ['outreach', 'content'] }
        ],
        keyMetric: 'Convert engagement → signups → paying users.'
    }
]

export const TOTAL_CAMPAIGN_DAYS = CAMPAIGN_DAYS.length
