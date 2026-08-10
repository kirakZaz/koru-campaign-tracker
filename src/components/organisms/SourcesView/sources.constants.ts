import type {
    DmStatus,
    ConnectionStatus,
    FollowStatus,
    PersonStatus,
    GroupStatus,
    CompanyStatus,
    CompetitorThreatLevel,
    IcpSegment,
    ShortlistAction,
} from './SourcesView.types'

export const DM_STATUS_LABELS: Record<DmStatus, { label: string, color: string }> = {
    not_sent: { label: '--', color: '#8b949e' },
    sent: { label: 'Sent', color: '#d29922' },
    replied: { label: 'Replied', color: '#3fb68e' },
    no_reply: { label: 'No reply', color: '#f85149' }
}

export const CONNECTION_STATUS_LABELS: Record<ConnectionStatus, { label: string, color: string }> = {
    not_sent: { label: '--', color: '#8b949e' },
    sent: { label: 'Sent', color: '#d29922' },
    accepted: { label: 'Accepted', color: '#3fb68e' },
    declined: { label: 'Declined', color: '#f85149' }
}

export const FOLLOW_STATUS_LABELS: Record<FollowStatus, { label: string, color: string }> = {
    not_followed: { label: '--', color: '#8b949e' },
    followed: { label: 'Followed', color: '#d29922' },
    follow_back: { label: 'Follow-back', color: '#3fb68e' }
}

export const PERSON_STATUS_LABELS: Record<PersonStatus, { label: string, color: string }> = {
    new: { label: 'New', color: '#8b949e' },
    connected: { label: 'Connected', color: '#6c8eff' },
    dm_sent: { label: 'DM отпр.', color: '#d29922' },
    replied: { label: 'Replied', color: '#3fb68e' },
    demo: { label: 'Demo', color: '#a371f7' },
    beta: { label: 'Beta', color: '#3fb68e' },
    client: { label: 'Client', color: '#3fb68e' },
    declined: { label: 'Declined', color: '#f85149' }
}

export const GROUP_STATUS_LABELS: Record<GroupStatus, { label: string, color: string }> = {
    pending: { label: 'Pending', color: '#d29922' },
    approved: { label: 'Approved', color: '#3fb68e' },
    rejected: { label: 'Rejected', color: '#f85149' }
}

export const COMPANY_STATUS_LABELS: Record<CompanyStatus, { label: string, color: string }> = {
    research: { label: 'Research', color: '#8b949e' },
    contacted: { label: 'Contacted', color: '#d29922' },
    in_talks: { label: 'In talks', color: '#6c8eff' },
    partner: { label: 'Partner', color: '#3fb68e' },
    declined: { label: 'Declined', color: '#f85149' }
}

export const THREAT_LABELS: Record<CompetitorThreatLevel, { label: string, color: string }> = {
    direct: { label: 'Direct', color: '#f85149' },
    indirect: { label: 'Indirect', color: '#d29922' },
    adjacent: { label: 'Adjacent', color: '#8b949e' }
}

export const ICP_LABELS: Record<IcpSegment, string> = {
    freelancer: 'Freelancer',
    small_agency: 'Small Agency',
    in_house: 'In-House',
    other: 'Other'
}

export const SHORTLIST_ACTION_LABELS: Record<ShortlistAction, string> = {
    comment_post: 'Прокомментировать пост',
    send_dm: 'Написать DM',
    send_cr: 'Отправить запрос',
    invite_demo: 'Пригласить на демо',
    invite_beta: 'Предложить бета-тест',
    send_email: 'Отправить email',
    add_to_mailing: 'Добавить в рассылку',
    tweet_reply: 'Ответить в Twitter',
    mention_in_post: 'Упомянуть в посте'
}

export const NEXT_ACTION_LABELS: Record<ShortlistAction, string> = {
    comment_post: 'Коммент к посту',
    send_cr: 'Отправить запрос',
    send_dm: 'Написать DM',
    invite_demo: 'Пригласить на демо',
    invite_beta: 'Предложить бета',
    send_email: 'Отправить email',
    add_to_mailing: 'В рассылку',
    tweet_reply: 'Ответить в Twitter',
    mention_in_post: 'Упомянуть в посте'
}

export const cellSx = { fontSize: '0.8rem', py: 0.75, px: 1, borderColor: 'divider' }
export const headCellSx = { ...cellSx, fontWeight: 700, color: 'text.secondary', fontSize: '0.7rem', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const }
export const inputSx = { '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.5, px: 0.75 }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' } }
export const selectSx = { fontSize: '0.8rem', '& .MuiSelect-select': { py: 0.5, px: 0.75 }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } }

export const DEFAULT_COUNTRIES = ['US', 'UK', 'Israel', 'Канада', 'Австралия', 'Германия', 'Индия', 'Нидерланды']
