import * as React from 'react'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'

import type { ShortlistPerson } from '../SourcesView.types'

type Signal = { key: string, on: boolean, label: string, color: string, Icon: React.ElementType }

/** Compact glance-strip for an Outreach row: one small icon per marker the user
 *  has set on this person (comment written, check ran, result sent, tester
 *  statuses, …). Only "on" markers render, so the strip is a clean summary of
 *  what's been done. Editing still happens in the person card. */
export default function OutreachSignals({ person }: { person: ShortlistPerson }) {
    const done = new Set(person.completedActions || [])

    const signals: Signal[] = [
        { key: 'comment', on: done.has('comment_post'), label: 'Коммент написан', color: '#6c8eff', Icon: ChatBubbleOutlineRoundedIcon },
        { key: 'tweet', on: done.has('tweet_reply'), label: 'Ответ в Twitter', color: '#6c8eff', Icon: AlternateEmailRoundedIcon },
        { key: 'mention', on: done.has('mention_in_post'), label: 'Упомянут в посте', color: '#6c8eff', Icon: CampaignRoundedIcon },
        { key: 'email', on: done.has('send_email') || done.has('add_to_mailing'), label: 'Письмо / рассылка', color: '#6c8eff', Icon: EmailRoundedIcon },
        { key: 'checkRan', on: !!person.checkRan, label: 'Прогнал проверку', color: '#d29922', Icon: ManageSearchRoundedIcon },
        { key: 'resultSent', on: !!person.resultSent, label: 'Послал результат', color: '#d29922', Icon: SendRoundedIcon },
        { key: 'resultImage', on: !!person.resultImage, label: 'Скриншот приложен', color: '#8b949e', Icon: ImageRoundedIcon },
        { key: 'agreedToTest', on: !!person.agreedToTest, label: 'Согласился тестить', color: '#3fb68e', Icon: ScienceRoundedIcon },
        { key: 'loggedIn', on: !!person.loggedIn, label: 'Залогинился', color: '#3fb68e', Icon: LoginRoundedIcon },
        { key: 'feedback', on: !!person.feedbackReceived, label: 'Дал фидбек', color: '#3fb68e', Icon: StarRoundedIcon },
    ]

    const active = signals.filter(s => s.on)
    if (active.length === 0 && !person.cantDm) {
        return <Box component="span" sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>—</Box>
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
            {person.cantDm && (
                <Tooltip title="Premium — нельзя написать (нет DM / ноты к запросу)">
                    <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', px: 0.4, height: 18, borderRadius: 0.75, backgroundColor: '#f85149', color: '#fff' }}>
                        <LockRoundedIcon sx={{ fontSize: '0.8rem' }} />
                    </Box>
                </Tooltip>
            )}
            {active.map(({ key, label, color, Icon }) => (
                <Tooltip key={key} title={label}>
                    <Box component="span" sx={{ display: 'inline-flex', color }}>
                        <Icon sx={{ fontSize: '1rem' }} />
                    </Box>
                </Tooltip>
            ))}
        </Box>
    )
}
