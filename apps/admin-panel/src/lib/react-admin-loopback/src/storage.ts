export default {
  /** */
  save: function (key: string, value, expirationSec: number) {
    if (!Storage) return false
    var expirationMS = expirationSec * 1000
    var record = {
      value,
      timestamp: new Date().getTime() + expirationMS,
    }
    localStorage.setItem(key, JSON.stringify(record))

    return value
  },
  /** */
  load: function (key: string) {
    if (!Storage) return false
    try {
      var record = JSON.parse(localStorage.getItem(key))
      if (!record) return false
      return record.value && new Date().getTime() < record.timestamp
    } catch (e) {
      return false
    }
  },
  /** */
  remove: function (key: string) {
    if (!Storage) return false
    localStorage.removeItem(key)
  },
  /** */
  update: function (key: string, value) {
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
