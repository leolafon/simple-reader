<script>
  import { createEventDispatcher } from 'svelte';

  import BookPlus from './BookPlus.svelte';

  const dispatch = createEventDispatcher();

  function handleOnChange(event) {
    dispatch('import-books', { files: event.target.files });
    event.target.value = '';
  }
</script>

<label>
  <BookPlus width="2rem" height="2rem" />
  <input
    id="book-input"
    type="file"
    accept=".epub"
    on:change={handleOnChange} />
</label>

<style>
  label {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    border-radius: 50%;
    border: 2px solid black;
    padding: 1.5rem;
  }

  label input[type=file] {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 0;
    font-size: 1px;
    opacity: 0;
  }
</style>
