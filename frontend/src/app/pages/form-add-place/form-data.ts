import { t, tforms } from '../../utils/translate';
import { addPlaceForm } from 'src/app/models/forms.model';

const formData = {};

const upa_services: addPlaceForm = {
  stages: [{
    areas: [{
      fields: [
        {title: tforms.titles.who, required: true, type: tforms.fieldTypes.radio, name: tforms.names.who, values: ['Proprietária/o ou responsável pelo local', 'Outro'],
        textField: {name: tforms.names.cpf, label: tforms.titles.cpf, mask: tforms.masks.cpf, required: false, activeWhen: ['Proprietária/o ou responsável pelo local']}},
    ]
  },
  {
    title: tforms.areaTitles.profile,
    subTitle: tforms.areaTitles.profileDesc,
    fields: [
      {type: tforms.fieldTypes.profile_picture, name: tforms.names.avatar, label: tforms.titles.profile_picture, required: false},
      {type: tforms.fieldTypes.image_repeater, name: tforms.names.local_pics, label: tforms.titles.local_pics, required: false},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.name, label: tforms.titles.name, required: true},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.address, label: tforms.titles.address, required: true},
      {type: tforms.fieldTypes.map, required: true,  name: tforms.names.map, label: tforms.titles.map, noPadding: true},
      {type: tforms.fieldTypes.checkbox, required: true, otherField: true, name: tforms.names.atractives, title:tforms.titles.atractives, values: [
        'Logística',
        'Insumos agrícolas',
        'Mudas',
        'Sementes',
        'Assistência técnica',
        'Máquinas e implementos',
      ]},
      {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.description, title: tforms.titles.profile_text, subtitle: 'Descreva as principais características e serviços oferecidos (pontos fortes, diferenciais, histórico, porque vale a pena conhecer)', label: 'Descreva', required: false}
    ]
  },
  {title: tforms.areaTitles.contactInfo,
  subTitle: tforms.areaTitles.contactDesc,
  fields: [
    {type: tforms.fieldTypes.phone_repeater, hideType: true, name:tforms.names.comercial_phone, label: tforms.titles.comercial_phone, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.email, name: tforms.names.email, label: tforms.titles.email},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.site, label: tforms.titles.site, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.contact, label: tforms.titles.contact, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.schedule, label: tforms.titles.schedule, required: false},
  ]
},
{
  title: tforms.areaTitles.personalInfo,
  subTitle: tforms.areaTitles.personalInfoDesc,
  fields:[
    {type: tforms.fieldTypes.checkbox, name:tforms.names.sameData, values: [tforms.titles.sameData]},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.responsable_name, label: tforms.titles.responsable_name, required: true},
    {type: tforms.fieldTypes.phone, name:tforms.names.personal_phones, label: tforms.titles.personal_phone, required: true},
    {type: tforms.fieldTypes.text,  legend: '(para tirar dúvidas e avisar quando a inclusão for aprovada)', subtype :tforms.names.registration_email, name: tforms.names.registration_email, label: tforms.titles.registration_email, required: true},
    {type: tforms.fieldTypes.checkbox, name:tforms.names.authorize_information, label: tforms.titles.declaration, required: true, otherField: false, values: [
      tforms.titles.authorize_information,
    ]}
  ]
}]
}]
}

const organic_restaurants: addPlaceForm  = {
    stages: [{
      areas: [{
        fields: [
          {title: tforms.titles.who, required: true, type: tforms.fieldTypes.radio, name:tforms.names.who, values: ['Proprietária/o ou responsável pelo local', 'Outro'],
          textField: {name: tforms.names.cpf, label: tforms.titles.cpf, mask: tforms.masks.cpf, required: false, activeWhen: ['Proprietária/o ou responsável pelo local']}},
      ]
    },
    {
      title: tforms.areaTitles.profile,
      subTitle: tforms.areaTitles.profileDesc,
      fields: [
        {type: tforms.fieldTypes.profile_picture, name: tforms.names.avatar, label: tforms.titles.profile_picture, required: false},
        {type: tforms.fieldTypes.image_repeater, name: tforms.names.local_pics, label: tforms.titles.local_pics, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.name, label: tforms.titles.name, required: true},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.address, label: tforms.titles.address, required: true},
        {type: tforms.fieldTypes.map, required: true,  name: tforms.names.map, label: tforms.titles.map, noPadding: true},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.kitchen, label: tforms.titles.kitchen, required: true},
        {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.description, title: tforms.titles.profile_text, subtitle: 'Descreva o local e as principais características (Cozinha, ambiente, pontos fortes, diferenciais, porque vale a pena conhecer)', label: 'Descreva', required: false},
        {type: tforms.fieldTypes.radio, name:tforms.names.affiliation, title: tforms.titles.affiliation, yesNo: true,
        textField: {name: tforms.names.associativism, label: tforms.titles.associativism, required: true, activeWhen: ['Sim']}},
      ]
    },
    {title: tforms.areaTitles.contactInfo,
    subTitle: tforms.areaTitles.contactDesc,
    fields: [
      {type: tforms.fieldTypes.phone_repeater, hideType: true, name:tforms.names.comercial_phone, label: tforms.titles.comercial_phone, required: false},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.email, name: tforms.names.email, label: tforms.titles.email},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.site, label: tforms.titles.site, required: false},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.contact, label: tforms.titles.contact, required: false},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.schedule, label: tforms.titles.schedule, required: false},
    ]
  },
  {
    title: tforms.areaTitles.personalInfo,
    subTitle: tforms.areaTitles.personalInfoDesc,
    fields:[
      {type: tforms.fieldTypes.checkbox, name:tforms.names.sameData, values: [tforms.titles.sameData]},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.responsable_name, label: tforms.titles.responsable_name, required: true},
      {type: tforms.fieldTypes.phone, name:tforms.names.personal_phones, label: tforms.titles.personal_phone, required: true},
      {type: tforms.fieldTypes.text,  legend: '(para tirar dúvidas e avisar quando a inclusão for aprovada)', subtype :tforms.names.registration_email, name: tforms.names.registration_email, label: tforms.titles.registration_email, required: true},
      {type: tforms.fieldTypes.checkbox, name:tforms.names.authorize_information, label: tforms.titles.declaration, required: true, otherField: false, values: [
        tforms.titles.authorize_information,
      ]}
    ]
  }]
  }]
};

