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
</script>

<ul class="list">
  {#each heroes as hero, index (hero.id)}
    <li role="presentation">
      <div class="card">
        <CardContent name={hero.name} description={hero.description} />
        <footer class="card-footer">
          <ButtonFooter
            className="delete-item"
            iconClasses="fas fa-trash"
            label="Delete"
            dataId={hero.id}
            dataIndex={index}
            item={hero}
            on:clicked={deleteHero(hero)} />
          <ButtonFooter
            className="edit-item"
            iconClasses="fas fa-edit"
            label="Edit"
            dataId={hero.id}
            dataIndex={index}
            item={hero}
            on:clicked={selectHero(hero)} />
        </footer>
      </div>
    </li>
  {:else}
    <p>No tasks today!</p>
  {/each}
</ul>
