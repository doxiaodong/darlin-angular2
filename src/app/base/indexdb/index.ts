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
      const cursor = evt.target['result']
      if (cursor) {
        songs.push(cursor.value)
        cursor.continue()
      } else {
        const sortedSongs = songs.sort((a, b) => {
          return a.__sortIndex - b.__sortIndex
        })
        this._getSongs.next(sortedSongs)
      }
    }
  }

  /*
  ** do not call this if need sort, use updateSongs replace
  */
  addSong(song) {
    this.getStore().add(song)
  }

  /*
  ** do not call this if need sort, use updateSongs replace
  */
  removeSong(song) {
    this.getStore().delete(song.id)
  }

  updateSongs(songs: any[]) {
    this.getStore().clear()
    songs.forEach((song, index) => {
      song.__sortIndex = index
      this.addSong(song)
    })
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
