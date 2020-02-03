import React, { Component } from 'react';
import './App.css';
import TaskForm from "./components/TaskForm";
import Control from "./components/Controls";
import TaskList from "./components/TaskList";
var randomId = require('random-id');
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],//id unique, name,status
      isDisplayForm: false,
      taskEditting: null,

      //tạo state để filter
      filter : {
        name : '',
        status : -1
      },
      keyword : '',//thực hiện chức năng tìm kiếm
    }
  }

  //lấy lại dữ liệu đã được render trc đó, k cần tạo mới
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }

  onGenerateData = () => {
    //console.log("data");
    var tasks = [
      {
        id: randomId(10),
        name: 'Học lập trình mệt quá',
        status: true,
      },
      {
        id: randomId(10),
        name: 'Học lập trình đuỗi quá',
        status: false,
      },
      {
        id: randomId(10),
        name: 'Học lập trình vãi quá',
        status: true,
      },
    ]
    //  console.log(tasks);

    this.setState({
      tasks: tasks
    })
    //Lưu xuống localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }


  //ẩn hiện TaskForm
  onToggleForm = () => {
    //kiểm tra form edit đang được mở -> chọn form xem mà k cần nhấn 2 lần vào nút thêm
    if (this.state.isDisplayForm && this.state.taskEditting !== null) {
      this.setState({
        isDisplayForm : true,
        taskEditting  :null
      })
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditting: null
      })
    }

  }
  //đóng form thêm công việc
  onCloseForm = () => {
    //console.log("close");
    this.setState({
      isDisplayForm: false,
    })
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  onSubmit = (data) => {
    // console.log(data);
    var { tasks } = this.state;//state hiện tại

    if (data.id === '') {
      //add task
      data.id = randomId(10);
      // tasks.push(data);
      this.setState({
        tasks: this.state.tasks.concat(data),
      })
    } else {
      //Edit
      var index = tasks.findIndex(item => {
        return item.id === data.id;
      })
      if (index !== -1) {
        tasks[index] = data;
        this.setState({
          tasks: tasks,
          taskEditting: null
        })
      }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    let index = tasks.findIndex(item => {
      return item.id === id;
    })
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      })
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onDelete = (id) => {
    // console.log(id);
    var { tasks } = this.state;

    let index = tasks.findIndex(item => {
      return item.id === id;
    })
    if (index != -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      })
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdate = (id) => {
    // console.log(id);
    var { tasks } = this.state;
    let index = tasks.findIndex(item => {
      return item.id === id;
    })
    //console.log(index);

    var taskEditting = tasks[index];
    console.log(taskEditting);
    this.setState({
      taskEditting: taskEditting,
    })
    this.onShowForm();
  }
  onSearch = (keyword)=>{
    console.log(keyword);
    this.setState({
      keyword : keyword
    })
  }

  onFilter = (filterName, filterStatus)=>{
    filterStatus = parseInt(filterStatus,10);// ép kiểu
    //console.log(typeof filterStatus);
    this.setState({
      filter : {
        name : filterName.toLowerCase(),
        status : filterStatus
      }
    })
    
    
  }
  render() {
    var { tasks, isDisplayForm, taskEditting, filter, keyword } = this.state;
    //tiến hành filter
    console.log(filter);
    if(filter){
      if(filter.name){
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
      }
      tasks = tasks.filter(task =>{
        if(filter.status === -1){
          return task;
        }else{
          return task.status === (filter.status === 1 ? true :  false)
        }
      })
    }

    //tìm kiếm
    if(keyword){
      tasks = tasks.filter(task =>{
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      })
    }
    var eleDisplayForm = isDisplayForm === true ? <TaskForm
      onCloseForm={this.onCloseForm}
      onSubmit={this.onSubmit}
      task={taskEditting}
    /> : "";
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm === true ? "col-sm-4" : ""}>

            {/*<TaskForm />*/}
            {eleDisplayForm}

          </div>
          <div className={isDisplayForm === true ? "col-sm-8" : "col-sm-12"}>
            <button type="button" className="btn btn-primary mb-4" onClick={this.onToggleForm}>
              <span className="fa fa-plus" />Thêm Công Việc
            </button>

            <button type="button" className="btn btn-danger ml-4 mb-4" onClick={this.onGenerateData}>
              Generate Data
           </button>

            <Control   onSearch={this.onSearch} />

            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter = {this.onFilter}
                />

              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
