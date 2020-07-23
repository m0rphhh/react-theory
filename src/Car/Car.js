import React from "react";
import classes from './Car.css'
import PropTypes from 'prop-types'
import withClass from "../hoc/withClass";

class Car extends React.Component{
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }

    componentDidMount() {
        if (this.props.index === 0) {
            this.inputRef.current.focus()
        }
    }

    render(){

        const inputClasses = [classes.input]

        if (this.props.name !== ''){
            inputClasses.push(classes.green)
        }else{
            inputClasses.push(classes.red)
        }

        if (this.props.name.length > 4){
            inputClasses.push(classes.bold)
        }

        return (
            <React.Fragment>
                <h3>Car name: {this.props.name}</h3>
                Year: <strong>{this.props.year}</strong>
                <input
                    ref={this.inputRef}
                    type="text"
                    onChange={this.props.onChangeName}
                    value={this.props.name}
                    className={inputClasses.join(' ')}
                />
                <button onClick={this.props.onDelete}>Delete</button>
            </React.Fragment>
        )
    }
}

Car.propTypes = {
    name: PropTypes.string,
    year: PropTypes.number,
    onChangeName: PropTypes.func,
    onDelete: PropTypes.func,
    index: PropTypes.number
}
/*function car() {
    return(
        <h2>This is car component</h2>
    )
}
Плохой вариант создания простого компонента
*/
/*const car = () => {
    return(
        <h2>This is car component</h2>
    )
}
Вариант чуток получше
 */

/*const car = () => (
    <div>
        This is car component
        <strong>GONE.fludd</strong>
    </div>
)*/

export default withClass(Car, classes.Car)

// оптимальный вариант создания простого компонента
//фигурные скобки дают js понять, что перед ним математическое выражение, а не строка
//они также дают возможность вывода функций
//осуществил передачу свойств объекта; props идут из файла App.js, при обращении к <Car />
//props.children позволяет передавать доп контент в теге Car