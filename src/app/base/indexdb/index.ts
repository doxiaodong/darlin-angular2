import { Subject } from 'rxjs/Subject'

const DB_NAME = 'darlinDB'
const DB_VERSION = 1 // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'music'

class DarlinDB {
  private _getSongs = new Subject<any>()
  getSongs$ = this._getSongs.asObservable()

  private _initDB = new Subject<any>()
  initDB$ = this._initDB.asObservable()

  db

  getStore() {
    const tx = this.db.transaction(DB_STORE_NAME, 'readwrite')
    const store = tx.objectStore(DB_STORE_NAME)
    return store
  }

  getSongs() {
    const songs = []
    this.getStore().openCursor().onsuccess = (evt) => {
      const cursor = event.target['result']
      if (cursor) {
        songs.push(cursor.value)
        cursor.continue()
      } else {
        this._getSongs.next(songs)
      }
    }
  }

  addSong(song) {
    this.getStore().add(song)
  }

  removeSong(song) {
    this.getStore().delete(song.id)
  }

  initDB() {
    const req = indexedDB.open(DB_NAME, DB_VERSION)

    req.onsuccess = (evt) => {
      this.db = evt.target['result']
      this._initDB.next(this.db)
    }

    req.onerror = (evt) => {
      console.error('initDb:', evt.target['errorCode'])
    }

    req.onupgradeneeded = (event) => {
      const _db = event.target['result']
      const objectStore = _db.createObjectStore(DB_STORE_NAME, { keyPath: 'id' })

      objectStore.createIndex('name', 'name', { unique: false })
      objectStore.createIndex('singer', 'singer', { unique: false })
      objectStore.createIndex('id', 'id', { unique: true })
    }
  }
}

export const darlinDB = new DarlinDB()
