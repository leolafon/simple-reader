export function getBooks() {
  if (navigator.storage) {
    return navigator.storage.getDirectory()
      .then(async (root) => {
        const list = [];
        // @ts-ignore
        for await (const [key, value] of root.entries()) {
          list.push({ key, value });
        }
        return list;
      })
      .catch((error) => console.error(error));
  } else {
    console.log('no storage');
    return Promise.resolve([]);
  }
}

export function addBook(file) {
  if (!window.FileReader) { return Promise.resolve(); }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(onLoadEvent) {
      const bookData = onLoadEvent.target.result;
      if (navigator.storage) {
        navigator.storage.getDirectory()
          .then((root) => root.getFileHandle(file.name, { create: true }))
          // @ts-ignore
          .then((fileHandle) => fileHandle.createWritable())
          .then((writable) => {
            return writable.write(bookData).then(() => writable.close());
          })
          .catch((error) => {
            console.error(error);
            return reject(error);
          })
          .finally(() => {
            return resolve();
          });
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

export function getBook(bookName) {
  if (!navigator.storage) { return; }

  return navigator.storage.getDirectory()
    .then((root) => root.getFileHandle(bookName))
    .then((fileHandle) => fileHandle.getFile())
}

export function deleteBook(book) {
  if (!navigator.storage) { return; }

  return navigator.storage.getDirectory()
    .then((root) => root.removeEntry(book.key));
}

