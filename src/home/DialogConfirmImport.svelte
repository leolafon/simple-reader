<script>
  import { createEventDispatcher } from 'svelte';

  export let files = [];
  export function showModal() {
    dialogRef.showModal(); 
  }
  export function close() {
    dialogRef.close();
  }

  let dialogRef;

  const dispatch = createEventDispatcher();

  function handleOnCancel() {
    dispatch('cancel-import');
  }

  function handleOnConfirm() {
    dispatch('confirm-import');
  }
</script>

<dialog bind:this={dialogRef}>
  <span>Import these books ?</span>
  <ul>
    {#each files as file}
      <li>{file.name}</li>
    {/each} 
  </ul>
  <div class="actions">
    <button on:click={handleOnCancel}>
      Cancel
    </button>
    <button on:click={handleOnConfirm}>
      Yes
    </button>
  </div>
</dialog>

<style>
  dialog {
    margin: auto 1rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  button {
    padding: 0.5rem 1rem;
  }

  button:first-child {
    margin-right: 1rem;
  }
</style>
