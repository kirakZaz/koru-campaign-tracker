import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const sectionSx = { mb: 4 }
const titleSx = { fontSize: '1.1rem', fontWeight: 700, color: 'text.primary', mb: 1.5 }
const subtitleSx = { fontSize: '0.95rem', fontWeight: 600, color: 'text.primary', mb: 1, mt: 2.5 }
const textSx = { fontSize: '0.85rem', color: 'text.secondary', lineHeight: 1.7, mb: 1 }
const listSx = { fontSize: '0.85rem', color: 'text.secondary', lineHeight: 1.7, pl: 2, mb: 1 }
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
                Как мы набираем тестеров: недельный круг, тёплый заход, активация. Цель — 15 активных тестеров к релизу 10.10. Всё remote, без звонков. Активация важнее набора.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* 1. Weekly loop */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>1. Недельный круг (один оборот лид-машины)</Typography>
                <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', border: '1px solid', borderColor: 'divider' }}>
                    <Box component="thead"><Box component="tr">
                        <Box component="th" sx={tableHeadSx}>День</Box>
                        <Box component="th" sx={tableHeadSx}>Что делаешь</Box>
                    </Box></Box>
                    <Box component="tbody">
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>Пн — Интейк</strong></Box>
                            <Box component="td" sx={tableCellSx}>Берёшь 6-8 из Sources → Люди (агентства/фрилансеры с клиентами), записываешь в интейк-задачу и в Outreach. Отправляешь заходы (CR).</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>Вт — Пост + проверка</strong></Box>
                            <Box component="td" sx={tableCellSx}>Пост №1 (текст + реальный скрин) + репост на Company Page. Проходишь по Outreach, обновляешь статусы.</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>Ср — Контакт</strong></Box>
                            <Box component="td" sx={tableCellSx}>5 диалогов. Хук «челлендж одного клиента» — про их работу, не про продукт.</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>Чт — Активация</strong></Box>
                            <Box component="td" sx={tableCellSx}>Довести ответивших до первого действия → оффер tester plan. Реанимация мёртвых. Пост №2.</Box>
                        </Box>
                        <Box component="tr">
                            <Box component="td" sx={tableCellSx}><strong>Пт — Разбор</strong></Box>
                            <Box component="td" sx={tableCellSx}>Воронка в Dashboard, выводы в Insights, список на следующий Пн.</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* 2. LinkedIn note limit */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>2. LinkedIn: лимит нот и как обходить</Typography>
                <Typography sx={textSx}>
                    Free-аккаунт = <strong>~5 персональных нот к запросам в месяц</strong>. Дальше запросы уходят только без ноты. Лимит месячный, сбрасывается в начале месяца. Обход:
                </Typography>
                <Box component="ul" sx={listSx}>
                    <li><strong>Пустой запрос (главное).</strong> Лимит на ноты ≠ лимит на коннекты. Пустой запрос уходит нормально и часто принимают даже лучше. Приняли → пишешь в DM.</li>
                    <li><strong>Сначала прогрев.</strong> Пару дней комментируй их посты → узнают → пустой запрос принимают охотнее.</li>
                    <li><strong>Ноты — только на топ.</strong> 5/мес береги для самых важных, где нота реально решает.</li>
                    <li><strong>Мимо LinkedIn.</strong> У владельцев агентств есть контакт на сайте / почта.</li>
                    <li><strong>Premium/Sales Navigator</strong> — безлимит нот + InMail незнакомцам. Есть бесплатный триал на месяц (взять под спринт, потом отменить).</li>
                </Box>
            </Box>

            {/* 3. Premium-locked */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>3. Premium-заблокированные (🔒)</Typography>
                <Typography sx={textSx}>
                    Некоторым LinkedIn не даёт добавить ноту или написать DM. Помечай их 🔒 в карточке/таблице и веди иначе:
                </Typography>
                <Box component="ul" sx={listSx}>
                    <li>Пустой запрос + прогрев комментами → пиши после принятия.</li>
                    <li>Или сразу через сайт/почту.</li>
                    <li>InMail незнакомцу — только с Premium.</li>
                </Box>
            </Box>

            {/* 4. How to reach out */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>4. Как заходить</Typography>
                <Typography sx={textSx}>
                    Основной режим сейчас — <strong>пустой запрос</strong> (ноты береги). После принятия — короткий first-DM про их работу, не питч. Хук — «челлендж одного клиента»: пусть выберут клиента, ты покажешь, кого AI цитирует вместо него.
                </Typography>

                <Typography sx={subtitleSx}>Нота к запросу (когда есть лимит / на топ)</Typography>
                <Box sx={templateBoxSx}>
                    <Typography sx={templateTextSx}>
                        {`Hi {name} — came across your work with {agency/clients}. I dig into how AI engines (ChatGPT, Gemini, Claude, Grok) decide which pages to cite, and your niche keeps coming up. Would be glad to connect.`}
                    </Typography>
                </Box>

                <Typography sx={subtitleSx}>Хук после принятия — челлендж одного клиента</Typography>
                <Box sx={templateBoxSx}>
                    <Typography sx={templateTextSx}>
                        {`Quick one, {name}. Pick one client (or a prospect you're pitching) and I'll run their top page through KORU — you'll get a GEO score and the single biggest reason AI engines skip it, plus who they cite instead. Something you can take straight to that client. Want me to, or want to run it yourself? I'll send access.`}
                    </Typography>
                </Box>
            </Box>

            {/* 5. Activation */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>5. Активация тестеров (главная проблема)</Typography>
                <Typography sx={textSx}>
                    Согласиться — не значит пользоваться. Мёртвый тестер = не тот ICP или продукт дали «пустым». Лечим <strong>поводом</strong>, а не напоминанием верифнуть.
                </Typography>
                <Box component="ul" sx={listSx}>
                    <li><strong>Первое действие</strong> важнее подписки: доведи до запуска <strong>одной клиентской страницы</strong> (прямая ссылка на вход).</li>
                    <li>Сделал → оффер <strong>tester plan</strong> (месяц free, дальше по вкладу: фидбек / баг / реферал).</li>
                    <li><strong>Реанимация:</strong> не проси «залогинься» — дай повод (их же челлендж + прямая ссылка). Молчит 2 дня → 2-мин Loom по их кейсу.</li>
                </Box>
            </Box>

            {/* 6. Competitors */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>6. Конкуренты — не тратим циклы</Typography>
                <Typography sx={textSx}>
                    Фаундеры AI-visibility сервисов (Verticality, Profound-подобные) — не тестеры и не платящие. Не пишем как лидам. В карточке жми <strong>«→ В конкуренты»</strong> — уйдёт из People/Outreach в таблицу Конкуренты.
                </Typography>
            </Box>

            {/* 7. Messaging guard rails */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>7. Что говорим / чего НЕ говорим</Typography>
                <Typography sx={subtitleSx}>Говорим</Typography>
                <Box component="ul" sx={listSx}>
                    <li>Их результатом, не платформой. «Вот кого AI цитирует вместо твоего клиента».</li>
                    <li>Цифры: 48% поисков — AI Overviews; только 38% AI-цитируемых в топ-10 Google.</li>
                    <li>4 движка: ChatGPT, Gemini, Claude, Grok — на живом веб-поиске.</li>
                    <li>Per-page диагностика + пайплайн (находка → задача). Бесплатный старт, полный стек от $19.</li>
                </Box>
                <Typography sx={subtitleSx}>НЕ говорим</Typography>
                <Box component="ul" sx={listSx}>
                    <li>«Никто не делает» / «мы первые» — GEO-рынок существует (Profound, Goodie, Otterly…).</li>
                    <li>«5 минут», «готовые статьи», «в один клик — всё готово».</li>
                    <li>Не упоминаем Perplexity как то, что мы проверяем.</li>
                    <li>Не зовём на звонки/демо — всё async (текст / Loom / ссылка).</li>
                </Box>
            </Box>

            {/* 8. Metrics */}
            <Box sx={sectionSx}>
                <Typography sx={titleSx}>8. Метрики</Typography>
                <Typography sx={textSx}>
                    Смотрим на разговоры, первые действия и <strong>активных тестеров</strong> — НЕ на показы постов. Воронка: Нашёл → CR → Ответ → Первое действие → Активный. Цель — 15 активных к 10.10.
                </Typography>
            </Box>
        </Box>
    )
}
