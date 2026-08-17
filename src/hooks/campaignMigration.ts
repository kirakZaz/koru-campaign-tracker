import type { CampaignState } from '@/data/campaignData.types'

// Merge a stored (older-version) campaign state into a freshly built template state.
// Pure + testable — no React, no I/O. Rule #1: NEVER lose user/baked content.
//
// What survives a version bump:
//  - per-day: note, _edited, and edited title/summary
//  - per-task: completed, completedSubtasks
//  - user-created tasks (present in old, absent from template) are kept as-is
//  - subtasks: old text wins on id-match; old-only subtasks (extra per-person rows,
//    baked lead lists) are appended — so filled-in leads never disappear
//  - copyBlocks: old wins whenever they diverge from the template (personal messages)
//  - _edited tasks are carried over wholesale
export function mergeCampaignState(old: CampaignState | undefined, fresh: CampaignState): CampaignState {
    if (!old) return fresh

    for (const oldDay of old.days) {
        const newDay = fresh.days.find(d => d.dayIndex === oldDay.dayIndex)
        if (!newDay) continue
        if (oldDay.note) newDay.note = oldDay.note
        if (oldDay._edited) newDay._edited = oldDay._edited
        if (oldDay.title !== newDay.title && oldDay._edited) newDay.title = oldDay.title
        if (oldDay.summary !== newDay.summary && oldDay._edited) newDay.summary = oldDay.summary

        for (const oldTask of oldDay.tasks) {
            const newTask = newDay.tasks.find(t => t.id === oldTask.id)
            if (!newTask) {
                // Task was created by the user — keep it.
                newDay.tasks.push({ ...oldTask, dayNumber: String(oldDay.dayIndex), phaseNumber: oldDay.phase })
                continue
            }
            if (oldTask.completed) newTask.completed = true
            if (oldTask.completedSubtasks) Object.assign(newTask.completedSubtasks, oldTask.completedSubtasks)

            // Preserve baked content stored on non-_edited tasks (leads, per-person items).
            if (oldTask.subtasks?.length) {
                const oldById = new Map(oldTask.subtasks.map(s => [s.id, s]))
                const merged = newTask.subtasks.map(ns => {
                    const os = oldById.get(ns.id)
                    return os ? { ...ns, text: os.text } : ns
                })
                for (const os of oldTask.subtasks) {
                    if (!newTask.subtasks.some(ns => ns.id === os.id)) merged.push(os)
                }
                newTask.subtasks = merged
            }
            if (oldTask.copyBlocks?.length && JSON.stringify(oldTask.copyBlocks) !== JSON.stringify(newTask.copyBlocks)) {
                newTask.copyBlocks = oldTask.copyBlocks
            }

            if (oldTask._edited) {
                Object.assign(newTask, oldTask, { dayNumber: String(oldDay.dayIndex), phaseNumber: oldDay.phase })
            }
        }
    }

    return fresh
}
