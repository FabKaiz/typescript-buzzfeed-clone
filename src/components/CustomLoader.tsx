import ContentLoader from 'react-content-loader'

const CustomLoader = () => {
  return (
    <>
      <ContentLoader speed={2} width={600} height={600}>
        <rect x="0" y="100" rx="5" ry="5" width="600" height="160" />
        <rect x="0" y="270" rx="5" ry="5" width="295" height="140" />
        <rect x="300" y="270" rx="5" ry="5" width="300" height="140" />

        <rect x="0" y="420" rx="5" ry="5" width="295" height="140" />
        <rect x="300" y="420" rx="5" ry="5" width="300" height="140" />
      </ContentLoader>
    </>
  )
}

export default CustomLoader
