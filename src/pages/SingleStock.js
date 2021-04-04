import React, { Component } from 'react'
import axios from "axios";
import {
  LineChart,
  XAxis,
  Line,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default class SingleStock extends Component {
    constructor(){
        super();
        this.state={
            data:[
            ]
        }
    }
    render() {
        return (
            <div>
                <LineChart
                    width={1000}
                    height={400}
                    data={this.state.data}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    
                    <Line type="monotone" dataKey="data" stroke="#ff7300" />
                    
                  </LineChart>
            </div>
        )
    }
}
