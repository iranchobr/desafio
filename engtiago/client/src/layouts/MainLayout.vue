<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-green-8" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <q-icon name="fas fa-hat-cowboy" /> Meu Rancho
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="220"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-green-8 text-white"
    >
      <q-list bordered separator>
        <q-item>
          <q-item-section>
            Menu
          </q-item-section>
        </q-item>

        <q-item
          exact
          :to="item.link"
          v-for="item in menu"
          :key="item.name"
          clickable
          v-ripple
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            {{ item.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  components: {},
  data () {
    return {
      leftDrawerOpen: false,
      menu: [
        {
          icon: 'fas fa-stream',
          name: 'Dashboard',
          desc: 'Dashboard',
          link: '/'
        },
        {
          icon: 'fas fa-users',
          name: 'Pessoas',
          desc: 'Entrar na entidade pessoas.',
          link: '/pessoas'
        },
        {
          icon: 'fas fa-paw',
          name: 'Animais',
          desc: 'Entrar na entidade animais.',
          link: '/animais'
        },
        {
          icon: 'fas fa-boxes',
          name: 'Lotes',
          desc: 'Entrar na entidade Lotes.',
          link: '/lotes'
        }
      ]
    }
  }
}
</script>
<style>
.my-menu-link {
  color: white;
  background: #1b5e20 !important;
}
</style>
