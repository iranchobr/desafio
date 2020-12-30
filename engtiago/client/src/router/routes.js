const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/pessoas', component: () => import('pages/Pessoas.vue') },
      { path: '/animais', component: () => import('pages/Animais.vue') },
      { path: '/lotes', component: () => import('pages/Lotes.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
