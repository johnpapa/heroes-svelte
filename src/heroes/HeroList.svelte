<script>
  import { createEventDispatcher } from 'svelte';
  import { ButtonFooter, CardContent } from '../components';

  const dispatch = createEventDispatcher();
  export let heroes = [];

  function deleteHero(hero) {
    dispatch('deleted', hero);
  }

  function selectHero(hero) {
    dispatch('selected', hero);
  }

  const deleteOptions = {
    className: 'delete-item',
    label: 'Delete',
    iconClasses: 'fas fa-trash'
  };

  const editOptions = {
    className: 'edit-item',
    label: 'Edit',
    iconClasses: 'fas fa-edit'
  };
</script>

<ul class="list">
  {#each Object.entries(heroes) as [hero, { id, name, description }], index (id)}
    <li role="presentation">
      <div class="card">
        <CardContent {name} {description} />
        <footer class="card-footer">
          <ButtonFooter
            {...deleteOptions}
            dataId={id}
            dataIndex={index}
            item={hero}
            on:clicked={deleteHero(hero)} />
          <ButtonFooter
            {...editOptions}
            dataId={id}
            dataIndex={index}
            item={hero}
            on:clicked={selectHero(hero)} />
        </footer>
      </div>
    </li>
  {/each}
</ul>
