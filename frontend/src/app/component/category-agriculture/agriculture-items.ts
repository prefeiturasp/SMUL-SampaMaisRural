import { t, tforms } from '../../utils/translate';

export function valueOrNull(value){
  return value? Math.round(value) : 0;
}

export function getAgricultureItems(info){
 return {
    ProdUnit: {
      title: t.agricultural_production,
      count: info.farmers,
      img: '/assets/svgs/circle-green.svg',
      link: t.url.farmers,
      filters: [
        {field: 'subcategory_list', value: t.contact_farmers},
        {field: 'subcategory_list', value: t.without_contact_farmers},
      ],
      info: [
        {title: 'Sul', data: valueOrNull(info.south)},
        {title: 'Leste', data: valueOrNull(info.east)},
        {title: 'Norte', data: valueOrNull(info.north)}
      ]
    },
    nativeLands: {
      title: t.guarani,
      count: valueOrNull(info.natives),
      field: tforms.names.subcategory_list,
      img: '/assets/svgs/circle-yellow.svg',
      link: t.url.farmers
    },
    ProdUnitAgr: {
      title: t.with_contact,
      count: valueOrNull(info.farmers_with_contact),
      apiFieldValue: 'Agricultores com contato',
      field: 'subcategory_list',
      img: '/assets/svgs/circle-green.svg',
      link: t.url.farmers
    },
    UrbanGardens: {
      title: t.urban_gardens,
      count: valueOrNull(info.urban_gardens),
      field: tforms.names.subcategory_list,
      img: '/assets/svgs/circle-lines.svg',
      link: t.url.farmers
    },
    PublicGardenEquiped: {
      title: t.equiped_gardens,
      count: valueOrNull(info.gardens_with_equipments),
      field: tforms.names.subcategory_list,
      img: '/assets/svgs/circle-lines.svg',
      link: t.url.farmers
    },
    WomenLedUnits: {
      title: t.headed_by_women,
      count: valueOrNull(info.headed_by_women),
      img: '/assets/svgs/agricultura/mulher.svg',
      desc: 'Mulheres responsáveis pela unidade de produção no Cadastro Municipal das UPAs.'
    },
    FamilyAgriculture: {
      title: t.family_kind,
      count: valueOrNull(info.family_work),
      img: '/assets/svgs/agricultura/familiar.svg',
      desc: 'Propriedades com até 20 Ha com mão de obra predominantemente familiar. Somente 10% dos produtores possuem a DAP, documento que formaliza a agricultura familiar.',
      link: t.url.farmers,
      field: 'family_work',
      apiFieldValue: true,
    },
    VegetablesAndRoots: {
      title: t.roots,
      count: valueOrNull(info.roots),
      img: '/assets/svgs/agricultura/hortalicas-e-raizes.svg',
      link: t.url.farmers,
      field: tforms.names.product_list,
      filters: [
        {field: 'produces_vegetables', value: true },
        {field: 'subcategory_list', value: t.contact_farmers},
        {field: 'subcategory_list', value: t.without_contact_farmers}
      ],
      percentage: valueOrNull(info.roots_percentage)
    },
    Ornamentals: {
      title: t.ornamentals,
      count: valueOrNull(info.ornamental),
      img: '/assets/svgs/agricultura/ornamentais.svg',
      link: t.url.farmers,
      filters: [
        {field: 'product_list', value: t.ornamentals},
        {field: 'subcategory_list', value: t.contact_farmers},
        {field: 'subcategory_list', value: t.without_contact_farmers}
      ],
      percentage: valueOrNull(info.ornamental_percentage)
    },
    Fruits: {
      title: t.fruits,
      count: valueOrNull(info.fruits),
      img: '/assets/svgs/agricultura/frutas.svg',
      link: t.url.farmers,
      filters: [
        {field: 'produces_fruits', value: true },
        {field: 'subcategory_list', value: t.contact_farmers},
        {field: 'subcategory_list', value: t.without_contact_farmers}
      ],
      percentage: valueOrNull(info.fruits_percentage)
    },
    Others: {
      title: t.others_a,
      count: valueOrNull(info.others),
      img: '/assets/svgs/agricultura/outros.svg',
      link: t.url.farmers,
      filters: [
        {field: 'other_production', value: true},
        {field: 'subcategory_list', value: t.contact_farmers},
        {field: 'subcategory_list', value: t.without_contact_farmers}
      ],
      apiFieldValue: true,
      percentage: valueOrNull(info.others_percentage)
    },
    CertifiedOrganic: {
      title: t.organic_certified,
      filters: [
        {field: 'qualification_list', value: 'Orgânico Participativo'},
        {field: 'qualification_list', value: 'Orgânico por Auditoria'},
        {field: 'qualification_list', value: 'Orgânico OCS - Organização de Controle Social'},
        {field: 'qualification_list', value: 'Protocolo de Transição Agroecológica'},
        {field: tforms.names.subcategory_list, value: t.contact_farmers},
        {field: 'subcategory_list', value: t.contact_farmers}
      ],
      link: t.url.farmers,
      count: valueOrNull(info.organic),
      img: '/assets/images/organico_part.jpg',
      percentage: valueOrNull(info.organic_percentage),
      info: [
        {title: 'Sistema Participativo', data: valueOrNull(info.participatory_system)},
        {title: 'Auditoria', data: valueOrNull(info.audit)},
        {title: 'Organização de controle social', data: valueOrNull(info.organization)}
      ]
    },
    AgroecologicalTransition: {
      title: t.in_organic_transition,
      count: valueOrNull(info.in_organic_transition),
      img: '/assets/images/transicao-agroecologica.png',
      desc: 'UPAs com Protocolo de Transição Agroecológica, política estadual de fomento à transição para produção orgânica.',
      externalLink: 'https://www.codeagro.sp.gov.br/transicao-agroecologica/introducao',
      percentage: valueOrNull(info.in_organic_transition_percentage)
    }
  }
}

export function feedCharts(info){
  return {
    chartAgeProfile : {
      title: t.age_profile,
      desc: 'Idade dos responsáveis pela unidade de produção no Cadastro Municipal das UPAs.',
      chartData: [
        {percentage: valueOrNull(info.age_first_level), title: '18 a 35 anos'},
        {percentage: valueOrNull(info.age_middle_level), title: '35 a 60 anos'},
        {percentage: valueOrNull(info.age_last_level), title: '60+ anos'}
      ]
    },
    cutivatedArea: {
      title: t.cultivated_size,
      desc: 'Estimativa do porte de produção, soma as áreas de culturas temporárias e perenes nas UPAs.',
      chartData: [
        {percentage: valueOrNull(info.area_less_than), title: 'Menos de 0,1ha'},
        {percentage: valueOrNull(info.area_between), title: 'Entre 0,1 e 5ha'},
        {percentage: valueOrNull(info.area_larger_then), title: 'Mais de 5ha'},
      ]
    }
  }
}
