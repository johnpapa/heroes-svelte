<script>
  import CardContent from '../components/CardContent.svelte';

  const captains = console;

  export let heroes = [];
  function deleteHero(hero) {
    this.$emit('deleted', hero);
    captains.log(`You tried to delete ${hero.name}`);
  }
  function selectHero(hero) {
    captains.log(`You tried to select ${hero.name}`);
    this.$emit('selected', hero);
  }
</script>

<ul class="list">
  {#each heroes as { id, name, description }, i}
    <li role="presentation">
      <div class="card">
        <CardContent bind:name bind:description />
      </div>
    </li>
  {/each}
</ul>
