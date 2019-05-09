import React from 'react'

// 格式化时间
function formatTime (date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}

class TodosInput extends React.Component {
  render() {
    return (
      <div>
        <input placeholder="what todos?" 
        className="todo-input"
        value={this.props.value} 
        onChange={this.props.onChange} 
        onKeyDown={this.props.onKeyDown} />
      </div>
    )
  }
}

function DelLog(props) {
  if (props.showDel) {
    return(
      <span 
        className="del-logo"
        onClick={() => props.onClick(props.index)}>X</span>
    )
  } else {
    return(
      <span id="todoTimes">{props.time}</span>
    )
  }
}

class TodosItem extends React.Component {
  render() {
    let todos = this.props.todosList.map((todo, index) => 
      <li key={Math.random()}  onMouseEnter={() => this.props.showDel(index)} >
        <span className="todo-content">{todo.value}</span>
        <DelLog 
        index={index}
        time={todo.time}
        showDel={todo.showDel} 
        onClick={(index) => this.props.onClick(index)} />
      </li>
    )
    return (
      <div onMouseLeave={() => this.props.hideAllDel()} className="todo-box">
        <ul>{todos}</ul>
      </div>
    )
  }
}

class TodosFooter extends React.Component {
  render() {
    return (
      <div></div>
    )
  }
}

class Todos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      todosList: []
    }
  }
  componentDidMount() {
    this.refs.box.style.height = this.clientHeight() + 'px'
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      if (this.state.value) {
        let todosList = this.state.todosList
        todosList.push({
          value: this.state.value,
          showDel: false,
          time: formatTime(new Date())
        })
        this.setState({
          todosList: todosList,
          value: ''
        })
      }
    }
  }
  hideAllDel() {
    let todosList = this.state.todosList
    for (var i=0; i<todosList.length; i++) {
      todosList[i].showDel = false
    }
    this.setState({
      todosList: todosList
    })
  }
  deleteTodo(index) {
    let todosList = this.state.todosList
    todosList.splice(index, 1)
    this.setState({
      todosList: todosList
    })
  }
  clientHeight() {
    return document.documentElement.clientHeight
  }
  showDel(index) {
    let todosList = this.state.todosList
    for (var i=0; i<todosList.length; i++) {
      todosList[i].showDel = false
    }
    todosList[index].showDel = true
    this.setState({
      todosList: todosList
    })
  }
  render() {
    return (
      <div className="box" ref="box">
        <TodosInput 
        value={this.state.value} 
        onChange={(e) => this.handleChange(e)} 
        onKeyDown={(e) => this.handleKeyDown(e)} />
        <TodosItem 
        todosList={this.state.todosList}
        showDel={(index) => this.showDel(index)} 
        onClick={(index) => this.deleteTodo(index)}
        hideAllDel={() => this.hideAllDel()} />
        <TodosFooter />
      </div>
    )
  }
}

export default Todos
