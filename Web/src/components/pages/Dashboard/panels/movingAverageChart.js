// Copyright (c) Automatic Controls and Instrumentation Pte Ltd. All rights reserved.

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { DirectionalHint, ContextualMenu, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon as OfficeIcon } from 'office-ui-fabric-react/lib/Icon';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { SMA } from 'technicalindicators';

const symbolSize = 5;
//const data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];
const prices = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [12, 12], [13, 13], [15, 15]];

export class MovingAverageChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartOptions: {}
        };
        this.setupChart = this.setupChart.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.setContextMenu = this.setContextMenu.bind(this);
        this.showIndicatorsMenu = this.showIndicatorsMenu.bind(this);
    }

    componentDidMount() {
        var period = 3;
        const sma1 = new SMA({ period: period, values: [] });
        var results = [];
        prices.forEach(price => {
            var result = sma1.nextValue(price[1]);
            if (result)
                results.push([price[0], result]);
        });
        console.log("SMA RESULT", results);
        this.setupChart(results);
    }

    setContextMenu() {
        //document.oncontextmenu = function () { return false; };
        let echarts_instance = this.echarts_react.getEchartsInstance();
        echarts_instance.on('click', function () {
            console.log("右键事件");
            alert('右键事件')
        });
        console.log("setContextMenu");
    }

    showTooltip(dataIndex) {
        let echarts_instance = this.echarts_react.getEchartsInstance();
        echarts_instance.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: dataIndex
        });
    }

    hideTooltip(dataIndex) {
        let echarts_instance = this.echarts_react.getEchartsInstance();
        echarts_instance.dispatchAction({
            type: 'hideTip'
        });
    }

    showIndicatorsMenu() {
        this.setState({
            isContextMenuVisible: true
        });
    }

    setupChart(results) {
        const showIndicatorsMenu = this.showIndicatorsMenu;
        const options = {
            title: {
                text: 'Moving Average Analysis'
            },
            tooltip: {
                triggerOn: 'none',
                formatter: function (params) {
                    return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
                }
            },
            grid: {
                id: 'grid'
            },
            toolbox: {
                show: true,
                feature: {
                    myIndicators: {
                        show: true,
                        title: 'Indicators',
                        //icon: ReactDOMServer.renderToString(<OfficeIcon className="anticon" iconName="Home" />),
                        icon: 'image://http://echarts.baidu.com/images/favicon.png',
                        onclick: function () {
                            showIndicatorsMenu();
                            alert('myToolHandler2');
                        }
                    }
                }
            },
            xAxis: {
                min: 0,
                max: 10,
                type: 'value',
                axisLine: { onZero: false }
            },
            yAxis: {
                //min: 0,
                //max: 60,
                type: 'value',
                axisLine: { onZero: false }
            },
            dataZoom: [
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    filterMode: 'empty'
                },
                {
                    type: 'slider',
                    yAxisIndex: 0,
                    filterMode: 'empty'
                },
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    filterMode: 'empty'
                },
                {
                    type: 'inside',
                    yAxisIndex: 0,
                    filterMode: 'empty'
                }
            ],
            series: [
                {
                    id: 'a',
                    type: 'line',
                    smooth: true,
                    symbolSize: symbolSize,
                    data: prices
                },
                {
                    id: 'b',
                    type: 'line',
                    smooth: true,
                    symbolSize: symbolSize,
                    data: results
                }
            ]
        };
        this.setState({
            chartOptions: options
        }, this.setContextMenu);
    }

    render() {
        const { chartOptions, } = this.state;
        return (
            <div>
                <ReactEcharts ref={(e) => { this.echarts_react = e; }}
                    option={chartOptions}
                />
                {this.state.isContextMenuVisible ? (
                    <ContextualMenu
                        shouldFocusOnMount={true}
                        targetPoint={this.state.target}
                        useTargetPoint={true}
                        target="#"
                        onDismiss={this._onDismiss}
                        directionalHint={DirectionalHint.bottomLeftEdge}
                        items={
                            [
                                {
                                    key: 'newItem',
                                    icon: 'circlePlus',
                                    items: [
                                        {
                                            key: 'emailMessage',
                                            name: 'Email message',
                                        },
                                        {
                                            key: 'calendarEvent',
                                            name: 'Calendar event',
                                        }
                                    ],
                                    name: 'New'
                                },
                                {
                                    key: 'upload',
                                    icon: 'upload',
                                    name: 'Upload'
                                },
                                {
                                    key: 'divider_1',
                                    name: '-',
                                },
                                {
                                    key: 'rename',
                                    name: 'Rename'
                                },
                                {
                                    key: 'properties',
                                    name: 'Properties'
                                },
                                {
                                    key: 'divider_2',
                                    name: '-',
                                },
                                {
                                    key: 'share',
                                    icon: 'share',
                                    items: [
                                        {
                                            key: 'sharetoemail',
                                            name: 'Share to Email',
                                            icon: 'mail'
                                        },
                                        {
                                            key: 'sharetofacebook',
                                            name: 'Share to Facebook',
                                        },
                                        {
                                            key: 'sharetotwitter',
                                            name: 'Share to Twitter',
                                            icon: 'share',
                                            items: [
                                                {
                                                    key: 'sharetoemail_1',
                                                    name: 'Share to Email',
                                                    icon: 'mail'
                                                },
                                                {
                                                    key: 'sharetofacebook_1',
                                                    name: 'Share to Facebook',
                                                },
                                                {
                                                    key: 'sharetotwitter_1',
                                                    name: 'Share to Twitter',
                                                    icon: 'share'
                                                },
                                            ],
                                        },
                                    ],
                                    name: 'Share'
                                },
                                {
                                    key: 'print',
                                    icon: 'print',
                                    name: 'Print'
                                },
                                {
                                    key: 'music',
                                    icon: 'music',
                                    name: 'Music',
                                },
                                {
                                    key: 'divider_3',
                                    name: '-',
                                },
                                {
                                    key: 'Bing',
                                    name: 'Go to Bing',
                                    href: 'http://www.bing.com'
                                },
                            ]
                        }
                    />) : (null)}
            </div>
        );
    }
}