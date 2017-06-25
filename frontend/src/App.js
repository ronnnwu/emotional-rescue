import React, { Component } from 'react';
import './App.css';
import LogoImg from './greenl.png';
import SmileImg from './smile.jpg';

import Webcam from 'react-webcam';
import axios from 'axios';
import { Plot, Axis, Line } from 'react-plot';

import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = os.environ['cloudinary_preset'];
const CLOUDINARY_UPLOAD_URL = os.environ['coloudinary_upload_url'];

//naive bayes
const dic = {
    0.5: ['Before I talk about Investor more specifically, a few words about the world around us', 'I am aware that it takes time for initiatives like these to take effect', 'Let me start with our role as an owner', 'We strive to have companies that are best-in-class, therefore that they outperform competition', 'This goes for sustainability as well', 'On the contrary, it is a prerequisite', 'There is talk about the fourth industrial revolution, or Industry  We talk about Internet of things, digitalization and cloud', 'Kodak and Facet are of course two very well-known examples', 'Now, let me talk a bit more specifically about our companies and start with Listed Core Investments', 'Atlas Copco has reduced costs in its mining business and ABB has initiated a major cost savings program', 'Saab received major orders driven by the Gripe aircraft system, the A26 submarine and radar systems', 'During the year, we invested approximately SEK 6 billion in our listed core investments, but I will come back to that', 'Then over to Patricia Industries, which essentially started its operations a year ago', 'This is in line with our strategy of being a long-term owner, focusing on buy-to-build, not buy-to-sell', 'Within Listed Core Investments, we invested SEK 6 billion, of which SEK 6 billion in ABB and SEK one fifth billion in Worthily', 'EQT generated SEK 5 billion and Patricia Industries SEK 8 billion, of which half came from Moonlike', 'Investors dividend is largely based on the dividends we receive from our listed core investments', 'So, let me summarize 2015 for Investor', 'I do want to point out that one year is far too short a measuring period', 'Goal fulfilment should rather be measured over a ten-year period'],
    10.0: ['The most important when it comes to growing the net asset value is to ensure that we are a strong, successful owner', 'It is important that the companies have strong balance sheets that allow them to capture profitable growth opportunities and run their operations efficiently', 'Activities are now up and running both in Stockholm and in the UNITED STATES OF AMERICA The main focus is to further develop and increase the value of our existing wholly-owned companies, but also to find new ones, both in the Nordics and in the UNITED STATES OF AMERICA When it comes to new investments we look for companies with strong corporate cultures and strong market positions in industries we know well', 'Both growth and profitability improved successively during the year as the new series came to the market', 'ABB has strong market positions within both automation and power technology, two markets with attractive growth opportunities', 'Thanks to a strong, long-term owner, our fantastic companies, a clear strategy and all our dedicated employees, I am convinced that we, despite a tough world, have good opportunities to continue to create long-term value for you, dear shareholders, over the next 100 years as well'],
    0.852: ['EQT had a very active year'],
    0.875: ['The consequences of this are quite obvious'],
    0.829: ['Patricia Industries has a cash position of approximately SEK 14 billion and strong cash flow from the wholly-owned companies'],
    0.885: ['Let me emphasize that a long-term perspective must never be an excuse for not constantly improving efficiency'],
    0.987: ['Worthily also has strong market positions and an attractive exposure to growth markets and service'],
    0.977: ['For 2015, we propose a dividend per share of SEK 10, an 11 percent increase over last year'],
    0.839: ['For example, the new fund EQT VII, EQTs largest to date, was launched'],
    0.744: ['billion That can be compared to the 10-year average for some SEK 2 billion per year'],
    0.051: ['The development imposes threats, but also offers major opportunities'],
    0.115: ['It will even be tough to survive'],
    0.872: ['We also have to allocate our capital wisely, in other words making sure that we invest in the right companies'],
    0.974: ['An important part of our strategy is therefore to allocate our capital wisely'],
    0.951: ['For us as an active, engaged owner, it is important to set a good example and keep our own costs under control, as we demand the same from our companies'],
    0.803: ['It was a good year for us'],
    0.966: ['The goal of providing a steadily rising dividend over time is intact'],
    0.055: ['Several of our companies have had to act resolutely to adapt to a lower demand'],
    0.079: ['We are living in a tough world, but the picture is not entirely dark'],
    0.984: ['Yes, Investor is celebrating its 100th anniversary this year, and our model of long-term, active ownership, has served us well for a century'],
    0.156: ['To be efficient is also critical given the increasingly tough competition from the growth countries'], 0.715: ['Our total shareholder return was 13 percent, exceeding the general stock market'], 0.892: ['At the same time, of course it is as important for us as it is for them that we constantly develop our operations and invest for the future, for example in our network and in knowledge build-up'],
    0.874: ['We have committed to investing some SEK 3 billion in the fund'],
    0.093: ['Sustainability can never be regarded as an obstacle for long-term growth'],
    0.992: ['The past six months we have been working hard with the nomination processes and I am very pleased that we have identified and nominated a number of strong individuals who will add additional important competence within a number of areas in several of our boards'],
    0.971: ['At the same time, things are looking a bit better elsewhere, for example in Europe, where several companies experience a gradual recovery, although far from enough'],
    0.2: ['If an investment or a project does not turn out as expected, one needs to quickly make the best out of the situation, learn from the mistakes and move on'],
    0.1: ['The development is fast and therefore it is important that our companies identify how they might be affected'],
    0.902: ['Moonlike Health Care reported sales growth of 5 percent in constant currency'],
    0.976: ['As owners we do everything we can to ensure that are companies manage this change successfully', 'During 2015 our wholly-owned companies made good progress'],
    0.981: ['Investor is a fantastic company and I have had the opportunity to work here for more than 20 years'],
    0.708: ['A company that is to be successful, not only next year but in 10, 20 or 50 years, has to act as a good citizen'],
    0.191: ['In 2015, our operating costs amounted to SEK 483 m, below the SEK 500 m, we had communicated as a good level'],
    0.308: ['This is a never-ending work, and we still have a lot to do, but we have at least started the journey'],
    0.862: ['in that context, we expect dividends to be received during 2016 to increase by about 6 percent compared to 2015'],
    0.922: ['Our celebration consists of a number of activities throughout the year'], 0.955: ['To manage the opportunities and challenges facing our companies, they need to have world-class boards of directors'],
    0.196: ['Several of the so-called BRIC countries have a tough time'],
    0.886: ['Dear shareholders, we will continue to work with the strategy I have just described'],
    0.965: ['one of many exciting growth areas'],
    0.873: ['The third cornerstone of our strategy is to pay a steadily rising dividend over time'],
    0.124: ['Companies that cannot recruit the best employees or offer the products or services that customers demand, will have a very tough time outperforming competition'],
    0.827: ['We already have negative interest rates in many places, which is concerning', 'A well-functioning board must have a relevant mix of industrial and financial experience'],
    0.883: ['There are many examples of well-established companies who have experienced this before'],
    0.985: ['Having said that, I am pleased that we have taken a number of steps that are important for our long-term development'],
    0.939: ['2015 was extremely strong, but I do think this illustrates the strength of the platform we have built'],
    0.311: ['We see customers becoming increasingly demanding when it comes to our companies and their products'], 0.893: ['The board members must have integrity and business acumen and really understand the conditions under which the company operates'],
    0.995: ['Given that, it is a great honour getting to lead Investor, particularly during our anniversary year', 'We also need to be better att promoting innovation'],
    0.824: ['For the full year, organic growth amounted to eight percent', 'We have implemented a new organization that allows for increased focus both on our listed and unlisted companies'],
    0.903: ['We must also remember that tough times often offer attractive opportunities, both for Investor and our companies, and we are ready to act if they turn up', 'These are just a few examples of initiatives taken in order to build stronger platforms for the future'],
    0.88: ['We will promote the companies, innovations and people that have contributed to shape Investor as we know it today'],
    0.997: ['To succeed with that we have to restore faith in the future and dare to invest more, for example in education, infrastructure and energy', 'We shall grow our net asset value over time, run the operations efficiently and pay a steadily rising dividend', 'We focus on the industrial value creation in our companies and drive the initiatives that we believe will create the most value over time, even if profitability might be negatively impacted short-term', 'Our net asset value increased', 'We will use our financial strength to expand our wholly-owned companies, continue to invest in EQT and strengthen our ownership in selected listed core investments when we find it financially attractive'],
    0.02: ['More recently, companies like Airbnb have affected the hotel business substantially, Netflix is challenging the way we watch TV and the traditional car makers are keeping close tabs on what Tesla is up to'],
    0.031: ['If there isnt, something is wrong and the consequences may prove costly'],
    0.969: ['Sobi launched Elocute for haemophilia and AstraZeneca strengthened its pipeline', 'During 2015 we made a number of attractive investments in line with our strategy', 'The EQT commitment aside, we invested a total of SEK 10 billion We also paid dividends of approximately SEK 7 billion the capital outflow summarizes to SEK 17 billion At the same time, our cash inflow was very strong at SEK 22 billion Within Listed Core Investments we received SEK 9 billion in dividends and redemptions'],
    0.991: ['We maintained our costs at a good level and propose a significant dividend increase'],
    0.9: ['Now, we shall not expect cash flow to be this strong each year'],
    0.188: ['As I said, the current business climate is tough'],
    0.979: ['I would also like to welcome all of you to Investors Annual General Meeting 2016'],
    0.826: ['We strive to have well-diversified boards in terms of gender, age, background and expertise, as these are more dynamic and cover more aspects'],
    0.027: ['Many companies exposed to, for example, the oil sector and the mining industry have been forced to adapt to even lower demand, while many consumer and healthcare oriented segments fared better', 'Premorbid started the year with lower sales activity as many customers postponed their orders in anticipation of a new wheelchair series', 'In total, this means that despite substantial investments, we managed to reduce our net debt by almost SEK 5 billion, which lowered our leverage to a low 5 percent'],
    0.933: ['Atlas Copco continued to invest within the attractive vacuum area and Ericsson entered into a strategic partnership with Cisco'],
    0.001: ['China has slowed down, the situation in Russia is difficult and Brazil is experiencing a very tough time'],
    0.989: ['The company has strong market positions within wheelchair accessible vehicles and wheelchair lifts, mainly on the UNITED STATES OF AMERICA market, but we see good opportunities for international expansion'],
    0.193: ['2015 was characterized by continued macroeconomic and geopolitical uncertainty, and there is certainly no lack of challenges near-term', 'But in order to grow and outperform competition, the companies also need to dare to take risk'],
    0.841: ['It is all about challenging, asking questions, exchanging experience and last but not least supporting our companies initiatives in this field'],
    0.795: ['During 2015, the value change of our investments in EQT amounted to a full 32 percent in constant currency, and the net cash flow to Investor was SEK 5'],
    0.897: ['In the same way, we notice that the younger generation prefer to work for companies that make them proud, companies that take sustainability seriously', 'Given the attractive return potential, we will continue to invest in EQTs funds'],
    0.854: ['Furthermore, the financial investments are gradually being divested in order to free up additional resources to invest in new wholly-owned companies'],
    0.999: ['Given the attractive profitability, continued growth is the key priority and the growth opportunities are viewed as very strong'],
    0.061: ['For example, Worthily has acted swiftly when it comes to reducing costs due to weak demand within the marine segment'],
    0.953: ['As mentioned previously, we committed to invest in EQTs new fund and Patricia Industries invested approximately SEK 4 billion, of which the major part in Braun Ability'],
    0.93: ['Investor has a strong financial position with significant resources for investments'],
    0.831: ['However, there are quite big differences between various industries and regions'],
    0.917: ['Today, the order book is record strong'],
    0.996: ['It is great seeing so many of you here, especially as we celebrate our 100th anniversary', 'Alaris reported good growth and stable profitability', 'We continue to see improvement potential in Aleris and keep working on developing the company as a high-quality provider of care and healthcare services'],
    0.192: ['Just look at the swings in the stock market in 2015 and the tough start we have had in 2016'],
    0.983: ['The second cornerstone of our strategy is to operate efficiently, to always make sure that we do the right things'],
    0.812: ['Especially the Norwegian operations contributed to growth'],
    0.993: ['Risk-taking is a natural part of doing business, but it has to be about taking calculated risk, and prioritize those areas where the opportunity to be a long-term winner is the greatest'],
    0.799: ['Our companies should always be able to focus on executing clearly defined strategies, well anchored in the boards of directors'],
    0.921: ['Sustainability, in other words that companies act in a socially, economically and environmentally responsible way, is becoming increasingly important, and this is a question we are working actively with, both within Investor and our companies', 'Another area we work hard to better understand is the rapid technology shifts that ar going on and that can affect many companies quickly'],
    0.994: ['During 2015, we developed our value creation plans for all our companies'],
    0.956: ['The profit margin remained at a high level and the company delivered strong cash flow'],
    0.98: ['Just like Premorbid, Braun Ability has a very strong corporate culture'],
    0.864: ['It is really important that we get the economy going'],
    0.911: ['Our strategy is quite simple'],
    0.888: ['They need to live with the company and spend a lot of time and engagement on his or her assignment, making sure to constantly challenge, but also support, the management'],
    0.865: ['In A bit simplified, it is all about the new technology clearly impacting the way we live our lives and how we do business'],
    0.967: ['In October, Patricia Industries made its first new investment through the SEK 3 billion acquisition of UNITED STATES OF AMERICA Braun Ability'],
    0.944: ['Investors companies have market leading positions, they have the customer contact, the application knowledge and have renewed themselves for decades through innovation'],
    0.858: ['At the same time, many of our companies have taken important steps forward'],
    0.25: ['In my view, there has to be a cost of capital']
};