const local_partner: addPlaceForm= {
  stages: [{
    areas: [{
      fields: [
        {title: tforms.titles.who, required: true, type: tforms.fieldTypes.radio, name:tforms.names.who, values: ['Proprietária/o ou responsável pelo local', 'Outro'],
        textField: {name: tforms.names.cpf, label: tforms.titles.cpf, mask: tforms.masks.cpf, required: false, activeWhen: ['Proprietária/o ou responsável pelo local']}},
    ]
  },
  {
    title: tforms.areaTitles.profile,
    subTitle: tforms.areaTitles.profileDesc,
    fields: [
      {type: tforms.fieldTypes.profile_picture, name: tforms.names.avatar, label: tforms.titles.profile_picture, required: false},
      {type: tforms.fieldTypes.image_repeater, name: tforms.names.local_pics, label: tforms.titles.local_pics, required: false},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.name, label: tforms.titles.name, required: true},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.address, label: tforms.titles.address, required: true},
      {type: tforms.fieldTypes.map, required: true,  name: tforms.names.map, label: tforms.titles.map, noPadding: true},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.product_list, label: tforms.titles.local_partner, required: true},
      {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.description, title: tforms.titles.profile_text, subtitle: 'Descreva o local e as principais características e atividades desenvolvidas (Atividades, pontos fortes, diferenciais, histórico, porque vale a pena conhecer)', label: 'Descreva', required: false},
    ]
  },
  {title: tforms.areaTitles.contactInfo,
  subTitle: tforms.areaTitles.contactDesc,
  fields: [
    {type: tforms.fieldTypes.phone_repeater, hideType: true, name:tforms.names.comercial_phone, label: tforms.titles.comercial_phone, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.email, name: tforms.names.email, label: tforms.titles.email},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.site, label: tforms.titles.site, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.contact, label: tforms.titles.contact, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.schedule, label: tforms.titles.schedule, required: false},
    {type: tforms.fieldTypes.radio, name:tforms.names.affiliation, title: tforms.titles.affiliation, yesNo: true,
      textField: {name: tforms.names.associativism, label: tforms.titles.associativism, required: true, activeWhen: ['Sim']}},
  ]
},
{
  title: tforms.areaTitles.personalInfo,
  subTitle: tforms.areaTitles.personalInfoDesc,
  fields:[
    {type: tforms.fieldTypes.checkbox, name:tforms.names.sameData, values: [tforms.titles.sameData]},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.responsable_name, label: tforms.titles.responsable_name, required: true},
    {type: tforms.fieldTypes.phone, name:tforms.names.personal_phones, label: tforms.titles.personal_phone, required: true},
    {type: tforms.fieldTypes.text,  legend: '(para tirar dúvidas e avisar quando a inclusão for aprovada)', subtype :tforms.names.registration_email, name: tforms.names.registration_email, label: tforms.titles.registration_email, required: true},
    {type: tforms.fieldTypes.checkbox, name:tforms.names.authorize_information, label: tforms.titles.declaration, required: true, otherField: false, values: [
      tforms.titles.authorize_information,
    ]}
  ]
}]
}]
};

