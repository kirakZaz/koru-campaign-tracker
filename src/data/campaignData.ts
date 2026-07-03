import type { CampaignDay, CampaignState, LiveDay, LiveTask } from './campaignData.types'

export const CAMPAIGN_DAYS: CampaignDay[] = [
    // ==========================================
    // STORY 0 (3 дня)
    // ==========================================
    {
        dayIndex: -3, phase: 'Story 0', dayLabel: 'Story 0, День 1 (Ср)',
        title: 'Positioning + инфраструктура + аккаунты',
        summary: 'Фиксируем messaging, создаём Sheets, оптимизируем LinkedIn, создаём Twitter. Макс начинает landing.',
        tasks: [
            { id: '001', title: '001. Кира: Написать и зафиксировать core positioning', description: 'Создать документ с core messaging — что говорим, что не говорим, позиционирование. Без этого посты и комменты будут "от балды".', steps: ['Создать документ "KORU Positioning"', 'Записать core message, positioning statement, "что говорим / не говорим"', 'Расшарить с командой'], subtasks: [{ id: '001-st1', text: 'Core message записан' }, { id: '001-st2', text: 'Расшарено с командой' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['planning'], copyBlocks: [{ label: 'Core Message', text: 'From URL to published content in 5 minutes.\nKeyword research, clustering, SERP analysis, content briefs, ready-to-publish HTML articles — one click.\n8 hours of manual work, automated.' }, { label: 'Positioning Statement', text: 'KORU — для SEO-фрилансеров и небольших агентств, которые тратят 8 часов на keyword research + создание контента для каждого клиента. В отличие от Ahrefs/Semrush (дают данные) и Surfer/Frase (дают брифы), KORU даёт готовые статьи. От URL до публикации.' }, { label: 'Что говорим / Не говорим', text: 'ГОВОРИМ: боль 8 часов (research + контент), данные ≠ стратегия ≠ контент, бриф ≠ статья, "ready to publish"\nНЕ ГОВОРИМ: название KORU (до Week 4), конкретные фичи (до Week 3), цену (до Week 4), скриншоты (до Week 4)' }] },
            { id: '002', title: '002. Кира: Обновить LinkedIn профиль', description: 'LinkedIn профиль — первое что увидит потенциальный клиент. Обновить headline, about, фото. Headline строится на БОЛИ клиента, не на твоей должности.', steps: ['Headline: см. текст ниже', 'About: см. текст ниже', 'Photo: профессиональное. Cover: тёмный.', 'Проверить: нигде нет "KORU"'], subtasks: [{ id: '002-st1', text: 'Headline обновлён' }, { id: '002-st2', text: 'About обновлён' }, { id: '002-st3', text: 'Нет упоминаний KORU' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['linkedin', 'branding'], copyBlocks: [{ label: 'Headline (copy-paste в LinkedIn)', text: 'SEO professionals spend 8 hours per client on research + content. I\'m fixing that.' }, { label: 'About (copy-paste в LinkedIn)', text: 'I spent the last 6 months talking to SEO freelancers and agency owners. Every single one told me the same thing: keyword research takes forever, content creation takes even longer, and the tools give data but not finished work.\n\nI keep asking one question: what if you could go from a URL to ready-to-publish articles in 5 minutes? Not a keyword list. Not a brief you hand to a copywriter. Actual articles — optimized, structured, ready for your CMS.\n\nBuilding something. More soon.' }] },
            { id: '003', title: '003. Кира: Создать Twitter/X аккаунт', description: 'Создать Twitter/X аккаунт. SEO-сообщество активно там — второй канал помимо LinkedIn. Подписаться на ключевых людей, первую неделю только слушать.', steps: ['Sign up: https://x.com', 'Bio: см. ниже', 'Подписаться на 20-30 SEO-людей — поиск: https://x.com/search?q=SEO%20consultant&f=user', 'Ключевые: Lily Ray, Aleyda Solis, John Mueller, Barry Schwartz, Kevin Indig', 'НЕ постить пока — неделя listening'], subtasks: [{ id: '003-st1', text: 'Аккаунт создан' }, { id: '003-st2', text: 'Подписки 20-30' }], assignee: 'Кира', estimate: '30 мин', priority: 'high', tags: ['setup'], copyBlocks: [{ label: 'Twitter Bio (copy-paste)', text: 'Building a tool that turns URLs into published articles. From research to content in 5 minutes, not 8 hours.' }] },
            { id: '004', title: '004. Настя: Создать Google Sheets', description: 'Теперь вместо Google Sheets используем Sources в campaign tracker. Но если нужна доп. таблица для метрик — создать Google Sheet с вкладками Metrics и формулами.', steps: ['Создать "KORU Prospects — 2026"', '14 колонок + data validation (выпадающие списки чтоб не вводить вручную) + conditional formatting (цветовая подсветка по приоритету)', 'Вкладки Metrics (цифры по неделям) + Sources → таб Группы (откуда нашли людей)', 'Расшарить команде'], subtasks: [{ id: '004-st1', text: 'Sheet создан' }, { id: '004-st2', text: 'Validation + formatting' }, { id: '004-st3', text: 'Доступ расшарен' }], assignee: 'Настя', estimate: '1 час', priority: 'high', tags: ['setup'] },
            { id: '005', title: '005. Макс: Landing page koru-seo.com', description: 'Сделать landing page koru-seo.com. Когда человек кликнет на ссылку — должен увидеть красивую страницу с формой email подписки, а не 404.', steps: ['Тёмная тема, #0d1117 + #3fb68e', 'Текст: см. ниже', 'Email capture + "Notify me"', 'НЕТ скриншотов, фич, цен'], subtasks: [{ id: '005-st1', text: 'Landing live' }, { id: '005-st2', text: 'Email capture работает' }], assignee: 'Макс', estimate: '1 день', priority: 'high', tags: ['landing'], copyBlocks: [{ label: 'Landing page copy', text: 'H1 (главный заголовок): Stop researching. Start publishing.\n\nSubheadline (подзаголовок): From URL to ready-to-publish articles. In minutes, not hours.\n\nCTA (Call to Action — кнопка призыва к действию): Get early access\n[Email input] [Notify me]' }] }
        ]
    },
    {
        dayIndex: -2, phase: 'Story 0', dayLabel: 'Story 0, День 2 (Чт)',
        title: 'Группы + Onboarding + Company Page',
        summary: 'LinkedIn группы, onboarding Насти (новый ICP — 3 сегмента), Company Page в stealth.',
        tasks: [
            { id: '006', title: '006. Настя: Подать заявки в 10 LinkedIn групп (Кира)', description: 'Зайти в LinkedIn с аккаунта Киры → подать заявки в 10 SEO-групп. Группы апрувят медленно (дни/недели), поэтому подаём заранее. Статусы записать в Sources → Группы.', steps: ['LinkedIn аккаунт Киры → Groups → Discover: https://www.linkedin.com/search/results/groups/?keywords=SEO', '10 групп: SEO Professionals, Technical SEO, Search Engine Land, Digital Marketing, SEO & SEM Professionals, Content Marketing & SEO, Agency Growth & Scaling, Moz Community, SEO for Startups, International SEO', 'Записать статусы в Sources → таб Группы'], subtasks: [{ id: '006-st1', text: '10 заявок подано (Кира)' }, { id: '006-st2', text: 'Sources → таб Группы' }], assignee: 'Настя', estimate: '30 мин', priority: 'high', tags: ['setup', 'linkedin'] },
            { id: '007', title: '007. Настя: Подать заявки в 10 групп (Настя)', description: 'Те же 10 групп, но с аккаунта Насти. Два аккаунта = больше видимости в группах.', steps: ['Те же 10 групп, аккаунт Насти', 'Sources → таб Группы'], subtasks: [{ id: '007-st1', text: '10 заявок (Настя)' }], assignee: 'Настя', estimate: '20 мин', priority: 'high', tags: ['setup', 'linkedin'] },
            { id: '008', title: '008. Кира + Настя: Onboarding — новый ICP + messaging', description: 'Созвон Кира + Настя. Разобрать: кого ищем (3 сегмента ICP), как отличить Priority A/B/C, каким тоном комментить (умные вопросы, не "Great post!"). Разбор 5 живых профилей + 3 постов.', steps: ['Созвон 1.5 часа', '3 сегмента ICP: Freelance SEO / Small Agency 3-15 / In-House Manager', 'Priority A (идеальный клиент) / B (подходит, но не идеально) / C (возможно позже)', 'Тон комментов: sharp вопросы, не "Great post!"', 'Разбор 5 живых профилей + 3 постов'], subtasks: [{ id: '008-st1', text: 'Созвон проведён' }, { id: '008-st2', text: 'ICP ясен' }, { id: '008-st3', text: 'Тон понятен' }], assignee: 'Кира + Настя', estimate: '1.5 часа', priority: 'high', tags: ['onboarding'] },
            { id: '009b', title: '009b. Макс: Google Analytics + UTM tracking', description: 'Зачем: Без аналитики не узнаем сколько людей приходят с постов на landing. GA4 (Google Analytics 4) — бесплатный сервис от Google, показывает кто заходит на сайт, откуда и что делает. UTM — это специальные метки в ссылках (например ?utm_source=linkedin&utm_campaign=post1), по которым GA4 понимает из какого именно поста пришёл человек. Goals — это целевые действия которые мы хотим отслеживать (подписка на email, клик на кнопку).', steps: ['GA4: зарегистрироваться на https://analytics.google.com/ → создать property для koru-seo.com → вставить tracking код на сайт', 'UTM: создать шаблон ссылок. Пример: koru-seo.com?utm_source=linkedin&utm_medium=post&utm_campaign=post1. Для каждого поста менять utm_campaign', 'UTM генератор: https://ga-dev-tools.google/campaign-url-builder/', 'Goals: в GA4 → Admin → Events → создать events: "email_signup" (когда кто-то подписывается) и "page_view" (просмотры)', 'Проверить: открыть landing с UTM-ссылкой → зайти в GA4 Realtime → убедиться что визит виден'], subtasks: [{ id: '009b-st1', text: 'GA4 установлен' }, { id: '009b-st2', text: 'UTM шаблоны' }, { id: '009b-st3', text: 'Goals настроены' }], assignee: 'Макс', estimate: '1.5 часа', priority: 'high', tags: ['setup'] },
            { id: '009c', title: '009c. Макс: Email capture настройка (Mailchimp/ConvertKit)', description: 'Зачем: Landing page собирает emails. Mailchimp и ConvertKit — сервисы email-рассылок. Хранят список подписчиков и позволяют отправлять красивые письма всем сразу.', steps: ['Выбрать сервис (Mailchimp или ConvertKit)', 'Создать list "KORU Early Access"', 'Интегрировать с landing page формой', 'Тестовый signup'], subtasks: [{ id: '009c-st1', text: 'Сервис выбран' }, { id: '009c-st2', text: 'Интеграция работает' }], assignee: 'Макс', estimate: '1 час', priority: 'high', tags: ['setup'] },
            { id: '009', title: '009. Кира: LinkedIn Company Page (soft stealth)', description: 'Создать LinkedIn Company Page для KORU. Пока без деталей продукта — просто "Software Development, 2-10 сотрудников". Доверие без раскрытия.', steps: ['KORU | Software Development | 2-10', 'About: "Rethinking how SEO professionals do keyword research. Launching 2026."', 'НЕ добавлять KORU в Experience пока'], subtasks: [{ id: '009-st1', text: 'Company Page создана' }], assignee: 'Кира', estimate: '45 мин', priority: 'medium', tags: ['linkedin', 'branding'] }
        ]
    },
    {
        dayIndex: -1, phase: 'Story 0', dayLabel: 'Story 0, День 3 (Пт)',
        title: 'Тестовый прогон + написать посты + график',
        summary: 'Настя — тест 5 профилей. Кира — черновики 6 постов. График с Максом.',
        tasks: [
            { id: '010', title: '010. Настя: Найти 5 тестовых профилей для проверки', description: 'Кира проверит понимаешь ли ты кого искать. Найди 5 человек Priority A в LinkedIn, добавь их в Sources → Люди со всеми полями заполненными. В заметках напиши почему выбрала каждого.', steps: ['"SEO consultant" AND "freelance" → 5 Priority A: https://www.linkedin.com/search/results/people/?keywords=%22SEO%20consultant%22%20%22freelance%22', 'Все 14 колонок + reasoning в Notes', 'Сообщить Кире'], subtasks: [{ id: '010-st1', text: '5 профилей добавлены' }, { id: '010-st2', text: 'Кире сообщено' }], assignee: 'Настя', estimate: '50 мин', priority: 'high', tags: ['review'] },
            { id: '011', title: '011. Кира: Проверить 5 профилей от Насти', description: 'Открой Sources → Люди, посмотри 5 человек которых добавила Настя. Проверь: правильный ли ICP? Правильный ли приоритет? Есть ли смысл в заметках? Если 4+ из 5 ОК → Настя готова работать самостоятельно.', steps: ['Открыть каждый → Priority OK? Segment OK? Notes?', 'Feedback Насте'], subtasks: [{ id: '011-st1', text: '4+ из 5 OK' }, { id: '011-st2', text: 'Feedback дан' }], assignee: 'Кира', estimate: '30 мин', priority: 'high', tags: ['review'] },
            { id: '012', title: '012. Кира: Написать черновики постов 1-6 (НЕ публиковать)', description: 'Написать черновики 6 постов в Google Doc. НЕ публиковать — только подготовить заранее чтобы на неделе просто копировать и постить.', steps: ['Создать Google Doc "KORU Campaign Posts"', 'Написать 6 постов (тексты в copy blocks)', 'НЕ публиковать — только черновики'], subtasks: [{ id: '012-st1', text: 'Пост 1 написан' }, { id: '012-st2', text: 'Пост 2 написан' }, { id: '012-st3', text: 'Пост 3 написан' }, { id: '012-st4', text: 'Пост 4 написан' }, { id: '012-st5', text: 'Пост 5 написан' }, { id: '012-st6', text: 'Пост 6 написан' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content'], warning: 'ЧЕРНОВИКИ! НЕ публиковать.' },
            { id: '013', title: '013. Кира + Макс: График + launch date', description: 'Созвон с Максом: определить launch date (Week 6), отсчитать назад все вехи, создать события в календаре.', steps: ['Созвон 30 мин', 'Launch date (Week 6)', 'Отсчитать назад, Calendar события'], subtasks: [{ id: '013-st1', text: 'Launch date' }, { id: '013-st2', text: 'Calendar' }], assignee: 'Кира + Макс', estimate: '30 мин', priority: 'high', tags: ['planning'] }
        ],
        keyMetric: 'Story 0 Done: positioning, profiles, sheets, groups, onboarding, 6 постов, график.'
    },

    // ==========================================
    // WEEK 1 — INTRIGUE + RESEARCH (5 дней)
    // ==========================================
    {
        dayIndex: 0, phase: 'Week 1', dayLabel: 'Week 1, Пн',
        title: 'Кира учёба. Настя: research Day 1',
        summary: 'Понедельник = Кира учёба. Настя: День 1/3 research.',
        tasks: [
            { id: '017', title: '017. Настя: ДЕНЬ 1/3 — LinkedIn search (цель: 40 людей)', description: 'День 1 из 3. Только research. Все LinkedIn запросы. Добавить в Sources → Люди. Цель: 40 человек.', steps: ['"SEO consultant" AND "freelance": https://www.linkedin.com/search/results/people/?keywords=%22SEO%20consultant%22%20%22freelance%22', '"SEO agency" AND "founder": https://www.linkedin.com/search/results/people/?keywords=%22SEO%20agency%22%20%22founder%22', '"Head of SEO": https://www.linkedin.com/search/results/people/?keywords=%22Head%20of%20SEO%22', '"SEO manager" AND "agency": https://www.linkedin.com/search/results/people/?keywords=%22SEO%20manager%22%20%22agency%22', '"SEO strategist": https://www.linkedin.com/search/results/people/?keywords=%22SEO%20strategist%22', '"SEO analyst" AND "senior": https://www.linkedin.com/search/results/people/?keywords=%22SEO%20analyst%22%20%22senior%22', 'Из каждого: пролистать 20-30 → выбрать 5-7 лучших → Sources → Люди', 'Проверить Dashboard → цель 40 людей'], subtasks: [{ id: '017-st1', text: '40 людей в базе' }], assignee: 'Настя', estimate: '2-3 часа', priority: 'high', tags: ['research'] }
        ]
    },
    {
        dayIndex: 1, phase: 'Week 1', dayLabel: 'Week 1, Вт',
        title: 'POST DAY: Пост 1 + ревью групп + Настя Day 2',
        summary: 'Вторник = POST day. Кира: ревью групп + Пост 1 + engagement. Настя: Day 2/3.',
        tasks: [
            { id: '017c', title: '017c. Кира: Ревью LinkedIn групп — найти 3-5 живых', description: 'Перед первым постом — проверить какие группы живые для шаринга.', steps: ['Sources → Группы → какие approved?', 'Каждую открыть: последний пост < 7 дней? Есть комменты? Разные люди?', 'Живые → notes "шарить". Мёртвые → "не шарить"', 'Цель: 3-5 живых групп'], subtasks: [{ id: '017c-st1', text: '3-5 живых' }], assignee: 'Кира', estimate: '20 мин', priority: 'high', tags: ['research', 'linkedin'] },
            { id: '014', title: '014. Кира: Опубликовать Пост 1 на LinkedIn', description: 'Первый пост кампании. Скопировать текст из copy block → вставить в LinkedIn → опубликовать. Картинка: Creatives → Post 1 (stat card 8h + 48%). Алгоритм LinkedIn решает в первые 2 часа — сразу после поста быть онлайн.', steps: ['Creatives → Post 1 → скриншот карточки (Cmd+Shift+4)', 'LinkedIn → Start a post → скопировать текст ниже', 'Прикрепить картинку', 'Проверить форматирование', 'Опубликовать', 'Расшарить в 3-5 одобренных LinkedIn групп'], subtasks: [{ id: '014-st1', text: 'Опубликован' }, { id: '014-st2', text: 'Расшарен в группы' }], assignee: 'Кира', estimate: '15 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Пост 1 LinkedIn (copy-paste)', text: 'I asked 20 SEO freelancers one simple question:\n\n"How long does it take — from keyword research to published content — per client?"\n\nThe average answer: 8 hours.\n\n3-4 hours on keyword research.\n2-3 hours writing the article.\n1 hour optimizing tags, structure, internal links.\n\nFor a freelancer managing 10 clients, that\'s 80 hours a month.\n\nTwo full work weeks. Every month. Just on research and content.\n\nBut here\'s what nobody mentioned:\n\nEven after those 8 hours, 48% of Google searches now show an AI-generated answer ABOVE the #1 organic result.\n\nYou optimized for a position.\nThe user got their answer without clicking.\n\nHow long does yours take?\nAnd do you know if AI engines cite your content at all?\n\n#SEO #KeywordResearch #AISearch' }] },
            { id: '033', title: '033. Настя: ДЕНЬ 2/3 — группы + communities + блоги (цель: 80 total)', description: 'День 2 из 3. Найти людей из LinkedIn групп, SEO communities, конференций, блогов и G2. Добавить в Sources → Люди. Цель: 80 людей total.', steps: ['LinkedIn группы (10 одобренных) — найти активных участников', 'Конференции: BrightonSEO (https://www.brightonseo.com/speakers/), MozCon (https://moz.com/mozcon)', 'Communities: r/SEO, r/bigseo, Women in Tech SEO (https://www.womenintechseo.com/)', 'SEO блоги: Search Engine Journal, Moz Blog, Ahrefs Blog — авторы статей', 'G2: Ahrefs reviewers (https://www.g2.com/products/ahrefs/reviews), Semrush reviewers', 'Все найденные → LinkedIn → Sources → Люди', 'Dashboard → цель 80 total'], subtasks: [{ id: '033-st1', text: '80 людей total' }], assignee: 'Настя', estimate: '2-3 часа', priority: 'high', tags: ['research'] },
            { id: '015', title: '015. Макс: Кросс-пост 1 на Twitter', description: 'Скопировать tweet из copy block → опубликовать в Twitter.', steps: ['Скопировать текст из copy block → Twitter → опубликовать'], subtasks: [{ id: '015-st1', text: 'Tweet опубликован' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Tweet (copy-paste)', text: 'I asked 20 SEO freelancers: how long from keyword research to published content per client?\n\nAverage: 8 hours.\n3-4h research. 2-3h writing. 1h optimizing.\n\n10 clients = 80 hours/month.\n\nAnd now 48% of Google searches show an AI answer ABOVE your #1 result.\n\nYou optimized for a click that\'s disappearing.\n\nHow long does yours take?\n\n#SEO #AISearch' }] },
            { id: '016', title: '016. Кира: 2ч engagement — ответить на ВСЕ комменты', description: '2 часа после публикации — отвечать на КАЖДЫЙ коммент развёрнуто (не "спасибо!"). Каждый ответ = сигнал алгоритму LinkedIn показывать пост большему числу людей. Записать кто комментил.', steps: ['2 часа на LinkedIn + Twitter', 'Каждый коммент = content-rich ответ', 'Записать commenters'], subtasks: [{ id: '016-st1', text: '2ч engagement' }, { id: '016-st2', text: 'Commenters записаны' }], assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['engagement'], warning: '2 ЧАСА NON-NEGOTIABLE.', copyBlocks: [{ label: 'Reply: кто-то согласен', text: 'Right? And here\'s the stat that shook me: only 38% of pages AI engines cite are in the traditional top-10. Meaning you can rank #1 and still be invisible to the AI answer. Have you noticed that with any of your clients?' }, { label: 'Reply: кто-то называет время', text: 'That\'s about average for the research part. But the scarier question is — after all that time, does the content actually show up in AI answers? I\'ve been looking into what makes a page "citable" by AI engines. Turns out it\'s very specific: FAQ schema, factual claims with numbers, question-shaped headings. Not what most SEO processes optimize for.' }, { label: 'Reply: "What\'s the solution?"', text: 'Working on something. Not ready to share details yet, but the core idea: audit a site not just for Google rankings, but for AI-citation readiness. A score that tells you how likely AI engines are to cite each page — and what to fix. More soon.' }] },
            { id: '016b', title: '016b. Кира: DMs к commenters поста 1 (в тот же день!)', description: 'Написать 2-3 DM самым интересным commenters поста (НЕ всем). В течение 24 часов — пока помнят пост. Тон: продолжить разговор, НЕ продавать.', steps: ['Посмотреть кто оставил содержательный коммент', 'DM 2-3 самым интересным (НЕ всем)', 'Тон: продолжение разговора, НЕ pitch'], subtasks: [{ id: '016b-st1', text: '2-3 DMs отправлены' }], assignee: 'Кира', estimate: '15 мин', priority: 'high', tags: ['outreach'], copyBlocks: [{ label: 'DM после коммента (заменить [Name], [their point])', text: 'Hey [Name],\n\nReally appreciated your comment — especially the point about [their specific point].\n\nQuick question — have you looked into how your clients\' content performs in AI answers specifically?\n\nI\'ve been digging into this and the numbers are wild: only 38% of pages that AI engines cite overlap with the traditional top-10.\n\nHave you seen that disconnect with any of your clients\' sites? Ranking well but not showing up in AI answers?' }] },
        ]
    },
    {
        dayIndex: 2, phase: 'Week 1', dayLabel: 'Week 1, Ср',
        title: 'ПОСТ 2 (AI blind spot) + Настя День 3/3',
        summary: 'Пост 2 "The SEO blind spot — AI search" (LinkedIn). Настя: последний день — категоризация.',
        tasks: [
            { id: '048', title: '048. Настя: ДЕНЬ 3/3 — категоризация + cleanup (финал)', description: 'Последний день Насти. Пройти всю базу: ICP, Priority, Activity Level, источник. Спорные → заметки для Киры. Цель: 80+ людей, база чистая.', steps: ['Пройти ВСЕ профили в Sources → Люди', 'У каждого: ICP, Priority (A/B/C), Activity Level, Source заполнены', 'Спорные cases → отметить в Notes для Киры', 'Dashboard → цель 80+ людей, база чистая'], subtasks: [{ id: '048-st1', text: 'Все профили проверены' }, { id: '048-st2', text: 'База чистая' }], assignee: 'Настя', estimate: '2-3 часа', priority: 'high', tags: ['review'] },
            { id: '020', title: '020. Кира: Пост 2 на LinkedIn + 2ч engagement', description: 'Пост 2: "The SEO blind spot — AI search". Картинка: Creatives → Post 2 (checklist AI-citation). Скопировать текст → LinkedIn → опубликовать → 2ч отвечать на комменты.', steps: ['Creatives → Post 2 → скриншот карточки', 'Скопировать текст → LinkedIn → прикрепить картинку → опубликовать', 'Расшарить в 3-5 LinkedIn групп', '2ч engagement'], subtasks: [{ id: '020-st1', text: 'Пост + группы + engagement' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement'], copyBlocks: [{ label: 'Пост 2 LinkedIn (copy-paste)', text: 'The SEO industry has a blind spot.\n\nWe obsess over keyword volume. Sort by difficulty.\nBuild clusters around search terms.\n\nBut here\'s what changed:\n\n→ 48% of Google searches trigger an AI Overview\n→ AI Overviews cut first-result CTR by 34.5%\n→ Only 38% of AI-cited pages are in the top-10\n→ Average AI Mode query is 3x longer than classical search\n→ 1 in 6 US searches is now voice or image\n\nYou can rank #1 and be invisible — because the AI answer sits above you and doesn\'t cite your page.\n\nThe question shifted from "what keywords should I target?" to "is my content structured so AI engines extract and cite it?"\n\nThat means:\n— FAQ and HowTo schema (most-cited formats in AI Overviews)\n— Inverted pyramid: answer the question in the first paragraph\n— Factual claims with numbers, not marketing prose\n— Named entities, not "a leading solution"\n— Question-shaped subheadings ("What is...", "How does...")\n— Let AI crawlers in (GPTBot, ClaudeBot not blocked)\n\nHow many of your pages would pass that checklist?\n\n#SEO #AIO #GEO #AISearch' }, { label: 'Reply: кто-то спрашивает "how do I check this?"', text: 'Great question. Manually: check your robots.txt for GPTBot/ClaudeBot blocks, look at your JSON-LD for FAQPage schema, read your first paragraph — does it answer the main question directly? I\'ve been working on a way to automate these checks — 14 specific rules scored per page. More on that soon.' }] },
            { id: '020t', title: '020t. Макс: Кросс-пост 2 на Twitter', description: 'Адаптировать пост 2 для Twitter и опубликовать.', steps: ['Адаптировать текст поста 2 для Twitter (короче, без списков)', 'Опубликовать в Twitter'], subtasks: [{ id: '020t-st1', text: 'Tweet опубликован' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Tweet (copy-paste)', text: 'The SEO blind spot:\n\n48% of Google searches → AI Overview above #1\nCTR drops 34.5% when it appears\nOnly 38% of AI-cited pages are in the top-10\n\nYou can rank #1 and be invisible.\n\nThe question isn\'t "what keywords?" anymore.\nIt\'s "can AI engines cite my content?"\n\n#SEO #AISearch #GEO' }] },
            { id: '020b', title: '020b. Кира: DMs к commenters поста 2 (в тот же день)', description: '2-3 DM к commenters поста 2. В тот же день пока помнят. Тон: вопрос про их workflow.', steps: ['2-3 DMs к commenters поста 2', 'Тон: вопрос про их workflow, НЕ pitch'], subtasks: [{ id: '020b-st1', text: '2-3 DMs' }], assignee: 'Кира', estimate: '15 мин', priority: 'high', tags: ['outreach'] },
            { id: '020c', title: '020c. Кира: CHECKPOINT — оценка engagement постов 1-2', description: 'Стоп. Честно оценить: посты 1-2 работают или нет? Посмотреть impressions и комменты. Если < 500 impressions — что-то не так с аудиторией или messaging. Лучше скорректировать сейчас.', steps: ['Посмотреть метрики постов 1-2: impressions, likes, comments', 'ЗЕЛЁНЫЙ: пост 1 или 2 > 1000 impressions И > 5 комментов → продолжаем по плану', 'ЖЁЛТЫЙ: 500-1000 impressions ИЛИ 2-5 комментов → сменить формат следующего поста (carousel, видео, другой hook)', 'КРАСНЫЙ: < 500 impressions И < 2 комментов → СТОП. Пересмотреть: правильный ли ICP? Правильный ли messaging? Достаточно ли connections?', 'Если КРАСНЫЙ: перед постом 3 — добавить 50+ connections в target аудитории, переписать hook'], subtasks: [{ id: '020c-st1', text: 'Метрики проверены' }, { id: '020c-st2', text: 'Решение: GO / ADJUST / STOP' }], assignee: 'Кира', estimate: '15 мин', priority: 'high', tags: ['review'], warning: 'Не игнорировать плохие цифры. Лучше скорректировать сейчас.' },
            { id: '023', title: '023. Кира + Настя: Быстрая проверка качества базы (15 мин)', description: 'Кира открывает Sources → Люди, проверяет 10-15 случайных профилей. Правильный ли ICP? Приоритет? Если есть ошибки — объяснить Насте что поправить.', steps: ['Кира: 10-15 random → Priority OK?', 'Feedback'], subtasks: [{ id: '023-st1', text: 'Review + feedback' }], assignee: 'Кира + Настя', estimate: '15 мин', priority: 'high', tags: ['review'] }
        ]
    },
    {
        dayIndex: 3, phase: 'Week 1', dayLabel: 'Week 1, Чт',
        title: 'Research finish + competitor pain research',
        summary: 'Настя завершает batch 2 + Twitter cross-check. Кира собирает жалобы на конкурентов.',
        tasks: [
            { id: 'noa-1', title: '100. Кира: Noa Vernick — подписаться + изучить контент', description: 'Noa Vernick — AI Visibility Specialist @ Invelo AI (Бостон). Делает AI visibility для SaaS-клиентов. Потенциальный power user / partner. Banner: "Own the Answer in AI Search". Шаг 1: подписаться (Follow), изучить её последние 5-7 постов, записать темы и тон в Notes.', steps: ['Зайти: https://www.linkedin.com/in/noa-vernick-b82494203/', 'Нажать Follow (НЕ Connect — рано)', 'Прочитать последние 5-7 постов — о чём пишет? Какой тон? Какие темы?', 'Посмотреть Featured: "3-Question Test", "AI-generated pages", "brand visibility"', 'Записать в Sources → Люди → Notes: темы постов, тон, что можно прокомментировать'], subtasks: [{ id: 'noa-1-st1', text: 'Follow' }, { id: 'noa-1-st2', text: 'Посты изучены' }, { id: 'noa-1-st3', text: 'Notes обновлены' }], assignee: 'Кира', estimate: '15 мин', priority: 'high', tags: ['outreach', 'research'] },
            { id: '025', title: '025. Кира: Найти 10-15 жалоб на keyword research + AI search pain', description: 'Зайти в LinkedIn, Twitter, Reddit. Найти посты где люди жалуются на: ручной keyword research, дорогие подписки, AI Overviews убивающие клики, непонимание как оптимизировать для AI search. Скопировать цитаты. Материал для постов и landing page.', steps: ['LinkedIn: "keyword research" + "manual": https://www.linkedin.com/search/results/content/?keywords=%22keyword%20research%22%20%22manual%22', 'LinkedIn: "AI Overviews" + "CTR" OR "clicks": https://www.linkedin.com/search/results/content/?keywords=%22AI%20Overviews%22%20%22CTR%22', 'Twitter: #SEOtools complaints + AI search: https://x.com/search?q=%23SEO%20%22AI%20overview%22&src=typed_query', 'Reddit r/SEO "AI overview" OR "zero click": https://www.reddit.com/r/SEO/search/?q=%22AI%20overview%22%20OR%20%22zero%20click%22', 'Reddit r/bigseo: https://www.reddit.com/r/bigseo/search/?q=AI%20overview%20OR%20GEO', 'Записать 10-15 цитат с источником (mix: старые боли + AI search боли)'], subtasks: [{ id: '025-st1', text: '10-15 цитат' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'medium', tags: ['research', 'content'] }
        ]
    },
    {
        dayIndex: 4, phase: 'Week 1', dayLabel: 'Week 1, Пт',
        title: 'ПОСТ 3 (AI search poll) + weekly review + черновики',
        summary: 'Пост 3 — Poll про AI search concerns (LinkedIn). Weekly metrics. Кира пишет посты 4-9 (GEO + AI angle).',
        tasks: [
            { id: '026', title: '026. Кира: Пост 3 LinkedIn POLL + 2ч engagement', description: 'Пост 3 — LinkedIn Poll. Polls получают 3-5x больше показов. Картинка: Creatives → Post 3 (poll card). Создать poll (см. copy block), опубликовать, 2ч engagement.', steps: ['Creatives → Post 3 → скриншот карточки (опционально — poll сам визуальный)', 'Создать Poll на LinkedIn (см. copy block)', 'Добавить контекст в описании поста', 'Расшарить в 3-5 LinkedIn групп', '2ч engagement — отвечать на каждый коммент с follow-up вопросом'], subtasks: [{ id: '026-st1', text: 'LinkedIn Poll' }, { id: '026-st2', text: 'Twitter пост' }, { id: '026-st3', text: 'Engagement' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement'], copyBlocks: [{ label: 'Пост 3 LinkedIn POLL (copy-paste)', text: 'New question for SEO professionals.\n\n2026 brought AI Overviews to 48% of Google searches.\nAI Mode just became default for 1B+ users.\n\nWhich of these is your biggest concern RIGHT NOW?\n\n📊 POLL:\n1. AI Overviews taking my organic clicks\n2. Not knowing if AI engines cite my content\n3. Clients asking about "AI SEO" — no answers yet\n4. Still doing keyword research the old way\n\nWhat\'s your strategy for AI search so far?\nDrop it in the comments.\n\n(If the honest answer is "I don\'t have one yet" — you\'re not alone. Most don\'t.)\n\n#SEO #AIOverviews #GenerativeSearch' }, { label: 'Poll Options (создать в LinkedIn)', text: 'Option 1: AI Overviews taking my organic clicks\nOption 2: Not knowing if AI engines cite my content\nOption 3: Clients asking about "AI SEO" — no answers yet\nOption 4: Still doing keyword research the old way\n\nDuration: 1 week' }, { label: 'Tweet (copy-paste)', text: 'SEO professionals — biggest concern in 2026?\n\nA) AI Overviews taking organic clicks\nB) Not knowing if AI engines cite my content\nC) Clients asking about "AI SEO" — no answers\nD) Still doing keyword research the old way\n\nWhat\'s your AI search strategy? Reply honestly.\n\n#SEO #AIOverviews' }, { label: 'Reply: кто-то выбрал #1 (AI Overviews taking clicks)', text: 'That\'s the big one. And the uncomfortable truth: ranking higher doesn\'t solve it. The AI answer sits ABOVE position #1. The new game is getting your page cited INSIDE that answer. Which depends on things most SEO workflows don\'t measure — schema type, answer-shaped leads, factual density, entity mentions.' }, { label: 'Reply: кто-то выбрал #2 (not knowing if cited)', text: 'Exactly — it\'s a measurement gap. You can check manually by asking ChatGPT or Gemini a query and seeing if your brand appears. But doing that across 50 queries monthly? Not scalable. That\'s one of the things I\'ve been building toward — automated monitoring of whether AI engines recommend your brand. Per provider, with trends over time.' }] },
            { id: '026t', title: '026t. Макс: Кросс-пост 3 на Twitter', description: 'Адаптировать poll поста 3 для Twitter.', steps: ['Скопировать tweet из copy block поста 026 → Twitter → опубликовать'], subtasks: [{ id: '026t-st1', text: 'Tweet опубликован' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['content'] },
            { id: '026b', title: '026b. Кира: DMs к commenters поста 3 / poll voters', description: '2-3 DM к самым активным commenters/voters полла. Спросить про их AI search стратегию.', steps: ['2-3 DMs к самым активным commenters/voters', 'Спросить про их AI search стратегию'], subtasks: [{ id: '026b-st1', text: '2-3 DMs' }], assignee: 'Кира', estimate: '15 мин', priority: 'high', tags: ['outreach'], copyBlocks: [{ label: 'DM после poll vote (заменить [Name], [Option they chose])', text: 'Hey [Name],\n\nThanks for voting on the poll. [Option they chose] seems to be the common theme.\n\nCurious: have you tried measuring your AI-citation readiness specifically? Things like whether your pages have FAQ schema, whether your first paragraphs answer questions directly, whether AI crawlers can access your content?\n\nI\'ve been building a checklist — 14 rules that determine whether AI engines can cite a page. Would you want to see it when it\'s ready?' }] },
            { id: 'noa-2', title: '101. Кира: Noa Vernick — первый коммент к её посту', description: 'Найти свежий пост Noa про AI visibility / AI search. Оставить умный коммент — вопрос или дополнение. НЕ питчить KORU. Цель: она увидит твоё имя и запомнит.', steps: ['Открыть её профиль → Activity → Posts', 'Найти пост где можешь добавить ценность (факт, вопрос, альтернативная точка зрения)', 'Написать коммент 2-4 предложения. Примеры тем: как измеряет AI visibility для клиентов? Какие метрики использует? Как отслеживает динамику?', 'НЕ упоминать KORU. Просто участвуй в дискуссии как peer.'], subtasks: [{ id: 'noa-2-st1', text: 'Коммент оставлен' }], assignee: 'Кира', estimate: '10 мин', priority: 'medium', tags: ['outreach'], copyBlocks: [{ label: 'Пример коммента (адаптировать под пост)', text: 'Curious about your measurement approach — when you track AI visibility for clients, are you checking each provider separately (OpenAI vs Gemini) or looking at it as one combined score? We keep seeing very different results per provider for the same brand.' }] },
            { id: '028', title: '028. Кира: Пятничные метрики — проверить dashboard', description: 'Campaign Tracker → Sources → Dashboard. Проверить цели W1.', steps: ['Dashboard → цель 40 людей total', 'A/B/C breakdown OK?'], subtasks: [{ id: '028-st1', text: 'Метрики проверены' }], assignee: 'Кира', estimate: '5 мин', priority: 'high', tags: ['review'] },
            { id: '028b', title: '028b. Макс: Weekly метрики постов + analytics', description: 'Зачем: Трекать что работает. Каждую пятницу собираем цифры. Impressions = сколько людей увидели пост. Engagement = лайки + комменты + репосты. Conversion rate = какой % посетителей подписался на email.', steps: ['GA4 (https://analytics.google.com/) → Acquisition → смотрим: сколько визитов на landing за неделю, сколько email signups, откуда пришли (utm_source)', 'LinkedIn: открыть каждый пост → Analytics → записать impressions (показы), likes, comments', 'Twitter: открыть каждый tweet → View analytics → impressions, engagement', 'Свести всё в Google Sheets (Metrics tab): дата поста, impressions, likes, comments, visits на landing, signups'], subtasks: [{ id: '028b-st1', text: 'GA метрики' }, { id: '028b-st2', text: 'Post метрики' }], assignee: 'Макс', estimate: '30 мин', priority: 'medium', tags: ['review'] },
            { id: '029', title: '029. Кира: Написать черновики постов 4-9 (GEO + AI + Reveal)', description: 'Создать в Google Doc посты 4-9 с новым AI-search messaging. НЕ публиковать — только черновики. Темы: Пост 4 — GEO score 14 rules reveal (Building in Public), Пост 5 — Agent Readiness / llms.txt thought leadership, Пост 6 — Earned media + AI citations (84% stat), Пост 7 — GEO Score checklist (Week 3 reveal), Пост 8 — Product reveal с AI-first frame, Пост 9 — Free GEO audit lead magnet.', steps: ['Пост 4: "I ran 14 checks on a real website to see how AI-citable it is" — GEO score breakdown', 'Пост 5: "Go to yoursite.com/llms.txt — got a 404?" — Agent Readiness', 'Пост 6: "84% of AI-cited pages come from earned media" — the two-game framework', 'Пост 7: GEO Score full checklist — "Here are the 14 rules. Run them on your site."', 'Пост 8: Product reveal — "KORU: audit for Google AND AI engines"', 'Пост 9: Free tier lead magnet — "Paste your URL. See your GEO score. Free."'], subtasks: [{ id: '029-st1', text: '6 постов написаны' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content'] }
        ],
        keyMetric: 'Week 1: 3 posts published, avg >1000 impressions, >5 comments/post, 6-9 DMs sent, poll data collected, pain quotes 10-15'
    },

    // ==========================================
    // WEEK 2 — HINTS + GROUPS + DMs START (6 дней: Вс–Пт)
    // ==========================================
    {
        dayIndex: 1001, phase: 'Week 2', dayLabel: 'Week 2, Вс',
        calendarDayOffset: 6,
        title: 'Макс: начало недели (Израиль)',
        summary: 'Воскресенье = начало рабочей недели Макса. Twitter мониторинг, подготовка к неделе.',
        tasks: [
            { id: 'mx-w2-sun', title: '300. Макс: Twitter мониторинг + подготовка к неделе', description: 'Начало рабочей недели Макса (Израиль, Вс–Чт). Проверить Twitter mentions, ответить на комменты, подготовить материалы на неделю.', steps: ['Twitter: проверить mentions, ответить на комменты', 'Проверить landing page — всё работает?', 'Подготовить copy blocks для кросс-постов недели'], subtasks: [{ id: 'mx-w2-sun-st1', text: 'Twitter checked' }, { id: 'mx-w2-sun-st2', text: 'Landing OK' }], assignee: 'Макс', estimate: '30 мин', priority: 'medium', tags: ['monitoring'] }
        ]
    },
    {
        dayIndex: 5, phase: 'Week 2', dayLabel: 'Week 2, Пн',
        title: 'Кира учёба. Настя: research',
        summary: 'Понедельник = Кира учёба. Настя: спикеры конференций.',
        tasks: [
            { id: 'n-w2-1', title: '200. Настя: Research — спикеры SEO-конференций', description: 'Найти спикеров SEO-конференций → LinkedIn → Sources → Люди.', steps: ['BrightonSEO: https://www.brightonseo.com/speakers/', 'MozCon: https://moz.com/mozcon', 'SMX: https://searchmarketingexpo.com/', 'Спикеры → LinkedIn → Sources → Люди'], subtasks: [{ id: 'n-w2-1-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ]
    },
    {
        dayIndex: 6, phase: 'Week 2', dayLabel: 'Week 2, Вт',
        title: 'POST DAY: Пост 4 (GEO score) + DMs',
        summary: 'Вторник = POST day. Пост 4 + checkpoint + первые DMs.',
        tasks: [
            { id: '030', title: '030. Кира: Пост 4 LinkedIn + 2ч engagement', description: 'ПЕРЕЛОМНЫЙ пост! Показываем GEO score на реальном сайте. Картинка: Creatives → Post 4 (GEO score breakdown). НЕ раскрывать продукт — "Working on it. More soon." Записать кто написал "How?".', steps: ['Creatives → Post 4 → скриншот карточки', 'Скопировать текст → LinkedIn + прикрепить картинку → опубликовать', '2ч engagement', 'НЕ раскрывать продукт! "Working on it. More soon."', 'Записать кто написал "I wish!" или "How?"'], subtasks: [{ id: '030-st1', text: 'Посты' }, { id: '030-st2', text: 'Engagement' }, { id: '030-st3', text: 'Hot leads записаны' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement'], warning: 'НЕ раскрывать продукт!', copyBlocks: [{ label: 'Пост 4 LinkedIn (copy-paste)', text: 'I ran 14 checks on a real website to see how "AI-citable" it is.\n\nNot how it ranks. How likely AI engines are to extract and cite its content.\n\nHere\'s what the checks covered:\n\n— FAQ or HowTo schema? (most-cited format in AI Overviews)\n— First paragraph answers the page\'s main question directly?\n— Question-shaped H2s? ("What is...", "How to...")\n— Sentences with citable facts? (numbers, dates, named entities)\n— Accessible to GPTBot, ClaudeBot, PerplexityBot?\n— Author attribution in JSON-LD? (E-E-A-T signal)\n— Content updated within 6 months?\n— No paywall or JS-only rendering blocking crawlers?\n\nResult: 34 out of 100.\n\nThe site ranked #3 for its main keyword.\nBut it wasn\'t cited in the AI answer for that same query.\n\nThe gap between "ranking" and "being cited" is the new SEO problem.\n\nWhat do you think your pages would score?\n\n#SEO #GEO #AISearch' }, { label: 'Tweet (copy-paste)', text: 'I ran 14 AI-citation checks on a real website.\n\nResult: 34/100.\n\nRanked #3 on Google.\nNot cited in any AI answer.\n\nThe gap between "ranking" and "being cited" is the new SEO problem.\n\nWhat would your pages score?\n\n#SEO #GEO #AISearch' }] },
            { id: '030c', title: '030c. Кира: CHECKPOINT — пост 4 резонирует?', description: 'Через 24ч после поста 4 — проверить: есть ли комменты "How?", "I wish", "When?"? Это самый важный сигнал кампании. Если есть — горячие лиды, писать DM сразу. Если нет — пересмотреть messaging.', steps: ['Через 24ч после поста 4 проверить комменты', 'ЗЕЛЁНЫЙ: есть 2+ комментов типа "How?", "I wish", "When?" → ГОРЯЧИЕ ЛИДЫ, записать, DM сразу', 'ЖЁЛТЫЙ: много лайков но 0 "How?" → пост развлекает, но не создаёт demand. Следующий пост — сильнее CTA', 'КРАСНЫЙ: < 500 impressions И нет интереса → ICP неправильный. Пересмотреть кому постим', 'Записать 2-3 backup поста с другим углом на случай если основные не работают'], subtasks: [{ id: '030c-st1', text: 'Checkpoint пройден' }, { id: '030c-st2', text: 'Hot leads записаны (если есть)' }], assignee: 'Кира', estimate: '15 мин', priority: 'high', tags: ['review'], warning: '"How?" комменты = самый важный сигнал кампании.' },
            { id: '032', title: '032. Кира: ПЕРВЫЕ 3-5 DMs тёплым людям', description: 'Написать 3-5 DM commenters постов 1-4. Это самые тёплые люди — уже проявили интерес. Использовать шаблон из copy block. Записать кому, когда, ответили ли.', steps: ['3-5 DMs — вопросы про их workflow, НЕ pitch', 'Записать кому, когда, ответили ли'], subtasks: [{ id: '032-st1', text: '3-5 DMs' }], assignee: 'Кира', estimate: '30 мин', priority: 'high', tags: ['outreach'], copyBlocks: [{ label: 'DM Template (заменить [Name], [topic])', text: 'Hey [Name],\n\nReally enjoyed your take on [specific topic from their comments] — especially the point about [specific thing they said].\n\nGenuine question: have you noticed AI Overviews affecting your organic traffic yet? I keep hearing mixed things and I\'m curious what it looks like for someone who does this daily.' }] },
            { id: '030d', title: '030d. Макс: Twitter кросс-пост Пост 4 + мониторинг', description: 'Взять tweet из задачи 030 → опубликовать в Twitter. Мониторить реакции. Записать кто ответил "How?" → передать Кире.', steps: ['Взять tweet текст из задачи 030 (copy block "Tweet")', 'Опубликовать в Twitter', 'Записать кто ответил "How?" или "I wish" → передать Кире'], subtasks: [{ id: '030d-st1', text: 'Tweet posted' }, { id: '030d-st2', text: 'Reactions noted' }], assignee: 'Макс', estimate: '30 мин', priority: 'high', tags: ['content', 'monitoring'] },
        ]
    },
    {
        dayIndex: 7, phase: 'Week 2', dayLabel: 'Week 2, Ср',
        title: 'ПОСТ 5 + DM follow-ups',
        summary: 'Пост 5 Agent Readiness + DM follow-ups. Настя: Twitter influencers.',
        tasks: [
            { id: 'noa-3', title: '102. Кира: Noa Vernick — второй коммент + проверить реакцию', description: 'Ещё один коммент к посту Noa (другой пост, не тот же). Проверить: ответила ли она на первый коммент? Лайкнула? Если да — она тебя заметила. Если нет — ещё один коммент на следующей неделе.', steps: ['Проверить: ответила ли Noa на первый коммент?', 'Найти другой её пост → оставить коммент (другая тема)', 'Если она ответила на первый коммент — можно ответить ей (диалог)', 'Обновить Notes в Sources'], subtasks: [{ id: 'noa-3-st1', text: 'Второй коммент' }, { id: 'noa-3-st2', text: 'Реакция проверена' }], assignee: 'Кира', estimate: '10 мин', priority: 'medium', tags: ['outreach'] },
            { id: '035', title: '035. Кира: Проверить ответы на DM + follow-up', description: 'Кто ответил на DMs? Заинтересован → demo/beta. Не ответил → follow up через 3 дня.', steps: ['Проверить ответы на DMs', 'Заинтересован → 15 мин demo или beta access'], subtasks: [{ id: '035-st1', text: 'DM follow-ups done' }], assignee: 'Кира', estimate: '30 мин', priority: 'high', tags: ['outreach'] },
            { id: 'n-w2-2', title: '201. Настя: Research — Twitter/X SEO influencers', description: 'Найти активных SEO-людей в Twitter/X → найти их LinkedIn → Sources → Люди.', steps: ['Twitter: https://x.com/search?q=SEO%20consultant&f=user', 'Искать: Lily Ray, Aleyda Solis, Kevin Indig, Marie Haynes и подобных', 'Найти их LinkedIn → Sources → Люди', 'Отмечать Activity Level = high если постят регулярно'], subtasks: [{ id: 'n-w2-2-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] },
            { id: '036', title: '036. Кира: Пост 5 LinkedIn (Agent Readiness) + 2ч engagement + DMs', description: 'Пост 5 — Agent Readiness: "Go to yoursite.com/llms.txt — got a 404?" Картинка: Creatives → Post 5 (4 agent readiness checks). 2ч engagement. 2-3 DMs к commenters.', steps: ['Creatives → Post 5 → скриншот карточки', 'Пост 5 на LinkedIn + прикрепить картинку', 'Расшарить в 3-5 LinkedIn групп', '2ч engagement — не соглашаться со всеми, спорить конструктивно', '2-3 DMs к самым активным commenters'], subtasks: [{ id: '036-st1', text: 'Пост + engagement + DMs' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'outreach'], copyBlocks: [{ label: 'Пост 5 LinkedIn (copy-paste)', text: 'Quick test: go to yoursite.com/llms.txt\n\nGot a 404?\n\nllms.txt is the new standard for AI agents. A markdown summary of your site that AI crawlers can read instead of scraping your rendered HTML.\n\nFour things AI agents look for in 2026:\n\n1. /llms.txt — structured site overview (like robots.txt, but for AI context windows)\n2. Accept: text/markdown — can your server respond with clean markdown instead of HTML?\n3. Content-Signal directives in robots.txt — explicit "yes, AI can use my content"\n4. JSON-LD structured data — so agents understand what your pages are about\n\nMost sites fail all four.\n\nThe sites that pass? They\'re the ones ChatGPT Deep Research can actually read, parse, and cite.\n\nI checked ~30 sites last month. Only 2 had a valid llms.txt.\n\nHave you checked yours?\n\n#SEO #LLMO #AgentReadiness #AISearch' }, { label: 'Reply: "how do I check?"', text: 'Type yoursite.com/llms.txt in your browser. If you get a 404 — you don\'t have one. For robots.txt, look for "Content-Signal" directives. For JSON-LD, check your page source for <script type="application/ld+json">. Working on a way to check all four automatically.' }, { label: 'Reply: "what is llms.txt?"', text: 'It\'s a spec (llmstxt.org) — a markdown file at your root that gives AI agents a structured summary of your site. Think of it as robots.txt but for LLM context windows. Instead of scraping heavy HTML, agents read this clean summary. Google\'s AI agents, ChatGPT Deep Research, Perplexity — they all look for it.' }] },
            { id: '036t', title: '036t. Макс: Кросс-пост 5 на Twitter', description: 'Адаптировать пост 5 для Twitter.', steps: ['Адаптировать текст поста 5 для Twitter', 'Опубликовать в Twitter'], subtasks: [{ id: '036t-st1', text: 'Tweet опубликован' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Tweet (copy-paste)', text: 'Quick test: go to yoursite.com/llms.txt\n\nGot a 404?\n\n4 things AI agents look for in 2026:\n1. /llms.txt — site summary for AI\n2. text/markdown — clean markdown response\n3. Content-Signal in robots.txt\n4. JSON-LD structured data\n\nMost sites fail all four.\n\nHave you checked yours?\n\n#SEO #LLMO #AISearch' }] },
        ]
    },
    {
        dayIndex: 8, phase: 'Week 2', dayLabel: 'Week 2, Чт',
        title: 'Engagement + DM follow-ups',
        summary: 'Кира: DMs к заинтересованным + engagement. Настя research.',
        tasks: [
            { id: '039', title: '039. Кира: DMs к заинтересованным + Twitter engagement', description: 'Написать DM 3-5 людям из тёплых контактов — вопросы про их workflow, не pitch. Follow up с неответившими. Twitter: 3-5 replies.', steps: ['DMs к ещё 3-5 людям', 'Follow up с неответившими', 'Twitter: 3-5 replies'], subtasks: [{ id: '039-st1', text: '3-5 DMs sent' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['outreach'] },
            { id: '040t', title: '040t. Макс: Кросс-пост 6 на Twitter', description: 'Адаптировать пост 6 для Twitter. Запланировать tweet на пятницу.', steps: ['Адаптировать текст поста 6 для Twitter', 'Запланировать tweet на пятницу через Twitter Schedule'], subtasks: [{ id: '040t-st1', text: 'Tweet запланирован' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['content'], tip: 'Макс не работает в пятницу (Израиль). Запланировать tweet заранее через Twitter Schedule.', copyBlocks: [{ label: 'Tweet (copy-paste)', text: '84% of pages AI engines cite come from earned media.\n\nNot your blog. Not your landing page.\n\nIndustry publications. Reviews. Reddit. Wikipedia.\n\nSEO in 2026 is two games:\n1. Make your pages citable (schema, facts, structure)\n2. Get mentioned where AI already trusts\n\nWhich game are you playing?\n\n#SEO #AISearch' }] }
        ]
    },
    {
        dayIndex: 9, phase: 'Week 2', dayLabel: 'Week 2, Пт',
        title: 'ПОСТ 6 (earned media) + weekly review',
        summary: 'Пост 6 earned media angle. Weekly review. Макс выходной (Израиль).',
        tasks: [
            { id: '040', title: '040. Кира: Пост 6 (earned media + founder angle) + 2ч engagement', description: 'Пост 6 — earned media angle + personal touch. 84% AI citations = earned media. Ещё НЕ раскрываем продукт.', steps: ['Creatives → Post 6 → скриншот карточки (84% earned media)', 'Пост 6 LinkedIn + Twitter + прикрепить картинку', 'Расшарить в 3-5 LinkedIn групп', '2ч engagement'], subtasks: [{ id: '040-st1', text: 'Пост' }, { id: '040-st2', text: 'Landing link в комменте' }, { id: '040-st3', text: 'Engagement' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Пост 6 LinkedIn (copy-paste)', text: 'Counterintuitive stat about AI search:\n\n84% of pages that AI engines cite come from EARNED media — not your own site.\n\nIndustry publications. Third-party reviews. Research papers. Reddit threads. Wikipedia.\n\nYour blog post about your product? AI engines mostly skip it.\n\nA journalist\'s review of your product? That\'s what gets cited.\n\nThis means SEO in 2026 is two games:\n\nGame 1: Make YOUR pages citable (structure, schema, facts, freshness)\n\nGame 2: Get mentioned on pages that AI engines ALREADY trust (press, communities, expert roundups)\n\nMost SEO tools only help with Game 1. And even there, they don\'t measure AI-citation readiness specifically.\n\nWhich game are you focused on?\n\nI\'ve been deep in Game 1 for months now — figuring out what makes a page citable vs. invisible to AI. The patterns are not what I expected.\n\n#SEO #AISearch #DigitalPR #EarnedMedia' }, { label: 'Первый комментарий (сразу после поста)', text: 'Building something around Game 1 — measuring AI-citation readiness at the page level. More soon.' }] },
            { id: 'n-w2-3', title: '202. Настя: Research — YouTube/Podcast SEO hosts', description: 'Найти ведущих SEO-подкастов и YouTube-каналов → LinkedIn → Sources → Люди.', steps: ['YouTube: искать "SEO tutorial", "keyword research" — каналы с 5K+ подписчиков', 'Подкасты: Search Engine Journal Show, Authority Hacker, Niche Pursuits', 'Hosts/guests → LinkedIn → Sources → Люди'], subtasks: [{ id: 'n-w2-3-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] },
            { id: '041', title: '041. Кира: Метрики за Week 2', description: 'Dashboard → проверить цели W2.', steps: ['Dashboard → цель 80 людей total'], subtasks: [{ id: '041-st1', text: 'Метрики OK' }], assignee: 'Кира', estimate: '5 мин', priority: 'high', tags: ['review'] }
        ],
        keyMetric: 'Week 2: 3 posts, DMs sent 15-20 total, DM reply rate >30%, 3-5 beta agreements, "How?" comments on post 4'
    },

    // ==========================================
    // WEEK 3 — BUILDING IN PUBLIC (6 дней: Вс–Пт)
    // ==========================================
    {
        dayIndex: 1002, phase: 'Week 3', dayLabel: 'Week 3, Вс',
        calendarDayOffset: 13,
        title: 'Макс: начало недели (Израиль)',
        summary: 'Воскресенье = начало рабочей недели Макса. Twitter мониторинг.',
        tasks: [
            { id: 'mx-w3-sun', title: '301. Макс: Twitter мониторинг', description: 'Начало рабочей недели. Проверить Twitter, подготовить copy blocks.', steps: ['Twitter: проверить mentions, ответить', 'Подготовить copy blocks для кросс-постов'], subtasks: [{ id: 'mx-w3-sun-st1', text: 'Done' }], assignee: 'Макс', estimate: '30 мин', priority: 'medium', tags: ['monitoring'] }
        ]
    },
    {
        dayIndex: 10, phase: 'Week 3', dayLabel: 'Week 3, Пн',
        title: 'Кира учёба. Настя: research',
        summary: 'Понедельник = Кира учёба. Настя: AI Overviews авторы.',
        tasks: [
            { id: 'n-w3-1', title: '203. Настя: Research — кто пишет про AI Overviews / GEO', description: 'Найти людей которые активно постят про AI search, AI Overviews, GEO на LinkedIn.', steps: ['LinkedIn поиск: "AI Overviews" + "SEO": https://www.linkedin.com/search/results/content/?keywords=%22AI%20Overviews%22%20%22SEO%22', 'Авторы постов с 50+ лайков → LinkedIn → Sources → Люди', '"GEO" + "SEO" OR "generative engine": https://www.linkedin.com/search/results/content/?keywords=%22GEO%22%20%22SEO%22'], subtasks: [{ id: 'n-w3-1-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ]
    },
    {
        dayIndex: 11, phase: 'Week 3', dayLabel: 'Week 3, Вт',
        title: 'POST DAY: Пост 7 (14 GEO rules)',
        summary: 'Вторник = POST day. Пост 7 раскрываем 14 GEO правил. Headline update (без landing link).',
        tasks: [
            { id: '042', title: '042. Кира: Обновить LinkedIn headline', description: 'Headline → AI-search positioning. Featured пока НЕ обновлять (до W4).', steps: ['Headline: "Building the SEO platform for Google + AI search | GEO score, AI visibility | In stealth"', 'Featured: пока оставить как есть (landing link с W4)'], subtasks: [{ id: '042-st1', text: 'Headline' }, { id: '042-st2', text: 'Featured' }], assignee: 'Кира', estimate: '10 мин', priority: 'high', tags: ['branding'] },
            { id: '043', title: '043. Кира: Пост 7 (14 GEO rules) + 2ч engagement + DMs', description: 'Пост 7: раскрываем полный GEO checklist — 14 правил. Картинка: Creatives → Post 7. Landing link в комменте.', steps: ['Creatives → Post 7 → скриншот карточки', 'Пост 7 LinkedIn + прикрепить картинку', 'Расшарить в 3-5 LinkedIn групп', 'Landing link в комменте', '2ч engagement', '2-3 DMs'], subtasks: [{ id: '043-st1', text: 'Пост 7' }, { id: '043-st2', text: 'Engagement' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'outreach'], copyBlocks: [{ label: 'Пост 7 LinkedIn (copy-paste)', text: 'I built a 14-rule checklist that scores any page for AI-citation readiness.\n\nHere are all 14 rules:\n\n1. FAQ / HowTo schema (15 pts) — most-cited format in AI Overviews\n2. Inverted pyramid lead (10 pts) — answer the question in paragraph 1\n3. Definition / answer pattern (10 pts) — question-shaped H2s\n4. Citation-worthy claims (8 pts) — sentences with numbers, dates, named entities\n5. Article / Product schema (8 pts) — JSON-LD type declaration\n6. Author attribution (8 pts) — E-E-A-T signal\n7. Heading hierarchy (8 pts) — 1 H1, 3+ H2, 2+ H3\n8. AI crawler access (6 pts) — GPTBot, ClaudeBot not blocked\n9. Meta description quality (5 pts) — 120-160 chars\n10. Entity density (5 pts) — named entities per 100 words\n11. Date markup (5 pts) — datePublished + dateModified\n12. No paywall / JS blockers (5 pts) — content in initial HTML\n13. Content freshness (4 pts) — updated within 6 months\n14. Canonical URL (3 pts) — self-referencing canonical\n\nTotal: 100 points. Most sites I\'ve tested score 25-45.\n\nHow would your pages score?\n\n#SEO #GEO #AISearch #GenerativeEngineOptimization' }, { label: 'Первый комментарий', text: 'Want to check your score? Working on making this available. More soon.' }] },
            { id: '043t', title: '043t. Макс: Кросс-пост 7 на Twitter', description: 'Адаптировать пост 7 для Twitter.', steps: ['Адаптировать → Twitter → опубликовать'], subtasks: [{ id: '043t-st1', text: 'Tweet опубликован' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Tweet (copy-paste)', text: 'I built a 14-rule GEO checklist for AI-citation readiness.\n\nTop rules that matter most:\n- FAQ/HowTo schema (15 pts)\n- Inverted pyramid lead (10 pts)\n- Question-shaped H2s (10 pts)\n- Citation-worthy claims (8 pts)\n- AI crawler access (6 pts)\n\nMost sites score 25-45 out of 100.\n\nHow would yours score?\n\n#SEO #GEO #AISearch' }] }
        ]
    },
    {
        dayIndex: 12, phase: 'Week 3', dayLabel: 'Week 3, Ср',
        title: 'ПОСТ 8 + demos + follow-ups',
        summary: 'Пост 8 AI Brand Visibility + demos + DM follow-ups. Настя: newsletters.',
        tasks: [
            { id: 'noa-4', title: '103. Кира: Noa Vernick — DM (знакомство + предложить попробовать)', description: 'К этому моменту Noa уже видела 2+ комментов от тебя. Она знает твоё имя. Пишем DM — знакомимся и предлагаем попробовать KORU. Тон: peer-to-peer, НЕ продажа.', steps: ['Написать DM (см. copy block)', 'Тон: "мы в одном пространстве, интересно твоё мнение"', 'Обновить статус в Sources → dm_sent'], subtasks: [{ id: 'noa-4-st1', text: 'DM отправлен' }, { id: 'noa-4-st2', text: 'Статус обновлён' }], assignee: 'Кира', estimate: '10 мин', priority: 'high', tags: ['outreach'], copyBlocks: [{ label: 'DM к Noa (copy-paste, адаптировать)', text: 'Hey Noa,\n\nI\'ve been following your posts on AI visibility — really sharp takes, especially on how brands should approach citation vs. just ranking.\n\nI\'ve been building something that measures AI-citation readiness per page — 14 rules that determine whether AI engines cite or skip content. Plus tracking whether OpenAI and Gemini actually mention your brand.\n\nSince you\'re doing this work for clients, I\'d love your perspective. Would you be open to trying it and telling me what\'s missing?\n\nNo pitch — genuinely want feedback from someone who lives in this space daily.' }, { label: 'Если ответит с интересом', text: 'Amazing — thanks Noa! Happy to do a quick 15-min walkthrough. I can run it on one of your client sites so you see real results, not a generic demo. Want me to send a calendar link?' }, { label: 'Если спросит "what exactly does it do?"', text: 'Two things your workflow might find useful:\n\n1. GEO Score — checks each page against 14 rules for AI-citation readiness (schema, inverted pyramid, entity density, crawler access, etc). Score 0-100 with evidence per rule.\n\n2. AI Brand Visibility — automatically asks OpenAI and Gemini about your client\'s brand, tracks position over time, shows who gets recommended instead.\n\nBasically the measurement layer for what you\'re already doing strategically.' }] },
            { id: '046', title: '046. Кира: Demos + DM follow-ups', description: 'Провести demo с заинтересованными. Follow up с неответившими.', steps: ['Demo (15 мин) с согласившимися', 'Follow up с остальными DMs'], subtasks: [{ id: '046-st1', text: 'Demos + follow-ups' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'high', tags: ['outreach'] },
            { id: '047', title: '047. Кира: Пост 8 (AI Brand Visibility) + 2ч engagement', description: 'Пост 8 — AI Brand Visibility: "Is ChatGPT recommending your brand?" Картинка: Creatives → Post 8.', steps: ['Creatives → Post 8 → скриншот карточки', 'Пост 8 LinkedIn + прикрепить картинку + landing link', 'Расшарить в 3-5 LinkedIn групп', '2ч engagement'], subtasks: [{ id: '047-st1', text: 'Пост 8 + engagement' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement'], copyBlocks: [{ label: 'Пост 8 LinkedIn (copy-paste)', text: 'I asked ChatGPT: "What\'s the best SEO tool for freelancers?"\n\nIt listed 5 tools. My client wasn\'t one of them.\n\nAsked Gemini the same question. Different list. Still not there.\n\nHere\'s the interesting part:\n\nThere are tools that track this now. You can monitor whether AI mentions your brand. The GEO space is growing fast.\n\nBut most of them answer one question: "Does AI know you exist?"\n\nThey don\'t answer the harder one: "WHY doesn\'t AI cite this specific page — and what do you fix on THAT page to change it?"\n\nBrand-level monitoring tells you the score. Page-level diagnosis tells you the play.\n\nThat\'s the gap we\'ve been focused on. Per-page checks. 14 rules. Evidence per rule. Fix recommendations that turn into tasks.\n\nBecause knowing you\'re not mentioned is step one. Knowing what to fix is step two.\n\n#SEO #AI #ChatGPT #BrandVisibility #AISearch #GEO' }] },
            { id: '047t', title: '047t. Макс: Кросс-пост 8 на Twitter', description: 'Адаптировать пост 8 для Twitter.', steps: ['Адаптировать → Twitter → опубликовать'], subtasks: [{ id: '047t-st1', text: 'Tweet опубликован' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Tweet (copy-paste)', text: 'I asked ChatGPT: "Best SEO tool for freelancers?"\n\n5 tools listed. My client wasn\'t one.\n\nAsked Gemini. Different list. Still not there.\n\nWe track Google rankings obsessively.\nNobody tracks AI rankings.\n\nBuilt a tool that does. Per provider. Over time.\n\nkoru-seo.com\n\n#SEO #AISearch' }] },
            { id: 'n-w3-2', title: '204. Настя: Research — SEO newsletter авторы + Substack', description: 'Найти авторов SEO-рассылок и Substack → LinkedIn → Sources → Люди.', steps: ['Поиск: "SEO newsletter" OR "SEO weekly" на LinkedIn', 'Substack: https://substack.com/search/SEO — авторы с 1K+ подписчиков', 'Авторы → LinkedIn → Sources → Люди'], subtasks: [{ id: 'n-w3-2-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ]
    },
    {
        dayIndex: 13, phase: 'Week 3', dayLabel: 'Week 3, Чт',
        title: 'Спорные приоритеты + beta feedback',
        summary: 'Кира ревьюит спорные cases.',
        tasks: [
            { id: '049b', title: '049b. Кира: Решить спорные приоритеты + собрать feedback от beta', description: 'Открыть Sources → Люди, найти людей которых Настя отметила как спорные. Решить какой приоритет правильный. Написать beta testers — как им KORU?', steps: ['Review спорных cases', 'Собрать feedback от beta testers'], subtasks: [{ id: '049b-st1', text: 'Cases решены' }, { id: '049b-st2', text: 'Beta feedback' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['review'] }
        ]
    },
    {
        dayIndex: 14, phase: 'Week 3', dayLabel: 'Week 3, Пт',
        title: 'Метрики + Настя G2/Capterra',
        summary: 'W3 метрики. Настя: G2/Capterra reviewers.',
        tasks: [
            { id: 'n-w3-3', title: '205. Настя: Research — G2/Capterra reviewers SEO-инструментов', description: 'Люди оставившие отзыв на SEO-инструмент = точно ими пользуются = наш ICP.', steps: ['G2 Ahrefs: https://www.g2.com/products/ahrefs/reviews', 'G2 Semrush: https://www.g2.com/products/semrush/reviews', 'G2 Surfer: https://www.g2.com/products/surfer/reviews', 'Reviewers → LinkedIn → Sources → Люди'], subtasks: [{ id: 'n-w3-3-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] },
            { id: '052', title: '052. Кира: Метрики за Week 3', description: 'Dashboard → проверить цели W3.', steps: ['Dashboard → цель 80+ людей', 'Priority A достаточно для outreach?'], subtasks: [{ id: '052-st1', text: 'Метрики OK' }], assignee: 'Кира', estimate: '5 мин', priority: 'high', tags: ['review'] }
        ],
        keyMetric: 'Week 3: 3+ beta testers active, 10+ email signups, DM→demo conversion started'
    },

    // ==========================================
    // WEEK 4 — ENGAGEMENT + МАКС PREP (6 дней: Вс–Пт)
    // ==========================================
    {
        dayIndex: 1003, phase: 'Week 4', dayLabel: 'Week 4, Вс',
        calendarDayOffset: 20,
        title: 'Макс: начало недели (Израиль)',
        summary: 'Воскресенье = начало рабочей недели Макса. Company Page + landing.',
        tasks: [
            { id: 'mx-w4-sun', title: '302. Макс: Twitter мониторинг + Company Page start', description: 'Начало рабочей недели. Twitter + начать Company Page setup.', steps: ['Twitter: проверить mentions, ответить', 'Начать Company Page: лого, баннер, About'], subtasks: [{ id: 'mx-w4-sun-st1', text: 'Twitter done' }, { id: 'mx-w4-sun-st2', text: 'Company Page started' }], assignee: 'Макс', estimate: '1.5 часа', priority: 'medium', tags: ['monitoring', 'branding'] }
        ]
    },
    {
        dayIndex: 15, phase: 'Week 4', dayLabel: 'Week 4, Пн',
        title: 'Кира учёба. Настя: research',
        summary: 'Понедельник = Кира учёба. Настя: in-house SEO managers.',
        tasks: [
            { id: 'n-w4-1', title: '206. Настя: Research — in-house SEO managers крупных компаний', description: 'Найти in-house SEO managers (наш ICP сегмент 3) в крупных компаниях.', steps: ['LinkedIn: "Head of SEO" + крупные компании', '"SEO Manager" AND "in-house"', '"Director of SEO"', 'Найденные → Sources → Люди, ICP = in_house'], subtasks: [{ id: 'n-w4-1-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ]
    },
    {
        dayIndex: 16, phase: 'Week 4', dayLabel: 'Week 4, Вт',
        title: 'POST DAY: Пост 9 + Company Page',
        summary: 'Пост 9 (pipeline) + Макс: Company Page setup.',
        tasks: [
            { id: '050', title: '050. Кира: Пост 9 (full pipeline) + 2ч engagement', description: 'Пост 9: полный pipeline KORU с AI-search layer. Картинка: Creatives → Post 9.', steps: ['Creatives → Post 9 → скриншот карточки', 'Пост 9 LinkedIn + прикрепить картинку + landing link', 'Расшарить в 3-5 LinkedIn групп', '2ч engagement + DMs'], subtasks: [{ id: '050-st1', text: 'Пост 9 + engagement' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'outreach'], copyBlocks: [{ label: 'Пост 9 LinkedIn (copy-paste)', text: 'Here\'s the full pipeline we built:\n\nURL\n  ↓\nSite audit — crawl pages, check health, AI summary\n  ↓\nGEO score — 14-rule AI-citation readiness check per page\n  ↓\nKeywords — AI reads your site first, then finds opportunities with intent classification\n  ↓\nRelevance gate — filters out off-topic keywords automatically\n  ↓\nSemantic clustering — groups by meaning, not word overlap\n  ↓\nContent briefs + drafts — based on real top-5 Google results\n  ↓\nTasks — every finding becomes a task with a link to its source\n  ↓\nAI Brand Visibility — are OpenAI and Gemini mentioning you?\n  ↓\nAgent Readiness — can AI crawlers find and read your site?\n\nOne platform. Classical SEO + AI search. Connected.\n\nkoru-seo.com\n\n#SEO #BuildInPublic #AISearch' }] },
            { id: '050t', title: '050t. Макс: Кросс-пост 9 на Twitter', description: 'Адаптировать пост 9 для Twitter.', steps: ['Адаптировать → Twitter → опубликовать'], subtasks: [{ id: '050t-st1', text: 'Tweet опубликован' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Tweet (copy-paste)', text: 'The pipeline we built:\n\nURL → audit → GEO score (14 rules) → keywords with intent → semantic clusters → briefs → drafts → tasks\n\n+ AI Brand Visibility (OpenAI, Gemini)\n+ Agent Readiness (llms.txt, JSON-LD)\n\nClassical SEO + AI search. One platform.\n\nkoru-seo.com\n\n#SEO #AISearch' }] },
            { id: '043d', title: '043d. Макс: LinkedIn Company Page — оформление + первый контент', description: 'LinkedIn Company Page: добавить лого, баннер, обновить About с building in public messaging. Репостнуть пост от имени компании. Подписаться на 10-15 SEO-компаний.', steps: ['Добавить logo (тёмная тема, #3fb68e)', 'Banner в стиле landing page', 'Обновить About: building in public messaging', 'Репост поста от имени компании', 'Подписаться на 10-15 SEO-компаний'], subtasks: [{ id: '043d-st1', text: 'Logo + banner' }, { id: '043d-st2', text: 'About обновлён' }, { id: '043d-st3', text: 'Первый репост' }], assignee: 'Макс', estimate: '1.5 часа', priority: 'high', tags: ['branding', 'linkedin'] }
        ]
    },
    {
        dayIndex: 17, phase: 'Week 4', dayLabel: 'Week 4, Ср',
        title: 'DMs + engagement + Настя research',
        summary: 'Кира: DMs + engagement. Настя: switchers.',
        tasks: [
            { id: '035b', title: '035b. Кира: DMs + engagement + follow-ups', description: 'DMs к commenters, follow-ups, engagement.', steps: ['DMs к заинтересованным', 'Follow up с неответившими', 'Engagement в группах'], subtasks: [{ id: '035b-st1', text: 'DMs + engagement' }], assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['outreach', 'engagement'] },
            { id: 'n-w4-2', title: '207. Настя: Research — люди которые недавно сменили SEO-инструмент', description: 'Найти людей которые постили про смену инструмента или жаловались на текущий.', steps: ['LinkedIn: "switched from Ahrefs" OR "looking for SEO tool"', '"alternative to Ahrefs" OR "alternative to Semrush"', 'Reddit: r/SEO "alternative to"', 'Авторы → LinkedIn → Sources → Люди'], subtasks: [{ id: 'n-w4-2-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ]
    },
    {
        dayIndex: 18, phase: 'Week 4', dayLabel: 'Week 4, Чт',
        title: 'Pricing + demo-ready + Priority A check',
        summary: 'Кира + Макс: pricing, demo-ready check. Кира: проверить Priority A.',
        tasks: [
            { id: '049d', title: '049d. Кира + Макс: Определить pricing и monetization модель', description: 'Через 2 недели reveal. Без чёткой модели люди зайдут, попробуют и уйдут.', steps: ['Созвон 30-45 мин', 'Решить модель: Free trial или Freemium', 'Определить pricing', 'Обновить landing page'], subtasks: [{ id: '049d-st1', text: 'Модель выбрана' }, { id: '049d-st2', text: 'Pricing определён' }, { id: '049d-st3', text: 'Onboarding flow понятен' }], assignee: 'Кира + Макс', estimate: '45 мин', priority: 'high', tags: ['planning', 'pricing'], warning: 'Без pricing reveal = просто красивый пост без конверсии.' },
            { id: '049c', title: '049c. Кира + Макс: Проверка — product demo-ready?', description: 'На следующей неделе reveal. Продукт должен быть стабильный.', steps: ['Созвон 30 мин', 'Проверить: keyword analysis, кластеризация, UI', 'Баги → список Максу'], subtasks: [{ id: '049c-st1', text: 'Demo flow проверен' }, { id: '049c-st2', text: 'Баги записаны (если есть)' }], assignee: 'Кира + Макс', estimate: '30 мин', priority: 'high', tags: ['review', 'planning'] },
            { id: '051', title: '051. Кира: Лично проверить каждого Priority A перед outreach', description: 'На следующей неделе будут connection requests. Открыть Sources → Люди → фильтр Priority A. Каждого проверить.', steps: ['Sources → фильтр Priority A', 'Каждый: открыть LinkedIn, подтвердить, записать чем персонализировать', 'Target: 40-60 Priority A'], subtasks: [{ id: '051-st1', text: '40-60 Priority A confirmed' }, { id: '051-st2', text: 'Personalization notes' }], assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['review'] }
        ]
    },
    {
        dayIndex: 19, phase: 'Week 4', dayLabel: 'Week 4, Пт',
        title: 'Настя: hooks + W4 metrics',
        summary: 'Настя: personalization hooks. Кира: W4 metrics.',
        tasks: [
            { id: 'n-w4-3', title: '208. Настя: Research — personalization hooks для Priority A', description: 'Пройти топ-20 Priority A. Для каждого записать personalization hook (недавний пост, достижение, компания) для connection request.', steps: ['Sources → Люди → фильтр Priority A → топ 20 по Activity', 'Для каждого: открыть LinkedIn, найти недавний пост или достижение', 'Записать в Notes: "Recent post about X" или "Works at Y, launched Z"'], subtasks: [{ id: 'n-w4-3-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] },
            { id: '052b', title: '052b. Кира: Метрики за Week 4', description: 'Dashboard → проверить цели W4.', steps: ['Dashboard → Priority A confirmed?', 'Pricing set?', 'Demo-ready?'], subtasks: [{ id: '052b-st1', text: 'Метрики OK' }], assignee: 'Кира', estimate: '5 мин', priority: 'high', tags: ['review'] }
        ],
        keyMetric: 'Week 4: 40-60 Priority A confirmed, pricing defined, Company Page live, product demo-ready'
    },

    // ==========================================
    // WEEK 5 — REVEAL (6 дней: Вс–Пт)
    // ==========================================
    {
        dayIndex: 1004, phase: 'Week 5', dayLabel: 'Week 5, Вс',
        calendarDayOffset: 27,
        title: 'Макс: начало недели (Израиль)',
        summary: 'Воскресенье = начало рабочей недели Макса. Баги из W4 + prep reveal.',
        tasks: [
            { id: 'mx-w5-sun', title: '303. Макс: Фикс багов из W4 review + Twitter', description: 'Если были баги из 049c — фиксить. Twitter мониторинг.', steps: ['Баги из 049c → фикс', 'Twitter: проверить mentions, ответить', 'Landing page: всё ОК?'], subtasks: [{ id: 'mx-w5-sun-st1', text: 'Done' }], assignee: 'Макс', estimate: '1 час', priority: 'medium', tags: ['monitoring', 'review'] }
        ]
    },
    {
        dayIndex: 20, phase: 'Week 5', dayLabel: 'Week 5, Пн',
        title: 'Кира учёба. Настя: research',
        summary: 'Понедельник = Кира учёба. Настя: SEO журналисты.',
        tasks: [
            { id: 'n-w5-1', title: '209. Настя: Research — SEO журналисты и блогеры', description: 'Найти журналистов которые пишут обзоры SEO-инструментов. Потенциал для PR при launch.', steps: ['Search Engine Journal contributors', 'Search Engine Land', 'TechCrunch + "SEO"', 'Авторы обзоров → LinkedIn → Sources → Люди, Priority A'], subtasks: [{ id: 'n-w5-1-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ]
    },
    {
        dayIndex: 21, phase: 'Week 5', dayLabel: 'Week 5, Вт',
        title: 'REVEAL KORU + Пост 10 + CRs',
        summary: 'Вторник = REVEAL! Headline update + Post 10 + первые connection requests.',
        tasks: [
            { id: '053', title: '053. Кира: Раскрыть KORU — обновить headline и Experience', description: 'LinkedIn → Headline: новый с AI-search positioning. Experience: CEO at KORU.', steps: ['Headline: "Founder & CEO at KORU | SEO platform for Google rankings + AI-citation readiness"', 'Experience: CEO at KORU', 'Company Page: обновить About'], subtasks: [{ id: '053-st1', text: 'Headline' }, { id: '053-st2', text: 'Experience' }], assignee: 'Кира', estimate: '15 мин', priority: 'high', tags: ['branding'] },
            { id: '054', title: '054. Кира: Пост 10 "Meet KORU" + 2ч engagement + DMs', description: 'Пост 10 — REVEAL. Самый важный пост до launch. Картинка: Creatives → Post 10.', steps: ['Creatives → Post 10 → скриншот карточки', 'Пост 10 LinkedIn + прикрепить картинку', 'Расшарить в 3-5 LinkedIn групп', 'Landing link', '2ч engagement', 'DMs к hot leads'], subtasks: [{ id: '054-st1', text: 'Reveal post' }, { id: '054-st2', text: 'Engagement + DMs' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'outreach'], copyBlocks: [{ label: 'Пост 10 LinkedIn (copy-paste)', text: 'It\'s time.\n\nFor the last few months, I\'ve been talking about AI search changing everything for SEO professionals.\n\n48% of Google searches show an AI answer. Only 38% of AI-cited pages are in the top-10.\n\nThe GEO space is growing — there are tools that track whether AI mentions your brand. That\'s valuable.\n\nBut here\'s what I kept running into: brand-level monitoring tells you IF you\'re mentioned. It doesn\'t tell you WHY a specific page gets cited or skipped — and what to fix on that page.\n\nSo we built the diagnostic layer.\n\nIt\'s called KORU.\n\n-> GEO Score: 14-rule check per page — why does AI cite or skip this page? Evidence per rule. Fix recommendations.\n\n-> AI Brand Visibility: asks OpenAI and Gemini about your brand. Tracks position over time. Shows who gets recommended instead.\n\n-> Agent Readiness: can AI crawlers find and read your site? llms.txt, markdown negotiation, Content-Signal, JSON-LD.\n\n-> Intent-first keywords: AI reads your site content first, then finds opportunities. Relevance gate filters noise. Semantic clustering by meaning.\n\n-> Content briefs + drafts: based on real top-5 Google results. Working drafts via Claude AI.\n\n-> Tasks: every finding becomes a task. 9 source types. From finding to action — not just monitoring.\n\nGEO monitoring shows the score. Per-page diagnosis shows the play.\n\nGEO score and AI visibility start free. Full stack from $19.\n\nkoru-seo.com\n\n#KORU #SEO #AISearch #GEO' }] },
            { id: '054t', title: '054t. Макс: Кросс-пост 10 на Twitter', description: 'Reveal tweet.', steps: ['Адаптировать → Twitter → опубликовать'], subtasks: [{ id: '054t-st1', text: 'Tweet опубликован' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Tweet (copy-paste)', text: 'Introducing KORU.\n\nThe SEO platform for Google rankings + AI-citation readiness.\n\n-> GEO Score: 14 rules, per page\n-> AI Brand Visibility: OpenAI + Gemini tracking\n-> Agent Readiness: llms.txt, JSON-LD\n-> Intent-first keywords + briefs + tasks\n\nGEO score starts free.\n\nkoru-seo.com\n\n#KORU #SEO #AISearch' }] },
            { id: '054d', title: '054d. Макс: LinkedIn Company Page — Reveal update', description: 'Company Page: обновить About с полным описанием продукта + ссылка. Tagline. Репостнуть пост 10.', steps: ['About: полное описание + ссылка koru-seo.com', 'Tagline: "Rank in Google. Get cited by AI."', 'Репост Поста 10 от имени компании'], subtasks: [{ id: '054d-st1', text: 'About финальный' }, { id: '054d-st2', text: 'Reveal post от компании' }], assignee: 'Макс', estimate: '1 час', priority: 'high', tags: ['branding', 'linkedin'] },
            { id: '055', title: '055. Кира: Отправить 5 connection requests в LinkedIn', description: 'Sources → Люди → Priority A. Каждому персонализированный CR.', steps: ['5 Priority A с highest Activity', 'Перед CR — оставить 1-2 коммента к их постам', 'ПЕРСОНАЛИЗИРОВАТЬ каждый', 'Обновить статусы'], subtasks: [{ id: '055-st1', text: '5 requests' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'high', tags: ['outreach'], copyBlocks: [{ label: 'CR: engagement-based', text: 'Hi [Name], your recent post about [specific topic] really resonated. I\'m building KORU — an SEO platform that audits for both Google and AI search engines. GEO score, AI brand visibility, intent-first keywords. Would love to connect.' }, { label: 'CR: agency owners', text: 'Hi [Name], I\'ve been following [Agency Name]\'s work — impressed by your approach to [something specific]. Building KORU — the SEO platform that measures AI-citation readiness alongside classical rankings. Would be great to connect.' }] }
        ]
    },
    {
        dayIndex: 22, phase: 'Week 5', dayLabel: 'Week 5, Ср',
        title: 'CRs + testimonials + Настя PH',
        summary: 'Connection requests + testimonials. Настя: Product Hunt research.',
        tasks: [
            { id: '056', title: '056. Кира: Ещё 5 connection requests + проверить вчерашние', description: 'Отправить 5 новых CR (Priority A). Проверить acceptances.', steps: ['5 requests', 'Проверить acceptances', 'Обновить статусы'], subtasks: [{ id: '056-st1', text: '5 requests' }, { id: '056-st2', text: 'Acceptance check' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'high', tags: ['outreach', 'monitoring'] },
            { id: '057', title: '057. Кира: Testimonial requests + new connection engagement', description: 'Написать beta testers: попросить отзыв. Новым connections: прокомментить ИХ пост.', steps: ['Beta testers: попросить 2-3 sentence quote', 'Новые connections: comment на их пост (НЕ pitch)', 'Twitter engagement'], subtasks: [{ id: '057-st1', text: 'Testimonial requests' }, { id: '057-st2', text: 'Connection engagement' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['outreach', 'engagement'], copyBlocks: [{ label: 'Testimonial request DM', text: 'Hey [Name],\n\nThanks so much for testing KORU — your feedback on [specific thing] was really valuable.\n\nQuick favor: would you be ok sharing a sentence or two about your experience? Something genuine, in your own words.\n\nNo pressure at all!' }] },
            { id: 'n-w5-2', title: '210. Настя: Research — Product Hunt SEO community', description: 'Найти людей из Product Hunt которые запускали SEO-инструменты.', steps: ['Product Hunt: https://www.producthunt.com/search?q=SEO — makers + top voters', 'Makers/voters → LinkedIn → Sources → Люди'], subtasks: [{ id: 'n-w5-2-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ]
    },
    {
        dayIndex: 23, phase: 'Week 5', dayLabel: 'Week 5, Чт',
        title: 'Пост 11 + CRs + Demo GIF',
        summary: 'Пост 11 (50 sites) + CRs. Макс: demo GIF.',
        tasks: [
            { id: '058', title: '058. Кира: Пост 11 (50 sites tested) + 2ч engagement', description: 'Пост 11 — data post: "4 out of 50 sites are AI-ready." Картинка: Creatives → Post 11.', steps: ['Creatives → Post 11 → скриншот карточки', 'Пост 11 LinkedIn + landing link', '2ч engagement'], subtasks: [{ id: '058-st1', text: 'Пост 11 + engagement' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement'], copyBlocks: [{ label: 'Пост 11 LinkedIn (copy-paste)', text: 'I checked 50 SEO agency websites for AI-search readiness.\n\nResults:\n\nllms.txt present: 0 out of 50\nMarkdown negotiation: 3 out of 50\nrobots.txt addresses AI crawlers: 8 out of 50 (half were BLOCKING them)\nHTTP Link headers for AI: 1 out of 50\n\n4 out of 50 passed at least one check.\n\nThe traffic is shifting. The sites aren\'t ready.\n\nCheck yours: koru-seo.com\n\n#SEO #AI #TechnicalSEO #AISearch' }] },
            { id: '058t', title: '058t. Макс: Кросс-пост 11 на Twitter', description: 'Адаптировать пост 11 для Twitter.', steps: ['Адаптировать → Twitter'], subtasks: [{ id: '058t-st1', text: 'Tweet опубликован' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Tweet (copy-paste)', text: 'Checked 50 SEO agency sites for AI readiness.\n\nllms.txt: 0/50\nMarkdown negotiation: 3/50\nrobots.txt for AI: 8/50 (half blocking)\n\n4 out of 50 passed.\n\nCheck yours: koru-seo.com\n\n#SEO #AISearch' }] },
            { id: '059', title: '059. Кира: 5 connection requests', description: '8-10 новых requests (Priority A). Обновить статусы.', steps: ['5 requests Priority A', 'Обновить статусы'], subtasks: [{ id: '059-st1', text: 'Requests sent' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['outreach'] },
            { id: '060b', title: '060b. Макс: Убедиться что platform stable для demo', description: 'Проверить что продукт работает для записи demo.', steps: ['keyword analysis + brief generation + UI — без багов?'], subtasks: [{ id: '060b-st1', text: 'Stable' }], assignee: 'Макс', estimate: '30 мин', priority: 'high', tags: ['review'] },
            { id: '060', title: '060. Макс: Записать demo GIF/video (30 сек)', description: 'Открыть KORU → записать экран: URL paste → analysis → clusters → brief.', steps: ['Открыть KORU', 'Записать 30 сек GIF + MP4', 'Отправить Кире'], subtasks: [{ id: '060-st1', text: 'Demo записан' }, { id: '060-st2', text: 'Кира одобрила' }], assignee: 'Макс', estimate: '1 час', priority: 'high', tags: ['content'] }
        ]
    },
    {
        dayIndex: 24, phase: 'Week 5', dayLabel: 'Week 5, Пт',
        title: 'GO/NO-GO + Настя hooks',
        summary: 'Финальные CRs. GO/NO-GO review. Настя: hooks для B.',
        tasks: [
            { id: '059b', title: '059b. Кира: 5 connection requests (добиваем Priority A)', description: 'Отправить оставшимся Priority A.', steps: ['5 requests', 'Обновить статусы'], subtasks: [{ id: '059b-st1', text: 'Priority A done' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['outreach'] },
            { id: '062', title: '062. Кира: GO/NO-GO review', description: 'GO/NO-GO решение: CRs sent, acceptance rate, testimonials, signups.', steps: ['Total CRs: target 30-40', 'Acceptance: >=25% → GO', 'Testimonials: 2+?', 'Email signups?'], subtasks: [{ id: '062-st1', text: '30-40 sent' }, { id: '062-st2', text: 'Acceptance >=25%' }, { id: '062-st3', text: '2+ testimonials' }], assignee: 'Кира', estimate: '30 мин', priority: 'high', tags: ['review'], warning: 'Acceptance <20% = пересмотреть outreach стратегию.' },
            { id: 'n-w5-3', title: '211. Настя: Research — personalization hooks для Priority B', description: 'Пройти топ-20 Priority B (in-house). Записать personalization hooks.', steps: ['Sources → Люди → фильтр Priority B → топ 20', 'Для каждого: недавний пост, роль, компания → Notes'], subtasks: [{ id: 'n-w5-3-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ],
        keyMetric: 'Week 5: KORU revealed, 30-40 CRs sent, acceptance >=25%, demo GIF ready, 2+ testimonials'
    },

    // ==========================================
    // WEEK 6 — OUTREACH + POST 12 (6 дней: Вс–Пт)
    // ==========================================
    {
        dayIndex: 1005, phase: 'Week 6', dayLabel: 'Week 6, Вс',
        calendarDayOffset: 34,
        title: 'Макс: начало недели (Израиль)',
        summary: 'Воскресенье = начало рабочей недели Макса. Twitter + bugs.',
        tasks: [
            { id: 'mx-w6-sun', title: '304. Макс: Twitter мониторинг + баги', description: 'Twitter + если были баги — начать фикс.', steps: ['Twitter: проверить mentions, ответить', 'Баги → фикс', 'Landing: всё работает?'], subtasks: [{ id: 'mx-w6-sun-st1', text: 'Done' }], assignee: 'Макс', estimate: '1 час', priority: 'medium', tags: ['monitoring'] }
        ]
    },
    {
        dayIndex: 25, phase: 'Week 6', dayLabel: 'Week 6, Пн',
        title: 'Кира учёба. Настя: research',
        summary: 'Кира учёба. Настя: новые люди постящие про AI search.',
        tasks: [
            { id: 'n-w6-1', title: '212. Настя: Research — новые люди постящие про AI search', description: 'Свежий поиск: кто прямо сейчас постит про AI Overviews, GEO, AI search.', steps: ['LinkedIn: "AI Overviews" посты за последнюю неделю', '"GEO score" OR "AI citation" OR "llms.txt" посты', 'Авторы свежих постов → Sources → Люди, Priority A'], subtasks: [{ id: 'n-w6-1-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ]
    },
    {
        dayIndex: 26, phase: 'Week 6', dayLabel: 'Week 6, Вт',
        title: 'POST DAY: Пост 12 (demo GIF) + CRs',
        summary: 'Пост 12 с demo GIF. Продолжаем CRs.',
        tasks: [
            { id: '061', title: '061. Кира: Пост 12 (demo GIF) + 2ч engagement', description: 'Пост 12 с demo GIF. Люди видят реальный продукт.', steps: ['Приложить demo GIF от Макса', 'Пост 12 LinkedIn + GIF + landing link', '2ч engagement'], subtasks: [{ id: '061-st1', text: 'Demo post + engagement' }], assignee: 'Кира', estimate: '2.5 часа', priority: 'high', tags: ['content', 'engagement'], copyBlocks: [{ label: 'Пост 12 LinkedIn (copy-paste + GIF)', text: 'People kept asking: "What does it actually look like?"\n\nSo here\'s a 30-second demo.\n\n1. Paste a URL\n2. KORU audits the site\n3. Check GEO score — 14 rules, per page\n4. Run AI Brand Visibility\n5. Discover keywords — intent + relevance gate\n6. Semantic clustering\n7. Generate brief + content draft\n8. Every finding → task\n\nClassical SEO + AI search readiness. One platform.\n\nGEO score starts free. Full stack from $19.\n\nTry it: koru-seo.com\n\n[ATTACH GIF]\n\n#KORU #SEO #ProductDemo #AISearch' }] },
            { id: '061t', title: '061t. Макс: Кросс-пост 12 на Twitter', description: 'Demo tweet с GIF.', steps: ['Адаптировать → Twitter + GIF'], subtasks: [{ id: '061t-st1', text: 'Tweet + GIF' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Tweet (copy-paste + GIF)', text: '"What does it look like?"\n\n30-second demo:\n\nURL → audit → GEO score → AI brand check → keywords → briefs → tasks\n\nFree GEO score. $19 for full stack.\n\nkoru-seo.com\n\n[ATTACH GIF]\n\n#KORU #SEO #AISearch' }] },
            { id: '063a', title: '063a. Кира: 5 connection requests', description: 'Продолжаем CRs (Priority A остатки + Priority B начало).', steps: ['5 requests', 'Обновить статусы'], subtasks: [{ id: '063a-st1', text: 'Requests sent' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['outreach'] }
        ]
    },
    {
        dayIndex: 27, phase: 'Week 6', dayLabel: 'Week 6, Ср',
        title: 'Priority B CRs + launch post draft',
        summary: 'Priority B outreach начинается. Настя: SEO community.',
        tasks: [
            { id: '063', title: '063. Кира: Начать outreach к Priority B — 12-15 requests/день', description: 'Priority B (in-house SEO, контент-стратеги). Другая боль: "покажу ROI боссу".', steps: ['12-15 requests/день'], subtasks: [{ id: '063-st1', text: '12-15 requests' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'high', tags: ['outreach'], copyBlocks: [{ label: 'CR: In-house SEO Manager', text: 'Hi [Name], managing SEO in-house at [Company] — respect. We built KORU to audit sites for both Google and AI search. GEO score shows how citable each page is. AI Brand Visibility tracks if ChatGPT/Gemini mention you. Would love to connect.' }, { label: 'CR: Content Strategist', text: 'Hi [Name], your content work caught my eye — especially [something specific]. We\'re building KORU — it measures AI-citation readiness per page (14 rules) and generates content briefs. Happy to connect.' }] },
            { id: '064', title: '064. Кира: Написать launch post + план на день запуска', description: 'Написать главный launch пост. Спланировать launch day.', steps: ['Launch post: hook → problem → solution → social proof → demo → CTA', 'Launch day plan: time, beta testers, email, Twitter'], subtasks: [{ id: '064-st1', text: 'Launch post written' }, { id: '064-st2', text: 'Launch plan ready' }], assignee: 'Кира', estimate: '3 часа', priority: 'high', tags: ['content', 'planning'] },
            { id: 'n-w6-2', title: '213. Настя: Research — SEO community managers + forums', description: 'Найти модераторов SEO-сообществ и форумов. Потенциал для distribution.', steps: ['Reddit: r/SEO, r/bigseo moderators', 'Facebook: SEO groups admins', 'Slack/Discord: SEO communities', 'Найденные → Sources → Люди'], subtasks: [{ id: 'n-w6-2-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ]
    },
    {
        dayIndex: 28, phase: 'Week 6', dayLabel: 'Week 6, Чт',
        title: 'CRs + testimonials + landing update',
        summary: 'CRs + testimonials. Макс: landing update.',
        tasks: [
            { id: '065', title: '065. Кира: 12-15 connection requests (Priority B)', description: 'Расширяем на Priority B. 12-15 requests.', steps: ['12-15 requests Priority B', 'Обновить статусы'], subtasks: [{ id: '065-st1', text: 'Requests sent' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'high', tags: ['outreach'] },
            { id: '068', title: '068. Кира: Проверить — все отзывы получены? Вставить в launch post', description: 'Все beta testers прислали отзывы? Вставить в launch post.', steps: ['Check: все testimonials получены?', 'If missing: gentle reminder', 'Insert quotes into launch post'], subtasks: [{ id: '068-st1', text: 'Testimonials in launch post' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['outreach'] },
            { id: '068d', title: '068d. Макс: Landing page — pre-launch update', description: 'Landing должен быть launch-ready.', steps: ['Добавить testimonials', 'Добавить demo GIF', 'Обновить CTA: "Try it free"', 'Проверить mobile', 'Проверить скорость'], subtasks: [{ id: '068d-st1', text: 'Testimonials добавлены' }, { id: '068d-st2', text: 'Demo GIF на странице' }, { id: '068d-st3', text: 'CTA обновлён' }], assignee: 'Макс', estimate: '1.5 часа', priority: 'high', tags: ['landing'] }
        ]
    },
    {
        dayIndex: 29, phase: 'Week 6', dayLabel: 'Week 6, Пт',
        title: 'CRs + launch post review + Настя hooks',
        summary: 'CRs + launch post review. Настя: hooks. Макс выходной.',
        tasks: [
            { id: '066', title: '066. Кира: Перечитать launch post + DMs + Twitter', description: 'Перечитать и отредактировать launch post свежим взглядом.', steps: ['Re-read launch post. Edit.', 'DMs к interested people', 'Twitter engagement'], subtasks: [{ id: '066-st1', text: 'Post reviewed' }, { id: '066-st2', text: 'DMs + Twitter' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'medium', tags: ['content', 'outreach'] },
            { id: 'n-w6-3', title: '214. Настя: Research — personalization hooks для оставшихся B', description: 'Hooks для Priority B — финальный batch.', steps: ['Sources → фильтр Priority B → remaining', 'Hooks в Notes'], subtasks: [{ id: 'n-w6-3-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ],
        keyMetric: 'Week 6: Post 12 live, 60-80 CRs total, Priority B started, launch post drafted, landing updated'
    },

    // ==========================================
    // WEEK 7 — PRE-LAUNCH (6 дней: Вс–Пт)
    // ==========================================
    {
        dayIndex: 1006, phase: 'Week 7', dayLabel: 'Week 7, Вс',
        calendarDayOffset: 41,
        title: 'Макс: PH page + Twitter',
        summary: 'Макс: Product Hunt page setup + Twitter.',
        tasks: [
            { id: '069c', title: '069c. Макс: Подготовить Product Hunt страницу', description: 'PH = 500-2000 визитов в день launch.', steps: ['Создать Upcoming page на producthunt.com', 'Название, tagline, описание', 'Скриншоты + demo GIF', 'Maker comment draft'], subtasks: [{ id: '069c-st1', text: 'PH page создана' }, { id: '069c-st2', text: 'Скриншоты готовы' }], assignee: 'Макс', estimate: '2 часа', priority: 'high', tags: ['launch', 'product-hunt'] }
        ]
    },
    {
        dayIndex: 30, phase: 'Week 7', dayLabel: 'Week 7, Пн',
        title: 'Кира учёба. Настя: research',
        summary: 'Кира учёба. Настя: свежие AI search posters.',
        tasks: [
            { id: 'n-w7-1', title: '215. Настя: Research — свежие посты про AI search за неделю', description: 'Кто СЕЙЧАС постит про AI Overviews / GEO. Горячие контакты для launch.', steps: ['LinkedIn: AI Overviews посты за неделю', 'GEO score / AI citation / llms.txt — свежие', 'Авторы → Sources → Люди, Priority A'], subtasks: [{ id: 'n-w7-1-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ]
    },
    {
        dayIndex: 31, phase: 'Week 7', dayLabel: 'Week 7, Вт',
        title: 'CRs + pre-launch product review',
        summary: 'Priority B CRs + pre-launch product review.',
        tasks: [
            { id: '067', title: '067. Кира: 12-15 connection requests (Priority B)', description: 'Продолжаем Priority B.', steps: ['12-15 requests Priority B', 'Обновить статусы'], subtasks: [{ id: '067-st1', text: 'Requests sent' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'high', tags: ['outreach'] },
            { id: '068b', title: '068b. Кира + Макс: Pre-launch product review', description: 'Launch через неделю. Продукт должен быть 100% stable.', steps: ['Созвон 30-45 мин', 'Пройти весь user flow', 'Landing → signup → onboarding?', 'Email capture работает?', 'Баги → Макс фиксит'], subtasks: [{ id: '068b-st1', text: 'Full flow пройден' }, { id: '068b-st2', text: 'Landing → signup OK' }, { id: '068b-st3', text: 'Баги записаны' }], assignee: 'Кира + Макс', estimate: '45 мин', priority: 'high', tags: ['review'] }
        ]
    },
    {
        dayIndex: 32, phase: 'Week 7', dayLabel: 'Week 7, Ср',
        title: 'Launch email draft + Настя PH community',
        summary: 'Кира: launch email. Настя: PH voters.',
        tasks: [
            { id: '069b', title: '069b. Кира: Draft "We launched" email', description: 'Email к waitlist в launch day.', steps: ['Subject: "KORU is live — try it free"', 'Short body + signup link'], subtasks: [{ id: '069b-st1', text: 'Email drafted' }], assignee: 'Кира', estimate: '30 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Launch email (copy-paste)', text: 'Subject: KORU is live — check your AI-citation readiness for free\n\nHey,\n\nIt\'s here. KORU is live.\n\nWhat it does:\n-> GEO Score: 14-rule check per page\n-> AI Brand Visibility: OpenAI + Gemini tracking\n-> Agent Readiness: llms.txt, Content-Signal, JSON-LD\n-> Intent-first keywords + briefs + tasks\n\nGEO score starts free: [koru-seo.com/signup]\n\nKira\nFounder, KORU' }] },
            { id: 'n-w7-2', title: '216. Настя: Research — PH community + past SEO tool voters', description: 'Найти людей которые голосовали за SEO-инструменты на PH.', steps: ['PH: https://www.producthunt.com/search?q=SEO', 'PH: keyword research tools', 'Top voters → LinkedIn → Sources'], subtasks: [{ id: 'n-w7-2-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ]
    },
    {
        dayIndex: 33, phase: 'Week 7', dayLabel: 'Week 7, Чт',
        title: 'Final stability + CRs',
        summary: 'Макс: final stability. Кира: last CRs перед launch. Последний рабочий день Макса перед launch week.',
        tasks: [
            { id: '070b', title: '070b. Макс: Final product stability check', description: 'Четверг = последний рабочий день Макса перед launch. Всё должно быть bulletproof.', steps: ['Production: все endpoints?', 'Signup flow OK?', 'Нагрузочный тест', 'Мониторинг настроен?', 'Доступен на weekend emergency?'], subtasks: [{ id: '070b-st1', text: 'Production stable' }, { id: '070b-st2', text: 'Signup flow OK' }, { id: '070b-st3', text: 'Мониторинг OK' }], assignee: 'Макс', estimate: '1 час', priority: 'high', tags: ['review'], warning: 'Последний рабочий день Макса (Израиль). Всё stable СЕГОДНЯ.' },
            { id: '069a', title: '069a. Кира: Последние 12-15 requests перед launch', description: 'Финальный день outreach перед launch week.', steps: ['12-15 requests — финальный push', 'Обновить статусы'], subtasks: [{ id: '069a-st1', text: 'Final requests sent' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'high', tags: ['outreach'] }
        ]
    },
    {
        dayIndex: 34, phase: 'Week 7', dayLabel: 'Week 7, Пт',
        title: 'Pre-launch checklist + Настя last research',
        summary: 'Кира: pre-launch checklist. Настя: last-minute contacts. Макс выходной.',
        tasks: [
            { id: '070', title: '070. Кира: Pre-launch checklist', description: 'Один шанс. Ничего не забыть.', steps: ['Launch post: ready + demo GIF?', 'Testimonials вставлены?', 'Landing working?', 'Email drafted?', 'Beta testers notified? ("comment in first 30 min")', 'Twitter launch post adapted?'], subtasks: [{ id: '070-st1', text: 'Launch post final' }, { id: '070-st2', text: 'Testimonials ready' }, { id: '070-st3', text: 'Landing OK' }, { id: '070-st4', text: 'Email ready' }, { id: '070-st5', text: 'Beta testers notified' }, { id: '070-st6', text: 'ALL SYSTEMS GO' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['planning'] },
            { id: 'n-w7-3', title: '217. Настя: Research — last-minute горячие контакты', description: 'Финальный поиск: кто прямо сейчас ищет SEO-инструмент или жалуется на текущий.', steps: ['LinkedIn: "looking for SEO tool" за неделю', 'Reddit: r/SEO — свежие запросы', 'Новые → Sources → Priority A'], subtasks: [{ id: 'n-w7-3-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ],
        keyMetric: 'Week 7: PH page ready, email drafted, product stable, ALL SYSTEMS GO, 80+ total CRs'
    },

    // ==========================================
    // WEEK 8 — LAUNCH WEEK (6 дней: Вс–Пт)
    // ==========================================
    {
        dayIndex: 1007, phase: 'Week 8', dayLabel: 'Week 8, Вс',
        calendarDayOffset: 48,
        title: 'Макс: FINAL pre-launch check',
        summary: 'Воскресенье = последний шанс Макса всё проверить перед launch.',
        tasks: [
            { id: 'mx-w8-sun', title: '305. Макс: FINAL pre-launch — всё должно работать', description: 'Launch во вторник. Последний шанс проверить и пофиксить.', steps: ['Production: все endpoints?', 'Signup flow: end-to-end?', 'Landing page: быстро? Mobile?', 'Email capture: тестовый signup?', 'Twitter: ответить на всё', 'Баги → фиксить сегодня-завтра'], subtasks: [{ id: 'mx-w8-sun-st1', text: 'Production OK' }, { id: 'mx-w8-sun-st2', text: 'Signup flow OK' }, { id: 'mx-w8-sun-st3', text: 'Landing OK' }], assignee: 'Макс', estimate: '2 часа', priority: 'high', tags: ['review', 'monitoring'], warning: 'КРИТИЧЕСКИЙ ДЕНЬ. Launch через 2 дня.' }
        ]
    },
    {
        dayIndex: 35, phase: 'Week 8', dayLabel: 'Week 8, Пн',
        title: 'TEASER + pre-launch',
        summary: 'Кира учёба днём. Макс + Настя покрывают. Кира вечером: teaser "Tomorrow."',
        tasks: [
            { id: 'n-w8-1', title: '218. Настя: Research — кто реагировал на посты но не в базе', description: 'Пройти все посты 7-12. Кто лайкнул/прокомментил но НЕ в Sources? Добавить.', steps: ['Посты 7-12 → лайки и комменты', 'Кто НЕ в Sources → добавить, Priority A'], subtasks: [{ id: 'n-w8-1-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] },
            { id: '071c', title: '071c. Макс: Monday pre-launch мониторинг + final tech check', description: 'Launch завтра. Всё должно работать.', steps: ['LinkedIn: ответить на все комменты', 'Twitter: ответить на все mentions', 'FINAL tech check', 'Summary Кире'], subtasks: [{ id: '071c-st1', text: 'LinkedIn covered' }, { id: '071c-st2', text: 'Twitter covered' }, { id: '071c-st3', text: 'Tech check FINAL OK' }], assignee: 'Макс', estimate: '1.5 часа', priority: 'high', tags: ['engagement', 'monitoring'] },
            { id: '071', title: '071. Кира: Teaser post ВЕЧЕРОМ + final checks', description: 'Кира учится днём, teaser вечером. "Tomorrow." Launch = завтра.', steps: ['Вечером: LinkedIn + Twitter: "Tomorrow."', 'Final check: всё работает?', 'Remind beta testers: "Tomorrow morning — comment in first 30 min"'], subtasks: [{ id: '071-st1', text: 'Teaser posted' }, { id: '071-st2', text: 'Beta testers reminded' }, { id: '071-st3', text: 'All checked' }], assignee: 'Кира', estimate: '1 час', priority: 'high', tags: ['content'], warning: 'Teaser ВЕЧЕРОМ после учёбы.' }
        ]
    },
    {
        dayIndex: 36, phase: 'Week 8', dayLabel: 'Week 8, Вт',
        title: 'LAUNCH DAY!',
        summary: 'ВТОРНИК = LAUNCH. Beta testers comment first. Кира online весь день.',
        tasks: [
            { id: '075', title: '075. Кира: Launch post LinkedIn', description: 'THE moment. ВТОРНИК = пик LinkedIn engagement. Время: 22:00 AEST = 15:00 IST = 08:00 EDT.', steps: ['22:00 AEST / 15:00 IST → опубликовать'], subtasks: [{ id: '075-st1', text: 'LinkedIn live' }], assignee: 'Кира', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'LAUNCH POST LinkedIn', text: '48% of Google searches show an AI answer above organic results.\nOnly 38% of AI-cited pages are in the top-10.\n\nGEO tools exist that track whether AI mentions your brand. That\'s the monitoring layer — and it matters.\n\nBut monitoring tells you the score. It doesn\'t tell you the play.\n\nWhy did AI cite your competitor\'s page and skip yours? What\'s wrong with THIS specific page?\n\nThat\'s what we built.\n\nMeet KORU — per-page AI-citation diagnosis + full SEO pipeline.\n\n-> GEO Score: 14-rule check per page\n-> AI Brand Visibility: OpenAI + Gemini tracking\n-> Agent Readiness: llms.txt, JSON-LD\n-> Intent-first keywords + briefs + tasks\n\n"[QUOTE 1]" — [Name], [Role]\n"[QUOTE 2]" — [Name], [Role]\n\n[ATTACH DEMO GIF]\n\nGEO score starts free. Full stack from $19.\n\nkoru-seo.com\n\n#KORU #SEO #AISearch #GEO #Launch' }, { label: 'Первый комментарий', text: 'Try it free: koru-seo.com\n\nGEO score is free. Happy to answer any questions below!' }] },
            { id: '076', title: '076. Макс: Twitter launch thread', description: 'Через 5 мин после LinkedIn поста.', steps: ['15:05 IST → Thread → Twitter'], subtasks: [{ id: '076-st1', text: 'Twitter live' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['content'], copyBlocks: [{ label: 'Twitter thread', text: '1/ We launched KORU today.\n\nPer-page AI-citation diagnosis + full SEO pipeline.\n\n2/ GEO tools track if AI mentions your brand. KORU tells you WHY a specific page gets cited or skipped. 14 rules per page.\n\n3/ AI Brand Visibility: OpenAI + Gemini. Agent Readiness: llms.txt, JSON-LD.\n\n4/ Plus: intent-first keywords, clustering, briefs + drafts. Every finding → task.\n\n5/ GEO score starts free. Full stack from $19.\n\nkoru-seo.com\n\n#KORU #SEO #AISearch #Launch' }] },
            { id: '077', title: '077. Кира: 2 ЧАСА engagement', description: 'САМЫЕ ВАЖНЫЕ 2 ЧАСА КАМПАНИИ. 22:00-00:00 AEST.', steps: ['Каждый коммент = ответ', 'Beta testers comment в первые 30 мин', 'Макс мониторит Twitter параллельно'], subtasks: [{ id: '077-st1', text: '2ч engagement' }], assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['engagement'], warning: 'НИКАКИХ ОТВЛЕЧЕНИЙ. ЭТО ВСЁ РЕШАЕТ.' },
            { id: '078', title: '078. Макс: Email waitlist', description: 'Через 1 час после поста. Макс отправляет, Кира в engagement.', steps: ['16:00 IST → Отправить email', 'Проверить delivery rate'], subtasks: [{ id: '078-st1', text: 'Email sent' }], assignee: 'Макс', estimate: '5 мин', priority: 'high', tags: ['outreach'] },
            { id: '079', title: '079. Кира: Track reactions launch day', description: 'Мониторить кто реагирует. Обновлять статусы.', steps: ['Мониторить лайки/комменты', 'Обновить статусы в Sources'], subtasks: [{ id: '079-st1', text: 'Reactions tracked' }], assignee: 'Кира', estimate: '30 мин', priority: 'high', tags: ['monitoring'] }
        ]
    },
    {
        dayIndex: 37, phase: 'Week 8', dayLabel: 'Week 8, Ср',
        title: 'Post-launch day 1 + PH launch',
        summary: 'Continue engagement. DMs to interested. Product Hunt launch. Настя: реакции.',
        tasks: [
            { id: '080', title: '080. Кира: Ответить на все комменты + DMs заинтересованным', description: 'Ответить на ВСЕ комменты. DMs с предложением walkthrough.', steps: ['Answer all comments', 'DMs to interested', 'Track signups'], subtasks: [{ id: '080-st1', text: 'Comments + DMs' }], assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['engagement', 'outreach'], copyBlocks: [{ label: 'DM post-launch', text: 'Hey [Name],\n\nThanks for the kind words on the launch post!\n\nHappy to do a quick 15-minute walkthrough with your own site. No pitch — just a demo.\n\nWant me to send a calendar link?' }] },
            { id: '081b', title: '081b. Макс: Product Hunt LAUNCH', description: 'Второй удар через 1 день после LinkedIn.', steps: ['00:01 PST → PH publish', 'Maker comment сразу', 'Расшарить PH ссылку', 'Мониторить комменты весь день'], subtasks: [{ id: '081b-st1', text: 'PH live' }, { id: '081b-st2', text: 'Maker comment' }, { id: '081b-st3', text: 'Cross-posted' }], assignee: 'Макс', estimate: '2 часа', priority: 'high', tags: ['launch', 'product-hunt'], warning: 'Отвечать на КАЖДЫЙ коммент на PH.' },
            { id: 'n-w8-2', title: '219. Настя: Research — кто реагировал на launch но не в базе', description: 'После launch поста — найти новых людей.', steps: ['Launch post → лайки и комменты', 'Кто НЕ в Sources → добавить, Priority A'], subtasks: [{ id: 'n-w8-2-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ]
    },
    {
        dayIndex: 38, phase: 'Week 8', dayLabel: 'Week 8, Чт',
        title: 'Post-launch day 2 + PH + metrics',
        summary: 'Follow-up engagement. Demo calls. PH day 2. Launch metrics.',
        tasks: [
            { id: '082', title: '082. Кира: Follow-up комменты + demo calls', description: 'Продолжить комменты. Demo calls. Twitter.', steps: ['Answer comments', 'Demo calls', 'Twitter engagement'], subtasks: [{ id: '082-st1', text: 'Follow-up done' }], assignee: 'Кира', estimate: '2 часа', priority: 'high', tags: ['engagement', 'outreach'] },
            { id: '083b', title: '083b. Макс: Product Hunt day 2 + engagement', description: 'PH день 2 — активный engagement.', steps: ['Ответить на все PH комменты', 'Мониторить позицию'], subtasks: [{ id: '083b-st1', text: 'PH comments answered' }], assignee: 'Макс', estimate: '1 час', priority: 'high', tags: ['product-hunt'] },
            { id: '085b', title: '085b. Макс: Launch week метрики — полная сводка', description: 'Точные цифры для ретро. GA + все платформы + PH.', steps: ['GA4: visits, signups, conversion rate', 'LinkedIn: impressions, engagement', 'Twitter: impressions, engagement', 'Product Hunt: upvotes, comments, traffic', 'Email: open rate, click rate', 'FUNNEL: impressions → visits → signups → active → demos'], subtasks: [{ id: '085b-st1', text: 'GA метрики' }, { id: '085b-st2', text: 'Social метрики' }, { id: '085b-st3', text: 'PH метрики' }, { id: '085b-st4', text: 'Funnel сводка' }], assignee: 'Макс', estimate: '1.5 часа', priority: 'high', tags: ['review'] },
            { id: '085', title: '085. Кира + Макс: Launch Week Review', description: 'Понять результаты. Спланировать дальше.', steps: ['ALL metrics', 'FUNNEL analysis', 'Retro: что сработало, что нет', 'Next plan'], subtasks: [{ id: '085-st1', text: 'Metrics compiled' }, { id: '085-st2', text: 'Funnel analysis' }, { id: '085-st3', text: 'Retro done' }, { id: '085-st4', text: 'Next plan' }], assignee: 'Кира + Макс', estimate: '1 час', priority: 'high', tags: ['review'] }
        ]
    },
    {
        dayIndex: 39, phase: 'Week 8', dayLabel: 'Week 8, Пт',
        title: 'Launch Week — last push',
        summary: 'Финальный push. Настя: community tracking. Макс выходной.',
        tasks: [
            { id: '084', title: '084. Кира: Последний день активного post-launch push', description: 'Ответить на комменты. DMs. Twitter.', steps: ['Answer remaining comments', 'DMs к interested', 'Twitter engagement'], subtasks: [{ id: '084-st1', text: 'Follow-up done' }], assignee: 'Кира', estimate: '1.5 часа', priority: 'high', tags: ['engagement', 'outreach'] },
            { id: 'n-w8-3', title: '220. Настя: Research — SEO community discussions про launch', description: 'Проверить Reddit/Twitter — обсуждают ли launch.', steps: ['Reddit: r/SEO, r/bigseo — поиск "KORU"', 'Twitter: "KORU SEO"', 'Новые → Sources'], subtasks: [{ id: 'n-w8-3-st1', text: 'Done' }], assignee: 'Настя', estimate: '2 часа', priority: 'medium', tags: ['research'] }
        ],
        keyMetric: 'LAUNCH: product signups, demo calls, email→signup conversion, PH upvotes, first paying users'
    },

    // ==========================================
    // POST-LAUNCH
    // ==========================================
    {
        dayIndex: 40, phase: 'Post-launch', dayLabel: 'Post-launch',
        title: 'Post-launch: convert → users',
        summary: 'Priority C outreach. Convert engaged → paying users. Regular content.',
        tasks: [
            { id: '090', title: '090. Кира: Outreach к Priority C — 10-15 requests/день', description: 'Теперь есть launch пост, demo, отзывы. Connection requests проще.', steps: ['10-15 requests/день из Priority C', 'Обновить статусы'], subtasks: [{ id: '090-st1', text: 'Priority C active' }], assignee: 'Кира', estimate: '1.5 часа/день', priority: 'medium', tags: ['outreach'] },
            { id: '091', title: '091. Кира: DM всем кто среагировал + demo + контент', description: 'DMs to "Engaged". Demo calls. Продолжать постить 2 раза в неделю.', steps: ['DMs to ALL "Engaged" → demo offer', 'Demo calls', 'Content: 2 posts/week', 'Twitter: continue'], subtasks: [{ id: '091-st1', text: 'DMs to engaged' }, { id: '091-st2', text: 'Regular content' }], assignee: 'Кира', estimate: '2-3 часа/день', priority: 'high', tags: ['outreach', 'content'] }
        ],
        keyMetric: 'Post-launch: signups→active users, demo→paid conversion, MRR target'
    }
]

export const TOTAL_CAMPAIGN_DAYS = CAMPAIGN_DAYS.length

export const CAMPAIGN_VERSION = 2

export function buildInitialState(
    existingProgress?: { completedTasks?: Record<string, boolean>, notes?: Record<string, string>, taskOverrides?: Record<string, any>, taskDayMoves?: Record<string, number>, dayOverrides?: Record<string, { title?: string, summary?: string }> }
): CampaignState {
    const completedTasks = existingProgress?.completedTasks ?? {}
    const notes = existingProgress?.notes ?? {}
    const taskOverrides = existingProgress?.taskOverrides ?? {}
    const taskDayMoves = existingProgress?.taskDayMoves ?? {}
    const dayOverrides = existingProgress?.dayOverrides ?? {}

    // Build days with tasks, applying existing overrides
    const days: LiveDay[] = CAMPAIGN_DAYS.map(day => {
        const dayOv = dayOverrides[day.dayIndex]
        return {
            ...day,
            title: dayOv?.title || day.title,
            summary: dayOv?.summary || day.summary,
            note: notes[day.dayIndex] ?? '',
            _edited: !!dayOv,
            tasks: day.tasks.map(task => {
                const ov = taskOverrides[task.id] as any
                const liveTask: LiveTask = {
                    ...task,
                    ...(ov ? { title: ov.title ?? task.title, description: ov.description ?? task.description, steps: ov.steps ?? task.steps, subtasks: ov.subtasks ?? task.subtasks, assignee: ov.assignee ?? task.assignee, estimate: ov.estimate ?? task.estimate, tip: ov.tip !== undefined ? ov.tip : task.tip, warning: ov.warning !== undefined ? ov.warning : task.warning } : {}),
                    completed: !!completedTasks[task.id],
                    completedSubtasks: Object.fromEntries(task.subtasks.filter(st => completedTasks[st.id]).map(st => [st.id, true])),
                    _edited: !!ov
                }
                return liveTask
            })
        }
    })

    // Apply task moves
    for (const [taskId, targetDayIndex] of Object.entries(taskDayMoves)) {
        let movedTask: LiveTask | undefined
        // Remove from source day
        for (const day of days) {
            const idx = day.tasks.findIndex(t => t.id === taskId)
            if (idx !== -1) {
                movedTask = day.tasks.splice(idx, 1)[0]
                break
            }
        }
        // Add to target day
        if (movedTask) {
            const targetDay = days.find(d => d.dayIndex === targetDayIndex)
            if (targetDay) targetDay.tasks.push(movedTask)
        }
    }

    return { version: CAMPAIGN_VERSION, days }
}
