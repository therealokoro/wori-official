<script setup lang="ts">
import type { NuxtError } from "#app"

const { error } = defineProps<{ error: NuxtError<any> | Error }>()

const title = computed(() => (error as NuxtError).statusText ?? "An error occurred")
const message = computed(() => {
  const nuxtError = error as NuxtError<any>
  return nuxtError.data?.message ?? error.message ?? "Something went wrong. Let's get you back on track."
})

useSeoMeta({ title: title.value })
</script>

<template>
  <div class="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="size-12 text-destructive"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 9v4M12 17h.01" />
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>

    <div class="space-y-1">
      <h1 class="text-xl font-bold text-foreground">{{ title }}</h1>
      <p class="text-sm text-muted-foreground">{{ message }}</p>
    </div>

    <button
      class="mt-2 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors cursor-pointer"
      @click="$router.go(-1)"
    >
      Go back
    </button>
  </div>
</template>