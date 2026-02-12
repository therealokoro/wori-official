<script lang="ts" setup>
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

definePageMeta({ layout: 'plain' })

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  }
]

const schema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string('A password is required').min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  // console.log('Submitted', payload)
}
</script>

<template>
  <Page title="Administrative Login">
    <div class="flex flex-col items-center justify-center gap-4">
      <PageLogo />
      <UPageCard class="w-full max-w-md">
        <UAuthForm
          :schema="schema"
          :fields="fields"
          title="Welcome back!"
          description="Enter your login credentials to continue"
          icon="i-lucide-lock"
          @submit="onSubmit"
        >
          <template #submit>
            <UButton type="submit" label="Click to Proceed" block class="py-3" />
          </template>
        </UAuthForm>
      </UPageCard>
    </div>
  </Page>
</template>
