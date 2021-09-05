
import React, {useState}  from 'react';
import { useLocation, Redirect, withRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit'
import {connectToStore} from './Redux/store'

// TODO : Try to read effective React or other React best practises book and change code according to that

async function fetchStudent(studentId, base) {

    // TODO : Handling API error properly

    let record = await base('Students').find(studentId);
    return record.fields.Name;

}

async function fetchClassesInformation(err, studentClassRecord, base) {
    if (err) { console.error(err); return; }

    let classInfo = {}
    classInfo.name = studentClassRecord.fields.Name
    classInfo.studentIds = studentClassRecord.fields.Students;
    classInfo.studentNames = []

    // TODO : Fetch the names of all the students in one API call


    // TODO : Call a function from this line
    if(classInfo.studentIds != undefined) {
        for(let j = 0; j < classInfo.studentIds.length; j++) {

            let studentId = classInfo.studentIds[j];
            const studentName = await fetchStudent(studentId, base);
            console.log("Student name returned is : " + studentName);

            classInfo.studentNames.push(studentName);

        }
        return classInfo;
    }

}

async function fetchClasses(studentClassId) {

    var Airtable = require('airtable');
    var base = new Airtable({apiKey: '########'}).base('#######');
    
    let studentClassRecord = await base('Classes').find(studentClassId);

    // TODO : Handling API error properly

    let classInfo = await fetchClassesInformation(null, studentClassRecord, base);
    return classInfo;

}

async function fetchData(studentClassIds) {

    let classes = []

    for(let i = 0; i < studentClassIds.length; i++) {

        const classInfo = await fetchClasses(studentClassIds[i])
        classes.push(classInfo)

    }

    return classes;

}

export class ClassPanel extends React.Component {

    constructor(props) {

        super(props);

        this.studentName = props.location.state["state"].name;
        this.studentClassIds = props.location.state["state"].classes;
        this.handleLogout = this.handleLogout.bind(this);

    }

    async componentDidMount() {

        this.props.storeLoadingStatus(true);
        const classes = await fetchData(this.studentClassIds);
        this.props.storeLoadingStatus(false);
        this.props.storeStudentClasses(classes);

    }
    
    handleLogout(e) {
        this.props.history.push("/");
    }

    render() {

        let loading = this.props.loading;

        if(loading) return (
            <div>Waiting ....</div>
            // <span>Loading</span>
          );

        // data will be null when fetch call fails
        let studentClasses = this.props.classes;

        if (!studentClasses) return (
            <span>Data not available</span>
        );
        return (
            <div>
                <button onClick={this.handleLogout}>Logout</button>
                {
                    studentClasses.map((classone, index) => (
                    <div key={index}>
                        <h3>{classone.name}</h3>
                        {classone.studentNames.map((studentname, index) => {
                            return (<p key={index}>{studentname}</p>)
                        })}

                    </div>
                ))}
            </div>
        )
    }
}

export const ConnectedClassPanelComponent = connectToStore(ClassPanel)

export default withRouter(ConnectedClassPanelComponent);
