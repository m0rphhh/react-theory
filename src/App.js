import React, { Component } from 'react';
import './App.css';
import Car from './Car/Car'
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import Counter from "./Counter/Counter";

export const ClickedContext = React.createContext(false)

/*function App() {
  return (
    <div className="App">
      <h1 style={{color: 'blue', fontSize: '40px'}}>Hello, World!</h1>
    </div>
  );*/

class App extends Component {
    state = {
        clicked: false,
        cars: [
            {name: 'Ford', year: 2018},
            {name: 'Camaro', year: 2020}
        ],
        pageTitle: 'React Рулит!',
        showCars: false
    }

    onChangeName = (name, index) => {
        const car = this.state.cars[index]
        car.name= name
        const cars = [...this.state.cars]
        cars[index] = car
        this.setState({
            cars: cars
        })
    }

    toggleCarsHandler = () => {
        this.setState({
            showCars: !this.state.showCars
        })
    }
//setState меняет состояние state (можно через этот метод, напрямую не выйдет)

    deleteHandler(index){
        const cars = this.state.cars.concat()
        cars.splice(index, 1)
        this.setState({cars})
    }

    componentWillMount() {
        console.log('App componentWillMount')
    }

    componentDidMount() {
        console.log('App componentDidMount')
    }

    render() {
        console.log('App render')
        const divStyle = {
            textAlign: 'center'
        }

        let cars = null

        if(this.state.showCars){
            cars = this.state.cars.map((car, index) => {
                return(<ErrorBoundary key={index}>
                    <Car
                        name={car.name}
                        year={car.year}
                        index={index}
                        onDelete={this.deleteHandler.bind(this, index)}
                        onChangeName={(event) => this.onChangeName(event.target.value, index)}
                    />
                </ErrorBoundary>
                )
            })
        }

        return(
          <div style={divStyle}>
              {/*<h1>{this.state.pageTitle}</h1>*/}
              <h1>{this.props.title}</h1>
              <ClickedContext.Provider value={this.state.clicked}>
                  <Counter />
              </ClickedContext.Provider>


              <button onClick={this.toggleCarsHandler} style={{marginTop: '10px'}}>toggle cars </button>

              <button onClick={() => this.setState({clicked: true})}>change clicked</button>

            <div style={{
                width: 400,
                margin: "auto",
                paddingTop: '20px'
            }}>
              { cars }
            </div>
          </div>
        );
    }

}


/*return(
    <div style={divStyle}>
        <h1>Hello world!</h1>

        <Car name = 'Ford' year = {2018}>
            <p style = {{color: 'green'}}>COLOR</p>
        </Car>
        <Car name = 'Camaro' year = {2020}>
            <p style = {{color: 'red'}}>COLOR</p>
        </Car>
    </div>
);*/

//данный фрагмент позволяет выводить доп контент в теге Car через props.children


    /*return React.createElement(
        'div',
        {
            className: 'App'
        },
        React.createElement(
            'h1',
            null,
            'Hello, World!'
        )
    ) Так работает JSX, преобразуя html код в js код

    */

/*onChangeTitle={this.changeTitleHandler.bind(this, cars[0].name)} - хороший способ для передачи действия кнопке,
 созданной в Car.js*/
//event.target.value - обращение к инпуту, дабы собрать с него инфу

/*<Car
    name ={cars[0].name}
    year = {cars[0].year}
    onChangeTitle={this.changeTitleHandler.bind(this, cars[0].name)}
/>

<Car
    name ={cars[1].name}
    year = {cars[1].year}
    onChangeTitle={() => this.changeTitleHandler(cars[1].name)}
/>*/
export default App;
