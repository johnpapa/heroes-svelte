<script>
  import { onMount } from 'svelte';
  import { ListHeader, Modal } from '../components';
  import VillainList from './VillainList.svelte';
  import VillainDetail from './VillainDetail.svelte';
  import {
    state,
    getVillainsAction,
    deleteVillainAction,
    addVillainAction,
    updateVillainAction
  } from '../store';

  const { villains } = state;

  let selected = undefined;
  let routePath = '/villains';
  let title = 'Villains';
  let villainToDelete = null;
  let message = '';
  let showModal = false;

  onMount(async () => await getVillains());

  function enableAddMode() {
    selected = {};
  }

  function askToDelete({ detail: villain }) {
    villainToDelete = villain;
    showModal = true;
    if (villainToDelete.name) {
      message = `Would you like to delete ${villainToDelete.name}?`;
    }
  }

  function clear() {
    selected = null;
  }

  function closeModal() {
    showModal = false;
  }

  async function deleteVillain() {
    closeModal();
    if (villainToDelete) {
      console.log(`You said you want to delete ${villainToDelete.name}`);
      await deleteVillainAction(villainToDelete);
    }
    clear();
  }

  async function getVillains() {
    await getVillainsAction();
  }

  async function save({ detail: villain }) {
    console.log('villain changed', villain);
    if (villain.id) {
      await updateVillainAction(villain);
    } else {
      await addVillainAction(villain);
    }
  }

  function select({ detail: villain }) {
    selected = villain;
    console.log(`selected ${villain.name}`);
  }
</script>

<div class="content-container">
  <ListHeader
    {title}
    {routePath}
    on:add={enableAddMode}
    on:refresh={getVillains} />
  <div class="columns is-multiline is-variable">
    {#if $villains}
      <div class="column is-8">
        {#if !selected}
          <VillainList
            villains={$villains}
            on:deleted={askToDelete}
            on:selected={select} />
        {:else}
          <VillainDetail
            villain={selected}
            on:unselect={clear}
            on:save={save} />
        {/if}
      </div>
    {/if}
  </div>

  <Modal
    {message}
    isOpen={showModal}
    on:handleNo={closeModal}
    on:handleYes={deleteVillain} />
</div>
