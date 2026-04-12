<script lang="ts" setup>
// Props & share data
const props = defineProps<{
  title: string
  description?: string | null
}>()

const shareUrl = computed(() => encodeURIComponent(window.location.href))
const shareText = computed(() =>
  encodeURIComponent(
    props.description
      ? `${props.title} – ${props.description}`
      : props.title
  )
)

const buttons = ([
  {
    label: "Facebook",
    icon: "logos:facebook",
    action: () => {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl.value}&quote=${shareText.value}`
      window.open(url, "_blank", "noopener,noreferrer")
    }
  },
  {
    label: "Twitter",
    icon: "logos:twitter",
    action: () => {
      const url = `https://twitter.com/intent/tweet?url=${shareUrl.value}&text=${shareText.value}`
      window.open(url, "_blank", "noopener,noreferrer")
    }
  },
  {
    label: "Whatsapp",
    icon: "logos:whatsapp-icon",
    action: () => {
      const url = `https://api.whatsapp.com/send?text=${shareText.value}%20${shareUrl.value}`
      window.open(url, "_blank", "noopener,noreferrer")
    }
  },
  {
    label: "Copy Link",
    icon: "lucide:link",
    action: async () => {
      try {
        await navigator.clipboard.writeText(window.location.href)
        // $toast.info("Shareable Link copied to clipboard!")
      }
      catch (err) {
        console.error("Copy failed", err)
      }
    }
  }
])
</script>

<template>
  <div class="w-full flex items-center flex-wrap gap-2 my-5">
    <ui-text
      type="caption"
      class="font-semibold"
    >
      Share this Article:
    </ui-text>

    <button
      v-for="btn in buttons"
      class="flex-center gap-2 bg-transparent pr-2 hover:highlight-ring"
      @click="btn.action()"
    >
      <u-icon :name="btn.icon" />
      <ui-text type="caption">{{ btn.label }}</ui-text>
    </button>
  </div>
</template>