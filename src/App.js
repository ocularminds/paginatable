import React from 'react';
import Paginator from './paginator';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: [], error: '', loading: false};
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  load() {
    this.setState({loading: true});
    fetch('https://randomuser.me/api/?results=500')
      .then((response) => response.json())
      .then((data) => this.setState({users: data.results, loading: false}))
      .catch((e) => this.setState({error: e, loading: false}));
  }

  render() {
    const {users, loading} = this.state;
    if (users.length === 0) return null;
    if (loading)
      return (
        <center>
          <br />
          <br />
          <h1>...loading</h1>
        </center>
      );
    return (
      <div>
        <h1> Random Users</h1>
        <table width={800} border={1} cellSpacing={0} cellPadding={0}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>
          <Paginator records={users} limit={10} />
        </table>
      </div>
    );
  }
}

export default App;
