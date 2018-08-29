/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,
} from 'react-native';

import Color from '../services/color';

export default class Header extends React.Component {
	render() {
		const { children } = this.props;

		return (
			<View style={styles.container}>
				{children}
			</View>
		);
	}
}
Header.propTypes = {
	children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
	container: {
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Color.BlueLight,
		borderBottomWidth: 1,
		borderBottomColor: Color.BlueDark,
		paddingTop: 44,
		paddingBottom: 20,
	},
});
