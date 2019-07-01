import React, { Component } from 'react';

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = { FirstName: "", SecondName: "", ResultArray: [] };
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeSecondName = this.handleChangeSecondName.bind(this);
        this.SendToDataBase = this.SendToDataBase.bind(this);
        this.GetValueInDataBase = this.GetValueInDataBase.bind(this);
    }

    handleChangeFirstName(event) {
        this.setState({ FirstName: event.target.value });
    }

    handleChangeSecondName(event) {
        this.setState({ SecondName: event.target.value });
    }

    SendToDataBase() {
        fetch("api/TestTask/SetInformation?firstName=" + this.state.FirstName + "&secondName=" + this.state.SecondName + "");
    }

    GetValueInDataBase() {
        fetch("api/TestTask/GetInformation")
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log("data", data);
                this.setState({ ResultArray: data[0] });
            });
    }
    render() {
        return (
            <div>
                <div>
                    <label>
                        First name:
                    <input type="text" value={this.state.FirstName} onChange={this.handleChangeFirstName} class="form-control" placeholder="first name" />
                    </label>
                    <label>
                        Second name:
                    <input type="text" value={this.state.SecondName} onChange={this.handleChangeSecondName} class="form-control" placeholder="second name" />
                    </label>
                </div>
                <div>
                    <button onClick={this.SendToDataBase} class="btn btn-info btn-lg">Send</button>
                </div>
                <div>
                    {this.GetValueInDataBase()}
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Second name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ResultArray.map(firstSecondName =>
                                    <tr key={firstSecondName.firstname}>
                                        <td>{firstSecondName.firstname}</td>
                                        <td>{firstSecondName.secondname}</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>



        );
    }
}
export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <MyForm />
        );
    }
}
