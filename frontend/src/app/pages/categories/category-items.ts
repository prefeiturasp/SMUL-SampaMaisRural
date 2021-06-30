
import { t, tforms } from '../../utils/translate';

const items= {};

const initiatives = [{
  title: t.public_policies,
  desc: 'Conheça as políticas públicas da Prefeitura de São Paulo para a promoção do desenvolvimento rural sustentável e solidário e da segurança alimentar e nutricional da população.',
  name: 'public_policies',
  img: '/assets/svgs/iniciativas/politicas-publicas.svg',
  link: t.url.initiatives,
  externalLink: '',

},{
  title: t.assossiations,
  desc: 'Associações e cooperativas de agricultores oferecem as melhores formas de aquisição de alimentos das zonas rurais. Além disso, estão presentes associações representativas das pautas ambientais e rurais existentes na cidade. Conheça e contate-os.',
  name: 'associations',
  img: '/assets/svgs/iniciativas/associacoes-e-cooperativas.svg',
  link: t.url.initiatives,
  externalLink: ''
},
{
  title: t.civil_initiative,
  desc: 'Conheça pequenas iniciativas comunitárias, coletivos, ONGs, institutos e negócios de impacto social que trabalham pelo desenvolvimento rural sustentável e solidário, a agroecologia, a segurança alimentar e nutricional da população, e a educação ambiental.',
  name: 'civil_society',
  img: '/assets/svgs/iniciativas/iniciativas.svg',
  link: t.url.initiatives,
  externalLink: '',
},
{
  title: t.research,
  desc: 'As universidades e iniciativas de pesquisa são importantes atores para a construção de conhecimento sobre as zonas rurais e a cadeia do alimento. Estão aqui reunidas iniciativas que se dedicam a construir e a difundir esses saberes.',
  name: 'research',
  img: '/assets/svgs/iniciativas/pesquisa-extensao.svg',
  link: t.url.initiatives,
  externalLink: ''
}];

const market = [
  {
    title: t.local_partner,
    desc: 'Estabelecimentos que vendem produtos das zonas rurais da cidade.',
    name: 'with_local_partners',
    img: '/assets/svgs/comercio/comercio-parceiro-de-organicos.svg',
    link: t.url.fairs,
    apiFieldValue: 'Parceiro da produção de Sampa',
    externalLink: '',
    category: 'market'
  },
  {
    title: t.free_market,
    desc: 'Organizadas pela Prefeitura, as tradicionais feiras livres são opção para quem deseja comprar artigos hortifrutigranjeiros, pescados e muito mais. Conheça aquelas que estão perto de você!',
    name: 'free',
    img: '/assets/svgs/comercio/feiras-livres.svg',
    link: t.url.fairs,
    field: 'subcategory_list',
    apiFieldValue: 'Feiras Livres Municipais',
    externalLink: ''
  },
  {
    title: t.organic_markets,
    desc: 'Feiras públicas e privadas de comercialização de produtos orgânicos.',
    name: 'organic',
    img: '/assets/svgs/comercio/feiras-organicas.svg',
    link: t.url.fairs,
    apiFieldValue: 'Feiras Orgânicas',
    externalLink: 'https://feirasorganicas.org.br/o-que-e/'
  },
  {
    title: t.organic_commerce,
    desc: 'Iniciativas que ocorrem diretamente entre consumidores e agricultores ou com apenas um intermediário. Essa relação deve ser transparente e justa, com preços que atendam as necessidades de todos os envolvidos.',
    name: 'with_organic_partner',
    img: '/assets/svgs/comercio/comercio-parceiro-de-organicos.svg',
    link:t.url.fairs,
    externalLink: 'https://feirasorganicas.org.br/criterios-comercio-parceiro-de-organicos/'
  },
  {
    title: t.agriculture_support_community,
    desc: 'Iniciativas de consumidores organizados que se aproximam de produtores e, juntos, propõem comprar produtos contemplando questões sociais, ambientais e de saúde, da produção até o consumo. Incluem as Comunidades que Sustentam a Agricultura (CSAs).',
    name: 'with_agriculture_support',
    img: '/assets/svgs/comercio/CSAs.svg',
    link: t.url.fairs,
    apiFieldValue: 'Grupo de Consumo Responsável',
    externalLink: 'https://institutokairos.net/2015/05/acervo-sobre-grupos-de-consumo-responsavel/'
  },
  {
    title: t.organic_restaurants,
    desc: 'Restaurantes que utilizam em seus pratos produtos orgânicos, agroecológicos e da Agricultura Familiar.',
    name: 'with_organic_ingredients',
    img: '/assets/svgs/comercio/Restaurantes-organico.svg',
    link: t.url.fairs,
    externalLink: t.url.fairs
},{
  title: t.food_delivery,
  desc: 'Mercados e serviços de entrega de alimentos orgânicos',
  name: 'food_delivery',
  img: '/assets/svgs/comercio/CSAs.svg',
  link: t.url.fairs,
  apiFieldValue: t.food_delivery,
  externalLink: '',
  category: 'market'
}];