const tourism: addPlaceForm = {
  stages: [
   {
    areas: [{
      fields: [
        {title: tforms.titles.who, required: true, type: tforms.fieldTypes.radio, name:tforms.names.who, values: ['Proprietária/o ou responsável pelo local', 'Outro'],
        textField: {name: tforms.names.cpf, label: tforms.titles.cpf, mask: tforms.masks.cpf, required: false, activeWhen: ['Proprietária/o ou responsável pelo local']}},
      ]
    },{
      title: tforms.areaTitles.profile,
      subTitle: tforms.areaTitles.profileDesc,
      fields: [
        {type: tforms.fieldTypes.profile_picture, name: tforms.names.avatar, label: tforms.titles.profile_picture, required: false},
        {type: tforms.fieldTypes.image_repeater, name: tforms.names.local_pics, label: tforms.titles.local_pics, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.name, label: tforms.titles.name, required: true},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.address, label: tforms.titles.address, required: true},
        {type: tforms.fieldTypes.map, required: true,  name: tforms.names.map, label: tforms.titles.map, noPadding: true},
     ]},
      {
      title: tforms.areaTitles.atractives,
      fields:[
        {type: tforms.fieldTypes.checkbox, title: tforms.titles.nature, retract: true, name:tforms.names.nature, otherField: true, values: [
         'Área de proteção ambiental',
          'Reserva particular do patrimônio natural',
          'Parque',
          'Cachoeira',
          'Rio',
          'Lago',
          'Represa',
          'Trilhas na Mata',
          'Borboletário',
          'Orquidário',
          'Pesque e pague'
        ]},
        {type: tforms.fieldTypes.checkbox, retract: true, title: tforms.titles.culture, name:tforms.names.culture, otherField: true, values: [
          'Cemitério',
          'Ferroviário',
          'Centro Ecocultural',
          'Biblioteca',
          'Templo Religioso',
          'Clube social',
          'Evento',
          'Galeria de Artes'
        ]},
        {type: tforms.fieldTypes.checkbox, retract: true, title: tforms.titles.food, name:tforms.names.food, otherField: true, values: [
          'Restaurantes',
          'Bar',
          'Lanchonete',
          'Confeitaria/padaria',
        ]},
        {type: tforms.fieldTypes.checkbox, retract: true, title: tforms.titles.accommodation, name:tforms.names.accommodation, otherField: true, values: [
          'Alojamento coletivo',
          'Hospedagem familiar',
          'Hotel',
          'Pousada',
          'Camping',
          'Hospedagem em quarto'
        ]},
        {type: tforms.fieldTypes.checkbox, retract: true, title: tforms.titles.services, name:tforms.names.services, otherField: true, values: [
          'Sítios/chácaras de lazer',
          'Ponto de apoio ao ciclista',
          'Espaços de Eventos',
          'Informação Turística',
          'Transportadora turística',
          'Operadora de turismo',
          'Antiquário',
          'Artesanatos',
          'Ateliê',
          'Alambique'
        ]},
        {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.description, title: tforms.titles.profile_text, subtitle: tforms.titles.profile_textDesc, label: tforms.titles.profile_text, required: false},
      ]
    },
    {
      title: tforms.areaTitles.contactInfo,
      subTitle: tforms.areaTitles.contactDesc,
      fields: [
        {type: tforms.fieldTypes.phone_repeater, hideType: true, name:tforms.names.comercial_phone, label: tforms.titles.comercial_phone, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.email, name: tforms.names.email, label: tforms.titles.email, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.site, label: tforms.titles.site, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.contact, label: tforms.titles.contact, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.schedule, label: tforms.titles.schedule, required: false},
      ]
    },
    {title: tforms.areaTitles.aditionalInfo,
    subTitle: tforms.areaTitles.contactDesc,
    fields: [
      {type: tforms.fieldTypes.checkbox, title: tforms.titles.qualification_list, name:tforms.names.qualification_list, otherField: false, values: [
        'Necessita Agendamento',
        'Não necessita agendamento',
        'Recebe grupos',
        'Apenas grupos',
        'Sem número mínimo de visitantes',
        'Possui estacionamento',
        'Possui acessibilidade para pessoas com necessidades especiais'
      ]},
      {type: tforms.fieldTypes.radio, name:tforms.names.affiliation, title: tforms.titles.affiliation, yesNo: true,  required: false,
      textField: {name: tforms.names.associativism, label: tforms.titles.associativism, required: true, activeWhen: ['Sim']}},
    ]
  },{
    title: tforms.areaTitles.personalInfo,
    subTitle: tforms.areaTitles.personalInfoDesc,
    fields:[
      {type: tforms.fieldTypes.checkbox, name:tforms.names.sameData, values: [tforms.titles.sameData]},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.responsable_name, label: tforms.titles.responsable_name, required: true},
      {type: tforms.fieldTypes.phone, name:tforms.names.personal_phones, label: tforms.titles.personal_phone, required: true},
      {type: tforms.fieldTypes.text,  legend: '(para tirar dúvidas e avisar quando a inclusão for aprovada)', subtype :tforms.names.registration_email, name: tforms.names.registration_email, label: tforms.titles.registration_email, required: true},
      {type: tforms.fieldTypes.checkbox, name:tforms.names.authorize_information, label: tforms.titles.declaration, required: true, otherField: false, values: [
        tforms.titles.authorize_information,
      ]}
    ]
  }
  ]
  }]
};

const gardens: addPlaceForm = {
    stages:[{
      areas: [{
        fields: [
          {title: tforms.titles.who, required: true,  type: tforms.fieldTypes.radio, name:tforms.names.who, values: ['Proprietária/o ou responsável pelo local', 'Outro'],
          textField: {name: tforms.names.cpf, label: tforms.titles.cpf, mask: tforms.masks.cpf, required: false, activeWhen: ['Proprietária/o ou responsável pelo local']}},
        ]
      },{
        title: tforms.areaTitles.profile,
        subTitle: tforms.areaTitles.profileDesc,
        fields: [
          {type: tforms.fieldTypes.profile_picture, name: tforms.names.avatar, label: tforms.titles.profile_picture, required: false},
          {type: tforms.fieldTypes.image_repeater, name: tforms.names.local_pics, label: tforms.titles.local_pics, required: false},
          {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.name, label: tforms.titles.name, required: true},
          {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.address, label: tforms.titles.address, required: true},
          {type: tforms.fieldTypes.map, required: true,  name: tforms.names.map, label: tforms.titles.map, noPadding: true},
          {type: tforms.fieldTypes.checkbox, name:tforms.names.product_list, otherField: true, title: tforms.titles.activities, required: true, values:
            [
              'Horta comunitária',
              'Horta institucional',
              'Horta escolar',
              'Horticultura',
              'Pomar',
              'PANCs - Plantas alimentícias não convencionais',
              'Plantas medicinais',
              'Produção de mel',
              'Viveiro de mudas',
              'Jardim',
              'Autoconsumo',
              'Comercializa',
              'Atividades recreativas',
              'Oficinas educativas',
              'Educação ambiental',
              'Compostagem',
              'Agrofloresta',
              'Aquaponia',
              'Permacultura',
              'Proteção de nascentes',
              'Proteção ambiental',
          ]},
          {type: tforms.fieldTypes.checkbox, otherField: true,  name:tforms.names.where_find_list, title: tforms.titles.where_find_list, required: true, values:
            ['Não comercializa',
             'Porta da propriedade',
             'CEAGESP',
             'Associação, sindicato ou cooperativa',
             'Feiras Livres',
             'Restaurantes',
             'Quitandas ou mini-mercados',
             'Supermercados ou grandes empresas'
          ]},
          {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.who_sells_details, title: tforms.titles.who_sells_details, label: 'Descreva', required: false},
          {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.description, title: tforms.titles.profile_text, subtitle: 'Descreva o local, as principais características e atividades desenvolvidas (histórico, porque vale a pena conhecer, pontos fortes, principais necessidades)', label: 'Descreva', required: false},

        ]
      }, {
        title: tforms.areaTitles.contactInfo,
        subTitle: tforms.areaTitles.contactDesc,
        fields: [
          {type: tforms.fieldTypes.phone_repeater, hideType: true, name:tforms.names.comercial_phone, label: tforms.titles.phone, required: false},
          {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.email, name: tforms.names.email, label: tforms.titles.email, required: false},
          {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.site, label: tforms.titles.site, required: false},
          {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.contact, label: tforms.titles.contact, required: false},
          {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.schedule, label: tforms.titles.schedule, required: false},
        ]
      },
      {
        title: tforms.areaTitles.aditionalInfo,
        fields: [
          {type: tforms.fieldTypes.checkbox, name:tforms.names.qualification_list, title: tforms.areaTitles.aditionalInfo, values: [
            'Aberta a visitação',
            'Tem mutirão',
            'Em busca de volúntarios',
            'Acesso livre',
            'Acesso controlado',
            'Comercializa',
          ]},
          {type: tforms.fieldTypes.radio, name:tforms.names.affiliation, title: tforms.titles.affiliation, yesNo: true,
          textField: {name: tforms.names.associativism, label: tforms.titles.associativism, required: true, activeWhen: ['Sim']}}
        ]
      },
      {
        title: tforms.areaTitles.personalInfo,
        subTitle: tforms.areaTitles.personalInfoDesc,
        fields:[
          {type: tforms.fieldTypes.checkbox, name:tforms.names.sameData, values: [tforms.titles.sameData]},
          {type: tforms.fieldTypes.text, min: 3, max: 100, subtype :tforms.fieldTypes.text, name:tforms.names.responsable_name, label: tforms.titles.responsable_name, required: true},
          {type: tforms.fieldTypes.phone, name:tforms.names.personal_phones, label: tforms.titles.personal_phone, required: true},
          {type: tforms.fieldTypes.text,  legend: '(para tirar dúvidas e avisar quando a inclusão for aprovada)', subtype :tforms.names.registration_email, name: tforms.names.registration_email, label: tforms.titles.registration_email, required: true},
          {type: tforms.fieldTypes.checkbox, label: tforms.titles.declaration, name:tforms.names.authorize_information, otherField: false, required: true, values: [
            tforms.titles.authorize_information,
          ]}
        ]
      },
    ]
    }]
};

