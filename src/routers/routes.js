import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CardList } from "../components/CardList";
import { Header } from "../components/Header";
import { Statistics } from "../components/Statistics";

export function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={CardList} />
        <Route path="/statistics" component={Statistics} />
      </Switch>
    </BrowserRouter>
  );
}
