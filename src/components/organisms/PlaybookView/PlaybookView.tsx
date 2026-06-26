import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const sectionSx = { mb: 4 }
const titleSx = { fontSize: '1.1rem', fontWeight: 700, color: 'text.primary', mb: 1.5 }
const subtitleSx = { fontSize: '0.95rem', fontWeight: 600, color: 'text.primary', mb: 1, mt: 2.5 }
const textSx = { fontSize: '0.85rem', color: 'text.secondary', lineHeight: 1.7, mb: 1 }
const listSx = { fontSize: '0.85rem', color: 'text.secondary', lineHeight: 1.7, pl: 2, mb: 1 }
const chipSx = (color: string) => ({
    display: 'inline-block',
    fontSize: '0.7rem',
    fontWeight: 700,
    px: 1,
    py: 0.2,
    borderRadius: 1,
    backgroundColor: color + '22',
    color,
    border: `1px solid ${color}44`,
    mr: 0.5
})
const tableCellSx = { fontSize: '0.8rem', py: 1.25, px: 1.5, borderColor: 'divider', verticalAlign: 'top' as const }
const tableHeadSx = { ...tableCellSx, fontWeight: 700, color: 'text.secondary', fontSize: '0.7rem', textTransform: 'uppercase' as const, backgroundColor: '#ffffff06' }

