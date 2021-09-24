import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import SummaryForm from './pages/SummaryForm/SummaryForm'
import OrderSummary from './pages/OrderSummary/OrderSummary'
import { OrderDetailsProvider } from './context/OrderDetails.context'

function App() {
  return (
    <OrderDetailsProvider>
      <BrowserRouter>
        <Switch>
          <Route path='/summary-form'>
            <SummaryForm />
          </Route>
          <Route path='/order-summary'>
            <OrderSummary />
          </Route>
        </Switch>
      </BrowserRouter>
    </OrderDetailsProvider>
  )
}

export default App
