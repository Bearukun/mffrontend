import React, { Component } from 'react'
import { observer } from "mobx-react";
import statsStore from "../stores/statsStore";

const Stats = observer(
  class Stats extends Component {

    componentWillMount() {
      /*
       This will fetch data each time you navigate to this route
       Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
       */
      statsStore.getStats();
    }

    render() {

      var games = statsStore.stats.games.map((game) => {
        var statsForm = [];

        for (var key in game.stats) {
          if (game.stats.hasOwnProperty(key)) {
            statsForm.push(
              <h6>Stats in {key} </h6>
            );
            for (var keyChild in game.stats[key]) {

              //Check if the object is an array, then it need to handled specially
              if (game.stats[key][keyChild].constructor.name === "ObservableArray") {
                statsForm.push(
                  <h4>{keyChild}: </h4>
                );
                statsForm.push(game.stats[key][keyChild].map(session => {
                  var retObj = []
                  for (var key in session) {
                    retObj.push(
                      <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">{key}</label>
                        <div className="col-sm-8">
                          <input type="text" readOnly className="form-control-plaintext" id="statValue" value={session[key]} />
                        </div>
                      </div>
                    )
                  }
                  return retObj;
                }));
              } else {
                statsForm.push(
                  <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">{keyChild}</label>
                    <div className="col-sm-8">
                      <input type="text" readOnly className="form-control-plaintext" id="statValue" value={game.stats[key][keyChild]} />
                    </div>
                  </div>
                );
              }
            }
          }
        }

        return (
          <div>
            <h4>Stats for {game.name} </h4>
            {statsForm}
          </div>
        )
      })

      return (
        <div>
          <div className="container">
            <form>
              {games}
            </form>
          </div>
        </div>
      )
    }
  }
)
export default Stats;