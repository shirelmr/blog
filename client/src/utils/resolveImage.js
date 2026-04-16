const assetModules = import.meta.glob('../assets/*.{png,jpg,jpeg,svg,webp,gif}', {
  eager: true,
  import: 'default'
})

export function resolveImage(imagePath) {
  if (!imagePath) {
    return ''
  }

  if (/^(https?:)?\/\//.test(imagePath) || imagePath.startsWith('/')) {
    return imagePath
  }

  const fileName = imagePath.split('/').pop()

  if (!fileName) {
    return imagePath
  }

  const matchedAsset = Object.entries(assetModules).find(([path]) => path.endsWith('/' + fileName))

  return matchedAsset ? matchedAsset[1] : imagePath
}