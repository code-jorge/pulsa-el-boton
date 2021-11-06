import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { TextField, FormControl, Select, MenuItem, InputLabel, Autocomplete, Stack, FormHelperText } from '@mui/material'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Button from '../../components/Button/Button'
import PageContent from '../../layout/PageContent/PageContent'
import { addDilemma } from '../../utils/api'
import styles from './CreateDilemma.module.css'
import { DILEMMA_CATEGORIES, DILEMMA_TYPES } from '../../utils/constants'
import { useNotification } from '../../components/NotificationManager/NotificationManager'
import { formatDate } from '../../utils/date'

const EMPTY_DILEMMA = {
  date: new Date(),
  title: '',
  type: 'classic',
  category: '',
  tags: [],
  positive: '',
  negative: '',
  slug: '',
  code: ''
}

const TextInput = ({ label, value, onChange, type='text', error='' })=> (
  <TextField
    type={type}
    className={styles.input}
    variant='outlined'
    label={label}
    value={value}
    onChange={onChange}
    helperText={error}
  />
)

const SelectInput = ({ label, value, onChange, options, error='' })=> (
  <FormControl 
    variant="outlined"
    className={styles.input}
  >
    <InputLabel id={`${label}-label`}>{label}</InputLabel>
    <Select
      labelId={`${label}-label`}
      value={value}
      onChange={onChange}
      label={label}
    >
      {options.map(option=> (
        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
      ))}
    </Select>

    {error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
)

const checkFields = (dilemma)=> {
  const errors = []
  if (!dilemma.title) errors.push({ field: 'title', message: 'El título es obligatorio' })
  if (!dilemma.category) errors.push({ field: 'category', message: 'La categoría es obligatoria' })
  if (!dilemma.positive) errors.push({ field: 'positive', message: 'La parte positiva es obligatoria' })
  if (!dilemma.negative) errors.push({ field: 'negative', message: 'La parte negativa es obligatoria' })
  if (!dilemma.tags || !dilemma.tags.length) errors.push({ field: 'tags', message: 'Las etiquetas son obligatorias' })
  if (!dilemma.slug) errors.push({ field: 'slug', message: 'La URL es obligatoria' })
  if (!dilemma.code) errors.push({ field: 'code', message: 'El código de verificación es obligatorio' })
  return errors
}

const CreateDilemma = ()=> {

  const notifications = useNotification()

  const [dilemma, setDilemma] = useState(EMPTY_DILEMMA)

  const [errors, setErrors] = useState([])

  const [buttonState, setButtonState] = useState('opened')

  const submitDilemma = useMutation(addDilemma)

  const handleUpdate = (field, value)=> {
    // Clear the error if it existed
    if (errors.find(error=> error.field === field)) {
      setErrors(errors.filter(error=> error.field !== field))
    }
    setDilemma(c=> ({ ...c, [field]: value }))
  }

  const handleClick = ()=> {
    const errors = checkFields(dilemma)
    if (errors.length) {
      setErrors(errors)
      notifications.error({ title: 'Datos incorrectos', message: 'Por favor revisa el formulario' })
      return
    }
    const form = {
      ...dilemma,
      date: formatDate(dilemma.date)
    }
    submitDilemma.mutate(form, {
      onSuccess: ()=> {
        notifications.success({ title: 'Dilema creado', message: 'El dilema se ha creado correctamente' })
        setDilemma(EMPTY_DILEMMA)
      },
      onError: ()=> {
        notifications.error({ title: 'Error', message: 'Ha ocurrido un error al crear el dilema' })
      }
    })
  }

  const getErrorMessage = (field)=> {
    return errors.find(error=> error.field === field)?.message || ''
  }

  return (
    <PageContent 
      loading={[submitDilemma.isLoading]} 
      errors={[submitDilemma.isError]}
    >
      <div className={styles.main}>
        <Stack spacing={3}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Fecha publicación"
            value={dilemma.date}
            onChange={d => handleUpdate('date', d)}
          />
          <TextInput
            label='Título'
            value={dilemma.title}
            error={getErrorMessage('title')}
            onChange={e=> handleUpdate('title', e.target.value)}
          />
          <TextInput
            label='URL'
            value={dilemma.slug}
            error={getErrorMessage('slug')}
            onChange={e=> handleUpdate('slug', e.target.value)}
          />
          <section className={styles.section}>
            <SelectInput
              label='Tipo'
              value={dilemma.type}
              onChange={e=> handleUpdate('type', e.target.value)}
              options={DILEMMA_TYPES}
            />
            <SelectInput
              label='Categoría'
              value={dilemma.category}
              onChange={e=> handleUpdate('category', e.target.value)}
              error={getErrorMessage('category')}
              options={DILEMMA_CATEGORIES}
            />
          </section>
          <Autocomplete
            multiple
            freeSolo
            className={styles.input}
            options={[]}
            value={dilemma.tags}
            onChange={(_e, value)=> handleUpdate('tags', value)}
            renderInput={(params)=> (
              <TextField 
                {...params} 
                variant="outlined" 
                label="Etiquetas" 
                helperText={getErrorMessage('tags')} 
              />
            )}
          />
          <TextInput
            label='Parte positiva'
            value={dilemma.positive}
            error={getErrorMessage('positive')}
            onChange={e=> handleUpdate('positive', e.target.value)}
          />
          <TextInput
            label='Parte negativa'
            value={dilemma.negative}
            error={getErrorMessage('negative')}
            onChange={e=> handleUpdate('negative', e.target.value)}
          />
          <TextInput
            type='password'
            label='Código verificación'
            value={dilemma.code}
            error={getErrorMessage('code')}
            onChange={e=> handleUpdate('code', e.target.value)}
          />
        </Stack>
        <Button 
          className={styles.button}
          type={buttonState}
          onMouseEnter={()=> setButtonState('opened')}
          onMouseLeave={()=> setButtonState('closed')}
          onMouseDown={()=> setButtonState('pressed')}
          onMouseUp={()=> setButtonState('opened')}
          onClick={handleClick}
        />
      </div>
    </PageContent>
  )
}

export default CreateDilemma