<!-- components/ArticleCoverUpload.vue -->
<script lang="ts" setup>
const props = defineProps<{
  existingUrl?: string | null
}>()

const model = defineModel<File | undefined>()

const previewUrl = computed(() => {
  if (model.value)
    return URL.createObjectURL(model.value)
  if (props.existingUrl)
    return props.existingUrl
  return null
})
</script>

<template>
  <UFileUpload
    v-slot="{ open, removeFile }"
    v-model="model"
    accept="image/*"
    class="w-full"
  >
    <div class="flex gap-3 items-start">
      <div
        class="relative shrink-0 w-24 h-24 rounded-md overflow-hidden border border-default bg-elevated"
        :class="previewUrl ? '' : 'flex items-center justify-center'"
      >
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt="Cover preview"
          class="object-cover w-full h-full"
        >
        <UIcon v-else name="i-lucide-image" class="size-6 text-muted" />

        <UBadge
          v-if="model"
          label="New"
          color="success"
          variant="solid"
          size="xs"
          class="absolute top-1 left-1"
        />
      </div>

      <div class="flex flex-col gap-2 flex-1 min-w-0">
        <p class="text-sm text-muted truncate">
          {{ model ? model.name : (existingUrl ? 'Current cover image' : 'No image uploaded') }}
        </p>
        <div class="flex gap-2">
          <UButton
            :label="model ? 'Change' : (existingUrl ? 'Replace' : 'Upload')"
            icon="i-lucide-upload"
            color="neutral"
            variant="outline"
            size="sm"
            @click="open()"
          />
          <UButton
            v-if="model"
            label="Remove"
            icon="i-lucide-x"
            color="error"
            variant="ghost"
            size="sm"
            @click="removeFile()"
          />
        </div>
        <p class="text-xs text-muted">
          <template v-if="model">
            New image will replace the current one on save.
          </template>
          <template v-else-if="existingUrl">
            Upload a new image to replace the current one.
          </template>
          <template v-else>
            SVG, PNG, JPG or GIF. Max size: 2MB.
          </template>
        </p>
      </div>
    </div>
  </UFileUpload>
</template>
