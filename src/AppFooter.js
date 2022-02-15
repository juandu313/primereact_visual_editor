import React, { Component } from 'react';

export class AppFooter extends Component {

    constructor(props) {
        super(props);

        this.version = require('../package.json') && require('../package.json').version;
    }

    render() {
        return (
            <div className="layout-footer">
                PrimeReact Designer {this.version}
            </div>
        )
    }
}