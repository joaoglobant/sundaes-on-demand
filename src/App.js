import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import SummaryForm from './pages/SummaryForm/SummaryForm'
import OrderSummary from './pages/OrderSummary/OrderSummary'

function App() {
  return (
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
  )
}

export default App
