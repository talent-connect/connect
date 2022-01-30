export default {
  save: function (key, value, expirationSec) {
    if (!Storage) return false
    var expirationMS = expirationSec * 1000
    var record = {
      value,
      timestamp: new Date().getTime() + expirationMS,
    }
    localStorage.setItem(key, JSON.stringify(record))

    return value
  },
  load: function (key) {
    if (!Storage) return false
    try {
      var record = JSON.parse(localStorage.getItem(key))
      if (!record) return false
      return record.value && new Date().getTime() < record.timestamp
    } catch (e) {
      return false
    }
  },
  remove: function (key) {
    if (!Storage) return false
    localStorage.removeItem(key)
  },
  update: function (key, value) {
    if (!Storage) return false
    try {
      var record = JSON.parse(localStorage.getItem(key))
      if (!record) return false
      const updatedRecord = { value, timestamp: record.timestamp }
      localStorage.setItem(key, JSON.stringify(updatedRecord))
      return updatedRecord
    } catch (e) {
      return false
    }
  },
}
