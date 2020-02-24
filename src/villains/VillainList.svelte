<script>
  import { createEventDispatcher } from 'svelte';
  import { ButtonFooter, CardContent } from '../components';

  const dispatch = createEventDispatcher();
  export let villains = [];

  function deleteVillain(villain) {
    dispatch('deleted', villain);
  }

  function selectVillain(villain) {
    dispatch('selected', villain);
  }
</script>

<ul class="list">
  {#each villains as villain, index (villain.id)}
    <li role="presentation">
      <div class="card">
        <CardContent name={villain.name} description={villain.description} />
        <footer class="card-footer">
          <ButtonFooter
            className="delete-item"
            iconClasses="fas fa-trash"
            label="Delete"
            dataId={villain.id}
            dataIndex={index}
            item={villain}
            on:clicked={deleteVillain(villain)} />
          <ButtonFooter
            className="edit-item"
            iconClasses="fas fa-edit"
            label="Edit"
            dataId={villain.id}
            dataIndex={index}
            item={villain}
            on:clicked={selectVillain(villain)} />
        </footer>
      </div>
    </li>
  {/each}
</ul>
