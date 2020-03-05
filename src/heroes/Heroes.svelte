<script>
  import { onMount } from 'svelte';
  import { ListHeader, Modal } from '../components';
  import HeroList from './HeroList.svelte';
  import HeroDetail from './HeroDetail.svelte';
  import {
    state,
    getHeroesAction,
    deleteHeroAction,
    addHeroAction,
    updateHeroAction
  } from '../store';

  const { heroes } = state;

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
    }
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
    }
    clear();
  }

  async function getHeroes() {
    await getHeroesAction();
  }

  async function save({ detail: hero }) {
    console.log('hero changed', hero);
    if (hero.id) {
      const newHero = await updateHeroAction(hero);
    } else {
      const newHero = await addHeroAction(hero);
    }
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
    {#if $heroes}
      <div class="column is-8">
        {#if !selected}
          <HeroList
            heroes={$heroes}
            on:deleted={askToDelete}
            on:selected={select} />
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
