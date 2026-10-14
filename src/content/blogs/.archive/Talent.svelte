<script>
  let talented = $state(true);
</script>

<button onclick={(talented = !talented)}>Toggle</button>
<br />

You are {talented ? "" : "not"} talented.
{#if talented}
  Now you need hard work!
{:else}
  You need work even harder!
{/if}

<style>
  button {
    color: white;
    background: #012169;
  }
</style>
