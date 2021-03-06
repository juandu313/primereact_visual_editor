import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import 'prismjs/themes/prism-coy.css';

export class CodeHighlight extends Component {

    static defaultProps = {
        lang: 'markup',
        style: null
    };

    static propTypes = {
        lang: PropTypes.string,
        style: PropTypes.object
    };

    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        if (Prism) {
            Prism.highlightElement(this.codeElement);
        }
    }

    render() {
        const languageClassName = `language-${this.props.lang}`;

        return (
            <pre style={this.props.style}>
                <code ref={el => this.codeElement = el} className={languageClassName}>
                    {this.props.children}&nbsp;
                </code>
            </pre>
        );
    }
}
