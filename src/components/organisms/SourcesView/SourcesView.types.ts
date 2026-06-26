export type PersonStatus = 'new' | 'connected' | 'dm_sent' | 'replied' | 'demo' | 'beta' | 'client' | 'declined'
export type GroupStatus = 'pending' | 'approved' | 'rejected'
export type CompanyStatus = 'research' | 'contacted' | 'in_talks' | 'partner' | 'declined'
export type IcpSegment = 'freelancer' | 'small_agency' | 'in_house' | 'other'
export type IcpPriority = 'A' | 'B' | 'C'
export type AccountName = 'Кира' | 'Настя'

export interface SourcePerson {
    id: string
    name: string
    linkedinUrl: string
    country: string
    icpSegment: IcpSegment
    priority: IcpPriority
    activityLevel: 'high' | 'medium' | 'low'
    source: string
    status: PersonStatus
    notes: string
}

export interface SourceGroup {
    id: string
    name: string
    url: string
    platform: string
    members: string
    account: AccountName
    status: GroupStatus
    priority: number
    activeMembers: string[]
    notes: string
}

export interface SourceCompany {
    id: string
    name: string
    website: string
    segment: IcpSegment
    size: string
    contactPerson: string
    status: CompanyStatus
    notes: string
}

export type DmStatus = 'not_sent' | 'sent' | 'replied' | 'no_reply'
export type ConnectionStatus = 'not_sent' | 'sent' | 'accepted' | 'declined'

 export type ShortlistAction =
    | 'comment_post'
    | 'send_dm'
    | 'send_cr'
    | 'invite_demo'
    | 'invite_beta'
    | 'send_email'
    | 'add_to_mailing'
    | 'tweet_reply'
    | 'mention_in_post'

export interface ShortlistPerson {
    id: string
    batch: string
    name: string
    linkedinUrl: string
    priority: IcpPriority
    dmStatus: DmStatus
    connectionStatus: ConnectionStatus
    source: string
    status: PersonStatus
    notes: string
    actions?: ShortlistAction[]
}

export interface SourcesData {
    people: SourcePerson[]
    groups: SourceGroup[]
    companies: SourceCompany[]
    shortlist: ShortlistPerson[]
    countries: string[]
}

export interface SourcesViewProps {
    sources: SourcesData
    onSaveSources: (sources: SourcesData) => void
}
