<script>
  import Router from 'svelte-spa-router';

  import Home from './home/Home.svelte';
  import Reader from './reader/Reader.svelte';

  const routes = {
    '/': Home,
    '/reader/:bookName': Reader,
  };
</script>

<main>
  <Router {routes} />
</main>
