const DataCleaner = {
  getSetTitle: (set) => {
    return set.text.title.full.set.default.content
  },

  getSetItems: (items) => {
    return items.map(item => {
      const cleanItem = {}

      if (item.type === 'DmcVideo') {
        cleanItem.type = 'program'
      } else if (item.type === 'DmcSeries') {
        cleanItem.type = 'series'
      } else if (item.type === 'StandardCollection') {
        cleanItem.type = 'collection'
      }

      cleanItem.title = item.text.title.full[cleanItem.type].default.content

      // imageUrl
      let image = item.image.tile['1.78']
      if (image.default) {
        cleanItem.imgUrl = image.default.default.url
      } else if (image[cleanItem.type]) {
        cleanItem.imgUrl = image[cleanItem.type].default.url
      }

      if (item.videoArt && item.videoArt.length) {
        cleanItem.videoUrl = item.videoArt[0].mediaMetadata.urls[0].url
      }

      if (cleanItem.type !== 'collection') {
        cleanItem.availability = item.currentAvailability
        cleanItem.rating = item.ratings[0].value
        cleanItem.releaseDate = item.releases[0].releaseDate
      }
      
      return cleanItem
    })
  }
}

export default DataCleaner