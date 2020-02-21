<script>
  import { Router, Link, Route } from "svelte-routing";
  import Heroes from "./heroes/Heroes.svelte";
  import Villains from "./Villains.svelte";
  import HeaderBar from "./components/HeaderBar.svelte";
  import NavBar from "./components/NavBar.svelte";

  export let url = "";
</script>

<!-- <style src="./styles.scss">

</style> -->

<HeaderBar />
<div class="section columns">
  <main class="column">
    <Router {url}>
      <NavBar />
      <div>
        <Route path="/villains" component={Villains} />
        <Route path="/heroes" component={Heroes} />
        <Route path="/" component={Heroes} />
      </div>
    </Router>
  </main>
</div>
