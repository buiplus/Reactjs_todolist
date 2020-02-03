import React, { Component } from 'react'

export default class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            id:'',//sử dụng khi edit
            name: '',
            status : false,
        }
    }


    //nhận cái task Editting
    componentWillMount(){ // chỉ chạy 1 lần khi components chưa đc gọi
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name : this.props.task.name,
                status : this.props.task.status
            })
            console.log(this.state);
        }   
    }
//components đã gọi những vẫn chạy tiếp được để cập nhật được state
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps && nextProps.task){
            this.setState({
                id : nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status
            })
        }else if(!nextProps.task){ // không tồn tại
            console.log('từ sửa - > thêm');
            
            this.setState({
                id:'',
                name: '',
                status : false,
            })
        }
        
    }

    onChange = (event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value =  target.value === "true" ? true : false;
        }
        this.setState({
            [name] : value,
        })
    }
    

    onSubmit = (event)=>{
        event.preventDefault();
      //  console.log(this.state);
        this.props.onSubmit(this.state);
        this.onCloseForm();
        this.onClear();
    }
    onCloseForm = ()=>{
        this.props.onCloseForm();
    }
    onClear = ()=>{
        this.setState({
            name : '',
            status : false,
            
        })
    }
    render() {
        var {id} = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title"> {id !== "" ?"Cập Nhật Công Việc":"Thêm Công Việc" }
                        <span className="fa fa-times-circle pl-5"
                        onClick={this.onCloseForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                             />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" 
                         name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                         >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                             <button type="submit" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}