const rural_experience: addPlaceForm = {
  stages: [{
    areas: [{
      fields: [
        {title: tforms.titles.who, required: true, type: tforms.fieldTypes.radio, name:tforms.names.who, values: ['Proprietária/o ou responsável pelo local', 'Outro'],
        textField: {name: tforms.names.cpf, label: tforms.titles.cpf, mask: tforms.masks.cpf, required: false, activeWhen: ['Proprietária/o ou responsável pelo local']}},
    ]
  },
  {
    title: tforms.areaTitles.profile,
    fields: [
      {type: tforms.fieldTypes.profile_picture, name: tforms.names.avatar, label: tforms.titles.profile_picture, required: false},
      {type: tforms.fieldTypes.image_repeater, name: tforms.names.local_pics, label: tforms.titles.local_pics, required: false},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.name, label: tforms.titles.name, required: true},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.address, label: tforms.titles.address, required: true},
      {type: tforms.fieldTypes.map, required: true,  name: tforms.names.map, label: tforms.titles.map, noPadding: true},
      {title: tforms.titles.shareAddress, type: tforms.fieldTypes.radio, name:tforms.names.shareAddress, values: ['Divulgar endereço para visitação', 'Manter endereço sigiloso (usar apenas para mapa)'], required: true},
      {type: tforms.fieldTypes.checkbox, otherField: true, name:tforms.names.atractives, title:tforms.areaTitles.atractives, values: [
        'Visitação da área produtiva',
        'Horta orgânica',
        'Agrofloresta',
        'Estufa',
        'Produção de cogumelos',
        'Criação de galinhas',
        'Criação de abelhas',
        'Turismo escolar',
        'Colhe-pague',
        'Saneamento ecológico',
        'Ponto de apoio ao ciclista',
        'Trilhas na Mata',
        'Rio',
        'Lago',
        'Reflorestamento',
        'Serve refeições caseiras',
        'Serve lanche',
        'Camping',
        'Hospedagem em quarto',
        'Hospedagem em chalé'
      ]},
      {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.description, title: "Descrição dos Atrativos", subtitle: 'Descreva as atrações turísticas da propriedade, pontos fortes, o que valoriza, diferenciais, especialidades, porque vale a pena visitar.', label: 'Descreva', required: false}
    ]
  },
  {title: tforms.areaTitles.contactInfo,
  subTitle: tforms.areaTitles.contactDesc,
  fields: [
    {type: tforms.fieldTypes.phone_repeater, hideType: true, name:tforms.names.comercial_phone, label: tforms.titles.comercial_phone, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.email, name: tforms.names.email, label: tforms.titles.email},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.site, label: tforms.titles.site, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.contact, label: tforms.titles.contact, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.schedule, label: tforms.titles.schedule, required: false},
  ]
},
{title: tforms.areaTitles.aditionalInfo,
    subTitle: tforms.areaTitles.contactDesc,
    fields: [
      {type: tforms.fieldTypes.checkbox, title: tforms.titles.qualification_list, name:tforms.names.qualification_list, otherField: false, values: [
        'Necessita Agendamento',
        'Não necessita agendamento',
        'Recebe grupos',
        'Sem número mínimo de visitantes',
        'Apenas grupos',
        'Possui estacionamento',
        'Possui acessibilidade para pessoas com necessidades especiais',
        'Agricultura familiar',
      ]},
      {type: tforms.fieldTypes.radio, name:tforms.names.affiliation, title: tforms.titles.affiliation, yesNo: true,
      textField: {name: tforms.names.associativism, label: tforms.titles.associativism, required: true, activeWhen: ['Sim']}}
    ]
  },
  {
    title: tforms.areaTitles.personalInfo,
    subTitle: tforms.areaTitles.personalInfoDesc,
    fields:[
      {type: tforms.fieldTypes.checkbox, name:tforms.names.sameData, values: [tforms.titles.sameData]},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.responsable_name, label: tforms.titles.responsable_name, required: true},
      {type: tforms.fieldTypes.phone, name:tforms.names.personal_phones, label: tforms.titles.personal_phone, required: true},
      {type: tforms.fieldTypes.text,  legend: '(para tirar dúvidas e avisar quando a inclusão for aprovada)', subtype :tforms.names.registration_email, name: tforms.names.registration_email, label: tforms.titles.registration_email, required: true},
      {type: tforms.fieldTypes.checkbox, name:tforms.names.authorize_information, label: tforms.titles.declaration, required: true, otherField: false, values: [
        tforms.titles.authorize_information,
      ]}
    ]
  }
]
}]
};

