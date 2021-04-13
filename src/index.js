import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Evenement from './evenement';

const apiUri = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';

class App extends React.Component {
  constructor(props) {
    super(props);
    // getData();
    this.state = {
      events: [],
      inputSearchValue: '',
    };

    this.onTodoChange = this.onTodoChange.bind(this);
    this.getResult = this.getResult.bind(this);
  }

  componentDidMount() {
    axios.get(apiUri)
      .then((data) => {
        this.setState({
          events: data.data.records,
        });
      });
  }

  onTodoChange(value) {
    this.setState({
      inputSearchValue: value,
    });
    console.log(value);
  }

  getResult() {
    const { inputSearchValue } = this.state;

    if (!inputSearchValue) {
      console.log('Il ny a rien dans rechecher');
    } else {
      axios.get(`${apiUri}`, {
        params: {
          q: inputSearchValue,
        },
      })
        .then((data) => this.setState({
          events: data.data.records,
        }));
    }
  }

  render() {
    const { events } = this.state;

    return (
      <div>
        <h1 htmlFor="tilte-bar">Rechercher par mots clé</h1>
        <br />
        <input type="text" className="" placeholder="Recherche un evenement" onChange={(e) => this.onTodoChange(e.target.value)} />
        <br />
        <button type="button" className="" onClick={() => this.getResult()}>Rechercher</button>

        {events.map((element) => (<Evenement titre={element.fields.title} />)) }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
