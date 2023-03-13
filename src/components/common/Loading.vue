<template>
  <div class='loader'>
    <div class='loader_overlay'></div>
    <div class='loader_cogs'>
      <div class='loader_cog__top'>
        <div class='loader_cog_part'></div>
        <div class='loader_cog_part'></div>
        <div class='loader_cog_part'></div>
        <div class='loader_cog_hole'></div>
      </div>
      <div class='loader_cog__left'>
        <div class='loader_cog_part'></div>
        <div class='loader_cog_part'></div>
        <div class='loader_cog_part'></div>
        <div class='loader_cog_hole'></div>
      </div>
      <div class='loader_cog__bottom'>
        <div class='loader_cog_part'></div>
        <div class='loader_cog_part'></div>
        <div class='loader_cog_part'></div>
        <div class='loader_cog_hole'></div>
      </div>
      <p>loading</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>