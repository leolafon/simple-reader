<script>
  import ePub from 'epubjs';
  import { getBook } from '../lib/books';
  import Header from './Header.svelte';

  export let params = {};

  function getSavedCfi(bookName) {
    return localStorage.getItem(bookName);
  }

  const savedCfi = getSavedCfi(params.bookName);
  console.log(savedCfi);
  const book = ePub();
  let rendition = null;

  function goNext(rendition) {
    rendition.next().then(() => saveCurrentLocation(rendition));
  }

  function goPrev(rendition) {
    rendition.prev().then(() => saveCurrentLocation(rendition));
  }

  async function saveCurrentLocation(rendition) {
    const location = await rendition.currentLocation();
    localStorage.setItem(params.bookName, location.start.cfi);
  }

  function handleOnKeyup(e) {
    if (!rendition) { return; }

    if ((e.keyCode || e.which) === 37) {
      goPrev(rendition);
    }

    if ((e.keyCode || e.which) === 39) {
      goNext(rendition);
    }
  }

  function handleOnClick(e, iframe) {
    const selection = iframe.window.getSelection();
    if (selection?.toString()) { return; }

    if (e.screenX > (document.body.clientWidth / 2)) {
      goNext(rendition);
    } else {
      goPrev(rendition);
    }
  }

  if (window.FileReader) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const bookData = event.target.result;
      book.open(bookData, 'binary');
      rendition = book.renderTo('viewer', {
        width: '100%',
        height: '90vh',
        spread: 'none',
      });
      rendition.on('rendered', (_, iframe) => {
        iframe.document.addEventListener('click', (e) => {
          handleOnClick(e, iframe);
        });
      })
      rendition.display(savedCfi ?? undefined);
    }

    getBook(params.bookName).then((book) => {
      reader.readAsArrayBuffer(book);
    });
  }
</script>

<svelte:document on:keyup={handleOnKeyup} />

{#await book.loaded.metadata}
  <p>loading</p>
{:then metadata}
  <Header title={metadata.title} author={metadata.creator} />
{/await}
<div id="viewer"></div>

<style>
  #viewer {
    max-width: 500px;
  }
</style>
