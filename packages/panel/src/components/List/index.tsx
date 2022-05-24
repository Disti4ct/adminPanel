import { useEffect, useState } from 'react'
import './index.scss'
import Box from '@mui/material/Box'
import { default as MuiList } from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Input from '../Input'

interface FullItem {
  value: string
  name?: string
}

export default function List({
  title,
  withName,
  onChange,
  isValidItem,
  placeholder,
}: {
  title: string
  withName?: boolean
  isValidItem?: (item: string) => boolean
  onChange: (items: FullItem[]) => void
  placeholder?: string
}) {
  const [items, setItems] = useState<FullItem[]>([])
  const [newName, setNewName] = useState<string>('')
  const [newItem, setNewItem] = useState<string>('')
  const [itemError, setItemError] = useState<string>('')

  useEffect(() => onChange(items), [items])

  const onNewItemChange = (value: string) => {
    setItemError('')
    setNewItem(value)
  }

  const onRemove = (targetIndex: number) => {
    setItems((prevItems) =>
      prevItems.filter((_, index) => index !== targetIndex)
    )
  }

  const onAdd = () => {
    if (typeof isValidItem !== 'function' || isValidItem(newItem)) {
      for (const { value } of items) {
        if (newItem.toLowerCase() === value.toLowerCase()) {
          return setItemError('The value already exists')
        }
      }

      const fullItem = withName
        ? {
            value: newItem,
            name: newName,
          }
        : {
            value: newItem,
          }

      setItems((prevItems: FullItem[]) => [...prevItems, fullItem])
      setNewItem('')
    } else {
      setItemError('Wrong value')
    }
  }

  return (
    <Box sx={{ margin: '1.2rem 0' }}>
      <h4 className="listHeader">{title}</h4>
      <MuiList className="list">
        {items.map(({ value, name }, index) => {
          return (
            <div className="listItemWrapper" key={index}>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onRemove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={value} secondary={name ? name : null} />
              </ListItem>
            </div>
          )
        })}
      </MuiList>

      <div className="listFooter">
        {withName && (
          <div className="marginWrapper">
            <Input value={newName} onChange={setNewName} placeholder="Name" />
          </div>
        )}
        <Input
          value={newItem}
          onChange={onNewItemChange}
          error={!!itemError}
          errorMessage={itemError || ''}
          placeholder={placeholder}
        />

        <Button
          variant="outlined"
          className="addButton"
          onClick={onAdd}
          disabled={!newItem}
        >
          Add
        </Button>
      </div>
    </Box>
  )
}
