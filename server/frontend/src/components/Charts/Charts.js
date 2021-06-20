import React from 'react'
import { AreaChart, linearGradient, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'
import classes from './Charts.module.scss'

const Charts = ({uv1 , pv1, uv2, pv2, uv3, pv3, uv4, pv4, uv5, pv5, uv6, pv6, uv7, pv7}) => {
    const data = [
        {
          "name": "январь",
          "ошибки": uv1,
          "проверки": pv1,
          "amt": 2400
        },
        {
          "name": "февраль",
          "ошибки": uv2,
          "проверки": pv2,
          "amt": 2210
        },
        {
          "name": "март",
          "ошибки": uv3,
          "проверки": pv3,
          "amt": 2290
        },
        {
          "name": "апрель",
          "ошибки": uv4,
          "проверки": pv4,
          "amt": 2000
        },
        {
          "name": "май",
          "ошибки": uv5,
          "проверки": pv5,
          "amt": 2181
        },
        {
          "name": "июнь",
          "ошибки": uv6,
          "проверки": pv6,
          "amt": 2500
        },
        {
          "name": "июль",
          "ошибки": uv7,
          "проверки": pv7,
          "amt": 2100
        }
      ]
    return (
        <div>
          <AreaChart width={800} height={260} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="ошибки" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="проверки" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </div>
    )
}

export default Charts
