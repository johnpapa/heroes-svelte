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
  {#each heroes as hero, index (hero.id)}
    <li role="presentation">
      <div class="card">
        <CardContent name={hero.name} description={hero.description} />
        <footer class="card-footer">
          <ButtonFooter
            {...deleteOptions}
            dataId={hero.id}
            dataIndex={index}
            item={hero}
            on:clicked={deleteHero(hero)} />
          <ButtonFooter
            {...editOptions}
            dataId={hero.id}
            dataIndex={index}
            item={hero}
            on:clicked={selectHero(hero)} />
        </footer>
      </div>
    </li>
  {/each}
</ul>