const tourism = [{
  title: t.rural_experience,
  desc: 'Tenha contato com a realidade rural e agrícola de São Paulo, bem como com os produtores! Conheça propriedades familiares que oferecem almoço, colhe-pague, excursões escolares e muito mais.',
  name: 'rural_experience',
  img: '/assets/svgs/turismo/vivencia-rural.svg',
  link: t.url.touristic_point,
  externalLink: ''
},
{
  title: t.nature,
  desc: 'Conheça os exuberantes atrativos naturais das regiões, como cachoeiras e parques naturais! Contate agências de turismo para experimentar atrativos de aventura, como rafting e trilhas.',
  name: 'nature',
  img: '/assets/svgs/turismo/natureza.svg',
  link: t.url.touristic_point,
  externalLink: ''
},
{
  title: t.culture,
  desc: 'As zonas rurais têm uma rica e diversa identidade cultural. Conheça os eventos, patrimônios culturais, templos religiosos e galerias de arte.',
  name: 'culture',
  img: '/assets/svgs/turismo/cultura.svg',
  link: t.url.touristic_point,
  externalLink: ''
},
{
  title: t.food,
  desc: 'Uma boa comida é algo essencial para que uma viagem ou passeio se torne inesquecível. Aqui você encontra opções de almoço caipira, botecos, restaurantes, pesqueiros e cafés.',
  name: 'food',
  img: '/assets/svgs/turismo/alimentacao.svg',
  link: t.url.touristic_point,
  externalLink: ''
},
{
  title: t.accommodation,
  desc: 'Campings, pousadas, hotéis ou alojamentos estudantis - não faltam opções de hospedagem',
  name: 'accommodation',
  img: '/assets/svgs/turismo/hospedagem.svg',
  link: t.url.touristic_point,
  externalLink: ''
},
{
  title: t.services,
  desc: 'Encontre as agências e operadores de turismo que atuam na região para uma visita completa. Além disso, conheça o comércio local de antiquários e artesanatos, além de chácaras de lazer para passar o dia ou alugar para eventos.',
  name: 'services',
  img: '/assets/svgs/turismo/comercio-e-servicos.svg',
  link: t.url.touristic_point,
  externalLink: ''
}];

const covid = [{
  title: t.contact_farmers,
  desc: 'Você é um estabelecimento que compra alimentos frescos? Compre diretamente de produtores locais!',
  name: 'farmers_with_contact',
  img: '/assets/svgs/agricultura/hortalicas-e-raizes.svg',
  link: t.url.explore,
  externalLink: '',
  category: 'upa'

},{
  title: t.food_delivery,
  desc: 'Mercados e serviços de entrega de alimentos orgânicos',
  name: 'deliver_food',
  img: '/assets/svgs/comercio/CSAs.svg',
  link: t.url.explore,
  apiFieldValue: t.food_delivery,
  externalLink: '',
  covid: true,
  category: 'market'
},
{
  title: t.local_partner,
  desc: 'Estabelecimentos que vendem produtos das zonas rurais da cidade.',
  name: 'with_local_partners',
  img: '/assets/svgs/comercio/comercio-parceiro-de-organicos.svg',
  link: t.url.explore,
  apiFieldValue: 'Parceiro da Produção Local',
  externalLink: '',
  category: 'market'
}];

items[t.initiatives.toLowerCase()] = initiatives;
items[t.fairs.toLowerCase()] = market;
items[t.touristic_point.toLowerCase()] = tourism;
items[t.covid.toLowerCase()] = covid;

