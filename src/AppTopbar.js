import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';

class AppTopbar extends Component {

    get main() {
        return this.props.location.pathname === '/';
    }

    render() {
        return (
            <div className="layout-topbar">
                {
                    !this.props.isCodeEditor && (
                        <button type="button" className="action-icon menu-icon p-link" onClick={this.props.onMenuButtonClick}>
                            <i className="pi pi-bars"></i>
                        </button>
                    )
                }
                { 
                    !this.main && (
                        <>
                            <Tooltip target="home-icon" position="bottom" content="Home" />
                            <Link className="action-icon home-icon" to="/">
                                <i className="pi pi-arrow-left"></i>
                            </Link>
                        </>
                    )
                }
                <Link className="route-link" to="/documentation">Get Started</Link>
            </div>
        );
    }
}

export default withRouter(AppTopbar);