const guarani_productor: addPlaceForm = {
  stages:[{
    areas: [{
      fields: [
        {title: tforms.titles.who, required: true,  type: tforms.fieldTypes.radio, name:tforms.names.who, values: ['Morador da Aldeia', 'Outro'],
        textField: {name: tforms.names.cpf, label: tforms.titles.cpf, mask: tforms.masks.cpf, required: false, activeWhen: ['Morador da Aldeia']}},
      ]
    },{
      title: tforms.areaTitles.profile,
      subTitle: tforms.areaTitles.profileDesc,
      fields: [
        {type: tforms.fieldTypes.profile_picture, name: tforms.names.avatar, label: tforms.titles.profile_picture, required: false},
        {type: tforms.fieldTypes.image_repeater, name: tforms.names.local_pics, label: tforms.titles.local_pics, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.name, label: tforms.titles.name, required: true},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.address, label: tforms.titles.address, required: true},
        {type: tforms.fieldTypes.map, required: true,  name: tforms.names.map, label: tforms.titles.map, noPadding: true},
        {type: tforms.fieldTypes.checkbox, name:tforms.names.product_list, otherField: true, title: tforms.titles.activities, required: true, values:
          ['Milho (Avaxi)',
           'Batata-doce (Jety)',
           `Mandioca (Mandi'o)`,
           'Banana (Pakova)',
           'Amendoim (Manduvi)',
           'Abóbora (Andai)',
           'Melancia (Xanjau)',
           'Feijão (Kumanda)',
           'Quiabo',
           'Abacaxi',
           'Inhame',
           'Arroz (Aroi)',
           'Porcos',
           'Gansos/patos',
           'Galinhas',
           'Vaca',
           'Abelha',
           'Peixe em açude'
        ]},
        {type: tforms.fieldTypes.checkbox, otherField: true,  name:tforms.names.where_find_list, title: tforms.titles.where_find_list, required: true, values:
          ['Não comercializa',
           'Porta da propriedade',
           'CEAGESP',
           'Associação, sindicato ou cooperativa',
           'Feiras Livres',
           'Restaurantes',
           'Quitandas ou mini-mercados',
           'Supermercados ou grandes empresas'
        ]},
        {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.who_sells_details, title: tforms.titles.who_sells_details, label: 'Descreva', required: false},
        {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.description, title: tforms.titles.profile_text, subtitle: 'Descreva o local e as principais características e atividades desenvolvidas (histórico, porque vale a pena conhecer, pontos fortes, principais necessidades)', label: 'Descreva', required: false},

      ]
    }, {
      title: tforms.areaTitles.contactInfo,
      subTitle: tforms.areaTitles.contactDesc,
      fields: [
        {type: tforms.fieldTypes.phone_repeater, hideType: true, name:tforms.names.comercial_phone, label: tforms.titles.comercial_phone, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.email, name: tforms.names.email, label: tforms.titles.email, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.site, label: tforms.titles.site, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.contact, label: tforms.titles.contact, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.schedule, label: tforms.titles.schedule, required: false},
      ]
    },
    {
      title: tforms.areaTitles.aditionalInfo,
      fields: [
        {type: tforms.fieldTypes.checkbox, name:tforms.names.qualification_list, title: tforms.areaTitles.aditionalInfo, values: [
          'Turismo e vivência rural (Recebe Visitantes)',
          'Necessita Agendamento',
          'Não necessita agendamento'
        ]},
        {type: tforms.fieldTypes.radio, name:tforms.names.affiliation, title: tforms.titles.affiliation, yesNo: true,
        textField: {name: tforms.names.associativism, label: tforms.titles.associativism, required: true, activeWhen: ['Sim']}},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.number, min: 0, name:tforms.names.cultivated_area, label: tforms.titles.cultivated_area, required: false},
        {type: tforms.fieldTypes.text, subtype: tforms.fieldTypes.number, min: 0, max: 10000, name:tforms.names.gardens_number, label: tforms.titles.gardens_number, required: false},
      ]
    },
    {
      title: tforms.areaTitles.personalInfo,
      subTitle: tforms.areaTitles.personalInfoDesc,
      fields:[
        {type: tforms.fieldTypes.checkbox, name:tforms.names.sameData, values: [tforms.titles.sameData]},
        {type: tforms.fieldTypes.text, min: 3, max: 100, subtype :tforms.fieldTypes.text, name:tforms.names.responsable_name, label: tforms.titles.responsable_name, required: true},
        {type: tforms.fieldTypes.phone, name:tforms.names.personal_phones, label: tforms.titles.personal_phone, required: true},
        {type: tforms.fieldTypes.text,  legend: '(para tirar dúvidas e avisar quando a inclusão for aprovada)', subtype :tforms.names.registration_email, name: tforms.names.registration_email, label: tforms.titles.registration_email, required: true},
        {type: tforms.fieldTypes.checkbox, label: tforms.titles.declaration, name:tforms.names.authorize_information, otherField: false, required: true, values: [
          tforms.titles.authorize_information,
        ]}
      ]
    },
  ]
  }]
};

