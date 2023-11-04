import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { store } from './store/index.ts'
import './index.css'
import { router } from './router/router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ReduxProvider store={store}>
		<RouterProvider router={router} />
		<ToastContainer autoClose={1500} position='bottom-left' theme='light' closeOnClick />
	</ReduxProvider>
)
