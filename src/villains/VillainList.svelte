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
  {#each villains as villain, index (villain.id)}
    <li role="presentation">
      <div class="card">
        <CardContent name={villain.name} description={villain.description} />
        <footer class="card-footer">
          <ButtonFooter
            {...deleteOptions}
            dataId={villain.id}
            dataIndex={index}
            item={villain}
            on:clicked={deleteVillain(villain)} />
          <ButtonFooter
            {...editOptions}
            dataId={villain.id}
            dataIndex={index}
            item={villain}
            on:clicked={selectVillain(villain)} />
        </footer>
      </div>
    </li>
  {/each}
</ul>
