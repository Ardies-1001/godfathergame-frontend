<template>
  <UApp :toaster="{ position: 'top-center', duration: 4000 }">
    <div class="min-h-dvh gfg-gradient">
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>
