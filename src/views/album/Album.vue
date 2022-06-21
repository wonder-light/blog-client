<template>
  <div class="album">
    <router-view v-slot="{Component}">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive>
            <Suspense>
              <component :is="Component"></component>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
      <template v-else>
        <Suspense>
          <AlbumContent/>
        </Suspense>
      </template>
    </router-view>
  </div>
</template>

<script setup>
import AlbumContent from "@/components/details/album/AlbumContent.vue";</script>
