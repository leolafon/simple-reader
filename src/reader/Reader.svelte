<script>
  import ePub from 'epubjs';

  import { getBook } from '../lib/books';
  import Header from './Header.svelte';

  export let params = {};

  let currentLocation = null;

  function setLocation(location) {
    currentLocation = location;
  }

  function getSavedCfi(bookName) {
    return localStorage.getItem(bookName);
  }

  const savedCfi = getSavedCfi(params.bookName);
  const book = ePub();
  let rendition = null;

  function goNext(rendition) {
    rendition.next()
      .then(() => saveCurrentLocation(rendition))
      .then(setLocation);
  }

  function goPrev(rendition) {
    rendition.prev()
      .then(() => saveCurrentLocation(rendition))
      .then(setLocation);
  }

  async function saveCurrentLocation(rendition) {
    const location = await rendition.currentLocation();
    localStorage.setItem(params.bookName, location.start.cfi);
    return location;
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
    if (
      !selection?.isCollapsed
      && selection?.focusNode?.nodeType === Node.TEXT_NODE
    ) { return; }

    if (e.screenX > (iframe.document.body.clientWidth / 2)) {
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
      rendition.themes.register('dark', 'theme.css');
      rendition.themes.register('light', 'theme.css');
      rendition.themes.select('light');
      rendition.on('rendered', (_, iframe) => {
        iframe.document.addEventListener('click', (e) => {
          handleOnClick(e, iframe);
        });
      })
      rendition.display(savedCfi ?? undefined)
        .then(() => rendition.currentLocation())
        .then(setLocation);
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
  <Header title={metadata.title} author={metadata.creator} location={currentLocation} />
{/await}
<div id="viewer"></div>

<style>
  #viewer {
    max-width: 500px;
  }
</style>
