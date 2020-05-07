import React from 'react';
import PropType from 'prop-types';

class Paginator extends React.Component {
  constructor(props) {
    super(props);
    const {records = [], limit, onPageChanged} = this.props;
    const total = Math.ceil(records.length / limit);
    this.state = {records, limit, onPageChanged, currentPage: 1, total: total};

    this.showPage = this.showPage.bind(this);
    this.createPages = this.createPages.bind(this);
    this.onClicked = this.onClicked.bind(this);
  }

  componentDidMount() {
    this.showPage(1);
  }

  render() {
    const pages = this.createPages();
    const {records, limit, currentPage, total} = this.state;
    const DISPLAY = `Page ${currentPage} of ${total}`;
    const offset = (currentPage - 1) * limit;
    const last = Math.min(currentPage * limit, records.length);
    const users = records.slice(offset, last);
    return (
      <React.Fragment>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.name.title}</td>
                <td>
                  {user.name.first} {user.name.last}
                </td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.dob.age}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={5}>
              {DISPLAY} &nbsp;
              {pages.map((page, i) => {
                return (
                  <button
                    type="button"
                    style={{padding: 10}}
                    onClick={(e) => this.onClicked(page, e)}
                    key={i}
                  >
                    {page}
                  </button>
                );
              })}
            </th>
          </tr>
        </tfoot>
      </React.Fragment>
    );
  }

  showPage(page) {
    if (isNaN(page)) {
      page = page === '<<' ? 1 : this.state.total;
    }
    this.setState({currentPage: page});
  }

  onClicked(page, e) {
    e.preventDefault();
    this.showPage(page);
  }

  createPages() {
    let pages = [];
    const {total, currentPage} = this.state;
    const start = Math.max(1, currentPage - 1);
    const stop = Math.min(total, currentPage + 2);
    for (let i = start; i <= stop; i++) {
      pages.push(i);
    }
    return ['<<', ...pages, '>>'];
  }
}

Paginator.prototypes = {
  records: PropType.Array,
  display: PropType.number,
  onPageChanged: PropType.func,
};

export default Paginator;
