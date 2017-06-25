import React, { Component } from 'react';
import './App.css';
import LogoImg from './greenl.png';
import Webcam from 'react-webcam';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meeting: "Stakeholder Meeting",
            screenshot: null
        };
        this.handleClick_B = this.handleClick_B.bind(this);
        this.handleClick_A = this.handleClick_A.bind(this);

    }

    componentDidMount(){
        this.interval = setInterval(() => this.capture(), 11000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }


    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        var buf = new Buffer(imageSrc.replace(/^data:image\/\w+;base64,/, ""),'base64')

        this.setState({
            screenshot: imageSrc
        });

        const config = {
            headers: {
                'Content-Type': "image/jpeg"
            }
        }


        var instance = axios.create({
            baseURL: 'https://westcentralus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
            timeout: 1000,
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': 'ac6140c0e2064fa786d1f9377c8d5891'}
        });


        instance.post('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize', buf )
            .then(function (response) {
                console.log(response);
                console.log(response.status);
                // res.send(req.body.image);
            })
            .catch(function (error) {
                console.log(error.response.status, error.response.statusText);
                console.log(error.response, error.response.statusText);
                // res.send(error);
            });
            // ?https://afternoon-headland-34308.herokuapp.com/usr2
        // axios.post('http://localhost:3001/usr2', {
        //     image: imageSrc
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });


    };

    handleClick_B(e){
        e.preventDefault();
        if (e.target.value === "Stakeholder Meeting"){
            this.setState({
                meeting: 'Stakeholder Meeting',
            });
        }
        else if (e.target.value === "Emergency War Room Meeting"){
            this.setState({
                meeting: 'Emergency War Room Meeting',
            });
        }
        else if (e.target.value === "New Employee Orientation"){
            this.setState({
                meeting: 'New Employee Orientation',
            });
        }
        else if (e.target.value === "Product Demo"){
            this.setState({
                meeting: 'Product Demo',
            });
        }

    }
    handleClick_A(e){
        e.preventDefault();
        if (e.target.meeting === "Computer Science"){
            this.setState({
                meeting: 'Computer Science',

            });
        }
        else if (e.target.meeting === "Literature"){
            this.setState({
                meeting: 'Literature',
            });
        }
    }

  render() {
    return (
      <div className="App">
          <div className="container">
              <div className="row">
                  <div className="col">
                      <h1>Emotional Rescuers</h1>
                  </div>
              </div>
              <br/>
              <div className="row">
                  <div className="col text-left ">
                      <p>Meeting Selected: <br/><h4>&#9755; {this.state.meeting}</h4></p>
                      <div className="text-primary" >Business Meeting: </div>
                      <select className="form-control" value={this.state.meeting} onChange={this.handleClick_B}>
                          <option value="Stakeholder Meeting">Stakeholder Meeting</option>
                          <option value="Emergency War Room Meeting">Emergency War Room Meeting</option>
                          <option value="New Employee Orientation">New Employee Orientation</option>
                          <option value="Product Demo">Product Demo</option>
                      </select>
                      <br/>
                      <div className="text-primary" >Academic Meeting: </div>
                      <select className="form-control" value={this.state.meeting} onChange={this.handleClick_A}>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Literature">Literature</option>
                      </select>
                  </div>
                  <div className="col-8 text-left card">
                      <div id="scores"><b>Factual </b>
                          <img style={{width: 25, height: 25}}  src={LogoImg} />
                      </div>
                      <div id="scores"><b>Tone </b>
                          <img style={{width: 25, height: 25}}  src={LogoImg} />
                      </div>
                      <div id="scores"><b>Content </b>
                      </div>
                  </div>
              </div>
              <br/>
              <div className="row camera_h">
                  <div className="col card">
                      <div id="camera">&#x260E; User 1</div>

                  </div>
                  <div className="col card">
                      <span id="camera">User 2</span>
                  </div>
                  <div className="col card">
                      <span id="camera">User 3</span>
                  </div>
              </div>
          </div>
          <Webcam audio ={false} ref={this.setRef}  screenshotFormat="image/jpeg"
                  width={300} height={300} />
          <img style={{width: 300, height: 300}}  src={this.state.screenshot} />

      </div>
    );
  }
}

export default App;
