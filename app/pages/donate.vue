<script lang="ts" setup>
import type { PageFeatureProps } from '@nuxt/ui'

const title = 'Donate'
const description = 'Your generosity fuels our mission to empower women, protect children, and build stronger communities across Nigeria.'

const impact = ref<PageFeatureProps[]>([
  {
    icon: 'i-lucide-graduation-cap',
    title: 'Girl child education',
    description: 'Every donation helps keep a girl in school and opens doors to a future she deserves.',
  },
  {
    icon: 'i-lucide-heart-handshake',
    title: 'Gender-based violence support',
    description: 'We provide safe spaces, counseling, and legal support to survivors of GBV.',
  },
  {
    icon: 'i-lucide-activity',
    title: 'Sickle cell advocacy',
    description: 'We raise awareness and connect patients with care, so no one faces sickle cell alone.',
  },
  {
    icon: 'i-lucide-shield',
    title: 'Sexual & reproductive health',
    description: 'We educate and empower women and girls with the knowledge to make informed health decisions.',
  },
  {
    icon: 'i-lucide-briefcase',
    title: 'Skills acquisition',
    description: 'We train women in marketable skills to achieve financial independence and self-sufficiency.',
  },
  {
    icon: 'i-lucide-users',
    title: 'Community outreach',
    description: 'From Gulumbe to Birnin Kebbi, we show up where we are needed most.',
  },
])

const bankAccounts = [
  {
    bank: 'Fidelity Bank of Nigeria (WORI)',
    accountName: 'Women Rights Initiative',
    accountNumber: '4110134290',
  },
  {
    bank: 'Fidelity Bank of Nigeria (WORI)',
    accountName: 'Women Rights Initiative',
    accountNumber: '4110134290',
  },
]

const contacts = [
  { label: 'General enquiries', phone: '+234 803 549 9541' },
  { label: 'Donation support', phone: '+234 803 549 9541' },
]
</script>

<template>
  <Page :title :description>
    <!-- Impact section -->
    <UPageSection
      headline="Make a difference"
      title="Every naira makes an impact"
      description="When you donate to WORI, you are directly funding programmes that change lives on the ground across Nigeria."
      :features="impact"
    />

    <!-- How to donate -->
    <UPageSection
      id="how-to-donate"
      headline="How to donate"
      title="Simple ways to give"
      description="You can support our work through a direct bank transfer or by reaching out to our team. We appreciate every contribution, no matter the size."
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Bank accounts -->
        <UPageCard
          v-for="account in bankAccounts"
          :key="account.accountNumber"
          :title="account.bank"
          icon="i-lucide-landmark"
          variant="soft"
          spotlight
          spotlight-color="primary"
        >
          <template #description>
            <div class="space-y-1 mt-1">
              <p class="text-muted">
                <span class="font-medium text-foreground">Account name: </span>
                {{ account.accountName }}
              </p>
              <p class="text-muted">
                <span class="font-medium text-foreground">Account number: </span>
                <span class="font-mono tracking-wider">{{ account.accountNumber }}</span>
              </p>
            </div>
          </template>
        </UPageCard>
      </div>

      <!-- Contact for donation -->
      <div class="mt-8">
        <ui-text type="title" class="uppercase tracking-wide text-center mb-3">Prefer to call us?</ui-text>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UPageCard
            v-for="contact in contacts"
            :key="contact.phone"
            :title="contact.label"
            :description="contact.phone"
            icon="i-lucide-phone"
            variant="outline"
            :to="`tel:${contact.phone.replace(/\s/g, '')}`"
            :ui="{ description: 'font-mono tracking-wide text-primary' }"
          />
        </div>
      </div>

      <!-- Note -->
      <UAlert
        class="mt-8"
        icon="i-lucide-info"
        color="info"
        variant="soft"
        title="Need a receipt?"
        description="After making your transfer, please send your payment confirmation to our email or call us directly. We will issue an official donation receipt within 48 hours."
      />
    </UPageSection>
  </Page>
</template>