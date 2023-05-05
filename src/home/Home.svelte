<script>
  import { addBook, getBooks } from '../lib/books';

  function getRemainingSpace() {
    navigator.storage.estimate().then(({ quota, usage }) => {
      console.log(quota, usage);
    });
  }

  let booksPromise = getBooks();

  async function handleOnImportBook(event) {
    await addBook(event.target.files[0]);
    booksPromise = getBooks();
    event.target.value = '';
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
  <label>
    Add a book
    <input id="book-input" type="file" on:change={handleOnImportBook} />
  </label>
</div>

<style>
  .home-root {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 90vh;
  }
</style>
