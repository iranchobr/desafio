export default {
  data() {
    return {
      title: 'Pessoa',
      perPage: 5,
      currentPage: 1,
      selected: null,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      messageAlert: '',
      variantAlert: 'success',
      people: {
        no_pessoa: '',
        no_email: '',
        endereco: '',
        sexo: null,
        ic_ativo: false
      },
      fields: [
        {
          label: 'Nome',
          key: 'no_pessoa',
          sortable: true
        },
        {
          label: 'Email',
          key: 'no_email',
          sortable: true
        },
        {
          label: 'Endereço',
          key: 'endereco',
          sortable: true
        },
        {
          key: 'sexo',
          label: 'Sexo',
          sortable: true,
        },
        {
          key: 'ic_ativo',
          label: 'Ativo',
          sortable: true,
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
        text: "Você realmente deseja remover esta pessoa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#97101d",
        cancelButtonColor: "#7d7979",
        confirmButtonText: "Sim, remover!",
        cancelButtonText: "Cancelar",
      }).then(answer => {
        if (answer.isConfirmed) {
          this.$http.delete(`/people/${id}`).then(result => {
            this.items = this.items.filter(i => i.id != id)
            this.messageAlert = result.data.message;
            this.showAlert()
          }).catch(() => {
            this.messageAlert = 'Não foi possível remover a pessoa, tente mais tarde.'
            this.variantAlert = 'danger'
            this.showAlert()
          })
        }
      })
    },
    edit(id) {
      this.$http.get(`/people/${id}`).then(result => {
        this.people = result.data.people
        this.$bvModal.show('modal-people')
      }).catch(() => {
        this.messageAlert = 'Não foi possível buscar a pessoa, tente mais tarde.'
        this.variantAlert = 'danger'
        this.showAlert()
      })
    },
    save() {
      if (!this.people.id) {
        this.$http.post('/people', this.people).then(result => {
          this.messageAlert = result.data.message;
          this.showAlert();
          this.list()
        }).catch(() => {
          this.messageAlert = 'Não foi possível cadastrar a pessoa, tente mais tarde.'
          this.variantAlert = 'danger'
          this.showAlert()
        })
      } else {
        console.log(this.people.id);
        this.$http.put(`/people/${this.people.id}`, this.people).then(result => {
          this.messageAlert = result.data.message;
          this.showAlert();
          this.list()
        }).catch(() => {
          this.messageAlert = 'Não foi possível atualizar a pessoa, tente mais tarde.'
          this.variantAlert = 'danger'
          this.showAlert()
        })
      }
    },
    list() {
      this.$http.get('/people').then(result => {
        this.items = result.data
      }).catch(() => {
        this.messageAlert = 'Não foi possível buscar as pessoas, tente mais tarde.'
        this.variantAlert = 'danger'
        this.showAlert()
      })
    },
    open() {
      this.cleanPeople();
    },
    cleanPeople() {
      this.people = {
        no_pessoa: '',
        no_email: '',
        endereco: '',
        sexo: null,
        ic_ativo: false
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
    this.list();
  }
}