// Copyright (c) Automatic Controls and Instrumentation Pte Ltd. All rights reserved.

import React, { Component } from 'react';
import { IconButton } from 'office-ui-fabric-react';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { Button } from 'react-md';

export class SettingsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        const _onCalloutDismiss = this.props._onCalloutDismiss;
        const theme = this.props.theme;
        return (
            <Callout
                className="AC-CalloutSettings"
                gapSpace={0}
                //target={this._menuButtonElement}
                isBeakVisible={false}
                onDismiss={_onCalloutDismiss}
                directionalHint={DirectionalHint.topRightEdge}
                hidden={this.props.isCalloutHidden}
                layerProps={{
                    //hostId: 'ant-layout-content'
                }}
            >
                <div className="AC-CalloutSettings-header">
                    <h3 className="AC-CalloutSettings-headerTitle">Settings</h3>
                    <span style={{ position: 'absolute', float: 'right', verticalAlign: 'top', top: '0px', right: '0px' }}>
                        <IconButton onClick={_onCalloutDismiss} disabled={false} checked={false} iconProps={{ iconName: 'Cancel' }} title="Cancel" ariaLabel="Cancel" />
                    </span>
                </div>
                <div className="AC-CalloutSettings-inner">
                    <div className="ms-CalloutExample-content">
                        <p className="ms-CalloutExample-subText">
                            Choose a theme
                        </p>
                        <div className="ac-buttons-group">
                            <Button onClick={() => this.props.setTheme('light')} floating mini style={{ backgroundColor: '#fff', color: '#000', fontWeight: 'bolder' }} title="Light">{(theme === 'light') ? 'done' : null}</Button>
                            <Button onClick={() => this.props.setTheme('dark')} floating mini style={{ backgroundColor: '#000', color: '#fff', fontWeight: 'bolder' }} title="Dark">{(theme === 'dark') ? 'done' : null}</Button>
                            <Button onClick={() => this.props.setTheme('azure')} floating mini style={{ backgroundColor: 'rgba(0,0,0,.38)', color: '#000', fontWeight: 'bolder' }} title="Azure">{(theme === 'azure') ? 'done' : null}</Button>
                        </div>
                    </div>
                </div>
            </Callout >
        );
    }
}