const productor: addPlaceForm = {
  stages:[{
    areas: [{
      fields: [
        {title: tforms.titles.who, required: true,  type: tforms.fieldTypes.radio, name:tforms.names.who, values: ['Proprietária/o ou responsável pelo local', 'Outro'],
        textField: {name: tforms.names.cpf, label: tforms.titles.cpf, mask: tforms.masks.cpf, required: false, activeWhen: ['Proprietária/o ou responsável pelo local']}},
      ]
    },{
      title: tforms.areaTitles.profile,
      subTitle: tforms.areaTitles.profileDesc,
      fields: [
        {type: tforms.fieldTypes.profile_picture, name: tforms.names.avatar, label: tforms.titles.profile_picture, required: false},
        {type: tforms.fieldTypes.image_repeater, name: tforms.names.local_pics, label: tforms.titles.local_pics, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.name, label: tforms.titles.name, required: true},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.address, label: tforms.titles.address, required: true},
        {type: tforms.fieldTypes.map, required: true,  name: tforms.names.map, label: tforms.titles.map, noPadding: true},
        {title: tforms.titles.shareAddress, type: tforms.fieldTypes.radio, name:tforms.names.shareAddress, values: ['Divulgar endereço (se vende na propriedade)', 'Manter endereço sigiloso (usar apenas para mapa)'], required: true},
        {type: tforms.fieldTypes.checkbox, otherField: true, name:tforms.names.product_list, title: 'O que produz para comercialização?*', required: true, values:
          [ 'Não comercializa',
            'Legumes e Verduras',
            'Raízes',
            'Frutas',
            'Grãos',
            'PANCs - Plantas alimentícias não convencionais',
            'Cogumelos',
            'Ovos',
            'Produção de Mel',
            'Laticínios',
            'Processados e Beneficiados (geleias, compotas, frutas desidratadas, etc.)',
            'Panificados',
            'Plantas Medicinais',
            'Bambu',
            'Plantas Ornamentais',
            'Mudas'
        ]},
        {title: tforms.titles.fruit_species, type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.fruit_species, label: 'Espécies', required: false},
        {type: tforms.fieldTypes.checkbox, otherField: true, name:tforms.names.where_find_list, title: tforms.titles.where_find_list, required: true, values:
          [ 'Não comercializa',
            'Na propriedade',
            'CEAGESP',
            'Associação, sindicato ou cooperativa',
            'Feiras Livres',
            'Restaurantes',
            'Quitandas ou mini-mercados',
            'Supermercados ou grandes empresas'
        ]},
        {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.who_sells_details, title: tforms.titles.who_sells_details, label: 'Descreva', required: false},
        {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.description, title: tforms.titles.profile_text, subtitle:tforms.titles.profile_textUpa, label: 'Descreva', required: false},

      ]
    }, {
      title: tforms.areaTitles.contactInfo,
      subTitle: tforms.areaTitles.contactDesc,
      fields: [
        {type: tforms.fieldTypes.phone_repeater, name:tforms.names.comercial_phone, label: tforms.titles.comercial_phone, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.email, name: tforms.names.email, label: tforms.titles.email, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.site, label: tforms.titles.site, required: false},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.contact, label: tforms.titles.contact, required: false},
      ]
    },
    {
      title: tforms.areaTitles.aditionalInfo,
      fields: [
        {type: tforms.fieldTypes.checkbox, name:tforms.names.certificates, title: tforms.titles.certificates, otherField: true, values: [
          'Turismo e vivência rural (recebe visitantes)',
          'Produção com Sistema Agroflorestal',
          'Orgânico por Auditoria',
          'IBD',
          'Orgânico Participativo',
          'SPG/ABD',
          'Orgânico OCS - Organização de Controle Social',
          'Protocolo de Transição Agroecológica',
        ]},
        {type: tforms.fieldTypes.radio, name:tforms.names.affiliation, title: tforms.titles.affiliation, yesNo: true,
        textField: {name: tforms.names.associativism, label: tforms.titles.associativism, required: true, activeWhen: ['Sim']}},
        {type: tforms.fieldTypes.radio, name:tforms.names.gender, title: tforms.titles.gender, values: tforms.genders,
          textField: {name: tforms.names.gender_other, label: t.other, required: true, activeWhen: ['Outro']}},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, mask: '00/0000', name:tforms.names.birthdate, label: tforms.titles.birthdate},
        {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.number, min: 0, name:tforms.names.cultivated_area, label: tforms.titles.cultivated_area, required: false},
        {type: tforms.fieldTypes.radio, name:tforms.names.family_work, title: tforms.titles.family_work, yesNo: true},
      ]
    },
    {
      title: tforms.areaTitles.personalInfo,
      subTitle: tforms.areaTitles.personalInfoDesc,
      fields:[
        {type: tforms.fieldTypes.checkbox, name:tforms.names.sameData, values: [tforms.titles.sameData]},
        {type: tforms.fieldTypes.text, min: 3, max: 100, subtype :tforms.fieldTypes.text, name:tforms.names.responsable_name, label: tforms.titles.responsable_name, required: true},
        {type: tforms.fieldTypes.phone, name:tforms.names.personal_phones, label: tforms.titles.personal_phone, required: true},
        {type: tforms.fieldTypes.text,  legend: '(para tirar dúvidas e avisar quando a inclusão for aprovada)', subtype :tforms.names.registration_email, name: tforms.names.registration_email, label: tforms.titles.registration_email, required: true},
        {type: tforms.fieldTypes.checkbox, label: tforms.titles.declaration, name:tforms.names.authorize_information, otherField: false, required: true, values: [
          tforms.titles.authorize_information,
        ]}
      ]
    },
  ]
  }]
};

