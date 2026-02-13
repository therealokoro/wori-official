<script lang="ts" setup>
const { $orpc } = useNuxtApp()
const { data, status } = useQuery($orpc.healthCheck.queryOptions())
</script>

<template>
  <Page no-header title="Manage Articles">
    <h1>Articles</h1>

    <pre>
      data: {{ data }}
      status: {{ status }}
    </pre>
  </Page>
</template>
