const DB_NAME = 'spotify-playlists';
const DB_VERSION = 1;

export const openDb = () => (
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => { onupgradeneeded(request.result) };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => console.warn('pending till unblocked');
  })
);


export const getLibraryKeys = (db) => (
  new Promise((resolve, reject) => {
    const objectStore = db.transaction('library').objectStore('library');
    const request = objectStore.getAllKeys();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  })
);

export const addToLibrary = (db, playlist) => (
  new Promise((resolve, reject) => {
    const transaction = db.transaction('library', 'readwrite');
    const library = transaction.objectStore('library');
    const request = library.add(playlist);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  })
);

export const removeFromLibrary = (db, id) => (
  new Promise((resolve, reject) => {
    const transaction = db.transaction('library', 'readwrite');
    const library = transaction.objectStore('library');
    const request = library.delete(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  })
);

export const getLibrary = (db) => (
  new Promise((resolve, reject) => {
    const objectStore = db.transaction('library').objectStore('library');
    const request = objectStore.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  })
);

export const getTips = (db) => (
  new Promise((resolve, reject) => {
    const objectStore = db.transaction('tips', 'readwrite').objectStore('tips');
    const request = objectStore.get('tips');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  })
);

export const updateTips = (db, newTips) => (
  new Promise((resolve, reject) => {
    const transaction = db.transaction('tips', 'readwrite');
    const tips = transaction.objectStore('tips');
    const request = tips.put(newTips);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  })
);

const onupgradeneeded = (db) => {
  if (!db.objectStoreNames.contains('library')) { 
    db.createObjectStore('library', {keyPath: 'id'});
  }
  if (!db.objectStoreNames.contains('tips')) {
    const store = db.createObjectStore('tips', {keyPath: 'id'});
    store.put({
      id: 'tips',
      addTip: false,
      widgetTip: false
    });
  }
}
