// Componente: Cabeçalho de Página
Vue.component('cabecalho-pagina', {
  props: ['titulo'],
  template: `
    <div class="cabecalho-pagina">
      <h1>{{ titulo }}</h1>
    </div>
  `
});

// Componente: Caixa de Opção Admin
Vue.component('caixa-opcao-admin', {
  props: ['icone', 'titulo'],
  template: `
    <div class="card bg-secondary text-white text-center caixa-opcao-admin-card">
      <div class="card-header">
        <strong>{{ titulo.toUpperCase() }}</strong>
      </div>
      <div class="card-body">
        <i :class="'fas fa-' + icone + ' fa-5x'"></i>
      </div>
    </div>
  `
});

// Aplicação Vue Principal
new Vue({
  el: '#app',
  data: {
    vistaAtual: 'gestao',
    tipoOrdenacao: 1,
    modalTitulo: '',
    modalConteudo: '',
    sponsors: [
      {
        id: 1,
        nome: 'Sponsor ABC Lda',
        tipo: 'Sponsor',
        dataCriacao: new Date('2024-01-15T10:30:00'),
        dataNascimento: '1990-05-20',
        cidade: 'Lisboa',
        pais: 'Portugal',
        descricao: 'Empresa de tecnologia especializada em soluções digitais'
      },
      {
        id: 2,
        nome: 'Sponsor XYZ S.A.',
        tipo: 'Sponsor',
        dataCriacao: new Date('2024-02-10T14:20:00'),
        dataNascimento: '1985-08-15',
        cidade: 'Porto',
        pais: 'Portugal',
        descricao: 'Consultoria de negócios e desenvolvimento organizacional'
      },
      {
        id: 3,
        nome: 'Sponsor 123 Group',
        tipo: 'Sponsor',
        dataCriacao: new Date('2024-03-05T09:15:00'),
        dataNascimento: '1995-12-10',
        cidade: 'Coimbra',
        pais: 'Portugal',
        descricao: 'Investimento em startups e projetos inovadores'
      }
    ],
    experts: [
      {
        id: 1,
        nome: 'Dr. João Silva',
        tipo: 'Expert',
        dataCriacao: new Date('2024-01-20T11:00:00'),
        dataNascimento: '1975-03-25',
        cidade: 'Braga',
        pais: 'Portugal',
        descricao: 'Especialista em biologia marinha com 20 anos de experiência'
      },
      {
        id: 2,
        nome: 'Dra. Maria Santos',
        tipo: 'Expert',
        dataCriacao: new Date('2024-02-15T16:45:00'),
        dataNascimento: '1982-07-18',
        cidade: 'Faro',
        pais: 'Portugal',
        descricao: 'Veterinária especializada em animais exóticos'
      },
      {
        id: 3,
        nome: 'Prof. Carlos Ferreira',
        tipo: 'Expert',
        dataCriacao: new Date('2024-03-10T08:30:00'),
        dataNascimento: '1968-11-05',
        cidade: 'Évora',
        pais: 'Portugal',
        descricao: 'Professor e investigador em ecologia animal'
      }
    ],
    formulario: {
      id: null,
      nome: '',
      dataNascimento: '',
      cidade: '',
      pais: '',
      descricao: ''
    },
    itemEditando: null
  },
  computed: {
    listaSponsorsOrdenada() {
      return this.ordenarLista([...this.sponsors]);
    },
    listaExpertsOrdenada() {
      return this.ordenarLista([...this.experts]);
    }
  },
  methods: {
    // Navegação entre vistas
    navegarPara(vista) {
      this.vistaAtual = vista;
      this.limparFormulario();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Ordenação
    ordenar(tipo) {
      this.tipoOrdenacao *= -1;
    },

    ordenarLista(lista) {
      return lista.sort((a, b) => {
        if (a.nome > b.nome) return 1 * this.tipoOrdenacao;
        else if (a.nome < b.nome) return -1 * this.tipoOrdenacao;
        else return 0;
      });
    },

    // Formatação de data
    formatarData(data) {
      if (!data) return 'N/A';
      const d = new Date(data);
      const ano = d.getFullYear();
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      const dia = String(d.getDate()).padStart(2, '0');
      const horas = String(d.getHours()).padStart(2, '0');
      const minutos = String(d.getMinutes()).padStart(2, '0');
      const segundos = String(d.getSeconds()).padStart(2, '0');
      return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    },

    // Ver detalhes
    verDetalhes(item) {
      this.modalTitulo = item.nome;
      this.modalConteudo = `
        <p style="text-align: left; line-height: 2;">
          <b>Nome:</b> ${item.nome}<br>
          <b>Tipo de utilizador:</b> ${item.tipo}<br>
          <b>Observações:</b> ${item.descricao || 'Sem observações'}<br>
          <b>Data de nascimento:</b> ${item.dataNascimento}<br>
          <b>Cidade:</b> ${item.cidade || 'N/A'}<br>
          <b>País:</b> ${item.pais || 'N/A'}
        </p>
      `;
      // Abrir modal usando jQuery (Bootstrap)
      $('#modalDetalhes').modal('show');
    },

    // SPONSORS - Operações CRUD

    editarSponsor(sponsor) {
      this.itemEditando = sponsor.id;
      this.formulario = {
        id: sponsor.id,
        nome: sponsor.nome,
        dataNascimento: sponsor.dataNascimento,
        cidade: sponsor.cidade,
        pais: sponsor.pais,
        descricao: sponsor.descricao
      };
      this.navegarPara('editarSponsor');
    },

    submeterFormularioSponsor() {
      const novoSponsor = {
        id: this.sponsors.length + 1,
        nome: this.formulario.nome,
        tipo: 'Sponsor',
        dataCriacao: new Date(),
        dataNascimento: this.formulario.dataNascimento,
        cidade: this.formulario.cidade,
        pais: this.formulario.pais,
        descricao: this.formulario.descricao
      };

      this.sponsors.push(novoSponsor);
      this.mostrarAlerta('Sucesso', 'Sponsor adicionado com sucesso!');
      this.navegarPara('listaSponsors');
    },

    atualizarSponsor() {
      const indice = this.sponsors.findIndex(s => s.id === this.formulario.id);
      if (indice !== -1) {
        this.sponsors[indice] = {
          ...this.sponsors[indice],
          nome: this.formulario.nome,
          dataNascimento: this.formulario.dataNascimento,
          cidade: this.formulario.cidade,
          pais: this.formulario.pais,
          descricao: this.formulario.descricao
        };
        this.mostrarAlerta('Sucesso', 'Sponsor atualizado com sucesso!');
        this.navegarPara('listaSponsors');
      }
    },

    removerSponsor(id) {
      if (confirm('Deseja mesmo remover o sponsor?')) {
        const indice = this.sponsors.findIndex(s => s.id === id);
        if (indice !== -1) {
          this.sponsors.splice(indice, 1);
          this.mostrarAlerta('Sucesso', 'Sponsor removido com sucesso!');
        }
      }
    },

    // EXPERTS - Operações CRUD

    editarExpert(expert) {
      this.itemEditando = expert.id;
      this.formulario = {
        id: expert.id,
        nome: expert.nome,
        dataNascimento: expert.dataNascimento,
        cidade: expert.cidade,
        pais: expert.pais,
        descricao: expert.descricao
      };
      this.navegarPara('editarExpert');
    },

    submeterFormularioExpert() {
      const novoExpert = {
        id: this.experts.length + 1,
        nome: this.formulario.nome,
        tipo: 'Expert',
        dataCriacao: new Date(),
        dataNascimento: this.formulario.dataNascimento,
        cidade: this.formulario.cidade,
        pais: this.formulario.pais,
        descricao: this.formulario.descricao
      };

      this.experts.push(novoExpert);
      this.mostrarAlerta('Sucesso', 'Expert adicionado com sucesso!');
      this.navegarPara('listaExperts');
    },

    atualizarExpert() {
      const indice = this.experts.findIndex(e => e.id === this.formulario.id);
      if (indice !== -1) {
        this.experts[indice] = {
          ...this.experts[indice],
          nome: this.formulario.nome,
          dataNascimento: this.formulario.dataNascimento,
          cidade: this.formulario.cidade,
          pais: this.formulario.pais,
          descricao: this.formulario.descricao
        };
        this.mostrarAlerta('Sucesso', 'Expert atualizado com sucesso!');
        this.navegarPara('listaExperts');
      }
    },

    removerExpert(id) {
      if (confirm('Deseja mesmo remover o expert?')) {
        const indice = this.experts.findIndex(e => e.id === id);
        if (indice !== -1) {
          this.experts.splice(indice, 1);
          this.mostrarAlerta('Sucesso', 'Expert removido com sucesso!');
        }
      }
    },

    // Utilitários

    limparFormulario() {
      this.formulario = {
        id: null,
        nome: '',
        dataNascimento: '',
        cidade: '',
        pais: '',
        descricao: ''
      };
      this.itemEditando = null;
    },

    mostrarAlerta(titulo, mensagem) {
      alert(`${titulo}\n\n${mensagem}`);
    }
  },
  mounted() {
    console.log('Protótipo Gestão Animalec - Aplicação iniciada');
    console.log('Vista inicial:', this.vistaAtual);
    console.log('Sponsors carregados:', this.sponsors.length);
    console.log('Experts carregados:', this.experts.length);
  }
});
