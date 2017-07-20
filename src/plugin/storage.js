const storage = window.localStorage

export function set (key, value) {
  storage.setItem(key, value)
}

export function setMulti (datas) {
  datas.forEach(data => set(data.key, data.value))
}

export function get (key) {
  return storage.getItem(key)
}

export function getMulti (keys) {
  return keys.map(key => get(key))
}

export function clear (key, clearAlls = false) {
  if (clearAlls) {
    storage.clear()
  } else {
    storage.removeItem(key)
  }
}

export function clearMulti (keys) {
  keys.forEach(key => clear(key))
}