export function feedCounters(page, data){
  let counters = [];
  for(let item of items[page]){
    counters.push({
      title: item.title,
      desc: item.desc,
      count: data[item.name],
      img: item.img,
      covid: item.covid,
      category: item.category,
      apiFieldValue: item.apiFieldValue,
      field: item.field || tforms.names.subcategory_list,
      link: item.link,
      externalLink: item.externalLink
    });
  }
  return counters;
}

let desc = {};

const coronaDesc = 'Dado o momento de pandemia que estamos vivendo, a Sampa+Rural se adequou para <b>divulgar iniciativas relacionadas à alimentação que estão acontecendo na cidade de São Paulo.</b> Aqui você irá encontrar informações sobre a Ação Cidade Solidária, pacto social entre a Prefeitura e sociedade civil para arrecadar e entregar doações a famílias carentes, mercados que estão trabalhando com entregas em domicílio, e contato de agricultores da cidade, <b>fortalecendo, assim, o sistema de distribuição local.</b>';
const descUpa = `Nem todo mundo sabe, mas um terço do território da cidade de São Paulo é rural. Nestas áreas, produtores agrícolas que em sua maioria trabalham em pequenas unidades de agricultura familiar, produzem hortaliças, frutas, legumes e plantas ornamentais, parte deles orgânicos e em transição agroecológica. A presença da agricultura no território contribui para minimizar o avanço da urbanização e preservar uma imensa área que guarda florestas nativas e mananciais de água. Também estão nessas áreas as duas terras indígenas da cidade, onde os Guarani, protetores originários desses territórios, mantêm suas tradições e cultura. Na área urbana, existem diversas iniciativas de cultivo em hortas urbanas comunitárias, parques, escolas e UBSs - em espaços públicos e privados. Conheça um pouco mais a produção agrícola e a zona rural da cidade!`
const descmarket = `A produção agrícola de São Paulo abastece diversos pontos da cidade, numa complexa cadeia de distribuição. Aqui você pode conhecer um pouco mais sobre os locais que comercializam a produção de agricultores da cidade, destacados como “Parceiros da produção local”; aqueles que praticam o comércio justo de orgânicos, a partir de uma relação mais direta e transparente com agricultores; informações sobre todas as feiras orgânicas e feiras livres existentes no município, além de descobrir restaurantes que utilizam alimentos orgânicos. Para agricultores, além da possibilidade de encontrarem potenciais compradores, há informações específicas sobre onde encontrar serviços e produtos para a produção agrícola. Quando você compra produtos locais e que dão melhores condições para quem produz, você fortalece agricultores e ajuda a preservar a qualidade ambiental da cidade!`;
const descTourism = `São Paulo não é só concreto e arranha-céus. Muita natureza, vivência rural e ecoturismo fazem parte dos atrativos do território para visitantes e moradores da cidade. Explore as possibilidades existentes nos dois Pólos de Ecoturismo do Município; visite unidades de produção agrícola e conheça um pouco do dia a dia destes agricultores; descubra cachoeiras, reservas e parques naturais, além dos serviços de hospedagem e alimentação. Escolha seu roteiro, conheça o improvável da cidade!
<br /><a class="link" target="_blank" href="http://www.cidadedesaopaulo.com/ecoturismo/">Conheça também o Portal do Pólo de Ecoturismo de Parelheiros</a>`;
const descInitiative = `Muitas pessoas e organizações trabalham por uma cidade ambientalmente preservada e socialmente justa. Estão aqui reunidas iniciativas que abordam os temas ligados ao desenvolvimento rural sustentável e solidário, à agroecologia e à segurança alimentar e nutricional da população. Em ‘Políticas Públicas’, saiba mais sobre locais como as Casas de Agricultura Ecológica, que prestam assistência técnica a agricultores, o TEIA de Parelheiros e a Escola de Agroecologia. As Associações sem fins lucrativos, cooperativas, empresas de impacto social e outras iniciativas da sociedade civil cumprem também um importante papel nesse esforço conjunto, com atuação em diversas frentes. Você poderá descobrir, ainda, grupos de pesquisa e extensão que trabalham com esses temas na cidade. Muitas dessas iniciativas estão abertas à participação e colaboração. Inspire-se e engaje-se!`;

desc[t.url.corona] = coronaDesc;
desc[t.categoryName.upa.toLowerCase()] = descUpa;
desc[t.categoryName.market.toLowerCase()] = descmarket;
desc[t.categoryName.initiative.toLowerCase()] = descInitiative;
desc[t.categoryName.tourism.toLowerCase()] = descTourism;

export const descCategories = desc;
