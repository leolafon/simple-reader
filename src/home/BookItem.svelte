<script>
  export let book;
</script>

<li>
  <a href={`#/reader/${encodeURI(book.key)}`}>
    {book.key}
  </a>
</li>

<style>
  li {
    list-style: none;
    padding: 0.5rem;
    border: 1px solid black;
    margin-bottom: 1rem;
  }

  li:last-child {
    margin-bottom: 0;
  }

  li a {
    text-decoration: none;
    color: inherit;
  }
</style>

