<script>
  import { createEventDispatcher } from 'svelte';
  import Bin from './Bin.svelte';

  export let book;

  const dispatch = createEventDispatcher();

  function handleOnBinClick(e) {
    e.preventDefault();
    dispatch('delete-book', { book });
  }
</script>

<li>
  <a href={`#/reader/${encodeURI(book.key)}`}>
    {book.key}
    <button on:click={handleOnBinClick}>
      <Bin width="1.5rem" height="1.5rem" />
    </button>
  </a>
</li>

<style>
  li {
    list-style: none;
    padding: 0.5rem;
    border: 2px solid black;
    margin-bottom: 1rem;
  }

  li:last-child {
    margin-bottom: 0;
  }

  li a {
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: space-between;
  }

  li a button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
</style>

