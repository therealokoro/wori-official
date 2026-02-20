<script setup>
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'en' },
})

const info = useAppConfig().info
const title = info.sitename
const description = info.description
const ogImageLink = info.ogImageLink

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogUrl: info.url,
  twitterTitle: title,
  ogImage: ogImageLink,
  ogDescription: description,
  twitterImage: ogImageLink,
  twitterDescription: description,
  twitterCard: 'summary_large_image',
  titleTemplate: s => s
    ? `${s} | Women Rights Initiative (WORI)`
    : 'Women Rights Initiative (WORI) Official Website'
})
</script>

<template>
  <UApp :toaster="{ position: 'top-center' }">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
