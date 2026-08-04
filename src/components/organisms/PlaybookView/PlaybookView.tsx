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
const templateBoxSx = { backgroundColor: '#ffffff06', borderRadius: 1, p: 2, mb: 2 }
const templateTextSx = { fontSize: '0.8rem', color: 'text.primary', whiteSpace: 'pre-line' as const }

export default function PlaybookView() {
    return (
        <Box sx={{ flex: 1, overflow: 'auto', px: { xs: 2, md: 4 }, py: 3 }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                Playbook
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', mb: 3 }}>
                Новый круг: прогнать проверку по компании → послать ей её же результат в личку → дожать. Всё remote, без звонков.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* SECTION 1: Loop */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>1. Круг: от «незнакомец» до «клиент»</Typography>
                <Typography sx={textSx}>
                    Ты не ждёшь, пока люди придут. Берёшь конкретные компании из базы, прогоняешь их сайт через проверку и присылаешь им их же результат. Никого не волнует твоя платформа — всех волнует их собственный результат.
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2, alignItems: 'center' }}>
                    {[
                        { label: 'В базе', color: '#8b949e', desc: 'Компания из Sources → Люди' },
                        { label: '→', color: '#8b949e' },
                        { label: 'Прогнал', color: '#6c8eff', desc: 'Citation Gap по их сайту' },
                        { label: '→', color: '#8b949e' },
                        { label: 'Послал', color: '#d29922', desc: 'Результат в личку LinkedIn' },
                        { label: '→', color: '#8b949e' },
                        { label: 'Ответил', color: '#3fb68e', desc: 'Заинтересовался' },
                        { label: '→', color: '#8b949e' },
                        { label: 'Дожал', color: '#a371f7', desc: 'Полный разбор, async' },
                        { label: '→', color: '#8b949e' },
                        { label: 'Клиент', color: '#3fb68e', desc: 'Зарегался / платит' },
                    ].map((item, i) => item.label === '→' ? (
                        <Typography key={i} sx={{ color: '#8b949e', fontSize: '0.8rem' }}>→</Typography>
                    ) : (
                        <Box key={i} sx={{ textAlign: 'center' }}>
                            <Box sx={chipSx(item.color)}>{item.label}</Box>
                            {item.desc && <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', mt: 0.3, maxWidth: 90 }}>{item.desc}</Typography>}
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
                            <Box component="th" sx={tableHeadSx}>Стадия</Box>
                            <Box component="th" sx={tableHeadSx}>Что делать</Box>
                            <Box component="th" sx={tableHeadSx}>Пример</Box>
                        </Box>
                    </Box>
                    <Box component="tbody">
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><Box sx={chipSx('#8b949e')}>В базе</Box> → <Box sx={chipSx('#6c8eff')}>Прогнал</Box></Box>
                            <Box component="td" sx={tableCellSx}>
                                <strong>Взять 10 компаний</strong> (агентства / B2B, чьи клиенты могут спрашивать про ChatGPT). В своём аккаунте KORU прогнать их сайт через Citation Gap. Сохранить скриншот. Отметить в Outreach: «Прогнал».
                            </Box>
                            <Box component="td" sx={tableCellSx}>Sources → Люди → взять 10 → прогнать в KORU → скрин в Outreach</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><Box sx={chipSx('#6c8eff')}>Прогнал</Box> → <Box sx={chipSx('#d29922')}>Послал</Box></Box>
                            <Box component="td" sx={tableCellSx}>
                                <strong>Написать в личку LinkedIn</strong> их результат + скриншот. Не питч — их данные. Имейл не нужен. Отметить в Outreach: «Послал».
                            </Box>
                            <Box component="td" sx={tableCellSx}>"I ran your site — AI recommends [competitors], not you. Want the full breakdown + what to fix?"</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><Box sx={chipSx('#d29922')}>Послал</Box> → <Box sx={chipSx('#3fb68e')}>Ответил</Box></Box>
                            <Box component="td" sx={tableCellSx}>
                                <strong>Кто ответил</strong> — ответить содержательно, предложить полный разбор. Без звонков — предложить прислать текстом/видео.
                            </Box>
                            <Box component="td" sx={tableCellSx}>"Happy to send it over — the pages that got cited share a few things yours doesn't."</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><Box sx={chipSx('#3fb68e')}>Ответил</Box> → <Box sx={chipSx('#a371f7')}>Дожал</Box></Box>
                            <Box component="td" sx={tableCellSx}>
                                <strong>Дожать асинхронно.</strong> Прислать полный отчёт текстом ИЛИ короткое записанное видео экрана ИЛИ ссылку попробовать самим. <strong>Никаких живых звонков.</strong>
                            </Box>
                            <Box component="td" sx={tableCellSx}>"Recorded a 3-min walkthrough of your result — [link]. No call needed."</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><Box sx={chipSx('#a371f7')}>Дожал</Box> → <Box sx={chipSx('#3fb68e')}>Клиент</Box></Box>
                            <Box component="td" sx={tableCellSx}>
                                <strong>Довести до регистрации/оплаты.</strong> Дать ссылку попробовать полную проверку самим. Первые вопросы бесплатны.
                            </Box>
                            <Box component="td" sx={tableCellSx}>"You can run the full check yourself here — [link]. First questions are free."</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* SECTION 3: How to write the result message */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>3. Как писать письмо-результат</Typography>

                <Typography sx={subtitleSx}>Правила</Typography>
                <Box component="ul" sx={listSx}>
                    <li>Веди <strong>их результатом</strong>, а не своей платформой. «Прогнала ваш сайт — вот что нашла».</li>
                    <li>Конкретика: назови 2-3 конкурентов, которых цитирует ИИ, и что у них есть, чего нет у них.</li>
                    <li><strong>Никаких звонков.</strong> Всё remote: текст, записанное видео, ссылка.</li>
                    <li>Коротко. Один результат + одно предложение помочь. Не простыня.</li>
                    <li>Пиши в LinkedIn — имейл тебе не нужен.</li>
                </Box>
            </Box>

            {/* SECTION 4: Templates */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>4. Шаблоны</Typography>

                <Typography sx={subtitleSx}>Письмо-результат (первое касание)</Typography>
                <Box sx={templateBoxSx}>
                    <Typography sx={templateTextSx}>
                        {`Hi [Name], I ran your site through an AI-search check — asked ChatGPT and Gemini a question your buyers ask, and looked at who they recommend.

They named [Competitor A], [Competitor B] and a few others. [their brand] wasn't in the answer.

The pages that got cited have a few things yours doesn't. Happy to send you the full breakdown + what to change. Want it?`}
                    </Typography>
                </Box>

                <Typography sx={subtitleSx}>Не ответил — follow-up (через 3-4 дня)</Typography>
                <Box sx={templateBoxSx}>
                    <Typography sx={templateTextSx}>
                        {`Hi [Name], following up on the AI-search result I ran for [their brand].

Quick recap: ChatGPT and Gemini recommend [competitors] for [their niche] — [their brand] isn't in the answer yet.

Want the full breakdown of why, and the 3 things to change? Just say the word.`}
                    </Typography>
                </Box>

                <Typography sx={subtitleSx}>Ответил с интересом — дожать (async, без звонков)</Typography>
                <Box sx={templateBoxSx}>
                    <Typography sx={templateTextSx}>
                        {`Great — here's the full result for [their brand].

I recorded a short screen walkthrough so you can see it without a call: [link].

The 3 quickest wins are [X, Y, Z]. You can also run the full check yourself here: [link]. Happy to answer anything by message.`}
                    </Typography>
                </Box>

                <Typography sx={subtitleSx}>Формат поста-находки (с личной страницы)</Typography>
                <Box sx={templateBoxSx}>
                    <Typography sx={templateTextSx}>
                        {`I checked [N] [niche] websites for AI-search visibility.

Asked ChatGPT & Gemini what buyers actually ask — here's who the AI recommends, and who's invisible:

[3-5 строк: кого называют часто / кого нет]

The cited ones share [1-2 concrete things]. The invisible ones don't.

Want to see where your site lands? [ссылка на проверялку, когда будет]`}
                    </Typography>
                </Box>
            </Box>

            {/* SECTION 5: What NOT to do */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>5. Чего НЕ делать</Typography>
                <Box component="ul" sx={listSx}>
                    <li>Не звать на созвон или демо — всё асинхронно.</li>
                    <li>Не питчить платформу — вести результатом человека.</li>
                    <li>Не постить «у нас есть фича» — постить находки.</li>
                    <li>Не ждать входящих — идти к конкретным людям самой.</li>
                    <li>Не мерить показы — мерить ответы, прогоны и регистрации.</li>
                </Box>
            </Box>
        </Box>
    )
}
