import React, { Component } from 'react'

export default class Sort extends Component {
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div class="dropdown open">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                                Dropdown
                            </button>
                    <div class="dropdown-menu" aria-labelledby="triggerId">
                        <button class="dropdown-item" href="#">Action</button>
                        <button class="dropdown-item disabled" href="#">Disabled action</button>
                    </div>
                </div>
            </div>
        )
    }
}
