<script>
  import { addBook, getBooks } from '../lib/books';
  import { humanFileSize } from '../utils';
    import BookItem from './BookItem.svelte';
  import ButtonImportBooks from './ButtonImportBooks.svelte';
  import DialogConfirmImport from './DialogConfirmImport.svelte';

  function getRemainingSpace() {
    navigator.storage.estimate().then(({ quota, usage }) => {
      console.log(humanFileSize(quota), humanFileSize(usage));
    });
  }

  function handleOnCancelImport() {
    importConfirmationDialog.close();
    filesToImport = [];
  }

  async function handleOnConfirmImport() { 
    await addBook(filesToImport[0]);
    booksPromise = getBooks();
    importConfirmationDialog.close();
  }

  async function handleOnImportBooks(event) {
    filesToImport = Array.from(event.detail.files);
    importConfirmationDialog.showModal();
  }

  let booksPromise = getBooks();
  let importConfirmationDialog;
  let filesToImport = [];

  getRemainingSpace();
</script>

<div class="home-root">
  <ul class="book-list">
    {#await booksPromise}
      <p>loading books...</p>
    {:then books}
      {#each books as book}
        <BookItem book={book} />
      {/each}
    {:catch}
      <p>lol</p>
    {/await}
  </ul>
  <ButtonImportBooks on:import-books={handleOnImportBooks} />
  <DialogConfirmImport
    bind:this={importConfirmationDialog}
    on:cancel-import={handleOnCancelImport}
    on:confirm-import={handleOnConfirmImport}
    files={filesToImport} />
</div>

<style>
  .home-root {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 90vh;
  }

  .book-list {
    padding: 0 1rem;
  }
</style>
