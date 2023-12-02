import { Suspense } from 'react'

import Layout from './components/Layout'
import Loading from './components/Loading'
import Battery from './pages/Battery'

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Layout>
        <Battery/>
      </Layout>
    </Suspense>
  )
}

export default App
