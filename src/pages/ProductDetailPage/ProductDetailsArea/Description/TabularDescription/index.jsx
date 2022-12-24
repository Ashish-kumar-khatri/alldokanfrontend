import React from 'react'
import './style.css';



function TabularDescription({
    title,
    data
}) {
  return (
    <div className = "tabulardescription-container">
        <h3 className="title">
            {title}
        </h3>
        <table>
            <tbody>
                {
                    data?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td width = {150}>{item.name}</td>
                                <td>{item.value}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default TabularDescription