import React from "react";
import Card from "core/components/Card";

export default class AboutPage extends React.Component {
  componentDidMount() {
    document.title = "Sinnott";
  }

  render() {
    return (
      <Card>
        <h1>I'm Daniel Sinnott</h1>
        <p>
          I'm a software developer, thought leader, boxer, mascot, astronaut,
          imitation Krusty, baby proofer, trucker, hippie, plow driver, food
          critic, conceptual artist, grease salesman, carny, mayor, drifter,
          bodyguard for the mayor, country western manager, garbage
          commissioner, mountain climber, farmer, inventor, Smithers, Poochie,
          celebrity assistant, power plant worker, fortune cookie writer, beer
          baron, Kwik-E-Mart clerk, missionary and Simpson's fan.
        </p>
        <p>
          This App has been created to curate various works & to challenge
          myself each month. The goal is progressively enhance this site and to
          blog about what I did, how I did it & what I learned from it.
        </p>
      </Card>
    );
  }
}
