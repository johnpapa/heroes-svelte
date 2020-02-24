<script>
  import { onMount } from 'svelte';
  import { ListHeader, Modal } from '../components';
  import HeroList from './HeroList.svelte';
  import HeroDetail from './HeroDetail.svelte';
  import {
    getHeroesAction,
    deleteHeroAction,
    addHeroAction,
    updateHeroAction
  } from '../shared/hero-data';

  let heroes = [];
  let selected = undefined;
  let routePath = '/heroes';
  let title = 'Heroes';
  let heroToDelete = null;
  let message = '';
  let showModal = false;

  async function getHeroes() {
    heroes = (await getHeroesAction()) || [];
    console.log('getting heroes');
  }
  function enableAddMode() {
    selected = {};
  }
  function select(event) {
    let hero = event.detail;
    selected = hero;
    console.log(`selected ${hero.name}`);
  }
  function askToDelete(event) {
    let hero = event.detail;

    heroToDelete = hero;
    showModal = true;
    if (heroToDelete.name) {
      message = `Would you like to delete ${heroToDelete.name}?`;
      console.log(message);
    }

    console.log(`asked to delete ${hero.name}`);
  }

  async function deleteHero() {
    closeModal();
    if (heroToDelete) {
      console.log(`You said you want to delete ${heroToDelete.name}`);
      await deleteHeroAction(heroToDelete);
      await getHeroes();
    }
    clear();
  }

  async function save({ detail: hero }) {
    console.log('hero changed', hero);
    if (hero.id) {
      await updateHeroAction(hero);
    } else {
      await addHeroAction(hero);
    }
    await getHeroes();
  }

  function closeModal() {
    showModal = false;
  }

  function clear() {
    selected = null;
  }

  onMount(async () => await getHeroes());
</script>

<div class="content-container">
  <ListHeader
    bind:title
    bind:routePath
    on:add={enableAddMode}
    on:refresh={getHeroes} />
  <div class="columns is-multiline is-variable">
    {#if heroes}
      <div class="column is-8">
        {#if !selected}
          <HeroList bind:heroes on:deleted={askToDelete} on:selected={select} />
        {:else}
          <HeroDetail bind:hero={selected} on:unselect={clear} on:save={save} />
        {/if}
      </div>
    {/if}
  </div>

  <Modal
    bind:message
    bind:isOpen={showModal}
    on:handleNo={closeModal}
    on:handleYes={deleteHero} />
</div>
