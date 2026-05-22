import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import Paper from '@mui/material/Paper'
import AssigneeChip from '@/components/atoms/AssigneeChip/AssigneeChip'
import type { TaskCardProps } from './TaskCard.types'
import { styles } from './TaskCard.styles'

const CopyBlock = React.memo(function CopyBlock({ label, text }: { label: string, text: string }) {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = React.useCallback(() => {
        void navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [text])

    return (
        <Box sx={{ mt: 2, mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={styles.stepsTitle}>{label}</Typography>
                <IconButton size="small" onClick={handleCopy} sx={{ color: copied ? 'success.main' : 'text.secondary' }}>
                    {copied ? <CheckRoundedIcon fontSize="small" /> : <ContentCopyRoundedIcon fontSize="small" />}
                </IconButton>
            </Box>
            <Box sx={{
                p: 2,
                borderRadius: 1.5,
                backgroundColor: '#0d1117',
                border: '1px solid #30363d',
                whiteSpace: 'pre-wrap' as const,
                fontSize: '0.85rem',
                lineHeight: 1.7,
                color: '#e6edf3',
                fontFamily: '"Raleway", sans-serif',
                maxHeight: 400,
                overflow: 'auto',
                cursor: 'pointer',
                '&:hover': { borderColor: 'primary.main' }
            }} onClick={handleCopy}>
                {text}
            </Box>
            {copied && (
                <Typography sx={{ fontSize: '0.7rem', color: 'success.main', mt: 0.5, fontWeight: 600 }}>
                    Скопировано!
                </Typography>
            )}
        </Box>
    )
})

const TaskCard = React.memo(function TaskCard({ task, isTaskCompleted, onToggleTask, onEditTask }: TaskCardProps) {
    const [expanded, setExpanded] = React.useState(false)

    const taskCompleted = isTaskCompleted(task.id)
    const completedSubtasks = task.subtasks.filter((st) => isTaskCompleted(st.id)).length
    const totalSubtasks = task.subtasks.length

    const handleToggleExpand = React.useCallback(() => {
        setExpanded((prev) => !prev)
    }, [])

    const handleToggleMainTask = React.useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        onToggleTask(task.id)
    }, [onToggleTask, task.id])

    const handleToggleSubtask = React.useCallback((subtaskId: string) => {
        return (e: React.MouseEvent) => {
            e.stopPropagation()
            onToggleTask(subtaskId)
        }
    }, [onToggleTask])

    return (
        <Paper elevation={0} sx={styles.card(taskCompleted)}>
            <Box sx={styles.header} onClick={handleToggleExpand}>
                <Checkbox
                    checked={taskCompleted}
                    onClick={handleToggleMainTask}
                    sx={{ p: 0, mt: 0.25 }}
                    color="success"
                />
                <Box sx={styles.headerLeft}>
                    <Box sx={styles.titleRow}>
                        <Typography sx={styles.title(taskCompleted)}>
                            {task.title}
                        </Typography>
                    </Box>
                    <Typography sx={styles.description}>
                        {task.description}
                    </Typography>
                    <Box sx={styles.chips}>
                        <AssigneeChip assignee={task.assignee} />
                        <Box component="span" sx={styles.estimate}>{task.estimate}</Box>
                        {totalSubtasks > 0 && (
                            <Box component="span" sx={styles.progressText}>
                                {completedSubtasks}/{totalSubtasks}
                            </Box>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        {expanded ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ color: 'text.secondary' }}
                        onClick={(e) => { e.stopPropagation(); onEditTask(task) }}
                    >
                        <EditRoundedIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            <Collapse in={expanded}>
                <Box sx={styles.expandedContent}>
                    {task.warning && (
                        <Box sx={styles.warning}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <WarningAmberRoundedIcon sx={{ fontSize: '1rem', mt: 0.25 }} />
                                <span>{task.warning}</span>
                            </Box>
                        </Box>
                    )}

                    <Typography sx={styles.stepsTitle}>
                        Шаги
                    </Typography>
                    {task.steps.map((step, i) => (
                        <Box key={i} sx={styles.step}>
                            <Typography component="span" sx={{ fontWeight: 700, color: 'primary.main', mr: 1 }}>
                                {i + 1}.
                            </Typography>
                            {step}
                        </Box>
                    ))}

                    {task.copyBlocks && task.copyBlocks.length > 0 && task.copyBlocks.map((block, idx) => (
                        <CopyBlock key={idx} label={block.label} text={block.text} />
                    ))}

                    {totalSubtasks > 0 && (
                        <>
                            <Typography sx={styles.stepsTitle}>
                                Чек-лист ({completedSubtasks}/{totalSubtasks})
                            </Typography>
                            {task.subtasks.map((st) => (
                                <Box key={st.id} sx={styles.subtaskRow}>
                                    <Checkbox
                                        checked={isTaskCompleted(st.id)}
                                        onClick={handleToggleSubtask(st.id)}
                                        size="small"
                                        sx={{ p: 0, mt: 0.25 }}
                                        color="success"
                                    />
                                    <Typography sx={styles.subtaskText(isTaskCompleted(st.id))}>
                                        {st.text}
                                    </Typography>
                                </Box>
                            ))}
                        </>
                    )}

                    {task.tip && (
                        <Box sx={styles.tip}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <LightbulbOutlinedIcon sx={{ fontSize: '1rem', mt: 0.25 }} />
                                <span>{task.tip}</span>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Collapse>
        </Paper>
    )
})

export default TaskCard