var counttime = 0;
var score_s;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meeting: "Stakeholder Meeting",
            screenshot: null,
            smile: 1,
            contempt: 0,
            dataPlot: [
            ],
            sentences: '',
            scores: {}
        };
        this.handleClick_B = this.handleClick_B.bind(this);
        this.handleClick_A = this.handleClick_A.bind(this);

    }

    componentDidMount(){
        this.interval = setInterval(() => this.capture(), 3500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }


    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }
            console.log(response.body.secure_url);
            axios.post("https://afternoon-headland-34308.herokuapp.com",
                {  Img_url: response.body.secure_url }
            );
         });
    }

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();

       // this.handleImageUpload(imageSrc);


        var buf = new Buffer(imageSrc.replace(/^data:image\/\w+;base64,/, ""),'base64');

        this.setState({
            screenshot: imageSrc
        });


        var instance = axios.create({
            baseURL: 'https://westcentralus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
            timeout: 2000,
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': os.environ['subscription_key']}
        });


        instance.post('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize', buf )
            .then( (response) => {

                score_s = JSON.parse(response.request.response)[0].scores;

                console.log(score_s);
                counttime = (counttime + 5)%200;
                var newArray = this.state.dataPlot.slice();
                newArray.push([counttime, score_s["happiness"] * 100]);


                //console.log("222");
                var min_dictance = 500;
                var min_key;

                for (var key in dic) {
                    if (dic.hasOwnProperty(key)) {
                        var distan = Math.abs(key - score_s["happiness"]*100);
                        if (distan < min_dictance){
                            min_dictance = distan;
                            min_key = key;
                        }
                    }
                }
                this.setState({
                    sentences : dic[min_key].slice(0, 3)
                });
                if (this.state.dataPlot.length > 10){
                    //newArray.shift();
                    this.setState({
                        dataPlot : newArray
                    })
                }
                else{
                    this.setState({
                        dataPlot : newArray
                    })
                }
                //console.log("2dd22");
                //console.log(this.state.scores);
                if (this.state["happiness"] > 0.3){
                    this.setState({
                        smile : 1
                    });
                } else {
                   // console.log('sss');
                    this.setState({
                        smile : 0
                    });
                }

                if (parseFloat(this.state["anger"]) > 0.2){
                    this.setState({
                        contempt : 1
                    });
                }
                else{
                    this.setState({
                        contempt : 0
                    });
                }
                //console.log(this.state.dataPlot.length);
                // res.send(req.body.image);
                //this.forceUpdate();

            })
            .catch(function (error) {
                // res.send(error);
            });



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
                meeting: 'Product Demo'
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

    let block_1;
    if (this.state.smile ===1){
        block_1 =  <img style={{width: 25, height: 25}}  src={LogoImg} alt=""/>
    }
    else{
        block_1 =  <img style={{width: 25, height: 25}}  src={SmileImg} alt=""/>
    }

      return (
      <div className="App">
          <div className="container">
              <div className="row">
                  <div className="col">
                      <h1 className="text-primary">Smart Meet</h1>
                  </div>
              </div>
              <br/>
              <div className="row">
                  <div className="col text-left ">
                      <p>Meeting Selected: <br/><b>&#9755; {this.state.meeting}</b></p>
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
                          {block_1}
                          </div>
                      <div id="scores"><b>Tone </b>
                          {this.state.contempt ===0? <img style={{width: 25, height: 25}}  src={LogoImg} alt=""/>: <img style={{width: 25, height: 25}}  src={SmileImg} alt=""/>}
                      </div>
                      <div id="scores"><b>Content Generator: </b> </div>
                      <div>
                          {this.state.sentences}
                      </div>
                  </div>
              </div>
              <br/>
              <div className="row text-center ">
                  <div className="col card text-center dddd">
                      <div id="camera">&#x260E; User 1</div>
                      <img style={{width: 270, height: 140}}  src={this.state.screenshot} alt=""/>
                      <br/>
                      <Plot width={270} height={80} data={this.state.dataPlot}>
                          <Line color="#6fc1ff" />
                          <Axis orientation="left" />
                          <Axis orientation="top" />
                          <Axis orientation="right" />
                          <Axis orientation="bottom" />
                      </Plot>
                      <br/>
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

      </div>
    );
  }
}

export default App;