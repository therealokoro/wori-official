// @unocss-include
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      neutral: 'slate'
    }
  },
  navigation: [
    { label: 'Home', to: '/' },
    { label: 'Articles', to: '/articles' },
    { label: 'Our Services', to: '/services' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contacts', to: '/contact-us' },
    {
      label: 'About Us',
      to: '/about/overview',
      children: [
        { label: 'WORI Overview', to: '/about/overview' },
        { label: 'Our History', to: '/about/history' },
        { label: 'Meet the Team', to: '/about/team' }
      ]
    }
  ],
  info: {
    sitename: 'Women Right Initiative',
    url: 'https://womenrightsinitiative.org',
    description: 'The official website of Women Rights Initiative (WORI)',
    ogImageLink: '/wori-og-image.webp',
    contacts: ['+234 803 549 9541', '+234 703 330 7354', '+234 805 238 6516'],
    address: 'Sokoto Road, GRA Birnin Kebbi, Kebbi State',
    email: 'info@woringieria.org',
    socialLinks: [
      { label: 'Twitter', to: '/#', icon: 'tabler:brand-x' },
      { label: 'Facebook', to: '/#', icon: 'tabler:brand-facebook' },
      { label: 'Instagram', to: '/#', icon: 'tabler:brand-instagram' }
    ]
  }
})
