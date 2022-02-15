import React, { Component } from 'react';
import classNames from 'classnames';
import AppTopbar from './AppTopbar';
import { AppEditor } from './AppEditor';
import { AppFooter } from './AppFooter';
import { AppIntro } from './AppIntro';
import { CSSTransition } from 'react-transition-group';
import './App.scss';

import PrimeReact from 'primereact/api';
import { Home } from './components/Home';
import { Route } from 'react-router-dom';
import { Documentation } from './components/Documentation';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarActive: false,
            theme: null,
            initialized: false,
            rippleActive: true,
            inputStyleValue: 'outlined'
        };

        this.onThemeSelect = this.onThemeSelect.bind(this);
        this.onCompile = this.onCompile.bind(this);
        this.onRestart = this.onRestart.bind(this);
        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
        this.onMaskClick = this.onMaskClick.bind(this);
        this.onInputStyleChange = this.onInputStyleChange.bind(this);
        this.onRippleChange = this.onRippleChange.bind(this);

        PrimeReact.ripple = true;
    }

    onThemeSelect(theme) {
        this.setState({ theme });
    }

    onCompile(value) {
        let styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        document.getElementsByTagName("head")[0].appendChild(styleElement);
        
        if (this.themeStyle) {
            this.themeStyle.remove();
        }
        
        this.themeStyle = styleElement;
        this.themeStyle.appendChild(document.createTextNode(value));

        setTimeout(() => {
            if (!this.state.initialized) {
                this.setState({ initialized: true });
            }
        }, 10);
    }

    onRestart() {
        this.setState({ 
            theme: null,
            initialized: false
        });
    }

    onMenuButtonClick() {
        this.setState({ sidebarActive: true });
    }

    onMaskClick() {
        this.setState({ sidebarActive: false });
    }

    onInputStyleChange({ value }) {
        this.setState({ inputStyleValue: value});
    }

    onRippleChange({ value }) {
        PrimeReact.ripple = value;
        this.setState({ rippleActive: value });
    }

    get codeEditor() {
        return process.env.REACT_APP_EDITOR === 'code';
    }

    render() {
        const { initialized, theme, sidebarActive } = this.state;

        const containerClassName = classNames('layout-wrapper', {
            'layout-editor-code': this.codeEditor,
            'p-ripple-disabled': PrimeReact.ripple === false
        });
        const maskClassName = classNames('layout-mask', {'layout-mask-active': sidebarActive});

        return (
            <div className={containerClassName}>
                { (this.codeEditor || initialized) && <AppTopbar onMenuButtonClick={this.onMenuButtonClick} isCodeEditor={this.codeEditor} />}
                { (!this.codeEditor && theme) && <AppEditor theme={theme} active={sidebarActive} onCompile={this.onCompile} onRestart={this.onRestart} 
                                                    inputStyle={this.state.inputStyleValue} onInputStyleChange={this.onInputStyleChange}
                                                    ripple={this.state.rippleActive} onRippleChange={this.onRippleChange} /> }
                { 
                    (this.codeEditor || initialized) && (
                        <div className="layout-content">
                            <Route exact path="/" component={() => <Home inputStyle={this.state.inputStyleValue}></Home>} />
                            <Route path="/documentation" component={Documentation} />
                        </div>
                    )
                }
                { (!this.codeEditor && initialized) && <div className={maskClassName} onClick={this.onMaskClick}></div> }
                { (this.codeEditor || initialized) && <AppFooter /> }
                <CSSTransition unmountOnExit in={!this.codeEditor && !initialized} classNames="fade" timeout={{enter: 300, exit: 300}}>
                    <AppIntro onThemeSelect={this.onThemeSelect} />
                </CSSTransition>
            </div>
        );
    }
}

export default App;
