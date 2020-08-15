import React, { Component } from 'react';
import ApiService from '../services/ApiService';

class Updater extends Component {

  constructor(props) {

    super(props);
    this.state = {
      surveyName: '',
      warningSelector: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateSurvey = this.updateSurvey.bind(this);

  }

  componentDidMount() {

    this.setState({ surveyName: this.props.survey.Name })

  }

  componentWillReceiveProps(nextProps) {

    this.setState({ surveyName: nextProps.survey.Name })

  }

  handleChange(event) {

    this.setState({ surveyName: event.target.value });
    
  }

  async updateSurvey() {

    this.setState({ warningSelector: 0 });

    if (this.state.surveyName.length < 3) {

      this.setState({ warningSelector: 1 });

      return;

    } else if (this.props.survey.Name === this.state.surveyName) {

      this.setState({ warningSelector: 2 });

      return;

    } else if (this.props.surveys.find(item => { return item.Name === this.state.surveyName })) {

      this.setState({ warningSelector: 3 });

      return;

    }

    let response = await ApiService.updateSurvey(this.props.survey.ID, this.state.surveyName);

    if (response.ID === this.props.survey.ID && response.Name === this.state.surveyName)

    this.props.updateList();

    else {

      this.setState({ warningSelector: 4 });

    }

  }

  render() {

    return (
      <div className="creator">
        <div className="form-group">
          <label htmlFor="surveyName">{this.props.tagList._SURVEY_NAME}</label>
          <input type="text" className="form-control" id="surveyName" maxLength="32" value={this.state.surveyName} onChange={this.handleChange}></input>
        </div>
        <button className="btn btn-dark" onClick={this.updateSurvey}>{this.props.tagList._UPDATE}</button>
        {this.state.warningSelector === 1 && <h3>{this.props.tagList._WARN_3_CHAR}</h3>}
        {this.state.warningSelector === 2 && <h3>{this.props.tagList._WARN_NO_CHANGE}</h3>}
        {this.state.warningSelector === 3 && <h3>{this.props.tagList._WARN_DUPLICATION}</h3>}
        {this.state.warningSelector === 4 && <h3>{this.props.tagList._WARN_UNSUCCESS}</h3>}
      </div>
    );
  }

}

export default Updater