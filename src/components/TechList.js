import React, { Component } from "react";
import TechItem from "./TechItem";
class TechList extends Component {
  state = {
    newTech: "",
    techs: [],
  };

  // Executado assim que é montado em tela
  componentDidMount() {
    const techs = localStorage.getItem("techs");
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  // Executado sempre que houver update  nas props ou estado
  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  // Executado quando o componente deixa de existir
  componentWillUnmount() {}

  handleInputChange = (e) => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    return this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: "",
    });
  };

  handleDelete = (tech) => {
    return this.setState({ techs: this.state.techs.filter((t) => t !== tech) });
  };

  render() {
    return (
      <>
        <ul>
          {this.state.techs.map((tech, index) => (
            <TechItem
              onDelete={() => this.handleDelete(tech)}
              tech={tech}
              key={index}
            />
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newTech}
            placeholder="Input tech"
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
      </>
    );
  }
}

export default TechList;
