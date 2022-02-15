import React, { Component } from 'react';
import {Tooltip} from 'primereact/tooltip';
import classNames from 'classnames';
import './AppIntro.scss';

export class AppIntro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            theme: null
        }
    }

    chooseTheme(theme) {
        if (this.timeout) {
            return;
        }

        this.setState({ theme }, () => {
            this.timeout = setTimeout(() => {
                this.props.onThemeSelect(theme);
            }, 1000);
        });
    }

    render() {
        const theme = this.state.theme;

        return (
            <div className="layout-intro">
                <h2 className="intro-title">
                    {
                        theme ? <span>Setting Up...<i className="pi pi-cog pi-spin"></i></span> : <span>Choose a Base Theme</span>
                    }
                </h2>
                
                <Tooltip target=".theme-option-button" position="bottom" className="intro" />
                <div className="theme-options">
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'md_light'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('md_light')} style={{background: '#3c4db7'}} data-pr-tooltip="Material Light">
                            <img alt="Material Light" src="demo/images/themes/md-light-indigo.svg" />
                        </button>
                    </div>
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'md_dark'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('md_dark')} style={{background: '#3c4db7'}} data-pr-tooltip="Material Dark">
                            <img alt="Material Dark" src="demo/images/themes/md-dark-indigo.svg" />
                        </button>
                    </div>
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'bootstrap_light'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('bootstrap_light')} data-pr-tooltip="Bootstrap Light">
                            <img alt="Bootstrap Light" src="demo/images/themes/bootstrap4-light-blue.svg" />
                        </button>
                    </div>
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'bootstrap_dark'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('bootstrap_dark')} data-pr-tooltip="Bootstrap Dark">
                            <img alt="Bootstrap Light" src="demo/images/themes/bootstrap4-dark-blue.svg" />
                        </button>
                    </div>
                </div>
                <div className="theme-options">
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'lara_light'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('lara_light')} data-pr-tooltip="Lara Light">
                            <img alt="Lara Light" src="demo/images/themes/lara-light-indigo.png" />
                        </button>
                    </div>
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'lara_dark'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('lara_dark')} data-pr-tooltip="Lara Dark">
                            <img alt="Lara Dark" src="demo/images/themes/lara-dark-indigo.png" />
                        </button>
                    </div>
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'saga'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('saga')} data-pr-tooltip="Saga">
                            <img alt="Saga" src="demo/images/themes/saga-blue.png" />
                        </button>
                    </div>
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'vela'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('vela')} data-pr-tooltip="Vela">
                            <img alt="Vela" src="demo/images/themes/vela-blue.png" />
                        </button>
                    </div>
                </div>
                <div className="theme-options">
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'arya'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('arya')} data-pr-tooltip="Arya">
                            <img alt="Arya" src="demo/images/themes/arya-blue.png" />
                        </button>
                    </div>
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'fluent_light'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('fluent_light')} data-pr-tooltip="Fluent Light">
                            <img alt="Fluent Light" src="demo/images/themes/fluent-light.png" />
                        </button>
                    </div>
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'soho_light'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('soho_light')} data-pr-tooltip="Soho Light">
                            <img alt="Soho Light" src="demo/images/themes/soho-light.png" />
                        </button>
                    </div>
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'soho_dark'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('soho_dark')} data-pr-tooltip="Soho Dark">
                            <img alt="Soho Dark" src="demo/images/themes/soho-dark.png" />
                        </button>
                    </div>
                </div>

                <div className="theme-options">
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'tailwind_light'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('tailwind_light')} data-pr-tooltip="Tailwind Light">
                            <img alt="Tailwind Light" src="demo/images/themes/tailwind-light.png" />
                        </button>
                    </div>
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'viva_light'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('viva_light')} data-pr-tooltip="Viva Light">
                            <img alt="Viva Light" src="demo/images/themes/viva-light.svg" />
                        </button>
                    </div>
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'viva_dark'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('viva_dark')} data-pr-tooltip="Viva Dark">
                            <img alt="Viva Dark" src="demo/images/themes/viva-dark.svg" />
                        </button>
                    </div>
                    <div className={classNames('theme-option', {'theme-option-leave': this.state.theme && this.state.theme !== 'mira'})}>
                        <button type="button" className="p-link theme-option-button" onClick={() => this.chooseTheme('mira')} data-pr-tooltip="Mira">
                            <img alt="Mira" src="demo/images/themes/mira.jpg" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}