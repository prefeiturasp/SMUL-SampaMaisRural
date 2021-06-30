const weight: number = 2;
const parkWeight: number = 4;
const spWeight: number = 3;
const fillColor: string = 'transparent';
const noBorder: string = 'transparent';
const opacity: string = '0.8';
const green: string = '#3F993F';
const yellow: string = '#FFA129';
const gray: string = '#73767A';

export const shapeStyles = {
  'none': {
    "color": noBorder,
    "weight": weight,
    "fillColor": fillColor
  },
  'park': {
    "color": yellow,
    "weight": parkWeight,
    "fillColor": fillColor,
    "dashArray": '1, 10', 
    "dashOffset": '5',
    "pane": 'park'
  },
  'native-lands': {
    "color": noBorder,
    "weight": weight,
    "fillOpacity": opacity,
    "fillColor": yellow,
    "pane": 'native-lands'
  },
  'rural-zone': {
    "color": noBorder,
    "weight": weight,
    "fillOpacity": opacity,
    "fillColor": green,
    "pane": 'rural-zone'
  },
  'city': {
    "color": gray,
    "weight": spWeight,
    "fillColor": fillColor,
    "pane": 'city'
  }
};
