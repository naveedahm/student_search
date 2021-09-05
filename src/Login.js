
import './App.css';
import React from 'react';
import {withRouter} from 'react-router-dom'
import {connectToStore} from './Redux/store'

export class Login extends React.Component {

    constructor(props) {

        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    componentDidMount() {
        this.props.storeStudentName("")
        this.props.storeStudentClasses([])
        this.props.storeLoadingStatus(false)
    }

    handleLogin(e) {

        var Airtable = require('airtable');
        var base = new Airtable({apiKey: '######'}).base('######');

        var name = this.props.name;

        if(name = "") {
            alert("Enter proper student name");
            return;
        } else {
            console.log("Student name is " + this.props.name)
        }

        base('Students')
            .select({
                filterByFormula: `Name = "${this.props.name}"`
                }).firstPage((err, records) => {

                if(records.length == 0) {
                    alert("Student entered is not present in the database. Enter correct name.");
                    return;
                }

                if(records.length == 1) {

                    this.props.history.push("/classes", {state:{name: records[0].fields.Name, classes: records[0].fields.Classes}});

                } else {
                    console.log("not navigating")

                }

            });

        }

    handleChange(event) {
        this.props.storeStudentName(event.target.value)
    }

    render() {
        return (
            <div>
                <label>Student Name:</label>
                <input type="text" value={this.props.name} onChange={this.handleChange}></input>
                <button onClick={this.handleLogin}>Login</button>
            </div>
        );
    }
}

// and that function returns the connected, wrapper component:
export const ConnectedLoginComponent = connectToStore(Login)

export default withRouter(ConnectedLoginComponent);
