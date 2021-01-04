<template>
  <q-page padding>
    <div class="row">
      <div v-for="item in menu" :key="item.name" class="col-6 q-pa-sm">
        <q-card
          @click="$router.push({ path: item.link })"
          class="cursor-pointer"
        >
          <q-card-section horizontal>
            <q-card-section class="flex items-center">
              <q-icon
                :name="item.icon"
                class="q-mx-md"
                size="xl"
                color="green-10"
              />
            </q-card-section>

            <q-separator vertical />

            <q-card-section>
              <span class="text-h5 text-bold text-green-10">{{
                item.name
              }}</span>
              <p class=" text-green-10">
                {{ item.desc }}
              </p>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 q-pr-sm"></div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      menu: [
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