export default function PlaybookView() {
    return (
        <Box sx={{ flex: 1, overflow: 'auto', px: { xs: 2, md: 4 }, py: 3 }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                Playbook
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', mb: 3 }}>
                Пошаговое руководство: что делать с людьми из базы на каждом этапе
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* SECTION 1: Funnel */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>1. Воронка: путь от "незнакомец" до "клиент"</Typography>
                <Typography sx={textSx}>
                    Каждый человек из базы проходит через стадии. Не все дойдут до конца — и это нормально. Задача — двигать людей по воронке, не перепрыгивая стадии.
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2, alignItems: 'center' }}>
                    {[
                        { label: 'New', color: '#8b949e', desc: 'В базе, ещё не контактировали' },
                        { label: '→', color: '#8b949e' },
                        { label: 'Connected', color: '#6c8eff', desc: 'Приняли connection request' },
                        { label: '→', color: '#8b949e' },
                        { label: 'DM sent', color: '#d29922', desc: 'Отправили личное сообщение' },
                        { label: '→', color: '#8b949e' },
                        { label: 'Replied', color: '#3fb68e', desc: 'Ответили на DM' },
                        { label: '→', color: '#8b949e' },
                        { label: 'Demo', color: '#a371f7', desc: 'Согласились на демо-звонок' },
                        { label: '→', color: '#8b949e' },
                        { label: 'Beta', color: '#3fb68e', desc: 'Тестируют продукт' },
                        { label: '→', color: '#8b949e' },
                        { label: 'Client', color: '#3fb68e', desc: 'Платящий клиент' },
                    ].map((item, i) => item.label === '→' ? (
                        <Typography key={i} sx={{ color: '#8b949e', fontSize: '0.8rem' }}>→</Typography>
                    ) : (
                        <Box key={i} sx={{ textAlign: 'center' }}>
                            <Box sx={chipSx(item.color)}>{item.label}</Box>
                            {item.desc && <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', mt: 0.3, maxWidth: 80 }}>{item.desc}</Typography>}
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* SECTION 2: What to do at each stage */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>2. Что делать на каждой стадии</Typography>

                <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', border: '1px solid', borderColor: 'divider' }}>
                    <Box component="thead">
                        <Box component="tr">
                            <Box component="th" sx={tableHeadSx}>Статус</Box>
                            <Box component="th" sx={tableHeadSx}>Что делать</Box>
                            <Box component="th" sx={tableHeadSx}>Когда</Box>
                            <Box component="th" sx={tableHeadSx}>Пример</Box>
                        </Box>
                    </Box>
                    <Box component="tbody">
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><Box sx={chipSx('#8b949e')}>New</Box></Box>
                            <Box component="td" sx={tableCellSx}>
                                <strong>Отсвечивание:</strong> зайти на страницу (человек увидит "кто смотрел профиль"). Если он постит — прокомментировать его пост (умный комментарий, НЕ "Great post!").
                            </Box>
                            <Box component="td" sx={tableCellSx}>W1-W3</Box>
                            <Box component="td" sx={tableCellSx}>Заходим на профиль 2-3 раза за неделю. Если есть свежий пост — комментируем.</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><Box sx={chipSx('#8b949e')}>New</Box> → <Box sx={chipSx('#6c8eff')}>Connected</Box></Box>
                            <Box component="td" sx={tableCellSx}>
                                <strong>Connection Request:</strong> отправить с персонализированным сообщением. Упомянуть их недавний пост, компанию или роль. НЕ питчить KORU в CR.
                            </Box>
                            <Box component="td" sx={tableCellSx}>С W4 (после reveal)</Box>
                            <Box component="td" sx={tableCellSx}>"Hi [Name], your recent post about [topic] resonated. I'm building KORU — an SEO platform for Google + AI search. Would love to connect."</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><Box sx={chipSx('#6c8eff')}>Connected</Box> → <Box sx={chipSx('#d29922')}>DM sent</Box></Box>
                            <Box component="td" sx={tableCellSx}>
                                <strong>Первый DM:</strong> через 1-2 дня после того как приняли CR. Задать вопрос про их работу. Упомянуть что-то конкретное из их профиля/постов. НЕ продавать.
                            </Box>
                            <Box component="td" sx={tableCellSx}>1-2 дня после принятия CR</Box>
                            <Box component="td" sx={tableCellSx}>"Hey [Name], thanks for connecting! Curious — have you started measuring how your clients' content performs in AI search specifically? The gap between ranking and being cited is something I keep hearing about."</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><Box sx={chipSx('#d29922')}>DM sent</Box> → <Box sx={chipSx('#3fb68e')}>Replied</Box></Box>
                            <Box component="td" sx={tableCellSx}>
                                <strong>Развивать разговор:</strong> ответить содержательно. Задать follow-up вопрос. Если человек проявляет интерес к теме AI search — мягко упомянуть что строишь инструмент.
                            </Box>
                            <Box component="td" sx={tableCellSx}>Сразу при ответе</Box>
                            <Box component="td" sx={tableCellSx}>"That's exactly what we're seeing too. I've been building a 14-rule check for this — would you want to try it when it's ready?"</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><Box sx={chipSx('#3fb68e')}>Replied</Box> → <Box sx={chipSx('#a371f7')}>Demo</Box></Box>
                            <Box component="td" sx={tableCellSx}>
                                <strong>Предложить демо:</strong> если человек заинтересован — предложить 15-минутный звонок. "Могу показать на твоём сайте." Отправить ссылку на календарь.
                            </Box>
                            <Box component="td" sx={tableCellSx}>Когда человек проявил интерес</Box>
                            <Box component="td" sx={tableCellSx}>"Happy to do a quick 15-min walkthrough with your own site — want me to send a calendar link?"</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><Box sx={chipSx('#a371f7')}>Demo</Box> → <Box sx={chipSx('#3fb68e')}>Beta</Box></Box>
                            <Box component="td" sx={tableCellSx}>
                                <strong>Предложить бета-тест:</strong> после демо или при сильном интересе — дать доступ к продукту. Через неделю спросить фидбек. Попросить 2-3 предложения отзыв.
                            </Box>
                            <Box component="td" sx={tableCellSx}>После демо или при явном интересе</Box>
                            <Box component="td" sx={tableCellSx}>"I'd love to get your feedback as an early tester. No strings attached — just want input from someone who does this daily."</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><Box sx={chipSx('#3fb68e')}>Beta</Box> → <Box sx={chipSx('#3fb68e')}>Client</Box></Box>
                            <Box component="td" sx={tableCellSx}>
                                <strong>Конвертировать в клиента:</strong> собрать фидбек, спросить "готовы ли вы продолжить на платном плане?". Предложить скидку для ранних пользователей.
                            </Box>
                            <Box component="td" sx={tableCellSx}>Через 1-2 недели бета-теста</Box>
                            <Box component="td" sx={tableCellSx}>"Your feedback has been super valuable. We're launching next week — want me to set you up with a founder discount?"</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* SECTION 3: Comment strategy */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>3. Как комментировать чужие посты</Typography>

                <Typography sx={subtitleSx}>Правила</Typography>
                <Box component="ul" sx={listSx}>
                    <li><strong>Никогда</strong> не писать "Great post!", "So true!", "Love this!" — это спам, не engagement.</li>
                    <li><strong>Всегда</strong> добавлять ценность: факт, вопрос, альтернативную точку зрения, свой опыт.</li>
                    <li><strong>Можно</strong> конструктивно не согласиться — это даже лучше чем соглашаться.</li>
                    <li><strong>Не питчить</strong> KORU в комментариях (до W4 reveal). После reveal — только если уместно.</li>
                    <li>Длина: 2-4 предложения. Не одно слово, не простыня.</li>
                </Box>

                <Typography sx={subtitleSx}>Примеры хороших комментариев</Typography>
                <Box sx={{ backgroundColor: '#ffffff06', borderRadius: 1, p: 2, mb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 0.5 }}>Пост: "AI Overviews are killing organic CTR"</Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: '#3fb68e' }}>
                        "The CTR drop is real, but the interesting part is what happens to cited brands — they actually get MORE clicks per impression than uncited brands on the same SERP. The game isn't position anymore, it's citation."
                    </Typography>
                </Box>
                <Box sx={{ backgroundColor: '#ffffff06', borderRadius: 1, p: 2, mb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 0.5 }}>Пост: "I don't trust AI for keyword research"</Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: '#3fb68e' }}>
                        "The problem isn't AI — it's that most tools start from nothing. If the AI reads the site first and understands what the business does, the keywords are grounded in reality, not generated from thin air."
                    </Typography>
                </Box>

                <Typography sx={subtitleSx}>Примеры плохих комментариев</Typography>
                <Box sx={{ backgroundColor: '#f8514911', borderRadius: 1, p: 2 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: '#f85149' }}>
                        "Great insights!" / "So true, thanks for sharing!" / "Check out KORU — we solve this!" / "👏👏👏"
                    </Typography>
                </Box>
            </Box>

            {/* SECTION 4: DM templates */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>4. Шаблоны сообщений</Typography>
                <Typography sx={textSx}>
                    Все шаблоны — отправная точка. Персонализируй под каждого человека. Заменяй [Name], [topic], [Company] на реальные данные из Notes.
                </Typography>

                <Typography sx={subtitleSx}>DM после комментария к нашему посту</Typography>
                <Box sx={{ backgroundColor: '#ffffff06', borderRadius: 1, p: 2, mb: 2, fontFamily: 'inherit' }}>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.primary', whiteSpace: 'pre-line' }}>
                        {`Hey [Name],

Really appreciated your comment — especially the point about [their specific point].

Curious: have you tried measuring your AI-citation readiness specifically? Things like whether your pages have FAQ schema, whether AI crawlers can access your content?

I've been working on a checklist for this — 14 rules. Would you want to see it when it's ready?`}
                    </Typography>
                </Box>

                <Typography sx={subtitleSx}>DM после принятия Connection Request</Typography>
                <Box sx={{ backgroundColor: '#ffffff06', borderRadius: 1, p: 2, mb: 2 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.primary', whiteSpace: 'pre-line' }}>
                        {`Hey [Name], thanks for connecting!

Noticed your work on [specific thing from their profile]. Quick question — have you looked into how your content performs in AI answers specifically?

We keep seeing a gap between ranking well and actually being cited. Curious if you've noticed the same.`}
                    </Typography>
                </Box>

                <Typography sx={subtitleSx}>DM — предложение бета-теста</Typography>
                <Box sx={{ backgroundColor: '#ffffff06', borderRadius: 1, p: 2, mb: 2 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.primary', whiteSpace: 'pre-line' }}>
                        {`Hey [Name],

I'm building an SEO platform that measures AI-citation readiness — a 14-rule GEO score per page, AI brand visibility tracking across OpenAI and Gemini, plus intent-first keyword intelligence.

Would love your input as an early tester. No strings attached — just want feedback from someone who actually does this work daily.

Interested?`}
                    </Typography>
                </Box>

                <Typography sx={subtitleSx}>DM — предложение демо</Typography>
                <Box sx={{ backgroundColor: '#ffffff06', borderRadius: 1, p: 2, mb: 2 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.primary', whiteSpace: 'pre-line' }}>
                        {`Hey [Name],

Thanks for the interest! Happy to do a quick 15-minute walkthrough — I can run KORU on your actual site so you see real results, not a generic demo.

Want me to send a calendar link?`}
                    </Typography>
                </Box>

                <Typography sx={subtitleSx}>DM — запрос отзыва от бета-тестера</Typography>
                <Box sx={{ backgroundColor: '#ffffff06', borderRadius: 1, p: 2, mb: 2 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.primary', whiteSpace: 'pre-line' }}>
                        {`Hey [Name],

Thanks so much for testing KORU — your feedback on [specific thing] was really valuable.

Quick favor: would you be ok sharing a sentence or two about your experience? Something genuine, in your own words.

We're gearing up for launch and a few real voices would mean a lot. No pressure at all!`}
                    </Typography>
                </Box>

                <Typography sx={subtitleSx}>Connection Request — шаблоны</Typography>
                <Box sx={{ backgroundColor: '#ffffff06', borderRadius: 1, p: 2, mb: 1 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>Для фрилансеров / agency owners:</Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.primary' }}>
                        "Hi [Name], your recent post about [topic] really resonated. I'm building KORU — an SEO platform that audits for both Google and AI search. GEO score, AI brand visibility, intent-first keywords. Would love to connect."
                    </Typography>
                </Box>
                <Box sx={{ backgroundColor: '#ffffff06', borderRadius: 1, p: 2, mb: 1 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>Для in-house SEO:</Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.primary' }}>
                        "Hi [Name], leading SEO at [Company] — impressive results. KORU adds an AI-search layer to your SEO stack: GEO score, AI brand visibility, agent readiness. The metrics your board will ask about next quarter. Would be great to connect."
                    </Typography>
                </Box>
                <Box sx={{ backgroundColor: '#ffffff06', borderRadius: 1, p: 2 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>Для спикеров конференций:</Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.primary' }}>
                        "Hi [Name], your talk at [Conference] about [topic] was excellent. Building in the same space — KORU measures AI-citation readiness alongside classical rankings. Would love to connect."
                    </Typography>
                </Box>
            </Box>

            {/* SECTION 5: Timing */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>5. Тайминг по неделям</Typography>

                <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', border: '1px solid', borderColor: 'divider' }}>
                    <Box component="thead">
                        <Box component="tr">
                            <Box component="th" sx={tableHeadSx}>Неделя</Box>
                            <Box component="th" sx={tableHeadSx}>Что делаем с людьми</Box>
                        </Box>
                    </Box>
                    <Box component="tbody">
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>W1-2</strong></Box>
                            <Box component="td" sx={tableCellSx}>Только отсвечивание: заходим на профили, комментируем посты. Если кто-то комментирует НАШИ посты — пишем DM (вопрос про workflow, НЕ pitch). Не отправляем CR.</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>W3</strong></Box>
                            <Box component="td" sx={tableCellSx}>Активнее комментируем. Первая ссылка на landing в посте. Начинаем искать бета-тестеров через DM. Пишем тем, кто проявил наибольший интерес.</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>W4</strong></Box>
                            <Box component="td" sx={tableCellSx}>REVEAL — KORU публичен. Обновляем headline. Публикуем "Meet KORU". Можно упоминать продукт в DM и комментариях.</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>W5</strong></Box>
                            <Box component="td" sx={tableCellSx}>Connection Requests → Priority A (8-10/день). Демо-звонки. Сбор отзывов от бета-тестеров.</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>W6</strong></Box>
                            <Box component="td" sx={tableCellSx}>Connection Requests → Priority B (12-15/день). Продолжаем демо. Персонализация каждого CR.</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>W7</strong></Box>
                            <Box component="td" sx={tableCellSx}>Финальные CR перед launch. Уведомить бета-тестеров: "Запуск во вторник, прокомментируй первым." Подготовка launch email.</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>W8</strong></Box>
                            <Box component="td" sx={tableCellSx}>LAUNCH. Отвечать на КАЖДЫЙ комментарий. DM всем кто написал "круто" → предложить демо. Трекать реакции.</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>W9+</strong></Box>
                            <Box component="td" sx={tableCellSx}>Priority C outreach. Convert engaged → paying. Регулярный контент 2 поста/неделю.</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* SECTION 6: Rules */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>6. Главные правила</Typography>
                <Box component="ul" sx={listSx}>
                    <li><strong>Никогда не питчить в первом сообщении.</strong> Первое сообщение = вопрос про их работу.</li>
                    <li><strong>Персонализация обязательна.</strong> Каждый CR, каждый DM должен содержать что-то конкретное про этого человека (недавний пост, компания, роль).</li>
                    <li><strong>2 часа engagement после каждого поста — не обсуждается.</strong> Алгоритм LinkedIn решает в первые 2 часа.</li>
                    <li><strong>Не спамить.</strong> Максимум 12-15 CR в день. 3-5 DMs в день. Если LinkedIn предупреждает — снизить темп.</li>
                    <li><strong>Обновлять статусы в Sources.</strong> После каждого действия — менять статус человека. Это наша CRM.</li>
                    <li><strong>DM follow-up через 3 дня.</strong> Если не ответили — одно повторное сообщение через 3 дня. Если снова нет — оставить.</li>
                    <li><strong>Записывать "How?" комментарии.</strong> Если кто-то спросил "How?", "When?", "I want to try" — это горячий лид. DM сразу.</li>
                </Box>
            </Box>
        </Box>
    )
}