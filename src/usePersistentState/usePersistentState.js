import { useDebugValue } from 'react'
import {atom, useRecoilState} from 'recoil'

const ATOMS = {}

const getStoredValue = (itemName, defaultValue) => {
  try {
    return JSON.parse(localStorage.getItem(itemName)) || defaultValue
  } catch(e) {
    return ''
  }
}

const storeValue = (itemName, value, defaultValue) => {
  localStorage.setItem(itemName, JSON.stringify(value || defaultValue))
}

const buildAtom = (itemName, defaultValue) => {
  return atom({
    key: itemName,
    default: getStoredValue(itemName, defaultValue),
  })
}

const getAtom = (itemName, defaultValue) => {
  if(!ATOMS[itemName]) {
    ATOMS[itemName] = buildAtom(itemName, defaultValue)
  }
  return ATOMS[itemName]
}


function usePersistentState(itemName, defaultValue) {
  const [value, updateStateValue] = useRecoilState(getAtom(itemName, defaultValue))
  useDebugValue(`usePersistentState(${itemName}): ${Object.keys(ATOMS)}`)
  
  const updateValue = newValue => {
    updateStateValue(newValue)
    storeValue(itemName, newValue, defaultValue)
  }
  return {
    value,
    updateValue,
  }
}

export default usePersistentState