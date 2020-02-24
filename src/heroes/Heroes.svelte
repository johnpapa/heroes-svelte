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
  } from '../shared';

  let heroes = [];
  let selected = undefined;
  let routePath = '/heroes';
  let title = 'Heroes';
  let heroToDelete = null;
  let message = '';
  let showModal = false;

  onMount(async () => await getHeroes());

  function enableAddMode() {
    selected = {};
  }

  function askToDelete({ detail: hero }) {
    heroToDelete = hero;
    showModal = true;
    if (heroToDelete.name) {
      message = `Would you like to delete ${heroToDelete.name}?`;
      console.log(message);
    }
    console.log(`asked to delete ${hero.name}`);
  }

  function clear() {
    selected = null;
  }

  function closeModal() {
    showModal = false;
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

  async function getHeroes() {
    heroes = (await getHeroesAction()) || [];
    console.log('getting heroes');
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

  function select({ detail: hero }) {
    selected = hero;
    console.log(`selected ${hero.name}`);
  }
</script>

<div class="content-container">
  <ListHeader
    {title}
    {routePath}
    on:add={enableAddMode}
    on:refresh={getHeroes} />
  <div class="columns is-multiline is-variable">
    {#if heroes}
      <div class="column is-8">
        {#if !selected}
          <HeroList {heroes} on:deleted={askToDelete} on:selected={select} />
        {:else}
          <HeroDetail hero={selected} on:unselect={clear} on:save={save} />
        {/if}
      </div>
    {/if}
  </div>

  <Modal
    {message}
    isOpen={showModal}
    on:handleNo={closeModal}
    on:handleYes={deleteHero} />
</div>
