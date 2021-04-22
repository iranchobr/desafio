export default {
  data() {
    return {
      title: 'Lote',
      perPage: 5,
      currentPage: 1,
      selected: null,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      messageAlert: '',
      variantAlert: 'success',
      batch: {
        no_lote: '',
        ds_lote: ''
      },
      fields: [
        {
          label: 'Nome',
          key: 'no_lote',
          sortable: true
        },
        {
          label: 'Descrição',
          key: 'ds_lote',
          sortable: true
        },
        {
          label: 'Ações',
          key: 'items',
          sortable: false
        }
      ],
      items: []
    }
  },
  methods: {
    remove(id) {
      this.$swal({
        title: "Atenção!",
        text: "Você realmente deseja remover este lote?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#97101d",
        cancelButtonColor: "#7d7979",
        confirmButtonText: "Sim, remover!",
        cancelButtonText: "Cancelar",
      }).then(answer => {
        if (answer.isConfirmed) {
          this.$http.delete(`/batch/${id}`).then(result => {
            this.items = this.items.filter(i => i.id != id)
            this.messageAlert = result.data.message;
            this.showAlert()
          }).catch(() => {
            this.messageAlert = 'Não foi possível remover o lote, tente mais tarde.'
            this.variantAlert = 'danger'
            this.showAlert()
          })
        }
      })
    },
    edit(id) {
      this.$http.get(`/batch/${id}`).then(result => {
        this.batch = result.data.batch
        this.$bvModal.show('modal-batch')
      }).catch(() => {
        this.messageAlert = 'Não foi possível buscar o lote, tente mais tarde.'
        this.variantAlert = 'danger'
        this.showAlert()
      })
    },
    save() {
      if (!this.batch.id) {
        this.$http.post('/batch', this.batch).then(result => {
          this.messageAlert = result.data.message;
          this.showAlert();
          this.list()
        }).catch(() => {
          this.messageAlert = 'Não foi possível cadastrar o lote, tente mais tarde.'
          this.variantAlert = 'danger'
          this.showAlert()
        })
      } else {
        this.$http.put(`/batch/${this.batch.id}`, this.batch).then(result => {
          this.messageAlert = result.data.message;
          this.showAlert();
          this.list()
        }).catch(() => {
          this.messageAlert = 'Não foi possível atualizar o lote, tente mais tarde.'
          this.variantAlert = 'danger'
          this.showAlert()
        })
      }
    },
    list() {
      this.$http.get('/batch').then(result => {
        this.items = result.data
      }).catch(() => {
        this.messageAlert = 'Não foi possível buscar os lotes, tente mais tarde.'
        this.variantAlert = 'danger'
        this.showAlert()
      })
    },
    open() {
      this.cleanBatch();
    },
    cleanBatch() {
      this.batch = {
        no_lote: '',
        ds_lote: ''
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
  }
}