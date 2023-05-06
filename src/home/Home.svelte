<script>
  import { addBook, getBooks } from '../lib/books';
  import ButtonImportBooks from './ButtonImportBooks.svelte';

  function getRemainingSpace() {
    navigator.storage.estimate().then(({ quota, usage }) => {
      console.log(quota, usage);
    });
  }

  let booksPromise = getBooks();

  async function handleOnImportBooks(event) {
    await addBook(event.detail.files[0]);
    booksPromise = getBooks();
  }

  getRemainingSpace();
</script>

<div class="home-root">
  <ul>
    {#await booksPromise}
      <p>loading books...</p>
    {:then books}
      {#each books as { key }}
        <li>
          <a href={`#/reader/${encodeURI(key)}`}>{key}</a>
        </li>
      {/each}
    {:catch}
      <p>lol</p>
    {/await}
  </ul>
  <ButtonImportBooks on:import-books={handleOnImportBooks} />
</div>

<style>
  .home-root {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 90vh;
  }
</style>
