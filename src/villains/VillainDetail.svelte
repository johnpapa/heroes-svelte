<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { ButtonFooter } from '../components';

  const dispatch = createEventDispatcher();
  export let villain = {};
  let addMode = false;
  let editingVillain = { ...villain };

  onMount(() => watchVillain());

  function clear() {
    dispatch('unselect');
  }

  function saveVillain() {
    dispatch('save', editingVillain);
    clear();
  }

  function watchVillain() {
    if (villain && villain.id) {
      editingVillain = { ...villain };
      addMode = false;
    } else {
      editingVillain = { id: undefined, name: '', description: '' };
      addMode = true;
    }
  }

  const cancelOptions = {
    className: 'card-footer-item cancel-button',
    label: 'Cancel',
    iconClasses: 'fas fa-undo'
  };

  const saveOptions = {
    className: 'card-footer-item save-button',
    label: 'Save',
    iconClasses: 'fas fa-save'
  };
</script>

<div class="card edit-detail">
  <header class="card-header">
    <p class="card-header-title">{editingVillain.name}</p>
  </header>
  <div class="card-content">
    <div class="content">
      {#if editingVillain.id}
        <div class="field">
          <label class="label" for="id">id</label>
          <input
            class="input"
            name="id"
            placeholder="e.g. VillainColleen"
            readonly
            type="text"
            bind:value={editingVillain.id} />
        </div>
      {/if}
      <div class="field">
        <label class="label" for="name">name</label>
        <input
          class="input"
          name="name"
          placeholder="e.g. Colleen"
          type="text"
          bind:value={editingVillain.name} />
      </div>
      <div class="field">
        <label class="label" for="description">description</label>
        <input
          class="input"
          name="description"
          placeholder="dance fight!"
          type="text"
          bind:value={editingVillain.description} />
      </div>
    </div>
  </div>

  <footer class="card-footer">
    <ButtonFooter {...cancelOptions} item={editingVillain} on:clicked={clear} />
    <ButtonFooter
      {...saveOptions}
      item={editingVillain}
      on:clicked={saveVillain} />
  </footer>
</div>
