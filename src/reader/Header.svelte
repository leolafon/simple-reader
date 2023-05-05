<script>
  export let title;
  export let author;
  export let location;

  function renderLocation(location) {
    if (!location) { return ''; };

    const chapter = location.start.index - 2;
    const { page, total } = location.start.displayed;
    return `${page}/${total} (${chapter})`;
  }
</script>

<header>
  <span>{title} - {author}</span>
  <span>{renderLocation(location)}</span>
</header>

<style>
  header {
    font-size: 0.5em;
    display: flex;
    justify-content: space-between;
  }
</style>
