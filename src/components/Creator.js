import React, { Component } from 'react';
import ApiService from '../services/ApiService';

class Creator extends Component {

  constructor(props) {

    super(props);
    this.state = {
      surveyName: '',
      warningSelector: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.createSurvey = this.createSurvey.bind(this);

  }

  handleChange(event) {

    this.setState({surveyName: event.target.value});

  }

  async createSurvey() {

    this.setState({warningSelector: 0});

    if (this.state.surveyName.length < 3) {

      this.setState({warningSelector: 1});

      return;

    } else if (this.props.surveys.find(item => {return item.Name === this.state.surveyName})) {

      this.setState({warningSelector: 2});

      return;

    }

    let response = await ApiService.createSurvey(this.state.surveyName);

    console.log(response);

    if (response.ID > 0) {

      this.props.updateList();

    } else {

      this.setState({warningSelector: 3});

    }

  }

  render() {
    return (
      <div className="creator">
        <div className="form-group">
            <label htmlFor="surveyName">{this.props.tagList._SURVEY_NAME}</label>
            <input type="text" className="form-control" id="surveyName" maxLength="32" value={this.state.surveyName} onChange={this.handleChange}></input>
        </div>
        <button className="btn btn-dark" onClick={this.createSurvey}>{this.props.tagList._CREATE}</button>
        { this.state.warningSelector === 1 && <h3>{this.props.tagList._WARN_3_CHAR}</h3> }
        { this.state.warningSelector === 2 && <h3>{this.props.tagList._WARN_DUPLICATION}</h3> }
        { this.state.warningSelector === 3 && <h3>{this.props.tagList._WARN_UNSUCCESS}</h3> }
      </div>
    );
  }
}

export default Creator