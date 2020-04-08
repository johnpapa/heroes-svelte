<script>
  import { Router, Link, Route } from 'svelte-routing';
  import { getContext } from 'svelte';

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;
    return isActive ? { class: 'router-link-active' } : {};
  }
</script>

<nav class="column is-2 menu">
  <p class="menu-label">Menu</p>
  <ul class="menu-list">
    <Link to="/heroes" {getProps}>Heroes</Link>
    <Link to="/villains" {getProps}>Villains</Link>
    <Link to="/about" {getProps}>About</Link>
  </ul>
</nav>
