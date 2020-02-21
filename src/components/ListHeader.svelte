<script>
  import { Link } from "svelte-routing";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let title = "";
  export let routePath = "";
  export function add() {
    console.log("add a hero");
    dispatch("add");
  }
  // export function refresh() {
  // dispatch("refresh");
  // }
</script>

<div class="content-title-group">
  <Link bind:to={routePath}>
    <h2 class="title">{title}</h2>
  </Link>
  <button class="button add-button" on:click={() => add()} aria-label="add">
    <i class="fas fa-plus" aria-hidden="true" />
    Add
  </button>
  <button
    class="button refresh-button"
    on:click={() => dispatch('refresh')}
    aria-label="refresh">
    <i class="fas fa-sync" aria-hidden="true" />
    Refresh
  </button>
</div>
