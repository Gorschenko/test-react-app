import React from 'react';
// import PropType from 'prop-types';
import classes from 'components/App/FormApp/FormApp.module.scss';
import SimpleInput from 'components/base/SimpleInput/SimpleInput.js';

export default class FormApp extends React.Component {
    constructor() {
        super();
        this.state = {
            formData: {
                title: '',
                description: '',
            }
        };
    }
    render() {
        return (
            <form className={classes.formApp}>
                <SimpleInput
                    title="Название"
                    value={this.state.formData.title}
                    onChange={e => this.setState({ formData: { title: e.target.value } })}
                />
                <SimpleInput
                    title="Описание"
                    value={this.state.formData.description}
                    onChange={e => this.setState({ formData: { description: e.target.value } })}
                />
            </form>
        )
    }
}