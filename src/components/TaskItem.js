import React, { Component } from 'react'

export default class TaskItem extends Component {
    onUpdateStatus = ()=>{
        this.props.onUpdateStatus(this.props.task.id);
        
    }

    onDelete = ()=>{
        console.log(this.props.task.id);
         this.props.onDelete(this.props.task.id);
    }

    onUpdate = ()=>{
        this.props.onUpdate(this.props.task.id);
    }
    render() {
        var {task,index} = this.props;
        return (
            <tr>
                <td>{index+1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span 
                    className={task.status === true ? "btn btn-success":"btn btn-danger"}
                    onClick={this.onUpdateStatus}
                    >
                        {task.status === true ?"Kích Hoạt" : "Ẩn"}
                     </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                        <span className="fa fa-pencil mr-1" />Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-1" />Xóa
                    </button>
                </td>
            </tr>
        )
    }
}
