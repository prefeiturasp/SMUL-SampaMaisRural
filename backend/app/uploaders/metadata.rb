module Metadata
  SEAL = {
    title: {
      pointSize: 72,
      gravity: 'North',
      fill: '#3C983B',
      font: "#{Rails.root}/public/fonts/Lato-Bold.ttf",
      draw: "text 0,550 '%s'"
    },
    content: {
      pointsize: 72,
      gravity: 'South',
      fill: '#3C983B',
      font: "#{Rails.root}/public/fonts/Lato-Bold.ttf",
      draw: "text 0,850 '%s'"
    },
    bottom: {
      pointsize: 72,
      gravity: 'South',
      fill: '#3C983B',
      font: "#{Rails.root}/public/fonts/Manrope-VariableFont_wght.ttf",
      draw: "text 0,610 '%s'"
    },
    image: {
      gravity: 'South',
      draw: "image Over 0,280 232,232 '%s'"
    }
  }
end


