<script lang="ts" setup>
import type { TimelineItem } from '@nuxt/ui'

const timeline = ref<TimelineItem[]>([
  {
    icon: "i-lucide-check-circle",
    title: "The Idea - The Inception",
    date: "2010",
    description: "Women Rights Initiative (WORI) is born from a growing awareness of gender inequality and the need for a dedicated platform to advocate for women's rights children with disability, vulnerable, sickle cell patients, sexual Reproductive awareness. Community leaders, activists, and concerned citizens begin discussions on creating an organization focused on women's empowerment and advocacy."
  },
  {
    icon: "i-lucide-check-circle",
    title: "The Founding Process",
    date: "2011 - 2018",
    description: "WORI's early development involved a collaborative process where like-minded individuals refined the organization's vision and mission, formed a diverse core team, engaged in strategic planning, and initiated funding efforts through outreach to local businesses, philanthropic organizations, and community members."
  },
  {
    icon: "i-lucide-check-circle",
    title: "Incorporation - A Major Milestone",
    date: "2019",
    description: "WORI marked a significant milestone with its official incorporation as a non-profit organization. This achievement recognized WORI's legitimacy and credibility, paving the way for expanded reach, deeper impact, and advancement of its mission to empower women and promote social justice."
  },
  {
    icon: "i-lucide-check-circle",
    title: "Establishment of Programs - Addressing Critical Needs",
    date: "2020",
    description: "WORI developed its initial programs and initiatives, targeting pressing issues such as girl child education, Sexual Reproductive Health Rights (SRHR), sickle cell advocacy, and Gender-Based Violence (GBV). Additionally, the organization provided trainings and support services for women and children in the community, aiming to promote holistic well-being, empowerment, and social change."
  },
  {
    icon: "i-lucide-check-circle",
    title: "Partnership Development - Expanding Reach and Impact",
    date: "2021",
    description: "WORI initiated partnership development efforts, collaborating with like-minded organizations, NGOs, and government agencies to amplify its impact and advance its mission. These strategic partnerships enabled WORI to leverage resources, expertise, and networks, ultimately enhancing its ability to empower women and marginalized communities."
  },
  {
    icon: "i-lucide-check-circle",
    title: "Empowering Women through Skills Acquisition",
    date: "2022 - 2023",
    description: "WORI successfully trained over 1000 women in valuable skills acquisition programs across various communities, including Gulumbe, Dabai, Nayalwa, Birnin Kebbi, and others. This initiative aimed to equip women with the knowledge and skills necessary to achieve economic independence, self-sufficiency, and improved livelihoods."
  }
])
</script>

<template>
  <Page title="Our History">
    <UPageSection title="About WORI - The History">
      <UTimeline
        :items="timeline"
        size="xl"
        :ui="{ title: 'text-lg', description: 'text-base', date: 'text-sm text-primary' }"
      />
    </UPageSection>
  </Page>
</template>
