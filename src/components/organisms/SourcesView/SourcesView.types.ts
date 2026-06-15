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
    platform: string
    members: string
    account: AccountName
    status: GroupStatus
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

export interface ShortlistPerson {
    id: string
    batch: string
    name: string
    linkedinUrl: string
    source: string
    status: PersonStatus
    notes: string
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
