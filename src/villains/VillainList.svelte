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
  {#each villains as { id, name, description }, i (id)}
    <li role="presentation">
      <div class="card">
        <CardContent {name} {description} />
        <footer class="card-footer">
          <ButtonFooter
            {...deleteOptions}
            dataId={id}
            dataIndex={i}
            item={villains[i]}
            on:clicked={deleteVillain(villains[i])} />
          <ButtonFooter
            {...editOptions}
            dataId={id}
            dataIndex={i}
            item={villains[i]}
            on:clicked={selectVillain(villains[i])} />
        </footer>
      </div>
    </li>
  {/each}
</ul>
