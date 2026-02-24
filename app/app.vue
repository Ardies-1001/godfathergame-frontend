<template>
  <UApp :toaster="{ position: 'top-center', duration: 4000 }">
    <div class="min-h-dvh gfg-gradient">
      <Analytics />
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
</script>
