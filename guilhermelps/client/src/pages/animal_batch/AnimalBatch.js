export default {
  data() {
    return {
      title: 'Movimentação',
      perPage: 5,
      currentPage: 1,
      selected: null,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      messageAlert: '',
      variantAlert: 'success',
      animalBatch: {
        fk_id_animal: null,
        fk_id_batch: null,
        dt_entrada: null,
        dt_saida: null,
        dt_ultima_movimentacao: null,
        ic_bezerro: false
      },
      fields: [
        {
          label: 'Animal',
          key: 'animal',
          sortable: true
        },
        {
          label: 'Lote',
          key: 'batch',
          sortable: true
        },
        {
          label: 'Data de Entrada',
          key: 'dt_entrada',
          sortable: true
        },
        {
          label: 'Data de Saída',
          key: 'dt_saida',
          sortable: true
        },
        {
          label: 'Data da Última Movimentação',
          key: 'dt_ultima_movimentacao',
          sortable: true
        },
        {
          label: 'Bezerro',
          key: 'ic_bezerro',
          sortable: true
        },
        {
          label: 'Ações',
          key: 'items',
          sortable: false
        }
      ],
      items: [],
      animals: [],
      batches: []
    }
  },
  methods: {
    remove(id) {
      this.$swal({
        title: "Atenção!",
        text: "Você realmente deseja remover esta movimentação?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#97101d",
        cancelButtonColor: "#7d7979",
        confirmButtonText: "Sim, remover!",
        cancelButtonText: "Cancelar",
      }).then(answer => {
        if (answer.isConfirmed) {
          this.$http.delete(`/animal-batch/${id}`).then(result => {
            this.items = this.items.filter(i => i.id != id)
            this.messageAlert = result.data.message;
            this.showAlert()
          }).catch(() => {
            this.messageAlert = 'Não foi possível remover a movimentação, tente mais tarde.'
            this.variantAlert = 'danger'
            this.showAlert()
          })
        }
      })
    },
    edit(id) {
      this.$http.get(`/animal-batcha/${id}`).then(result => {
        this.animalBatch = result.data.animalBatch
        this.$bvModal.show('modal-animal-batch')
      }).catch(() => {
        this.messageAlert = 'Não foi possível buscar a movimentação, tente mais tarde.'
        this.variantAlert = 'danger'
        this.showAlert()
      })
    },
    save() {
      if (!this.animalBatch.id) {
        this.$http.post('/animal-batch', this.animalBatch).then(result => {
          this.messageAlert = result.data.message;
          this.showAlert();
          this.list()
        }).catch(() => {
          this.messageAlert = 'Não foi possível cadastrar a movimentação, tente mais tarde.'
          this.variantAlert = 'danger'
          this.showAlert()
        })
      } else {
        this.$http.put(`/animal-batch/${this.animalBatch.id}`, this.animalBatch).then(result => {
          this.messageAlert = result.data.message;
          this.showAlert();
          this.list()
        }).catch(() => {
          this.messageAlert = 'Não foi possível atualizar a movimentação, tente mais tarde.'
          this.variantAlert = 'danger'
          this.showAlert()
        })
      }
    },
    list() {
      this.$http.get('/animal-batch').then(result => {
        this.items = result.data
      }).catch(() => {
        this.messageAlert = 'Não foi possível buscar as movimentações, tente mais tarde.'
        this.variantAlert = 'danger'
        this.showAlert()
      })
    },
    listAnimals() {
      this.$http.get('/animal').then(result => {
        this.animals = result.data
      }).catch(() => {
        this.messageAlert = 'Não foi possível buscar os animais, tente mais tarde.'
        this.variantAlert = 'danger'
        this.showAlert()
      })
    },
    listBatches() {
      this.$http.get('/batch').then(result => {
        this.batches = result.data
      }).catch(() => {
        this.messageAlert = 'Não foi possível buscar os lotes, tente mais tarde.'
        this.variantAlert = 'danger'
        this.showAlert()
      })
    },
    open() {
      this.cleanAnimalBatch();
    },
    cleanAnimalBatch() {
      this.animalBatch = {
        fk_id_animal: null,
        fk_id_batch: null,
        dt_entrada: null,
        dt_saida: null,
        dt_ultima_movimentacao: null,
        ic_bezerro: null
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
    this.list(),
    this.listAnimals(),
    this.listBatches()
  }
}