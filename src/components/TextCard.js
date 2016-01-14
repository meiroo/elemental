var React = require('react');
import E from '../constants';

module.exports = React.createClass({
	displayName: 'TextCard',
	propTypes: {
		children: React.PropTypes.node.isRequired,
		style: React.PropTypes.object,
	},
	getInitialState: function () {
        return {hover: false};
    },

    mouseOver: function () {
        this.setState({hover: true});
    },

    mouseOut: function () {
        this.setState({hover: false});
    },
	render () {
		let style = {
			backgroundColor: this.state.hover?'rgba(250, 250, 250, 0.0745098)':'white',
			borderRadius: E.borderRadius.sm,
			boxShadow: '0 2px 3px rgba(0, 0, 0, 0.075), 0 0 0 1px rgba(0,0,0,0.1)',
			marginBottom: E.spacing.md,
			padding: E.spacing.md,
			wordBreak:'break-all',
			'overflow':'hidden',
		};
		return <div {...this.props} onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut} style={Object.assign(style, this.props.style)} />;
	},
});
