<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui"
const { contacts, email, socialLinks, address } = useAppConfig().info

const state = reactive<Partial<CreateMessageType>>({ name: undefined, email: undefined, body: undefined })

const toast = useToast()
const { $orpc } = useNuxtApp()
const createMessage = useMutation($orpc.messages.send.mutationOptions())

async function onSubmit(event: FormSubmitEvent<CreateMessageType>) {
  createMessage.mutate(event.data, {
    onSuccess() {
      toast.add({ title: 'Your message was sent successfully', color: 'success' })
    },
    onError(e) {
      toast.add({ title: 'Something went wrong', description: e.message, color: 'error' })
    }
  })
}
</script>

<template>
  <Page title="Contact Us">
    <UPageSection title="Contact Us">
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        <UCard>
          <template #header>
            <ui-text type="heading" class="mb-2">
              We'd love to here from you today
            </ui-text>
            <ui-text type="small">
              Send us a message via e-mail <br /> and we'll try our possible best to respond to you as quick as possible
            </ui-text>
          </template>

          <div class="w-full space-y-4">
            <!-- Address -->
            <div class="list">
              <UIcon name="mingcute:location-3-line" />
              <ui-text type="small">
                {{ address }}
              </ui-text>
            </div>

            <!-- Phone Numbers -->
            <div class="list">
              <UIcon name="mingcute:phone-call-line" />
              <ui-text type="small">
                <a :href="`tel:${contacts[0]}`">{{ contacts[0] }}</a>,
                &nbsp;<a :href="`tel:${contacts[1]}`">{{ contacts[1] }}</a>,
                &nbsp;<a :href="`tel:${contacts[2]}`">{{ contacts[2] }}</a>
              </ui-text>
            </div>

            <!-- Email -->
            <div class="list">
              <UIcon name="mingcute:mail-send-line" />
              <ui-text type="small">
                <a :href="`mailto:${email}`">{{ email }}</a>
              </ui-text>
            </div>

            <!-- Social Links -->
            <div class="list">
              <UButton
                v-for="i in socialLinks"
                :to="i.to"
                square
                :icon="i.icon"
                :aria-label="i.label"
                color="neutral"
                variant="outline"
              />
            </div>
          </div>
        </UCard>

        <UCard>
          <UForm class="space-y-5" @submit="onSubmit" :schema="CreateMessageSchema" :state="state">
            <UFormField size="lg" label="Full Name" name="name">
              <UInput v-model="state.name" class="w-full" type="text" placeholder="Enter your full name here" />
            </UFormField>

            <UFormField size="lg" label="Email Address" name="email">
              <UInput v-model="state.email" class="w-full" type="email" placeholder="Enter your email address here" />
            </UFormField>

            <UFormField size="lg" label="Message" name="body">
              <UTextarea v-model="state.body" class="w-full" placeholder="Enter your message here" />
            </UFormField>

            <UButton type="submit" class="py-3" block>Send Message</UButton>
          </UForm>
        </UCard>
      </div>
    </UPageSection>
  </Page>
</template>

<style lang="css" scoped>
@reference "../assets/css/main.css";

.list{
  @apply w-full flex items-center gap-3;
}

.list a{
  @apply hover:underline text-primary;
}
</style>
