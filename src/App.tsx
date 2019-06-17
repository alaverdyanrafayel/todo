import React, {Component} from 'react';
import * as Redux from 'redux';
import {connect} from 'react-redux';
import './index.css';
import {TodosContainer} from './containers';
import {ReduxState} from './store';
import * as settingsActions from './store/settings/actions';
import {Settings} from './types';

type AppProps = {
  loadSettings: () => void;
  error: string;
  settings: Settings;
};

class App extends Component<AppProps, {}> {
  componentDidMount() {
    this.props.loadSettings();
  }

  render() {
    const {error} = this.props;
    if (!!error) return <div>{error}</div>;

    return (
      <div style={getStyles(this.props).appContainer}>
        <TodosContainer />
      </div>
    );
  }
}

const getStyles = (props: AppProps) => ({
  appContainer: {
    background: props.settings.themeColor,
    padding: 30,
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});

const mapStateToProps = (state: ReduxState) => ({
  settings: state.settings.settings,
  error: state.settings.error,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>) => ({
  loadSettings: () => dispatch(settingsActions.loadSettings()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
