export default {
  data() {
    return {
      title: 'Animal',
      perPage: 5,
      currentPage: 1,
      selected: null,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      messageAlert: '',
      variantAlert: 'success',
      animal: {
        fk_id_people: null,
        id_fazenda: null,
        no_animal: '',
        no_raca: '',
        sexo: null,
        vr_peso: null,
        dt_nascimento: null
      },
      fields: [
        {
          label: 'Nome',
          key: 'no_animal',
          sortable: true
        },
        {
          label: 'Raça',
          key: 'no_raca',
          sortable: true
        },
        {
          label: 'Peso',
          key: 'vr_peso',
          sortable: true
        },
        {
          label: 'Sexo',
          key: 'sexo',
          sortable: true,
        },
        {
          label: 'Proprietário',
          key: 'people',
          sortable: true,
        },
        {
          label: 'Fazenda Id',
          key: 'id_fazenda',
          sortable: true,
        },
        {
          label: 'Data de Nascimento',
          key: 'dt_nascimento',
          sortable: true,
        },
        {
          label: 'Ações',
          key: 'items',
          sortable: false
        }
      ],
      items: [],
      people: []
    }
  },
  methods: {
    remove(id) {
      this.$swal({
        title: "Atenção!",
        text: "Você realmente deseja remover este animal?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#97101d",
        cancelButtonColor: "#7d7979",
        confirmButtonText: "Sim, remover!",
        cancelButtonText: "Cancelar",
      }).then(answer => {
        if (answer.isConfirmed) {
          this.$http.delete(`/animal/${id}`).then(result => {
            this.items = this.items.filter(i => i.id != id)
            this.messageAlert = result.data.message;
            this.showAlert()
          }).catch(() => {
            this.messageAlert = 'Não foi possível remover o animal, tente mais tarde.'
            this.variantAlert = 'danger'
            this.showAlert()
          })
        }
      })
    },
    edit(id) {
      this.$http.get(`/animal/${id}`).then(result => {
        this.animal = result.data.animal
        this.$bvModal.show('modal-animal')
      }).catch(() => {
        this.messageAlert = 'Não foi possível buscar o animal, tente mais tarde.'
        this.variantAlert = 'danger'
        this.showAlert()
      })
    },
    save() {
      if (!this.animal.id) {
        this.$http.post('/animal', this.animal).then(result => {
          this.messageAlert = result.data.message;
          this.showAlert();
          this.list()
        }).catch(() => {
          this.messageAlert = 'Não foi possível cadastrar o animal, tente mais tarde.'
          this.variantAlert = 'danger'
          this.showAlert()
        })
      } else {
        this.$http.put(`/animal/${this.animal.id}`, this.animal).then(result => {
          this.messageAlert = result.data.message;
          this.showAlert();
          this.list()
        }).catch(() => {
          this.messageAlert = 'Não foi possível atualizar o animal, tente mais tarde.'
          this.variantAlert = 'danger'
          this.showAlert()
        })
      }
    },
    list() {
      this.$http.get('/animal').then(result => {
        this.items = result.data
        console.log(result)
      }).catch(() => {
        this.messageAlert = 'Não foi possível buscar os animais, tente mais tarde.'
        this.variantAlert = 'danger'
        this.showAlert()
      })
    },
    listPeople() {
      this.$http.get('/people').then(result => {
        this.people = result.data
      }).catch(() => {
        this.messageAlert = 'Não foi possível buscar as pessoas, tente mais tarde.'
        this.variantAlert = 'danger'
        this.showAlert()
      })
    },
    open() {
      this.cleanAnimal();
    },
    cleanAnimal() {
      this.animal = {
        fk_id_people: null,
        id_fazenda: null,
        no_animal: '',
        no_raca: '',
        sexo: null,
        vr_peso: null,
        dt_nascimento: null
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  created() {
    this.list()
    this.listPeople()
  }
}