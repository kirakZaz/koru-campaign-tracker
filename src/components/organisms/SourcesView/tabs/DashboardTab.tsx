import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

import { isWithinLastWeek } from '../sources.utils'

import type { SourcesData } from '../SourcesView.types'

export default function DashboardTab({ local }: { local: SourcesData }) {
    const totalPeople = local.people.length
    const priorityA = local.people.filter(p => p.priority === 'A').length
    const priorityB = local.people.filter(p => p.priority === 'B').length
    const priorityC = local.people.filter(p => p.priority === 'C').length
    const bySegment = {
        freelancer: local.people.filter(p => p.icpSegment === 'freelancer').length,
        small_agency: local.people.filter(p => p.icpSegment === 'small_agency').length,
        in_house: local.people.filter(p => p.icpSegment === 'in_house').length,
        other: local.people.filter(p => p.icpSegment === 'other').length,
    }
    const byActivity = {
        high: local.people.filter(p => p.activityLevel === 'high').length,
        medium: local.people.filter(p => p.activityLevel === 'medium').length,
        low: local.people.filter(p => p.activityLevel === 'low').length,
    }
    const groupsApproved = local.groups.filter(g => g.status === 'approved').length
    const groupsPending = local.groups.filter(g => g.status === 'pending').length
    const groupsRejected = local.groups.filter(g => g.status === 'rejected').length
    const shortlistTotal = local.shortlist.length
    const crSent = local.shortlist.filter(s => s.connectionStatus === 'sent').length
    const crAccepted = local.shortlist.filter(s => s.connectionStatus === 'accepted').length
    const crDeclined = local.shortlist.filter(s => s.connectionStatus === 'declined').length
    const dmSent = local.shortlist.filter(s => s.dmStatus === 'sent').length
    const dmReplied = local.shortlist.filter(s => s.dmStatus === 'replied').length
    const dmNoReply = local.shortlist.filter(s => s.dmStatus === 'no_reply').length
    const demoCount = local.shortlist.filter(s => s.status === 'demo').length
    const betaCount = local.shortlist.filter(s => s.status === 'beta').length
    const clientCount = local.shortlist.filter(s => s.status === 'client').length
    const countryCounts: Record<string, number> = {}
    for (const p of local.people) { if (p.country) countryCounts[p.country] = (countryCounts[p.country] || 0) + 1 }
    const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 8)
    const addedThisWeek = local.people.filter(p => isWithinLastWeek(p.createdAt)).length

    const statBox = { p: 2, borderRadius: 2, backgroundColor: '#ffffff05', border: '1px solid', borderColor: 'divider' }
    const statNum = { fontSize: '1.8rem', fontWeight: 800, color: 'primary.main', lineHeight: 1 }
    const statLabel = { fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase' as const, fontWeight: 600, mt: 0.5 }
    const barSx = (color: string, pct: number) => ({ height: 6, borderRadius: 3, backgroundColor: color + '22', position: 'relative' as const, overflow: 'hidden', '&::after': { content: '""', position: 'absolute', left: 0, top: 0, height: '100%', width: `${Math.min(pct, 100)}%`, backgroundColor: color, borderRadius: 3 } })

    return (
        <Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1.5, mb: 3 }}>
                <Box sx={statBox}><Typography sx={statNum}>{totalPeople}</Typography><Typography sx={statLabel}>People total</Typography></Box>
                <Box sx={statBox}><Typography sx={{ ...statNum, color: '#3fb68e' }}>{priorityA}</Typography><Typography sx={statLabel}>Priority A</Typography></Box>
                <Box sx={statBox}><Typography sx={{ ...statNum, color: '#d29922' }}>{priorityB}</Typography><Typography sx={statLabel}>Priority B</Typography></Box>
                <Box sx={statBox}><Typography sx={{ ...statNum, color: '#8b949e' }}>{priorityC}</Typography><Typography sx={statLabel}>Priority C</Typography></Box>
                <Box sx={statBox}><Typography sx={{ ...statNum, color: '#6c8eff' }}>{shortlistTotal}</Typography><Typography sx={statLabel}>Outreach</Typography></Box>
                <Box sx={statBox}><Typography sx={{ ...statNum, color: '#a371f7' }}>{local.groups.length}</Typography><Typography sx={statLabel}>Groups total</Typography></Box>
                <Box sx={statBox}><Typography sx={{ ...statNum, color: '#3fb68e' }}>{addedThisWeek}</Typography><Typography sx={statLabel}>Добавлено за неделю</Typography></Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
                <Box sx={statBox}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>Outreach Funnel</Typography>
                    {[
                        { label: 'In Outreach', count: shortlistTotal, color: '#6c8eff' },
                        { label: 'Запрос отпр.', count: crSent, color: '#d29922' },
                        { label: `Запрос принят${crSent + crAccepted + crDeclined > 0 ? ` (${Math.round((crAccepted / (crSent + crAccepted + crDeclined)) * 100)}%)` : ''}`, count: crAccepted, color: '#3fb68e' },
                        { label: 'DM отпр.', count: dmSent, color: '#a371f7' },
                        { label: `DM ответил${dmSent + dmReplied + dmNoReply > 0 ? ` (${Math.round((dmReplied / (dmSent + dmReplied + dmNoReply)) * 100)}%)` : ''}`, count: dmReplied, color: '#3fb68e' },
                        { label: 'Demo', count: demoCount, color: '#a371f7' },
                        { label: 'Beta', count: betaCount, color: '#3fb68e' },
                        { label: 'Client', count: clientCount, color: '#3fb68e' },
                    ].map(r => (
                        <Box key={r.label} sx={{ mb: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
                                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{r.label}</Typography>
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: r.color }}>{r.count}</Typography>
                            </Box>
                            <Box sx={barSx(r.color, shortlistTotal > 0 ? (r.count / shortlistTotal) * 100 : 0)} />
                        </Box>
                    ))}
                </Box>

                <Box sx={statBox}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>ICP Segments</Typography>
                    {[
                        { label: 'Freelancer', count: bySegment.freelancer, color: '#3fb68e' },
                        { label: 'Small Agency', count: bySegment.small_agency, color: '#6c8eff' },
                        { label: 'In-House', count: bySegment.in_house, color: '#d29922' },
                        { label: 'Other', count: bySegment.other, color: '#8b949e' },
                    ].filter(r => r.count > 0).map(r => (
                        <Box key={r.label} sx={{ mb: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
                                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{r.label}</Typography>
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: r.color }}>{r.count}</Typography>
                            </Box>
                            <Box sx={barSx(r.color, totalPeople > 0 ? (r.count / totalPeople) * 100 : 0)} />
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                <Box sx={statBox}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>Groups</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip label={`Approved ${groupsApproved}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#3fb68e22', color: '#3fb68e' }} />
                        <Chip label={`Pending ${groupsPending}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#d2992222', color: '#d29922' }} />
                        {groupsRejected > 0 && <Chip label={`Rejected ${groupsRejected}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#f8514922', color: '#f85149' }} />}
                    </Box>
                </Box>

                <Box sx={statBox}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>Запросы на связь (Outreach)</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip label={`Sent ${crSent}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#d2992222', color: '#d29922' }} />
                        <Chip label={`Accepted ${crAccepted}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#3fb68e22', color: '#3fb68e' }} />
                        {crDeclined > 0 && <Chip label={`Declined ${crDeclined}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#f8514922', color: '#f85149' }} />}
                    </Box>
                    {crSent + crAccepted > 0 && <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', mt: 1 }}>Accept rate: {crAccepted + crSent > 0 ? Math.round((crAccepted / (crAccepted + crSent + crDeclined)) * 100) : 0}%</Typography>}
                </Box>

                <Box sx={statBox}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>DMs (Outreach)</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip label={`Sent ${dmSent}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#d2992222', color: '#d29922' }} />
                        <Chip label={`Replied ${dmReplied}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#3fb68e22', color: '#3fb68e' }} />
                        {dmNoReply > 0 && <Chip label={`No reply ${dmNoReply}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#f8514922', color: '#f85149' }} />}
                    </Box>
                    {dmSent + dmReplied > 0 && <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', mt: 1 }}>Reply rate: {dmReplied + dmSent + dmNoReply > 0 ? Math.round((dmReplied / (dmReplied + dmSent + dmNoReply)) * 100) : 0}%</Typography>}
                </Box>
            </Box>

            {topCountries.length > 0 && (
                <Box sx={{ ...statBox, mt: 2 }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>Top Countries</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {topCountries.map(([country, count]) => (
                            <Chip key={country} label={`${country} (${count})`} size="small" sx={{ fontSize: '0.7rem' }} />
                        ))}
                    </Box>
                </Box>
            )}

            <Box sx={{ ...statBox, mt: 2 }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>Activity Level</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#3fb68e' }}>High: {byActivity.high}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#d29922' }}>Medium: {byActivity.medium}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#8b949e' }}>Low: {byActivity.low}</Typography>
                </Box>
            </Box>
        </Box>
    )
}
