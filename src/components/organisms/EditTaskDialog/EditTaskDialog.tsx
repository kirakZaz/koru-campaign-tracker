import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import type { Assignee, Subtask } from '@/data/campaignData.types'
import type { EditTaskDialogProps } from './EditTaskDialog.types'
import { styles } from './EditTaskDialog.styles'

const ASSIGNEE_OPTIONS: Assignee[] = ['Кира', 'Настя', 'Макс', 'Кира + Настя', 'Кира + Макс', 'Настя → Кира']

const EditTaskDialog = React.memo(function EditTaskDialog({
    open,
    task,
    onClose,
    onSave
}: EditTaskDialogProps) {
    const [title, setTitle] = React.useState(task.title)
    const [description, setDescription] = React.useState(task.description)
    const [steps, setSteps] = React.useState<string[]>([...task.steps])
    const [subtasks, setSubtasks] = React.useState<Subtask[]>(task.subtasks.map((s) => ({ ...s })))
    const [assignee, setAssignee] = React.useState<Assignee>(task.assignee)
    const [estimate, setEstimate] = React.useState(task.estimate)
    const [tip, setTip] = React.useState(task.tip ?? '')
    const [warning, setWarning] = React.useState(task.warning ?? '')

    React.useEffect(() => {
        setTitle(task.title)
        setDescription(task.description)
        setSteps([...task.steps])
        setSubtasks(task.subtasks.map((s) => ({ ...s })))
        setAssignee(task.assignee)
        setEstimate(task.estimate)
        setTip(task.tip ?? '')
        setWarning(task.warning ?? '')
    }, [task])

    const handleStepChange = React.useCallback((index: number, value: string) => {
        setSteps((prev) => {
            const next = [...prev]
            next[index] = value
            return next
        })
    }, [])

    const handleAddStep = React.useCallback(() => {
        setSteps((prev) => [...prev, ''])
    }, [])

    const handleRemoveStep = React.useCallback((index: number) => {
        setSteps((prev) => prev.filter((_, i) => i !== index))
    }, [])

    const handleSubtaskChange = React.useCallback((index: number, value: string) => {
        setSubtasks((prev) => {
            const next = [...prev]
            next[index] = { ...next[index]!, text: value }
            return next
        })
    }, [])

    const handleAddSubtask = React.useCallback(() => {
        const newId = `${task.id}-custom-${Date.now()}`
        setSubtasks((prev) => [...prev, { id: newId, text: '' }])
    }, [task.id])

    const handleRemoveSubtask = React.useCallback((index: number) => {
        setSubtasks((prev) => prev.filter((_, i) => i !== index))
    }, [])

    const handleSave = React.useCallback(() => {
        onSave(task.id, {
            title,
            description,
            steps: steps.filter((s) => s.trim() !== ''),
            subtasks: subtasks.filter((s) => s.text.trim() !== ''),
            assignee,
            estimate,
            tip: tip || undefined,
            warning: warning || undefined
        })
        onClose()
    }, [task.id, title, description, steps, subtasks, assignee, estimate, tip, warning, onSave, onClose])

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>
                Редактировать задачу
            </DialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Box sx={styles.section}>
                    <TextField
                        label="Название"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={4}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Assignee</InputLabel>
                            <Select
                                value={assignee}
                                label="Assignee"
                                onChange={(e) => setAssignee(e.target.value as Assignee)}
                            >
                                {ASSIGNEE_OPTIONS.map((a) => (
                                    <MenuItem key={a} value={a}>{a}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Время"
                            value={estimate}
                            onChange={(e) => setEstimate(e.target.value)}
                            sx={{ width: 150 }}
                        />
                    </Box>
                </Box>

                <Box sx={styles.section}>
                    <Typography sx={styles.sectionTitle}>Шаги</Typography>
                    {steps.map((step, i) => (
                        <Box key={i} sx={styles.stepRow}>
                            <Typography sx={styles.stepNumber}>{i + 1}.</Typography>
                            <TextField
                                value={step}
                                onChange={(e) => handleStepChange(i, e.target.value)}
                                fullWidth
                                multiline
                                maxRows={6}
                                size="small"
                            />
                            <IconButton size="small" onClick={() => handleRemoveStep(i)} sx={{ color: 'error.main' }}>
                                <DeleteOutlineRoundedIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        size="small"
                        startIcon={<AddRoundedIcon />}
                        onClick={handleAddStep}
                        sx={styles.addButton}
                    >
                        Добавить шаг
                    </Button>
                </Box>

                <Box sx={styles.section}>
                    <Typography sx={styles.sectionTitle}>Чек-лист</Typography>
                    {subtasks.map((st, i) => (
                        <Box key={st.id} sx={styles.subtaskRow}>
                            <TextField
                                value={st.text}
                                onChange={(e) => handleSubtaskChange(i, e.target.value)}
                                fullWidth
                                size="small"
                                placeholder="Пункт чек-листа..."
                            />
                            <IconButton size="small" onClick={() => handleRemoveSubtask(i)} sx={{ color: 'error.main' }}>
                                <DeleteOutlineRoundedIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        size="small"
                        startIcon={<AddRoundedIcon />}
                        onClick={handleAddSubtask}
                        sx={styles.addButton}
                    >
                        Добавить пункт
                    </Button>
                </Box>

                <Box sx={styles.section}>
                    <Typography sx={styles.sectionTitle}>Подсказка / Предупреждение</Typography>
                    <TextField
                        label="Подсказка (зелёная)"
                        value={tip}
                        onChange={(e) => setTip(e.target.value)}
                        fullWidth
                        multiline
                        maxRows={4}
                        size="small"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Предупреждение (красное)"
                        value={warning}
                        onChange={(e) => setWarning(e.target.value)}
                        fullWidth
                        multiline
                        maxRows={4}
                        size="small"
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Отмена
                </Button>
                <Button onClick={handleSave} variant="contained">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default EditTaskDialog
