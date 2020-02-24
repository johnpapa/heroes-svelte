<script>
  import './styles.scss';
  import { Router, Link, Route } from 'svelte-routing';
  import Heroes from './heroes/Heroes.svelte';
  import Villains from './Villains.svelte';

  import { HeaderBar, NavBar, PageNotFound } from './components';

  export let url = '';
</script>

<HeaderBar />
<div class="section columns">
  <Router {url}>
    <NavBar />
    <main class="column">
      <div>
        <Route path="/" component={Heroes} />
        <Route path="/heroes" component={Heroes} />
        <Route path="/villains" component={Villains} />
        <Route path="**" component={PageNotFound} />
      </div>
    </main>
  </Router>
</div>
