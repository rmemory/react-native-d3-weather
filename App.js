/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';

import config from './src/config';
import * as fixtures from './src/services/fixtures';
import forecastio from './src/services/forecastio';

import AddressPage from './src/address/AddressPage';
import WeatherPage from './src/weather/WeatherPage';

forecastio.initialize(config.forecastApiKey);

const USE_FIXTURES = false;

/* https://hswolff.com/blog/react-native-art-presentation/ */

export default class BetterWeather extends Component {
	state = {
		address: USE_FIXTURES ? fixtures.address : null,
		forecastIoData: USE_FIXTURES ? fixtures.forecastIoData : null,
	};

	changeAddress = (address) => {
		if (USE_FIXTURES) {
			this.setState({ address, forecastIoData: fixtures.forecastIoData });
		} else if (address == null) {
			this.setState({ address, forecastIoData: null });
		} else {
			const now = Math.round((new Date()).getTime() / 1000);
			forecastio(address.latitude, address.longitude)
				.then((forecastIoData) => {
					console.log(now);
					console.log(forecastIoData);
					this.setState({ address, forecastIoData });
				});
		}
	}

	resetAddress = () => this.changeAddress(null);

	render() {
		return (
			<View style={styles.container}>
				{this.state.address == null ?
					<AddressPage
						onAddressSet={this.changeAddress}
					/> :
					<WeatherPage
						name={this.state.address.name}
						data={this.state.forecastIoData}
						changeAddress={this.resetAddress}
					/>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
