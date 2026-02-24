<script lang="ts" setup>
const { contacts, email, socialLinks, address } = useAppConfig().info
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
          <UForm>
            <UFormField size="xl" class="mb-5" label="Full Name">
              <UInput class="w-full" type="text" name="name" placeholder="Enter your full name here" />
            </UFormField>

            <UFormField size="xl" class="mb-5" label="Email Address">
              <UInput class="w-full" type="email" name="email" placeholder="Enter your email address here" />
            </UFormField>

            <UFormField size="xl" class="mb-5" label="Message">
              <UTextarea class="w-full" name="message" placeholder="Enter your message here" />
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
