import React, { useState, useEffect } from 'react';
// import Chart from 'chart.js'

export default function Parks(props) {

    const [parks, setParks] = useState([])
    const getParks = async () => {
        try {
            const response = await fetch('http://localhost:3000/parks')
            console.log(response)
            const data = await response.json()
            setParks(data, ...parks)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        (async function () {
            await getParks()
        })()
    }, [])
    return (
        <div>
            {props.parks.map(park => {
                return (
                    <div key={park.id} className="park">
                        <h3>{park.name}</h3>
                        <p>{park.description}</p>
                        <small>{park.location}</small>
                    </div>
                )
            })}
        </div>
    )
}
// export default function Parks(props) {
//     const prepareData = (data) => {
//         const chartData = {
//             labels: [],
//             datasets: [
//                 {
//                     label: 'Qty of Visitors',
//                     data: []
//                 }
//             ]
//         };
//         console.log(chartData)
//         data.parks.forEach(park => {
//             console.log(data)
//             chartData.labels.push(park.name)
//             chartData.datasets[1].data.push(park.avg_visitors);
//             // chartData.datasets[1].data.push(temperature.average_low_f);
//         })
//         console.log(chartData)
//         return chartData

//     }

//     const createChart = (data) => {
//         const ctx = document.querySelector("#parks");
//         const salesChart = new Chart(ctx, {
//             type: "bar",
//             data: data,
//             backgroundColor: "rgba(0,200,0,1)",
//             borderColor: "rgba(74,35,75,1)"
//         });
//     };
//     const getData = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/parks')
//             const data = await response.json()
//             const jData = prepareData(data)
//             createChart(jData)
//         } catch (error) {
//             console.error(error)
//         }

//     }

//     useEffect(() => {
//         getData();
//     }, []);

//     return (
//         <>
//             <h1>Visitors</h1>
//             <canvas id="parks" width="300" height="100"></canvas>
//         </>
//     )
// }