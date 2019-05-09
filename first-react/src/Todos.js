import React from 'react'
import './todos.css'

// 格式化时间
function formatTime (date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours() 
  let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
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
        <input type="checkbox" checked={todo.done} onChange={() => this.props.doneTodo(index)} />
        <span className={todo.done?'todo-content todo-done':'todo-content'}>{todo.value}</span>
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
    if (this.props.doneNum + this.props.leftNum) {
      return (
        <div className="todo-footer">
          <div className="footer-box">
            <span>{this.props.doneNum}</span>
            <a href="javascript:;" onClick={this.props.clearAllDone}>{this.props.leftNum}</a>
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
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
  // 动态设置高度
  componentDidMount() {
    this.refs.box.style.height = this.clientHeight() + 'px'
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  // enter添加todo
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      if (this.state.value) {
        let todosList = this.state.todosList
        todosList.push({
          value: this.state.value,
          showDel: false,
          time: formatTime(new Date()),
          done: false
        })
        this.setState({
          todosList: todosList,
          value: ''
        })
      }
    }
  }
  // 控制刪除logo显示
  hideAllDel() {
    let todosList = this.state.todosList
    for (var i=0; i<todosList.length; i++) {
      todosList[i].showDel = false
    }
    this.setState({
      todosList: todosList
    })
  }
  // 刪除
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
  doneTodo(index) {
    console.log(index)
    let todosList = this.state.todosList
    todosList[index].done = !todosList[index].done
    this.setState({
      todosList: todosList
    })
  }
  // 已完成的todo数量
  doneNum() {
    let num = (this.state.todosList.filter((todo) => {
      return todo.done
    })).length
    return num
  }
  // 清除所有已完成
  clearAllDone() {
    console.log('booker')
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
        hideAllDel={() => this.hideAllDel()}
        doneTodo={(index) => this.doneTodo(index)} />
        <TodosFooter 
        clearAllDone={() => this.clearAllDone()}
        doneNum={this.doneNum()} 
        leftNum={this.state.todosList.length - this.doneNum()} />
      </div>
    )
  }
}

export default Todos
