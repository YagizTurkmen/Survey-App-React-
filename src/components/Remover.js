import React, { Component } from 'react';
import ApiService from '../services/ApiService';

class Remover extends Component {

  constructor(props) {

    super(props);
    this.state = {
      surveyName: '',
      warningSelector: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.removeSurvey = this.removeSurvey.bind(this);

  }

  handleChange(event) {

    this.setState({ surveyName: event.target.value });

  }

  async removeSurvey() {

    this.setState({ warningSelector: 0 });

    if (this.state.surveyName !== this.props.survey.Name) {

      this.setState({ warningSelector: 1 });

      return;

    } 

    let response = await ApiService.deleteSurvey(this.props.survey.ID);

    if (response.ID === this.props.survey.ID && response.Name === this.props.survey.Name) {
      
      this.props.updateList();
      
    } else {
      
      this.setState({ warningSelector: 2 });
    
    }

  }

  render() {

    return (
      <div className="creator">
        <div className="form-group">
          <label htmlFor="surveyName">{this.props.tagList._SURVEY_NAME}</label>
          <input type="text" className="form-control" id="surveyName" maxLength="32" value={this.state.surveyName} onChange={this.handleChange}></input>
        </div>
        <button className="btn btn-dark" onClick={this.removeSurvey}>{this.props.tagList._REMOVE}</button>
        {this.state.warningSelector === 1 && <h3>{this.props.tagList._WARN_WRONG_NAME}</h3>}
        {this.state.warningSelector === 2 && <h3>{this.props.tagList._WARN_UNSUCCESS}</h3>}
      </div>
    );
  }

}

export default Remover