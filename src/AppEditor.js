import React, { Component } from "react";
import classNames from "classnames";
import EditorService from "./service/EditorService";
import axios from "axios";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import designer_logo from "./assets/demo/images/logo.svg";

export class AppEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      variables: {},
      restartDialog: false,
      downloadDialog: false,
      categories: [],
      scale: 14,
      scales: [12, 13, 14, 15, 16],
    };

    this.editorService = new EditorService();

    this.incrementScale = this.incrementScale.bind(this);
    this.decrementScale = this.decrementScale.bind(this);
    this.restart = this.restart.bind(this);
    this.download = this.download.bind(this);
    this.navigateToStore = this.navigateToStore.bind(this);
    this.navigateToDesigner = this.navigateToDesigner.bind(this);
  }

  componentDidMount() {
    this.editorService.getEditor(this.props.theme).then((data) => {
      this.setState(
        {
          categories: data,
        },
        () => {
          this.initVariables(this.compile);
        }
      );
    });
  }

  initVariables(callback) {
    if (this.state.categories) {
      let variables = { ...this.state.variables };
      for (let category of this.state.categories) {
        for (let option of category.options) {
          variables[option.name] = option.value;
        }
      }

      this.setState({ variables }, callback);
    }
  }

  async compile() {
    try {
      const response = await axios.post(
        process.env.REACT_APP_THEME_BUILDER_URL + "?theme=" + this.props.theme,
        this.state.variables
      );
      this.props.onCompile(response.data);
    } catch (e) {
      this.editorToast.show({
        severity: "error",
        summary: "Error Occurred",
        life: 3000,
      });
    }
  }

  async downloadTheme() {
    try {
      const response = await axios.post(
        process.env.REACT_APP_THEME_BUILDER_URL + "?theme=" + this.props.theme,
        this.state.variables
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "text/css; charset=utf-8" })
      );

      if (this.downloadLink) {
        document.body.removeChild(this.downloadLink);
      }

      this.downloadLink = document.createElement("a");
      this.downloadLink.href = url;
      this.downloadLink.setAttribute("download", "theme.css");
      document.body.appendChild(this.downloadLink);
      this.downloadLink.click();
    } catch (e) {
      this.editorToast.show({
        severity: "error",
        summary: "Error Occurred",
        life: 3000,
      });
    }
  }

  restart() {
    this.setState({ restartDialog: false }, this.props.onRestart);
  }

  download() {
    this.downloadTheme();
  }

  navigateToStore() {
    window.location.href = "https://www.primefaces.org/store";
  }

  navigateToDesigner() {
    window.location.href = "https://www.primefaces.org/designer/primereact";
  }

  optionChange(e, name) {
    let target = e.target;
    let value = target.value;
    let variables = { ...this.state.variables };
    variables[name] = value;
    target.value = value;

    this.setState({ variables });
  }

  decrementScale() {
    this.setState(
      (prevState) => ({
        scale: --prevState.scale,
      }),
      () => {
        document.documentElement.style.fontSize = this.state.scale + "px";
      }
    );
  }

  incrementScale() {
    this.setState(
      (prevState) => ({
        scale: ++prevState.scale,
      }),
      () => {
        document.documentElement.style.fontSize = this.state.scale + "px";
      }
    );
  }

  render() {
    const editorClassName = classNames("layout-editor", {
      "layout-editor-active": this.props.active,
    });

    return (
      <>
        <Toast ref={(el) => (this.editorToast = el)} />

        <div className={editorClassName}>
          <div className="layout-editor-panel">
            <div className="layout-editor-top">
              <img src={designer_logo} className="logo" alt="topbar-logo" />
              <div>
                <Tooltip
                  target={[".action-restart", ".action-download"]}
                  position="bottom"
                />
                <button
                  type="button"
                  className="p-link action-icon action-restart p-button-raised"
                  data-pr-tooltip="Restart"
                  onClick={() => this.setState({ restartDialog: true })}
                >
                  <i className="pi pi-replay"></i>
                </button>
                <button
                  type="button"
                  className="p-link action-icon action-download p-button-raised p-ml-2"
                  data-pr-tooltip="Download"
                  onClick={this.download}
                >
                  <i className="pi pi-download"></i>
                </button>
              </div>
            </div>

            <p>
              Visual editor is for quick prototyping, for advanced editing such
              as implementing your style guide, refer to the{" "}
              <a href="https://www.primefaces.org/designer/api/primereact/7.1.0/">
                SASS API
              </a>{" "}
              with 500+ variables.
            </p>

            <h6>Component Scale</h6>
            <div className="config-scale">
              <Button
                icon="pi pi-minus"
                onClick={this.decrementScale}
                className="p-button-text"
                disabled={this.state.scale === this.state.scales[0]}
              />
              {this.state.scales.map((scale) => {
                return (
                  <i
                    className={classNames("pi pi-circle-fill", {
                      "scale-active": scale === this.state.scale,
                    })}
                    key={scale}
                  />
                );
              })}
              <Button
                icon="pi pi-plus"
                onClick={this.incrementScale}
                className="p-button-text"
                disabled={
                  this.state.scale ===
                  this.state.scales[this.state.scales.length - 1]
                }
              />
            </div>

            <div className="p-d-flex p-mt-4">
              <div>
                <h6>Input Style</h6>
                <div className="p-formgroup-inline">
                  <div className="p-field-radiobutton">
                    <RadioButton
                      inputId="input_outlined"
                      name="inputstyle"
                      value="outlined"
                      onChange={this.props.onInputStyleChange}
                      checked={this.props.inputStyle === "outlined"}
                    />
                    <label htmlFor="input_outlined">Outlined</label>
                  </div>
                  <div className="p-field-radiobutton">
                    <RadioButton
                      inputId="input_filled"
                      name="inputstyle"
                      value="filled"
                      onChange={this.props.onInputStyleChange}
                      checked={this.props.inputStyle === "filled"}
                    />
                    <label htmlFor="input_filled">Filled</label>
                  </div>
                </div>
              </div>

              <div className="p-ml-auto">
                <h6>Ripple Effect</h6>
                <InputSwitch
                  checked={this.props.ripple}
                  onChange={this.props.onRippleChange}
                />
              </div>
            </div>

            {this.state.categories.map((category) => {
              return (
                <div key={category.label} className="editor-category">
                  <h6 className="p-mt-4 p-mb-2">{category.label}</h6>
                  {category.options.map((option) => {
                    return (
                      <div key={option.name} className="editor-field">
                        <label htmlFor={option.name}>
                          {option.description}
                        </label>
                        {option.type === "color" && (
                          <input
                            type="color"
                            id={option.name}
                            value={this.state.variables[option.name] || ""}
                            onChange={(e) => this.optionChange(e, option.name)}
                            onBlur={() => this.compile()}
                          />
                        )}
                        {option.type === "text" && (
                          <input
                            type="text"
                            id={option.name}
                            size={option.size}
                            value={this.state.variables[option.name] || ""}
                            onChange={(e) => this.optionChange(e, option.name)}
                            onBlur={() => this.compile()}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <Dialog
            visible={this.state.restartDialog}
            appendTo={document.body}
            onHide={() => this.setState({ restartDialog: false })}
            style={{ width: "450px" }}
            modal
            header="Restart"
            footer={
              <>
                <Button
                  label="No"
                  icon="pi pi-times"
                  className="p-button-text"
                  onClick={() => this.setState({ restartDialog: false })}
                />
                <Button
                  label="Yes"
                  icon="pi pi-check"
                  className="p-button-text"
                  onClick={this.restart}
                />
              </>
            }
          >
            <div className="p-d-flex p-ai-center p-jc-center">
              <i
                className="pi pi-exclamation-triangle p-mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>Are you sure you want to discard your changes?</span>
            </div>
          </Dialog>

          <Dialog
            visible={this.state.downloadDialog}
            appendTo={document.body}
            onHide={() => this.setState({ downloadDialog: false })}
            style={{ width: "450px" }}
            modal
            header="Download"
            footer={
              <>
                <Button
                  label="Learn More"
                  icon="pi pi-info-circle"
                  className="p-button-text"
                  onClick={this.navigateToDesigner}
                />
                <Button
                  label="Buy Now"
                  icon="pi pi-shopping-cart"
                  className="p-button-text"
                  onClick={this.navigateToStore}
                />
              </>
            }
          >
            <div className="confirmation-content p-d-flex p-ai-center p-jc-center">
              <i
                className="pi pi-exclamation-circle p-mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                A designer license is required to download this theme.
              </span>
            </div>
          </Dialog>
        </div>
      </>
    );
  }
}
