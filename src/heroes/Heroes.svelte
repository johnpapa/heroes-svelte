<script>
  import { onMount } from 'svelte';
  import ListHeader from '../components/ListHeader.svelte';
  import HeroList from './HeroList.svelte';
  import { getHeroesAction } from '../shared/hero-data';

  let heroes = [];
  let selected = {};

  let routePath = '/heroes';
  let title = 'Heroes';
  async function getHeroes() {
    heroes = await getHeroesAction();
    console.log('getting heroes');
  }
  function addHero() {
    console.log('add hero');
  }

  onMount(() => {
    getHeroes();
  });
</script>

<div class="content-container">
  <ListHeader
    bind:title
    bind:routePath
    on:add={addHero}
    on:refresh={getHeroes} />
  <div class="columns is-multiline is-variable">
    <div class="column is-8" v-if="heroes">
      <HeroList v-if="!selected" bind:heroes bind:selectedHero={selected} />
      <!--
         on:deleted="askToDelete($event)"
        on:selected="select($event)" />
      <HeroDetail
        v-if="selected"
        :hero="selected"
        @unselect="clear"
        @save="save" />
      -->
    </div>
  </div>

  <!-- <Modal
    class="modal-hero"
    :message="message"
    :isOpen="showModal"
    @handleNo="closeModal"
    @handleYes="deleteHero" /> -->
</div>
