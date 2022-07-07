<template>
  <div class="album">
    <router-view v-slot="{Component, route}">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <component :is="Component || AlbumContent" :key="route.path"></component>
            <template #fallback>
              <LoadPage/>
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </router-view>
  </div>
</template>

<script setup>
import AlbumContent from "@/components/details/album/AlbumContent.vue";
//
</script>
