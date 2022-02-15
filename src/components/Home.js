import React, { Component } from 'react';
import classNames from 'classnames';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Chips } from 'primereact/chips';
import { Slider } from 'primereact/slider';
import { Rating } from 'primereact/rating';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { ListBox } from 'primereact/listbox';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { ToggleButton } from 'primereact/togglebutton';
import { SelectButton } from 'primereact/selectbutton';
import { TabView, TabPanel } from 'primereact/tabview';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { ContextMenu } from 'primereact/contextmenu';
import { Messages } from 'primereact/messages';
import { Toast } from 'primereact/toast';
import { InputSwitch } from 'primereact/inputswitch';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Dialog } from 'primereact/dialog';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Message } from 'primereact/message';
import { TieredMenu } from 'primereact/tieredmenu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressBar } from 'primereact/progressbar';

import CustomerService from '../service/CustomerService';
import CountryService from '../service/CountryService';

import './Home.scss';
import designer_logo from '../assets/demo/images/logo.svg';
import flag_placeholder from '../assets/demo/images/flag_placeholder.png';
import '../assets/demo/styles/flags.css';

export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customers: null,
            selectedCustomers: null,
            filters: {},
            floatValue: '',
            autoValue: null,
            selectedAutoValue: null,
            autoFilteredValue: [],
            calendarValue: null,
            inputNumberValue: null,
            chipsValue: [],
            sliderValue: 0,
            ratingValue: null,
            colorValue: '1976D2',
            radioValue: null,
            checkboxValues: [],
            switchValue: false,
            display: false,
            listboxValue: null,
            dropdownValue: null,
            multiselectValue: null,
            toggleValue: false,
            selectButtonValue1: null,
            selectButtonValue2: null
        };

        this.listboxValues = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];

        this.dropdownValues = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];

        this.multiselectValues = [
            {name: 'Australia', code: 'AU'},
            {name: 'Brazil', code: 'BR'},
            {name: 'China', code: 'CN'},
            {name: 'Egypt', code: 'EG'},
            {name: 'France', code: 'FR'},
            {name: 'Germany', code: 'DE'},
            {name: 'India', code: 'IN'},
            {name: 'Japan', code: 'JP'},
            {name: 'Spain', code: 'ES'},
            {name: 'United States', code: 'US'}
        ];

        this.selectButtonValues1 = [
            {name: 'Option 1', code: 'O1'},
            {name: 'Option 2', code: 'O2'},
            {name: 'Option 3', code: 'O3'},
        ];

        this.selectButtonValues2 = [
            {name: 'Option 1', code: 'O1'},
            {name: 'Option 2', code: 'O2'},
            {name: 'Option 3', code: 'O3'},
        ];

        this.tieredMenuItems = [
            {
                label:'Customers',
                icon:'pi pi-fw pi-table',
                items:[
                    {
                        label:'New',
                        icon:'pi pi-fw pi-user-plus',
                        items:[
                            {
                                label:'Customer',
                                icon:'pi pi-fw pi-plus'
                            },
                            {
                                label:'Duplicate',
                                icon:'pi pi-fw pi-copy'
                            },

                        ]
                    },
                    {
                        label:'Edit',
                        icon:'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label:'Orders',
                icon:'pi pi-fw pi-shopping-cart',
                items:[
                    {
                        label:'View',
                        icon:'pi pi-fw pi-list'
                    },
                    {
                        label:'Search',
                        icon:'pi pi-fw pi-search'
                    },

                ]
            },
            {
                label:'Shipments',
                icon:'pi pi-fw pi-envelope',
                items:[
                    {
                        label:'Tracker',
                        icon:'pi pi-fw pi-compass'

                    },
                    {
                        label:'Map',
                        icon:'pi pi-fw pi-map-marker'

                    },
                    {
                        label:'Manage',
                        icon:'pi pi-fw pi-pencil'
                    }
                ]
            },
            {
                label:'Profile',
                icon:'pi pi-fw pi-user',
                items:[
                    {
                        label:'Settings',
                        icon:'pi pi-fw pi-cog'
                    },
                    {
                        label:'Billing',
                        icon:'pi pi-fw pi-file'
                    }
                ]
            },
            {
                separator:true
            },
            {
                label:'Quit',
                icon:'pi pi-fw pi-sign-out'
            }
        ];

        this.menuitems = [
            {
                label:'Customers',
                items:[
                    {
                        label:'New',
                        icon:'pi pi-fw pi-plus',
                    },
                    {
                        label:'Edit',
                        icon:'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label:'Orders',
                items:[
                    {
                        label:'View',
                        icon:'pi pi-fw pi-list'
                    },
                    {
                        label:'Search',
                        icon:'pi pi-fw pi-search'
                    }
                ]
            }
        ];

        this.contextMenuItems = [
            {
                label: 'Save',
                icon: 'pi pi-save'
            },
            {
                label: 'Update',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash'
            },
            {
                separator: true
            },
            {
                label: 'Options',
                icon: 'pi pi-cog'
            },
        ];

        this.countryService = new CountryService();
        this.customerService = new CustomerService();

        this.onCheckboxOptionChange = this.onCheckboxOptionChange.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.onContextRightClick = this.onContextRightClick.bind(this);
        this.searchCountry = this.searchCountry.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.countryService.getCountries().then(data => this.setState({ autoValue: data }));
        this.customerService.getCustomersLarge().then(data => this.setState({ customers: data }));
    }

    onCheckboxOptionChange(e) {
        let checkboxValues = [...this.state.checkboxValues];

        if (e.checked)
            checkboxValues.push(e.value);
        else
            checkboxValues.splice(checkboxValues.indexOf(e.value), 1);

        this.setState({ checkboxValues });
    }

    countryTemplate(option) {
        return (
            <div className="country-item p-d-flex p-ai-center">
                <span className={`p-mr-2 flag flag-${option.code.toLowerCase()}`} style={{width: '18px', height: '12px'}} />
                <div>{option.name}</div>
            </div>
        );
    }

    menubarEndTemplate() {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="text" placeholder="Search" />
            </span>
        );
    }

    toggleMenu(event) {
        this.menu.toggle(event);
    }

    onContextRightClick(event) {
        this.contextMenu.show(event);
    }

    searchCountry(event) {
        setTimeout(() => {
            let autoFilteredValue = [];
            if (!event.query.trim().length) {
                autoFilteredValue = [...this.state.autoValue];
            }
            else {
                autoFilteredValue = this.state.autoValue.filter((country) => {
                    return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            this.setState({ autoFilteredValue });
        }, 250);
    }

    capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    addMessage(severity) {
        this.msgs1.show([{ severity, summary: this.capitalize(severity), detail: 'Message Content' }]);
    }

    showToast(severity) {
        this.toast.show({severity, summary: this.capitalize(severity), detail:'Message Content', life: 3000});
    }

    open() {
        this.setState({ display: true });
    }

    close() {
        this.setState({ display: false });
    }

    toggle(event) {
        this.op.toggle(event);
    }

    customerTableHeader() {
        return (
            <div className="p-d-flex p-ai-center p-jc-between">
                DataTable
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" />
                </span>
            </div>
        );
    }

    nameBodyTemplate(data) {
        return (
            <>
                <span className="p-column-title">Name</span>
                {data.name}
            </>
        );
    }

    countryBodyTemplate(data) {
        return (
            <>
                <span className="p-column-title">Country</span>
                <img alt={data.country.name} src={flag_placeholder} className={`flag flag-${data.country.code} p-mr-2`} width="30" />
                <span className="image-text">{data.country.name}</span>
            </>
        );
    }

    dateBodyTemplate(data) {
        return (
            <>
                <span className="p-column-title">Date</span>
                <span>{data.date}</span>
            </>
        );
    }

    representativeBodyTemplate(data) {
        return (
            <>
                <span className="p-column-title">Representative</span>
                <img alt={data.representative.name} src={`demo/images/avatar/${data.representative.image}`} width="32" style={{verticalAlign: 'middle'}} />
                <span className="image-text p-ml-2">{data.representative.name}</span>
            </>
        )
    }

    statusBodyTemplate(data) {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`customer-badge status-${data.status}`}>{data.status}</span>
            </>
        );
    }

    activityBodyTemplate(data) {
        return (
            <>
                <span className="p-column-title">Activity</span>
                <ProgressBar value={data.activity} showValue={false} />
            </>
        );
    }

    actionBodyTemplate() {
        return <Button type="button" icon="pi pi-cog" className="p-button-secondary"></Button>
    }

    render() {
        const containerClassName = classNames('home p-grid', {
            'p-input-filled': this.props.inputStyle === 'filled',
        });

        return (
            <div className={containerClassName}>
                <div className="p-col-12 p-md-6 p-fluid">
                    <div className="card">
                        <h5>InputText</h5>
                        <div className="p-grid p-formgrid">
                            <div className="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0">
                                <InputText type="text" placeholder="Default"></InputText>
                            </div>
                            <div className="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0">
                                <InputText type="text" placeholder="Disabled" disabled></InputText>
                            </div>
                            <div className="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0">
                                <InputText type="text" placeholder="Invalid" className="p-invalid" />
                            </div>
                        </div>

                        <h5>Icons</h5>
                        <div className="p-grid p-formgrid">
                            <div className="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-user" />
                                    <InputText type="text" placeholder="Username" />
                                </span>
                            </div>
                            <div className="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0">
                                <span className="p-input-icon-right">
                                    <InputText type="text" placeholder="Search" />
                                    <i className="pi pi-search" />
                                </span>
                            </div>
                            <div className="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0">
                                <span className="p-input-icon-left p-input-icon-right">
                                    <i className="pi pi-user" />
                                    <InputText type="text" placeholder="Search" />
                                    <i className="pi pi-search" />
                                </span>
                            </div>
                        </div>

                        <h5>Float Label</h5>
                        <span className="p-float-label">
                            <InputText id="username" type="text" value={this.state.floatValue} onChange={(e) => this.setState({ floatValue: e.target.value })} />
                            <label htmlFor="username">Username</label>
                        </span>

                        <h5>Textarea</h5>
                        <InputTextarea placeholder="Your Message" autoResize rows="3" cols="30" />

                        <h5>AutoComplete</h5>
                        <AutoComplete placeholder="Search" dropdown multiple value={this.state.selectedAutoValue} suggestions={this.state.autoFilteredValue} completeMethod={this.searchCountry} field="name" onChange={(e) => this.setState({ selectedAutoValue: e.value })} />

                        <h5>Calendar</h5>
                        <Calendar showIcon showButtonBar value={this.state.calendarValue} onChange={(e) => this.setState({ calendarValue: e.value })}></Calendar>

                        <h5>InputNumber</h5>
                        <InputNumber value={this.state.inputNumberValue} onValueChange={(e) => this.setState({ inputNumberValue: e.value })} showButtons mode="decimal"></InputNumber>

                        <h5>Chips</h5>
                        <Chips value={this.state.chipsValue} onChange={(e) => this.setState({ chipsValue: e.value })} />
                    </div>

                    <div className="card">
                        <h5>Slider</h5>
                        <InputText value={this.state.sliderValue} onChange={(e) => this.setState({ sliderValue: e.target.value })} className="p-mb-1"/>
                        <Slider value={this.state.sliderValue} onChange={(e) => this.setState({ sliderValue: e.value })} />

                        <h5>Rating</h5>
                        <Rating value={this.state.ratingValue} onChange={(e) => this.setState({ ratingValue: e.value })} />

                        <h5>Input Switch</h5>
                        <InputSwitch checked={this.state.switchValue} onChange={(e) => this.setState({ switchValue: e.value })} />
                    </div>
                </div>

                <div className="p-col-12 p-md-6">
                    <div className="card">
                        <h5>RadioButton</h5>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <div className="p-field-radiobutton">
                                    <RadioButton inputId="option1" name="option" value="Option 1" onChange={(e) => this.setState({ radioValue: e.value })} checked={this.state.radioValue === 'Option 1'} />
                                    <label htmlFor="option1">Option 1</label>
                                </div>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <div className="p-field-radiobutton">
                                    <RadioButton inputId="option2" name="option" value="Option 2" onChange={(e) => this.setState({ radioValue: e.value })} checked={this.state.radioValue === 'Option 2'} />
                                    <label htmlFor="option2">Option 2</label>
                                </div>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <div className="p-field-radiobutton">
                                    <RadioButton inputId="option3" name="option" value="Option 3" onChange={(e) => this.setState({ radioValue: e.value })} checked={this.state.radioValue === 'Option 3'} />
                                    <label htmlFor="option3">Option 3</label>
                                </div>
                            </div>
                        </div>

                        <h5>Checkbox</h5>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="checkOption1" name="option" value="Option 1" onChange={this.onCheckboxOptionChange} checked={this.state.checkboxValues.indexOf('Option 1') !== -1} />
                                    <label htmlFor="checkOption1">Option 1</label>
                                </div>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="checkOption2" name="option" value="Option 2" onChange={this.onCheckboxOptionChange} checked={this.state.checkboxValues.indexOf('Option 2') !== -1} />
                                    <label htmlFor="checkOption2">Option 2</label>
                                </div>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="checkOption3" name="option" value="Option 3" onChange={this.onCheckboxOptionChange} checked={this.state.checkboxValues.indexOf('Option 3') !== -1} />
                                    <label htmlFor="checkOption3">Option 3</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card p-fluid">
                        <h5>Listbox</h5>
                        <ListBox value={this.state.listboxValue} options={this.listboxValues} onChange={(e) => this.setState({listboxValue: e.value})} optionLabel="name" filter />

                        <h5>Dropdown</h5>
                        <Dropdown value={this.state.dropdownValue} options={this.dropdownValues} onChange={(e) => this.setState({dropdownValue: e.value})} optionLabel="name" placeholder="Select" />

                        <h5>MultiSelect</h5>
                        <MultiSelect value={this.state.multiselectValue} options={this.multiselectValues} onChange={(e) => this.setState({ multiselectValue: e.value })} optionLabel="name" placeholder="Select Countries" filter className="multiselect-custom"
                            itemTemplate={this.countryTemplate} />
                    </div>

                    <div className="card p-fluid">
                        <h5>ToggleButton</h5>
                        <ToggleButton checked={this.state.toggleValue} onChange={(e) => this.setState({ toggleValue: e.value })} onLabel="Yes" offLabel="No"/>

                        <h5>SelectButton</h5>
                        <SelectButton value={this.state.selectButtonValue1} options={this.selectButtonValues1} onChange={(e) => this.setState({ selectButtonValue1: e.value })} optionLabel="name" />

                        <h5>SelectButton - Multiple</h5>
                        <SelectButton value={this.state.selectButtonValue2} options={this.selectButtonValues2} onChange={(e) => this.setState({ selectButtonValue2: e.value })} optionLabel="name" multiple />
                    </div>
                </div>

                <div className="p-col-12">
                    <div className="card">
                        <h5>Buttons</h5>
                        <Button label="Submit" className="p-mr-2" />
                        <Button icon="pi pi-check" className="p-mr-2" />
                        <Button label="Submit" icon="pi pi-check" className="p-mr-2" />
                        <Button label="Submit" icon="pi pi-check" iconPos="right" className="p-mr-2" />
                        <Button label="Disabled" disabled="disabled" className="p-mr-2" />
                    
                        <h5>Severities</h5>
                        <Button label="Primary" className="p-mr-2" />
                        <Button label="Secondary" className="p-button-secondary p-mr-2" />
                        <Button label="Success" className="p-button-success p-mr-2" />
                        <Button label="Info" className="p-button-info p-mr-2" />
                        <Button label="Warning" className="p-button-warning p-mr-2" />
                        <Button label="Help" className="p-button-help p-mr-2" />
                        <Button label="Danger" className="p-button-danger p-mr-2" />

                        <h5>Raised Buttons</h5>
                        <Button label="Primary" className="p-button-raised p-mr-2" />
                        <Button label="Secondary" className="p-button-raised p-button-secondary p-mr-2" />
                        <Button label="Success" className="p-button-raised p-button-success p-mr-2" />
                        <Button label="Info" className="p-button-raised p-button-info p-mr-2" />
                        <Button label="Warning" className="p-button-raised p-button-warning p-mr-2" />
                        <Button label="Help" className="p-button-raised p-button-help p-mr-2" />
                        <Button label="Danger" className="p-button-raised p-button-danger" />

                        <h5>Rounded Buttons</h5>
                        <Button label="Primary" className="p-button-rounded p-mr-2" />
                        <Button label="Secondary" className="p-button-rounded p-button-secondary p-mr-2" />
                        <Button label="Success" className="p-button-rounded p-button-success p-mr-2" />
                        <Button label="Info" className="p-button-rounded p-button-info p-mr-2" />
                        <Button label="Warning" className="p-button-rounded p-button-warning p-mr-2" />
                        <Button label="Help" className="p-button-rounded p-button-help p-mr-2" />
                        <Button label="Danger" className="p-button-rounded p-button-danger" />

                        <h5>Text Buttons</h5>
                        <Button label="Primary" className="p-button-text p-mr-2" />
                        <Button label="Secondary" className="p-button-secondary p-button-text p-mr-2" />
                        <Button label="Success" className="p-button-success p-button-text p-mr-2" />
                        <Button label="Info" className="p-button-info p-button-text p-mr-2" />
                        <Button label="Warning" className="p-button-warning p-button-text p-mr-2" />
                        <Button label="Help" className="p-button-help p-button-text p-mr-2" />
                        <Button label="Danger" className="p-button-danger p-button-text p-mr-2" />
                        <Button label="Plain" className="p-button-plain p-button-text" />

                        <h5>Raised Text Buttons</h5>
                        <Button label="Primary" className="p-button-raised p-button-text p-mr-2" />
                        <Button label="Secondary" className="p-button-raised p-button-secondary p-button-text p-mr-2" />
                        <Button label="Success" className="p-button-raised p-button-success p-button-text p-mr-2" />
                        <Button label="Info" className="p-button-raised p-button-info p-button-text p-mr-2" />
                        <Button label="Warning" className="p-button-raised p-button-warning p-button-text p-mr-2" />
                        <Button label="Help" className="p-button-raised p-button-help p-button-text p-mr-2" />
                        <Button label="Danger" className="p-button-raised p-button-danger p-button-text p-mr-2" />
                        <Button label="Plain" className="p-button-raised p-button-plain p-button-text" />

                        <h5>Outlined Buttons</h5>
                        <Button label="Primary" className="p-button-outlined p-mr-2" />
                        <Button label="Secondary" className="p-button-outlined p-button-secondary p-mr-2" />
                        <Button label="Success" className="p-button-outlined p-button-success p-mr-2" />
                        <Button label="Info" className="p-button-outlined p-button-info p-mr-2" />
                        <Button label="Warning" className="p-button-outlined p-button-warning p-mr-2" />
                        <Button label="Help" className="p-button-outlined p-button-help p-mr-2" />
                        <Button label="Danger" className="p-button-outlined p-button-danger p-mr-2" />
                        <Button label="Plain" className="p-button-outlined p-button-plain" />

                        <h5>Rounded Icon Buttons</h5>
                        <Button icon="pi pi-check" className="p-button-rounded p-mr-2" />
                        <Button icon="pi pi-bookmark" className="p-button-rounded p-button-secondary p-mr-2" />
                        <Button icon="pi pi-search" className="p-button-rounded p-button-success p-mr-2" />
                        <Button icon="pi pi-user" className="p-button-rounded p-button-info p-mr-2" />
                        <Button icon="pi pi-bell" className="p-button-rounded p-button-warning p-mr-2" />
                        <Button icon="pi pi-heart" className="p-button-rounded p-button-help p-mr-2" />
                        <Button icon="pi pi-times" className="p-button-rounded p-button-danger" />

                        <h5>Rounded Text Icon Buttons</h5>
                        <Button icon="pi pi-check" className="p-button-rounded p-button-text p-mr-2" />
                        <Button icon="pi pi-bookmark" className="p-button-rounded p-button-secondary p-button-text p-mr-2" />
                        <Button icon="pi pi-search" className="p-button-rounded p-button-success p-button-text p-mr-2" />
                        <Button icon="pi pi-user" className="p-button-rounded p-button-info p-button-text p-mr-2" />
                        <Button icon="pi pi-bell" className="p-button-rounded p-button-warning p-button-text p-mr-2" />
                        <Button icon="pi pi-heart" className="p-button-rounded p-button-help p-button-text p-mr-2" />
                        <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text p-mr-2" />

                        <h5>Rounded and Outlined Icon Buttons</h5>
                        <Button icon="pi pi-check" className="p-button-rounded p-button-outlined p-mr-2" />
                        <Button icon="pi pi-bookmark" className="p-button-rounded p-button-secondary p-button-outlined p-mr-2" />
                        <Button icon="pi pi-search" className="p-button-rounded p-button-success p-button-outlined p-mr-2" />
                        <Button icon="pi pi-user" className="p-button-rounded p-button-info p-button-outlined p-mr-2" />
                        <Button icon="pi pi-bell" className="p-button-rounded p-button-warning p-button-outlined p-mr-2" />
                        <Button icon="pi pi-heart" className="p-button-rounded p-button-help p-button-outlined p-mr-2" />
                        <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" />

                        <h5>Badges</h5>
                        <Button type="button" label="Emails" badge="8" className="p-mr-2" />
                        <Button type="button" label="Messages" icon="pi pi-users" className="p-button-warning" badge="8" badgeClassName="p-badge-danger" />

                        <h5>Button Set</h5>
                        <span className="p-buttonset">
                            <Button label="Save" icon="pi pi-check" />
                            <Button label="Delete" icon="pi pi-trash" />
                            <Button label="Cancel" icon="pi pi-times" />
                        </span>
                    </div>
                </div>

                <div className="p-col-12">
                    <div className="card">
                        <DataTable value={this.state.customers} paginator className="p-datatable-customers" rows={10}
                            dataKey="id" rowHover selection={this.state.selectedCustomers} onSelectionChange={e => this.setState({ selectedCustomers: e.value })} globalFilter={this.state.globalFilter}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" header={this.customerTableHeader()} emptyMessage="No customers found.">
                            <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
                            <Column field="name" header="Name" body={this.nameBodyTemplate} sortable filter></Column>
                            <Column header="Country" body={this.countryBodyTemplate} sortable sortField="country.name" filter filterField="country.name" filterMatchMode="contains"></Column>
                            <Column header="Representative" body={this.representativeBodyTemplate} sortable sortField="representative.name" filter filterField="representative.name" filterMatchMode="in"></Column>
                            <Column field="date" header="Date" body={this.dateBodyTemplate} sortable filter filterMatchMode="equals"></Column>
                            <Column field="status" header="Status" body={this.statusBodyTemplate} sortable filter filterMatchMode="equals"></Column>
                            <Column field="activity" header="Activity" body={this.activityBodyTemplate} sortable filter filterMatchMode="gte"></Column>
                            <Column body={this.actionBodyTemplate} headerStyle={{width: '8rem', textAlign: 'center'}} bodyStyle={{textAlign: 'center', overflow: 'visible'}}></Column>
                        </DataTable>
                    </div>
                </div>
                <div className="p-col-12 p-md-6">
                    <div className="card">
                        <h5>AccordionPanel</h5>
                        <Accordion multiple activeIndex={[0]}>
                            <AccordionTab header="Header I">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </AccordionTab>
                            <AccordionTab header="Header II">
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                                    ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                                    voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                    Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
                            </AccordionTab>
                            <AccordionTab header="Header III">
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
                                    et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                                    Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit
                                    quo minus.</p>
                            </AccordionTab>
                        </Accordion>
                    </div>
                    <div className="card">
                        <h5>TabView</h5>
                        <TabView>
                            <TabPanel header="Header I">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></TabPanel>
                            <TabPanel header="Header II">
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                                    ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                                    voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                    Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
                            </TabPanel>
                            <TabPanel header="Header III">
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
                                    et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                                    Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit
                                    quo minus.</p>
                            </TabPanel>
                        </TabView>
                    </div>
                </div>
                <div className="p-col-12 p-md-6">
                    <div className="card">
                        <h5>Panel</h5>
                        <Panel header="Header" toggleable>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </Panel>
                    </div>
                    <div className="card">
                        <h5>Fieldset</h5>
                        <Fieldset legend="Legend" toggleable>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </Fieldset>
                    </div>
                </div>
                <div className="p-col-6">
                    <div className="card p-fluid">
                        <h5>Overlay Panel</h5>
                        <Button type="button" label="Image" onClick={this.toggle} className="p-button-success"/>
                        <OverlayPanel ref={(el) => this.op = el} appendTo={document.body} showCloseIcon>
                            <img src={designer_logo} alt="Logo" />
                        </OverlayPanel>
                    </div>
                </div>
                <div className="p-col-6 p-fluid">
                    <div className="card">
                        <h5>Dialog</h5>
                        <Dialog visible={this.state.display} style={{width: '30vw'}} modal onHide={this.close}
                            header="Dialog" footer={<Button label="Dismiss" onClick={this.close} icon="pi pi-check" className="p-button-secondary"/>}>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </Dialog>
                        <Button label="Show" icon="pi pi-external-link" onClick={this.open} />
                    </div>
                </div>
                <div className="p-col-12">
                    <div className="card card-w-title">
                        <h5>Menubar</h5>
                        <Menubar model={this.tieredMenuItems} end={this.menubarEndTemplate()}></Menubar>
                    </div>
                </div>
                <div className="p-col-12 p-md-4">
                    <div className="card">
                        <h5>Tiered Menu</h5>
                        <TieredMenu model={this.tieredMenuItems} />
                    </div>
                </div>

                <div className="p-col-12 p-md-4">
                    <div className="card">
                        <h5>Plain Menu</h5>
                        <Menu model={this.menuitems} />
                    </div>
                </div>

                <div className="p-col-12 p-md-4">
                    <div className="card">
                        <h5>Overlay Menu</h5>

                        <Menu ref={(el) => this.menu = el} model={this.menuitems} popup />
                        <Button type="button" label="Options" icon="pi pi-angle-down" onClick={this.toggleMenu} style={{width: 'auto'}}/>
                    </div>

                    <div className="card" onContextMenu={this.onContextRightClick}>
                        <h5>ContextMenu</h5>
                        Right click to display.
                        <ContextMenu model={this.contextMenuItems} ref={el => this.contextMenu = el}></ContextMenu>
                    </div>
                </div>

                <div className="p-col-12 p-lg-6">
                    <div className="card">
                        <h5>Messages</h5>
                        <Button onClick={() => this.addMessage('info')} label="Info" className="p-button-info p-mr-2" />
                        <Button onClick={() => this.addMessage('success')} label="Success" className="p-button-success p-mr-2" />
                        <Button onClick={() => this.addMessage('warn')} label="Warn" className="p-button-warning p-mr-2" />
                        <Button onClick={() => this.addMessage('error')} label="Error" className="p-button-danger" />

                        <Messages ref={(el) => this.msgs1 = el} />
                    </div>
                </div>

                <div className="p-col-12 p-lg-6">
                    <div className="card">
                        <h5>Toast</h5>

                        <Toast ref={(el) => this.toast = el} />
                        <Button onClick={() => this.showToast('info')} label="Info" className="p-button-info p-mr-2" />
                        <Button onClick={() => this.showToast('success')} label="Success" className="p-button-success p-mr-2" />
                        <Button onClick={() => this.showToast('warn')} label="Warn" className="p-button-warning p-mr-2" />
                        <Button onClick={() => this.showToast('error')} label="Error" className="p-button-danger" />
                    </div>
                </div>

                <div className="p-col-12 p-lg-8">
                    <div className="card">
                        <h5>Inline Message</h5>
                        <div className="p-formgroup-inline" style={{marginBottom: '.5rem'}}>
                            <label htmlFor="username1" className="p-sr-only">Username</label>
                            <InputText id="username1" type="text" placeholder="Username" className="p-invalid p-mr-2" />
                            <Message severity="error" text="Username is required" />
                        </div>
                        <div className="p-formgroup-inline">
                            <label htmlFor="email" className="p-sr-only">email</label>
                            <InputText id="email" placeholder="Email" className="p-invalid p-mr-2" />
                            <Message severity="error" />
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-4">
                    <div className="card">
                        <h5>Helper Text</h5>
                        <div className="p-field p-fluid">
                            <label htmlFor="username2">Username</label>
                            <InputText id="username2" type="text" className="p-invalid" aria-describedby="username-help" />
                            <small id="username-help" className="p-error">Enter your username to reset your password.</small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}