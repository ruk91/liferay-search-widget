import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isSubmitted: false
    };
  }

  async getMovies() {
    const { isSubmitted } = this.state
    // try {
    //   const response = await fetch('https://reactnative.dev/movies.json');
    //   const json = await response.json();
    //   this.setState({ data: json.movies });
    // } catch (error) {
    //   console.log(error); 
    // } finally {
    //   this.setState({ isLoading: false });
    // }
    if (!isSubmitted) {

      fetch('https://marvel-services-travel-gateway-dev.azurewebsites.net/api/v1/accommodation/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "walletRef": "1_15",
          "memberEmailAddress": "chrisb@digital-trip.co.uk",
          "agentEmailAddress": "",
          "channelId": 696,
          "destination": {
            "codes": [
              "MAN"
            ],
            "id": "1145;MAN;1145",
            "type": "CentralGeo"
          },
          "monolithIDs": null,
          "starRating": 0,
          "rooms": 2,
          "accommodationType": "Any",
          "hotelName": "",
          "boardBasis": "Any",
          "roomAllocations": [
            {
              "idx": 0,
              "adults": 1,
              "teenagers": 0,
              "children": 0,
              "infants": 0,
              "childAges": null,
              "selectedRoomID": 0,
              "selectedRoomRateID": 0,
              "minBedrooms": 0
            },
            {
              "idx": 1,
              "adults": 2,
              "teenagers": 0,
              "children": 0,
              "infants": 0,
              "childAges": null,
              "selectedRoomID": 0,
              "selectedRoomRateID": 0,
              "minBedrooms": 0
            }
          ],
          "supplierFilter": "",
          "attributes": null,
          "isDynamicPackage": false,
          "langCode": "es",
          "operatingLocale": "",
          "affCode": "",
          "customerIP": "",
          "customerUA": "",
          "nationality": "GB",
          "dateFrom": "2021-08-09",
          "dateTo": "2021-08-11"
        }),
      })
        .then((res) => res.json())
        .then((res) => this.setState({ isSubmitted: true, data: res }))
        .catch((err) => console.log('error: ', err))
    }
  }

  render() {
    const { isSubmitted, data } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <form action="/" method="get" onSubmit={this.getMovies()}>
            <label htmlFor="header-search">
              <span className="visually-hidden">Search Widget</span>
            </label>
            <input
              type="text"
              id="header-search"
              placeholder="Search here..."
              name="s"
            />
            <button type="submit">Search</button>
          </form>
          {
            isSubmitted ?
              <div>
                <p>{data.guid}</p>
                <p>{data.threadsRemaining}</p>
                <p>{data.searchType}</p>
              </div>
              : <p>data fetching...</p>
          }

        </header>
      </div>
    );
  }
}

export default App;
