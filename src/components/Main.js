import React, { Component } from 'react';
import Creator from './Creator';
import Remover from './Remover';
import Updater from './Updater';
import ApiService from '../services/ApiService';

const appConfig = require('../appConfig.json');

class Main extends Component {

    constructor(props) {

        super(props);
        this.state = {
            selectedLang: "EN",
            TagList: {}, 
            Languages: {}, 
            Surveys: [], 
            operationSelector: 0, 
            survey: {}
        };

        this.updateList = this.updateList.bind(this)

    }

    async updateList() {
        this.setState({ Surveys: await ApiService.getSurveys() })
        this.setState({ operationSelector: 0 })
    }

    _changeLanguage = (event) => {
        this.state.selectedLang = event.target.value;
        this.getLanguage();
    }

    async componentWillMount() {

        this.state.Languages = await ApiService.getLanguages();
        await this.getLanguage();
        this.setState({ Surveys: await ApiService.getSurveys() })

    }

    async getLanguage() {

        let apiTagList = await this.state.Languages.find(item => { return item.Code === this.state.selectedLang }).TagList;

        let appTagList = await appConfig.Languages.find(item => { return item.Code === this.state.selectedLang }).TagList;

        this.setState({ TagList: { ...apiTagList, ...appTagList } })

    }

    async openCreator() {

        this.setState({ operationSelector: 1 })

    }

    async openUpdater(survey) {

        this.setState({ survey: survey, operationSelector: 2 })

    }

    async openRemover(survey) {

        this.setState({ survey: survey, operationSelector: 3 })

    }

    render() {

        const items = [];

        for (const [i, survey] of this.state.Surveys.entries()) {
            items.push(
                <div className="border-card" key={i}>
                    <div className="content-wrapper">
                        <div className="label-group">
                            <h4 className="title">{survey.Name}</h4>
                        </div>
                    </div>
                    <i onClick={() => this.openUpdater(survey)} className="fa fa-pencil-square fa-2x fontAbtn" style={{ marginRight: '.5rem' }}></i>
                    <i onClick={() => this.openRemover(survey)} className="fa fa-trash-o fa-2x fontAbtn"></i>
                </div>
            )
        }

        return (
            <div className="main">
                <h1>{this.state.TagList._SURVEYS}: {this.state.Surveys.length}
                    <select onChange={this._changeLanguage} defaultValue={'EN'} style={{ position: 'absolute', right: '1rem' }}>
                        <option value="EN" >EN</option>
                        <option value="TR">TR</option>
                    </select>
                </h1>
                <div className="row justify-content-md-center p-3 vertical-center wrapper">
                    <div className="col-lg-6 col-sm-12 border overflow-auto"
                        style={{ backgroundColor: '#bbe1fa', borderColor: '#1b262c !important', borderWidth: '.5rem !important', borderRadius: '.25rem' }}>
                        <h3>{this.state.TagList._SURVEYS}</h3>
                        <hr></hr>
                        <ul className="list-group h-75 p-3">
                            {items}
                        </ul>
                        <a><i onClick={() => this.openCreator()} className="fa fa-plus-square fa-3x fontAbtn"></i></a>
                    </div>
                    <div className="col-lg-6 col-sm-12 border"
                        style={{ backgroundColor: '#3282b8', borderColor: '#1b262c !important', borderWidth: '.5rem !important', borderRadius: '.25rem' }}>
                        {this.state.operationSelector === 1 && <h2>{this.state.TagList._CREATE}</h2>}
                        {this.state.operationSelector === 2 && <h2>{this.state.TagList._UPDATE}</h2>}
                        {this.state.operationSelector === 3 && <h2>{this.state.TagList._REMOVE}</h2>}
                        {this.state.operationSelector !== 0 && <hr className="operation"></hr>}
                        {this.state.operationSelector === 1 && <Creator tagList={this.state.TagList} surveys={this.state.Surveys} updateList = {this.updateList}></Creator>}
                        {this.state.operationSelector === 2 && <Updater tagList={this.state.TagList} surveys={this.state.Surveys} survey={this.state.survey} updateList = {this.updateList}></Updater>}
                        {this.state.operationSelector === 3 && <Remover tagList={this.state.TagList} survey={this.state.survey} updateList = {this.updateList}></Remover>}
                    </div>
                </div>
            </div>
        );
    }

}

export default Main