const public_policies: addPlaceForm = {
  stages: [{
    areas: [{
      fields: [
        {title: tforms.titles.who, required: true, type: tforms.fieldTypes.radio, name:tforms.names.who, values: ['Responsável ou parte da equipe da política', 'Outro']},
    ]
  },
  {
    title: tforms.areaTitles.profile,
    subTitle: tforms.areaTitles.profileDesc,
    fields: [
      {type: tforms.fieldTypes.profile_picture, name: tforms.names.avatar, label: tforms.titles.profile_picture, required: false},
      {type: tforms.fieldTypes.image_repeater, name: tforms.names.local_pics, label: tforms.titles.local_pics, required: false},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.name, label: tforms.titles.name, required: true},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.address, label: tforms.titles.address, required: true},
      {type: tforms.fieldTypes.map, required: true,  name: tforms.names.map, label: tforms.titles.map, noPadding: true},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.product_list , label: 'Quais os serviços e/ou objetivos da política ou equipamento?*', required: true},
      {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.description, title: tforms.titles.profile_text, subtitle: 'Descreva o local e as principais características e atividades desenvolvidas (Atividades, diferenciais, serviços)', label: 'Descreva', required: false},
  ]
  },
  {title: tforms.areaTitles.contactInfo,
  subTitle: tforms.areaTitles.contactDesc,
  fields: [
    {type: tforms.fieldTypes.phone_repeater, hideType: true, name:tforms.names.comercial_phone, label: tforms.titles.phone, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.email, name: tforms.names.email, label: tforms.titles.email},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.site, label: tforms.titles.site, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.contact, label: tforms.titles.contact, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.schedule, label: tforms.titles.schedule, required: false},
  ]
},
{
  title: tforms.areaTitles.personalInfo,
  subTitle: tforms.areaTitles.personalInfoDesc,
  fields:[
    {type: tforms.fieldTypes.checkbox, name:tforms.names.sameData, values: [tforms.titles.sameData]},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.responsable_name, label: tforms.titles.responsable_name, required: true},
    {type: tforms.fieldTypes.phone, name:tforms.names.personal_phones, label: tforms.titles.personal_phone, required: true},
    {type: tforms.fieldTypes.text,  legend: '(para tirar dúvidas e avisar quando a inclusão for aprovada)', subtype :tforms.names.registration_email, name: tforms.names.registration_email, label: tforms.titles.registration_email, required: true},
    {type: tforms.fieldTypes.checkbox, name:tforms.names.authorize_information, label: tforms.titles.declaration, required: true, otherField: false, values: [
      tforms.titles.authorize_information,
    ]}
  ]
}]
}]
};

const assossiations: addPlaceForm = {
  stages: [{
    areas: [{
      fields: [
        {title: tforms.titles.who, required: true, type: tforms.fieldTypes.radio, name:tforms.names.who, values: ['Proprietária/o ou responsável pelo local', 'Outro'],
        textField: {name: tforms.names.cpf, label: tforms.titles.cpf, mask: tforms.masks.cpf, required: false, activeWhen: ['Proprietária/o ou responsável pelo local']}},
    ]
  },
  {
    title: tforms.areaTitles.profile,
    subTitle: tforms.areaTitles.profileDesc,
    fields: [
      {type: tforms.fieldTypes.profile_picture, name: tforms.names.avatar, label: tforms.titles.profile_picture, required: false},
      {type: tforms.fieldTypes.image_repeater, name: tforms.names.local_pics, label: tforms.titles.local_pics, required: false},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.name, label: tforms.titles.name, required: true},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.address, label: tforms.titles.address, required: true},
      {type: tforms.fieldTypes.map, required: true,  name: tforms.names.map, label: tforms.titles.map, noPadding: true},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.product_list, label: 'Quais os objetivos, serviços e principais atividades desenvolvidas?*', required: true},
      {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.description, title: tforms.titles.profile_text, subtitle: 'Descreva a organização e as principais características e atividades desenvolvidas (Atividades, pontos fortes, diferenciais, histórico, porque vale a pena participar)', label: 'Descreva', required: false},
  ]
  },
  {title: tforms.areaTitles.contactInfo,
  subTitle: tforms.areaTitles.contactDesc,
  fields: [
    {type: tforms.fieldTypes.phone_repeater, hideType: true, name:tforms.names.comercial_phone, label: tforms.titles.phone, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.email, name: tforms.names.email, label: tforms.titles.email},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.site, label: tforms.titles.site, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.contact, label: tforms.titles.contact, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.schedule, label: tforms.titles.schedule, required: false},
  ]
},
{
  title: tforms.areaTitles.personalInfo,
  subTitle: tforms.areaTitles.personalInfoDesc,
  fields:[
    {type: tforms.fieldTypes.checkbox, name:tforms.names.sameData, values: [tforms.titles.sameData]},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.responsable_name, label: tforms.titles.responsable_name, required: true},
    {type: tforms.fieldTypes.phone, name:tforms.names.personal_phones, label: tforms.titles.personal_phone, required: true},
    {type: tforms.fieldTypes.text,  legend: '(para tirar dúvidas e avisar quando a inclusão for aprovada)', subtype :tforms.names.registration_email, name: tforms.names.registration_email, label: tforms.titles.registration_email, required: true},
    {type: tforms.fieldTypes.checkbox, name:tforms.names.authorize_information, label: tforms.titles.declaration, required: true, otherField: false, values: [
      tforms.titles.authorize_information,
    ]}
  ]
}]
}]
};

