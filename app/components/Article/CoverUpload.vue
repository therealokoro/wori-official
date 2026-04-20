<!-- components/ArticleCoverUpload.vue -->
<script lang="ts" setup>
const props = defineProps<{
  existingUrl?: string | null
}>()

const model = defineModel<File | string | undefined>()

// If model is a File, generate an object URL; if it's a string, it's the
// existing filename already stored — fall back to existingUrl for the preview.
const previewUrl = computed(() => {
  if (model.value instanceof File)
    return URL.createObjectURL(model.value)
  if (props.existingUrl)
    return props.existingUrl
  return null
})

// Only show the "New" badge when the user has actually picked a fresh file
const hasNewFile = computed(() => model.value instanceof File)

// The file-upload component works with File objects; wire it separately so
// picking a new file updates the model, while the string value is preserved
// when nothing is picked.
const fileModel = computed({
  get: () => (model.value instanceof File ? model.value : undefined),
  set: (val) => { model.value = val ?? (typeof model.value === 'string' ? model.value : undefined) },
})

function removeFile() {
  // Reset to the existing filename string so validation still passes
  model.value = typeof model.value === 'string' ? model.value : undefined
}
</script>

<template>
  <UFileUpload
    v-slot="{ open }"
    v-model="fileModel"
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
          v-if="hasNewFile"
          label="New"
          color="success"
          variant="solid"
          size="xs"
          class="absolute top-1 left-1"
        />
      </div>

      <div class="flex flex-col gap-2 flex-1 min-w-0">
        <p class="text-sm text-muted truncate">
          {{ hasNewFile ? (model as File).name : (existingUrl ? 'Current cover image' : 'No image uploaded') }}
        </p>
        <div class="flex gap-2">
          <UButton
            :label="hasNewFile ? 'Change' : (existingUrl ? 'Replace' : 'Upload')"
            icon="i-lucide-upload"
            color="neutral"
            variant="outline"
            size="sm"
            @click="open()"
          />
          <UButton
            v-if="hasNewFile"
            label="Remove"
            icon="i-lucide-x"
            color="error"
            variant="ghost"
            size="sm"
            @click="removeFile()"
          />
        </div>
        <p class="text-xs text-muted">
          <template v-if="hasNewFile">
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