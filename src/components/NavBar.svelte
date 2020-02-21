<script>
  import { Router, Link, Route } from "svelte-routing";
</script>

<nav class="column is-2 menu">
  <p class="menu-label">Menu</p>
  <ul class="menu-list">
    <Link to="/heroes">Heroes</Link>
    <Link to="/villains">Villains</Link>
    <Link to="/about">About</Link>
  </ul>
</nav>