const research: addPlaceForm = {
  stages: [{
    areas: [{
      fields: [
        {title: tforms.titles.who, required: true, type: tforms.fieldTypes.radio, name:tforms.names.who, values: ['Proprietária/o ou responsável pelo local', 'Outro'],
        textField: {name: tforms.names.cpf, label: tforms.titles.cpf, mask: tforms.masks.cpf, required: false, activeWhen: ['Proprietária/o ou responsável pelo local']}},
    ]
  },
  {
    title: tforms.areaTitles.profile,
    subTitle: tforms.areaTitles.profileDesc,
    fields: [
      {type: tforms.fieldTypes.profile_picture, name: tforms.names.avatar, label: tforms.titles.profile_picture, required: false},
      {type: tforms.fieldTypes.image_repeater, name: tforms.names.local_pics, label: tforms.titles.local_pics, required: false},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.name, label: tforms.titles.name, required: true},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.address, label: tforms.titles.address, required: true},
      {type: tforms.fieldTypes.map, required: true,  name: tforms.names.map, label: tforms.titles.map, noPadding: true},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.product_list, label: tforms.titles.activities, required: true},
      {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.description, title: tforms.titles.profile_text, subtitle: 'Descreva as principais assuntos tratados e atividades desenvolvidas (linhas, projetos, diferenciais, histórico, porque vale a pena conhecer e participar)', label: 'Descreva', required: false},
  ]
  },
  {title: tforms.areaTitles.contactInfo,
  subTitle: tforms.areaTitles.contactDesc,
  fields: [
    {type: tforms.fieldTypes.phone_repeater, hideType: true, name:tforms.names.comercial_phone, label: tforms.titles.phone, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.email, name: tforms.names.email, label: tforms.titles.email},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.site, label: tforms.titles.site, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.contact, label: tforms.titles.contact, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.schedule, label: tforms.titles.schedule, required: false},
  ]
},
{
  title: tforms.areaTitles.personalInfo,
  subTitle: tforms.areaTitles.personalInfoDesc,
  fields:[
    {type: tforms.fieldTypes.checkbox, name:tforms.names.sameData, values: [tforms.titles.sameData]},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.responsable_name, label: tforms.titles.responsable_name, required: true},
    {type: tforms.fieldTypes.phone, name:tforms.names.personal_phones, label: tforms.titles.personal_phone, required: true},
    {type: tforms.fieldTypes.text,  legend: '(para tirar dúvidas e avisar quando a inclusão for aprovada)', subtype :tforms.names.registration_email, name: tforms.names.registration_email, label: tforms.titles.registration_email, required: true},
    {type: tforms.fieldTypes.checkbox, name:tforms.names.authorize_information, label: tforms.titles.declaration, required: true, otherField: false, values: [
      tforms.titles.authorize_information,
    ]}
  ]
}]
}]
};

const civil_initiative: addPlaceForm = {
  stages: [{
    areas: [{
      fields: [
        {title: tforms.titles.who, required: true, type: tforms.fieldTypes.radio, name:tforms.names.who, values: ['Proprietária/o ou responsável pelo local', 'Outro'],
        textField: {name: tforms.names.cpf, label: tforms.titles.cpf, mask: tforms.masks.cpf, required: false, activeWhen: ['Proprietária/o ou responsável pelo local']}},
    ]
  },
  {
    title: tforms.areaTitles.profile,
    subTitle: tforms.areaTitles.profileDesc,
    fields: [
      {type: tforms.fieldTypes.profile_picture, name: tforms.names.avatar, label: tforms.titles.profile_picture, required: false},
      {type: tforms.fieldTypes.image_repeater, name: tforms.names.local_pics, label: tforms.titles.local_pics, required: false},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.name, label: tforms.titles.name, required: true},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.address, label: tforms.titles.address, required: true},
      {type: tforms.fieldTypes.map, required: true,  name: tforms.names.map, label: tforms.titles.map, noPadding: true},
      {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.product_list, label: tforms.titles.activities, required: true},
      {type: tforms.fieldTypes.textarea, rows: 4, name:tforms.names.description, title: tforms.titles.profile_text, subtitle: 'Descreva a iniciativa e as principais características e atividades desenvolvidas (Atividades, pontos fortes, diferenciais, histórico, como apoiar ou participar)', label: 'Descreva', required: false},
      {type: tforms.fieldTypes.radio, name:tforms.names.affiliation, title: tforms.titles.affiliation, yesNo: true,
      textField: {name: tforms.names.associativism, label: tforms.titles.associativism, required: true, activeWhen: ['Sim']}
    },
  ]
  },
  {title: tforms.areaTitles.contactInfo,
  subTitle: tforms.areaTitles.contactDesc,
  fields: [
    {type: tforms.fieldTypes.phone_repeater, hideType: true, name:tforms.names.comercial_phone, label: tforms.titles.phone, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.email, name: tforms.names.email, label: tforms.titles.email},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.site, label: tforms.titles.site, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.contact, label: tforms.titles.contact, required: false},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.schedule, label: tforms.titles.schedule, required: false},
  ]
},
{
  title: tforms.areaTitles.personalInfo,
  subTitle: tforms.areaTitles.personalInfoDesc,
  fields:[
    {type: tforms.fieldTypes.checkbox, name:tforms.names.sameData, values: [tforms.titles.sameData]},
    {type: tforms.fieldTypes.text, subtype :tforms.fieldTypes.text, name:tforms.names.responsable_name, label: tforms.titles.responsable_name, required: true},
    {type: tforms.fieldTypes.phone, name:tforms.names.personal_phones, label: tforms.titles.personal_phone, required: true},
    {type: tforms.fieldTypes.text, legend: '(para tirar dúvidas e avisar quando a inclusão for aprovada)', subtype :tforms.names.registration_email, name: tforms.names.registration_email, label: tforms.titles.registration_email, required: true},
    {type: tforms.fieldTypes.checkbox, name:tforms.names.authorize_information, label: tforms.titles.declaration, required: true, otherField: false, values: [
      tforms.titles.authorize_information,
    ]}
  ]
}]
}]
};

formData[t.tourism] = {};
formData[t.market] = {};
formData[t.farmer] = {}
formData[t.initiative] = {}

formData[t.market][t.idec_subcategories] = {};
formData[t.market][t.upa_services] = upa_services;
formData[t.market][t.organic_restaurants] = organic_restaurants;
formData[t.market][t.local_partner] = local_partner;

formData[t.tourism][t.rural_experience] = rural_experience;
formData[t.tourism][t.food] = tourism;
formData[t.tourism][t.culture] = tourism;
formData[t.tourism][t.services] = tourism;
formData[t.tourism][t.accommodation]= tourism;
formData[t.tourism][t.nature] = tourism;

formData[t.farmer][t.equiped_gardens] = gardens;
formData[t.farmer][t.urban_gardens_title] = gardens;
formData[t.farmer][t.guarani_productor] = guarani_productor;
formData[t.farmer][t.productor] = productor;

formData[t.initiative][t.public_policies] = public_policies;
formData[t.initiative][t.assossiations] = assossiations;
formData[t.initiative][t.research] = research;
formData[t.initiative][t.civil_initiative] = civil_initiative;

export const formFields = formData;
